# @remcostoeten/fync

[![npm version](https://badge.fury.io/js/@remcostoeten%2Ffync.svg)](https://badge.fury.io/js/@remcostoeten%2Ffync)
[![npm downloads](https://img.shields.io/npm/dm/@remcostoeten/fync.svg)](https://www.npmjs.com/package/@remcostoeten/fync)
[![GitHub license](https://img.shields.io/github/license/remcostoeten/fync.svg)](https://github.com/remcostoeten/fync/blob/main/LICENSE)

A unified TypeScript library providing consistent, chainable interfaces for popular APIs including GitHub, Spotify, NPM, Google Calendar, Google Drive, and Vercel.

## Features

- **Unified Architecture**: Consistent API patterns across all supported services
- **TypeScript First**: Full type safety with comprehensive type definitions
- **Error Handling**: Built-in TResult pattern with structured error information
- **Caching**: Configurable request caching with TTL support
- **Rate Limiting**: Built-in rate limiting to respect API limits
- **ESM & CJS**: Supports both ES modules and CommonJS
- **Zero Config**: Works out of the box with sensible defaults

## Supported APIs

- **GitHub** - Repositories, users, issues, pull requests, actions, and more
- **Spotify** - Tracks, playlists, user profiles, playback control
- **NPM Registry** - Package information, versions, downloads, search
- **Google Calendar** - Events, calendars, scheduling
- **Google Drive** - Files, folders, sharing, metadata
- **Vercel** - Projects, deployments, analytics

## Installation

```bash
npm install @remcostoeten/fync
```

## Quick Start

### GitHub API

```typescript
import { GitHub } from '@remcostoeten/fync/github'

const github = GitHub({
  token: process.env.GITHUB_TOKEN
})

// Get user information
const user = await github.user('octocat').get()
const myProfile = await github.me.get()

// Repository operations
const repo = await github.repo('facebook', 'react').get()
const issues = await github.repo('facebook', 'react').getIssues()
const releases = await github.repo('facebook', 'react').getReleases()

// Search functionality
const repositories = await github.search.repositories('typescript')
const users = await github.search.users('john')
```

### Spotify API

```typescript
import { Spotify } from '@remcostoeten/fync/spotify'

const spotify = Spotify({
  accessToken: process.env.SPOTIFY_ACCESS_TOKEN
})

// User and library
const profile = await spotify.me.get()
const playlists = await spotify.me.playlists.get()
const savedTracks = await spotify.me.tracks.get()

// Playback control
await spotify.player.play({ uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'] })
await spotify.player.pause()
const nowPlaying = await spotify.player.currentlyPlaying()

// Search and discovery
const tracks = await spotify.search.tracks('bohemian rhapsody')
const artists = await spotify.search.artists('queen')
```

### NPM Registry API

```typescript
import { NPM } from '@remcostoeten/fync/npm'

// No authentication required
const npm = NPM({
  cache: true,
  cacheTTL: 300000 // 5 minutes
})

// Package information
const packageInfo = await npm.package('react').get()
const latestVersion = await npm.package('react').latest()
const specificVersion = await npm.package('react').version('18.0.0').get()

// Search and statistics
const packages = await npm.search.packages('typescript')
const downloads = await npm.downloads.package('react', 'last-week')
const trends = await npm.downloads.range('react', '2024-01-01', '2024-01-31')
```

### Google Calendar API

```typescript
import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'

const calendar = GoogleCalendar({
  accessToken: process.env.GOOGLE_ACCESS_TOKEN
})

// Calendar operations
const calendars = await calendar.calendars.list()
const events = await calendar.calendar('primary').events.list()
const event = await calendar.calendar('primary').events.get('event-id')

// Create and manage events
const newEvent = await calendar.calendar('primary').events.create({
  summary: 'Meeting',
  start: { dateTime: '2024-01-15T10:00:00Z' },
  end: { dateTime: '2024-01-15T11:00:00Z' }
})
```

### Google Drive API

```typescript
import { GoogleDrive } from '@remcostoeten/fync/google-drive'

const drive = GoogleDrive({
  accessToken: process.env.GOOGLE_ACCESS_TOKEN
})

// File operations
const files = await drive.files.list()
const file = await drive.files.get('file-id')
const metadata = await drive.files.getMetadata('file-id')

// Folder operations
const folders = await drive.folders.list()
const contents = await drive.folders.contents('folder-id')
```

### Vercel API

```typescript
import { Vercel } from '@remcostoeten/fync/vercel'

const vercel = Vercel({
  token: process.env.VERCEL_TOKEN
})

// Project operations
const projects = await vercel.projects.list()
const project = await vercel.projects.get('project-id')
const deployments = await vercel.deployments.list('project-id')

// Analytics
const analytics = await vercel.analytics.get('project-id', {
  from: '2024-01-01',
  to: '2024-01-31'
})
```

## Advanced Features

### Error Handling with TResult Pattern

```typescript
import { createApiFactoryEnhanced } from '@remcostoeten/fync/core'

const api = createApiFactoryEnhanced({
  baseUrl: 'https://api.github.com',
  useResult: true // Enable TResult pattern
})

const result = await api.get('/user')
if (result.success) {
  console.log(result.data)
} else {
  console.error(result.error)
}
```

### Caching

```typescript
const github = GitHub({
  token: process.env.GITHUB_TOKEN,
  cache: {
    enabled: true,
    ttl: 300000 // 5 minutes
  }
})
```

### Rate Limiting

```typescript
const api = createApiFactoryEnhanced({
  baseUrl: 'https://api.github.com',
  rateLimiter: {
    maxRequests: 100,
    windowMs: 60000 // 1 minute
  }
})
```

## Configuration

All API clients support consistent configuration:

```typescript
const config = {
  // Authentication
  token: process.env.API_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  
  // Caching
  cache: {
    enabled: true,
    ttl: 300000 // 5 minutes
  },
  
  // Rate limiting
  rateLimiter: {
    maxRequests: 100,
    windowMs: 60000
  },
  
  // Error handling
  useResult: true, // Enable TResult pattern
  
  // Request settings
  timeout: 30000,
  retries: 3
}
```

## TypeScript Support

Fync is built with TypeScript and provides comprehensive type definitions:

```typescript
import type { 
  TGitHubUser, 
  TGitHubRepository,
  TSpotifyTrack,
  TSpotifyPlaylist,
  TNpmPackage
} from '@remcostoeten/fync'

// All responses are fully typed
const user: TGitHubUser = await github.user('octocat').get()
const track: TSpotifyTrack = await spotify.search.tracks('query')
```

## Security

Never hardcode API tokens in your source code. Always use environment variables:

```bash
# .env file
GITHUB_TOKEN=ghp_your_token_here
SPOTIFY_ACCESS_TOKEN=your_spotify_token
GOOGLE_ACCESS_TOKEN=your_google_token
VERCEL_TOKEN=your_vercel_token
```

```typescript
// Load environment variables
import 'dotenv/config'

const github = GitHub({
  token: process.env.GITHUB_TOKEN
})
```

For detailed security guidelines, see [SECURITY.md](./SECURITY.md).

## Requirements

- Node.js 18+
- TypeScript 5.0+ (for development)

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests to our [GitHub repository](https://github.com/remcostoeten/fync).
