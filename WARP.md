# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project scope

Monorepo root with a single published package in fync/. The package is a unified TypeScript client exposing multiple third‑party REST APIs (GitHub, Spotify, NPM Registry, Google Calendar/Drive, Vercel) via a consistent, functional factory architecture. Source lives in fync/src with shared core under fync/src/core.

## Essential commands (run in fync/)

- Install deps
  - pnpm install
- Typecheck + build (ESM) and CommonJS output
  - npm run build
  - npm run build:cjs
- Dev typewatch
  - npm run dev
- Lint and format (Biome)
  - npm run lint
  - npm run lint:fix
  - npm run format
  - npm run check
  - npm run check:fix
- Tests (Vitest)
  - npm run test            # interactive/watch when supported
  - npm run test:run        # CI-safe, non-watch
  - npm run test:coverage
- Releases (publishes to npm; requires proper auth)
  - npm run release:patch
  - npm run release:minor
  - npm run release:major

Notes
- Node >= 18 is required.
- Subpath exports are defined in package.json (e.g., @remcostoeten/fync/spotify). Update exports for any new module.

## High-level architecture

The design centers on three composable layers that standardize REST access and module assembly. All code is modern TS, functional, and immutable by default.

1) HTTP client factory
- File: fync/src/core/api-factory.ts (basic) and fync/src/core/api-factory-enhanced.ts (cache, rate limit, retry)
- Responsibilities
  - Compose base URL, headers, and auth (bearer, basic, apikey, oauth2)
  - Serialize query params and body
  - Execute fetch and parse JSON
  - In enhanced client: cache GETs, invalidate on mutations, enforce rate limits, retry on transient errors, expose rate-limit info and cache controls
- Output
  - An apiClient with typed methods: get, post, put, delete, patch, and request

2) Resource layer
- File: fync/src/core/resource-factory.ts
- Concepts
  - defineResource: declaratively describes endpoints with path templates and methods
  - createFyncResource: turns that description into callable functions
- Mechanics
  - Path interpolation for /route/{param} and automatic query string handling for remaining options
  - Method shape depends on HTTP verb: GET/DELETE accept options; POST/PUT/PATCH accept (data, options)
  - Optional transform hook to map raw responses into friendlier shapes

3) Module assembly
- File: fync/src/core/module-factory.ts
- createFyncModule creates an object that:
  - Exposes each resource as a property with generated methods
  - Exposes api: the underlying client
- createApiBuilder binds default config (baseUrl, auth type, headers) and returns a builder to merge user config (e.g., token) plus the resources map, producing a concrete module instance
- Feature modules (e.g., spotify, github, npm, google-calendar, google-drive, vercel) follow this pattern, add convenience helper methods on top of resources, and are exported from fync/src/index.ts

Key packages and config
- Biome for lint/format (fync/biome.json)
- TypeScript project emitting declarations to dist/ and ESM JS to dist/
- Babel converts dist/ to CommonJS under dist-cjs/ (build:cjs)
- Exports map in fync/package.json points consumers to ESM/CJS/types per subpath

## Adding a new API module (summary)

- Place code in fync/src/<api-name>/index.ts
- Define API base URL constant and resources via defineResource with basePath and method entries
- Bundle resources into a resources object
- Use createApiBuilder with baseUrl, headers, and auth strategy to produce a builder
- Create and return the module from the builder; attach convenience methods that compose resource calls
- Update exports in fync/package.json for the new subpath entry (import, require, types)
- Update fync/src/index.ts to export the new module and its types

Minimal template

```ts path=null start=null
import { createApiBuilder, defineResource, type TModule } from "../core";

const EXAMPLE_API_BASE = "https://api.example.com/v1";

const exampleResource = defineResource({
  name: "examples",
  basePath: "/examples",
  methods: {
    getExample: { path: "/{id}" },
    createExample: { path: "", method: "POST" }
  }
});

const resources = { examples: exampleResource };

const buildExample = createApiBuilder({
  baseUrl: EXAMPLE_API_BASE,
  auth: { type: "bearer" as const },
  headers: { "Content-Type": "application/json" }
});

type TExampleModule = TModule<typeof resources> & {
  getExample: (id: string) => Promise<any>;
};

export function Example(config: { token: string }): TExampleModule {
  const base = buildExample(config, resources) as TExampleModule;
  base.getExample = function (id: string) {
    return base.examples.getExample({ id });
  };
  return base;
}
```

Quality checklist for new modules
- Files under fync/src/<api-name>/
- Resources created with defineResource and grouped in resources
- Module built via createApiBuilder and returns a composed module
- Convenience methods implemented for common tasks
- Exports added to fync/package.json and fync/src/index.ts
- Types use type aliases and names prefixed with T

## Testing

- Runner: Vitest
  - npm run test: interactive when supported
  - npm run test:run: non-interactive CI run
  - npm run test:coverage: coverage reports
- No explicit vitest config in repo; defaults apply. Place tests alongside sources or in dedicated test directories, using .test.ts/.spec.ts naming.

## Build and distribution

- Build pipeline
  - tsc emits ESM JS and .d.ts to dist/
  - build:cjs uses Babel to transpile dist/ → dist-cjs/ for CommonJS consumers
- Package entry points and subpath exports
  - package.json exports map selects ESM (import), CJS (require), and types per subpath (., /spotify, /github, /npm, /google-calendar, /google-drive, /vercel)
- Release scripts chain build + version bump + publish. They assume a clean working state or tolerate no-op commits.

## Repository docs to consult

- fync/FYNC-ARCHITECTURE.md: authoritative style and module implementation guide
- IMPLEMENTED_METHODS.md: current surface area per module
- fync/README.md: consumer-facing usage and examples

## Architectural constraints (must follow)

- Functional-first: only function declarations; no classes; no arrow functions
- Immutability and purity preferred; avoid shared mutable state and side effects across scopes
- TypeScript: use type aliases only; all type names prefixed with T
- Exports: named exports only for modules; default exports are not used here
- Code must be self-explanatory without comments; prefer clear names over commentary
- Resource naming: plural resource names; paths use /{param} placeholders; query params passed via options
- Keep business logic outside API factories; helpers compose resource calls

