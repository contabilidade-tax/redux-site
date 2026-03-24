import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// TokenData table
export const tokenData = pgTable('token', {
  id: integer('id').primaryKey().default(1),
  access_token: text('access_token').notNull(),
  token_type: varchar('token_type', { length: 255 }).notNull().default('bearer'),
  expires_in: varchar('expires_in', { length: 255 }).notNull(),
  generated_at: varchar('generated_at', { length: 255 }).notNull(),
  permissions: text('permissions'),
});

// CurrentUser table
export const currentUser = pgTable('current_user', {
  id: integer('id').primaryKey().default(1),
  access_token: text('access_token').notNull(),
  user_id: varchar('user_id', { length: 255 }).notNull(),
});

// InstaPostsData table
export const instaPostsData = pgTable('posts', {
  id: integer('id').primaryKey().default(1),
  generated_at: timestamp('generated_at').defaultNow(),
});

// Post table
export const post = pgTable('post', {
  id: varchar('id', { length: 255 }).primaryKey(),
  caption: text('caption').notNull(),
  media_type: varchar('media_type', { length: 255 }).notNull(),
  media_url: text('media_url').notNull(),
  permalink: text('permalink').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  instaPostsDataId: integer('instaPostsDataId').notNull(),
});

// Relations
export const instaPostsDataRelations = relations(instaPostsData, ({ many }) => ({
  posts: many(post),
}));

export const postRelations = relations(post, ({ one }) => ({
  instaPostsData: one(instaPostsData, {
    fields: [post.instaPostsDataId],
    references: [instaPostsData.id],
  }),
}));

// Type exports for use in application
export type TokenData = typeof tokenData.$inferSelect;
export type TokenDataInsert = typeof tokenData.$inferInsert;

export type CurrentUser = typeof currentUser.$inferSelect;
export type CurrentUserInsert = typeof currentUser.$inferInsert;

export type InstaPostsData = typeof instaPostsData.$inferSelect;
export type InstaPostsDataInsert = typeof instaPostsData.$inferInsert;

export type Post = typeof post.$inferSelect;
export type PostInsert = typeof post.$inferInsert;
