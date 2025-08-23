# Fync (@remcostoeten/fync) - Cursor AI Rules

## Project Overview
Fync is a unified API wrapper package providing streamlined access to multiple APIs (GitHub, NPM, Spotify, Google Drive, Google Calendar, Vercel) through a consistent functional interface.

**End User Import Pattern:**
```typescript
import { Github } from '@remcostoeten/fync/github'
import { Npm } from '@remcostoeten/fync/npm'  
import { Spotify } from '@remcostoeten/fync/spotify'
```

## Core Architecture Rules

### 1. Unified Core Functions
All API modules MUST use these core Fync functions from `src/core/`:

```typescript
function createFyncApi(baseUrl, config) // Initialize API client
function createFyncMethod(methodName)   // Define individual methods  
function createFyncResource(resourceName) // Group methods into exportable resources
function createFyncModule(moduleName)   // Optional module container
```

### 2. Strict API Implementation Pattern
Every API module MUST follow this exact pattern:

```typescript
// src/[api-name]/index.ts
import { createFyncApi, createFyncMethod, createFyncResource } from '../core';

function init[ApiName](token) {
  const api = createFyncApi('https://api.example.com', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return api;
}

createFyncMethod('methodName').args('param1', 'param2').endpoint('/path/{param1}');

export const [ApiName] = createFyncResource('[api-name]').methods({
  methodName: 'methodName'
});
```

## Code Style Rules

### 3. Function Declarations Only
```typescript
// ✅ Allowed
function createFyncApi(baseUrl, config) {}
function processResponse(data) {}

// ❌ Not Allowed  
const createFyncApi = (baseUrl, config) => {}
const processResponse = data => {}
```

### 4. Named Exports Only
```typescript
// ✅ Correct
export function createFyncMethod() {}
export const Github = createFyncResource('github');

// ❌ Wrong
export default function createFyncMethod() {}
export default Github;
```

### 5. Type Definitions
```typescript
// All types prefixed with T, use type not interface
type TFyncConfig = {
  headers?: Record<string, string>;
  baseUrl: string;
}

type TApiResponse<T> = {
  data: T;
  status: number;
}

// Single type per file (not exported) must be TProps
type TProps = {
  apiName: string;
  token?: string;
}
```

### 6. No Classes or OOP
```typescript  
// ❌ Never use
class ApiClient {}
new ApiClient()
this.method()
extends BaseApi

// ✅ Use functional patterns
function createApiClient() {}
function processRequest() {}
```

### 7. Pure Functions Only
```typescript
// ✅ Pure - same input, same output
function buildEndpoint(template, params) {
  return template.replace(/{(\w+)}/g, (_, key) => params[key]);
}

// ❌ Impure - side effects
function buildEndpoint(template, params) {
  console.log('Building endpoint'); // side effect
  globalConfig.lastEndpoint = template; // mutation
  return template.replace(/{(\w+)}/g, (_, key) => params[key]);
}
```

### 8. Error Handling with TResult
```typescript
type TSuccess<T> = { ok: true; value: T };
type TFailure<E> = { ok: false; error: E };
type TResult<T, E = string> = TSuccess<T> | TFailure<E>;

// Functions that can fail must return TResult
function makeApiRequest(url): Promise<TResult<TApiResponse, string>> {
  try {
    // request logic
    return { ok: true, value: response };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
```

### 9. No Comments Policy
Code must be self-explanatory through clear naming:

```typescript
// ❌ Don't do this
function process(data) { // processes user data
  // filter active users
  return data.filter(u => u.active);
}

// ✅ Do this  
function filterActiveUsers(users) {
  return users.filter(function(user) {
    return user.active;
  });
}
```

## File Structure Rules

### 10. Directory Structure
```
src/
├── core/           # Fync core abstractions
├── types/          # Global type definitions  
├── github/         # GitHub API module
├── npm/            # NPM API module
├── spotify/        # Spotify API module
├── google-drive/   # Google Drive API module
├── google-calendar/# Google Calendar API module
├── vercel/         # Vercel API module
└── index.ts        # Package exports
```

### 11. Module Structure
Each API module:
```
[api-name]/
├── index.ts        # Main exports (Github, Npm, etc.)
├── types.ts        # API-specific types
└── README.md       # Usage examples
```

### 12. Core Module Structure
```
core/
├── index.ts        # Core function exports
├── api-client.ts   # HTTP client logic
├── method-factory.ts # Method creation
├── resource-factory.ts # Resource grouping
└── types.ts        # Core type definitions
```

## Development Rules

### 13. Package Manager
- **Primary**: Use `bun` for all operations (`bun install`, `bun run dev`)
- **Fallback**: Use `pnpm` if bun fails  
- **Forbidden**: Never use `npm` or `yarn`

### 14. No Testing by Default
- Do not write tests unless explicitly requested
- Discuss rationale first if tests seem necessary

### 15. Copy-Paste Consistency  
Adding a new API should be a 10-line copy-paste operation:
1. Copy existing API module
2. Change base URL and auth headers
3. Update endpoint paths and method names
4. Export with correct name

### 16. Framework Detection
- Check `package.json` for framework and adapt patterns accordingly
- Support React/Next.js primarily, with SolidJS as secondary

## Quality Checklist

Before completing any Fync-related task, verify:

- [ ] All functions use `function` declarations (no arrow functions)
- [ ] All exports are named exports (except pages/views)
- [ ] All types prefixed with `T` and use `type` not `interface`
- [ ] All API modules use unified core functions
- [ ] No classes, `this`, `new`, or OOP patterns
- [ ] All functions are pure (no side effects)
- [ ] Error handling uses `TResult` pattern
- [ ] Code is self-documenting (no comments needed)
- [ ] File follows directory structure rules
- [ ] New APIs follow exact copy-paste pattern

## End User Experience Goal

Users should be able to:
```typescript
import { Github, Npm, Spotify } from '@remcostoeten/fync'

// All APIs follow identical patterns
const user = await Github.getUser('username');
const pkg = await Npm.getPackage('package-name');  
const track = await Spotify.getTrack('track-id');
```

The core handles all complexity - users see only clean, consistent interfaces.