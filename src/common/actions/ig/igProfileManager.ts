'use server'
import { Prisma, PrismaClient } from "@prisma/client";

async function setCurrentProfile(currentUserData: Prisma.CurrentUserCreateInput) {
    const prisma = new PrismaClient()
    try {
        const allowedUserProfileIds = process.env.ALLOWED_USER_ID ? process.env.ALLOWED_USER_ID.split(',').map(id => id.trim()) : [];
        const userProfileId = String(currentUserData.user_id).trim();
        // Verifica se o user_id de currentUser está na lista de permitidos
        if (!allowedUserProfileIds.includes(userProfileId)) {
            throw new Error(`Usuário do app inválido! Este app somente deve ser usado pela TAX CONTABILIDADE. code:${userProfileId}:${allowedUserProfileIds}`);
        }

        return await prisma.currentUser.upsert({
            where: {
                id: 1
            },
            create: {
                id: 1,
                ...currentUserData,
                user_id: currentUserData.user_id.toString(),
            },
            update: {
                ...currentUserData,
                user_id: currentUserData.user_id.toString(),
            }
        })
    } finally {
        prisma.$disconnect();
    }
}

export { setCurrentProfile }