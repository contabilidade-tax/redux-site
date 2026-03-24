CREATE TABLE "current_user" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"access_token" text NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"generated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"caption" text NOT NULL,
	"media_type" varchar(255) NOT NULL,
	"media_url" text NOT NULL,
	"permalink" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"username" varchar(255) NOT NULL,
	"instaPostsDataId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"access_token" text NOT NULL,
	"token_type" varchar(255) DEFAULT 'bearer' NOT NULL,
	"expires_in" varchar(255) NOT NULL,
	"generated_at" varchar(255) NOT NULL,
	"permissions" text
);
