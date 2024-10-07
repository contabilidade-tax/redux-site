/*
  Warnings:

  - Changed the type of `generated_at` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "token" ALTER COLUMN "generated_at" DROP DEFAULT;
ALTER TABLE "token" ALTER COLUMN "generated_at" TYPE int USING EXTRACT(EPOCH FROM "generated_at")::int;