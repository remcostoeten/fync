import type { TApiSection } from '@/types/content'

export const spotifyContent: TApiSection[] = [
  {
    id: 'spotify-client',
    title: 'Spotify API Client',
    description: 'Full-featured Spotify Web API client with authentication and comprehensive music streaming functionality',
    methods: [
      {
        id: 'spotify-main-client',
        name: 'Spotify()',
        description: 'Main Spotify client factory with token-based authentication',
        signature: 'Spotify(config: { token: string }): SpotifyClient',
        parameters: [
          {
            name: 'config',
            type: '{ token: string }',
            description: 'Configuration object containing the Spotify access token',
            required: true
          }
        ],
        returnType: 'SpotifyClient',
        examples: [
          {
            id: 'spotify-client-init',
            title: 'Initialize Spotify Client',
            description: 'Create a Spotify client with OAuth token',
            code: `import { Spotify } from '@remcostoeten/fync/spotify'

const spotify = Spotify({
  token: 'your-spotify-oauth-token'
})

const currentUser = await spotify.getCurrentUser()
const topTracks = await spotify.getMyTopTracks()`,
            language: 'typescript',
            category: 'spotify',
            tags: ['initialization', 'authentication']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-tracks',
    title: 'Track Operations',
    description: 'Methods for working with Spotify tracks, including metadata and audio features',
    methods: [
      {
        id: 'get-track',
        name: 'getTrack()',
        description: 'Get detailed information about a specific track',
        signature: 'spotify.getTrack(trackId: string): Promise<Track>',
        parameters: [
          {
            name: 'trackId',
            type: 'string',
            description: 'The Spotify ID for the track',
            required: true
          }
        ],
        returnType: 'Promise<Track>',
        examples: [
          {
            id: 'get-track-example',
            title: 'Get Track Information',
            description: 'Fetch metadata for a specific track',
            code: `const track = await spotify.getTrack('3n3Ppam7vgaVa1iaRUc9Lp')

console.log(track.name)
console.log(track.artists[0].name)
console.log(track.album.name)
console.log(track.duration_ms)
console.log(track.popularity)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['tracks', 'metadata']
          }
        ]
      },
      {
        id: 'get-audio-features',
        name: 'getAudioFeatures()',
        description: 'Get audio features for a track including tempo, key, energy, and more',
        signature: 'spotify.getAudioFeatures(trackId: string): Promise<AudioFeatures>',
        parameters: [
          {
            name: 'trackId',
            type: 'string',
            description: 'The Spotify ID for the track',
            required: true
          }
        ],
        returnType: 'Promise<AudioFeatures>',
        examples: [
          {
            id: 'get-audio-features-example',
            title: 'Get Track Audio Features',
            description: 'Analyze audio characteristics of a track',
            code: `const features = await spotify.getAudioFeatures('3n3Ppam7vgaVa1iaRUc9Lp')

console.log(features.tempo)
console.log(features.key)
console.log(features.energy)
console.log(features.danceability)
console.log(features.valence)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['tracks', 'audio-analysis']
          }
        ]
      },
      {
        id: 'search-tracks',
        name: 'searchTracks()',
        description: 'Search for tracks using a query string',
        signature: 'spotify.searchTracks(query: string, options?: SearchOptions): Promise<SearchResult>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters like limit and offset',
            required: false
          }
        ],
        returnType: 'Promise<SearchResult>',
        examples: [
          {
            id: 'search-tracks-example',
            title: 'Search for Tracks',
            description: 'Find tracks matching a search query',
            code: `const results = await spotify.searchTracks('bohemian rhapsody', {
  limit: 10,
  offset: 0
})

results.tracks.items.forEach(function displayTrack(track) {
  console.log(track.name, '-', track.artists[0].name)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'tracks']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-artists',
    title: 'Artist Operations',
    description: 'Methods for retrieving artist information and related content',
    methods: [
      {
        id: 'get-artist',
        name: 'getArtist()',
        description: 'Get detailed information about an artist',
        signature: 'spotify.getArtist(artistId: string): Promise<Artist>',
        parameters: [
          {
            name: 'artistId',
            type: 'string',
            description: 'The Spotify ID for the artist',
            required: true
          }
        ],
        returnType: 'Promise<Artist>',
        examples: [
          {
            id: 'get-artist-example',
            title: 'Get Artist Information',
            description: 'Fetch artist metadata and statistics',
            code: `const artist = await spotify.getArtist('0OdUWJ0sBjDrqHygGUXeCF')

console.log(artist.name)
console.log(artist.genres)
console.log(artist.followers.total)
console.log(artist.popularity)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['artists', 'metadata']
          }
        ]
      },
      {
        id: 'search-artists',
        name: 'searchArtists()',
        description: 'Search for artists using a query string',
        signature: 'spotify.searchArtists(query: string, options?: SearchOptions): Promise<SearchResult>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters',
            required: false
          }
        ],
        returnType: 'Promise<SearchResult>',
        examples: [
          {
            id: 'search-artists-example',
            title: 'Search for Artists',
            description: 'Find artists matching a search query',
            code: `const results = await spotify.searchArtists('radiohead', {
  limit: 5
})

results.artists.items.forEach(function displayArtist(artist) {
  console.log(artist.name, '- Followers:', artist.followers.total)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'artists']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-albums',
    title: 'Album Operations',
    description: 'Methods for working with Spotify albums',
    methods: [
      {
        id: 'get-album',
        name: 'getAlbum()',
        description: 'Get detailed information about an album',
        signature: 'spotify.getAlbum(albumId: string): Promise<Album>',
        parameters: [
          {
            name: 'albumId',
            type: 'string',
            description: 'The Spotify ID for the album',
            required: true
          }
        ],
        returnType: 'Promise<Album>',
        examples: [
          {
            id: 'get-album-example',
            title: 'Get Album Information',
            description: 'Fetch album details and tracks',
            code: `const album = await spotify.getAlbum('6UXCm6bOO4gFlDQZV5yL37')

console.log(album.name)
console.log(album.artists[0].name)
console.log(album.release_date)
console.log(album.total_tracks)
console.log(album.label)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['albums', 'metadata']
          }
        ]
      },
      {
        id: 'search-albums',
        name: 'searchAlbums()',
        description: 'Search for albums using a query string',
        signature: 'spotify.searchAlbums(query: string, options?: SearchOptions): Promise<SearchResult>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters',
            required: false
          }
        ],
        returnType: 'Promise<SearchResult>',
        examples: [
          {
            id: 'search-albums-example',
            title: 'Search for Albums',
            description: 'Find albums matching a search query',
            code: `const results = await spotify.searchAlbums('dark side of the moon', {
  limit: 10
})

results.albums.items.forEach(function displayAlbum(album) {
  console.log(album.name, '-', album.artists[0].name)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'albums']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-playlists',
    title: 'Playlist Operations',
    description: 'Comprehensive playlist management including creation, modification, and retrieval',
    methods: [
      {
        id: 'get-playlist',
        name: 'getPlaylist()',
        description: 'Get detailed information about a playlist',
        signature: 'spotify.getPlaylist(playlistId: string): Promise<Playlist>',
        parameters: [
          {
            name: 'playlistId',
            type: 'string',
            description: 'The Spotify ID for the playlist',
            required: true
          }
        ],
        returnType: 'Promise<Playlist>',
        examples: [
          {
            id: 'get-playlist-example',
            title: 'Get Playlist Information',
            description: 'Fetch playlist details and tracks',
            code: `const playlist = await spotify.getPlaylist('37i9dQZF1DXcBWIGoYBM5M')

console.log(playlist.name)
console.log(playlist.description)
console.log(playlist.tracks.total)
console.log(playlist.followers.total)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlists', 'metadata']
          }
        ]
      },
      {
        id: 'create-playlist',
        name: 'createPlaylist()',
        description: 'Create a new playlist for a user',
        signature: 'spotify.createPlaylist(userId: string, name: string, options?: CreatePlaylistOptions): Promise<Playlist>',
        parameters: [
          {
            name: 'userId',
            type: 'string',
            description: 'The user Spotify ID',
            required: true
          },
          {
            name: 'name',
            type: 'string',
            description: 'Name for the new playlist',
            required: true
          },
          {
            name: 'options',
            type: 'CreatePlaylistOptions',
            description: 'Optional playlist settings like description and public visibility',
            required: false
          }
        ],
        returnType: 'Promise<Playlist>',
        examples: [
          {
            id: 'create-playlist-example',
            title: 'Create a New Playlist',
            description: 'Create a playlist with custom settings',
            code: `const playlist = await spotify.createPlaylist(
  'user123',
  'My Awesome Playlist',
  {
    description: 'A collection of my favorite tracks',
    public: true,
    collaborative: false
  }
)

console.log('Created playlist:', playlist.id)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlists', 'creation']
          }
        ]
      },
      {
        id: 'add-tracks-to-playlist',
        name: 'addTracksToPlaylist()',
        description: 'Add tracks to a playlist',
        signature: 'spotify.addTracksToPlaylist(playlistId: string, trackUris: string[]): Promise<void>',
        parameters: [
          {
            name: 'playlistId',
            type: 'string',
            description: 'The Spotify ID for the playlist',
            required: true
          },
          {
            name: 'trackUris',
            type: 'string[]',
            description: 'Array of Spotify track URIs to add',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'add-tracks-example',
            title: 'Add Tracks to Playlist',
            description: 'Add multiple tracks to an existing playlist',
            code: `await spotify.addTracksToPlaylist(
  '37i9dQZF1DXcBWIGoYBM5M',
  [
    'spotify:track:3n3Ppam7vgaVa1iaRUc9Lp',
    'spotify:track:0c6xIDDpzE81m2q797ordA',
    'spotify:track:7qiZfU4dY1lWllzX7mPBI'
  ]
)

console.log('Tracks added successfully')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlists', 'modification']
          }
        ]
      },
      {
        id: 'update-playlist',
        name: 'updatePlaylist()',
        description: 'Update playlist details like name and description',
        signature: 'spotify.updatePlaylist(playlistId: string, options: UpdatePlaylistOptions): Promise<void>',
        parameters: [
          {
            name: 'playlistId',
            type: 'string',
            description: 'The Spotify ID for the playlist',
            required: true
          },
          {
            name: 'options',
            type: 'UpdatePlaylistOptions',
            description: 'Updated playlist properties',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'update-playlist-example',
            title: 'Update Playlist Details',
            description: 'Modify playlist name and description',
            code: `await spotify.updatePlaylist('37i9dQZF1DXcBWIGoYBM5M', {
  name: 'Updated Playlist Name',
  description: 'New description for my playlist',
  public: false
})

console.log('Playlist updated')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlists', 'modification']
          }
        ]
      },
      {
        id: 'search-playlists',
        name: 'searchPlaylists()',
        description: 'Search for playlists using a query string',
        signature: 'spotify.searchPlaylists(query: string, options?: SearchOptions): Promise<SearchResult>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters',
            required: false
          }
        ],
        returnType: 'Promise<SearchResult>',
        examples: [
          {
            id: 'search-playlists-example',
            title: 'Search for Playlists',
            description: 'Find playlists matching a search query',
            code: `const results = await spotify.searchPlaylists('workout', {
  limit: 20
})

results.playlists.items.forEach(function displayPlaylist(playlist) {
  console.log(playlist.name, '- Tracks:', playlist.tracks.total)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'playlists']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-user',
    title: 'User Operations',
    description: 'Methods for accessing user data and preferences',
    methods: [
      {
        id: 'get-current-user',
        name: 'getCurrentUser()',
        description: 'Get detailed profile information for the current user',
        signature: 'spotify.getCurrentUser(): Promise<User>',
        parameters: [],
        returnType: 'Promise<User>',
        examples: [
          {
            id: 'get-current-user-example',
            title: 'Get Current User Profile',
            description: 'Fetch authenticated user information',
            code: `const user = await spotify.getCurrentUser()

console.log(user.display_name)
console.log(user.email)
console.log(user.country)
console.log(user.followers.total)
console.log(user.product)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'profile']
          }
        ]
      },
      {
        id: 'get-my-top-tracks',
        name: 'getMyTopTracks()',
        description: 'Get the current user\'s top tracks based on listening history',
        signature: 'spotify.getMyTopTracks(options?: TopItemsOptions): Promise<TopTracks>',
        parameters: [
          {
            name: 'options',
            type: 'TopItemsOptions',
            description: 'Options for time range, limit, and offset',
            required: false
          }
        ],
        returnType: 'Promise<TopTracks>',
        examples: [
          {
            id: 'get-my-top-tracks-example',
            title: 'Get User Top Tracks',
            description: 'Fetch most listened tracks for different time ranges',
            code: `const topTracks = await spotify.getMyTopTracks({
  timeRange: 'short_term',
  limit: 10
})

topTracks.items.forEach(function displayTrack(track, index) {
  console.log(\`\${index + 1}. \${track.name} - \${track.artists[0].name}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'personalization']
          }
        ]
      },
      {
        id: 'get-my-top-artists',
        name: 'getMyTopArtists()',
        description: 'Get the current user\'s top artists based on listening history',
        signature: 'spotify.getMyTopArtists(options?: TopItemsOptions): Promise<TopArtists>',
        parameters: [
          {
            name: 'options',
            type: 'TopItemsOptions',
            description: 'Options for time range, limit, and offset',
            required: false
          }
        ],
        returnType: 'Promise<TopArtists>',
        examples: [
          {
            id: 'get-my-top-artists-example',
            title: 'Get User Top Artists',
            description: 'Fetch most listened artists',
            code: `const topArtists = await spotify.getMyTopArtists({
  timeRange: 'medium_term',
  limit: 20
})

topArtists.items.forEach(function displayArtist(artist, index) {
  console.log(\`\${index + 1}. \${artist.name}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'personalization']
          }
        ]
      },
      {
        id: 'get-recently-played',
        name: 'getRecentlyPlayed()',
        description: 'Get the current user\'s recently played tracks',
        signature: 'spotify.getRecentlyPlayed(options?: RecentlyPlayedOptions): Promise<RecentlyPlayed>',
        parameters: [
          {
            name: 'options',
            type: 'RecentlyPlayedOptions',
            description: 'Options for limit and time-based filtering',
            required: false
          }
        ],
        returnType: 'Promise<RecentlyPlayed>',
        examples: [
          {
            id: 'get-recently-played-example',
            title: 'Get Recently Played Tracks',
            description: 'Fetch listening history',
            code: `const recent = await spotify.getRecentlyPlayed({
  limit: 50
})

recent.items.forEach(function displayPlay(item) {
  console.log(item.track.name, '- Played at:', item.played_at)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'history']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-player',
    title: 'Player Operations',
    description: 'Control playback on Spotify devices including play, pause, skip, and volume',
    methods: [
      {
        id: 'get-currently-playing',
        name: 'getCurrentlyPlaying()',
        description: 'Get information about the currently playing track',
        signature: 'spotify.getCurrentlyPlaying(): Promise<CurrentlyPlaying>',
        parameters: [],
        returnType: 'Promise<CurrentlyPlaying>',
        examples: [
          {
            id: 'get-currently-playing-example',
            title: 'Get Currently Playing Track',
            description: 'Fetch information about active playback',
            code: `const current = await spotify.getCurrentlyPlaying()

if (current.is_playing) {
  console.log('Now playing:', current.item.name)
  console.log('Artist:', current.item.artists[0].name)
  console.log('Progress:', current.progress_ms, 'ms')
}`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'play',
        name: 'play()',
        description: 'Start or resume playback',
        signature: 'spotify.play(options?: PlayOptions): Promise<void>',
        parameters: [
          {
            name: 'options',
            type: 'PlayOptions',
            description: 'Optional playback context and position',
            required: false
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'play-example',
            title: 'Start Playback',
            description: 'Resume or start playing specific tracks',
            code: `await spotify.play({
  uris: ['spotify:track:3n3Ppam7vgaVa1iaRUc9Lp'],
  position_ms: 0
})

console.log('Playback started')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'pause',
        name: 'pause()',
        description: 'Pause playback on the user\'s active device',
        signature: 'spotify.pause(): Promise<void>',
        parameters: [],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'pause-example',
            title: 'Pause Playback',
            description: 'Pause the currently playing track',
            code: `await spotify.pause()
console.log('Playback paused')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'skip-to-next',
        name: 'skipToNext()',
        description: 'Skip to the next track in the user\'s queue',
        signature: 'spotify.skipToNext(): Promise<void>',
        parameters: [],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'skip-to-next-example',
            title: 'Skip to Next Track',
            description: 'Move to the next track in queue',
            code: `await spotify.skipToNext()
console.log('Skipped to next track')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'skip-to-previous',
        name: 'skipToPrevious()',
        description: 'Skip to the previous track in the user\'s queue',
        signature: 'spotify.skipToPrevious(): Promise<void>',
        parameters: [],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'skip-to-previous-example',
            title: 'Skip to Previous Track',
            description: 'Move to the previous track',
            code: `await spotify.skipToPrevious()
console.log('Skipped to previous track')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'set-volume',
        name: 'setVolume()',
        description: 'Set the volume for the user\'s current playback device',
        signature: 'spotify.setVolume(volume: number): Promise<void>',
        parameters: [
          {
            name: 'volume',
            type: 'number',
            description: 'Volume level from 0 to 100',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'set-volume-example',
            title: 'Set Playback Volume',
            description: 'Adjust the volume level',
            code: `await spotify.setVolume(50)
console.log('Volume set to 50%')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'volume']
          }
        ]
      },
      {
        id: 'set-shuffle',
        name: 'setShuffle()',
        description: 'Toggle shuffle mode for playback',
        signature: 'spotify.setShuffle(state: boolean): Promise<void>',
        parameters: [
          {
            name: 'state',
            type: 'boolean',
            description: 'True to enable shuffle, false to disable',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'set-shuffle-example',
            title: 'Toggle Shuffle Mode',
            description: 'Enable or disable shuffle',
            code: `await spotify.setShuffle(true)
console.log('Shuffle enabled')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'set-repeat-mode',
        name: 'setRepeatMode()',
        description: 'Set repeat mode for playback',
        signature: 'spotify.setRepeatMode(mode: string): Promise<void>',
        parameters: [
          {
            name: 'mode',
            type: 'string',
            description: 'Repeat mode: "track", "context", or "off"',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'set-repeat-mode-example',
            title: 'Set Repeat Mode',
            description: 'Control repeat behavior',
            code: `await spotify.setRepeatMode('track')
console.log('Repeat mode set to track')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-browse',
    title: 'Browse Operations',
    description: 'Discover new music through categories, recommendations, and featured content',
    methods: [
      {
        id: 'get-recommendations',
        name: 'getRecommendations()',
        description: 'Get track recommendations based on seed artists, tracks, or genres',
        signature: 'spotify.getRecommendations(options: RecommendationsOptions): Promise<Recommendations>',
        parameters: [
          {
            name: 'options',
            type: 'RecommendationsOptions',
            description: 'Seed entities and tunable track attributes',
            required: true
          }
        ],
        returnType: 'Promise<Recommendations>',
        examples: [
          {
            id: 'get-recommendations-example',
            title: 'Get Track Recommendations',
            description: 'Discover new tracks based on seeds',
            code: `const recommendations = await spotify.getRecommendations({
  seed_artists: ['0OdUWJ0sBjDrqHygGUXeCF'],
  seed_tracks: ['3n3Ppam7vgaVa1iaRUc9Lp'],
  limit: 20,
  target_energy: 0.8
})

recommendations.tracks.forEach(function displayTrack(track) {
  console.log(track.name, '-', track.artists[0].name)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['browse', 'recommendations']
          }
        ]
      }
    ]
  }
]
