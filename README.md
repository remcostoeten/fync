# GitHub Easy Fetcher

![npm](https://img.shields.io/npm/v/gheasy)
![GitHub](https://img.shields.io/github/license/remcostoeten/github-easy-fetcher)

_Because i'm tired of writing the same querys over and over._

A flexible, chainable GitHub API client for JavaScript/TypeScript that makes it easy to fetch any GitHub data.

## Features

- **Fluent, chainable API** - Access any GitHub endpoint with intuitive method chaining
- **Built-in caching** - Avoid rate limits with automatic request caching
- **TypeScript support** - Full type safety and IntelliSense
- **Pagination handling** - Easy pagination with `paginate()` and `stream()` methods
- **Token authentication** - Support for private repositories
- **Framework agnostic** - Works with any JavaScript environment

## Installation

```bash
npm install gheasy
```

## Basic Usage

```typescript
import { GitHub } from 'gheasy'

// Create a client (optionally with a token)
const github = GitHub({ token: 'your-github-token' })

// Get user information
const user = await github.user('octocat').get()

// Get user's repositories
const repos = await github.user('octocat').repos.get()

// Get only user's gists
const gists = await github.user('octocat').gists.get()
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

## Legacy API

The package still supports the original filtering API:

```typescript
import { fetchUser, fetchRepositories, filterRepositoriesByLanguage } from 'gheasy'

const user = await fetchUser('octocat')
const repos = await fetchRepositories('octocat')
const jsRepos = filterRepositoriesByLanguage(repos, 'JavaScript')
```
xxx

remco stoeten
