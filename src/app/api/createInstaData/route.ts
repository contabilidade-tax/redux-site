import { NextRequest, NextResponse } from 'next/server';
import { setRedisRegister, } from '@/common/redis/config';
import { Prisma, PrismaClient } from '@prisma/client'
import crypto from 'node:crypto';

function criptografar(texto: any, chave: any, iv: any) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(chave, 'hex'), Buffer.from(iv, 'hex'));
    let textoCriptografado = cipher.update(texto);
    textoCriptografado = Buffer.concat([textoCriptografado, cipher.final()]);
    return iv.toString('hex') + ':' + textoCriptografado.toString('hex');
}


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

        const updateTokenDB = async (tokenData: Prisma.TokenDataCreateInput) => {
            return await prisma.tokenData.upsert({
                where: {
                    id: 1
                },
                create: {
                    id: 1,
                    ...tokenData,
                    access_token: tokenData.access_token,
                    generated_at: new Date()
                },
                update: {
                    ...tokenData,
                    access_token: tokenData.access_token,
                    generated_at: new Date()
                }
            })
        }

        const setCurrentUser = async (currentUserData: Prisma.CurrentUserCreateInput) => {
            const allowedUserIds = process.env.ALLOWED_USER_ID ? process.env.ALLOWED_USER_ID.split(',').map(id => id.trim()) : [];
            const userId = String(currentUserData.user_id).trim();
            // Verifica se o user_id de currentUser está na lista de permitidos
            if (!allowedUserIds.includes(userId)) {
                console.log("Usuário do app inválido! Este app somente deve ser usado pela TAX CONTABILIDADE. code:", userId, allowedUserIds);
                throw new Error(`Usuário do app inválido! Este app somente deve ser usado pela TAX CONTABILIDADE. code:${userId}:${allowedUserIds}`);
            }

            return await prisma.currentUser.upsert({
                where: {
                    id: 1
                },
                create: {
                    id: 1,
                    ...currentUserData,
                    user_id: currentUserData.user_id.toString(),
                },
                update: {
                    ...currentUserData,
                    user_id: currentUserData.user_id.toString(),
                }
            })
        }

        const ensureInstaPostsDataExists = async () => {
            await prisma.instaPostsData.upsert({
                where: { id: 1 },
                create: { id: 1, generated_at: new Date() },
                update: { generated_at: new Date() }
            });
        };

        const updatePostsDataDB = async (postsData: { data: Array<Prisma.PostCreateInput> }) => {
            // Certifique-se de que InstaPostsData com id 1 existe
            await ensureInstaPostsDataExists();

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
                        caption: post.caption ?? ' Sem legenda...',
                        instaPostsData: {
                            connect: { id: 1 } // Conecta ao InstaPostsData existente com id 1
                        }
                    },
                    update: {
                        ...post,
                        timestamp,
                        caption: post.caption ?? ' Sem legenda...',
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

        // Não precisar verificar se tem body na requisição
        // já que se não tiver já lanço um erro logo acima

        if (customKey) {
            let tokenData;
            switch (customKey) {
                case 'token':
                    await Promise.all([
                        // Salva no prisma se for token
                        updateTokenDB(data),
                        // Salva no cache do prisma
                        setRedisRegister(data, customKey),
                    ]).then(([data, cache]) => {
                        tokenData = { ...data, expires_in: data.expires_in.toString() }
                        messages_array.push("Created Successfully register on db");
                        messages_array.push("Created Successfully on cache: " + cache);
                    }).catch((error: any) => {
                        console.error(error);
                    });

                    return NextResponse.json({ message: `Created Successfully for key: ${customKey}`, details: messages_array, data: tokenData, }, { status: 201 });

                case 'user':
                    try {
                        const keyData = await setCurrentUser(data)

                        return NextResponse.json({ message: `Created Successfully register on DB for key: user`, details: messages_array, keyData }, { status: 201 });

                    } catch (error: any) {
                        console.error(error)
                        throw error
                    }

                default:
                    // Tratativa para outros valores de customKey
                    try {
                        const keyData = await setRedisRegister(data, customKey)
                        messages_array.push("Created Successfully on cache anykey: " + keyData);

                        return NextResponse.json({ message: `Created Successfully for key: ${customKey}`, details: messages_array, keyData }, { status: 201 });
                    } catch (error: any) {
                        console.error(error.message)
                    }

            }
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


    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: "Something went wrong", details: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
};