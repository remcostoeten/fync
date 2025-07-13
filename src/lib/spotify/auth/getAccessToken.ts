import type { TAccessTokenResponse, TCachedToken } from './types';

let cachedToken: TCachedToken | null = null;

async function getClientCredentialsToken(): Promise<TAccessTokenResponse> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify client credentials in environment variables');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function isTokenExpired(token: TCachedToken): boolean {
  return Date.now() >= token.expiresAt;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && !isTokenExpired(cachedToken)) {
    return cachedToken.accessToken;
  }

  const tokenResponse = await getClientCredentialsToken();
  
  cachedToken = {
    accessToken: tokenResponse.access_token,
    expiresAt: Date.now() + (tokenResponse.expires_in * 1000) - 60000,
    refreshToken: tokenResponse.refresh_token,
  };

  return cachedToken.accessToken;
}

export { getAccessToken };
