import type {
	TSpotifyExternalUrls,
	TSpotifyFollowers,
	TSpotifyImage,
} from "./spotify-common";
import type { TBaseEntity } from "../../core/types";

export type TSpotifyUser = TBaseEntity<string> & {
	display_name: string;
	email?: string;
	country?: string;
	followers: TSpotifyFollowers;
	images: TSpotifyImage[];
	external_urls: TSpotifyExternalUrls;
	uri: string;
	href: string;
};
