# @fync/fync

> GitHub API client with chainable, fluent interface

A modern, TypeScript-first GitHub API client that provides a fluent, chainable interface for interacting with GitHub's REST API.

## Installation

```bash
npm install @fync/fync
```

## Basic Usage

```typescript
import { GitHub } from '@fync/fync'

// Create a client (optionally with a token)
const github = GitHub({ token: 'your-github-token' })

// Get user information
const user = await github.user('octocat').get()

// Get user's repositories
const repos = await github.user('octocat').repos.get()

// Get only user's gists
const gists = await github.user('octocat').gists.get()
```

## Features

- **Fluent, chainable API** - Access any API endpoint with intuitive method chaining
- **Built-in caching** - Avoid rate limits with automatic request caching
- **TypeScript support** - Full type safety and IntelliSense
- **Pagination handling** - Easy pagination with `paginate()` and `stream()` methods
- **Token authentication** - Support for private repositories
- **Framework agnostic** - Works with any JavaScript environment

## Documentation

For complete documentation and examples, see the [main fync repository](https://github.com/remcostoeten/fync).

## License

MIT
