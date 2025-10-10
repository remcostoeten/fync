# Fync Method Audit Plan

This document tracks the comprehensive audit of all methods across all providers in the Fync library.

## Audit Progress

### Core Providers
- [ ] GitHub - Complete method inventory
- [ ] NPM - Complete method inventory
- [ ] GitLab - Complete method inventory
- [ ] Spotify - Complete method inventory
- [ ] Google Calendar - Complete method inventory
- [ ] Google Drive - Complete method inventory
- [ ] Vercel - Complete method inventory
- [ ] Discord - Complete method inventory
- [ ] Notion - Complete method inventory

### Documentation Tasks
- [ ] Document all method signatures
- [ ] Document all parameters and types
- [ ] Document all optional arguments
- [ ] Document return types
- [ ] Document OAuth methods where applicable
- [ ] Create comprehensive methods.md file
- [ ] Verify all examples match documented methods

## Methodology

For each provider, we will:
1. Read the main index.ts file
2. Examine all type definitions
3. Document each public method with:
   - Method name
   - Description (2-3 sentences)
   - Parameters (required and optional)
   - Parameter types
   - Return type
   - Usage examples where relevant

## Providers Overview

### 1. GitHub
Path: `apps/fync/src/github/`
Files to audit:
- index.ts (main API)
- oauth.ts (authentication)
- types/* (all type definitions)

### 2. NPM
Path: `apps/fync/src/npm/`
Files to audit:
- index.ts (main API)
- types/* (all type definitions)

### 3. GitLab
Path: `apps/fync/src/gitlab/`
Files to audit:
- index.ts (main API)
- types/* (all type definitions)

### 4. Spotify
Path: `apps/fync/src/spotify/`
Files to audit:
- index.ts (main API)
- types/* (all type definitions)

### 5. Google Calendar
Path: `apps/fync/src/google-calendar/`
Files to audit:
- index.ts (main API)
- oauth.ts (authentication)
- types/* (all type definitions)

### 6. Google Drive
Path: `apps/fync/src/google-drive/`
Files to audit:
- index.ts (main API)
- types/* (all type definitions)

### 7. Vercel
Path: `apps/fync/src/vercel/`
Files to audit:
- index.ts (main API)
- types/* (all type definitions)

### 8. Discord
Path: `apps/fync/src/discord/`
Files to audit:
- index.ts (main API)
- types/* (all type definitions)

### 9. Notion
Path: `apps/fync/src/notion/`
Files to audit:
- index.ts (main API)
- types.ts (type definitions)
- types/* (all type definitions)

## Notes

This audit will produce a comprehensive `methods.md` file that serves as the single source of truth for all available methods in the Fync library.
