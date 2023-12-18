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

async function getInstaPostsData() {
    const data = await prisma.instaPostsData.findUnique({
        where: { id: 1 },
        include: { data: true }
    });

    return data ? data.data.slice(0, 25) : [];
}

async function sendMessage(message: string) {
    const response = await axios.post(
        `https://woz.herokuapp.com/webhook/control/report/send-message?group=REPORT`,
        { text: `\n*REDUX_SITE*: ${message}` },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    return response.data.Success;
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
            db_data = cached_data ?? await getInstaPostsData();
        }

        if (!customKey && !cached_data) {
            const message = "InstaPosts sem cache, verifique se o token está correto. Os posts exibidos estão guardados em banco e possivelmente, desatualizados.";
            const messageSent = await sendMessage(message);

            messages_array.push(messageSent);
            messages_array.push(message);
        }

        return NextResponse.json({ message: "Sucesso na requisição dos dados", details: messages_array, data: db_data }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
