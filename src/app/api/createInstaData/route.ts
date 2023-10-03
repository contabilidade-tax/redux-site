import { NextRequest, NextResponse } from 'next/server';
import { setRedisRegister, } from '@/common/middleware/redisConfig';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        // Verifica se o objeto 'data' está vazio
        if (Object.keys(data).length === 0) {
            return NextResponse.json({ message: "O corpo da requisição não pode ser vazio" }, { status: 400 });
        }

        if (data) {
            const cached_data = await setRedisRegister(data);
            return NextResponse.json({ cached_data, message: "Created Succesfully" }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};