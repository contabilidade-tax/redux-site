import { Prisma, PrismaClient } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

async function getLongLivedToken(longLivedTokenurl: string, client_secret: string, access_token: string) {
  try {
    const response = await axios.get(longLivedTokenurl, {
      params: { grant_type: "ig_exchange_token", client_secret, access_token }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error_message ?? error.message);
  }
}


async function createInstaToken(apiUrl: string, Instadata: any) {
  try {
    const response = await axios.post(
      apiUrl,
      { ...Instadata },
      { params: { key: 'token' } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`${error.response?.data.details ?? error.response?.data} - INTERNO`);
  }
}

async function setCurrentUser(apiUrl: string, userData: Prisma.CurrentUserCreateInput) {
  const prisma = new PrismaClient();
  try {
    // Troca e valida se o usuário é permitido de usar a plicação
    const response = await axios.post(
      apiUrl,
      { ...userData },
      { params: { key: 'user' } }
    );

    // Após validar, limpa o cache e o banco de dados deste usuário
    try {
      // CACHE
      await axios.get("https://redux.app.br/api/deleteInstaData").then(res => console.log("Cache limpo", res.data))
      // DATABASE
      await prisma.post.deleteMany({ where: { instaPostsDataId: 1 } })

    } catch (error: any) {
      throw Error(error.message)
    }

    // Retorna os dados do usuário validado
    return response.data;
  } catch (error: any) {
    throw new Error(`${error.response?.data.details ?? error.response?.data} - INTERNO`);
  } finally {
    await prisma.$disconnect();
  }
}

async function fetchUserData(apiUrl: string, access_token: string, user_id: string) {
  try {
    const InstagramData = await axios.get(`${apiUrl}/${user_id}`, { params: { fields: 'id,username', access_token } })
    return InstagramData.data;
  } catch (error: any) { console.log(error.message) };

}

export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const code = req.nextUrl.searchParams.get('code');
    const tokenUrl = "https://api.instagram.com/oauth/access_token"
    const graphApiUrl = process.env.NEXT_PUBLIC_API_IG_URL;
    const apiIgLongLivedTokenUrl = `${graphApiUrl}/access_token`
    const createTokenApiUrl = `${process.env.NEXT_PUBLIC_HOME}/api/createInstaData`
    const redirect_uri = `${process.env.NEXT_PUBLIC_HOME}/api/instaData/authorize`
    const client_secret = process.env.NEXT_PUBLIC_API_IG_APP_SECRET!
    const client_id = process.env.NEXT_PUBLIC_API_IG_APP_ID
    const data = qs.stringify({
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri,
      code: code!.replace("#_", "")
    })

    if (!code) {
      throw new Error('Code not found, this is a route to authorize app only');
    }

    try {
      const response = await axios.post(
        tokenUrl,
        data,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      // console.log(response.data);

      const shortLivedToken = response.data.access_token;
      const user_id = response.data.user_id;
      const longLivedTokenData = await getLongLivedToken(apiIgLongLivedTokenUrl, client_secret, shortLivedToken);
      const instaUserInfo = await fetchUserData(graphApiUrl!, longLivedTokenData.access_token, user_id);
      const userData = await setCurrentUser(createTokenApiUrl, { access_token: longLivedTokenData.access_token, user_id, username: instaUserInfo.username });
      const createdToken = await createInstaToken(createTokenApiUrl, longLivedTokenData);

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOME}/home?welcome=1#recents`);
    } catch (error: any) {
      throw new Error(error.response?.data.error_message ?? error.message);
    }

  } catch (e: any) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

}