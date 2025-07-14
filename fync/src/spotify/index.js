import {
	createSpotifyAuth,
	isTokenExpired,
	SPOTIFY_SCOPES,
	shouldRefreshToken,
} from "./auth";
import { createSpotifyClient } from "./services/client";
import { createSpotifyClient as createSpotifyChainableClient } from "./services/spotify-client";

function createUserClient(api, userId) {
	return {
		get: () => api.users[userId].get(),
		playlists: {
			get: (options) => api.users[userId].playlists.get(options),
		},
		chain: api.users[userId],
	};
}
function createAuthenticatedUserClient(api) {
	return {
		get: () => api.me.get(),
		playlists: {
			get: (options) => api.me.playlists.get(options),
		},
		tracks: {
			get: (options) => api.me.tracks.get(options),
		},
		albums: {
			get: (options) => api.me.albums.get(options),
		},
		artists: {
			get: (options) =>
				api.me.following.get({
					...options,
					params: { type: "artist", ...options?.params },
				}),
		},
		recentlyPlayed: {
			get: (options) => api.me.player.recently_played.get(options),
		},
		chain: api.me,
	};
}
function createPlayerClient(api) {
	return {
		play: (options) => {
			const requestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.play.put(
				options?.uris ? { uris: options.uris } : undefined,
				requestOptions,
			);
		},
		pause: (options) => {
			const requestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.pause.put(undefined, requestOptions);
		},
		next: (options) => {
			const requestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.next.post(undefined, requestOptions);
		},
		previous: (options) => {
			const requestOptions = {};
			if (options?.device_id) {
				requestOptions.params = { device_id: options.device_id };
			}
			return api.me.player.previous.post(undefined, requestOptions);
		},
		queue: (uri, options) => {
			const params = { uri };
			if (options?.device_id) {
				params.device_id = options.device_id;
			}
			return api.me.player.queue.post(undefined, { params });
		},
		devices: () => api.me.player.devices.get(),
		currentlyPlaying: () => api.me.player.get(),
		chain: api.me.player,
	};
}
function createPlaylistClient(api, playlistId) {
	return {
		get: () => api.playlists[playlistId].get(),
		tracks: {
			get: (options) => api.playlists[playlistId].tracks.get(options),
			add: (uris, position) =>
				api.playlists[playlistId].tracks.post({
					uris,
					...(position !== undefined && { position }),
				}),
			remove: (uris) =>
				api.playlists[playlistId].tracks.delete({
					tracks: uris.map((uri) => ({ uri })),
				}),
		},
		chain: api.playlists[playlistId],
	};
}
function createSearchClient(api) {
	return {
		tracks: (query, options) =>
			api.search.get({
				...options,
				params: { q: query, type: "track", ...options?.params },
			}),
		artists: (query, options) =>
			api.search.get({
				...options,
				params: { q: query, type: "artist", ...options?.params },
			}),
		albums: (query, options) =>
			api.search.get({
				...options,
				params: { q: query, type: "album", ...options?.params },
			}),
		playlists: (query, options) =>
			api.search.get({
				...options,
				params: { q: query, type: "playlist", ...options?.params },
			}),
		shows: (query, options) =>
			api.search.get({
				...options,
				params: { q: query, type: "show", ...options?.params },
			}),
		episodes: (query, options) =>
			api.search.get({
				...options,
				params: { q: query, type: "episode", ...options?.params },
			}),
		chain: api.search,
	};
}
function createLibraryClient(api) {
	return {
		savedTracks: {
			get: (options) => api.me.tracks.get(options),
		},
		savedAlbums: {
			get: (options) => api.me.albums.get(options),
		},
		savedShows: {
			get: (options) => api.me.shows.get(options),
		},
		savedEpisodes: {
			get: (options) => api.me.episodes.get(options),
		},
		chain: api.me,
	};
}
function Spotify(config) {
	const api = createSpotifyChainableClient(config);
	return {
		api,
		user: (userId) => createUserClient(api, userId),
		me: createAuthenticatedUserClient(api),
		player: createPlayerClient(api),
		playlist: (playlistId) => createPlaylistClient(api, playlistId),
		search: createSearchClient(api),
		library: createLibraryClient(api),
	};
}
export {
	Spotify,
	createSpotifyClient,
	SPOTIFY_SCOPES,
	createSpotifyAuth,
	isTokenExpired,
	shouldRefreshToken,
};
//# sourceMappingURL=index.js.map
