'use server'
import { Prisma, PrismaClient } from "@prisma/client";

async function setTokenDataOnDb(tokenData: Prisma.TokenDataCreateInput) {
    const prisma = new PrismaClient()
    try {
        return await prisma.tokenData.upsert({
            where: {
                id: 1
            },
            create: {
                id: 1,
                ...tokenData,
                access_token: tokenData.access_token,
                generated_at: tokenData.generated_at,
                expires_in: tokenData.expires_in.toString()
            },
            update: {
                ...tokenData,
                access_token: tokenData.access_token,
            }
        })

    } finally {
        await prisma.$disconnect()
    }
}

async function getTokenDataOnDb() {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.tokenData.findUnique({
            where: { id: 1 }
        });

        if (data) {
            return {
                ...data,
                generated_at: data.generated_at,
                expires_in: Number(data.expires_in.toString())
            };
        }

        return null
    } finally {
        prisma.$disconnect()
    }
}

export { setTokenDataOnDb, getTokenDataOnDb }