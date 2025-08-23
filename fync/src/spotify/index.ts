import {
	createApiBuilder,
	defineResource,
	type TModule,
} from "../core";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const trackResource = defineResource({
	name: "tracks",
	basePath: "/tracks",
	methods: {
		getTrack: { path: "/{id}" },
		getTracks: { path: "" },
		getTrackAudioFeatures: { path: "/{id}/audio-features" },
		getTrackAudioAnalysis: { path: "/{id}/audio-analysis" },
	},
});

const artistResource = defineResource({
	name: "artists",
	basePath: "/artists",
	methods: {
		getArtist: { path: "/{id}" },
		getArtists: { path: "" },
		getArtistAlbums: { path: "/{id}/albums" },
		getArtistTopTracks: { path: "/{id}/top-tracks" },
		getArtistRelatedArtists: { path: "/{id}/related-artists" },
	},
});

const albumResource = defineResource({
	name: "albums",
	basePath: "/albums",
	methods: {
		getAlbum: { path: "/{id}" },
		getAlbums: { path: "" },
		getAlbumTracks: { path: "/{id}/tracks" },
	},
});

const playlistResource = defineResource({
	name: "playlists",
	basePath: "/playlists",
	methods: {
		getPlaylist: { path: "/{playlist_id}" },
		getPlaylistTracks: { path: "/{playlist_id}/tracks" },
		createPlaylist: { path: "/{user_id}/playlists", method: "POST" },
		updatePlaylist: { path: "/{playlist_id}", method: "PUT" },
		addTracksToPlaylist: { path: "/{playlist_id}/tracks", method: "POST" },
		removeTracksFromPlaylist: { path: "/{playlist_id}/tracks", method: "DELETE" },
		getFeaturedPlaylists: { path: "/browse/featured-playlists" },
		getCategoryPlaylists: { path: "/browse/categories/{category_id}/playlists" },
	},
});

const searchResource = defineResource({
	name: "search",
	basePath: "/search",
	methods: {
		search: { path: "" },
	},
});

const userResource = defineResource({
	name: "users",
	basePath: "/users",
	methods: {
		getUser: { path: "/{user_id}" },
		getUserPlaylists: { path: "/{user_id}/playlists" },
	},
});

const meResource = defineResource({
	name: "me",
	basePath: "/me",
	methods: {
		getCurrentUser: { path: "" },
		getMyTopArtists: { path: "/top/artists" },
		getMyTopTracks: { path: "/top/tracks" },
		getMyPlaylists: { path: "/playlists" },
		getMySavedTracks: { path: "/tracks" },
		getMySavedAlbums: { path: "/albums" },
		getMySavedShows: { path: "/shows" },
		getMyRecentlyPlayed: { path: "/player/recently-played" },
		getFollowedArtists: { path: "/following" },
		saveTracks: { path: "/tracks", method: "PUT" },
		removeSavedTracks: { path: "/tracks", method: "DELETE" },
		saveAlbums: { path: "/albums", method: "PUT" },
		removeSavedAlbums: { path: "/albums", method: "DELETE" },
		followArtists: { path: "/following", method: "PUT" },
		unfollowArtists: { path: "/following", method: "DELETE" },
		followPlaylist: { path: "/playlists/{playlist_id}/followers", method: "PUT" },
		unfollowPlaylist: { path: "/playlists/{playlist_id}/followers", method: "DELETE" },
	},
});

const playerResource = defineResource({
	name: "player",
	basePath: "/me/player",
	methods: {
		getPlaybackState: { path: "" },
		getCurrentlyPlaying: { path: "/currently-playing" },
		getDevices: { path: "/devices" },
		play: { path: "/play", method: "PUT" },
		pause: { path: "/pause", method: "PUT" },
		next: { path: "/next", method: "POST" },
		previous: { path: "/previous", method: "POST" },
		seek: { path: "/seek", method: "PUT" },
		setVolume: { path: "/volume", method: "PUT" },
		setRepeat: { path: "/repeat", method: "PUT" },
		setShuffle: { path: "/shuffle", method: "PUT" },
		transferPlayback: { path: "", method: "PUT" },
		addToQueue: { path: "/queue", method: "POST" },
	},
});

const browseResource = defineResource({
	name: "browse",
	basePath: "/browse",
	methods: {
		getNewReleases: { path: "/new-releases" },
		getFeaturedPlaylists: { path: "/featured-playlists" },
		getCategories: { path: "/categories" },
		getCategory: { path: "/categories/{category_id}" },
		getCategoryPlaylists: { path: "/categories/{category_id}/playlists" },
		getRecommendations: { path: "/recommendations" },
		getAvailableGenreSeeds: { path: "/recommendations/available-genre-seeds" },
	},
});

const resources = {
	tracks: trackResource,
	artists: artistResource,
	albums: albumResource,
	playlists: playlistResource,
	search: searchResource,
	users: userResource,
	me: meResource,
	player: playerResource,
	browse: browseResource,
};

const buildSpotify = createApiBuilder({
	baseUrl: SPOTIFY_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Content-Type": "application/json",
	},
});

