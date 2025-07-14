# Fync

![npm](https://img.shields.io/npm/v/@remcostoeten/fync-github)
![GitHub](https://img.shields.io/github/license/remcostoeten/fync)

_A unified platform for fetching data from popular APIs_

Fync is a modern monorepo that provides easy-to-use, chainable API clients for popular services like GitHub, GitLab, and more. Built with TypeScript and designed for developer productivity.

## Packages

- **[@remcostoeten/fync-core](./core/)** - Core functionality and utilities
- **[@remcostoeten/fync-github](./packages/github/)** - GitHub API client with OAuth2 support

## Features

- **Fluent, chainable API** - Access any GitHub API endpoint with intuitive method chaining
- **Comprehensive TypeScript support** - Full type safety with excellent LSP support
- **OAuth2 authentication** - Complete OAuth2 flow with Next.js integration
- **Built-in caching** - Avoid rate limits with automatic request caching
- **Advanced GitHub API coverage** - Pull requests, releases, actions, issues, and more
- **Pagination handling** - Easy pagination with `paginate()` and `stream()` methods
- **Rate limiting** - Built-in rate limit monitoring and handling
- **Framework agnostic** - Works with any JavaScript environment
- **Monorepo structure** - Modular packages for different services

## Installation

```bash
npm install @remcostoeten/fync-github
```

## Basic Usage

```typescript
import { GitHub } from '@remcostoeten/fync-github'

// Create a client (optionally with a token)
const github = GitHub({ token: 'your-github-token' })

// Get user information
const user = await github.user('octocat').get()

// Get user's repositories
const repos = await github.user('octocat').repos.get()

// Get pull requests with full typing
const pulls = await github.repo('facebook', 'react').getPulls()

// Get releases with comprehensive types
const releases = await github.repo('facebook', 'react').getReleases()
```

## Chainable API

Access any GitHub API endpoint by chaining properties:

```typescript
// Get repository branches
const branches = await github.repo('facebook', 'react').branches.get()

// Get specific branch
const mainBranch = await github.repo('facebook', 'react').branches.main.get()

// Get commits from a repository
const commits = await github.repo('facebook', 'react').commits.get()

// Get a specific file from a repository
const packageJson = await github
  .repo('facebook', 'react')
  .contents('package.json')
  .get()
```

## Direct API Access

For complete flexibility, use the raw API client:

```typescript
// Access any endpoint directly
const data = await github.api.repos.facebook.react.issues.get()

// With parameters
const closedIssues = await github.api.repos.facebook.react.issues.get({
  params: { state: 'closed', per_page: 100 }
})

// Access nested endpoints
const reactions = await github
  .api
  .repos
  .owner
  .repo
  .issues
  .comments
  ['123']
  .reactions
  .get()
```

## Pagination

Handle paginated results easily:

```typescript
// Get all pages at once
const allRepos = await github.user('octocat').repos.get({ allPages: true })

// Or stream results
const repoStream = github.user('octocat').repos.stream()
for await (const repo of repoStream) {
  console.log(repo.name)
}
```

## Search

Use the built-in search methods:

```typescript
// Search repositories
const results = await github.search.repositories('react', {
  params: { sort: 'stars', order: 'desc' }
})

// Search users
const users = await github.search.users('john', {
  params: { per_page: 50 }
})
```

## Authenticated User

Access the authenticated user's data:

```typescript
const github = GitHub({ token: 'your-token' })

// Get current user
const me = await github.me.get()

// Get current user's repositories
const myRepos = await github.me.repos.get()
```

## Caching

Caching is enabled by default. Configure it per-client or per-request:

```typescript
// Disable cache for client
const github = GitHub({ cache: false })

// Disable cache for specific request
const data = await github.user('octocat').get({ cache: false })

// Custom cache TTL (in milliseconds)
const github = GitHub({ cacheTTL: 600000 }) // 10 minutes
```

## Advanced Examples

```typescript
// Get all commits from the last week
const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - 7)

const recentCommits = await github
  .repo('facebook', 'react')
  .commits
  .get({
    params: {
      since: lastWeek.toISOString(),
      per_page: 100
    },
    allPages: true
  })

// Get repository contributors
const contributors = await github
  .repo('facebook', 'react')
  .contributors
  .get()

// Get issues with specific labels
const bugs = await github
  .repo('facebook', 'react')
  .issues
  .get({
    params: {
      labels: 'bug',
      state: 'open'
    }
  })

// Get organization members
const members = await github.org('facebook').members.get()

// Get gist details
const gist = await github.gist('gist-id').get()

// Star a gist
await github.api.gists['gist-id'].star.put()
```

## API Reference

### `GitHub(config?)`

Creates a new GitHub client.

**Config options:**
- `token` - GitHub personal access token
- `baseUrl` - Custom API base URL (default: 'https://api.github.com')
- `cache` - Enable/disable caching (default: true)
- `cacheTTL` - Cache time-to-live in milliseconds (default: 300000)

### Request Options

All `get()`, `post()`, `put()`, `patch()`, and `delete()` methods accept options:

- `params` - Query parameters
- `cache` - Override cache setting for this request
- `cacheTTL` - Override cache TTL for this request
- `paginate` - Return paginated results
- `allPages` - Fetch all pages automatically

### Method Reference

- `.get(options?)` - GET request
- `.post(data, options?)` - POST request
- `.put(data, options?)` - PUT request
- `.patch(data, options?)` - PATCH request
- `.delete(options?)` - DELETE request
- `.paginate(options?)` - GET with pagination
- `.stream(options?)` - Stream paginated results
- `.path()` - Get the current API path

## OAuth2 Authentication

Fync provides comprehensive OAuth2 support for GitHub authentication:

```typescript
import { createGitHubOAuth2Flow, GITHUB_OAUTH2_SCOPES } from '@remcostoeten/fync-github/oauth'

// Create OAuth2 flow
const oauth2 = createGitHubOAuth2Flow({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/api/auth/callback',
  scopes: [GITHUB_OAUTH2_SCOPES.USER_EMAIL, GITHUB_OAUTH2_SCOPES.REPO_READ],
})

// Generate authorization URL
const authUrl = oauth2.getAuthorizationUrl({ state: 'secure-state' })

// Exchange code for token
const tokens = await oauth2.exchangeCodeForToken({ code, state })

// Use token with GitHub client
const github = GitHub({ token: tokens.access_token })
```

### Next.js Integration

```typescript
import { createNextJSAPIHandler } from '@remcostoeten/fync-github/oauth'

// pages/api/auth/[...oauth].ts
export default createNextJSAPIHandler({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/api/auth/callback',
  onSuccess: async (tokens) => {
    // Handle successful authentication
    return NextResponse.redirect('/dashboard')
  },
})
```

## Migration from gheasy

The `gheasy` package has been restructured as `@remcostoeten/fync-github`:

1. Update your imports:
   ```typescript
   // Old
   import { GitHub } from 'gheasy'
   
   // New
   import { GitHub } from '@remcostoeten/fync-github'
   ```

2. Update your package.json:
   ```bash
   npm uninstall gheasy
   npm install @remcostoeten/fync-github
   ```

All existing APIs remain the same, with many new features added.

---

remco stoeten
