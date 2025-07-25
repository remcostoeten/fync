# Fync API Documentation

Complete API reference with usage examples for all Fync library methods.

## Quick Links

- [📋 Complete API Reference](../API_METHODS.md) - All methods in one document
- [🐙 GitHub API](./github-api.md) - GitHub integration methods
- [🎵 Spotify API](./spotify-api.md) - Spotify Web API methods  
- [📦 NPM API](./npm-api.md) - NPM Registry API methods
- [📅 Google Calendar API](./google-calendar-api.md) - Google Calendar integration

## API Overview

### GitHub API (48+ methods)
Access GitHub users, repositories, organizations, issues, pull requests, actions, and more.

```typescript
import { GitHub } from '@remcostoeten/fync/github';

const github = GitHub({ token: process.env.GITHUB_TOKEN });
const user = await github.user('octocat').get();
const repo = await github.repo('facebook', 'react').get();
```

### Spotify API (25+ methods)
Control Spotify playback, manage playlists, search content, and access user library.

```typescript
import { Spotify } from '@remcostoeten/fync/spotify';

const spotify = Spotify({ token: process.env.SPOTIFY_ACCESS_TOKEN });
await spotify.player.play({ uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'] });
const tracks = await spotify.search.tracks('bohemian rhapsody');
```

### NPM API (30+ methods)
Query NPM packages, download statistics, user profiles, and advanced package analysis.

```typescript
import { NPM } from '@remcostoeten/fync/npm';

const npm = NPM({ cache: true });
const packageInfo = await npm.package('react').get();
const downloads = await npm.downloads.package('react', 'last-week');
```

### Google Calendar API (12 methods)
Manage calendars, events, schedule conflicts, and availability checking.

```typescript
import { createCalendarService } from '@remcostoeten/fync/google-calendar';

const calendar = createCalendarService({ accessToken: process.env.GOOGLE_ACCESS_TOKEN });
const events = await calendar.getTodaysEvents('primary');
const upcoming = await calendar.getUpcomingEvents('primary', 10);
```

## Documentation Structure

Each API documentation file includes:

- **Client Configuration** - Setup and initialization
- **Core Methods** - Main API entry points
- **Detailed Methods** - All available operations with parameters
- **Usage Examples** - Real-world implementation patterns
- **Advanced Examples** - Complex use cases and integrations

## Code Style

All examples follow the project's functional programming guidelines:

- ✅ Named `function` declarations only
- ✅ `type` declarations (no `interface`)
- ✅ Pure functions without side effects
- ✅ Named exports (no default exports except pages/views)
- ✅ Self-explanatory code without comments
- ✅ Immutable data patterns

## Getting Started

1. Choose your API from the links above
2. Copy the client configuration example
3. Browse the method you need
4. Copy the usage example
5. Adapt to your use case

Each method includes:
- Method signature
- Parameter types
- Return types
- Working code example
- Common use patterns
