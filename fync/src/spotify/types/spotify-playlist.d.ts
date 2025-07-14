import type {
	TSpotifyExternalUrls,
	TSpotifyFollowers,
	TSpotifyImage,
} from "./spotify-common";
import type { TSpotifyUser } from "./spotify-user";
import type { TSpotifyTrack } from "./spotify-track";
export type TSpotifyPlaylist = {
	id: string;
	name: string;
	type: "playlist";
	uri: string;
	href: string;
	external_urls: TSpotifyExternalUrls;
	description?: string;
	owner: TSpotifyUser;
	public: boolean;
	collaborative: boolean;
	followers: TSpotifyFollowers;
	images: TSpotifyImage[];
	tracks: {
		total: number;
		href: string;
	};
	snapshot_id: string;
};
export type TSpotifyPlaylistTrack = {
	added_at: string;
	added_by: TSpotifyUser;
	is_local: boolean;
	track: TSpotifyTrack | null;
};
//# sourceMappingURL=spotify-playlist.d.ts.map
