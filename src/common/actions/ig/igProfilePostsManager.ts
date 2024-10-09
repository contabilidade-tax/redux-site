'use server'
import { Prisma, PrismaClient } from "@prisma/client";
import { clearCache, getDateTime, getRedisValue } from '@/common/redis/config';
import { InstaPostData, InstaTokenData } from "@/types";
import axios from "axios";

async function createOrUpdatePostsDataLocalCopy(postsData: any[]) {
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

async function getProfilePostsDataOnLocalCopy() {
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

async function getPostsDataFromIGApi(
    token: string
): Promise<InstaPostData[] | null> {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_IG_URL}/me/media`;
        let allData: InstaPostData[] = [];

        for (let i = 0; i === 0; i++) {
            if (!url) break; // Se não houver mais URLs para buscar, interrompe o loop

            const response = await axios.get(url, {
                params: {
                    fields:
                        "id,caption,media_type,media_url,permalink,timestamp,username",
                    access_token: token,
                },
            });

            if (response.data && response.data.data) {
                allData = [...allData, ...response.data.data];
            }

            url = response.data.paging?.next || null;
        }

        return allData;
    } catch (error: any) {
        console.log(
            "Erro ao buscar os posts da API INSTA:",
            `Message: ${error.message}`,
            `Response: ${error.response?.data}`
        );
        return null;
    }
}


export {
    createOrUpdatePostsDataLocalCopy,
    deleteProfilePostsCache,
    getCachedProfilePostsData,
    getProfilePostsDataOnLocalCopy,
    getPostsDataFromIGApi
}