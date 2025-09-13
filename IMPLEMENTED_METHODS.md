# Fync API - Currently Implemented Methods

## Summary (Updated Jan 27 2025)

**GitHub** - 88 total methods
- 78 resource methods across 9 resources
- 10 convenience methods

**GitLab** - 110 total methods ✅ NEW
- 96 resource methods across 10 resources
- 14 convenience methods

**NPM** - 15 total methods  
- 4 resource methods across 3 resources
- 11 convenience methods

**Spotify** - 86 total methods
- 66 resource methods across 9 resources
- 20 convenience methods

**Vercel** - 36 total methods
- 28 resource methods across 5 resources
- 8 convenience methods

**Google Calendar** - 45 total methods
- 29 resource methods across 7 resources
- 16 convenience methods

**Google Drive** - 48 total methods
- 25 resource methods across 9 resources
- 23 convenience methods

### Total: 428 methods implemented across all 7 modules

This document lists all methods currently implemented in the new unified architecture.

## 📦 GitHub Module

### Resource Methods (Direct Access)
- **users**: `getUser`, `getUserRepos`, `getUserGists`, `getUserFollowers`, `getUserFollowing`, `getUserStarred`, `getUserOrgs`, `getUserEvents`, `getUserReceivedEvents`, `checkUserFollowing`
- **repos**: `getRepo`, `getRepoCommits`, `getRepoCommit`, `getRepoBranches`, `getRepoTags`, `getRepoReleases`, `getRepoLatestRelease`, `getRepoContributors`, `getRepoLanguages`, `getRepoTopics`, `getRepoStargazers`, `getRepoForks`, `getRepoIssues`, `getRepoIssue`, `getRepoPulls`, `getRepoPull`, `getRepoContents`, `getRepoReadme`, `createRepoIssue`, `updateRepoIssue`, `createRepoPull`
- **search**: `searchRepos`, `searchCode`, `searchIssues`, `searchUsers`, `searchTopics`, `searchLabels`, `searchCommits`
- **gists**: `getPublicGists`, `getUserGists`, `getGist`, `createGist`, `updateGist`, `deleteGist`, `getGistComments`, `createGistComment`
- **orgs**: `getOrg`, `getOrgRepos`, `getOrgMembers`, `getOrgTeams`, `getOrgProjects`, `getOrgEvents`, `checkOrgMembership`
- **activity**: `getPublicEvents`, `getNotifications`, `markNotificationAsRead`, `getStarred`, `starRepo`, `unstarRepo`, `getWatching`, `watchRepo`, `unwatchRepo`
- **me**: `getAuthenticatedUser`, `updateAuthenticatedUser`, `getMyRepos`, `getMyOrgs`, `getMyGists`, `getMyFollowers`, `getMyFollowing`, `followUser`, `unfollowUser`, `getMyEmails`, `getMySSHKeys`, `addSSHKey`, `deleteSSHKey`
- **stats**: `getContributorStats`, `getCommitActivity`, `getCodeFrequency`, `getParticipation`, `getPunchCard`
- **git**: `getRef`, `getRefs`, `createRef`, `updateRef`, `deleteRef`, `getCommit`, `createCommit`, `getTree`, `createTree`, `getBlob`, `createBlob`, `getTag`, `createTag`

### Convenience Methods
- `getUser(username)` - Get user profile
- `getRepository(owner, repo)` - Get repository details
- `getRepositoryFromUrl(url)` - Get repository from GitHub URL
- `getUserCommits(username, options?)` - Get user's commit events
- `getUserLatestCommit(username)` - Get user's most recent commit
- `getUserCommitsInTimeframe(username, timeframe)` - Get commits within timeframe (e.g., "1W", "3M", "1Y")
- `getRepositoryStars(owner, repo)` - Get star count for repository
- `getUserStarredCount(username)` - Get count of repos starred by user
- `getUserStats(username)` - Get comprehensive user statistics
- `searchRepositories(query, options?)` - Search for repositories
- `getUserActivity(username, options?)` - Get user's activity events

## 🦊 GitLab Module

