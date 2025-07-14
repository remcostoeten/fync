import type { TSpotifyPagingObject } from "./spotify-common";
import type {
	TSpotifyTrack,
	TSpotifyArtist,
	TSpotifyAlbum,
} from "./spotify-track";
import type { TSpotifyPlaylist } from "./spotify-playlist";
export type TSpotifySearchResult = {
	tracks?: TSpotifyPagingObject<TSpotifyTrack>;
	artists?: TSpotifyPagingObject<TSpotifyArtist>;
	albums?: TSpotifyPagingObject<TSpotifyAlbum>;
	playlists?: TSpotifyPagingObject<TSpotifyPlaylist>;
};
//# sourceMappingURL=spotify-search.d.ts.map
