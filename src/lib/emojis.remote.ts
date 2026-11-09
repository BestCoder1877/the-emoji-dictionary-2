import { command, query } from '$app/server';
import { db } from './server/db';
import { emoji } from './server/db/schema';

export const getMappings = query(async () => {
	return await db.select().from(emoji);
});

export const addMapping = command('unchecked', async (char: string) => {
	const emojis = await (await fetch('https://emojihub.yurace.pro/api/all')).json();
	const emojiValue = emojis[Math.floor(Math.random() * emojis.length)].htmlCode[0].replace(
		/&#(\d+);/g,
		(_, code: string) => String.fromCodePoint(Number(code))
	);
	const [newMapping] = await db
		.insert(emoji)
		.values({ title: char, emoji: emojiValue })
    .onConflictDoNothing()
		.returning();

	return newMapping;
});