### Resource Methods (Direct Access)
- **users**: `getUser`, `getUserProjects`, `getUserSnippets`, `getUserEvents`, `getUserContributedProjects`, `getUserStarredProjects`, `getUserMemberships`, `getUserFollowers`, `getUserFollowing`, `getCurrentUser`, `searchUsers`
- **projects**: `getProject`, `getProjectCommits`, `getProjectCommit`, `getProjectBranches`, `getProjectTags`, `getProjectReleases`, `getProjectMembers`, `getProjectIssues`, `getProjectIssue`, `getProjectMergeRequests`, `getProjectMergeRequest`, `getProjectContributors`, `getProjectLanguages`, `getProjectRepository`, `getProjectFile`, `getProjectReadme`, `getProjectVariables`, `getProjectPipelines`, `getProjectJobs`, `getProjectEnvironments`, `createProject`, `updateProject`, `deleteProject`, `createProjectIssue`, `updateProjectIssue`, `createProjectMergeRequest`, `updateProjectMergeRequest`, `starProject`, `unstarProject`, `forkProject`
- **groups**: `getGroup`, `getGroupProjects`, `getGroupMembers`, `getGroupSubgroups`, `getGroupVariables`, `getGroupEpics`, `createGroup`, `updateGroup`, `deleteGroup`, `searchGroups`
- **search**: `searchProjects`, `searchGroups`, `searchUsers`, `searchSnippets`, `searchIssues`, `searchMergeRequests`, `searchMilestones`, `searchWiki`, `searchCommits`, `searchBlobs`
- **snippets**: `getPublicSnippets`, `getSnippet`, `getSnippetContent`, `createSnippet`, `updateSnippet`, `deleteSnippet`, `getUserSnippets`
- **issues**: `getIssues`, `getIssue`, `createIssue`, `updateIssue`, `deleteIssue`, `getIssueNotes`, `createIssueNote`
- **merge_requests**: `getMergeRequests`, `getMergeRequest`, `createMergeRequest`, `updateMergeRequest`, `deleteMergeRequest`, `acceptMergeRequest`, `getMergeRequestNotes`, `createMergeRequestNote`, `getMergeRequestCommits`, `getMergeRequestChanges`
- **pipelines**: `getPipelines`, `getPipeline`, `createPipeline`, `deletePipeline`, `retryPipeline`, `cancelPipeline`, `getPipelineJobs`, `getPipelineVariables`
- **activity**: `getEvents`, `getUserEvents`, `getProjectEvents`, `getTodos`, `markTodoAsDone`, `markAllTodosAsDone`
- **me**: `getCurrentUser`, `getUserProjects`, `getUserStarredProjects`, `getUserGPGKeys`, `getUserSSHKeys`, `addSSHKey`, `deleteSSHKey`, `getUserEmails`, `addEmail`, `deleteEmail`, `getUserMemberships`, `getUserStatus`, `setUserStatus`

### Convenience Methods
- `getUser(id)` - Get user profile by ID or username
- `getProject(id)` - Get project details by ID or path
- `getProjectFromUrl(url)` - Get project from GitLab URL
- `getUserCommits(userId, options?)` - Get user's commit events
- `getUserLatestCommit(userId)` - Get user's most recent commit
- `getUserCommitsInTimeframe(userId, timeframe)` - Get commits within timeframe (e.g., "1W", "3M", "1Y")
- `getProjectStars(projectId)` - Get star count for project
- `getUserStarredCount(userId)` - Get count of projects starred by user
- `getUserStats(userId)` - Get comprehensive user statistics
- `searchProjects(query, options?)` - Search for projects
- `getUserActivity(userId, options?)` - Get user's activity events
- `getGroup(id)` - Get group details by ID or path
- `searchGroups(query, options?)` - Search for groups
- `getCurrentUser()` - Get authenticated user details

## 📦 NPM Module

### Resource Methods (Direct Access)
- **packages**: `getPackage`, `getPackageVersion`, `getPackageVersions`, `getPackageTarball`
- **search**: `searchPackages`
- **users**: `getUser`

### Convenience Methods
- `getPackage(packageName)` - Get package metadata
- `getPackageVersion(packageName, version)` - Get specific version info
- `getLatestVersion(packageName)` - Get latest version number
- `getPackageDownloads(packageName, period?)` - Get download statistics
- `getPackageSize(packageName)` - Get package size information
- `searchPackages(query, options?)` - Search NPM registry
- `getPackageDependencies(packageName, version?)` - Get all dependency types
- `getPackageStats(packageName)` - Get comprehensive package statistics
- `isPackageDeprecated(packageName)` - Check if package is deprecated
- `getPackageMaintainers(packageName)` - Get list of maintainers
- `getPackageKeywords(packageName)` - Get package keywords
- `getPackageReadme(packageName)` - Get package README content

## 🎵 Spotify Module

