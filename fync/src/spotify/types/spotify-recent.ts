import type { TSpotifyContext } from "./spotify-common";
import type { TSpotifyTrack } from "./spotify-track";

export type TSpotifyRecentlyPlayedItem = {
	track: TSpotifyTrack;
	played_at: string;
	context: TSpotifyContext | null;
};

export type TSpotifyRecentlyPlayedResponse = {
	items: TSpotifyRecentlyPlayedItem[];
	next: string | null;
	cursors: {
		after: string | null;
		before: string | null;
	};
	limit: number;
	href: string;
};
