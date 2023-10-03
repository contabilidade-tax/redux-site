import { NextRequest, NextResponse } from 'next/server';
import { clearCache } from '@/common/middleware/redisConfig';


export async function GET(req: NextRequest) {
    try {
        const cached_data = await clearCache();

        return NextResponse.json('No cached data');
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
    }
};