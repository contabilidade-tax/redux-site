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


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    const tokenUrl = "https://api.instagram.com/oauth/access_token"
    const apiIgLongLivedTokenUrl = `${process.env.NEXT_PUBLIC_API_IG_URL}/access_token`
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
      console.log(response.data);

      const shortLivedToken = response.data.access_token;
      const longLivedTokenData = await getLongLivedToken(apiIgLongLivedTokenUrl, client_secret, shortLivedToken);
      const createdToken = await createInstaToken(createTokenApiUrl, longLivedTokenData);

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOME}/home?welcome=1`);
    } catch (error: any) {
      throw new Error(error.response?.data.error_message ?? error.message);
    }

  } catch (e: any) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

}