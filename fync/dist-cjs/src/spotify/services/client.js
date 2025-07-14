"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpotifyClient = createSpotifyClient;
var _auth = require("../auth");
var _http = require("../utils/http");
function createSpotifyClient(config) {
  const auth = (0, _auth.createSpotifyAuth)(config);
  const httpClient = (0, _http.createHttpClient)(config);
  async function makeRequest(endpoint, options = {}) {
    if (!config.accessToken) {
      throw new Error("Access token is required for Spotify API calls");
    }
    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if (options.params) {
      for (const [key, value] of Object.entries(options.params)) {
        url.searchParams.append(key, String(value));
      }
    }
    const headers = {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": config.userAgent || "Fync Spotify Client",
      ...options.headers
    };
    const response = await httpClient.get(url.toString(), {
      headers
    });
    return response;
  }
  async function makePostRequest(endpoint, data, options = {}) {
    if (!config.accessToken) {
      throw new Error("Access token is required for Spotify API calls");
    }
    const headers = {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": config.userAgent || "Fync Spotify Client",
      ...options.headers
    };
    const response = await httpClient.post(`https://api.spotify.com/v1${endpoint}`, data, {
      headers
    });
    return response;
  }
  async function makePutRequest(endpoint, data, options = {}) {
    if (!config.accessToken) {
      throw new Error("Access token is required for Spotify API calls");
    }
    const headers = {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": config.userAgent || "Fync Spotify Client",
      ...options.headers
    };
    const response = await httpClient.put(`https://api.spotify.com/v1${endpoint}`, data, {
      headers
    });
    return response;
  }
  async function makeDeleteRequest(endpoint, data, options = {}) {
    if (!config.accessToken) {
      throw new Error("Access token is required for Spotify API calls");
    }
    const headers = {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": config.userAgent || "Fync Spotify Client",
      ...options.headers
    };
    const response = await httpClient.delete(`https://api.spotify.com/v1${endpoint}`, data, {
      headers
    });
    return response;
  }
  return {
    auth,
    me: {
      get: () => makeRequest("/me"),
      playlists: {
        get: options => makeRequest("/me/playlists", options)
      },
      tracks: {
        get: options => makeRequest("/me/tracks", options)
      },
      albums: {
        get: options => makeRequest("/me/albums", options)
      },
      artists: {
        get: options => makeRequest("/me/following", {
          ...options,
          params: {
            type: "artist",
            ...options?.params
          }
        })
      },
      player: {
        get: () => makeRequest("/me/player"),
        devices: {
          get: () => makeRequest("/me/player/devices")
        },
        play: options => {
          const endpoint = options?.device_id ? `/me/player/play?device_id=${options.device_id}` : "/me/player/play";
          return makePutRequest(endpoint, options?.uris ? {
            uris: options.uris
          } : undefined);
        },
        pause: options => {
          const endpoint = options?.device_id ? `/me/player/pause?device_id=${options.device_id}` : "/me/player/pause";
          return makePutRequest(endpoint);
        },
        next: options => {
          const endpoint = options?.device_id ? `/me/player/next?device_id=${options.device_id}` : "/me/player/next";
          return makePostRequest(endpoint);
        },
        previous: options => {
          const endpoint = options?.device_id ? `/me/player/previous?device_id=${options.device_id}` : "/me/player/previous";
          return makePostRequest(endpoint);
        },
        seek: (position_ms, options) => {
          const params = new URLSearchParams({
            position_ms: position_ms.toString()
          });
          if (options?.device_id) {
            params.append("device_id", options.device_id);
          }
          return makePutRequest(`/me/player/seek?${params.toString()}`);
        },
        volume: (volume_percent, options) => {
          const params = new URLSearchParams({
            volume_percent: volume_percent.toString()
          });
          if (options?.device_id) {
            params.append("device_id", options.device_id);
          }
          return makePutRequest(`/me/player/volume?${params.toString()}`);
        },
        repeat: (state, options) => {
          const params = new URLSearchParams({
            state
          });
          if (options?.device_id) {
            params.append("device_id", options.device_id);
          }
          return makePutRequest(`/me/player/repeat?${params.toString()}`);
        },
        shuffle: (state, options) => {
          const params = new URLSearchParams({
            state: state.toString()
          });
          if (options?.device_id) {
            params.append("device_id", options.device_id);
          }
          return makePutRequest(`/me/player/shuffle?${params.toString()}`);
        }
      }
    },
    search: {
      get: (query, types, options) => makeRequest("/search", {
        ...options,
        params: {
          q: query,
          type: types.join(","),
          ...options?.params
        }
      })
    },
    playlist: playlistId => ({
      get: () => makeRequest(`/playlists/${playlistId}`),
      tracks: {
        get: options => makeRequest(`/playlists/${playlistId}/tracks`, options),
        add: (uris, position) => makePostRequest(`/playlists/${playlistId}/tracks`, {
          uris,
          ...(position !== undefined && {
            position
          })
        }),
        remove: uris => makeDeleteRequest(`/playlists/${playlistId}/tracks`, {
          tracks: uris.map(uri => ({
            uri
          }))
        })
      }
    }),
    user: userId => ({
      get: () => makeRequest(`/users/${userId}`),
      playlists: {
        get: options => makeRequest(`/users/${userId}/playlists`, options)
      }
    }),
    album: albumId => ({
      get: () => makeRequest(`/albums/${albumId}`),
      tracks: {
        get: options => makeRequest(`/albums/${albumId}/tracks`, options)
      }
    }),
    artist: artistId => ({
      get: () => makeRequest(`/artists/${artistId}`),
      albums: {
        get: options => makeRequest(`/artists/${artistId}/albums`, options)
      },
      tracks: {
        top: options => makeRequest(`/artists/${artistId}/top-tracks`, {
          ...options,
          params: {
            market: "US",
            ...options?.params
          }
        })
      },
      related: {
        get: () => makeRequest(`/artists/${artistId}/related-artists`)
      }
    }),
    track: trackId => ({
      get: () => makeRequest(`/tracks/${trackId}`),
      features: {
        get: () => makeRequest(`/audio-features/${trackId}`)
      },
      analysis: {
        get: () => makeRequest(`/audio-analysis/${trackId}`)
      }
    })
  };
}