import type { TApiSection } from '../types';

export const spotifyApiData: TApiSection[] = [
  {
    id: 'spotify-client',
    title: 'Spotify API Client',
    description: 'Comprehensive Spotify Web API client with authentication and player controls',
    methods: [
      {
        id: 'spotify-main-client',
        name: 'Spotify()',
        description: 'Main Spotify client factory with optional configuration',
        signature: 'Spotify(config?: TSpotifyClientConfig): SpotifyClient',
        parameters: [
          {
            name: 'config',
            type: 'TSpotifyClientConfig',
            description: 'Optional configuration including token, refreshToken, and other settings',
            required: false
          }
        ],
        returnType: 'SpotifyClient',
        examples: [
          {
            id: 'spotify-client-init',
            title: 'Initialize Spotify Client',
            description: 'Create a Spotify client with authentication',
            code: `import { Spotify, SPOTIFY_SCOPES } from '@remcostoeten/fync/spotify'

// Basic initialization
const spotify = Spotify()

// With authentication tokens
const spotify = Spotify({
  token: 'your-spotify-access-token',
  refreshToken: 'your-refresh-token' // optional
})

// Access different client methods
const userClient = spotify.user('spotify_user_id')
const meClient = spotify.me
const playerClient = spotify.player
const searchClient = spotify.search`,
            language: 'typescript',
            category: 'spotify',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'spotify-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main Spotify client',
        signature: 'spotify.user() | spotify.me | spotify.player | spotify.playlist() | spotify.search',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'spotify-client-methods-example',
            title: 'Spotify Client Methods',
            description: 'Access different Spotify API endpoints through specialized clients',
            code: `const spotify = Spotify({ token: 'your-token' })

// User operations
const userClient = spotify.user('spotify_user_id')
const meClient = spotify.me

// Player controls
const playerClient = spotify.player

// Playlist operations
const playlistClient = spotify.playlist('playlist_id')

// Search operations
const searchClient = spotify.search

// Library operations
const libraryClient = spotify.library`,
            language: 'typescript',
            category: 'spotify',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-user-operations',
    title: 'User Operations',
    description: 'Methods for interacting with Spotify users and their data',
    methods: [
      {
        id: 'me-get',
        name: 'me.get()',
        description: 'Get current authenticated user profile',
        signature: 'spotify.me.get(): Promise<TSpotifyUser>',
        parameters: [],
        returnType: 'Promise<TSpotifyUser>',
        examples: [
          {
            id: 'me-get-example',
            title: 'Get Current User Profile',
            description: 'Fetch the authenticated user\'s profile information',
            code: `// Get current user profile
const me = await spotify.me.get()

console.log(me.display_name) // Your Display Name
console.log(me.email) // your@email.com
console.log(me.country) // US
console.log(me.product) // premium
console.log(me.followers.total) // 42
console.log(me.images[0]?.url) // Profile image URL

// Check subscription status
if (me.product === 'premium') {
  console.log('User has Spotify Premium')
} else {
  console.log('User has Spotify Free')
}

// Display profile image
if (me.images && me.images.length > 0) {
  console.log('Profile image available:', me.images[0].url)
}`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'profile']
          },
          {
            id: 'me-get-with-preferences',
            title: 'Get User Profile with Preferences',
            description: 'Fetch user profile and analyze listening preferences',
            code: `// Get user profile
const me = await spotify.me.get()

// Get user's top artists and tracks for analysis
const topArtists = await spotify.me.topArtists.get({ limit: 10 })
const topTracks = await spotify.me.topTracks.get({ limit: 10 })

console.log(\`Welcome, \${me.display_name}!\`)
console.log(\`Account type: \${me.product}\`)
console.log(\`Country: \${me.country}\`)
console.log(\`Followers: \${me.followers.total}\`)

// Analyze music taste
const genres = topArtists.flatMap(artist => artist.genres)
const genreCount = genres.reduce((acc, genre) => {
  acc[genre] = (acc[genre] || 0) + 1
  return acc
}, {})

const topGenres = Object.entries(genreCount)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5)

console.log('Your top genres:')
topGenres.forEach(([genre, count], index) => {
  console.log(\`\${index + 1}. \${genre} (\${count} artists)\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'profile']
          }
        ]
      },
      {
        id: 'me-playlists',
        name: 'me.playlists.get()',
        description: 'Get current user\'s playlists',
        signature: 'spotify.me.playlists.get(): Promise<TSpotifyPlaylist[]>',
        parameters: [],
        returnType: 'Promise<TSpotifyPlaylist[]>',
        examples: [
          {
            id: 'me-playlists-example',
            title: 'Get User Playlists',
            description: 'Fetch all playlists owned by the current user',
            code: `// Get user playlists
const playlists = await spotify.me.playlists.get()

console.log(\`You have \${playlists.length} playlists\`)

// Display playlist information
playlists.forEach(playlist => {
  console.log(\`\${playlist.name} - \${playlist.tracks.total} tracks\`)
  console.log(\`Owner: \${playlist.owner.display_name}\`)
  console.log(\`Public: \${playlist.public}\`)
  console.log(\`Collaborative: \${playlist.collaborative}\`)
  console.log('---')
})

// Find largest playlist
const largestPlaylist = playlists.reduce((prev, current) => 
  prev.tracks.total > current.tracks.total ? prev : current
)
console.log(\`Largest playlist: "\${largestPlaylist.name}" with \${largestPlaylist.tracks.total} tracks\`)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'playlists']
          },
          {
            id: 'me-playlists-analysis',
            title: 'Analyze User Playlists',
            description: 'Get detailed analysis of user\'s playlist collection',
            code: `// Get all user playlists
const playlists = await spotify.me.playlists.get()

// Calculate statistics
const totalTracks = playlists.reduce((sum, playlist) => sum + playlist.tracks.total, 0)
const publicPlaylists = playlists.filter(p => p.public).length
const privatePlaylists = playlists.filter(p => !p.public).length
const collaborativePlaylists = playlists.filter(p => p.collaborative).length

console.log('Playlist Statistics:')
console.log(\`Total playlists: \${playlists.length}\`)
console.log(\`Total tracks: \${totalTracks.toLocaleString()}\`)
console.log(\`Public: \${publicPlaylists}\`)
console.log(\`Private: \${privatePlaylists}\`)
console.log(\`Collaborative: \${collaborativePlaylists}\`)

// Find playlists by size category
const smallPlaylists = playlists.filter(p => p.tracks.total < 20)
const mediumPlaylists = playlists.filter(p => p.tracks.total >= 20 && p.tracks.total < 100)
const largePlaylists = playlists.filter(p => p.tracks.total >= 100)

console.log('\\nPlaylist Size Distribution:')
console.log(\`Small (< 20 tracks): \${smallPlaylists.length}\`)
console.log(\`Medium (20-99 tracks): \${mediumPlaylists.length}\`)
console.log(\`Large (100+ tracks): \${largePlaylists.length}\`)

// Show top 5 largest playlists
const topPlaylists = playlists
  .sort((a, b) => b.tracks.total - a.tracks.total)
  .slice(0, 5)

console.log('\\nTop 5 Largest Playlists:')
topPlaylists.forEach((playlist, index) => {
  console.log(\`\${index + 1}. "\${playlist.name}" - \${playlist.tracks.total} tracks\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'playlists']
          }
        ]
      },
      {
        id: 'me-tracks',
        name: 'me.tracks.get()',
        description: 'Get user\'s saved tracks (liked songs)',
        signature: 'spotify.me.tracks.get(): Promise<TSpotifyTrack[]>',
        parameters: [],
        returnType: 'Promise<TSpotifyTrack[]>',
        examples: [
          {
            id: 'me-tracks-example',
            title: 'Get Saved Tracks',
            description: 'Fetch all tracks saved to user\'s library',
            code: `const savedTracks = await spotify.me.tracks.get()

savedTracks.forEach(track => {
  console.log(\`\${track.name} by \${track.artists[0].name}\`)
  console.log(\`Album: \${track.album.name}\`)
  console.log(\`Duration: \${Math.floor(track.duration_ms / 60000)}m \${Math.floor((track.duration_ms % 60000) / 1000)}s\`)
  console.log(\`Popularity: \${track.popularity}/100\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'tracks', 'library']
          }
        ]
      },
      {
        id: 'me-albums',
        name: 'me.albums.get()',
        description: 'Get user\'s saved albums',
        signature: 'spotify.me.albums.get(): Promise<TSpotifyAlbum[]>',
        parameters: [],
        returnType: 'Promise<TSpotifyAlbum[]>',
        examples: [
          {
            id: 'me-albums-example',
            title: 'Get Saved Albums',
            description: 'Fetch all albums saved to user\'s library',
            code: `const savedAlbums = await spotify.me.albums.get()

savedAlbums.forEach(album => {
  console.log(\`\${album.name} by \${album.artists[0].name}\`)
  console.log(\`Release Date: \${album.release_date}\`)
  console.log(\`Total Tracks: \${album.total_tracks}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'albums', 'library']
          }
        ]
      },
      {
        id: 'me-artists',
        name: 'me.artists.get()',
        description: 'Get user\'s followed artists',
        signature: 'spotify.me.artists.get(): Promise<TSpotifyArtist[]>',
        parameters: [],
        returnType: 'Promise<TSpotifyArtist[]>',
        examples: [
          {
            id: 'me-artists-example',
            title: 'Get Followed Artists',
            description: 'Fetch all artists followed by the user',
            code: `const followedArtists = await spotify.me.artists.get()

followedArtists.forEach(artist => {
  console.log(\`\${artist.name}\`)
  console.log(\`Genres: \${artist.genres.join(', ')}\`)
  console.log(\`Popularity: \${artist.popularity}/100\`)
  console.log(\`Followers: \${artist.followers.total.toLocaleString()}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'artists']
          }
        ]
      },
      {
        id: 'recently-played',
        name: 'me.recentlyPlayed.get()',
        description: 'Get recently played tracks',
        signature: 'spotify.me.recentlyPlayed.get(): Promise<TSpotifyTrack[]>',
        parameters: [],
        returnType: 'Promise<TSpotifyTrack[]>',
        examples: [
          {
            id: 'recently-played-example',
            title: 'Get Recently Played Tracks',
            description: 'Fetch the user\'s recently played tracks',
            code: `const recentTracks = await spotify.me.recentlyPlayed.get()

recentTracks.forEach(track => {
  console.log(\`\${track.name} by \${track.artists[0].name}\`)
  console.log(\`Played at: \${track.played_at}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['user', 'recent', 'history']
          }
        ]
      }
    ]
  },
  {
    id: 'player-operations',
    title: 'Player Client Methods',
    description: 'Control Spotify playback and manage player state',
    methods: [
      {
        id: 'player-currently-playing',
        name: 'player.currentlyPlaying()',
        description: 'Get current playback state and track information',
        signature: 'spotify.player.currentlyPlaying(): Promise<TPlaybackState>',
        parameters: [],
        returnType: 'Promise<TPlaybackState>',
        examples: [
          {
            id: 'currently-playing-example',
            title: 'Get Currently Playing Track',
            description: 'Fetch current playback state and track info',
            code: `const playback = await spotify.player.currentlyPlaying()

if (playback.is_playing) {
  console.log(\`Now playing: \${playback.item.name}\`)
  console.log(\`Artist: \${playback.item.artists[0].name}\`)
  console.log(\`Album: \${playback.item.album.name}\`)
  console.log(\`Progress: \${playback.progress_ms}ms / \${playback.item.duration_ms}ms\`)
  console.log(\`Device: \${playback.device.name}\`)
} else {
  console.log('Nothing is currently playing')
}`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'playback']
          }
        ]
      },
      {
        id: 'player-controls',
        name: 'Playback Controls',
        description: 'Control music playback with play, pause, next, previous',
        signature: 'spotify.player.play() | .pause() | .next() | .previous()',
        parameters: [],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'player-controls-example',
            title: 'Player Control Methods',
            description: 'Control Spotify playback with various methods',
            code: `// Play specific tracks
await spotify.player.play({
  device_id: 'device_id',
  uris: [
    'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
    'spotify:track:1301WleyT98MSxVHPZCA6M'
  ]
})

// Play from playlist
await spotify.player.play({
  context_uri: 'spotify:playlist:37i9dQZF1DXcBWIGoYBM5M'
})

// Pause playback
await spotify.player.pause()

// Skip to next track
await spotify.player.next()

// Go to previous track
await spotify.player.previous()

// Add track to queue
await spotify.player.queue('spotify:track:track_id')`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'control']
          }
        ]
      },
      {
        id: 'player-devices',
        name: 'player.devices()',
        description: 'Get available playback devices',
        signature: 'spotify.player.devices(): Promise<TSpotifyDevice[]>',
        parameters: [],
        returnType: 'Promise<TSpotifyDevice[]>',
        examples: [
          {
            id: 'player-devices-example',
            title: 'Get Available Devices',
            description: 'Fetch all available Spotify playback devices',
            code: `const devices = await spotify.player.devices()

devices.forEach(device => {
  console.log(\`\${device.name} (\${device.type})\`)
  console.log(\`Active: \${device.is_active}\`)
  console.log(\`Volume: \${device.volume_percent}%\`)
  console.log(\`ID: \${device.id}\`)
})

// Find active device
const activeDevice = devices.find(device => device.is_active)
if (activeDevice) {
  console.log(\`Currently playing on: \${activeDevice.name}\`)
}`,
            language: 'typescript',
            category: 'spotify',
            tags: ['player', 'devices']
          }
        ]
      }
    ]
  },
  {
    id: 'search-operations-spotify',
    title: 'Search Client Methods',
    description: 'Search across tracks, artists, albums, playlists, shows, and episodes',
    methods: [
      {
        id: 'search-tracks',
        name: 'search.tracks()',
        description: 'Search for tracks using query parameters',
        signature: 'spotify.search.tracks(query: string): Promise<TSpotifyTrack[]>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query with optional filters',
            required: true
          }
        ],
        returnType: 'Promise<TSpotifyTrack[]>',
        examples: [
          {
            id: 'search-tracks-example',
            title: 'Search Tracks',
            description: 'Find tracks using various search criteria',
            code: `// Basic track search
const tracks = await spotify.search.tracks('Bohemian Rhapsody')

// Search by artist
const beatlesTracks = await spotify.search.tracks('artist:"The Beatles"')

// Search by album
const albumTracks = await spotify.search.tracks('album:"Abbey Road"')

// Search with multiple criteria
const specificTracks = await spotify.search.tracks('track:"Hey Jude" artist:"The Beatles"')

// Search by year
const oldTracks = await spotify.search.tracks('year:1960-1970 genre:rock')

// Display search results
tracks.forEach(track => {
  console.log(\`\${track.name} by \${track.artists[0].name}\`)
  console.log(\`Album: \${track.album.name}\`)
  console.log(\`Popularity: \${track.popularity}/100\`)
  console.log(\`Duration: \${Math.floor(track.duration_ms / 60000)}:\${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}\`)
  console.log('---')
})

// Find most popular track
const mostPopular = tracks.reduce((prev, current) => 
  prev.popularity > current.popularity ? prev : current
)
console.log(\`Most popular: "\${mostPopular.name}" by \${mostPopular.artists[0].name}\`)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'tracks']
          },
          {
            id: 'search-tracks-advanced',
            title: 'Advanced Track Search',
            description: 'Use advanced search parameters and filters',
            code: `// Search with audio features
const danceableTracks = await spotify.search.tracks('genre:electronic danceability:0.8..1.0')

// Search by decade and energy
const energetic80s = await spotify.search.tracks('year:1980-1989 energy:0.7..1.0')

// Search for acoustic versions
const acousticTracks = await spotify.search.tracks('acoustic version')

// Search by tempo range (BPM)
const workoutTracks = await spotify.search.tracks('genre:pop tempo:120-140')

console.log('Search Results:')
console.log(\`Danceable electronic: \${danceableTracks.length} tracks\`)
console.log(\`Energetic 80s: \${energetic80s.length} tracks\`)
console.log(\`Acoustic versions: \${acousticTracks.length} tracks\`)
console.log(\`Workout pop: \${workoutTracks.length} tracks\`)

// Create a workout playlist from results
const workoutPlaylist = workoutTracks.slice(0, 20)
console.log('\\nWorkout Playlist Preview:')
workoutPlaylist.forEach((track, index) => {
  const duration = \`\${Math.floor(track.duration_ms / 60000)}:\${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}\`
  console.log(\`\${index + 1}. \${track.name} - \${track.artists[0].name} (\${duration})\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'tracks']
          }
        ]
      },
      {
        id: 'search-comprehensive',
        name: 'Comprehensive Search',
        description: 'Search across all Spotify content types',
        signature: 'spotify.search.artists() | .albums() | .playlists() | .shows() | .episodes()',
        parameters: [],
        returnType: 'Promise<Array>',
        examples: [
          {
            id: 'search-comprehensive-example',
            title: 'Comprehensive Spotify Search',
            description: 'Search across different types of Spotify content',
            code: `// Search artists
const artists = await spotify.search.artists('radiohead')

// Search albums
const albums = await spotify.search.albums('album:"OK Computer"')

// Search playlists
const playlists = await spotify.search.playlists('indie rock')

// Search shows (podcasts)
const shows = await spotify.search.shows('javascript podcast')

// Search episodes
const episodes = await spotify.search.episodes('web development')

artists.forEach(artist => {
  console.log(\`\${artist.name}\`)
  console.log(\`Genres: \${artist.genres.join(', ')}\`)
  console.log(\`Popularity: \${artist.popularity}/100\`)
  console.log(\`Followers: \${artist.followers.total.toLocaleString()}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['search', 'comprehensive']
          }
        ]
      }
    ]
  },
  {
    id: 'playlist-operations',
    title: 'Playlist Operations',
    description: 'Create, modify, and manage playlists',
    methods: [
      {
        id: 'playlist-get',
        name: 'playlist().get()',
        description: 'Get playlist details and metadata',
        signature: 'spotify.playlist(playlistId: string).get(): Promise<TSpotifyPlaylist>',
        parameters: [
          {
            name: 'playlistId',
            type: 'string',
            description: 'Spotify playlist ID',
            required: true
          }
        ],
        returnType: 'Promise<TSpotifyPlaylist>',
        examples: [
          {
            id: 'playlist-get-example',
            title: 'Get Playlist Details',
            description: 'Fetch comprehensive playlist information',
            code: `// Get playlist information
const playlist = await spotify.playlist('37i9dQZF1DXcBWIGoYBM5M').get()

console.log(\`Name: \${playlist.name}\`)
console.log(\`Description: \${playlist.description}\`)
console.log(\`Owner: \${playlist.owner.display_name}\`)
console.log(\`Tracks: \${playlist.tracks.total}\`)
console.log(\`Public: \${playlist.public}\`)
console.log(\`Collaborative: \${playlist.collaborative}\`)
console.log(\`Followers: \${playlist.followers.total}\`)

// Calculate playlist duration
const tracks = await spotify.playlist(playlist.id).tracks.get()
const totalDuration = tracks.reduce((sum, track) => sum + track.duration_ms, 0)
const hours = Math.floor(totalDuration / (1000 * 60 * 60))
const minutes = Math.floor((totalDuration % (1000 * 60 * 60)) / (1000 * 60))

console.log(\`Total duration: \${hours}h \${minutes}m\`)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlist', 'details']
          },
          {
            id: 'playlist-analysis',
            title: 'Analyze Playlist Content',
            description: 'Get detailed analysis of playlist tracks and artists',
            code: `// Get playlist and its tracks
const playlist = await spotify.playlist('37i9dQZF1DXcBWIGoYBM5M').get()
const tracks = await spotify.playlist(playlist.id).tracks.get()

console.log(\`Analyzing playlist: "\${playlist.name}"\`)
console.log(\`Total tracks: \${tracks.length}\`)

// Analyze artists
const artistCount = {}
const albumCount = {}
let totalDuration = 0

tracks.forEach(track => {
  // Count artists
  track.artists.forEach(artist => {
    artistCount[artist.name] = (artistCount[artist.name] || 0) + 1
  })
  
  // Count albums
  albumCount[track.album.name] = (albumCount[track.album.name] || 0) + 1
  
  // Sum duration
  totalDuration += track.duration_ms
})

// Find top artists
const topArtists = Object.entries(artistCount)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5)

console.log('\\nTop Artists:')
topArtists.forEach(([artist, count], index) => {
  console.log(\`\${index + 1}. \${artist} (\${count} tracks)\`)
})

// Calculate average popularity
const avgPopularity = tracks.reduce((sum, track) => sum + track.popularity, 0) / tracks.length
console.log(\`\\nAverage popularity: \${avgPopularity.toFixed(1)}/100\`)

// Duration breakdown
const hours = Math.floor(totalDuration / (1000 * 60 * 60))
const minutes = Math.floor((totalDuration % (1000 * 60 * 60)) / (1000 * 60))
console.log(\`Total duration: \${hours}h \${minutes}m\`)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlist', 'details']
          }
        ]
      },
      {
        id: 'playlist-tracks',
        name: 'playlist().tracks',
        description: 'Manage playlist tracks - get, add, and remove',
        signature: 'spotify.playlist(id).tracks.get() | .add() | .remove()',
        parameters: [],
        returnType: 'Promise<TSpotifyTrack[]> | Promise<void>',
        examples: [
          {
            id: 'playlist-tracks-example',
            title: 'Playlist Track Management',
            description: 'Manage tracks within playlists',
            code: `const playlistClient = spotify.playlist('your-playlist-id')

// Get playlist tracks
const tracks = await playlistClient.tracks.get()

// Add tracks to playlist
const result = await playlistClient.tracks.add([
  'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
  'spotify:track:1301WleyT98MSxVHPZCA6M',
  'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'
])

// Remove tracks from playlist
await playlistClient.tracks.remove([
  'spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
])

console.log(\`Added tracks. Snapshot ID: \${result.snapshot_id}\`)
console.log(\`Playlist has \${tracks.length} tracks\`)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['playlist', 'tracks', 'modify']
          }
        ]
      }
    ]
  },
  {
    id: 'library-operations',
    title: 'Library Client Methods',
    description: 'Manage user\'s saved content in their Spotify library',
    methods: [
      {
        id: 'library-saved-content',
        name: 'Library Operations',
        description: 'Access and manage user\'s saved tracks, albums, shows, and episodes',
        signature: 'spotify.library.savedTracks | .savedAlbums | .savedShows | .savedEpisodes',
        parameters: [],
        returnType: 'Various library clients',
        examples: [
          {
            id: 'library-operations-example',
            title: 'Library Content Management',
            description: 'Manage different types of saved content in user\'s library',
            code: `// Get saved tracks
const savedTracks = await spotify.library.savedTracks.get()

// Get saved albums
const savedAlbums = await spotify.library.savedAlbums.get()

// Get saved shows (podcasts)
const savedShows = await spotify.library.savedShows.get()

// Get saved episodes
const savedEpisodes = await spotify.library.savedEpisodes.get()

console.log(\`Saved tracks: \${savedTracks.length}\`)
console.log(\`Saved albums: \${savedAlbums.length}\`)
console.log(\`Saved shows: \${savedShows.length}\`)
console.log(\`Saved episodes: \${savedEpisodes.length}\`)

// Display saved tracks
savedTracks.slice(0, 5).forEach(track => {
  console.log(\`\${track.name} by \${track.artists[0].name}\`)
})`,
            language: 'typescript',
            category: 'spotify',
            tags: ['library', 'saved-content']
          }
        ]
      }
    ]
  },
  {
    id: 'spotify-auth',
    title: 'Spotify Authentication',
    description: 'OAuth2 authentication and token management for Spotify',
    methods: [
      {
        id: 'spotify-auth-setup',
        name: 'createSpotifyAuth()',
        description: 'Create Spotify OAuth2 authentication flow',
        signature: 'createSpotifyAuth(config: TSpotifyAuthConfig): SpotifyAuth',
        parameters: [
          {
            name: 'config',
            type: 'TSpotifyAuthConfig',
            description: 'Spotify OAuth2 configuration',
            required: true
          }
        ],
        returnType: 'SpotifyAuth',
        examples: [
          {
            id: 'spotify-auth-example',
            title: 'Spotify OAuth2 Setup',
            description: 'Set up complete OAuth2 flow for Spotify authentication',
            code: `import { 
  createSpotifyAuth, 
  SPOTIFY_SCOPES,
  isTokenExpired,
  shouldRefreshToken
} from '@remcostoeten/fync/spotify'

// Define required scopes
const scopes = [
  SPOTIFY_SCOPES.USER_READ_PRIVATE,
  SPOTIFY_SCOPES.USER_READ_EMAIL,
  SPOTIFY_SCOPES.PLAYLIST_READ_PRIVATE,
  SPOTIFY_SCOPES.USER_LIBRARY_READ,
  SPOTIFY_SCOPES.USER_READ_PLAYBACK_STATE,
  SPOTIFY_SCOPES.USER_MODIFY_PLAYBACK_STATE,
  SPOTIFY_SCOPES.PLAYLIST_MODIFY_PUBLIC,
  SPOTIFY_SCOPES.PLAYLIST_MODIFY_PRIVATE
]

// Create Spotify auth helper
const spotifyAuth = createSpotifyAuth({
  clientId: 'your-spotify-client-id',
  clientSecret: 'your-spotify-client-secret',
  redirectUri: 'http://localhost:3000/api/spotify/callback',
  scopes
})

// Generate authorization URL
const authUrl = spotifyAuth.getAuthorizationUrl()

// Exchange code for token
const tokens = await spotifyAuth.exchangeCodeForToken(authorizationCode)

// Check token status
const expired = isTokenExpired(tokens.expires_at)
const shouldRefresh = shouldRefreshToken(tokens.expires_at, 300)`,
            language: 'typescript',
            category: 'spotify',
            tags: ['oauth2', 'authentication']
          }
        ]
      }
    ]
  }
];