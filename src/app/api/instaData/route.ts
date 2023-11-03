import { NextRequest, NextResponse } from 'next/server';
import { getRedisValue, getDateTime } from '@/common/middleware/redisConfig';
import { getCookie } from '@/common/middleware/midleware';
import { Console } from 'console';

export async function GET(req: NextRequest) {
    try {
        const customKey = req.nextUrl.searchParams.get('key');
        let cached_data;
        const cookie = await getCookie('tax.instaPostData');

        if (cookie) {
            cached_data = cookie
        } else {
            cached_data = customKey ? await getRedisValue(customKey) : await getRedisValue(`last_insta_posts-${getDateTime()}`);
        }

        if (cached_data) {
            return NextResponse.json(JSON.parse(cached_data), { status: 200 });
        }

        return NextResponse.json("Não tem nada cacheado mermão!", { status: 202 });

        // throw new Error(`No cached data for key ${customKey ?? `last_insta_posts-${getDateTime()}`}`);
    } catch (error: any) {
        console.log('fdasdasd', error.message)
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
};