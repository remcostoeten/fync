# Fync API Methods - Complete Reference

This document lists **every single method** available across all APIs in the Fync library.

---

## 🐙 GitHub API

### Core Methods
- `GitHub(config)` - Create GitHub client instance
- `.api` - Direct access to chainable API

### User Methods (`github.user(username)`)
- `.get()` - Get user profile information
- `.repos` - Access user's repositories (chainable)
- `.gists` - Access user's gists (chainable)
- `.followers` - Access user's followers (chainable)
- `.following` - Access users they follow (chainable)
- `.starred` - Access starred repositories (chainable)
- `.subscriptions` - Access repository subscriptions (chainable)
- `.orgs` - Access user's organizations (chainable)
- `.events` - Access user's public events (chainable)
- `.received_events` - Access events received by user (chainable)
- `.chain` - Direct chainable client access

### Repository Methods (`github.repo(owner, repo)`)
- `.get()` - Get repository information
- `.branches` - Access repository branches (chainable)
- `.commits` - Access repository commits (chainable)
- `.contents` - Access repository contents (chainable)
- `.contributors` - Access repository contributors (chainable)
- `.deployments` - Access repository deployments (chainable)
- `.forks` - Access repository forks (chainable)
- `.issues` - Access repository issues (chainable)
- `.pulls` - Access pull requests (chainable)
- `.releases` - Access repository releases (chainable)
- `.tags` - Access repository tags (chainable)
- `.topics` - Access repository topics (chainable)
- `.labels` - Access repository labels (chainable)
- `.milestones` - Access repository milestones (chainable)

#### Enhanced Issue Methods
- `.getIssues(options?)` - Get all issues with filters
- `.getIssue(issueNumber)` - Get specific issue
- `.getIssueComments(issueNumber, options?)` - Get issue comments
- `.getIssueEvents(issueNumber, options?)` - Get issue events

#### Enhanced Pull Request Methods
- `.getPulls(options?)` - Get all pull requests with filters
- `.getPull(pullNumber)` - Get specific pull request
- `.getPullReviews(pullNumber, options?)` - Get pull request reviews
- `.getPullComments(pullNumber, options?)` - Get pull request comments

#### Enhanced Release Methods
- `.getReleases(options?)` - Get all releases with filters
- `.getRelease(releaseId)` - Get specific release
- `.getLatestRelease()` - Get latest release
- `.getReleaseAssets(releaseId)` - Get release assets

#### Enhanced Misc Methods
- `.getTags(options?)` - Get repository tags
- `.getLabels(options?)` - Get repository labels
- `.getMilestones(options?)` - Get repository milestones

#### GitHub Actions Methods
- `.actions.workflows.list(options?)` - List workflows
- `.actions.workflows.get(workflowId)` - Get specific workflow
- `.actions.workflows.runs(workflowId, options?)` - Get workflow runs
- `.actions.workflows.jobs(runId, options?)` - Get workflow jobs
- `.actions.runs.list(options?)` - List all workflow runs
- `.actions.runs.get(runId)` - Get specific run
- `.actions.runs.jobs(runId, options?)` - Get run jobs
- `.actions.secrets.get(options?)` - Get action secrets

### Organization Methods (`github.org(orgName)`)
- `.get()` - Get organization information
- `.repos` - Access organization repositories (chainable)
- `.members` - Access organization members (chainable)
- `.teams` - Access organization teams (chainable)
- `.events` - Access organization events (chainable)
- `.chain` - Direct chainable client access

### Gist Methods (`github.gist(gistId)`)
- `.get()` - Get gist information
- `.comments` - Access gist comments (chainable)
- `.commits` - Access gist commits (chainable)
- `.forks` - Access gist forks (chainable)
- `.star` - Access gist star status (chainable)
- `.chain` - Direct chainable client access

### Search Methods (`github.search`)
- `.repositories(query, options?)` - Search repositories
- `.users(query, options?)` - Search users
- `.issues(query, options?)` - Search issues and pull requests
- `.code(query, options?)` - Search code
- `.commits(query, options?)` - Search commits
- `.topics(query, options?)` - Search topics
- `.labels(query, options?)` - Search labels

### Authenticated User Methods (`github.me`)
- `.get()` - Get current user profile
- `.repos` - Access current user's repositories (chainable)
- `.gists` - Access current user's gists (chainable)
- `.followers` - Access current user's followers (chainable)
- `.following` - Access users current user follows (chainable)
- `.starred` - Access current user's starred repos (chainable)
- `.subscriptions` - Access current user's subscriptions (chainable)
- `.orgs` - Access current user's organizations (chainable)
- `.issues` - Access current user's issues (chainable)
- `.chain` - Direct chainable client access

### Rate Limit & Notifications
- `.rateLimit.get()` - Get current rate limit status
- `.notifications.get(options?)` - Get user notifications
- `.notifications.markAsRead(options?)` - Mark notifications as read
- `.notifications.markRepoAsRead(owner, repo, options?)` - Mark repo notifications as read

---

