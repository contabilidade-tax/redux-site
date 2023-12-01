/*
  Warnings:

  - You are about to drop the column `data` on the `posts` table. All the data in the column will be lost.
  - Added the required column `instaPostsDataId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "instaPostsDataId" INTEGER NOT NULL;

-- AlterTable
CREATE SEQUENCE posts_id_seq;
ALTER TABLE "posts" DROP COLUMN "data",
ALTER COLUMN "id" SET DEFAULT nextval('posts_id_seq');
ALTER SEQUENCE posts_id_seq OWNED BY "posts"."id";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_instaPostsDataId_fkey" FOREIGN KEY ("instaPostsDataId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
