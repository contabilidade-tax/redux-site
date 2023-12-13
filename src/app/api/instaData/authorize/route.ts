import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

async function getLongLivedToken(longLivedTokenurl: string, client_secret: string, access_token: string) {
  const response = await axios.post(
    longLivedTokenurl,
    {},
    {
      params: { grant_type: "ig_exchange_token", client_secret, access_token }
    })

  const data = response.data
  return data
}

async function createInstaToken(apiUrl: string, Instadata: any) {
  const response = await axios.post(
    apiUrl,
    { ...Instadata },
    {}
  )

  const data = response.data
  return data
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    const tokenUrl = "https://api.instagram.com/oauth/access_token"
    const apiIgLongLivedTokenUrl = `${process.env.NEXT_PUBLIC_API_IG_URL}/access_token`
    const createTokenApiUrl = `${process.env.NEXT_PUBLIC_HOME}/api/createInstaData`
    const redirect_uri = `${process.env.NEXT_PUBLIC_HOME}/api/instaData/authorize`
    const client_secret = process.env.NEXT_PUBLIC_API_IG_APP_SECRET
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

    await axios.post(
      tokenUrl,
      data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      console.log(response.data)
      const client_secret = process.env.NEXT_PUBLIC_API_IG_APP_SECRET!
      const shortLivedToken = response.data.access_token

      const data = getLongLivedToken(apiIgLongLivedTokenUrl, client_secret, shortLivedToken)
      const createdToken = createInstaToken(createTokenApiUrl, data)

      return NextResponse.redirect("/")
    }).catch((error: any) => {
      console.log(error.response!.data)
      throw new Error(error.response.data.error_message)
    })

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (e: any) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

}