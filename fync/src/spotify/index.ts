import {
	createSpotifyAuth,
	isTokenExpired,
	SPOTIFY_SCOPES,
	shouldRefreshToken,
} from "./auth";
import type {
	TChainableClient,
	TRequestOptions,
	TSpotifyClientConfig,
} from "./services/spotify-client";
import { createSpotifyClient as createSpotifyChainableClient } from "./services/spotify-client";
import type {
	TSpotifyAlbum,
	TSpotifyArtist,
	TSpotifyAudioAnalysis,
	TSpotifyAudioFeatures,
	TSpotifyAuthenticationError,
	TSpotifyConfig,
	TSpotifyContext,
	TSpotifyExternalUrls,
	TSpotifyFollowers,
	TSpotifyImage,
	TSpotifyPagingObject,
	TSpotifyPlaybackState,
	TSpotifyPlayerDevice,
	TSpotifyPlaylist,
	TSpotifyPlaylistTrack,
	TSpotifyRecentlyPlayedItem,
	TSpotifyRecentlyPlayedResponse,
	TSpotifyScope,
	TSpotifySearchResult,
	TSpotifySection,
	TSpotifySegment,
	TSpotifyTimeInterval,
	TSpotifyTokenResponse,
	TSpotifyTrack,
	TSpotifyUser,
} from "./types";

type TSpotify = {
	api: TChainableClient;
	user: (userId: string) => TUserClient;
	me: TAuthenticatedUserClient;
	player: TPlayerClient;
	playlist: (playlistId: string) => TPlaylistClient;
	search: TSearchClient;
	library: TLibraryClient;
};

type TUserClient = {
	get(): Promise<TSpotifyUser>;
	playlists: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyPlaylist>>;
	};
	chain: TChainableClient;
};

type TAuthenticatedUserClient = {
	get(): Promise<TSpotifyUser>;
	playlists: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyPlaylist>>;
	};
	tracks: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyTrack>>;
	};
	albums: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyAlbum>>;
	};
	artists: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyArtist>>;
	};
	recentlyPlayed: {
		get(options?: TRequestOptions): Promise<TSpotifyRecentlyPlayedResponse>;
	};
	chain: TChainableClient;
};

type TPlayerClient = {
	play(options?: { device_id?: string; uris?: string[] }): Promise<void>;
	pause(options?: { device_id?: string }): Promise<void>;
	next(options?: { device_id?: string }): Promise<void>;
	previous(options?: { device_id?: string }): Promise<void>;
	queue(uri: string, options?: { device_id?: string }): Promise<void>;
	devices(): Promise<{ devices: TSpotifyPlayerDevice[] }>;
	currentlyPlaying(): Promise<TSpotifyPlaybackState>;
	chain: TChainableClient;
};

type TPlaylistClient = {
	get(): Promise<TSpotifyPlaylist>;
	tracks: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyPlaylistTrack>>;
		add(uris: string[], position?: number): Promise<{ snapshot_id: string }>;
		remove(uris: string[]): Promise<{ snapshot_id: string }>;
	};
	chain: TChainableClient;
};

type TSearchClient = {
	tracks(
		query: string,
		options?: TRequestOptions,
	): Promise<TSpotifySearchResult>;
	artists(
		query: string,
		options?: TRequestOptions,
	): Promise<TSpotifySearchResult>;
	albums(
		query: string,
		options?: TRequestOptions,
	): Promise<TSpotifySearchResult>;
	playlists(
		query: string,
		options?: TRequestOptions,
	): Promise<TSpotifySearchResult>;
	shows(
		query: string,
		options?: TRequestOptions,
	): Promise<TSpotifySearchResult>;
	episodes(
		query: string,
		options?: TRequestOptions,
	): Promise<TSpotifySearchResult>;
	chain: TChainableClient;
};

