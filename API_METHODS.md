# Fync API Methods Reference

This document lists all API methods and endpoints available in the Fync library for GitHub, Spotify, NPM, and Google Calendar integrations.

## GitHub API Methods

### GitHub Client Configuration
```typescript
GitHub({ 
  token: string,
  baseUrl?: string,
  cache?: boolean,
  cacheTTL?: number,
  timeout?: number 
})
```

### Core Client Methods
- `github.api` - Direct access to chainable API client
- `github.user(username)` - Access user-specific methods
- `github.repo(owner, repo)` - Access repository-specific methods
- `github.org(orgName)` - Access organization-specific methods
- `github.gist(gistId)` - Access gist-specific methods
- `github.search` - Search functionality
- `github.me` - Current authenticated user methods
- `github.rateLimit.get()` - Get rate limiting information
- `github.notifications` - Notification management

### User Methods (`TUserClient`)
- `user.get()` - Get user profile information
- `user.repos` - User's repositories (chainable)
- `user.gists` - User's gists (chainable)
- `user.followers` - User's followers (chainable)
- `user.following` - Users being followed (chainable)
- `user.starred` - Starred repositories (chainable)
- `user.subscriptions` - Subscriptions (chainable)
- `user.orgs` - Organizations (chainable)
- `user.events` - User events (chainable)
- `user.received_events` - Received events (chainable)
- `user.chain` - Direct chain access

### Repository Methods (`TRepoClient`)
- `repo.get()` - Get repository information
- `repo.branches` - Repository branches (chainable)
- `repo.commits` - Repository commits (chainable)
- `repo.contents` - Repository contents (chainable)
- `repo.contributors` - Repository contributors (chainable)
- `repo.deployments` - Repository deployments (chainable)
- `repo.forks` - Repository forks (chainable)
- `repo.issues` - Repository issues (chainable)
- `repo.pulls` - Pull requests (chainable)
- `repo.releases` - Repository releases (chainable)
- `repo.tags` - Repository tags (chainable)
- `repo.topics` - Repository topics (chainable)
- `repo.labels` - Repository labels (chainable)
- `repo.milestones` - Repository milestones (chainable)

#### Enhanced Repository Methods
- `repo.getIssues(options?)` - Get repository issues
- `repo.getIssue(issueNumber)` - Get specific issue
- `repo.getIssueComments(issueNumber, options?)` - Get issue comments
- `repo.getIssueEvents(issueNumber, options?)` - Get issue events
- `repo.getPulls(options?)` - Get pull requests
- `repo.getPull(pullNumber)` - Get specific pull request
- `repo.getPullReviews(pullNumber, options?)` - Get pull request reviews
- `repo.getPullComments(pullNumber, options?)` - Get pull request comments
- `repo.getReleases(options?)` - Get repository releases
- `repo.getRelease(releaseId)` - Get specific release
- `repo.getLatestRelease()` - Get latest release
- `repo.getReleaseAssets(releaseId)` - Get release assets
- `repo.getTags(options?)` - Get repository tags
- `repo.getLabels(options?)` - Get repository labels
- `repo.getMilestones(options?)` - Get repository milestones
- `repo.chain` - Direct chain access

#### Repository Actions Methods
- `repo.actions.workflows.list(options?)` - List workflows
- `repo.actions.workflows.get(workflowId)` - Get specific workflow
- `repo.actions.workflows.runs(workflowId, options?)` - Get workflow runs
- `repo.actions.workflows.jobs(runId, options?)` - Get workflow jobs
- `repo.actions.runs.list(options?)` - List workflow runs
- `repo.actions.runs.get(runId)` - Get specific workflow run
- `repo.actions.runs.jobs(runId, options?)` - Get run jobs
- `repo.actions.secrets.get(options?)` - Get repository secrets

### Organization Methods (`TOrgClient`)
- `org.get()` - Get organization information
- `org.repos` - Organization repositories (chainable)
- `org.members` - Organization members (chainable)
- `org.teams` - Organization teams (chainable)
- `org.events` - Organization events (chainable)
- `org.chain` - Direct chain access

### Gist Methods (`TGistClient`)
- `gist.get()` - Get gist information
- `gist.comments` - Gist comments (chainable)
- `gist.commits` - Gist commits (chainable)
- `gist.forks` - Gist forks (chainable)
- `gist.star` - Gist starring (chainable)
- `gist.chain` - Direct chain access

### Search Methods (`TSearchClient`)
- `search.repositories(query, options?)` - Search repositories
- `search.users(query, options?)` - Search users
- `search.issues(query, options?)` - Search issues
- `search.code(query, options?)` - Search code
- `search.commits(query, options?)` - Search commits
- `search.topics(query, options?)` - Search topics
- `search.labels(query, options?)` - Search labels

