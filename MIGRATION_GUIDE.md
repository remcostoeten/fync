# Fync Architecture Migration Guide

## Overview

This guide documents the migration from the old chainable proxy-based architecture to the new unified functional architecture. The new architecture dramatically simplifies adding new APIs while providing rich functionality for end users.

## Architecture Comparison

### Old Architecture (Before Migration)
- **517+ lines** per API implementation
- Custom chainable client for each service
- Heavy use of arrow functions (500+ occurrences)
- Complex nested proxy patterns
- Each API had unique implementation patterns
- Difficult to add new APIs (required deep understanding)

### New Architecture (After Migration)
- **~100-200 lines** per API implementation (with rich convenience methods)
- Unified core functions shared by all APIs
- Pure function declarations (no arrow functions)
- Declarative resource definitions
- Copy-paste consistency between APIs
- Easy to add new APIs (follow the pattern)

## Key Improvements

### 1. Unified Core Functions

```typescript
// New core functions that power all APIs
createFyncApi()      // Initialize any API client
createFyncResource() // Define API resources declaratively
createFyncModule()   // Compose resources into modules
createApiBuilder()   // Helper for creating API-specific builders
```

### 2. Declarative Resource Definition

```typescript
// Old way: Complex imperative code
const repoBase = client.repos[owner][repo];
return {
  get: () => repoBase.get(),
  branches: repoBase.branches,
  // ... 50+ lines of nested definitions
};

// New way: Declarative resource definition
const repoResource = defineResource({
  name: "repos",
  basePath: "/repos",
  methods: {
    getRepo: { path: "/{owner}/{repo}" },
    getRepoBranches: { path: "/{owner}/{repo}/branches" },
    // ... simple path definitions
  },
});
```

### 3. Consistent API Pattern

Every API now follows the exact same pattern:

```typescript
// 1. Define resources
const resources = {
  users: userResource,
  repos: repoResource,
  // ...
};

// 2. Create builder
const buildAPI = createApiBuilder({
  baseUrl: "https://api.example.com",
  auth: { type: "bearer" },
});

// 3. Export with convenience methods
export function APIName(config) {
  const base = buildAPI(config, resources);
  // Add convenience methods for better UX
  return base;
}
```

## Usage Examples

### GitHub API

```typescript
import { GitHub } from '@remcostoeten/fync/github';

const github = GitHub({ token: 'your-token' });

// Rich convenience methods
const user = await github.getUser('remcostoeten');
const repo = await github.getRepository('remcostoeten', 'fync');
const repoFromUrl = await github.getRepositoryFromUrl('https://github.com/remcostoeten/fync');
const commits = await github.getUserCommitsInTimeframe('remcostoeten', '1Y');
const stars = await github.getRepositoryStars('remcostoeten', 'fync');
const stats = await github.getUserStats('remcostoeten');

// Direct resource access for advanced use
const issues = await github.repos.getRepoIssues({
  owner: 'facebook',
  repo: 'react',
  state: 'open',
});
```

### NPM API

```typescript
import { NPM } from '@remcostoeten/fync/npm';

const npm = NPM();

// Package operations
const pkg = await npm.getPackage('react');
const size = await npm.getPackageSize('react');
const downloads = await npm.getPackageDownloads('react', 'last-month');
const stats = await npm.getPackageStats('react');
const isDeprecated = await npm.isPackageDeprecated('old-package');

// Search
const results = await npm.searchPackages('react hooks', {
  size: 20,
  quality: 0.8,
});
```

### Spotify API

```typescript
import { Spotify } from '@remcostoeten/fync/spotify';

const spotify = Spotify({ token: 'your-token' });

// Music operations
const track = await spotify.getTrack('track-id');
const topTracks = await spotify.getMyTopTracks({ timeRange: 'short_term' });
const audioFeatures = await spotify.getAudioFeatures('track-id');

// Playback control
await spotify.playTrack('spotify:track:id');
await spotify.pausePlayback();
await spotify.skipToNext();

// Playlist management
const playlist = await spotify.createPlaylist('user-id', 'My Playlist', {
  description: 'Created with Fync!',
  public: true,
});
```

## Adding a New API

With the new architecture, adding a new API is straightforward:

### Step 1: Define Resources (~20 lines)

```typescript
const customerResource = defineResource({
  name: "customers",
  basePath: "/v1/customers",
  methods: {
    listCustomers: { path: "" },
    getCustomer: { path: "/{customerId}" },
    createCustomer: { path: "", method: "POST" },
    updateCustomer: { path: "/{customerId}", method: "POST" },
    deleteCustomer: { path: "/{customerId}", method: "DELETE" },
  },
});
```

### Step 2: Create API Builder (~10 lines)

```typescript
const buildStripe = createApiBuilder({
  baseUrl: "https://api.stripe.com",
  auth: { type: "bearer" },
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Step 3: Export with Convenience Methods (~30 lines)

```typescript
export function Stripe(config: { token: string }) {
  const base = buildStripe(config, { customers: customerResource });
  
  // Add convenience methods for better UX
  const stripe = base as TStripeModule;
  
  stripe.getCustomer = function(customerId: string) {
    return base.customers.getCustomer({ customerId });
  };
  
  stripe.createCustomer = function(data: any) {
    return base.customers.createCustomer(data);
  };
  
  return stripe;
}
```

That's it! A new API added in ~60 lines of code.

## Migration Checklist

- [x] Core unified functions implemented
- [x] GitHub API migrated to new pattern
- [x] NPM API migrated to new pattern
- [x] Spotify API migrated to new pattern
- [x] Vercel API created as demonstration
- [x] All function declarations (no arrow functions)
- [x] All types use `type` (not `interface`)
- [x] All types prefixed with `T`
- [x] Named exports only
- [x] Rich convenience methods for end users
- [x] Direct resource access for power users
- [x] Comprehensive usage examples

## Benefits for End Users

1. **Consistent API**: All APIs work the same way
2. **Rich Convenience Methods**: Easy-to-use methods for common operations
3. **Multiple Syntax Options**: Flexibility in how to call methods
4. **Direct Resource Access**: Power users can access raw resources
5. **Type Safety**: Full TypeScript support with proper types
6. **Predictable Behavior**: Pure functions with no side effects

## Benefits for Developers

1. **Easy to Add APIs**: Follow the pattern, ~60-100 lines per API
2. **Maintainable**: Shared core functions reduce duplication
3. **Testable**: Pure functions are easy to test
4. **Extensible**: Easy to add new methods to existing APIs
5. **Consistent**: All APIs follow the same pattern
6. **No Arrow Functions**: Follows functional programming best practices

## Code Style Compliance

The new architecture strictly follows the functional programming rules:

- ✅ Only `function` declarations (no arrow functions)
- ✅ Named exports only (no default exports)
- ✅ Types use `type` keyword (not `interface`)
- ✅ All types prefixed with `T`
- ✅ Pure functions (no side effects)
- ✅ No classes, `this`, `new`, or OOP patterns
- ✅ Self-documenting code (no comments needed)

## Next Steps

1. Complete migration of remaining services (Google Drive, Google Calendar)
2. Remove old implementations once new ones are stable
3. Update all documentation to reflect new patterns
4. Add comprehensive tests for core functions
5. Publish new major version (4.0.0) with migration guide
