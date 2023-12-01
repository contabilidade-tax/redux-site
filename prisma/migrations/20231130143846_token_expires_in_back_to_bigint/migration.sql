/*
  Warnings:

  - Changed the type of `expires_in` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "token" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" BIGINT NOT NULL;
