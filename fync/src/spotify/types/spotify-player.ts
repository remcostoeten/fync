import type { TSpotifyContext } from "./spotify-common";
import type { TSpotifyTrack } from "./spotify-track";

export type TSpotifyPlayerDevice = {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
	supports_volume: boolean;
};

export type TSpotifyPlaybackState = {
	device: TSpotifyPlayerDevice;
	repeat_state: "off" | "track" | "context";
	shuffle_state: boolean;
	context?: TSpotifyContext;
	timestamp: number;
	progress_ms: number;
	is_playing: boolean;
	item: TSpotifyTrack | null;
	currently_playing_type: "track" | "episode" | "ad" | "unknown";
	actions: {
		interrupting_playback?: boolean;
		pausing?: boolean;
		resuming?: boolean;
		seeking?: boolean;
		skipping_next?: boolean;
		skipping_prev?: boolean;
		toggling_repeat_context?: boolean;
		toggling_shuffle?: boolean;
		toggling_repeat_track?: boolean;
		transferring_playback?: boolean;
	};
};
