import { NextRequest, NextResponse } from 'next/server';
import { setRedisRegister, } from '@/common/middleware/redisConfig';
import { setCookie } from '@/common/middleware/midleware';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const customKey = req.nextUrl.searchParams.get('key');

        // Verifica se o objeto 'data' está vazio
        if (Object.keys(data).length === 0) {
            return NextResponse.json({ message: "O corpo da requisição não pode ser vazio" }, { status: 400 });
        }

        if (data) {
            let cached_data;
            if (customKey) {
                cached_data = await setRedisRegister(data, customKey)
            } else {
                cached_data = await setRedisRegister(data);
                // await setCookie('tax.instaPostData', data);
            }
            return NextResponse.json({ cached_data, message: "Created Succesfully for key: " + customKey ?? "last_insta_posts" }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};