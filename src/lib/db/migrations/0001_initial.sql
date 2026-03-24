-- Create token table
CREATE TABLE IF NOT EXISTS "token" (
  "id" integer PRIMARY KEY DEFAULT 1,
  "access_token" text NOT NULL,
  "token_type" varchar(255) DEFAULT 'bearer',
  "expires_in" varchar(255) NOT NULL,
  "generated_at" varchar(255) NOT NULL,
  "permissions" text
);

-- Create current_user table
CREATE TABLE IF NOT EXISTS "current_user" (
  "id" integer PRIMARY KEY DEFAULT 1,
  "access_token" text NOT NULL,
  "user_id" varchar(255) NOT NULL
);

-- Create posts (instaPostsData) table
CREATE TABLE IF NOT EXISTS "posts" (
  "id" integer PRIMARY KEY DEFAULT 1,
  "generated_at" timestamp DEFAULT now()
);

-- Create post table
CREATE TABLE IF NOT EXISTS "post" (
  "id" varchar(255) PRIMARY KEY,
  "caption" text NOT NULL,
  "media_type" varchar(255) NOT NULL,
  "media_url" text NOT NULL,
  "permalink" text NOT NULL,
  "timestamp" timestamp NOT NULL,
  "username" varchar(255) NOT NULL,
  "instaPostsDataId" integer NOT NULL,
  FOREIGN KEY ("instaPostsDataId") REFERENCES "posts"("id")
);

-- Create index on post.instaPostsDataId for better query performance
CREATE INDEX IF NOT EXISTS "post_instaPostsDataId_idx" ON "post"("instaPostsDataId");