### Authenticated User Methods (`TAuthenticatedUserClient`)
- `me.get()` - Get current user information
- `me.repos` - Current user's repositories (chainable)
- `me.gists` - Current user's gists (chainable)
- `me.followers` - Current user's followers (chainable)
- `me.following` - Users being followed (chainable)
- `me.starred` - Starred repositories (chainable)
- `me.subscriptions` - Subscriptions (chainable)
- `me.orgs` - Organizations (chainable)
- `me.issues` - Issues (chainable)
- `me.chain` - Direct chain access

### Notification Methods
- `notifications.get(options?)` - Get notifications
- `notifications.markAsRead(options?)` - Mark notifications as read
- `notifications.markRepoAsRead(owner, repo, options?)` - Mark repository notifications as read

### Chainable Client Methods (Available on all chainable objects)
- `.get<T>(options?)` - GET request
- `.post<T>(data, options?)` - POST request
- `.put<T>(data, options?)` - PUT request
- `.patch<T>(data, options?)` - PATCH request
- `.delete<T>(options?)` - DELETE request
- `.paginate<T>(options?)` - Paginated GET request
- `.stream<T>(options?)` - Streaming GET request
- `.path()` - Get current path

---

## Spotify API Methods

### Spotify Client Configuration
```typescript
Spotify({ 
  token: string,
  baseUrl?: string,
  cache?: boolean,
  cacheTTL?: number,
  timeout?: number 
})
```

### Core Client Methods
- `spotify.api` - Direct access to chainable API client
- `spotify.user(userId)` - Access user-specific methods
- `spotify.me` - Current authenticated user methods
- `spotify.player` - Player control methods
- `spotify.playlist(playlistId)` - Playlist-specific methods
- `spotify.search` - Search functionality
- `spotify.library` - Library management methods

### User Methods (`TUserClient`)
- `user.get()` - Get user profile information
- `user.playlists.get(options?)` - Get user's playlists
- `user.chain` - Direct chain access

### Authenticated User Methods (`TAuthenticatedUserClient`)
- `me.get()` - Get current user profile
- `me.playlists.get(options?)` - Get current user's playlists
- `me.tracks.get(options?)` - Get saved tracks
- `me.albums.get(options?)` - Get saved albums
- `me.artists.get(options?)` - Get followed artists
- `me.recentlyPlayed.get(options?)` - Get recently played tracks
- `me.chain` - Direct chain access

### Player Methods (`TPlayerClient`)
- `player.play(options?)` - Start/resume playback
- `player.pause(options?)` - Pause playback
- `player.next(options?)` - Skip to next track
- `player.previous(options?)` - Skip to previous track
- `player.queue(uri, options?)` - Add track to queue
- `player.devices()` - Get available devices
- `player.currentlyPlaying()` - Get current playback state
- `player.chain` - Direct chain access

### Playlist Methods (`TPlaylistClient`)
- `playlist.get()` - Get playlist information
- `playlist.tracks.get(options?)` - Get playlist tracks
- `playlist.tracks.add(uris, position?)` - Add tracks to playlist
- `playlist.tracks.remove(uris)` - Remove tracks from playlist
- `playlist.chain` - Direct chain access

### Search Methods (`TSearchClient`)
- `search.tracks(query, options?)` - Search for tracks
- `search.artists(query, options?)` - Search for artists
- `search.albums(query, options?)` - Search for albums
- `search.playlists(query, options?)` - Search for playlists
- `search.shows(query, options?)` - Search for shows
- `search.episodes(query, options?)` - Search for episodes
- `search.chain` - Direct chain access

### Library Methods (`TLibraryClient`)
- `library.savedTracks.get(options?)` - Get saved tracks
- `library.savedAlbums.get(options?)` - Get saved albums
- `library.savedShows.get(options?)` - Get saved shows
- `library.savedEpisodes.get(options?)` - Get saved episodes
- `library.chain` - Direct chain access

### Authentication Methods
- `createSpotifyAuth(config)` - Create Spotify OAuth handler
- `isTokenExpired(token)` - Check if token is expired
- `shouldRefreshToken(token)` - Check if token should be refreshed
- `SPOTIFY_SCOPES` - Available OAuth scopes

### Chainable Client Methods (Available on all chainable objects)
- `.get<T>(options?)` - GET request
- `.post<T>(data, options?)` - POST request
- `.put<T>(data, options?)` - PUT request
- `.patch<T>(data, options?)` - PATCH request
- `.delete<T>(data?, options?)` - DELETE request
- `.paginate<T>(options?)` - Paginated GET request
- `.stream<T>(options?)` - Streaming GET request
- `.path()` - Get current path

---

## NPM API Methods

### NPM Client Configuration
```typescript
NPM({ 
  cache?: boolean,
  cacheTTL?: number,
  baseUrl?: string,
  timeout?: number 
})
```

### Core Client Methods
- `npm.api` - Direct access to chainable API client
- `npm.package(packageName)` - Access package-specific methods
- `npm.search` - Search functionality
- `npm.downloads` - Download statistics
- `npm.user(username)` - User-specific methods
- `npm.org(orgName)` - Organization-specific methods
- `npm.tag(tag)` - Tag-specific methods

