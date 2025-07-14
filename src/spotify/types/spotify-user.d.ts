import type {
	TSpotifyImage,
	TSpotifyExternalUrls,
	TSpotifyFollowers,
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
//# sourceMappingURL=spotify-user.d.ts.map
