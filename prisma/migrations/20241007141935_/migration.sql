-- AlterTable
ALTER TABLE "token" ADD COLUMN     "permissions" TEXT,
ALTER COLUMN "expires_in" SET DATA TYPE TEXT;