## 🎵 Spotify API

### Core Methods
- `Spotify(config)` - Create Spotify client instance
- `.api` - Direct access to chainable API

### User Methods (`spotify.user(userId)`)
- `.get()` - Get user profile information
- `.playlists.get(options?)` - Get user's public playlists
- `.chain` - Direct chainable client access

### Authenticated User Methods (`spotify.me`)
- `.get()` - Get current user profile
- `.playlists.get(options?)` - Get current user's playlists
- `.tracks.get(options?)` - Get current user's saved tracks
- `.albums.get(options?)` - Get current user's saved albums
- `.artists.get(options?)` - Get current user's followed artists
- `.recentlyPlayed.get(options?)` - Get recently played tracks
- `.chain` - Direct chainable client access

### Player Methods (`spotify.player`)
- `.play(options?)` - Start/resume playback
- `.pause(options?)` - Pause playback
- `.next(options?)` - Skip to next track
- `.previous(options?)` - Skip to previous track
- `.queue(uri, options?)` - Add track to queue
- `.devices()` - Get available devices
- `.currentlyPlaying()` - Get current playback state
- `.chain` - Direct chainable client access

### Playlist Methods (`spotify.playlist(playlistId)`)
- `.get()` - Get playlist information
- `.tracks.get(options?)` - Get playlist tracks
- `.tracks.add(uris, position?)` - Add tracks to playlist
- `.tracks.remove(uris)` - Remove tracks from playlist
- `.chain` - Direct chainable client access

### Search Methods (`spotify.search`)
- `.tracks(query, options?)` - Search for tracks
- `.artists(query, options?)` - Search for artists
- `.albums(query, options?)` - Search for albums
- `.playlists(query, options?)` - Search for playlists
- `.shows(query, options?)` - Search for shows/podcasts
- `.episodes(query, options?)` - Search for episodes
- `.chain` - Direct chainable client access

### Library Methods (`spotify.library`)
- `.savedTracks.get(options?)` - Get user's saved tracks
- `.savedAlbums.get(options?)` - Get user's saved albums
- `.savedShows.get(options?)` - Get user's saved shows
- `.savedEpisodes.get(options?)` - Get user's saved episodes
- `.chain` - Direct chainable client access

### Auth Methods
- `createSpotifyAuth(config)` - Create OAuth helper
- `isTokenExpired(token)` - Check if token is expired
- `shouldRefreshToken(token)` - Check if token should be refreshed
- `SPOTIFY_SCOPES` - Available OAuth scopes

---

## 📦 NPM API

### Core Methods
- `NPM(config?)` - Create NPM client instance
- `.api` - Direct access to chainable API

### Package Methods (`npm.package(packageName)`)
- `.get()` - Get complete package information
- `.version(version)` - Access specific version
- `.latest()` - Get latest version information
- `.versions()` - Get all versions
- `.downloads.last(period)` - Get download stats for period
- `.downloads.range(start, end)` - Get download stats for date range
- `.chain` - Direct chainable client access

#### Advanced Package Methods
- `.vulnerabilities()` - Get security vulnerabilities
- `.audit()` - Get audit information
- `.size()` - Get package size information
- `.deprecation()` - Get deprecation information
- `.distTags()` - Get distribution tags
- `.collaborators()` - Get package collaborators
- `.isDeprecated()` - Check if package is deprecated
- `.bundleAnalysis()` - Get bundle size analysis

### Version Methods (`npm.package(name).version(version)`)
- `.get()` - Get specific version information
- `.chain` - Direct chainable client access

### Search Methods (`npm.search`)
- `.packages(query, options?)` - Search packages with quality/popularity filters
- `.chain` - Direct chainable client access

### Downloads Methods (`npm.downloads`)
- `.package(packageName, period?)` - Get package download statistics
- `.packages(packageNames, period?)` - Get multiple packages download stats
- `.range(packageName, start, end)` - Get download stats for date range
- `.chain` - Direct chainable client access

### User Methods (`npm.user(username)`)
- `.get()` - Get user information
- `.packages(options?)` - Get user's packages
- `.chain` - Direct chainable client access

### Organization Methods (`npm.org(orgName)`)
- `.get()` - Get organization information
- `.packages(options?)` - Get organization's packages
- `.members(options?)` - Get organization members
- `.chain` - Direct chainable client access

### Tag Methods (`npm.tag(tag)`)
- `.packages(options?)` - Get packages with specific tag/keyword
- `.chain` - Direct chainable client access

---

## 📅 Google Calendar API

### Core Methods
- `createCalendarService(config)` - Create Calendar service instance

### Calendar Management Methods
- `.getCalendars(params?)` - Get all user calendars
- `.getCalendar(calendarId)` - Get specific calendar metadata

### Event Retrieval Methods
- `.getEvents(calendarId?, params?)` - Get events with filters
- `.getEvent(calendarId, eventId)` - Get specific event
- `.getUpcomingEvents(calendarId?, maxResults?)` - Get upcoming events
- `.getEventsInDateRange(calendarId?, startDate, endDate)` - Get events in date range
- `.getTodaysEvents(calendarId?)` - Get today's events only
- `.searchEvents(query, calendarId?, maxResults?)` - Search events by text

