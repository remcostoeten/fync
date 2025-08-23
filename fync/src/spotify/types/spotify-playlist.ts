import type {
	TSpotifyExternalUrls,
	TSpotifyFollowers,
	TSpotifyImage,
} from "./spotify-common";
import type { TSpotifyTrack } from "./spotify-track";
import type { TSpotifyUser } from "./spotify-user";
import type { TBaseEntity } from "../../core/types";

export type TSpotifyPlaylist = TBaseEntity<string> & {
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

export type TSpotifyPlaylistTrack = TBaseEntity<string> & {
	added_at: string;
	added_by: TSpotifyUser;
	is_local: boolean;
	track: TSpotifyTrack | null;
};
