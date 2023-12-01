-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "data" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "access_token" TEXT NOT NULL,
    "token_type" TEXT NOT NULL DEFAULT 'bearer',
    "expires_in" BIGINT NOT NULL,
    "generated_at" BIGINT NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);
