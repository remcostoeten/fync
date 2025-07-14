import type { TSpotifyConfig, TSpotifyTokenResponse } from "../types";
export declare const SPOTIFY_SCOPES: {
	readonly PLAYLIST_READ_PRIVATE: "playlist-read-private";
	readonly PLAYLIST_READ_COLLABORATIVE: "playlist-read-collaborative";
	readonly PLAYLIST_MODIFY_PUBLIC: "playlist-modify-public";
	readonly PLAYLIST_MODIFY_PRIVATE: "playlist-modify-private";
	readonly USER_READ_PRIVATE: "user-read-private";
	readonly USER_READ_EMAIL: "user-read-email";
	readonly USER_READ_PLAYBACK_STATE: "user-read-playback-state";
	readonly USER_MODIFY_PLAYBACK_STATE: "user-modify-playback-state";
	readonly USER_READ_CURRENTLY_PLAYING: "user-read-currently-playing";
	readonly USER_READ_RECENTLY_PLAYED: "user-read-recently-played";
	readonly USER_TOP_READ: "user-top-read";
	readonly USER_LIBRARY_READ: "user-library-read";
	readonly USER_LIBRARY_MODIFY: "user-library-modify";
	readonly USER_FOLLOW_READ: "user-follow-read";
	readonly USER_FOLLOW_MODIFY: "user-follow-modify";
	readonly STREAMING: "streaming";
};
export type TSpotifyScope =
	(typeof SPOTIFY_SCOPES)[keyof typeof SPOTIFY_SCOPES];
export declare function createSpotifyAuth(config: TSpotifyConfig): {
	getAuthorizationUrl: (scopes: string[], state?: string) => string;
	exchangeCodeForToken: (
		code: string,
		_state?: string,
	) => Promise<TSpotifyTokenResponse>;
	refreshAccessToken: (refreshToken: string) => Promise<TSpotifyTokenResponse>;
};
export declare function isTokenExpired(
	token: TSpotifyTokenResponse,
	bufferSeconds?: number,
): boolean;
export declare function shouldRefreshToken(
	token: TSpotifyTokenResponse,
	bufferSeconds?: number,
): boolean;
//# sourceMappingURL=index.d.ts.map