### Resource Methods (Direct Access)
- **tracks**: `getTrack`, `getTracks`, `getTrackAudioFeatures`, `getTrackAudioAnalysis`
- **artists**: `getArtist`, `getArtists`, `getArtistAlbums`, `getArtistTopTracks`, `getArtistRelatedArtists`
- **albums**: `getAlbum`, `getAlbums`, `getAlbumTracks`
- **playlists**: `getPlaylist`, `getPlaylistTracks`, `createPlaylist`, `updatePlaylist`, `addTracksToPlaylist`, `removeTracksFromPlaylist`, `getFeaturedPlaylists`, `getCategoryPlaylists`
- **search**: `search`
- **users**: `getUser`, `getUserPlaylists`
- **me**: `getCurrentUser`, `getMyTopArtists`, `getMyTopTracks`, `getMyPlaylists`, `getMySavedTracks`, `getMySavedAlbums`, `getMySavedShows`, `getMyRecentlyPlayed`, `getFollowedArtists`, `saveTracks`, `removeSavedTracks`, `saveAlbums`, `removeSavedAlbums`, `followArtists`, `unfollowArtists`, `followPlaylist`, `unfollowPlaylist`
- **player**: `getPlaybackState`, `getCurrentlyPlaying`, `getDevices`, `play`, `pause`, `next`, `previous`, `seek`, `setVolume`, `setRepeat`, `setShuffle`, `transferPlayback`, `addToQueue`
- **browse**: `getNewReleases`, `getFeaturedPlaylists`, `getCategories`, `getCategory`, `getCategoryPlaylists`, `getRecommendations`, `getAvailableGenreSeeds`

### Convenience Methods
- `getTrack(trackId)` - Get track details
- `getArtist(artistId)` - Get artist details
- `getAlbum(albumId)` - Get album details
- `getPlaylist(playlistId)` - Get playlist details
- `search(query, types, options?)` - Multi-type search
- `getMyTopTracks(options?)` - Get user's top tracks
- `getMyTopArtists(options?)` - Get user's top artists
- `getRecentlyPlayed(options?)` - Get recently played tracks
- `getCurrentlyPlaying()` - Get currently playing track
- `getRecommendations(options)` - Get track recommendations
- `createPlaylist(userId, name, options?)` - Create new playlist
- `addTracksToPlaylist(playlistId, trackUris)` - Add tracks to playlist
- `playTrack(trackUri, deviceId?)` - Start playing a track
- `pausePlayback()` - Pause playback
- `skipToNext()` - Skip to next track
- `skipToPrevious()` - Skip to previous track
- `getUserPlaylists(userId?)` - Get user's playlists
- `getAudioFeatures(trackId)` - Get audio features for track
- `searchTracks(query, options?)` - Search for tracks
- `searchArtists(query, options?)` - Search for artists
- `searchAlbums(query, options?)` - Search for albums
- `searchPlaylists(query, options?)` - Search for playlists

## ▲ Vercel Module

### Resource Methods (Direct Access)
- **projects**: `listProjects`, `getProject`, `createProject`, `updateProject`, `deleteProject`, `getProjectDomains`, `getProjectEnvVars`, `createProjectEnvVar`
- **deployments**: `listDeployments`, `getDeployment`, `deleteDeployment`, `getDeploymentEvents`, `getDeploymentFiles`, `cancelDeployment`
- **domains**: `listDomains`, `getDomain`, `addDomain`, `removeDomain`, `verifyDomain`, `getDomainConfig`
- **teams**: `listTeams`, `getTeam`, `createTeam`, `updateTeam`, `deleteTeam`, `getTeamMembers`, `inviteTeamMember`
- **user**: `getUser`, `updateUser`, `deleteUser`, `getUserEvents`, `getUserTokens`

### Convenience Methods
- `getProject(projectId)` - Get project details
- `listProjects(teamId?)` - List all projects
- `getLatestDeployment(projectId)` - Get most recent deployment
- `getDeploymentStatus(deploymentId)` - Get deployment status
- `redeployProject(projectId)` - Redeploy a project
- `getProjectAnalytics(projectId, options?)` - Get project analytics (currently returns mock data)
- `getDomainStatus(domain)` - Get domain verification status
- `getTeamUsage(teamId)` - Get team usage statistics

## 📅 Google Calendar Module (Fixed)

### Resource Methods (Direct Access)
- **calendarList**: `listCalendars`, `getCalendarListEntry`, `insertCalendarListEntry`, `updateCalendarListEntry`, `patchCalendarListEntry`, `deleteCalendarListEntry`
- **calendars**: `getCalendar`, `insertCalendar`, `updateCalendar`, `patchCalendar`, `deleteCalendar`, `clearCalendar`
- **events**: `listEvents`, `getEvent`, `insertEvent`, `updateEvent`, `patchEvent`, `deleteEvent`, `moveEvent`, `watchEvents`, `quickAddEvent`, `getEventInstances`
- **freebusy**: `queryFreeBusy`
- **colors**: `getColors`
- **acl**: `listAcl`, `getAclRule`, `insertAclRule`, `updateAclRule`, `patchAclRule`, `deleteAclRule`
- **settings**: `listSettings`, `getSetting`, `watchSettings`