type TLibraryClient = {
	savedTracks: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyTrack>>;
	};
	savedAlbums: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyAlbum>>;
	};
	savedShows: {
		get(options?: TRequestOptions): Promise<TSpotifyPagingObject<unknown>>;
	};
	savedEpisodes: {
		get(options?: TRequestOptions): Promise<TSpotifyPagingObject<unknown>>;
	};
	chain: TChainableClient;
};

function createUserClient(api: TChainableClient, userId: string): TUserClient {
	return {
		get: () => api.users[userId].get<TSpotifyUser>(),
		playlists: {
			get: (options?: TRequestOptions) =>
				api.users[userId].playlists.get<TSpotifyPagingObject<TSpotifyPlaylist>>(
					options,
				),
		},
		chain: api.users[userId],
	};
}

function createAuthenticatedUserClient(
	api: TChainableClient,
): TAuthenticatedUserClient {
	return {
		get: () => api.me.get<TSpotifyUser>(),
		playlists: {
			get: (options?: TRequestOptions) =>
				api.me.playlists.get<TSpotifyPagingObject<TSpotifyPlaylist>>(options),
		},
		tracks: {
			get: (options?: TRequestOptions) =>
				api.me.tracks.get<TSpotifyPagingObject<TSpotifyTrack>>(options),
		},
		albums: {
			get: (options?: TRequestOptions) =>
				api.me.albums.get<TSpotifyPagingObject<TSpotifyAlbum>>(options),
		},
		artists: {
			get: (options?: TRequestOptions) =>
				api.me.following.get<TSpotifyPagingObject<TSpotifyArtist>>({
					...options,
					params: { type: "artist", ...options?.params },
				}),
		},
		recentlyPlayed: {
			get: (options?: TRequestOptions) =>
				api.me.player.recently_played.get<TSpotifyRecentlyPlayedResponse>(
					options,
				),
		},
		chain: api.me,
	};
}

function createPlayerClient(api: TChainableClient): TPlayerClient {
	return {
		play: (options?: { device_id?: string; uris?: string[] }) => {
			const requestOptions: TRequestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.play.put<void>(
				options?.uris ? { uris: options.uris } : undefined,
				requestOptions,
			);
		},
		pause: (options?: { device_id?: string }) => {
			const requestOptions: TRequestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.pause.put<void>(undefined, requestOptions);
		},
		next: (options?: { device_id?: string }) => {
			const requestOptions: TRequestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.next.post<void>(undefined, requestOptions);
		},
		previous: (options?: { device_id?: string }) => {
			const requestOptions: TRequestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.previous.post<void>(undefined, requestOptions);
		},
		queue: (uri: string, options?: { device_id?: string }) => {
			const params: { uri: string; device_id?: string } = { uri };
			if (options?.device_id) {
				params.device_id = options.device_id;
			}
			return api.me.player.queue.post<void>(undefined, { params });
		},
		devices: () =>
			api.me.player.devices.get<{ devices: TSpotifyPlayerDevice[] }>(),
		currentlyPlaying: () => api.me.player.get<TSpotifyPlaybackState>(),
		chain: api.me.player,
	};
}

function createPlaylistClient(
	api: TChainableClient,
	playlistId: string,
): TPlaylistClient {
	return {
		get: () => api.playlists[playlistId].get<TSpotifyPlaylist>(),
		tracks: {
			get: (options?: TRequestOptions) =>
				api.playlists[playlistId].tracks.get<
					TSpotifyPagingObject<TSpotifyPlaylistTrack>
				>(options),
			add: (uris: string[], position?: number) =>
				api.playlists[playlistId].tracks.post<{ snapshot_id: string }>({
					uris,
					...(position !== undefined && { position }),
				}),
			remove: (uris: string[]) => {
				const deleteData = {
					tracks: uris.map((uri) => ({ uri })),
				};
				return api.playlists[playlistId].tracks.delete<{ snapshot_id: string }>(
					deleteData,
				);
			},
		},
		chain: api.playlists[playlistId],
	};
}

