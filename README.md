# @remcostoeten/fync

A unified TypeScript library for easy access to popular APIs (GitHub, Spotify, GitLab, etc.)

## Installation

```bash
npm install @remcostoeten/fync
```

## Usage

### Core API Access

```typescript
import { createCore } from '@remcostoeten/fync'

const core = createCore()
```

### Spotify API

```typescript
import { Spotify } from '@remcostoeten/fync/spotify'

const spotify = Spotify({
  token: 'your-spotify-token'
})

// Get current user
const user = await spotify.me.get()

// Search for tracks
const results = await spotify.search.tracks('your query')

// Get playlists
const playlists = await spotify.me.playlists.get()
```

### GitHub API

```typescript
import { GitHub } from '@remcostoeten/fync/github'

const github = GitHub({
  token: 'your-github-token'
})

// Get user info
const user = await github.user('username').get()

// Get repository
const repo = await github.repo('owner', 'repo').get()

// Search repositories
const repos = await github.search.repositories('query')
```

## API Reference

### Spotify

The Spotify client provides access to:
- User profile and library
- Player controls
- Playlists management
- Search functionality
- Album and track information

### GitHub

The GitHub client provides access to:
- User and organization information
- Repository management
- Issues and pull requests
- Search functionality
- Actions and workflows

### Core

Shared utilities for:
- HTTP client
- Caching
- Response handling
- Pagination

## Configuration

Both clients support configuration options for:
- API tokens
- Base URLs
- Caching settings
- Request timeouts

## License

MIT

## Contributing

Contributions are welcome! Please see the [GitHub repository](https://github.com/remcostoeten/fync) for more information.
