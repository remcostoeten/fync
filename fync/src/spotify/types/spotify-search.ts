import type { TSpotifyPagingObject } from "./spotify-common";
import type { TSpotifyPlaylist } from "./spotify-playlist";
import type {
	TSpotifyAlbum,
	TSpotifyArtist,
	TSpotifyTrack,
} from "./spotify-track";

export type TSpotifySearchResult = {
	tracks?: TSpotifyPagingObject<TSpotifyTrack>;
	artists?: TSpotifyPagingObject<TSpotifyArtist>;
	albums?: TSpotifyPagingObject<TSpotifyAlbum>;
	playlists?: TSpotifyPagingObject<TSpotifyPlaylist>;
};
