/*
  Warnings:

  - You are about to alter the column `expires_in` on the `token` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "token" ALTER COLUMN "expires_in" SET DATA TYPE INTEGER;
