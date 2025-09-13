export type TSpotifyImage = {
	url: string;
	height?: number;
	width?: number;
};

export type TSpotifyPagingObject<T> = {
	href: string;
	items: T[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
};

export type TSpotifyExternalUrls = {
	spotify: string;
};

export type TSpotifyFollowers = {
	total: number;
};

export type TSpotifyContext = {
	type: "album" | "artist" | "playlist";
	href: string;
	external_urls: TSpotifyExternalUrls;
	uri: string;
};

export type TSpotifyScope =
	| "playlist-read-private"
	| "playlist-read-collaborative"
	| "playlist-modify-public"
	| "playlist-modify-private"
	| "user-read-private"
	| "user-read-email"
	| "user-read-playback-state"
	| "user-modify-playback-state"
	| "user-read-currently-playing"
	| "user-read-recently-played"
	| "user-top-read"
	| "user-library-read"
	| "user-library-modify"
	| "user-follow-read"
	| "user-follow-modify"
	| "streaming";

export type TSpotifyTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token?: string;
	scope?: string;
	created_at?: number;
};

export type TSpotifyAuthenticationError = {
	error: string;
	error_description?: string;
};

export type TSpotifyConfig = {
	clientId: string;
	clientSecret: string;
	redirectUri?: string;
	accessToken?: string;
	refreshToken?: string;
	scopes?: TSpotifyScope[];
	baseUrl?: string;
	userAgent?: string;
	cache?: boolean;
	cacheTTL?: number;
};
