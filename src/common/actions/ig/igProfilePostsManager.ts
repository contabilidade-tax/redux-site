'use server'
import { Prisma, PrismaClient } from "@prisma/client";
import { clearCache, getDateTime, getRedisValue } from '@/common/redis/config';
import { InstaPostData } from "@/types";

async function updateOrCreatePostsDataOnDb(postsData: any[]) {
    const prisma = new PrismaClient()
    try {
        // Certifique-se de que InstaPostsData com id 1 existe pra evitar erros
        await prisma.instaPostsData.upsert({
            where: { id: 1 },
            create: { id: 1, generated_at: new Date() },
            update: { generated_at: new Date() }
        });

        const postsPromiseArray = postsData.map((post) => {
            const timestamp = new Date(post.timestamp!).toISOString()
            return prisma.post.upsert({
                where: {
                    id: post.id
                },
                create: {
                    ...post,
                    timestamp,
                    caption: post.caption ?? ' Sem legenda...',
                    instaPostsData: {
                        connect: { id: 1 }
                    }
                },
                update: {
                    ...post,
                    timestamp,
                    caption: post.caption ?? ' Sem legenda...',
                    instaPostsData: {
                        connect: { id: 1 }
                    }
                }
            });
        });
        return await Promise.resolve(postsPromiseArray);
    } finally {
        prisma.$disconnect()
    }
};

async function deleteProfilePostsCache(key?: string) {
    return await clearCache(key ?? `last_insta_posts-${getDateTime()}`);
};

async function getCachedProfilePostsData() {
    const cached_data = await getRedisValue(`last_insta_posts-${getDateTime()}`);
    if (cached_data) {
        return JSON.parse(cached_data)
    }

    return null
}

async function getProfilePostsDataOnDb() {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.instaPostsData.findUnique({
            where: { id: 1 },
            include: { data: true }
        });

        return data ? data.data.slice(0, 25) : [];
    } finally {
        prisma.$disconnect()
    }
}

export {
    updateOrCreatePostsDataOnDb,
    deleteProfilePostsCache,
    getCachedProfilePostsData,
    getProfilePostsDataOnDb
}