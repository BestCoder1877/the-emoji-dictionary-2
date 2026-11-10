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
	const emojiValue = emojis[Math.floor(Math.random() * emojis.length)].unified
		.split('-')
		.map((codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
		.join('');
	const [newMapping] = await db
		.insert(emoji)
		.values({ title: char, emoji: emojiValue })
		.onConflictDoNothing()
		.returning();

	return newMapping;
});
