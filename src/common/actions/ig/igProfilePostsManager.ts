'use server'
import { database, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { clearCache, getDateTime, getRedisValue } from '@/common/redis/config';
import { InstaPostData, InstaTokenData } from "@/types";
import axios from "axios";

async function createOrUpdatePostsDataLocalCopy(postsData: any[]) {
    try {
        // Certifique-se de que InstaPostsData com id 1 existe pra evitar erros
        const existing = await database
            .select()
            .from(schema.instaPostsData)
            .where(eq(schema.instaPostsData.id, 1));

        if (existing.length === 0) {
            await database
                .insert(schema.instaPostsData)
                .values({ id: 1, generated_at: new Date() });
        } else {
            await database
                .update(schema.instaPostsData)
                .set({ generated_at: new Date() })
                .where(eq(schema.instaPostsData.id, 1));
        }

        const postsPromiseArray = postsData.map(async (post) => {
            const timestamp = new Date(post.timestamp!).toISOString();
            const postData = {
                id: post.id,
                caption: post.caption ?? ' Sem legenda...',
                media_type: post.media_type,
                media_url: post.media_url,
                permalink: post.permalink,
                timestamp: new Date(timestamp),
                username: post.username,
                instaPostsDataId: 1,
            };

            // Check if post exists
            const existingPost = await database
                .select()
                .from(schema.post)
                .where(eq(schema.post.id, post.id));

            if (existingPost.length > 0) {
                const updated = await database
                    .update(schema.post)
                    .set(postData)
                    .where(eq(schema.post.id, post.id))
                    .returning();
                return updated[0] || null;
            } else {
                const inserted = await database
                    .insert(schema.post)
                    .values(postData)
                    .returning();
                return inserted[0] || null;
            }
        });

        return await Promise.all(postsPromiseArray);
    } catch (error) {
        console.error('Error creating or updating posts:', error);
        throw error;
    }
}

async function deleteProfilePostsCache(key?: string) {
    return await clearCache(key ?? `last_insta_posts-${getDateTime()}`);
};

async function getCachedProfilePostsData() {
    try {
        const cached_data = await getRedisValue(`last_insta_posts-${getDateTime()}`);
        if (cached_data) {
            return JSON.parse(cached_data)
        }

        // Não deu erro mas nao tem cache
        return null
    } catch (error) {
        return null
    }

}

async function getProfilePostsDataOnLocalCopy() {
    try {
        const data = await database
            .select()
            .from(schema.instaPostsData)
            .where(eq(schema.instaPostsData.id, 1));

        if (data.length > 0) {
            // Get all posts for this instaPostsData
            const posts = await database
                .select()
                .from(schema.post)
                .where(eq(schema.post.instaPostsDataId, 1));

            return posts.slice(0, 25);
        }

        return [];
    } catch (error) {
        console.error('Error getting profile posts data:', error);
        throw error;
    }
}

async function getPostsDataFromIGApi(
    token: string
): Promise<InstaPostData[] | null> {
    try {
        const MAX_PAGES = 20;
        let url: string | null = `${process.env.NEXT_API_IG_URL}/me/media`;
        let allData: InstaPostData[] = [];
        let pageCount = 0;

        while (url && pageCount < MAX_PAGES) {
            const isFirstPage = pageCount === 0;

            const response = await axios.get(
                url,
                isFirstPage
                    ? {
                        params: {
                            fields:
                                "id,caption,media_type,media_url,permalink,timestamp,username",
                            access_token: token,
                        },
                    }
                    : undefined
            );

            if (response.data && response.data.data) {
                allData = [...allData, ...response.data.data];
            }

            url = response.data.paging?.next || null;
            pageCount += 1;
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