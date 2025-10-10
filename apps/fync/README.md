# @remcostoeten/fync

[![npm version](https://badge.fury.io/js/@remcostoeten%2Ffync.svg)](https://badge.fury.io/js/@remcostoeten%2Ffync)
[![npm downloads](https://img.shields.io/npm/dm/@remcostoeten/fync.svg)](https://www.npmjs.com/package/@remcostoeten/fync)
[![GitHub license](https://img.shields.io/github/license/remcostoeten/fync.svg)](https://github.com/remcostoeten/fync/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)

A unified TypeScript library providing consistent, functional interfaces for 9 popular APIs. Built with a single architecture pattern for predictable, maintainable integrations.

## ✨ Features

- 🎯 **Unified Architecture**: Same patterns across all 9 API integrations
- 🔒 **TypeScript First**: 100% type-safe with comprehensive definitions
- 🌲 **Tree-Shakeable**: Import only what you need
- 📦 **Zero Dependencies**: Lightweight with only `undici` for HTTP
- 🔄 **Dual Package**: Full ESM and CommonJS support
- 🎨 **Functional Design**: Pure functions, no classes, predictable behavior
- 🚀 **Modern**: Built for Node.js 18+ and modern bundlers

## 📚 Supported APIs

| API | Status | Description |
|-----|--------|-------------|
| **GitHub** | ✅ Stable | Repositories, users, issues, PRs, actions, gists |
| **GitLab** | ✅ Stable | Projects, merge requests, pipelines, users |
| **Spotify** | ✅ Stable | Music, playlists, playback control, search |
| **Discord** | ✅ Stable | Servers, channels, messages, webhooks |
| **Notion** | ✅ Stable | Pages, databases, blocks, search, users |
| **NPM Registry** | ✅ Stable | Packages, versions, downloads, search |
| **Google Calendar** | ✅ Stable | Events, calendars, scheduling |
| **Google Drive** | ✅ Stable | Files, folders, sharing, permissions |
| **Vercel** | ✅ Stable | Projects, deployments, domains, analytics |

## 📦 Installation

```bash
npm install @remcostoeten/fync
# or
yarn add @remcostoeten/fync
# or
pnpm add @remcostoeten/fync
```

## 🚀 Quick Start

Every API follows the same pattern:

```typescript
import { GitHub, Spotify, Notion } from '@remcostoeten/fync'

// Initialize with token
const github = GitHub({ token: 'ghp_...' })
const spotify = Spotify({ token: 'BQD...' })
const notion = Notion({ token: 'secret_...' })

// Use consistent methods
const user = await github.getUser('octocat')
const track = await spotify.getTrack('4iV5W9uYEdYUVa79Axb7Rh')
const page = await notion.getPage('page-id')
```

## 📖 API Examples

### GitHub
```typescript
import { GitHub } from '@remcostoeten/fync/github'

const github = GitHub({ token: process.env.GITHUB_TOKEN })

// User operations
const user = await github.getUser('octocat')
const repos = await github.getUserRepos('octocat')
const commits = await github.getUserCommits('octocat')

// Repository operations
const repo = await github.getRepository('facebook', 'react')
const issues = await github.repos.listIssues({ owner: 'facebook', repo: 'react' })
const prs = await github.pulls.list({ owner: 'facebook', repo: 'react' })

// Search
const results = await github.searchRepositories('typescript stars:>10000')
```

### Spotify
```typescript
import { Spotify } from '@remcostoeten/fync/spotify'

const spotify = Spotify({ token: process.env.SPOTIFY_TOKEN })

// Music data
const track = await spotify.getTrack('4iV5W9uYEdYUVa79Axb7Rh')
const album = await spotify.getAlbum('album-id')
const artist = await spotify.getArtist('artist-id')
const playlist = await spotify.getPlaylist('playlist-id')

// User profile
const profile = await spotify.getCurrentUser()
const playlists = await spotify.getUserPlaylists()
const top = await spotify.getMyTopTracks()

// Playback control
await spotify.play({ uris: ['spotify:track:...'] })
await spotify.pause()
await spotify.skipToNext()
const current = await spotify.getCurrentlyPlaying()

// Search
const tracks = await spotify.searchTracks('bohemian rhapsody')
const artists = await spotify.searchArtists('queen')
```

### Notion
```typescript
import { Notion } from '@remcostoeten/fync/notion'

const notion = Notion({ token: process.env.NOTION_TOKEN })

// Pages and databases
const page = await notion.getPage('page-id')
const database = await notion.getDatabase('database-id')
const results = await notion.queryDatabase('database-id', {
  filter: { property: 'Status', select: { equals: 'Done' } }
})

// Create content
const newPage = await notion.createPage({
  parent: { database_id: 'database-id' },
  properties: {
    Name: { title: [{ text: { content: 'New Page' } }] },
    Status: { select: { name: 'In Progress' } }
  }
})

// Blocks manipulation
const blocks = await notion.getBlockChildren('page-id')
await notion.appendBlockChildren('page-id', [
  { type: 'heading_1', heading_1: { rich_text: [{ text: { content: 'Title' } }] } },
  { type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'Content' } }] } }
])

// Search
const pages = await notion.searchPages('query')
const databases = await notion.searchDatabases('query')
```

### Discord
```typescript
import { Discord } from '@remcostoeten/fync/discord'

const discord = Discord({ token: process.env.DISCORD_TOKEN })

// Server operations
const guilds = await discord.guilds.list()
const guild = await discord.guilds.get({ guild_id: 'guild-id' })
const channels = await discord.guilds.getChannels({ guild_id: 'guild-id' })

// Channel operations
const channel = await discord.channels.get({ channel_id: 'channel-id' })
const messages = await discord.channels.getMessages({ channel_id: 'channel-id' })

// Send messages
await discord.channels.createMessage({
  channel_id: 'channel-id',
  content: 'Hello, Discord!',
  embeds: [{ title: 'Embed Title', description: 'Embed Description' }]
})

// Webhooks
await discord.webhooks.execute({
  webhook_id: 'webhook-id',
  token: 'webhook-token',
  content: 'Webhook message'
})
```

### NPM Registry
```typescript
import { NPM } from '@remcostoeten/fync/npm'

const npm = NPM({}) // No auth required for public registry

// Package info
const pkg = await npm.getPackage('react')
const version = await npm.getPackageVersion('react', '18.0.0')
const latest = await npm.getLatestVersion('react')

// Downloads stats
const downloads = await npm.getDownloads('react', 'last-week')
const stats = await npm.getPackageStats('react')

// Search
const results = await npm.searchPackages('typescript', { size: 10 })
```

### Google Calendar
```typescript
import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'

const calendar = GoogleCalendar({ token: process.env.GOOGLE_TOKEN })

// Calendar operations
const calendars = await calendar.calendars.list()
const cal = await calendar.calendars.get({ calendarId: 'primary' })

// Events
const events = await calendar.events.list({ calendarId: 'primary' })
const event = await calendar.events.get({ 
  calendarId: 'primary', 
  eventId: 'event-id' 
})

// Create event
const newEvent = await calendar.events.create({
  calendarId: 'primary',
  summary: 'Meeting',
  start: { dateTime: '2024-01-15T10:00:00Z' },
  end: { dateTime: '2024-01-15T11:00:00Z' }
})
```

### Google Drive
```typescript
import { GoogleDrive } from '@remcostoeten/fync/google-drive'

const drive = GoogleDrive({ token: process.env.GOOGLE_TOKEN })

// Files and folders
const files = await drive.files.list()
const file = await drive.files.get({ fileId: 'file-id' })
const metadata = await drive.files.getMetadata({ fileId: 'file-id' })

// Create folder
const folder = await drive.files.create({
  name: 'New Folder',
  mimeType: 'application/vnd.google-apps.folder'
})

// Permissions
const permissions = await drive.permissions.list({ fileId: 'file-id' })
await drive.permissions.create({
  fileId: 'file-id',
  type: 'user',
  role: 'reader',
  emailAddress: 'user@example.com'
})
```

### Vercel
```typescript
import { Vercel } from '@remcostoeten/fync/vercel'

const vercel = Vercel({ token: process.env.VERCEL_TOKEN })

// Projects
const projects = await vercel.projects.list()
const project = await vercel.projects.get({ projectId: 'project-id' })

// Deployments
const deployments = await vercel.deployments.list()
const deployment = await vercel.deployments.get({ deploymentId: 'dep-id' })

// Domains
const domains = await vercel.domains.list()
const domain = await vercel.domains.get({ domain: 'example.com' })
```

### GitLab
```typescript
import { GitLab } from '@remcostoeten/fync/gitlab'

const gitlab = GitLab({ token: process.env.GITLAB_TOKEN })

// Projects
const projects = await gitlab.projects.list()
const project = await gitlab.projects.get({ id: 'project-id' })

// Merge requests
const mrs = await gitlab.mergeRequests.list({ projectId: 'project-id' })
const mr = await gitlab.mergeRequests.get({ 
  projectId: 'project-id', 
  mergeRequestIid: 1 
})

// Pipelines
const pipelines = await gitlab.pipelines.list({ projectId: 'project-id' })
const pipeline = await gitlab.pipelines.get({ 
  projectId: 'project-id', 
  pipelineId: 123 
})
```

## 🏗️ Architecture

All APIs follow the same functional pattern:

```typescript
// 1. Define resources with consistent naming
const resource = defineResource({
  name: 'users',
  basePath: '/users',
  methods: {
    getUser: { path: '/{id}' },
    createUser: { path: '', method: 'POST' },
    updateUser: { path: '/{id}', method: 'PUT' },
    deleteUser: { path: '/{id}', method: 'DELETE' }
  }
})

// 2. Create API builder with configuration
const buildApi = createApiBuilder({
  baseUrl: 'https://api.example.com',
  auth: { type: 'bearer' },
  headers: { 'Content-Type': 'application/json' }
})

// 3. Export functional module
export function API(config: { token: string }) {
  const base = buildApi(config, resources)
  // Add convenience methods
  return base
}
```

## 🔧 Configuration

### Authentication Types

Each API supports appropriate authentication:

```typescript
// Bearer Token (GitHub, GitLab, Spotify, Discord, Notion, Vercel)
const api = API({ token: 'your-token' })

// OAuth2 (Google APIs)
const api = API({ token: 'access-token' })

// No Auth (NPM public registry)
const api = API({})
```

### Advanced Options

```typescript
const api = API({
  token: 'your-token',
  baseUrl: 'https://custom.api.com', // Override base URL
  timeout: 10000, // Request timeout in ms
  headers: { // Additional headers
    'X-Custom-Header': 'value'
  }
})
```

## 📦 Module Imports

Import only what you need for optimal bundle size:

```typescript
// Full library (not recommended for production)
import * as Fync from '@remcostoeten/fync'

// Specific APIs (recommended)
import { GitHub } from '@remcostoeten/fync/github'
import { Spotify } from '@remcostoeten/fync/spotify'
import { Notion } from '@remcostoeten/fync/notion'

// Core utilities
import { createApiBuilder, defineResource } from '@remcostoeten/fync/core'
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📄 License

MIT © [Remco Stoeten](https://github.com/remcostoeten)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@remcostoeten/fync)
- [GitHub Repository](https://github.com/remcostoeten/fync)
- [Issue Tracker](https://github.com/remcostoeten/fync/issues)
- [Author](https://github.com/remcostoeten)
