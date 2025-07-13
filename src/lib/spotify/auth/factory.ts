import { getAccessToken } from './getAccessToken';
import { refreshToken } from './refreshToken';
import type { TSpotifyAuthFactory } from './types';

function createSpotifyAuthFactory(): TSpotifyAuthFactory {
  return {
    getAccessToken,
    refreshToken,
  };
}

export { createSpotifyAuthFactory };
