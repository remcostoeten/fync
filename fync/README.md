# @remcostoeten/fync

[![npm version](https://badge.fury.io/js/@remcostoeten%2Ffync.svg)](https://badge.fury.io/js/@remcostoeten%2Ffync)
[![npm downloads](https://img.shields.io/npm/dm/@remcostoeten/fync.svg)](https://www.npmjs.com/package/@remcostoeten/fync)
[![GitHub license](https://img.shields.io/github/license/remcostoeten/fync.svg)](https://github.com/remcostoeten/fync/blob/main/LICENSE)

A unified TypeScript library for easy access to popular APIs (GitHub, Spotify, GitLab, etc.)

## Installation

```bash
npm install @remcostoeten/fync
```

## Usage

### Spotify API

```typescript
import { Spotify } from '@remcostoeten/fync/spotify'

// Use environment variables for security
const spotify = Spotify({
  token: process.env.SPOTIFY_ACCESS_TOKEN // Get from Spotify OAuth 2.0 flow
})

// Get current user profile
const user = await spotify.me.get()

// Search for tracks
const trackResults = await spotify.search.tracks('bohemian rhapsody')

// Get user's playlists
const playlists = await spotify.me.playlists.get()

// Get user's saved tracks
const savedTracks = await spotify.me.tracks.get()

// Control playback
await spotify.player.play({ uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'] })
await spotify.player.pause()
await spotify.player.next()

// Get currently playing track
const nowPlaying = await spotify.player.currentlyPlaying()

// Add tracks to a playlist
const playlist = spotify.playlist('playlist-id')
await playlist.tracks.add(['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'])
```

### GitHub API

```typescript
import { GitHub } from '@remcostoeten/fync/github'

// Use environment variables for security
const github = GitHub({
  token: process.env.GITHUB_TOKEN // Get from GitHub settings > Developer settings > Personal access tokens
})

// Get user info
const user = await github.user('octocat').get()

// Get current authenticated user
const me = await github.me.get()

// Get repository details
const repo = await github.repo('facebook', 'react').get()

// Get repository issues
const issues = await github.repo('facebook', 'react').getIssues()

// Get a specific issue
const issue = await github.repo('facebook', 'react').getIssue(1)

// Get releases
const releases = await github.repo('facebook', 'react').getReleases()
const latestRelease = await github.repo('facebook', 'react').getLatestRelease()

// Search repositories
const searchResults = await github.search.repositories('react')

// Search users
const users = await github.search.users('octocat')

// Get rate limit info
const rateLimit = await github.rateLimit.get()

// Get notifications
const notifications = await github.notifications.get()
```

### NPM Registry API

```typescript
import { NPM } from '@remcostoeten/fync/npm'

// No authentication required - public API
const npm = NPM({
  cache: true,
  cacheTTL: 300000 // 5 minutes
})

// Get package information
const packageInfo = await npm.package('react').get()

// Get latest version details
const latestVersion = await npm.package('react').latest()

// Get specific version
const specificVersion = await npm.package('react').version('18.0.0').get()

// Search packages
const searchResults = await npm.search.packages('typescript', {
  size: 10,
  quality: 0.8
})

// Get download statistics
const weeklyDownloads = await npm.downloads.package('react', 'last-week')

// Compare multiple packages
const frameworkStats = await npm.downloads.packages([
  'react', 'vue', 'angular', 'svelte'
], 'last-month')

// Get download trends over time
const downloadTrend = await npm.downloads.range('react', '2024-01-01', '2024-01-31')

// Direct chainable API access
const customQuery = await npm.api['@types']['node'].get()
```

## API Reference

### Spotify

The Spotify client provides access to:
- **User profile and library** - Get user info, saved tracks, albums, playlists
- **Player controls** - Play, pause, skip, queue tracks
- **Playlists management** - Create, modify, and manage playlists
- **Search functionality** - Search tracks, artists, albums, playlists
- **Recently played** - Get listening history
- **Audio features** - Get detailed audio analysis

### GitHub

The GitHub client provides access to:
- **User and organization information** - Get profiles, followers, following
- **Repository management** - Get repos, branches, commits, contributors
- **Issues and pull requests** - Create, read, update issues and PRs
- **Search functionality** - Search repositories, users, issues, code
- **Actions and workflows** - Get workflow runs, jobs, secrets
- **Releases and tags** - Manage releases and version tags
- **Notifications** - Get and manage notifications
- **Rate limiting** - Check API rate limit status

### NPM Registry

The NPM client provides access to:
- **Package information** - Get package metadata, versions, dependencies
- **Version details** - Get specific version info, latest version, all versions
- **Search functionality** - Search packages with quality, popularity, and maintenance scores
- **Download statistics** - Get download counts for packages over different time periods
- **Trend analysis** - Compare package popularity and track download trends
- **Registry data** - Access to full NPM registry API (no authentication required)

## Configuration

Both clients support configuration options for:
- API tokens
- Base URLs
- Caching settings
- Request timeouts

## Security

⚠️ **Important**: Never hardcode API tokens in your source code or commit them to version control.

### Setup Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your API tokens to `.env`:
   ```env
   GITHUB_TOKEN=ghp_your_github_personal_access_token
   SPOTIFY_ACCESS_TOKEN=your_spotify_access_token
   ```

3. Load environment variables in your application:
   ```typescript
   import 'dotenv/config' // Add this at the top of your main file
   ```

For detailed security guidelines, see [SECURITY.md](./SECURITY.md).

## License

MIT

## Contributing

Contributions are welcome! Please see the [GitHub repository](https://github.com/remcostoeten/fync) for more information.
