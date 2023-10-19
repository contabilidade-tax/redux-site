import { NextRequest, NextResponse } from 'next/server';
import { getRedisValue, getDateTime } from '@/common/middleware/redisConfig';

export async function GET(req: NextRequest) {
    try {
        const customKey = req.nextUrl.searchParams.get('key');
        const cached_data = customKey ? await getRedisValue(customKey) : await getRedisValue(`last_insta_posts-${getDateTime()}`);

        if (cached_data) {
            return NextResponse.json(JSON.parse(cached_data), { status: 200 });
        }

        throw new Error(`No cached data for key ${customKey ?? 'last_insta_posts'}`);
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
};