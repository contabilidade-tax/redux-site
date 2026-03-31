import axios from 'axios';
import crypto from 'crypto';
import qs from 'qs';
import { NextRequest, NextResponse } from 'next/server';

import { setCurrentProfile } from '@/common/actions/ig/igProfileManager';
import { setTokenDataOnDb } from '@/common/actions/ig/igTokenManager';

type ProviderName = 'instagram';
type RouteParams = { params: { provider: string; action: string } };

function resolveProvider(providerRaw: string): ProviderName | null {
  const provider = providerRaw.toLowerCase();

  if (provider === 'instagram' || provider === 'instadata') {
    return 'instagram';
  }

  return null;
}

function getOAuthStateCookieName(provider: ProviderName) {
  return `oauth_state_${provider}`;
}

function buildProviderCallbackUrl(provider: ProviderName): string {
  const home = process.env.NEXT_PUBLIC_HOME;

  if (!home) {
    throw new Error('NEXT_PUBLIC_HOME is required for OAuth callback URL');
  }

  return new URL(`/${provider}/authorize/callback`, home).toString();
}

function createState() {
  return crypto.randomBytes(24).toString('hex');
}

function buildProviderStartUrl(provider: ProviderName, state: string): string {
  if (provider !== 'instagram') {
    throw new Error(`Unsupported provider for start URL: ${provider}`);
  }

  const apiBase = 'https://api.instagram.com/oauth/authorize';
  const appId = process.env.NEXT_API_IG_APP_ID;
  const scope = process.env.NEXT_API_IG_SCOPES || 'user_profile,user_media';

  if (!appId) {
    throw new Error('NEXT_API_IG_APP_ID is required for OAuth start URL');
  }

  const redirectUri = buildProviderCallbackUrl(provider);
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope,
    response_type: 'code',
    state,
  });

  return `${apiBase}?${params.toString()}`;
}

async function getInstagramLongLivedToken(clientSecret: string, accessToken: string) {
  const graphApiUrl = process.env.NEXT_API_IG_URL;
  const exchangeUrl = `${graphApiUrl}/access_token`;

  try {
    const response = await axios.get(exchangeUrl, {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: clientSecret,
        access_token: accessToken,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error_message ?? error.message);
  }
}

async function handleInstagramCallback(req: NextRequest, provider: ProviderName) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  const stateCookieName = getOAuthStateCookieName(provider);
  const expectedState = req.cookies.get(stateCookieName)?.value;

  if (!code) {
    throw new Error('Code not found, this is a route to authorize app only');
  }

  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.json(
      { error: 'OAuth state mismatch. Authorization denied.' },
      { status: 401 }
    );
  }

  const clientSecret = process.env.NEXT_API_IG_APP_SECRET;
  const clientId = process.env.NEXT_API_IG_APP_ID;

  if (!clientSecret || !clientId) {
    throw new Error('Instagram OAuth env vars are missing');
  }

  const tokenUrl = 'https://api.instagram.com/oauth/access_token';
  const redirectUri = buildProviderCallbackUrl(provider);

  const data = qs.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code: code.replace('#_', ''),
  });

  try {
    const exchangeResponse = await axios.post(tokenUrl, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const shortLivedToken = exchangeResponse.data.access_token;
    const userId = exchangeResponse.data.user_id;

    const longLivedToken = await getInstagramLongLivedToken(
      clientSecret,
      shortLivedToken
    );

    await setCurrentProfile({
      access_token: longLivedToken.access_token,
      user_id: userId,
    });

    await setTokenDataOnDb(longLivedToken);

    const redirectResponse = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_HOME}/?welcome=1`
    );

    redirectResponse.cookies.delete(stateCookieName);

    return redirectResponse;
  } catch (error: any) {
    throw new Error(
      error.response?.data.error_message
        ? `${error.response.data.error_message}:IG`
        : error.message
    );
  }
}

export async function GET(req: NextRequest, context: RouteParams) {
  const provider = resolveProvider(context.params.provider);
  const action = context.params.action?.toLowerCase();

  if (!provider) {
    return NextResponse.json({ error: 'Unsupported provider' }, { status: 404 });
  }

  if (action === 'start') {
    try {
      const state = createState();
      const authorizeUrl = buildProviderStartUrl(provider, state);
      const response = NextResponse.redirect(authorizeUrl);

      response.cookies.set(getOAuthStateCookieName(provider), state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 10,
        path: `/${provider}/authorize`,
      });

      return response;
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  if (action !== 'callback') {
    return NextResponse.json(
      { error: 'Invalid authorization route action' },
      { status: 404 }
    );
  }

  try {
    if (provider === 'instagram') {
      return await handleInstagramCallback(req, provider);
    }

    return NextResponse.json({ error: 'Unsupported provider' }, { status: 404 });
  } catch (error: any) {
    const errorResponse = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

    errorResponse.cookies.delete(getOAuthStateCookieName(provider));

    return errorResponse;
  }
}
