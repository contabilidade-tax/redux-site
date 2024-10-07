import { NextRequest, NextResponse } from 'next/server';
import { setRedisRegister, } from '@/common/redis/config';
import { Prisma, PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const messages_array: Array<string> = []

    try {
        const data = await req.json()
        const customKey = req.nextUrl.searchParams.get('key');
        const token = req.headers.get('Authorization')?.split(' ')[1]

        if (token !== process.env.NEXT_PUBLIC_BEARER_TOKEN) {
            return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
        }

        // Verifica se o objeto 'data' está vazio
        if (Object.keys(data).length === 0) {
            throw Error("O corpo da requisição não pode ser vazio")
        }

        // Não precisar verificar se tem body na requisição
        // já que se não tiver já lanço um erro logo acima

        if (customKey) {
            // Tratativa para outros valores de customKey
            try {
                const keyData = await setRedisRegister(data, customKey)
                messages_array.push("Created Successfully on cache anykey: " + keyData);

                return NextResponse.json({ message: `Created Successfully for key: ${customKey}`, details: messages_array, keyData }, { status: 201 });
            } catch (error: any) {
                console.error(error.message)
            }

        }


        // // Em caso de não ser token
        // await Promise.all([
        //     // Salva no prisma cada post
        //     // updatePostsDataDB(data),
        //     // Se não for token, salva no cache os posts
        //     setRedisRegister(data)
        // ]).then(([data, cache]) => {
        //     messages_array.push("Created Succesfully db register: " + data.length);
        //     messages_array.push("Created Succesfully on cache: " + cache);
        // })

        return NextResponse.json({ message: `Created Succesfully for key: last_insta_posts`, details: messages_array, ...data }, { status: 201 });


    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: "Something went wrong", details: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
};