### Package Methods (`TAdvancedPackageClient`)
- `package.get()` - Get package information
- `package.version(version)` - Get specific version information
- `package.latest()` - Get latest version information
- `package.versions()` - Get all versions
- `package.downloads.last(period)` - Get download stats for period
- `package.downloads.range(start, end)` - Get download stats for date range
- `package.chain` - Direct chain access

#### Advanced Package Methods
- `package.vulnerabilities()` - Get package vulnerabilities
- `package.audit()` - Get audit information
- `package.size()` - Get package size information
- `package.deprecation()` - Get deprecation information
- `package.distTags()` - Get distribution tags
- `package.collaborators()` - Get package collaborators
- `package.isDeprecated()` - Check if package is deprecated
- `package.bundleAnalysis()` - Get bundle analysis

### Version Methods (`TVersionClient`)
- `version.get()` - Get version information
- `version.chain` - Direct chain access

### Search Methods (`TSearchClient`)
- `search.packages(query, options?)` - Search packages
  - Options: `size`, `from`, `quality`, `popularity`, `maintenance`
- `search.chain` - Direct chain access

### Downloads Methods (`TDownloadsClient`)
- `downloads.package(packageName, period?)` - Get package download stats
- `downloads.packages(packageNames, period?)` - Get multiple packages download stats
- `downloads.range(packageName, start, end)` - Get download stats for date range
- `downloads.chain` - Direct chain access

### User Methods (`TUserClient`)
- `user.get()` - Get user information
- `user.packages(options?)` - Get user's packages
- `user.chain` - Direct chain access

### Organization Methods (`TOrgClient`)
- `org.get()` - Get organization information
- `org.packages(options?)` - Get organization's packages
- `org.members(options?)` - Get organization members
- `org.chain` - Direct chain access

### Tag Methods (`TTagClient`)
- `tag.packages(options?)` - Get packages with specific tag
- `tag.chain` - Direct chain access

### Chainable Client Methods (Available on all chainable objects)
- `.get<T>(options?)` - GET request
- `.path()` - Get current path

---

## Google Calendar API Methods

### Calendar Service Configuration
```typescript
createCalendarService({ 
  accessToken: string,
  cache?: boolean,
  cacheTTL?: number 
})
```

### Core Calendar Methods
- `getCalendars(params?)` - Get user's calendars
- `getCalendar(calendarId)` - Get specific calendar information
- `getEvents(calendarId?, params?)` - Get calendar events
- `getEvent(calendarId, eventId)` - Get specific event
- `getUpcomingEvents(calendarId?, maxResults?)` - Get upcoming events
- `getEventsInDateRange(calendarId?, startDate, endDate)` - Get events in date range
- `getTodaysEvents(calendarId?)` - Get today's events
- `searchEvents(query, calendarId?, maxResults?)` - Search events
- `getColors()` - Get calendar colors
- `getFreeBusy(params)` - Get free/busy information
- `isTimeSlotBusy(calendarId, startTime, endTime)` - Check if time slot is busy
- `getAllCalendarEvents(maxResults?)` - Get events from all calendars

---

## Request Options

### Common Request Options
All API methods support the following options:

```typescript
type TRequestOptions = {
  params?: Record<string, string | number>;
  cache?: boolean;
  cacheTTL?: number;
  timeout?: number;
}
```

### Pagination Options (GitHub & Spotify)
```typescript
type TPaginationOptions = {
  paginate?: boolean;    // Enable pagination
  allPages?: boolean;    // Fetch all pages
  limit?: number;        // Items per page
  after?: string;        // Cursor for next page
  before?: string;       // Cursor for previous page  
}
```

### Search Options (NPM)
```typescript
type TSearchOptions = {
  size?: number;         // Number of results
  from?: number;         // Starting offset
  quality?: number;      // Quality weighting
  popularity?: number;   // Popularity weighting
  maintenance?: number;  // Maintenance weighting
}
```

---

## Error Handling

All API methods return promises and may throw errors. Common error scenarios:

- **Authentication errors** - Invalid or expired tokens
- **Rate limiting** - API rate limits exceeded  
- **Network errors** - Connection timeouts or failures
- **Not found errors** - Requested resources don't exist
- **Permission errors** - Insufficient permissions for operation

Example error handling:
```typescript
try {
  const user = await github.user('octocat').get();
} catch (error) {
  if (error.status === 404) {
    console.log('User not found');
  } else if (error.status === 403) {
    console.log('Rate limit exceeded');
  } else {
    console.log('API error:', error.message);
  }
}
```

---

## Caching

All clients support built-in caching:

- **Default TTL**: 5 minutes (300,000ms)
- **Cache scope**: Per endpoint + parameters
- **Cache invalidation**: Automatic after TTL expires
- **Memory usage**: LRU cache with automatic cleanup

Caching can be:
- Enabled/disabled globally via client config
- Overridden per request via options
- Configured with custom TTL values
