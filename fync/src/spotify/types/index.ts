// Re-export all types from organized files
export * from "./spotify-common";
export * from "./spotify-player";
export * from "./spotify-playlist";
export * from "./spotify-recent";
export * from "./spotify-search";
export * from "./spotify-track";
export * from "./spotify-user";

// Legacy client type - this will be refactored later
export type TSpotifyRequestOptions = {
	params?: Record<string, string | number | boolean>;
	headers?: Record<string, string>;
	cache?: boolean;
	cacheTTL?: number;
};

export type TSpotifyClient = {
	auth: {
		getAuthorizationUrl: (scopes: string[], state?: string) => string;
		exchangeCodeForToken: (
			code: string,
			state?: string,
		) => Promise<import("./spotify-common").TSpotifyTokenResponse>;
		refreshAccessToken: (
			refreshToken: string,
		) => Promise<import("./spotify-common").TSpotifyTokenResponse>;
	};
	me: {
		get: () => Promise<import("./spotify-user").TSpotifyUser>;
		playlists: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-playlist").TSpotifyPlaylist
				>
			>;
		};
		tracks: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-track").TSpotifyTrack
				>
			>;
		};
		albums: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-track").TSpotifyAlbum
				>
			>;
		};
		artists: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-track").TSpotifyArtist
				>
			>;
		};
		player: {
			get: () => Promise<import("./spotify-player").TSpotifyPlaybackState>;
			devices: {
				get: () => Promise<{
					devices: import("./spotify-player").TSpotifyPlayerDevice[];
				}>;
			};
			play: (options?: {
				device_id?: string;
				uris?: string[];
			}) => Promise<void>;
			pause: (options?: { device_id?: string }) => Promise<void>;
			next: (options?: { device_id?: string }) => Promise<void>;
			previous: (options?: { device_id?: string }) => Promise<void>;
			seek: (
				position_ms: number,
				options?: { device_id?: string },
			) => Promise<void>;
			volume: (
				volume_percent: number,
				options?: { device_id?: string },
			) => Promise<void>;
			repeat: (
				state: "track" | "context" | "off",
				options?: { device_id?: string },
			) => Promise<void>;
			shuffle: (
				state: boolean,
				options?: { device_id?: string },
			) => Promise<void>;
		};
	};
	search: {
		get: (
			query: string,
			types: Array<"track" | "artist" | "album" | "playlist">,
			options?: TSpotifyRequestOptions,
		) => Promise<import("./spotify-search").TSpotifySearchResult>;
	};
	playlist: (playlistId: string) => {
		get: () => Promise<import("./spotify-playlist").TSpotifyPlaylist>;
		tracks: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-playlist").TSpotifyPlaylistTrack
				>
			>;
			add: (
				uris: string[],
				position?: number,
			) => Promise<{ snapshot_id: string }>;
			remove: (uris: string[]) => Promise<{ snapshot_id: string }>;
		};
	};
	user: (userId: string) => {
		get: () => Promise<import("./spotify-user").TSpotifyUser>;
		playlists: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-playlist").TSpotifyPlaylist
				>
			>;
		};
	};
	album: (albumId: string) => {
		get: () => Promise<import("./spotify-track").TSpotifyAlbum>;
		tracks: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-track").TSpotifyTrack
				>
			>;
		};
	};
	artist: (artistId: string) => {
		get: () => Promise<import("./spotify-track").TSpotifyArtist>;
		albums: {
			get: (
				options?: TSpotifyRequestOptions,
			) => Promise<
				import("./spotify-common").TSpotifyPagingObject<
					import("./spotify-track").TSpotifyAlbum
				>
			>;
		};
		tracks: {
			top: (
				options?: TSpotifyRequestOptions,
			) => Promise<{ tracks: import("./spotify-track").TSpotifyTrack[] }>;
		};
		related: {
			get: () => Promise<{
				artists: import("./spotify-track").TSpotifyArtist[];
			}>;
		};
	};
	track: (trackId: string) => {
		get: () => Promise<import("./spotify-track").TSpotifyTrack>;
		features: {
			get: () => Promise<import("./spotify-track").TSpotifyAudioFeatures>;
		};
		analysis: {
			get: () => Promise<import("./spotify-track").TSpotifyAudioAnalysis>;
		};
	};
};
