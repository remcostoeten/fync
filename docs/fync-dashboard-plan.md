# Fync Dashboard Plan

This document outlines the plan for building a comprehensive dashboard with Calendar and Drive features, aligned with our project rules and conventions.

## Overview
- Goal: Unified dashboard with Calendar and Drive modules, sharing auth, search, and permissions.
- Tech: Next.js 15 (App Router), React 19, TypeScript, Bun (fallback pnpm), Postgres, S3-compatible storage.
- Style: Pure functions, reducers for complex flows, immutable data, named exports, views pattern.

## Added package
- @remcostoeten/fync/vercel
  - Purpose: Deploy monitoring, environment surfacing, and small utilities tightened for Vercel.
  - Usage notes:
    - Import from `@remcostoeten/fync/vercel` in server-only contexts where deploy metadata is required.
    - Keep imports leaf-level and pure; do not introduce side effects at module top-level.

## Architecture
- app/
  - Route segments and pages that only return a View and optional metadata.
- views/
  - calendar-view.tsx, drive-view.tsx, settings-view.tsx
  - Views compose UI and logic from features and components.
- components/
  - Pure UI building blocks, named exports only, function declarations only.
- features/
  - calendar/, drive/, auth/, search/
  - Reducers, domain-specific pure utilities, selectors.
- server/
  - HTTP route handlers, database access, storage adapters, signed URL handlers.
- lib/
  - Cross-cutting pure utilities (dates, formatting, parsing, validation).
- types/
  - Shared immutable types (only `type`, prefixed with `T`).

## Calendar module
- Types: TEvent, TCalendar, TAttendee, TRecurrence, TTimeRange.
- Features:
  - Month/Week/Day views
  - Event CRUD
  - Recurring events (RRULE strings, normalized server-side)
  - Time zone aware rendering
  - ICS import/export
  - Optional: availability and CalDAV sync adapter
- State management:
  - calendar-reducer for view mode, selection, drag/resize, range
  - Derived selectors for visible events and conflicts
- Data:
  - Postgres tables for events, calendars, attendees, recurrence rules
  - Background job for reminders and ICS processing

## Drive module
- Types: TFile, TFolder, TPermission, TVersion, TUploadPart.
- Features:
  - Folders and hierarchical navigation
  - Drag-and-drop uploads, resumable/multipart
  - File previews (images, PDF, text), size/type gating
  - Sharing links with expiry, role-scoped permissions
  - Versioning and restore
- Storage:
  - S3-compatible backend (S3/R2/Supabase Storage) with signed URLs
  - Metadata and indexing in Postgres
- State management:
  - drive-reducer for selection, uploads, optimistic moves, filter/search

## Cross-cutting concerns
- Auth & RBAC:
  - Users, orgs/teams, roles; resource-scoped permissions for calendars/files.
- Realtime:
  - Presence, upload progress, collaborative updates via WebSocket/channels.
- Search:
  - Start with Postgres FTS; optional Meilisearch/OpenSearch later.
- Background jobs:
  - Reminders, link expiry, virus scan hook, external sync. Queue + cron scheduling.
- Observability:
  - Structured logs; minimal metrics; tracing later.

## Server adapters
- Vercel integration via `@remcostoeten/fync/vercel`:
  - Access deploy metadata for environments and build diagnostics.
  - Wrap server handlers to include deploy context in logs and health endpoints.
- Storage adapter abstraction:
  - S3-compatible client behind pure function interface returning signed operations.
- Calendar sync adapters:
  - Optional CalDAV connector implemented behind a pure boundary.

## Directory scaffolding (target)
- app/(dashboard)/calendar/page.tsx → returns `CalendarView`
- app/(dashboard)/drive/page.tsx → returns `DriveView`
- views/calendar-view.tsx, views/drive-view.tsx
- features/calendar/calendar-reducer.ts
- features/drive/drive-reducer.ts
- server/storage/s3.ts, server/calendar/ics.ts, server/drive/upload.ts
- types/features/calendar.ts, types/features/drive.ts

## Milestones
- M1: Auth + RBAC, layout shell, nav, org switcher
- M2: Calendar basics (event CRUD, month/week/day, timezone)
- M3: Drive basics (folders, uploads, previews, sharing links)
- M4: ICS import/export + signed URL downloads + resumable uploads
- M5: Realtime updates + reminders + search
- M6: External sync adapters (CalDAV, cloud storage) + background jobs polish

## Conventions and rules (enforced)
- Only function declarations; no classes, no arrow function components.
- Pure functions; no side effects outside function scope.
- Named exports only, except default exports allowed in pages/views React components.
- Use `type` only, all types prefixed with `T`; single local type in a component file is `TProps`.
- Code must be self-explanatory; avoid comments.
- Use Bun; fallback to pnpm if Bun fails.

## Next steps
- Scaffold directories and minimal stubs for calendar and drive.
- Add initial reducers and types, plus server adapters for storage and ICS.
- Wire Vercel integration through `@remcostoeten/fync/vercel` for deploy metadata in logs.