### Utility Methods
- `.getColors()` - Get available calendar colors
- `.getFreeBusy(params)` - Check free/busy status for calendars
- `.isTimeSlotBusy(calendarId, startTime, endTime)` - Check if specific time slot is busy
- `.getAllCalendarEvents(maxResults?)` - Get events from all accessible calendars

---

## 📁 Google Drive API

### Core
- `createGoogleDriveAuth(config)` - OAuth helper and token state
- `getAuthorizationUrl(auth)` - Build consent URL
- `exchangeCodeForTokens(auth, code)` - Obtain access/refresh tokens
- `refreshAccessToken(auth, refreshToken)` - Refresh access token
- `createGoogleDriveClient(config)` - Chainable low-level client (files, permissions, about, etc.)
- `createGoogleDriveService(config)` - High-level service with common operations

### High-level Service Methods
- `listFiles(params?)` - List files with Drive/Shared Drives support
- `getFile(fileId, fields?)` - Retrieve file metadata
- `searchFiles(query, params?)` - Search with Drive query language
- `createFolder(request)` - Create folder
- `uploadFile({ metadata, content, uploadType?, onProgress? })` - Upload media/multipart/resumable
- `updateFile(fileId, updates)` - Patch metadata and parents
- `deleteFile(fileId)` - Permanently delete
- `trashFile(fileId)` / `untrashFile(fileId)` - Soft delete / restore
- `downloadFile({ fileId, ... })` - Download content
- `exportFile({ fileId, mimeType })` - Export Google Workspace files
- `copyFile({ fileId, ... })` - Duplicate file
- `moveFile({ fileId, addParents?, removeParents? })` - Move between folders
- `shareFile({ fileId, permission, ... })` - Add permission
- `getPermissions(fileId)` / `deletePermission(fileId, permissionId)`
- `emptyTrash()` - Empty user trash
- `getStorageQuota()` - Storage usage and limits
- `generateIds(count?)` - Pre-generate file IDs
- `createFolderPath(path, parentId?)` - Create nested folders
- `listFolderContents(folderId, params?)`
- `findFileByName(name, parentId?)` / `findFolderByName(name, parentId?)`

### Chainable Client Methods (Drive)
- `.get<T>(options?)`, `.post<T>(body?, options?)`, `.patch<T>(body?, options?)`, `.delete<T>(options?)`
- `.path()` - Current path for debugging

---

## 🔧 Core Utilities

### Core Methods
- `createCalendarService(config)` - Create Calendar service instance

### Calendar Management Methods
- `.getCalendars(params?)` - Get all user calendars
- `.getCalendar(calendarId)` - Get specific calendar metadata

### Event Retrieval Methods
- `.getEvents(calendarId?, params?)` - Get events with filters
- `.getEvent(calendarId, eventId)` - Get specific event
- `.getUpcomingEvents(calendarId?, maxResults?)` - Get upcoming events
- `.getEventsInDateRange(calendarId?, startDate, endDate)` - Get events in date range
- `.getTodaysEvents(calendarId?)` - Get today's events only
- `.searchEvents(query, calendarId?, maxResults?)` - Search events by text

### Utility Methods
- `.getColors()` - Get available calendar colors
- `.getFreeBusy(params)` - Check free/busy status for calendars
- `.isTimeSlotBusy(calendarId, startTime, endTime)` - Check if specific time slot is busy
- `.getAllCalendarEvents(maxResults?)` - Get events from all accessible calendars

---

## 🔧 Core Utilities

### HTTP Client Methods
All APIs share these underlying HTTP patterns:
- `.get<T>(options?)` - GET request with optional caching
- `.post<T>(data, options?)` - POST request (where supported)
- `.put<T>(data, options?)` - PUT request (where supported)
- `.patch<T>(data, options?)` - PATCH request (where supported)
- `.delete<T>(options?)` - DELETE request (where supported)

### Caching Methods
- `memoize(fn, keyFn, options)` - Memoize function with TTL
- LRU cache implementation for memory management
- Memory cache with automatic cleanup

### Response Types
- Structured responses with pagination support
- Simple responses for basic data
- Error handling with detailed error types

---

## 📊 Summary

**Total Method Count by API:**
- **GitHub**: 75+ methods (including chainable endpoints)
- **Spotify**: 35+ methods (including chainable endpoints)  
- **NPM**: 45+ methods (including advanced package features)
- **Google Calendar**: 12 methods (focused, comprehensive coverage)
- **Core Utilities**: 15+ shared methods

**Grand Total: 180+ methods** across all APIs, providing comprehensive coverage for:
- Repository management & CI/CD
- Music streaming & playlists
- Package registry & dependency analysis  
- Calendar & scheduling
- HTTP client & caching utilities

Each API follows consistent patterns with functional factories, chainable clients, typed responses, and built-in caching support.