type TSpotifyModule = TModule<typeof resources> & {
	getTrack: (trackId: string) => Promise<any>;
	getArtist: (artistId: string) => Promise<any>;
	getAlbum: (albumId: string) => Promise<any>;
	getPlaylist: (playlistId: string) => Promise<any>;
	search: (query: string, types: string[], options?: any) => Promise<any>;
	getMyTopTracks: (options?: any) => Promise<any>;
	getMyTopArtists: (options?: any) => Promise<any>;
	getRecentlyPlayed: (options?: any) => Promise<any>;
	getCurrentlyPlaying: () => Promise<any>;
	getRecommendations: (options: any) => Promise<any>;
	createPlaylist: (userId: string, name: string, options?: any) => Promise<any>;
	addTracksToPlaylist: (playlistId: string, trackUris: string[]) => Promise<any>;
	playTrack: (trackUri: string, deviceId?: string) => Promise<any>;
	pausePlayback: () => Promise<any>;
	skipToNext: () => Promise<any>;
	skipToPrevious: () => Promise<any>;
	getUserPlaylists: (userId?: string) => Promise<any>;
	getAudioFeatures: (trackId: string) => Promise<any>;
	searchTracks: (query: string, options?: any) => Promise<any>;
	searchArtists: (query: string, options?: any) => Promise<any>;
	searchAlbums: (query: string, options?: any) => Promise<any>;
	searchPlaylists: (query: string, options?: any) => Promise<any>;
};

export function Spotify(config: { token: string }): TSpotifyModule {
	const base = buildSpotify(config, resources);
	const spotify = base as TSpotifyModule;

	spotify.getTrack = function (trackId: string) {
		return base.tracks.getTrack({ id: trackId });
	};

	spotify.getArtist = function (artistId: string) {
		return base.artists.getArtist({ id: artistId });
	};

	spotify.getAlbum = function (albumId: string) {
		return base.albums.getAlbum({ id: albumId });
	};

	spotify.getPlaylist = function (playlistId: string) {
		return base.playlists.getPlaylist({ playlist_id: playlistId });
	};

	spotify.search = function (query: string, types: string[], options?: any) {
		return base.search.search({
			q: query,
			type: types.join(","),
			limit: options?.limit || 20,
			offset: options?.offset || 0,
			...options,
		});
	};

	spotify.getMyTopTracks = function (options?: any) {
		return base.me.getMyTopTracks({
			time_range: options?.timeRange || "medium_term",
			limit: options?.limit || 20,
			offset: options?.offset || 0,
		});
	};

	spotify.getMyTopArtists = function (options?: any) {
		return base.me.getMyTopArtists({
			time_range: options?.timeRange || "medium_term",
			limit: options?.limit || 20,
			offset: options?.offset || 0,
		});
	};

	spotify.getRecentlyPlayed = function (options?: any) {
		return base.me.getMyRecentlyPlayed({
			limit: options?.limit || 20,
			after: options?.after,
			before: options?.before,
		});
	};

	spotify.getCurrentlyPlaying = function () {
		return base.player.getCurrentlyPlaying();
	};

	spotify.getRecommendations = function (options: any) {
		return base.browse.getRecommendations(options);
	};

	spotify.createPlaylist = function (
		userId: string,
		name: string,
		options?: any,
	) {
		return base.playlists.createPlaylist(
			{
				name,
				description: options?.description || "",
				public: options?.public !== false,
				collaborative: options?.collaborative || false,
			},
			{ user_id: userId },
		);
	};

	spotify.addTracksToPlaylist = function (
		playlistId: string,
		trackUris: string[],
	) {
		return base.playlists.addTracksToPlaylist(
			{ uris: trackUris },
			{ playlist_id: playlistId },
		);
	};

	spotify.playTrack = function (trackUri: string, deviceId?: string) {
		const body: any = { uris: [trackUri] };
		if (deviceId) body.device_id = deviceId;
		return base.player.play(body);
	};

	spotify.pausePlayback = function () {
		return base.player.pause();
	};

	spotify.skipToNext = function () {
		return base.player.next();
	};

	spotify.skipToPrevious = function () {
		return base.player.previous();
	};

	spotify.getUserPlaylists = function (userId?: string) {
		if (userId) {
			return base.users.getUserPlaylists({ user_id: userId });
		}
		return base.me.getMyPlaylists();
	};

	spotify.getAudioFeatures = function (trackId: string) {
		return base.tracks.getTrackAudioFeatures({ id: trackId });
	};

	spotify.searchTracks = function (query: string, options?: any) {
		return spotify.search(query, ["track"], options);
	};

	spotify.searchArtists = function (query: string, options?: any) {
		return spotify.search(query, ["artist"], options);
	};

	spotify.searchAlbums = function (query: string, options?: any) {
		return spotify.search(query, ["album"], options);
	};

	spotify.searchPlaylists = function (query: string, options?: any) {
		return spotify.search(query, ["playlist"], options);
	};

	return spotify;
}
