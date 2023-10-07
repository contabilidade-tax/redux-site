import { NextRequest, NextResponse } from 'next/server';
import { clearCache } from '@/common/middleware/redisConfig';


export async function GET(req: NextRequest) {
    try {
        const customKey = req.nextUrl.searchParams.get('key');
        const cached_data = customKey ? await clearCache(customKey) : await clearCache();

        return NextResponse.json('No cached data for key: ' + customKey ?? 'last_insta_posts', { status: 202 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
    }
};