import type { TSpotifyConfig, TSpotifyTokenResponse } from "../types";

export const SPOTIFY_SCOPES = {
	PLAYLIST_READ_PRIVATE: "playlist-read-private",
	PLAYLIST_READ_COLLABORATIVE: "playlist-read-collaborative",
	PLAYLIST_MODIFY_PUBLIC: "playlist-modify-public",
	PLAYLIST_MODIFY_PRIVATE: "playlist-modify-private",
	USER_READ_PRIVATE: "user-read-private",
	USER_READ_EMAIL: "user-read-email",
	USER_READ_PLAYBACK_STATE: "user-read-playback-state",
	USER_MODIFY_PLAYBACK_STATE: "user-modify-playback-state",
	USER_READ_CURRENTLY_PLAYING: "user-read-currently-playing",
	USER_READ_RECENTLY_PLAYED: "user-read-recently-played",
	USER_TOP_READ: "user-top-read",
	USER_LIBRARY_READ: "user-library-read",
	USER_LIBRARY_MODIFY: "user-library-modify",
	USER_FOLLOW_READ: "user-follow-read",
	USER_FOLLOW_MODIFY: "user-follow-modify",
	STREAMING: "streaming",
} as const;

export type TSpotifyScope =
	(typeof SPOTIFY_SCOPES)[keyof typeof SPOTIFY_SCOPES];

export function createSpotifyAuth(config: TSpotifyConfig) {
	const baseUrl = config.baseUrl || "https://accounts.spotify.com";
	const userAgent = config.userAgent || "Fync Spotify Client";

	function getAuthorizationUrl(scopes: string[], state?: string): string {
		const params = new URLSearchParams({
			response_type: "code",
			client_id: config.clientId,
			scope: scopes.join(" "),
			redirect_uri: config.redirectUri || "",
			...(state && { state }),
		});

		return `${baseUrl}/authorize?${params.toString()}`;
	}

	async function exchangeCodeForToken(
		code: string,
		_state?: string,
	): Promise<TSpotifyTokenResponse> {
		const params = new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: config.redirectUri || "",
			client_id: config.clientId,
			client_secret: config.clientSecret,
		});

		const response = await fetch(`${baseUrl}/api/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": userAgent,
			},
			body: params.toString(),
		});

		if (!response.ok) {
			const error = (await response.json()) as any;
			throw new Error(
				`Spotify OAuth error: ${error.error_description || error.error}`,
			);
		}

		const data = (await response.json()) as TSpotifyTokenResponse;
		return {
			...data,
			created_at: Math.floor(Date.now() / 1000),
		};
	}

	async function refreshAccessToken(
		refreshToken: string,
	): Promise<TSpotifyTokenResponse> {
		const params = new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
			client_id: config.clientId,
			client_secret: config.clientSecret,
		});

		const response = await fetch(`${baseUrl}/api/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": userAgent,
			},
			body: params.toString(),
		});

		if (!response.ok) {
			const error = (await response.json()) as any;
			throw new Error(
				`Spotify token refresh error: ${error.error_description || error.error}`,
			);
		}

		const data = (await response.json()) as TSpotifyTokenResponse;
		return {
			...data,
			created_at: Math.floor(Date.now() / 1000),
		};
	}

	return {
		getAuthorizationUrl,
		exchangeCodeForToken,
		refreshAccessToken,
	};
}

export function isTokenExpired(
	token: TSpotifyTokenResponse,
	bufferSeconds: number = 300,
): boolean {
	if (!token.created_at) return true;

	const expiresAt = token.created_at + token.expires_in;
	const now = Math.floor(Date.now() / 1000);

	return now >= expiresAt - bufferSeconds;
}

export function shouldRefreshToken(
	token: TSpotifyTokenResponse,
	bufferSeconds: number = 300,
): boolean {
	return isTokenExpired(token, bufferSeconds) && !!token.refresh_token;
}
