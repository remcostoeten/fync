# @deify/deify

> GitHub API client with chainable, fluent interface (formerly gheasy)

A modern, TypeScript-first GitHub API client that provides a fluent, chainable interface for interacting with GitHub's REST API.

## Installation

```bash
npm install @deify/deify
```

## Basic Usage

```typescript
import { GitHub } from '@deify/deify'

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

## Migration from gheasy

This package is the successor to `gheasy`. To migrate:

1. Update your imports:
   ```typescript
   // Old
   import { GitHub } from 'gheasy'
   
   // New
   import { GitHub } from '@deify/deify'
   ```

2. Update your package.json:
   ```bash
   npm uninstall gheasy
   npm install @deify/deify
   ```

All existing APIs remain the same, so no code changes are needed beyond updating imports.

## Documentation

For complete documentation, see the [main deify repository](https://github.com/remcostoeten/github-easy-fetcher).

## License

MIT
