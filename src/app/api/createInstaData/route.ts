import { NextRequest, NextResponse } from 'next/server';
import { setRedisRegister, } from '@/common/middleware/redisConfig';
import { Prisma, PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const messages_array: Array<string> = []

    try {
        const data = await req.json()
        const customKey = req.nextUrl.searchParams.get('key');

        // Verifica se o objeto 'data' está vazio
        if (Object.keys(data).length === 0) {
            throw Error("O corpo da requisição não pode ser vazio")
        }

        const updateTokenDB = async (tokenData: Prisma.TokenDataCreateInput) => {
            return await prisma.tokenData.update({
                where: {
                    id: 1
                },
                data: {
                    ...tokenData,
                    generated_at: new Date()
                }
            })
        }

        const updatePostsDataDB = async (postsData: { data: Array<Prisma.PostCreateInput> }) => {
            const posts = postsData.data;
            const postsPromiseArray = posts.map((post) => {
                const timestamp = new Date(post.timestamp).toISOString()
                return prisma.post.upsert({
                    where: {
                        id: post.id
                    },
                    create: {
                        ...post,
                        timestamp,
                        instaPostsData: {
                            connect: { id: 1 } // Conecta ao InstaPostsData existente com id 1
                        }
                    },
                    update: {
                        ...post,
                        timestamp,
                        instaPostsData: {
                            connect: { id: 1 } // Conecta ao InstaPostsData existente com id 1
                        }
                    }
                });
            });

            try {
                const results = await Promise.all(postsPromiseArray);
                return results;
            } catch (error) {
                console.error("Erro ao atualizar os posts: ", error);
                throw error; // Ou lidar com o erro conforme necessário
            }
        };


        if (data) {
            let token_data
            if (customKey) {
                await Promise.all([
                    // Salva no prisma se for token
                    updateTokenDB(data),
                    // Salva no cache do prisma
                    setRedisRegister(data, customKey),
                ]).then(([data, cache]) => {
                    token_data = { ...data, expires_in: data.expires_in.toString() }
                    messages_array.push("Created Succesfully register on db");
                }).catch((error: any) => {
                    console.log(error)
                })

                return NextResponse.json({ data: token_data, message: `Created Succesfully for key: ${customKey}`, details: messages_array }, { status: 201 });
            }

            // Em caso de não ser token
            await Promise.all([
                // Salva no prisma cada post
                updatePostsDataDB(data),
                // Se não for token, salva no cache os posts
                setRedisRegister(data)
            ]).then(([data, cache]) => {
                messages_array.push("Created Succesfully db register: " + data.length);
                messages_array.push("Created Succesfully on cache: " + cache);
            })

            return NextResponse.json({ message: `Created Succesfully for key: last_insta_posts`, details: messages_array, ...data }, { status: 201 });
        }


    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: "Something went wrong", details: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
};