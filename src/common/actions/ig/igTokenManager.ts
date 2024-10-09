'use server'
import { Prisma, PrismaClient } from "@prisma/client";
import axios from "axios";

async function setTokenDataOnDb(tokenData: Prisma.TokenDataCreateInput) {
    const prisma = new PrismaClient()
    try {
        return await prisma.tokenData.upsert({
            where: {
                id: 1
            },
            create: {
                id: 1,
                ...tokenData,
                access_token: tokenData.access_token,
                generated_at: tokenData.generated_at,
                expires_in: tokenData.expires_in.toString()
            },
            update: {
                ...tokenData,
                access_token: tokenData.access_token,
                expires_in: tokenData.expires_in.toString()
            }
        })

    } finally {
        await prisma.$disconnect()
    }
}

async function getTokenDataOnDb() {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.tokenData.findUnique({
            where: { id: 1 }
        });

        if (data) {
            return {
                ...data,
                generated_at: data.generated_at,
                expires_in: Number(data.expires_in.toString())
            };
        }

        return null
    } finally {
        prisma.$disconnect()
    }
}

async function renewToken(expiredToken: string) {
    // const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;
    // const iv = process.env.NEXT_PUBLIC_CRYPTO_IV;
    // const authorization = process.env.NEXT_PUBLIC_BEARER_TOKEN;
    //
    // const api_base = "https://api.instagram.com/oauth/authorize";
    // const appId = process.env.NEXT_PUBLIC_API_IG_APP_ID;
    // const scope = "user_profile,user_media";
    // const redirectUri = `/api/instaData/authorize/${encodeURIComponent(
    //   criptografar(authorization, key, iv)
    // )}/`;

    try {
        const url = `${process.env.NEXT_PUBLIC_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${expiredToken}`;
        const response = await axios.get(url);
        const responseDataWithTimestamp = {
            ...response.data,
            generated_at: Date.now().toString(),
        };

        return responseDataWithTimestamp;
    } catch (error: any) {
        console.error("Erro ao renovar o token:", error.message);
        // Se code 190 pega um novo
        // GAMBIARRA BRABA MAS FUNCIONA
        // SE NÃO FOR POSSÍVEL RENOVAR AUTOMATICAMENTE FORÇA À RELOGAR COM O INSTA
        // if (error.response.data.error.code === 190) {
        //   router.replace(
        //     `${api_base}?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
        //   );
        // }
    }
}


export { setTokenDataOnDb, getTokenDataOnDb, renewToken }