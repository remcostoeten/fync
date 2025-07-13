type TAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
};

type TCachedToken = {
  accessToken: string;
  expiresAt: number;
  refreshToken?: string;
};

type TSpotifyAuthFactory = {
  getAccessToken: () => Promise<string>;
  refreshToken: (refreshToken: string) => Promise<TAccessTokenResponse>;
};

export type { TAccessTokenResponse, TCachedToken, TSpotifyAuthFactory };
