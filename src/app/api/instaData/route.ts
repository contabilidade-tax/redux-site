import { NextRequest, NextResponse } from 'next/server';
import { getRedisValue, getDateTime } from '@/common/middleware/redisConfig';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function getTokenData() {
    const data = await prisma.tokenData.findUnique({
        where: { id: 1 }
    });

    if (!data) {
        throw new Error("Token não encontrado");
    }

    return {
        ...data,
        generated_at: data.generated_at.getTime(),
        expires_in: Number(data.expires_in.toString())
    };
}



export async function GET(req: NextRequest) {
    const messages_array: Array<string> = [];
    try {
        const customKey = req.nextUrl.searchParams.get('key');
        const cached_data = await getRedisValue(`last_insta_posts-${getDateTime()}`);

        if (cached_data && !customKey) {
            return NextResponse.json(JSON.parse(cached_data), { status: 200 });
        }

        let db_data;
        if (customKey) {
            db_data = await getTokenData()
        } else {
            db_data = cached_data
        }

        return NextResponse.json({ message: "Sucesso na requisição dos dados", details: messages_array, data: db_data }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
