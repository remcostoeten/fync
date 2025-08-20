# @remcostoeten/fync

[![npm version](https://badge.fury.io/js/@remcostoeten%2Ffync.svg)](https://badge.fury.io/js/@remcostoeten%2Ffync)
[![npm downloads](https://img.shields.io/npm/dm/@remcostoeten/fync.svg)](https://www.npmjs.com/package/@remcostoeten/fync)
[![GitHub license](https://img.shields.io/github/license/remcostoeten/fync.svg)](https://github.com/remcostoeten/fync/blob/main/LICENSE)

A unified TypeScript library for easy access to popular APIs (GitHub, GitLab, Spotify, NPM, Google Calendar, etc.)

## Installation

```bash
npm install @remcostoeten/fync
```

## Usage

Which allows us to use the methods like so:

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

### GitLab API

```typescript
import { GitLab } from '@remcostoeten/fync/gitlab'

// Use environment variables for security
const gitlab = GitLab({
  token: process.env.GITLAB_TOKEN // Get from GitLab settings > Access tokens
})

// Get user info
const user = await gitlab.getUser('remcostoeten')

// Get current authenticated user
const me = await gitlab.getCurrentUser()

// Get project details
const project = await gitlab.getProject('gitlab-org/gitlab')

// Get project from URL
const projectFromUrl = await gitlab.getProjectFromUrl('https://gitlab.com/gitlab-org/gitlab')

// Get project issues
const issues = await gitlab.projects.getProjectIssues({ id: '278964' })

// Get a specific issue
const issue = await gitlab.projects.getProjectIssue({ 
  id: '278964', 
  issue_iid: '1' 
})

// Get merge requests
const mergeRequests = await gitlab.projects.getProjectMergeRequests({ id: '278964' })

// Get pipelines
const pipelines = await gitlab.projects.getProjectPipelines({ id: '278964' })

// Search projects
const searchResults = await gitlab.searchProjects('react', {
  order_by: 'stars',
  sort: 'desc'
})

// Get group details
const group = await gitlab.getGroup('gitlab-org')

// Get user statistics
const stats = await gitlab.getUserStats('remcostoeten')
console.log(`Total projects: ${stats.totalProjects}, Total stars: ${stats.totalStars}`)

// Get user's recent commits
const commits = await gitlab.getUserCommits('remcostoeten')
const latestCommit = await gitlab.getUserLatestCommit('remcostoeten')
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

### Google Calendar API

```typescript
import { createCalendarService } from '@remcostoeten/fync/google-calendar'

// Use environment variables for security
const calendar = createCalendarService({
  accessToken: process.env.GOOGLE_ACCESS_TOKEN // Get from Google OAuth 2.0 flow
})

// Get user's calendars
const calendars = await calendar.getCalendars()

// Get today's events
const todaysEvents = await calendar.getTodaysEvents('primary')

// Get upcoming events
const upcomingEvents = await calendar.getUpcomingEvents('primary', 10)

// Get events in date range
const startDate = new Date('2024-01-01')
const endDate = new Date('2024-01-31')
const eventsInRange = await calendar.getEventsInDateRange('primary', startDate, endDate)

// Search for events
const meetingEvents = await calendar.searchEvents('meeting', 'primary')

// Check if time slot is busy
const startTime = new Date('2024-01-15T10:00:00Z')
const endTime = new Date('2024-01-15T11:00:00Z')
const isBusy = await calendar.isTimeSlotBusy('primary', startTime, endTime)

// Get events from all calendars
const allEvents = await calendar.getAllCalendarEvents(100)

// Get calendar colors
const colors = await calendar.getColors()
```

## 📚 Complete Documentation

For comprehensive API documentation with all methods and usage examples, see:
- [**📋 Complete API Reference**](./API_METHODS.md) - All 115+ methods in one document
- [**📖 Detailed API Docs**](./docs/README.md) - Individual API documentation with examples

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

### GitLab

The GitLab client provides access to:
- **User and group information** - Get profiles, followers, following, group memberships
- **Project management** - Get projects, branches, commits, contributors, languages
- **Issues and merge requests** - Create, read, update issues and MRs
- **Search functionality** - Search projects, users, issues, merge requests, code
- **CI/CD pipelines** - Get pipeline runs, jobs, variables, environments
- **Releases and tags** - Manage releases and version tags
- **Snippets** - Create and manage code snippets
- **Groups and subgroups** - Manage group hierarchies and permissions
- **Personal access** - Get starred projects, todos, SSH keys
- **Activity tracking** - Get user events and project activity

### NPM Registry

The NPM client provides access to:
- **Package information** - Get package metadata, versions, dependencies
- **Version details** - Get specific version info, latest version, all versions
- **Search functionality** - Search packages with quality, popularity, and maintenance scores
- **Download statistics** - Get download counts for packages over different time periods
- **Trend analysis** - Compare package popularity and track download trends
- **Registry data** - Access to full NPM registry API (no authentication required)

### Google Calendar

The Google Calendar client provides access to:
- **Calendar management** - Get user calendars and calendar metadata
- **Event operations** - Get, search, and filter calendar events
- **Date range queries** - Get events within specific time periods
- **Availability checking** - Check if time slots are busy or free
- **Multi-calendar support** - Work with multiple calendars simultaneously
- **Free/busy queries** - Check availability across calendars
- **Color customization** - Get available calendar and event colors

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
   GOOGLE_ACCESS_TOKEN=your_google_oauth_access_token
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
