CREATE UNIQUE INDEX "emoji_char_unique" ON "emoji" USING btree ("char");--> statement-breakpoint
CREATE UNIQUE INDEX "emoji_emoji_unique" ON "emoji" USING btree ("emoji");