function createSearchClient(api: TChainableClient): TSearchClient {
	return {
		tracks: (query: string, options?: TRequestOptions) =>
			api.search.get<TSpotifySearchResult>({
				...options,
				params: { q: query, type: "track", ...options?.params },
			}),
		artists: (query: string, options?: TRequestOptions) =>
			api.search.get<TSpotifySearchResult>({
				...options,
				params: { q: query, type: "artist", ...options?.params },
			}),
		albums: (query: string, options?: TRequestOptions) =>
			api.search.get<TSpotifySearchResult>({
				...options,
				params: { q: query, type: "album", ...options?.params },
			}),
		playlists: (query: string, options?: TRequestOptions) =>
			api.search.get<TSpotifySearchResult>({
				...options,
				params: { q: query, type: "playlist", ...options?.params },
			}),
		shows: (query: string, options?: TRequestOptions) =>
			api.search.get<TSpotifySearchResult>({
				...options,
				params: { q: query, type: "show", ...options?.params },
			}),
		episodes: (query: string, options?: TRequestOptions) =>
			api.search.get<TSpotifySearchResult>({
				...options,
				params: { q: query, type: "episode", ...options?.params },
			}),
		chain: api.search,
	};
}

function createLibraryClient(api: TChainableClient): TLibraryClient {
	return {
		savedTracks: {
			get: (options?: TRequestOptions) =>
				api.me.tracks.get<TSpotifyPagingObject<TSpotifyTrack>>(options),
		},
		savedAlbums: {
			get: (options?: TRequestOptions) =>
				api.me.albums.get<TSpotifyPagingObject<TSpotifyAlbum>>(options),
		},
		savedShows: {
			get: (options?: TRequestOptions) =>
				api.me.shows.get<TSpotifyPagingObject<unknown>>(options),
		},
		savedEpisodes: {
			get: (options?: TRequestOptions) =>
				api.me.episodes.get<TSpotifyPagingObject<unknown>>(options),
		},
		chain: api.me,
	};
}

function Spotify(config?: TSpotifyClientConfig): TSpotify {
	const api = createSpotifyChainableClient(config);

	return {
		api,
		user: (userId: string) => createUserClient(api, userId),
		me: createAuthenticatedUserClient(api),
		player: createPlayerClient(api),
		playlist: (playlistId: string) => createPlaylistClient(api, playlistId),
		search: createSearchClient(api),
		library: createLibraryClient(api),
	};
}

export {
	Spotify,
	SPOTIFY_SCOPES,
	createSpotifyAuth,
	isTokenExpired,
	shouldRefreshToken,
};
export type {
	TSpotify,
	TUserClient,
	TAuthenticatedUserClient,
	TPlayerClient,
	TPlaylistClient,
	TSearchClient,
	TLibraryClient,
	// Client types
	TChainableClient,
	TRequestOptions,
	TSpotifyClientConfig,
	// Core types
	TSpotifyUser,
	TSpotifyPagingObject,
	TSpotifyPlaylist,
	TSpotifyPlaylistTrack,
	TSpotifyTrack,
	TSpotifyAlbum,
	TSpotifyArtist,
	TSpotifyPlaybackState,
	TSpotifyPlayerDevice,
	TSpotifySearchResult,
	TSpotifyAudioFeatures,
	TSpotifyAudioAnalysis,
	TSpotifyTokenResponse,
	TSpotifyImage,
	TSpotifyExternalUrls,
	TSpotifyFollowers,
	TSpotifyContext,
	TSpotifyScope,
	TSpotifyAuthenticationError,
	TSpotifyTimeInterval,
	TSpotifySection,
	TSpotifySegment,
	TSpotifyRecentlyPlayedResponse,
	TSpotifyRecentlyPlayedItem,
	// Config types
	TSpotifyConfig,
};