### Convenience Methods
- `getCalendars()` - Get all user calendars
- `getCalendar(calendarId)` - Get specific calendar
- `getEvents(calendarId?, options?)` - Get calendar events
- `getEvent(calendarId, eventId)` - Get specific event
- `getUpcomingEvents(calendarId?, maxResults?)` - Get upcoming events
- `getEventsInDateRange(calendarId, startDate, endDate)` - Get events in date range
- `getTodaysEvents(calendarId?)` - Get today's events
- `searchEvents(query, calendarId?, maxResults?)` - Search for events
- `getColors()` - Get available calendar colors
- `getFreeBusy(params)` - Query free/busy information
- `isTimeSlotBusy(calendarId, startTime, endTime)` - Check if time slot is busy
- `getAllCalendarEvents(maxResults?)` - Get events from all calendars
- `createEvent(calendarId, event)` - Create new event
- `updateEvent(calendarId, eventId, event)` - Update existing event
- `deleteEvent(calendarId, eventId)` - Delete event
- `quickAddEvent(calendarId, text)` - Quick add event from text

## 🗂️ Google Drive Module

### Resource Methods (Direct Access)
- **files**: `listFiles`, `getFile`, `createFile`, `updateFile`, `deleteFile`, `copyFile`, `moveFile`, `exportFile`, `downloadFile`, `generateIds`, `watchFile`, `emptyTrash`, `getFileMetadata`, `updateFileMetadata`
- **permissions**: `listPermissions`, `getPermission`, `createPermission`, `updatePermission`, `deletePermission`
- **comments**: `listComments`, `getComment`, `createComment`, `updateComment`, `deleteComment`
- **replies**: `listReplies`, `getReply`, `createReply`, `updateReply`, `deleteReply`
- **revisions**: `listRevisions`, `getRevision`, `updateRevision`, `deleteRevision`
- **drives**: `listDrives`, `getDrive`, `createDrive`, `updateDrive`, `deleteDrive`, `hideDrive`, `unhideDrive`
- **changes**: `listChanges`, `getStartPageToken`, `watchChanges`
- **channels**: `stopChannel`
- **about**: `getAbout`

### Convenience Methods
- `listFiles(options?)` - List all files with optional filters
- `getFile(fileId)` - Get file metadata
- `createFile(metadata, content?)` - Create new file
- `updateFile(fileId, metadata?, content?)` - Update file metadata or content
- `deleteFile(fileId)` - Delete file
- `copyFile(fileId, name?)` - Copy file with optional new name
- `moveFile(fileId, parentId)` - Move file to different folder
- `downloadFile(fileId)` - Download file content
- `exportFile(fileId, mimeType)` - Export Google Workspace file to different format
- `createFolder(name, parentId?)` - Create new folder
- `listFolders()` - List all folders
- `getFolderContents(folderId)` - Get contents of specific folder
- `searchFiles(query)` - Search files by name
- `getFilesByName(name)` - Get files with exact name
- `getFilesByType(mimeType)` - Get files of specific MIME type
- `getSharedFiles()` - Get files shared with user
- `getRecentFiles(days?)` - Get recently modified files
- `getStorageQuota()` - Get storage usage information
- `shareFile(fileId, email, role?)` - Share file with user
- `unshareFile(fileId, permissionId)` - Remove file sharing
- `getFilePermissions(fileId)` - Get file permissions list
- `emptyTrash()` - Empty trash permanently
- `restoreFile(fileId)` - Restore file from trash
- `permanentlyDeleteFile(fileId)` - Permanently delete file

## Usage Pattern

All modules follow the same initialization and usage pattern:

```typescript
import { GitHub, NPM, Spotify, Vercel, GoogleCalendar, GoogleDrive } from '@remcostoeten/fync'

// Initialize with authentication
const github = GitHub({ token: process.env.GITHUB_TOKEN })
const npm = NPM() // No auth required
const spotify = Spotify({ token: process.env.SPOTIFY_TOKEN })
const vercel = Vercel({ token: process.env.VERCEL_TOKEN, teamId: 'optional-team-id' })
const calendar = GoogleCalendar({ token: process.env.GOOGLE_TOKEN })
const drive = GoogleDrive({ token: process.env.GOOGLE_TOKEN })

// Use convenience methods
const user = await github.getUser('username')
const package = await npm.getPackage('react')
const track = await spotify.getTrack('track-id')
const project = await vercel.getProject('project-id')
const events = await calendar.getTodaysEvents()
const files = await drive.listFiles()

// Or access resources directly
const issues = await github.repos.getRepoIssues({ owner: 'facebook', repo: 'react' })
const searchResults = await npm.search.searchPackages({ text: 'typescript' })
const playlist = await spotify.playlists.getPlaylist({ playlist_id: 'id' })
const deployments = await vercel.deployments.listDeployments({ projectId: 'id' })
const calendarList = await calendar.calendarList.listCalendars()
const driveFiles = await drive.files.listFiles({ q: 'name contains "document"' })
```
