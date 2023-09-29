import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, saveSession } from '@/lib/sessionManager';

// Função fictícia - substitua com a lógica adequada para renovar o token.
async function renewToken() {
  // Lógica para renovar o token...
  return { token: 'newToken', expiresIn: 3600, tokenType: 'Bearer' };
}

export default async function checkToken(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { token, expiryTime, tokenType } = session;
  const now = Date.now();

  if (now >= expiryTime) {
    try {
      const { token: newToken, expiresIn, tokenType: newTokenType } = await renewToken();
      const newExpiryTime = now + expiresIn * 1000;

      saveSession({ token: newToken, expiryTime: newExpiryTime, tokenType: newTokenType });
      req.headers.authorization = `${newTokenType} ${newToken}`;
    } catch (error) {
      console.error('Failed to renew token', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    req.headers.authorization = `${tokenType} ${token}`;
  }

}
