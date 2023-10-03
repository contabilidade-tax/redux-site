import { NextRequest, NextResponse } from 'next/server';
import { getRedisValue, getDate } from '@/common/middleware/redisConfig';

export async function GET(req: NextRequest) {
    try {
        const cached_data = await getRedisValue(`last_insta_posts-${getDate()}`);

        if (cached_data) {
            return NextResponse.json(JSON.parse(cached_data), { status: 200 });
        }

        throw new Error('No cached data');
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
};