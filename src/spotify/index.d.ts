import { createSpotifyClient } from "./services/client";
import type {
	TChainableClient,
	TRequestOptions,
	TSpotifyClientConfig,
} from "./services/spotify-client";
import type {
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
	TSpotifyConfig,
	TSpotifyScope,
	TSpotifyAuthenticationError,
	TSpotifyTimeInterval,
	TSpotifySection,
	TSpotifySegment,
	TSpotifyRecentlyPlayedResponse,
	TSpotifyRecentlyPlayedItem,
} from "./types";
import {
	SPOTIFY_SCOPES,
	createSpotifyAuth,
	isTokenExpired,
	shouldRefreshToken,
} from "./auth";
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
	queue(
		uri: string,
		options?: {
			device_id?: string;
		},
	): Promise<void>;
	devices(): Promise<{
		devices: TSpotifyPlayerDevice[];
	}>;
	currentlyPlaying(): Promise<TSpotifyPlaybackState>;
	chain: TChainableClient;
};
type TPlaylistClient = {
	get(): Promise<TSpotifyPlaylist>;
	tracks: {
		get(
			options?: TRequestOptions,
		): Promise<TSpotifyPagingObject<TSpotifyPlaylistTrack>>;
		add(
			uris: string[],
			position?: number,
		): Promise<{
			snapshot_id: string;
		}>;
		remove(uris: string[]): Promise<{
			snapshot_id: string;
		}>;
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
		get(options?: TRequestOptions): Promise<TSpotifyPagingObject<any>>;
	};
	savedEpisodes: {
		get(options?: TRequestOptions): Promise<TSpotifyPagingObject<any>>;
	};
	chain: TChainableClient;
};
declare function Spotify(config?: TSpotifyClientConfig): TSpotify;
export {
	Spotify,
	createSpotifyClient,
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
	TChainableClient,
	TRequestOptions,
	TSpotifyClientConfig,
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
	TSpotifyConfig,
};
//# sourceMappingURL=index.d.ts.map
