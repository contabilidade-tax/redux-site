import { NextRequest, NextResponse } from 'next/server';
import { getRedisValue, getDateTime } from '@/common/middleware/redisConfig';
import { PrismaClient } from '@prisma/client';

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const messages_array: Array<string> = []

    try {
        const customKey = req.nextUrl.searchParams.get('key');
        const cached_data = customKey ? await getRedisValue(customKey) : await getRedisValue(`last_insta_posts-${getDateTime()}`);
        const db_data = await prisma.instaPostsData.findUnique({
            where: {
                id: 1
            },
            include: {
                data: true
            }
        }).then((data) => {
            return data?.data.slice(0, 25)
        })

        if (cached_data) {
            return NextResponse.json(JSON.parse(cached_data), { status: 200 });
        } else if (db_data) {
            // Avisa que não tá guardando em cache e pode haver um problema com token ou a api do facebook
            const message = "InstaPosts sem cache, verifique se o token está correto. Os posts exibidos estão guardados em banco e possivelmente, desatualizados."
            await fetch(`https://woz.herokuapp.com/webhook/control/report/send-message?group=REPORT`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: `\n*REDUX_SITE*: ${message}` }),
            }).then(async data => {
                const body = await data.json()

                messages_array.push(body.Success)
                messages_array.push(message)
            })

            return NextResponse.json({ message: "Sucesso na requisição dos dados", details: messages_array, data: db_data, }, { status: 200 });
        }

        return NextResponse.json("Não tem nada cacheado mermão!", { status: 202 });

        // throw new Error(`No cached data for key ${customKey ?? `last_insta_posts-${getDateTime()}`}`);
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    } finally {
        // await prisma.$disconnect();
    }
};