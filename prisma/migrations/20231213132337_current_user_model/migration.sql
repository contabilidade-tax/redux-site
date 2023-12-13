-- CreateTable
CREATE TABLE "current_user" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "access_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "current_user_pkey" PRIMARY KEY ("id")
);
