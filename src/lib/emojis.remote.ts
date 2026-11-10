import { command, query } from '$app/server';
import { db } from './server/db';
import { emoji } from './server/db/schema';

export const getMappings = query(async () => {
	return await db.select().from(emoji);
});

export const addMapping = command('unchecked', async (char: string) => {
	const response = await fetch(
		'https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json'
	);
	if (!response.ok) throw new Error(`Emoji data failed with status ${response.status}`);
	const emojis: { unified: string }[] = await response.json();
	const usedEmojis = new Set(
		(await db.select({ value: emoji.emoji }).from(emoji)).map((row) => row.value)
	);
	const availableEmojis = emojis
		.map((item) =>
			item.unified
				.split('-')
				.map((codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
				.join('')
		)
		.filter((value) => !usedEmojis.has(value));
	const emojiValue = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
	if (!emojiValue) throw new Error('No unused emojis are available');

	const [newMapping] = await db
		.insert(emoji)
		.values({ title: char, emoji: emojiValue })
		.onConflictDoNothing()
		.returning();

	if (newMapping) return newMapping;

	const existingMapping = await db.query.emoji.findFirst({
		where: (table, { eq }) => eq(table.title, char)
	});
	if (existingMapping) return existingMapping;

	throw new Error(`Could not create an emoji mapping for "${char}"`);
});
