import type {
	TSpotifyExternalUrls,
	TSpotifyFollowers,
	TSpotifyImage,
} from "./spotify-common";

export type TSpotifyUser = {
	id: string;
	display_name: string;
	email?: string;
	country?: string;
	followers: TSpotifyFollowers;
	images: TSpotifyImage[];
	external_urls: TSpotifyExternalUrls;
	uri: string;
	href: string;
};
