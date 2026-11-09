import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const emoji = pgTable('emoji', {
	id: serial('id').primaryKey(),
	title: text('char').notNull(),
	emoji: text('emoji').notNull()
  (table) => [
		uniqueIndex('emoji_char_unique').on(table.char)
    uniqueIndex('emoji_emoji_unique').on(table.emoji)
	]
});
