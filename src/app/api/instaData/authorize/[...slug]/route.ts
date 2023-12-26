import { Prisma, PrismaClient } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'
import crypto from 'crypto';
import { } from '@/app/instaData/page'

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

function criptografar(texto: any, chave: any, iv: any) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(chave, 'hex'), Buffer.from(iv, 'hex'));
  let textoCriptografado = cipher.update(texto);
  textoCriptografado = Buffer.concat([textoCriptografado, cipher.final()]);
  return iv.toString('hex') + ':' + textoCriptografado.toString('hex');
}

function descriptografar(textoCriptografado: any, chave: any) {
  const partesTexto = textoCriptografado.split(':');
  const iv = Buffer.from(partesTexto.shift(), 'hex');
  const textoEncriptado = Buffer.from(partesTexto.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(chave, 'hex'), iv);
  let textoDecifrado = decipher.update(textoEncriptado);
  textoDecifrado = Buffer.concat([textoDecifrado, decipher.final()]);
  return textoDecifrado.toString();
}


async function createInstaToken(apiUrl: string, Instadata: any) {
  try {
    const response = await axios.post(
      apiUrl,
      { ...Instadata },
      {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}` }, params: { key: 'token' }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`${error.response?.data.details ?? error.response?.data} - INTERNO`);
  }
}

// async function setCurrentUser(apiUrl: string, userData: Prisma.CurrentUserCreateInput) {
//   const prisma = new PrismaClient();
//   try {
//     // Troca e valida se o usuário é permitido de usar a plicação
//     const response = await axios.post(
//       apiUrl,
//       { ...userData },
//       { params: { key: 'user' } }
//     );

//     // Após validar, limpa o cache e o banco de dados deste usuário
//     try {
//       // CACHE
//       await axios.get("https://redux.app.br/api/deleteInstaData").then(res => console.log("Cache limpo", res.data))
//       // DATABASE
//       await prisma.post.deleteMany({ where: { instaPostsDataId: 1 } })

//     } catch (error: any) {
//       throw Error(error.message)
//     }

//     // Retorna os dados do usuário validado
//     return response.data;
//   } catch (error: any) {
//     throw new Error(`${error.response?.data.details ?? error.response?.data} - INTERNO`);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// async function fetchUserData(apiUrl: string, access_token: string, user_id: string) {
//   try {
//     const InstagramData = await axios.get(`${apiUrl}/${user_id}`, { params: { fields: 'id,username', access_token } })
//     return InstagramData.data;
//   } catch (error: any) { console.log(error.message) };

// }

export async function GET(req: NextRequest, context: any) {

  try {
    const code = req.nextUrl.searchParams.get('code');
    const auth_param: string = context.params.slug[0]

    // return NextResponse.json({ code, auth_param: auth_param.split(':') }, { status: 200 });
    // return NextResponse.json({ code, auth_param }, { status: 200 });

    if (!code) {
      throw new Error('Code not found, this is a route to authorize app only');
    }
    if (!auth_param) {
      throw new Error('Provide auth! This is a security route to authorize app only');
    }

    const chave = process.env.NEXT_PUBLIC_CRYPTO_KEY!

    try {
      const token_auth = descriptografar(auth_param, chave)
      if (token_auth !== process.env.NEXT_PUBLIC_BEARER_TOKEN) {
        throw new Error('Token invalid!')
      }
    } catch (error: any) {
      return NextResponse.json({ error: 'Não autorizado!', details: error.message }, { status: 401 });
    }

    const key = process.env.NEXT_PUBLIC_CRYPTO_KEY
    const iv = process.env.NEXT_PUBLIC_CRYPTO_IV
    const token = process.env.NEXT_PUBLIC_BEARER_TOKEN
    const tokenUrl = "https://api.instagram.com/oauth/access_token"
    const graphApiUrl = process.env.NEXT_PUBLIC_API_IG_URL;
    const apiIgLongLivedTokenUrl = `${graphApiUrl}/access_token`
    const createTokenApiUrl = `${process.env.NEXT_PUBLIC_HOME}/api/createInstaData`
    const redirect_uri = `${process.env.NEXT_PUBLIC_HOME}/api/instaData/authorize/${encodeURIComponent(criptografar(token, key, iv))}/`
    const client_secret = process.env.NEXT_PUBLIC_API_IG_APP_SECRET!
    const client_id = process.env.NEXT_PUBLIC_API_IG_APP_ID
    const data = qs.stringify({
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri,
      code: code!.replace("#_", "")
    })

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
      // const instaUserInfo = await fetchUserData(graphApiUrl!, longLivedTokenData.access_token, user_id);
      // const userData = await setCurrentUser(createTokenApiUrl, { access_token: longLivedTokenData.access_token, user_id, username: instaUserInfo.username });
      const createdToken = await createInstaToken(createTokenApiUrl, longLivedTokenData);

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOME}/redirect`);
    } catch (error: any) {
      throw new Error(error.response?.data.error_message + ':IG' ?? error.message);
    }

  } catch (e: any) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

}