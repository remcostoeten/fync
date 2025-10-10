# Fync Methods Documentation

Complete reference for all methods available in the Fync library across all 9 supported providers.

---

## GitHub

### User Methods

#### `getUser(username: string)`
Fetches detailed information about a specific GitHub user including profile data, public repositories count, followers, and more.
- **Required**: `username` (string) - GitHub username
- **Returns**: User object with profile information

#### `getUserRepos(username: string)`
Retrieves all public repositories for a specified user.
- **Required**: `username` (string) - GitHub username  
- **Returns**: Array of repository objects

#### `getUserGists(username: string)`
Gets all public gists created by a user.
- **Required**: `username` (string) - GitHub username
- **Returns**: Array of gist objects

#### `getUserFollowers(username: string)`
Lists all followers of a specified user.
- **Required**: `username` (string) - GitHub username
- **Returns**: Array of user objects

#### `getUserFollowing(username: string)`
Lists all users that the specified user is following.
- **Required**: `username` (string) - GitHub username
- **Returns**: Array of user objects

#### `getUserStarred(username: string)`
Gets all repositories starred by a user.
- **Required**: `username` (string) - GitHub username
- **Returns**: Array of starred repository objects

#### `getUserOrgs(username: string)`
Lists all organizations that a user belongs to.
- **Required**: `username` (string) - GitHub username
- **Returns**: Array of organization objects

#### `getUserEvents(username: string)`
Fetches recent public events performed by a user.
- **Required**: `username` (string) - GitHub username
- **Optional**: `per_page` (number) - Number of results per page
- **Returns**: Array of event objects

#### `getUserReceivedEvents(username: string)`
Gets events received by a user (events on repos they watch).
- **Required**: `username` (string) - GitHub username
- **Returns**: Array of event objects

#### `checkUserFollowing(username: string, target: string)`
Checks if a user follows another user.
- **Required**: `username` (string) - GitHub username to check
- **Required**: `target` (string) - Target username
- **Returns**: Boolean or status code

#### `getUserCommits(username: string, options?: {limit?: number})`
Retrieves commit events from a user's activity filtered from their push events.
- **Required**: `username` (string) - GitHub username
- **Optional**: `limit` (number) - Maximum number of commits to retrieve
- **Returns**: Array of push events containing commits

#### `getUserLatestCommit(username: string)`
Gets the most recent commit made by a user.
- **Required**: `username` (string) - GitHub username
- **Returns**: Latest commit event object or null

#### `getUserCommitsInTimeframe(username: string, timeframe: string)`
Fetches user commits within a specific timeframe (e.g., "7D", "1M", "1Y").
- **Required**: `username` (string) - GitHub username
- **Required**: `timeframe` (string) - Time period (format: number + D/W/M/Y)
- **Returns**: Array of push events within timeframe

#### `getUserStarredCount(username: string)`
Returns the total number of repositories starred by a user.
- **Required**: `username` (string) - GitHub username
- **Returns**: Number representing count of starred repos

#### `getUserStats(username: string)`
Compiles comprehensive statistics about a user including repos, stars, commits, and followers.
- **Required**: `username` (string) - GitHub username
- **Returns**: Object with totalRepos, totalStars, recentCommits, publicRepos, publicGists, followers, following

#### `getUserActivity(username: string, options?: any)`
Gets all recent activity events for a user.
- **Required**: `username` (string) - GitHub username
- **Optional**: Various query parameters
- **Returns**: Array of activity events

### Repository Methods

#### `getRepo(owner: string, repo: string)`
Fetches complete details about a specific repository.
- **Required**: `owner` (string) - Repository owner username
- **Required**: `repo` (string) - Repository name
- **Returns**: Repository object with all metadata

#### `getRepository(owner: string, repo: string)`
Alias for getRepo method.
- **Required**: `owner` (string) - Repository owner username
- **Required**: `repo` (string) - Repository name
- **Returns**: Repository object

#### `getRepositoryFromUrl(url: string)`
Extracts repository details from a GitHub URL and fetches the repository information.
- **Required**: `url` (string) - Full GitHub repository URL
- **Returns**: Repository object

#### `getRepoCommits(owner: string, repo: string)`
Lists all commits in a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of commit objects

#### `getRepoCommit(owner: string, repo: string, sha: string)`
Gets details of a specific commit.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `sha` (string) - Commit SHA hash
- **Returns**: Detailed commit object

#### `getRepoBranches(owner: string, repo: string)`
Lists all branches in a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of branch objects

#### `getRepoTags(owner: string, repo: string)`
Gets all tags in a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of tag objects

#### `getRepoReleases(owner: string, repo: string)`
Lists all releases for a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of release objects

#### `getRepoLatestRelease(owner: string, repo: string)`
Gets the most recent release for a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Latest release object

#### `getRepoContributors(owner: string, repo: string)`
Lists all contributors to a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of contributor objects

#### `getRepoLanguages(owner: string, repo: string)`
Gets programming languages used in the repository with byte counts.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Object mapping language names to byte counts

#### `getRepoTopics(owner: string, repo: string)`
Fetches repository topics/tags.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of topic strings

#### `getRepoStargazers(owner: string, repo: string)`
Lists users who have starred the repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of user objects

#### `getRepoForks(owner: string, repo: string)`
Gets all forks of a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of fork repository objects

#### `getRepoIssues(owner: string, repo: string)`
Lists all issues in a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of issue objects

#### `getRepoIssue(owner: string, repo: string, issue_number: number)`
Gets a specific issue by its number.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `issue_number` (number) - Issue number
- **Returns**: Issue object

#### `getRepoPulls(owner: string, repo: string)`
Lists all pull requests in a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of pull request objects

#### `getRepoPull(owner: string, repo: string, pull_number: number)`
Gets a specific pull request.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `pull_number` (number) - Pull request number
- **Returns**: Pull request object

#### `getRepoContents(owner: string, repo: string, path: string)`
Fetches contents of a file or directory in the repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `path` (string) - File or directory path
- **Returns**: File/directory contents

#### `getRepoReadme(owner: string, repo: string)`
Gets the README file of a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: README file object

#### `createRepoIssue(owner: string, repo: string, data: object)`
Creates a new issue in a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - Issue data including title, body, labels
- **Returns**: Created issue object

#### `updateRepoIssue(owner: string, repo: string, issue_number: number, data: object)`
Updates an existing issue.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `issue_number` (number) - Issue number to update
- **Required**: `data` (object) - Updated issue data
- **Returns**: Updated issue object

#### `createRepoPull(owner: string, repo: string, data: object)`
Creates a new pull request.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - PR data including title, head, base, body
- **Returns**: Created pull request object

#### `getRepositoryStars(owner: string, repo: string)`
Returns the star count for a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Number of stars

### Search Methods

#### `searchRepos(query: string, options?: any)`
Searches for repositories matching a query.
- **Required**: `query` (string) - Search query
- **Optional**: `sort` (string), `order` (string), pagination options
- **Returns**: Search results with repositories

#### `searchCode(query: string)`
Searches for code across GitHub repositories.
- **Required**: `query` (string) - Code search query
- **Returns**: Code search results

#### `searchIssues(query: string)`
Searches for issues and pull requests.
- **Required**: `query` (string) - Search query
- **Returns**: Issues search results

#### `searchUsers(query: string)`
Searches for users on GitHub.
- **Required**: `query` (string) - User search query
- **Returns**: User search results

#### `searchTopics(query: string)`
Searches for repository topics.
- **Required**: `query` (string) - Topic search query
- **Returns**: Topic search results

#### `searchLabels(query: string)`
Searches for issue labels.
- **Required**: `query` (string) - Label search query
- **Returns**: Label search results

#### `searchCommits(query: string)`
Searches commit messages and hashes.
- **Required**: `query` (string) - Commit search query
- **Returns**: Commit search results

#### `searchRepositories(query: string, options?: any)`
Alias for searchRepos with additional options.
- **Required**: `query` (string) - Search query
- **Optional**: Advanced search options
- **Returns**: Repository search results

### Gist Methods

#### `getPublicGists()`
Lists publicly available gists.
- **Returns**: Array of public gist objects

#### `getUserGists(username: string)`
Gets all gists for a specific user.
- **Required**: `username` (string) - Username
- **Returns**: Array of user's gist objects

#### `getGist(gist_id: string)`
Fetches a specific gist by ID.
- **Required**: `gist_id` (string) - Gist identifier
- **Returns**: Gist object

#### `createGist(data: object)`
Creates a new gist.
- **Required**: `data` (object) - Gist data including files, description, public flag
- **Returns**: Created gist object

#### `updateGist(gist_id: string, data: object)`
Updates an existing gist.
- **Required**: `gist_id` (string) - Gist identifier
- **Required**: `data` (object) - Updated gist data
- **Returns**: Updated gist object

#### `deleteGist(gist_id: string)`
Deletes a gist.
- **Required**: `gist_id` (string) - Gist identifier
- **Returns**: Deletion confirmation

#### `getGistComments(gist_id: string)`
Gets all comments on a gist.
- **Required**: `gist_id` (string) - Gist identifier
- **Returns**: Array of comment objects

#### `createGistComment(gist_id: string, body: string)`
Adds a comment to a gist.
- **Required**: `gist_id` (string) - Gist identifier
- **Required**: `body` (string) - Comment text
- **Returns**: Created comment object

### Organization Methods

#### `getOrg(org: string)`
Gets organization details.
- **Required**: `org` (string) - Organization name
- **Returns**: Organization object

#### `getOrgRepos(org: string)`
Lists all repositories in an organization.
- **Required**: `org` (string) - Organization name
- **Returns**: Array of repository objects

#### `getOrgMembers(org: string)`
Lists organization members.
- **Required**: `org` (string) - Organization name
- **Returns**: Array of member objects

#### `getOrgTeams(org: string)`
Gets all teams in an organization.
- **Required**: `org` (string) - Organization name
- **Returns**: Array of team objects

#### `getOrgProjects(org: string)`
Lists organization projects.
- **Required**: `org` (string) - Organization name
- **Returns**: Array of project objects

#### `getOrgEvents(org: string)`
Gets recent public events for an organization.
- **Required**: `org` (string) - Organization name
- **Returns**: Array of event objects

#### `checkOrgMembership(org: string, username: string)`
Checks if a user is a member of an organization.
- **Required**: `org` (string) - Organization name
- **Required**: `username` (string) - Username to check
- **Returns**: Membership status

### Authenticated User Methods

#### `getAuthenticatedUser()`
Gets profile information for the authenticated user.
- **Returns**: Current user object

#### `updateAuthenticatedUser(data: object)`
Updates authenticated user's profile.
- **Required**: `data` (object) - Profile updates
- **Returns**: Updated user object

#### `getMyRepos()`
Lists authenticated user's repositories.
- **Returns**: Array of repository objects

#### `getMyOrgs()`
Lists organizations the authenticated user belongs to.
- **Returns**: Array of organization objects

#### `getMyGists()`
Gets authenticated user's gists.
- **Returns**: Array of gist objects

#### `getMyFollowers()`
Lists authenticated user's followers.
- **Returns**: Array of user objects

#### `getMyFollowing()`
Lists users the authenticated user follows.
- **Returns**: Array of user objects

#### `followUser(username: string)`
Follows a user.
- **Required**: `username` (string) - Username to follow
- **Returns**: Success confirmation

#### `unfollowUser(username: string)`
Unfollows a user.
- **Required**: `username` (string) - Username to unfollow
- **Returns**: Success confirmation

#### `getMyEmails()`
Lists authenticated user's email addresses.
- **Returns**: Array of email objects

#### `getMySSHKeys()`
Gets authenticated user's SSH keys.
- **Returns**: Array of SSH key objects

#### `addSSHKey(data: object)`
Adds an SSH key to authenticated user's account.
- **Required**: `data` (object) - SSH key data including title and key
- **Returns**: Created SSH key object

#### `deleteSSHKey(key_id: string)`
Removes an SSH key.
- **Required**: `key_id` (string) - SSH key identifier
- **Returns**: Deletion confirmation

### Activity Methods

#### `getPublicEvents()`
Gets recent public events across GitHub.
- **Returns**: Array of public event objects

#### `getNotifications()`
Gets authenticated user's notifications.
- **Returns**: Array of notification objects

#### `markNotificationAsRead(notification_id: string)`
Marks a notification as read.
- **Required**: `notification_id` (string) - Notification identifier
- **Returns**: Success confirmation

#### `getStarred()`
Lists repositories starred by authenticated user.
- **Returns**: Array of starred repository objects

#### `starRepo(owner: string, repo: string)`
Stars a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Success confirmation

#### `unstarRepo(owner: string, repo: string)`
Unstars a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Success confirmation

#### `getWatching()`
Lists repositories the authenticated user is watching.
- **Returns**: Array of watched repository objects

#### `watchRepo(owner: string, repo: string)`
Watches a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Success confirmation

#### `unwatchRepo(owner: string, repo: string)`
Unwatches a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Success confirmation

### Statistics Methods

#### `getContributorStats(owner: string, repo: string)`
Gets contributor statistics for a repository.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of contributor stats

#### `getCommitActivity(owner: string, repo: string)`
Gets commit activity over time.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Commit activity data

#### `getCodeFrequency(owner: string, repo: string)`
Gets code frequency (additions and deletions per week).
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Code frequency data

#### `getParticipation(owner: string, repo: string)`
Gets participation data (commits by owner vs all).
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Participation statistics

#### `getPunchCard(owner: string, repo: string)`
Gets punch card data (commits by hour and day).
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Punch card data array

### Git Data Methods

#### `getRef(owner: string, repo: string, ref: string)`
Gets a reference (branch/tag).
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `ref` (string) - Reference name
- **Returns**: Reference object

#### `getRefs(owner: string, repo: string)`
Lists all references.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Returns**: Array of reference objects

#### `createRef(owner: string, repo: string, data: object)`
Creates a reference.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - Reference data
- **Returns**: Created reference object

#### `updateRef(owner: string, repo: string, ref: string, data: object)`
Updates a reference.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `ref` (string) - Reference name
- **Required**: `data` (object) - Update data
- **Returns**: Updated reference object

#### `deleteRef(owner: string, repo: string, ref: string)`
Deletes a reference.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `ref` (string) - Reference name
- **Returns**: Deletion confirmation

#### `getCommit(owner: string, repo: string, commit_sha: string)`
Gets Git commit object.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `commit_sha` (string) - Commit SHA
- **Returns**: Git commit object

#### `createCommit(owner: string, repo: string, data: object)`
Creates a Git commit.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - Commit data
- **Returns**: Created commit object

#### `getTree(owner: string, repo: string, tree_sha: string)`
Gets a Git tree object.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `tree_sha` (string) - Tree SHA
- **Returns**: Tree object

#### `createTree(owner: string, repo: string, data: object)`
Creates a Git tree.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - Tree data
- **Returns**: Created tree object

#### `getBlob(owner: string, repo: string, file_sha: string)`
Gets a Git blob (file content).
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `file_sha` (string) - File SHA
- **Returns**: Blob object

#### `createBlob(owner: string, repo: string, data: object)`
Creates a Git blob.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - Blob data
- **Returns**: Created blob object

#### `getTag(owner: string, repo: string, tag_sha: string)`
Gets a Git tag object.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `tag_sha` (string) - Tag SHA
- **Returns**: Tag object

#### `createTag(owner: string, repo: string, data: object)`
Creates a Git tag.
- **Required**: `owner` (string) - Repository owner
- **Required**: `repo` (string) - Repository name
- **Required**: `data` (object) - Tag data
- **Returns**: Created tag object

---

## NPM

### Package Methods

#### `getPackage(packageName: string)`
Fetches complete package information including all versions and metadata.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Full package object with all version data

#### `getPackageVersion(packageName: string, version: string)`
Gets information about a specific version of a package.
- **Required**: `packageName` (string) - NPM package name
- **Required**: `version` (string) - Semantic version
- **Returns**: Version-specific package data

#### `getLatestVersion(packageName: string)`
Returns the latest version number of a package.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Version string

#### `getPackageDownloads(packageName: string, period?: string)`
Gets download statistics for a package over a specified period.
- **Required**: `packageName` (string) - NPM package name
- **Optional**: `period` (string) - Time period (default: "last-month")
- **Returns**: Download statistics object

#### `getPackageSize(packageName: string)`
Retrieves size information for the latest version of a package.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Object with unpackedSize, fileCount, tarballSize

#### `searchPackages(query: string, options?: any)`
Searches for packages matching a query string.
- **Required**: `query` (string) - Search query
- **Optional**: `size` (number), `from` (number), `quality` (number)
- **Returns**: Search results with package objects

#### `getPackageDependencies(packageName: string, version?: string)`
Gets all dependencies for a package version.
- **Required**: `packageName` (string) - NPM package name
- **Optional**: `version` (string) - Specific version (default: latest)
- **Returns**: Object with dependencies, devDependencies, peerDependencies, optionalDependencies

#### `getPackageStats(packageName: string)`
Compiles comprehensive statistics about a package.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Object with name, version, description, license, downloads, maintainers count, creation date, keywords

#### `isPackageDeprecated(packageName: string)`
Checks if the latest version of a package is deprecated.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Boolean indicating deprecation status

#### `getPackageMaintainers(packageName: string)`
Lists all maintainers of a package.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Array of maintainer objects

#### `getPackageKeywords(packageName: string)`
Gets all keywords associated with a package.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: Array of keyword strings

#### `getPackageReadme(packageName: string)`
Fetches the README content of a package.
- **Required**: `packageName` (string) - NPM package name
- **Returns**: README string

---

## GitLab

### User Methods

#### `getUser(id: string | number)`
Fetches user information by user ID.
- **Required**: `id` (string | number) - User ID
- **Returns**: User object with profile data

#### `getUserProjects(id: string | number)`
Lists all projects owned by a user.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of project objects

#### `getUserSnippets(id: string | number)`
Gets all code snippets created by a user.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of snippet objects

#### `getUserEvents(id: string | number)`
Fetches recent events/activity for a user.
- **Required**: `id` (string | number) - User ID
- **Optional**: `per_page` (number) - Results per page
- **Returns**: Array of event objects

#### `getUserContributedProjects(id: string | number)`
Lists projects a user has contributed to.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of project objects

#### `getUserStarredProjects(id: string | number)`
Gets projects starred by a user.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of starred project objects

#### `getUserMemberships(id: string | number)`
Lists group and project memberships for a user.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of membership objects

#### `getUserFollowers(id: string | number)`
Gets users following the specified user.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of follower user objects

#### `getUserFollowing(id: string | number)`
Lists users that the specified user is following.
- **Required**: `id` (string | number) - User ID
- **Returns**: Array of user objects

#### `getCurrentUser()`
Gets information about the authenticated user.
- **Returns**: Current user object

#### `searchUsers(query: string)`
Searches for users by name or username.
- **Required**: `query` (string) - Search query
- **Returns**: Array of user search results

#### `getUserCommits(userId: string | number, options?: any)`
Retrieves push events (commits) from a user's activity.
- **Required**: `userId` (string | number) - User ID
- **Optional**: `limit` (number) - Maximum results
- **Returns**: Array of push events

#### `getUserLatestCommit(userId: string | number)`
Gets the most recent commit made by a user.
- **Required**: `userId` (string | number) - User ID
- **Returns**: Latest commit event or null

#### `getUserCommitsInTimeframe(userId: string | number, timeframe: string)`
Fetches user commits within a specific time period.
- **Required**: `userId` (string | number) - User ID
- **Required**: `timeframe` (string) - Time period (e.g., "7D", "1M")
- **Returns**: Array of push events within timeframe

#### `getUserStarredCount(userId: string | number)`
Returns the count of projects starred by a user.
- **Required**: `userId` (string | number) - User ID
- **Returns**: Number of starred projects

#### `getUserStats(userId: string | number)`
Compiles comprehensive user statistics.
- **Required**: `userId` (string | number) - User ID
- **Returns**: Object with totalProjects, totalStars, recentCommits, publicProjects, followers, following

#### `getUserActivity(userId: string | number, options?: any)`
Gets all recent activity for a user.
- **Required**: `userId` (string | number) - User ID
- **Optional**: Query options
- **Returns**: Array of activity events

### Project Methods

#### `getProject(id: string | number)`
Fetches detailed information about a project.
- **Required**: `id` (string | number) - Project ID or namespace/project path
- **Returns**: Project object

#### `getProjectFromUrl(url: string)`
Extracts project details from a GitLab URL and fetches the project.
- **Required**: `url` (string) - GitLab project URL
- **Returns**: Project object

#### `getProjectCommits(id: string | number)`
Lists all commits in a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of commit objects

#### `getProjectCommit(id: string | number, sha: string)`
Gets details of a specific commit.
- **Required**: `id` (string | number) - Project ID
- **Required**: `sha` (string) - Commit SHA
- **Returns**: Commit object

#### `getProjectBranches(id: string | number)`
Lists all branches in a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of branch objects

#### `getProjectTags(id: string | number)`
Gets all tags in a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of tag objects

#### `getProjectReleases(id: string | number)`
Lists all releases for a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of release objects

#### `getProjectMembers(id: string | number)`
Lists all members of a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of member objects

#### `getProjectIssues(id: string | number)`
Gets all issues in a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of issue objects

#### `getProjectIssue(id: string | number, issue_iid: number)`
Fetches a specific issue.
- **Required**: `id` (string | number) - Project ID
- **Required**: `issue_iid` (number) - Issue internal ID
- **Returns**: Issue object

#### `getProjectMergeRequests(id: string | number)`
Lists all merge requests in a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of merge request objects

#### `getProjectMergeRequest(id: string | number, merge_request_iid: number)`
Gets a specific merge request.
- **Required**: `id` (string | number) - Project ID
- **Required**: `merge_request_iid` (number) - MR internal ID
- **Returns**: Merge request object

#### `getProjectContributors(id: string | number)`
Lists project contributors.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of contributor objects

#### `getProjectLanguages(id: string | number)`
Gets programming languages used in the project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Object mapping languages to percentages

#### `getProjectRepository(id: string | number)`
Gets repository tree structure.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Repository tree data

#### `getProjectFile(id: string | number, file_path: string)`
Fetches a specific file from the repository.
- **Required**: `id` (string | number) - Project ID
- **Required**: `file_path` (string) - Path to file
- **Returns**: File object

#### `getProjectReadme(id: string | number)`
Gets the project's README file.
- **Required**: `id` (string | number) - Project ID
- **Returns**: README file object

#### `getProjectVariables(id: string | number)`
Lists all CI/CD variables for a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of variable objects

#### `getProjectPipelines(id: string | number)`
Gets all CI/CD pipelines.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of pipeline objects

#### `getProjectJobs(id: string | number)`
Lists all CI/CD jobs.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of job objects

#### `getProjectEnvironments(id: string | number)`
Gets all deployment environments.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Array of environment objects

#### `createProject(data: object)`
Creates a new project.
- **Required**: `data` (object) - Project creation data
- **Returns**: Created project object

#### `updateProject(id: string | number, data: object)`
Updates project settings.
- **Required**: `id` (string | number) - Project ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated project object

#### `deleteProject(id: string | number)`
Deletes a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Deletion confirmation

#### `createProjectIssue(id: string | number, data: object)`
Creates a new issue.
- **Required**: `id` (string | number) - Project ID
- **Required**: `data` (object) - Issue data
- **Returns**: Created issue object

#### `updateProjectIssue(id: string | number, issue_iid: number, data: object)`
Updates an issue.
- **Required**: `id` (string | number) - Project ID
- **Required**: `issue_iid` (number) - Issue internal ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated issue object

#### `createProjectMergeRequest(id: string | number, data: object)`
Creates a new merge request.
- **Required**: `id` (string | number) - Project ID
- **Required**: `data` (object) - MR data
- **Returns**: Created merge request object

#### `updateProjectMergeRequest(id: string | number, merge_request_iid: number, data: object)`
Updates a merge request.
- **Required**: `id` (string | number) - Project ID
- **Required**: `merge_request_iid` (number) - MR internal ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated merge request object

#### `starProject(id: string | number)`
Stars a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Updated project object

#### `unstarProject(id: string | number)`
Unstars a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Updated project object

#### `forkProject(id: string | number)`
Creates a fork of a project.
- **Required**: `id` (string | number) - Project ID
- **Returns**: Forked project object

#### `getProjectStars(projectId: string | number)`
Returns the star count for a project.
- **Required**: `projectId` (string | number) - Project ID
- **Returns**: Number of stars

### Group Methods

#### `getGroup(id: string | number)`
Gets group information.
- **Required**: `id` (string | number) - Group ID or path
- **Returns**: Group object

#### `getGroupProjects(id: string | number)`
Lists all projects in a group.
- **Required**: `id` (string | number) - Group ID
- **Returns**: Array of project objects

#### `getGroupMembers(id: string | number)`
Lists group members.
- **Required**: `id` (string | number) - Group ID
- **Returns**: Array of member objects

#### `getGroupSubgroups(id: string | number)`
Gets subgroups within a group.
- **Required**: `id` (string | number) - Group ID
- **Returns**: Array of subgroup objects

#### `getGroupVariables(id: string | number)`
Lists CI/CD variables at group level.
- **Required**: `id` (string | number) - Group ID
- **Returns**: Array of variable objects

#### `getGroupEpics(id: string | number)`
Gets all epics in a group.
- **Required**: `id` (string | number) - Group ID
- **Returns**: Array of epic objects

#### `createGroup(data: object)`
Creates a new group.
- **Required**: `data` (object) - Group creation data
- **Returns**: Created group object

#### `updateGroup(id: string | number, data: object)`
Updates group settings.
- **Required**: `id` (string | number) - Group ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated group object

#### `deleteGroup(id: string | number)`
Deletes a group.
- **Required**: `id` (string | number) - Group ID
- **Returns**: Deletion confirmation

#### `searchGroups(query: string, options?: any)`
Searches for groups.
- **Required**: `query` (string) - Search query
- **Optional**: Search options
- **Returns**: Array of group search results

### Search Methods

#### `searchProjects(query: string, options?: any)`
Searches for projects.
- **Required**: `query` (string) - Search query
- **Optional**: `order_by`, `sort` options
- **Returns**: Project search results

#### `searchGroups(query: string)`
Searches for groups by name or path.
- **Required**: `query` (string) - Search query
- **Returns**: Group search results

#### `searchUsers(query: string)`
Searches for users.
- **Required**: `query` (string) - Search query
- **Returns**: User search results

#### `searchSnippets(query: string)`
Searches for code snippets.
- **Required**: `query` (string) - Search query
- **Returns**: Snippet search results

#### `searchIssues(query: string)`
Searches for issues.
- **Required**: `query` (string) - Search query
- **Returns**: Issue search results

#### `searchMergeRequests(query: string)`
Searches for merge requests.
- **Required**: `query` (string) - Search query
- **Returns**: Merge request search results

#### `searchMilestones(query: string)`
Searches for milestones.
- **Required**: `query` (string) - Search query
- **Returns**: Milestone search results

#### `searchWiki(query: string)`
Searches wiki pages.
- **Required**: `query` (string) - Search query
- **Returns**: Wiki search results

#### `searchCommits(query: string)`
Searches commit messages.
- **Required**: `query` (string) - Search query
- **Returns**: Commit search results

#### `searchBlobs(query: string)`
Searches file contents.
- **Required**: `query` (string) - Search query
- **Returns**: File blob search results

### Snippet Methods

#### `getPublicSnippets()`
Lists public snippets.
- **Returns**: Array of public snippet objects

#### `getSnippet(id: string | number)`
Gets a specific snippet.
- **Required**: `id` (string | number) - Snippet ID
- **Returns**: Snippet object

#### `getSnippetContent(id: string | number)`
Fetches raw content of a snippet.
- **Required**: `id` (string | number) - Snippet ID
- **Returns**: Raw snippet content string

#### `createSnippet(data: object)`
Creates a new snippet.
- **Required**: `data` (object) - Snippet data
- **Returns**: Created snippet object

#### `updateSnippet(id: string | number, data: object)`
Updates a snippet.
- **Required**: `id` (string | number) - Snippet ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated snippet object

#### `deleteSnippet(id: string | number)`
Deletes a snippet.
- **Required**: `id` (string | number) - Snippet ID
- **Returns**: Deletion confirmation

#### `getUserSnippets()`
Gets all snippets for authenticated user.
- **Returns**: Array of user's snippet objects

### Issue Methods

#### `getIssues()`
Lists all issues visible to user.
- **Returns**: Array of issue objects

#### `getIssue(id: string | number)`
Gets a specific issue.
- **Required**: `id` (string | number) - Issue ID
- **Returns**: Issue object

#### `createIssue(data: object)`
Creates a new issue.
- **Required**: `data` (object) - Issue data
- **Returns**: Created issue object

#### `updateIssue(id: string | number, data: object)`
Updates an issue.
- **Required**: `id` (string | number) - Issue ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated issue object

#### `deleteIssue(id: string | number)`
Deletes an issue.
- **Required**: `id` (string | number) - Issue ID
- **Returns**: Deletion confirmation

#### `getIssueNotes(id: string | number)`
Gets all comments/notes on an issue.
- **Required**: `id` (string | number) - Issue ID
- **Returns**: Array of note objects

#### `createIssueNote(id: string | number, body: string)`
Adds a comment to an issue.
- **Required**: `id` (string | number) - Issue ID
- **Required**: `body` (string) - Comment text
- **Returns**: Created note object

### Merge Request Methods

#### `getMergeRequests()`
Lists all merge requests visible to user.
- **Returns**: Array of merge request objects

#### `getMergeRequest(id: string | number)`
Gets a specific merge request.
- **Required**: `id` (string | number) - MR ID
- **Returns**: Merge request object

#### `createMergeRequest(data: object)`
Creates a new merge request.
- **Required**: `data` (object) - MR data
- **Returns**: Created merge request object

#### `updateMergeRequest(id: string | number, data: object)`
Updates a merge request.
- **Required**: `id` (string | number) - MR ID
- **Required**: `data` (object) - Update data
- **Returns**: Updated merge request object

#### `deleteMergeRequest(id: string | number)`
Deletes a merge request.
- **Required**: `id` (string | number) - MR ID
- **Returns**: Deletion confirmation

#### `acceptMergeRequest(id: string | number)`
Merges a merge request.
- **Required**: `id` (string | number) - MR ID
- **Returns**: Merged merge request object

#### `getMergeRequestNotes(id: string | number)`
Gets all comments on a merge request.
- **Required**: `id` (string | number) - MR ID
- **Returns**: Array of note objects

#### `createMergeRequestNote(id: string | number, body: string)`
Adds a comment to a merge request.
- **Required**: `id` (string | number) - MR ID
- **Required**: `body` (string) - Comment text
- **Returns**: Created note object

#### `getMergeRequestCommits(id: string | number)`
Lists commits in a merge request.
- **Required**: `id` (string | number) - MR ID
- **Returns**: Array of commit objects

#### `getMergeRequestChanges(id: string | number)`
Gets diff changes in a merge request.
- **Required**: `id` (string | number) - MR ID
- **Returns**: Changes/diff object

### Pipeline Methods

#### `getPipelines(project_id: string | number)`
Lists all pipelines for a project.
- **Required**: `project_id` (string | number) - Project ID
- **Returns**: Array of pipeline objects

#### `getPipeline(project_id: string | number, id: string | number)`
Gets a specific pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `id` (string | number) - Pipeline ID
- **Returns**: Pipeline object

#### `createPipeline(project_id: string | number, data: object)`
Triggers a new pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `data` (object) - Pipeline configuration
- **Returns**: Created pipeline object

#### `deletePipeline(project_id: string | number, id: string | number)`
Deletes a pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `id` (string | number) - Pipeline ID
- **Returns**: Deletion confirmation

#### `retryPipeline(project_id: string | number, id: string | number)`
Retries a failed pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `id` (string | number) - Pipeline ID
- **Returns**: Retried pipeline object

#### `cancelPipeline(project_id: string | number, id: string | number)`
Cancels a running pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `id` (string | number) - Pipeline ID
- **Returns**: Cancelled pipeline object

#### `getPipelineJobs(project_id: string | number, id: string | number)`
Lists all jobs in a pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `id` (string | number) - Pipeline ID
- **Returns**: Array of job objects

#### `getPipelineVariables(project_id: string | number, id: string | number)`
Gets variables used in a pipeline.
- **Required**: `project_id` (string | number) - Project ID
- **Required**: `id` (string | number) - Pipeline ID
- **Returns**: Array of variable objects

### Activity Methods

#### `getEvents()`
Gets all recent events.
- **Returns**: Array of event objects

#### `getUserEvents(user_id: string | number)`
Gets events for a specific user.
- **Required**: `user_id` (string | number) - User ID
- **Returns**: Array of event objects

#### `getProjectEvents(project_id: string | number)`
Gets events for a specific project.
- **Required**: `project_id` (string | number) - Project ID
- **Returns**: Array of event objects

#### `getTodos()`
Gets authenticated user's to-do list.
- **Returns**: Array of to-do objects

#### `markTodoAsDone(id: string | number)`
Marks a to-do item as done.
- **Required**: `id` (string | number) - To-do ID
- **Returns**: Updated to-do object

#### `markAllTodosAsDone()`
Marks all to-do items as done.
- **Returns**: Success confirmation

### Authenticated User Methods

#### `getCurrentUser()`
Gets authenticated user profile.
- **Returns**: User object

#### `getUserProjects()`
Lists authenticated user's projects.
- **Returns**: Array of project objects

#### `getUserStarredProjects()`
Gets projects starred by authenticated user.
- **Returns**: Array of starred project objects

#### `getUserGPGKeys()`
Lists GPG keys for authenticated user.
- **Returns**: Array of GPG key objects

#### `getUserSSHKeys()`
Gets SSH keys for authenticated user.
- **Returns**: Array of SSH key objects

#### `addSSHKey(data: object)`
Adds an SSH key.
- **Required**: `data` (object) - SSH key data
- **Returns**: Created SSH key object

#### `deleteSSHKey(key_id: string | number)`
Removes an SSH key.
- **Required**: `key_id` (string | number) - Key ID
- **Returns**: Deletion confirmation

#### `getUserEmails()`
Lists email addresses for authenticated user.
- **Required**: None
- **Returns**: Array of email objects

#### `addEmail(data: object)`
Adds an email address.
- **Required**: `data` (object) - Email data
- **Returns**: Created email object

#### `deleteEmail(email_id: string | number)`
Removes an email address.
- **Required**: `email_id` (string | number) - Email ID
- **Returns**: Deletion confirmation

#### `getUserMemberships()`
Gets all group/project memberships.
- **Returns**: Array of membership objects

#### `getUserStatus()`
Gets authenticated user's status.
- **Returns**: Status object

#### `setUserStatus(data: object)`
Sets authenticated user's status.
- **Required**: `data` (object) - Status data
- **Returns**: Updated status object

---

## Spotify

### Track Methods

#### `getTrack(trackId: string)`
Fetches detailed information about a specific track.
- **Required**: `trackId` (string) - Spotify track ID
- **Returns**: Track object

#### `getTracks(ids: string[])`
Gets multiple tracks at once.
- **Required**: `ids` (string[]) - Array of track IDs
- **Returns**: Array of track objects

#### `getTrackAudioFeatures(trackId: string)`
Gets audio analysis features like danceability, energy, tempo.
- **Required**: `trackId` (string) - Spotify track ID
- **Returns**: Audio features object

#### `getAudioFeatures(trackId: string)`
Alias for getTrackAudioFeatures.
- **Required**: `trackId` (string) - Spotify track ID
- **Returns**: Audio features object

#### `getTrackAudioAnalysis(trackId: string)`
Gets detailed audio analysis of a track.
- **Required**: `trackId` (string) - Spotify track ID
- **Returns**: Detailed audio analysis object

### Artist Methods

#### `getArtist(artistId: string)`
Fetches artist information.
- **Required**: `artistId` (string) - Spotify artist ID
- **Returns**: Artist object

#### `getArtists(ids: string[])`
Gets multiple artists at once.
- **Required**: `ids` (string[]) - Array of artist IDs
- **Returns**: Array of artist objects

#### `getArtistAlbums(artistId: string)`
Lists all albums by an artist.
- **Required**: `artistId` (string) - Spotify artist ID
- **Returns**: Array of album objects

#### `getArtistTopTracks(artistId: string)`
Gets an artist's top tracks.
- **Required**: `artistId` (string) - Spotify artist ID
- **Returns**: Array of top track objects

#### `getArtistRelatedArtists(artistId: string)`
Finds artists similar to the given artist.
- **Required**: `artistId` (string) - Spotify artist ID
- **Returns**: Array of related artist objects

### Album Methods

#### `getAlbum(albumId: string)`
Fetches album information.
- **Required**: `albumId` (string) - Spotify album ID
- **Returns**: Album object

#### `getAlbums(ids: string[])`
Gets multiple albums at once.
- **Required**: `ids` (string[]) - Array of album IDs
- **Returns**: Array of album objects

#### `getAlbumTracks(albumId: string)`
Lists all tracks in an album.
- **Required**: `albumId` (string) - Spotify album ID
- **Returns**: Array of track objects

### Playlist Methods

#### `getPlaylist(playlistId: string)`
Fetches playlist information and tracks.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Returns**: Playlist object

#### `getPlaylistTracks(playlistId: string)`
Gets all tracks in a playlist.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Returns**: Array of playlist track objects

#### `createPlaylist(userId: string, name: string, options?: object)`
Creates a new playlist for a user.
- **Required**: `userId` (string) - Spotify user ID
- **Required**: `name` (string) - Playlist name
- **Optional**: `description` (string), `public` (boolean), `collaborative` (boolean)
- **Returns**: Created playlist object

#### `updatePlaylist(playlistId: string, options: object)`
Updates playlist details.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Required**: `options` (object) - Update data (name, description, public)
- **Returns**: Success confirmation

#### `addTracksToPlaylist(playlistId: string, trackUris: string[])`
Adds tracks to a playlist.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Required**: `trackUris` (string[]) - Array of Spotify track URIs
- **Returns**: Snapshot ID

#### `removeTracksFromPlaylist(playlistId: string, trackUris: string[])`
Removes tracks from a playlist.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Required**: `trackUris` (string[]) - Array of track URIs to remove
- **Returns**: Snapshot ID

#### `reorderPlaylistTracks(playlistId: string, rangeStart: number, insertBefore: number, rangeLength?: number)`
Reorders tracks within a playlist.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Required**: `rangeStart` (number) - Starting position
- **Required**: `insertBefore` (number) - Insert position
- **Optional**: `rangeLength` (number) - Number of tracks to move
- **Returns**: Snapshot ID

#### `replacePlaylistTracks(playlistId: string, trackUris: string[])`
Replaces all tracks in a playlist.
- **Required**: `playlistId` (string) - Spotify playlist ID
- **Required**: `trackUris` (string[]) - New track URIs
- **Returns**: Success confirmation

#### `getFeaturedPlaylists()`
Gets Spotify's featured playlists.
- **Returns**: Array of featured playlist objects

#### `getCategoryPlaylists(category_id: string)`
Gets playlists for a specific category.
- **Required**: `category_id` (string) - Category identifier
- **Returns**: Array of playlist objects

### Search Methods

#### `search(query: string, types: string[], options?: object)`
Searches Spotify catalog for tracks, artists, albums, or playlists.
- **Required**: `query` (string) - Search query
- **Required**: `types` (string[]) - Types to search (track, artist, album, playlist)
- **Optional**: `limit` (number), `offset` (number)
- **Returns**: Search results object

#### `searchTracks(query: string, options?: object)`
Searches specifically for tracks.
- **Required**: `query` (string) - Search query
- **Optional**: `limit`, `offset`
- **Returns**: Track search results

#### `searchArtists(query: string, options?: object)`
Searches for artists.
- **Required**: `query` (string) - Search query
- **Optional**: `limit`, `offset`
- **Returns**: Artist search results

#### `searchAlbums(query: string, options?: object)`
Searches for albums.
- **Required**: `query` (string) - Search query
- **Optional**: `limit`, `offset`
- **Returns**: Album search results

#### `searchPlaylists(query: string, options?: object)`
Searches for playlists.
- **Required**: `query` (string) - Search query
- **Optional**: `limit`, `offset`
- **Returns**: Playlist search results

#### `searchShows(query: string, options?: object)`
Searches for podcasts/shows.
- **Required**: `query` (string) - Search query
- **Optional**: `limit`, `offset`
- **Returns**: Show search results

#### `searchEpisodes(query: string, options?: object)`
Searches for podcast episodes.
- **Required**: `query` (string) - Search query
- **Optional**: `limit`, `offset`
- **Returns**: Episode search results

### User Methods

#### `getUser(userId: string)`
Fetches public profile information for a user.
- **Required**: `userId` (string) - Spotify user ID
- **Returns**: User profile object

#### `getUserProfile(userId: string)`
Alias for getUser.
- **Required**: `userId` (string) - Spotify user ID
- **Returns**: User profile object

#### `getUserPlaylists(userId?: string)`
Gets playlists for a user or current user if no ID provided.
- **Optional**: `userId` (string) - Spotify user ID
- **Returns**: Array of playlist objects

#### `getCurrentUser()`
Gets profile of the authenticated user.
- **Returns**: Current user profile object

#### `getCurrentUserProfile()`
Alias for getCurrentUser.
- **Returns**: Current user profile object

#### `updateUserProfile(options: object)`
Updates authenticated user's profile.
- **Required**: `options` (object) - Profile update data
- **Returns**: Updated profile object

#### `getMyTopArtists(options?: object)`
Gets user's top artists based on listening history.
- **Optional**: `timeRange` (string - short_term/medium_term/long_term), `limit`, `offset`
- **Returns**: Array of top artist objects

#### `getMyTopTracks(options?: object)`
Gets user's top tracks based on listening history.
- **Optional**: `timeRange`, `limit`, `offset`
- **Returns**: Array of top track objects

#### `getCurrentUserTopItems(type: string, options?: object)`
Gets top items (tracks or artists) for current user.
- **Required**: `type` (string) - "tracks" or "artists"
- **Optional**: Time range and pagination options
- **Returns**: Array of top items

#### `getMyPlaylists()`
Lists all playlists for the authenticated user.
- **Returns**: Array of playlist objects

#### `getMySavedTracks()`
Gets tracks saved to user's library.
- **Returns**: Array of saved track objects

#### `getMySavedAlbums()`
Gets albums saved to user's library.
- **Returns**: Array of saved album objects

#### `getMySavedShows()`
Gets podcasts/shows saved to user's library.
- **Returns**: Array of saved show objects

#### `getMyRecentlyPlayed(options?: object)`
Gets user's recently played tracks.
- **Optional**: `limit`, `after`, `before` timestamps
- **Returns**: Array of recently played track objects

#### `getRecentlyPlayed(options?: object)`
Alias for getMyRecentlyPlayed.
- **Optional**: Limit and time options
- **Returns**: Recently played tracks

#### `getFollowedArtists()`
Lists artists the user follows.
- **Returns**: Array of followed artist objects

#### `getCurrentUserFollows(type: string, ids: string[])`
Gets follow status for artists.
- **Required**: `type` (string) - Currently only "artist" supported
- **Required**: `ids` (string[]) - Artist IDs to check
- **Returns**: Follow status array

#### `saveTracks(trackIds: string[])`
Saves tracks to user's library.
- **Required**: `trackIds` (string[]) - Array of track IDs
- **Returns**: Success confirmation

#### `removeSavedTracks(trackIds: string[])`
Removes tracks from user's library.
- **Required**: `trackIds` (string[]) - Array of track IDs
- **Returns**: Success confirmation

#### `saveAlbums(albumIds: string[])`
Saves albums to user's library.
- **Required**: `albumIds` (string[]) - Array of album IDs
- **Returns**: Success confirmation

#### `removeSavedAlbums(albumIds: string[])`
Removes albums from user's library.
- **Required**: `albumIds` (string[]) - Array of album IDs
- **Returns**: Success confirmation

#### `follow(type: string, ids: string[])`
Follows artists or users.
- **Required**: `type` (string) - "artist" or "user"
- **Required**: `ids` (string[]) - IDs to follow
- **Returns**: Success confirmation

#### `followArtists(artistIds: string[])`
Follows artists.
- **Required**: `artistIds` (string[]) - Array of artist IDs
- **Returns**: Success confirmation

#### `unfollow(type: string, ids: string[])`
Unfollows artists or users.
- **Required**: `type` (string) - "artist" or "user"
- **Required**: `ids` (string[]) - IDs to unfollow
- **Returns**: Success confirmation

#### `unfollowArtists(artistIds: string[])`
Unfollows artists.
- **Required**: `artistIds` (string[]) - Array of artist IDs
- **Returns**: Success confirmation

#### `checkFollows(type: string, ids: string[])`
Checks if user follows artists.
- **Required**: `type` (string) - "artist"
- **Required**: `ids` (string[]) - Artist IDs to check
- **Returns**: Boolean array

#### `followPlaylist(playlistId: string)`
Follows a public playlist.
- **Required**: `playlistId` (string) - Playlist ID
- **Returns**: Success confirmation

#### `unfollowPlaylist(playlistId: string)`
Unfollows a playlist.
- **Required**: `playlistId` (string) - Playlist ID
- **Returns**: Success confirmation

### Player Methods

#### `getPlaybackState()`
Gets information about user's current playback state.
- **Returns**: Playback state object

#### `getCurrentPlayback()`
Alias for getPlaybackState.
- **Returns**: Current playback state

#### `getCurrentlyPlaying()`
Gets the currently playing track.
- **Returns**: Currently playing track object

#### `getDevices()`
Lists available playback devices.
- **Returns**: Array of device objects

#### `play(options?: object)`
Starts or resumes playback.
- **Optional**: `context_uri`, `uris`, `offset`, `position_ms`, `device_id`
- **Returns**: Success confirmation

#### `playTrack(trackUri: string, deviceId?: string)`
Plays a specific track.
- **Required**: `trackUri` (string) - Spotify track URI
- **Optional**: `deviceId` (string) - Target device ID
- **Returns**: Success confirmation

#### `pause()`
Pauses playback.
- **Returns**: Success confirmation

#### `pausePlayback()`
Alias for pause.
- **Returns**: Success confirmation

#### `next()`
Skips to next track.
- **Returns**: Success confirmation

#### `skipToNext()`
Alias for next.
- **Returns**: Success confirmation

#### `previous()`
Skips to previous track.
- **Returns**: Success confirmation

#### `skipToPrevious()`
Alias for previous.
- **Returns**: Success confirmation

#### `seek(position: number)`
Seeks to position in currently playing track.
- **Required**: `position` (number) - Position in milliseconds
- **Returns**: Success confirmation

#### `setVolume(volume: number)`
Sets playback volume.
- **Required**: `volume` (number) - Volume percentage (0-100)
- **Returns**: Success confirmation

#### `setRepeatMode(mode: string)`
Sets repeat mode.
- **Required**: `mode` (string) - "track", "context", or "off"
- **Returns**: Success confirmation

#### `setRepeat(state: string)`
Sets repeat state.
- **Required**: `state` (string) - Repeat state
- **Returns**: Success confirmation

#### `setShuffle(state: boolean)`
Toggles shuffle mode.
- **Required**: `state` (boolean) - Shuffle on/off
- **Returns**: Success confirmation

#### `transferPlayback(deviceIds: string[], play?: boolean)`
Transfers playback to a different device.
- **Required**: `deviceIds` (string[]) - Target device IDs
- **Optional**: `play` (boolean) - Start playing on transfer
- **Returns**: Success confirmation

#### `addToQueue(uri: string)`
Adds item to playback queue.
- **Required**: `uri` (string) - Spotify URI of track/episode
- **Returns**: Success confirmation

### Browse Methods

#### `getNewReleases()`
Gets new album releases.
- **Returns**: Array of new release album objects

#### `getFeaturedPlaylists()`
Gets Spotify's featured playlists.
- **Returns**: Array of featured playlist objects

#### `getCategories()`
Lists all available browse categories.
- **Returns**: Array of category objects

#### `getCategory(categoryId: string)`
Gets a specific browse category.
- **Required**: `categoryId` (string) - Category ID
- **Returns**: Category object

#### `getCategoryPlaylists(categoryId: string)`
Gets playlists for a category.
- **Required**: `categoryId` (string) - Category ID
- **Returns**: Array of playlist objects

#### `getRecommendations(options: object)`
Gets track recommendations based on seeds.
- **Required**: `options` (object) - Seed artists, tracks, genres and tunable attributes
- **Returns**: Recommendations object with track array

#### `getAvailableGenreSeeds()`
Lists available genres for recommendations.
- **Returns**: Array of genre strings

---

## Google Calendar

### Calendar List Methods

#### `listCalendars()`
Lists all calendars in the user's calendar list.
- **Returns**: Array of calendar list entry objects

#### `getCalendars()`
Alias for listCalendars.
- **Returns**: Array of calendar objects

#### `getCalendarListEntry(calendarId: string)`
Gets a specific calendar from the user's list.
- **Required**: `calendarId` (string) - Calendar identifier
- **Returns**: Calendar list entry object

#### `insertCalendarListEntry(data: object)`
Adds a calendar to the user's calendar list.
- **Required**: `data` (object) - Calendar data including calendarId
- **Returns**: Created calendar list entry

#### `updateCalendarListEntry(calendarId: string, data: object)`
Updates a calendar in the user's list.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated calendar list entry

#### `patchCalendarListEntry(calendarId: string, data: object)`
Partially updates a calendar list entry.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - Fields to update
- **Returns**: Updated calendar list entry

#### `deleteCalendarListEntry(calendarId: string)`
Removes a calendar from the user's calendar list.
- **Required**: `calendarId` (string) - Calendar identifier
- **Returns**: Deletion confirmation

### Calendar Methods

#### `getCalendar(calendarId: string)`
Gets metadata for a specific calendar.
- **Required**: `calendarId` (string) - Calendar identifier
- **Returns**: Calendar object

#### `insertCalendar(data: object)`
Creates a new secondary calendar.
- **Required**: `data` (object) - Calendar metadata
- **Returns**: Created calendar object

#### `updateCalendar(calendarId: string, data: object)`
Updates calendar metadata.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated calendar object

#### `patchCalendar(calendarId: string, data: object)`
Partially updates calendar metadata.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - Fields to update
- **Returns**: Updated calendar object

#### `deleteCalendar(calendarId: string)`
Deletes a secondary calendar.
- **Required**: `calendarId` (string) - Calendar identifier
- **Returns**: Deletion confirmation

#### `clearCalendar(calendarId: string)`
Clears all events from a calendar.
- **Required**: `calendarId` (string) - Calendar identifier
- **Returns**: Success confirmation

### Event Methods

#### `listEvents(calendarId: string, options?: object)`
Lists events in a calendar.
- **Required**: `calendarId` (string) - Calendar identifier
- **Optional**: `timeMin`, `timeMax`, `maxResults`, `orderBy`, etc.
- **Returns**: Array of event objects

#### `getEvents(calendarId?: string, options?: object)`
Gets events with optional filtering. Defaults to primary calendar.
- **Optional**: `calendarId` (string) - Calendar identifier (default: "primary")
- **Optional**: Various filter options
- **Returns**: Array of event objects

#### `getEvent(calendarId: string, eventId: string)`
Gets a specific event.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `eventId` (string) - Event identifier
- **Returns**: Event object

#### `insertEvent(calendarId: string, data: object)`
Creates a new event.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - Event data
- **Returns**: Created event object

#### `createEvent(calendarId: string, event: object)`
Alias for insertEvent.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `event` (object) - Event data
- **Returns**: Created event object

#### `updateEvent(calendarId: string, eventId: string, data: object)`
Updates an event.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `eventId` (string) - Event identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated event object

#### `patchEvent(calendarId: string, eventId: string, data: object)`
Partially updates an event.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `eventId` (string) - Event identifier
- **Required**: `data` (object) - Fields to update
- **Returns**: Updated event object

#### `deleteEvent(calendarId: string, eventId: string)`
Deletes an event.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `eventId` (string) - Event identifier
- **Returns**: Deletion confirmation

#### `moveEvent(calendarId: string, eventId: string, destination: string)`
Moves an event to another calendar.
- **Required**: `calendarId` (string) - Source calendar identifier
- **Required**: `eventId` (string) - Event identifier
- **Required**: `destination` (string) - Destination calendar ID
- **Returns**: Moved event object

#### `watchEvents(calendarId: string, data: object)`
Creates a watch channel for event changes.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - Watch configuration
- **Returns**: Watch channel object

#### `quickAddEvent(calendarId: string, text: string)`
Creates an event from free-form text.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `text` (string) - Event description text
- **Returns**: Created event object

#### `getEventInstances(calendarId: string, eventId: string)`
Gets instances of a recurring event.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `eventId` (string) - Recurring event identifier
- **Returns**: Array of event instance objects

#### `getUpcomingEvents(calendarId?: string, maxResults?: number)`
Gets upcoming events for a calendar.
- **Optional**: `calendarId` (string) - Calendar ID (default: "primary")
- **Optional**: `maxResults` (number) - Maximum number of events (default: 10)
- **Returns**: Array of upcoming event objects

#### `getEventsInDateRange(calendarId: string, startDate: Date, endDate: Date)`
Gets events within a specific date range.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `startDate` (Date) - Range start date
- **Required**: `endDate` (Date) - Range end date
- **Returns**: Array of event objects

#### `getTodaysEvents(calendarId?: string)`
Gets all events for today.
- **Optional**: `calendarId` (string) - Calendar ID (default: "primary")
- **Returns**: Array of today's event objects

#### `searchEvents(query: string, calendarId?: string, maxResults?: number)`
Searches for events matching a text query.
- **Required**: `query` (string) - Search query
- **Optional**: `calendarId` (string) - Calendar ID (default: "primary")
- **Optional**: `maxResults` (number) - Maximum results
- **Returns**: Array of matching event objects

#### `getAllCalendarEvents(maxResults?: number)`
Gets events from all user's calendars.
- **Optional**: `maxResults` (number) - Maximum events per calendar
- **Returns**: Array of objects with calendar and events

### FreeBusy Methods

#### `queryFreeBusy(params: object)`
Queries free/busy information for calendars.
- **Required**: `params` (object) - Query parameters including timeMin, timeMax, items
- **Returns**: Free/busy information object

#### `getFreeBusy(params: object)`
Alias for queryFreeBusy.
- **Required**: `params` (object) - FreeBusy query parameters
- **Returns**: Free/busy data

#### `isTimeSlotBusy(calendarId: string, startTime: Date, endTime: Date)`
Checks if a time slot is busy.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `startTime` (Date) - Slot start time
- **Required**: `endTime` (Date) - Slot end time
- **Returns**: Boolean indicating if slot is busy

### Color Methods

#### `getColors()`
Gets available colors for calendars and events.
- **Returns**: Colors object with calendar and event color definitions

### ACL Methods

#### `listAcl(calendarId: string)`
Lists access control rules for a calendar.
- **Required**: `calendarId` (string) - Calendar identifier
- **Returns**: Array of ACL rule objects

#### `getAclRule(calendarId: string, ruleId: string)`
Gets a specific ACL rule.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `ruleId` (string) - Rule identifier
- **Returns**: ACL rule object

#### `insertAclRule(calendarId: string, data: object)`
Creates a new ACL rule.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `data` (object) - ACL rule data
- **Returns**: Created ACL rule object

#### `updateAclRule(calendarId: string, ruleId: string, data: object)`
Updates an ACL rule.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `ruleId` (string) - Rule identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated ACL rule object

#### `patchAclRule(calendarId: string, ruleId: string, data: object)`
Partially updates an ACL rule.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `ruleId` (string) - Rule identifier
- **Required**: `data` (object) - Fields to update
- **Returns**: Updated ACL rule object

#### `deleteAclRule(calendarId: string, ruleId: string)`
Deletes an ACL rule.
- **Required**: `calendarId` (string) - Calendar identifier
- **Required**: `ruleId` (string) - Rule identifier
- **Returns**: Deletion confirmation

### Settings Methods

#### `listSettings()`
Lists all user settings.
- **Returns**: Array of setting objects

#### `getSetting(setting: string)`
Gets a specific setting.
- **Required**: `setting` (string) - Setting name
- **Returns**: Setting object

#### `watchSettings(data: object)`
Creates a watch channel for settings changes.
- **Required**: `data` (object) - Watch configuration
- **Returns**: Watch channel object

---

## Google Drive

### File Methods

#### `listFiles(options?: object)`
Lists files and folders in Drive.
- **Optional**: `q` (query), `pageSize`, `orderBy`, `fields`, etc.
- **Returns**: Array of file objects

#### `getFile(fileId: string)`
Gets metadata for a specific file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: File metadata object

#### `createFile(metadata: object, content?: any)`
Creates a new file or folder.
- **Required**: `metadata` (object) - File metadata including name, mimeType
- **Optional**: `content` (any) - File content
- **Returns**: Created file object

#### `updateFile(fileId: string, metadata?: object, content?: any)`
Updates file metadata and/or content.
- **Required**: `fileId` (string) - File identifier
- **Optional**: `metadata` (object) - Metadata to update
- **Optional**: `content` (any) - New file content
- **Returns**: Updated file object

#### `deleteFile(fileId: string)`
Permanently deletes a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Deletion confirmation

#### `copyFile(fileId: string, name?: string)`
Creates a copy of a file.
- **Required**: `fileId` (string) - Source file identifier
- **Optional**: `name` (string) - Name for the copy
- **Returns**: Copied file object

#### `moveFile(fileId: string, parentId: string)`
Moves a file to a different folder.
- **Required**: `fileId` (string) - File identifier
- **Required**: `parentId` (string) - Destination folder ID
- **Returns**: Moved file object

#### `downloadFile(fileId: string)`
Downloads file content.
- **Required**: `fileId` (string) - File identifier
- **Returns**: File content/binary data

#### `exportFile(fileId: string, mimeType: string)`
Exports a Google Workspace document to another format.
- **Required**: `fileId` (string) - File identifier
- **Required**: `mimeType` (string) - Target MIME type
- **Returns**: Exported file content

#### `generateIds(count?: number)`
Generates file IDs for use in batch operations.
- **Optional**: `count` (number) - Number of IDs to generate
- **Returns**: Array of generated file ID strings

#### `watchFile(fileId: string, data: object)`
Creates a watch channel for file changes.
- **Required**: `fileId` (string) - File identifier
- **Required**: `data` (object) - Watch configuration
- **Returns**: Watch channel object

#### `emptyTrash()`
Permanently deletes all files in the trash.
- **Returns**: Success confirmation

#### `getFileMetadata(fileId: string)`
Gets detailed metadata for a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: File metadata object

#### `updateFileMetadata(fileId: string, metadata: object)`
Updates file metadata only (not content).
- **Required**: `fileId` (string) - File identifier
- **Required**: `metadata` (object) - Metadata updates
- **Returns**: Updated file object

#### `createFolder(name: string, parentId?: string)`
Creates a new folder.
- **Required**: `name` (string) - Folder name
- **Optional**: `parentId` (string) - Parent folder ID
- **Returns**: Created folder object

#### `listFolders()`
Lists all folders.
- **Returns**: Array of folder objects

#### `getFolderContents(folderId: string)`
Gets all files and subfolders in a folder.
- **Required**: `folderId` (string) - Folder identifier
- **Returns**: Array of file/folder objects

#### `searchFiles(query: string)`
Searches for files matching a query.
- **Required**: `query` (string) - Search query
- **Returns**: Array of matching file objects

#### `getFilesByName(name: string)`
Finds files with a specific name.
- **Required**: `name` (string) - File name
- **Returns**: Array of file objects

#### `getFilesByType(mimeType: string)`
Gets files of a specific MIME type.
- **Required**: `mimeType` (string) - MIME type to filter by
- **Returns**: Array of file objects

#### `getSharedFiles()`
Lists files shared with the user.
- **Returns**: Array of shared file objects

#### `getRecentFiles(days?: number)`
Gets recently modified files.
- **Optional**: `days` (number) - Number of days to look back
- **Returns**: Array of recent file objects

#### `restoreFile(fileId: string)`
Restores a file from trash.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Restored file object

#### `permanentlyDeleteFile(fileId: string)`
Bypasses trash and permanently deletes a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Deletion confirmation

### Permission Methods

#### `listPermissions(fileId: string)`
Lists all permissions for a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Array of permission objects

#### `getPermission(fileId: string, permissionId: string)`
Gets a specific permission.
- **Required**: `fileId` (string) - File identifier
- **Required**: `permissionId` (string) - Permission identifier
- **Returns**: Permission object

#### `createPermission(fileId: string, data: object)`
Grants permission to access a file.
- **Required**: `fileId` (string) - File identifier
- **Required**: `data` (object) - Permission data (type, role, emailAddress)
- **Returns**: Created permission object

#### `shareFile(fileId: string, email: string, role?: string)`
Shares a file with a user.
- **Required**: `fileId` (string) - File identifier
- **Required**: `email` (string) - User's email address
- **Optional**: `role` (string) - Permission role (default: "reader")
- **Returns**: Created permission object

#### `updatePermission(fileId: string, permissionId: string, data: object)`
Updates a permission.
- **Required**: `fileId` (string) - File identifier
- **Required**: `permissionId` (string) - Permission identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated permission object

#### `deletePermission(fileId: string, permissionId: string)`
Removes a permission.
- **Required**: `fileId` (string) - File identifier
- **Required**: `permissionId` (string) - Permission identifier
- **Returns**: Deletion confirmation

#### `unshareFile(fileId: string, permissionId: string)`
Alias for deletePermission.
- **Required**: `fileId` (string) - File identifier
- **Required**: `permissionId` (string) - Permission identifier
- **Returns**: Deletion confirmation

#### `getFilePermissions(fileId: string)`
Gets all permissions for a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Array of permission objects

### Comment Methods

#### `listComments(fileId: string)`
Lists all comments on a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Array of comment objects

#### `getComment(fileId: string, commentId: string)`
Gets a specific comment.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Returns**: Comment object

#### `createComment(fileId: string, data: object)`
Creates a new comment on a file.
- **Required**: `fileId` (string) - File identifier
- **Required**: `data` (object) - Comment content
- **Returns**: Created comment object

#### `updateComment(fileId: string, commentId: string, data: object)`
Updates a comment.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated comment object

#### `deleteComment(fileId: string, commentId: string)`
Deletes a comment.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Returns**: Deletion confirmation

### Reply Methods

#### `listReplies(fileId: string, commentId: string)`
Lists all replies to a comment.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Returns**: Array of reply objects

#### `getReply(fileId: string, commentId: string, replyId: string)`
Gets a specific reply.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Required**: `replyId` (string) - Reply identifier
- **Returns**: Reply object

#### `createReply(fileId: string, commentId: string, data: object)`
Creates a reply to a comment.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Required**: `data` (object) - Reply content
- **Returns**: Created reply object

#### `updateReply(fileId: string, commentId: string, replyId: string, data: object)`
Updates a reply.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Required**: `replyId` (string) - Reply identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated reply object

#### `deleteReply(fileId: string, commentId: string, replyId: string)`
Deletes a reply.
- **Required**: `fileId` (string) - File identifier
- **Required**: `commentId` (string) - Comment identifier
- **Required**: `replyId` (string) - Reply identifier
- **Returns**: Deletion confirmation

### Revision Methods

#### `listRevisions(fileId: string)`
Lists all revisions of a file.
- **Required**: `fileId` (string) - File identifier
- **Returns**: Array of revision objects

#### `getRevision(fileId: string, revisionId: string)`
Gets a specific revision.
- **Required**: `fileId` (string) - File identifier
- **Required**: `revisionId` (string) - Revision identifier
- **Returns**: Revision object

#### `updateRevision(fileId: string, revisionId: string, data: object)`
Updates revision metadata.
- **Required**: `fileId` (string) - File identifier
- **Required**: `revisionId` (string) - Revision identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated revision object

#### `deleteRevision(fileId: string, revisionId: string)`
Deletes a revision.
- **Required**: `fileId` (string) - File identifier
- **Required**: `revisionId` (string) - Revision identifier
- **Returns**: Deletion confirmation

### Shared Drive Methods

#### `listDrives()`
Lists all shared drives the user has access to.
- **Returns**: Array of shared drive objects

#### `getDrive(driveId: string)`
Gets metadata for a shared drive.
- **Required**: `driveId` (string) - Drive identifier
- **Returns**: Drive object

#### `createDrive(data: object)`
Creates a new shared drive.
- **Required**: `data` (object) - Drive metadata including name
- **Returns**: Created drive object

#### `updateDrive(driveId: string, data: object)`
Updates shared drive metadata.
- **Required**: `driveId` (string) - Drive identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated drive object

#### `deleteDrive(driveId: string)`
Permanently deletes a shared drive.
- **Required**: `driveId` (string) - Drive identifier
- **Returns**: Deletion confirmation

#### `hideDrive(driveId: string)`
Hides a shared drive from the user's view.
- **Required**: `driveId` (string) - Drive identifier
- **Returns**: Success confirmation

#### `unhideDrive(driveId: string)`
Unhides a shared drive.
- **Required**: `driveId` (string) - Drive identifier
- **Returns**: Success confirmation

### Change Methods

#### `listChanges()`
Lists changes to files and shared drives.
- **Returns**: Array of change objects

#### `getStartPageToken()`
Gets the starting page token for detecting changes.
- **Returns**: Page token string

#### `watchChanges(data: object)`
Creates a watch channel for file changes.
- **Required**: `data` (object) - Watch configuration
- **Returns**: Watch channel object

### Channel Methods

#### `stopChannel(data: object)`
Stops a watch channel.
- **Required**: `data` (object) - Channel information (id and resourceId)
- **Returns**: Success confirmation

### About Methods

#### `getAbout()`
Gets information about the user's Drive.
- **Returns**: About object with storage quota and user info

#### `getStorageQuota()`
Gets storage quota information.
- **Returns**: Storage quota object

---

## Vercel

### Project Methods

#### `listProjects(teamId?: string)`
Lists all projects.
- **Optional**: `teamId` (string) - Team identifier
- **Returns**: Array of project objects

#### `getProject(projectId: string)`
Gets details of a specific project.
- **Required**: `projectId` (string) - Project identifier
- **Returns**: Project object

#### `createProject(data: object)`
Creates a new project.
- **Required**: `data` (object) - Project configuration
- **Returns**: Created project object

#### `updateProject(projectId: string, data: object)`
Updates project settings.
- **Required**: `projectId` (string) - Project identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated project object

#### `deleteProject(projectId: string)`
Deletes a project.
- **Required**: `projectId` (string) - Project identifier
- **Returns**: Deletion confirmation

#### `getProjectDomains(projectId: string)`
Lists all domains for a project.
- **Required**: `projectId` (string) - Project identifier
- **Returns**: Array of domain objects

#### `getProjectEnvVars(projectId: string)`
Gets environment variables for a project.
- **Required**: `projectId` (string) - Project identifier
- **Returns**: Array of environment variable objects

#### `createProjectEnvVar(projectId: string, data: object)`
Creates a new environment variable.
- **Required**: `projectId` (string) - Project identifier
- **Required**: `data` (object) - Environment variable data
- **Returns**: Created environment variable object

#### `getProjectAnalytics(projectId: string, options?: object)`
Gets analytics data for a project.
- **Required**: `projectId` (string) - Project identifier
- **Optional**: `period`, `from`, `to` date parameters
- **Returns**: Analytics data object with visits, page views, etc.

### Deployment Methods

#### `listDeployments(options?: object)`
Lists all deployments.
- **Optional**: `projectId`, `limit` filters
- **Returns**: Array of deployment objects

#### `getDeployment(deploymentId: string)`
Gets details of a specific deployment.
- **Required**: `deploymentId` (string) - Deployment identifier
- **Returns**: Deployment object

#### `deleteDeployment(deploymentId: string)`
Deletes a deployment.
- **Required**: `deploymentId` (string) - Deployment identifier
- **Returns**: Deletion confirmation

#### `getDeploymentEvents(deploymentId: string)`
Gets build events for a deployment.
- **Required**: `deploymentId` (string) - Deployment identifier
- **Returns**: Array of event objects

#### `getDeploymentFiles(deploymentId: string)`
Lists files in a deployment.
- **Required**: `deploymentId` (string) - Deployment identifier
- **Returns**: Array of file objects

#### `cancelDeployment(deploymentId: string)`
Cancels a running deployment.
- **Required**: `deploymentId` (string) - Deployment identifier
- **Returns**: Cancelled deployment object

#### `getLatestDeployment(projectId: string)`
Gets the most recent deployment for a project.
- **Required**: `projectId` (string) - Project identifier
- **Returns**: Latest deployment object or null

#### `getDeploymentStatus(deploymentId: string)`
Gets current status of a deployment.
- **Required**: `deploymentId` (string) - Deployment identifier
- **Returns**: Object with id, state, ready status, url, createdAt

#### `redeployProject(projectId: string)`
Triggers a redeploy of the latest deployment.
- **Required**: `projectId` (string) - Project identifier
- **Returns**: New deployment object

### Domain Methods

#### `listDomains()`
Lists all domains.
- **Returns**: Array of domain objects

#### `getDomain(domain: string)`
Gets information about a domain.
- **Required**: `domain` (string) - Domain name
- **Returns**: Domain object

#### `addDomain(data: object)`
Adds a new domain.
- **Required**: `data` (object) - Domain configuration
- **Returns**: Created domain object

#### `removeDomain(domain: string)`
Removes a domain.
- **Required**: `domain` (string) - Domain name
- **Returns**: Deletion confirmation

#### `verifyDomain(domain: string)`
Verifies domain ownership.
- **Required**: `domain` (string) - Domain name
- **Returns**: Verification result

#### `getDomainConfig(domain: string)`
Gets DNS configuration for a domain.
- **Required**: `domain` (string) - Domain name
- **Returns**: Domain configuration object

#### `getDomainStatus(domain: string)`
Checks domain verification and configuration status.
- **Required**: `domain` (string) - Domain name
- **Returns**: Object with verified, configured, expires status

### Team Methods

#### `listTeams()`
Lists all teams.
- **Returns**: Array of team objects

#### `getTeam(teamId: string)`
Gets details of a specific team.
- **Required**: `teamId` (string) - Team identifier
- **Returns**: Team object

#### `createTeam(data: object)`
Creates a new team.
- **Required**: `data` (object) - Team configuration
- **Returns**: Created team object

#### `updateTeam(teamId: string, data: object)`
Updates team settings.
- **Required**: `teamId` (string) - Team identifier
- **Required**: `data` (object) - Update data
- **Returns**: Updated team object

#### `deleteTeam(teamId: string)`
Deletes a team.
- **Required**: `teamId` (string) - Team identifier
- **Returns**: Deletion confirmation

#### `getTeamMembers(teamId: string)`
Lists all team members.
- **Required**: `teamId` (string) - Team identifier
- **Returns**: Array of member objects

#### `inviteTeamMember(teamId: string, data: object)`
Invites a new team member.
- **Required**: `teamId` (string) - Team identifier
- **Required**: `data` (object) - Invitation data including email
- **Returns**: Invitation object

#### `getTeamUsage(teamId: string)`
Gets usage statistics for a team.
- **Required**: `teamId` (string) - Team identifier
- **Returns**: Object with projects count, members count

### User Methods

#### `getUser()`
Gets authenticated user information.
- **Returns**: User object

#### `updateUser(data: object)`
Updates user profile.
- **Required**: `data` (object) - Profile update data
- **Returns**: Updated user object

#### `deleteUser()`
Deletes the authenticated user's account.
- **Returns**: Deletion confirmation

#### `getUserEvents()`
Gets recent events for the user.
- **Returns**: Array of event objects

#### `getUserTokens()`
Lists authentication tokens.
- **Returns**: Array of token objects

---

## Discord

### User Methods

#### `getCurrentUser()`
Gets the authenticated user's account information.
- **Returns**: Current user object

#### `getUser(userId: string)`
Fetches information about a specific user.
- **Required**: `userId` (string) - User ID
- **Returns**: User object

#### `modifyCurrentUser(options: object)`
Updates the authenticated user's profile.
- **Required**: `options` (object) - Profile data to update
- **Returns**: Updated user object

#### `getCurrentUserGuilds(limit?: number)`
Lists servers the user is a member of.
- **Optional**: `limit` (number) - Maximum results (default: 200)
- **Returns**: Array of partial guild objects

#### `getCurrentUserGuildMember(guildId: string)`
Gets the user's member object for a specific guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Guild member object

#### `leaveGuild(guildId: string)`
Leaves a server.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Success confirmation

#### `createDM(recipientId: string)`
Creates a DM channel with a user.
- **Required**: `recipientId` (string) - User ID to DM
- **Returns**: DM channel object

#### `getConnections()`
Gets the user's connected accounts.
- **Returns**: Array of connection objects

#### `getApplicationRoleConnection(applicationId: string)`
Gets role connection metadata for an application.
- **Required**: `applicationId` (string) - Application ID
- **Returns**: Role connection object

#### `updateApplicationRoleConnection(applicationId: string, data: object)`
Updates role connection metadata.
- **Required**: `applicationId` (string) - Application ID
- **Required**: `data` (object) - Connection metadata
- **Returns**: Updated role connection object

### Guild Methods

#### `createGuild(data: object)`
Creates a new guild/server.
- **Required**: `data` (object) - Guild configuration including name
- **Returns**: Created guild object

#### `getGuild(guildId: string)`
Gets guild information.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Guild object

#### `getGuildPreview(guildId: string)`
Gets a preview of a guild for discovery.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Guild preview object

#### `modifyGuild(guildId: string, options: object)`
Updates guild settings.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `options` (object) - Settings to update
- **Returns**: Updated guild object

#### `deleteGuild(guildId: string)`
Deletes a guild (owner only).
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Deletion confirmation

#### `getGuildChannels(guildId: string)`
Lists all channels in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of channel objects

#### `createGuildChannel(guildId: string, data: object)`
Creates a new channel in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Channel configuration
- **Returns**: Created channel object

#### `createChannel(guildId: string, name: string, type?: number, options?: object)`
Creates a channel with simplified parameters.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `name` (string) - Channel name
- **Optional**: `type` (number) - Channel type (default: 0 for text)
- **Optional**: `options` (object) - Additional settings
- **Returns**: Created channel object

#### `modifyGuildChannelPositions(guildId: string, data: object)`
Reorders channels in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - New channel positions
- **Returns**: Success confirmation

#### `listActiveThreads(guildId: string)`
Lists active threads in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of thread channel objects

#### `getGuildMember(guildId: string, userId: string)`
Gets a specific member of a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Returns**: Guild member object

#### `listGuildMembers(guildId: string)`
Lists all members in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of guild member objects

#### `getGuildMembers(guildId: string, limit?: number)`
Lists guild members with optional limit.
- **Required**: `guildId` (string) - Guild ID
- **Optional**: `limit` (number) - Maximum results (default: 100)
- **Returns**: Array of guild member objects

#### `searchGuildMembers(guildId: string, query: string, limit?: number)`
Searches for guild members by username.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `query` (string) - Search query
- **Optional**: `limit` (number) - Maximum results (default: 100)
- **Returns**: Array of matching member objects

#### `addGuildMember(guildId: string, userId: string, data: object)`
Adds a user to a guild using OAuth.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `data` (object) - Access token and optional settings
- **Returns**: Guild member object

#### `modifyGuildMember(guildId: string, userId: string, options: object)`
Modifies a guild member's properties.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `options` (object) - Properties to update
- **Returns**: Updated guild member object

#### `modifyCurrentMember(guildId: string, data: object)`
Modifies the current user's member properties in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Properties to update
- **Returns**: Updated guild member object

#### `addGuildMemberRole(guildId: string, userId: string, roleId: string)`
Adds a role to a guild member.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `roleId` (string) - Role ID
- **Returns**: Success confirmation

#### `addRole(guildId: string, userId: string, roleId: string)`
Alias for addGuildMemberRole.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `roleId` (string) - Role ID
- **Returns**: Success confirmation

#### `removeGuildMemberRole(guildId: string, userId: string, roleId: string)`
Removes a role from a guild member.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `roleId` (string) - Role ID
- **Returns**: Success confirmation

#### `removeRole(guildId: string, userId: string, roleId: string)`
Alias for removeGuildMemberRole.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `roleId` (string) - Role ID
- **Returns**: Success confirmation

#### `removeGuildMember(guildId: string, userId: string)`
Kicks a member from a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Returns**: Success confirmation

#### `kickMember(guildId: string, userId: string, reason?: string)`
Alias for removeGuildMember with optional reason.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Optional**: `reason` (string) - Kick reason
- **Returns**: Success confirmation

#### `getGuildBans(guildId: string)`
Lists all active bans for a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of ban objects

#### `getGuildBan(guildId: string, userId: string)`
Gets a specific ban.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Returns**: Ban object

#### `createGuildBan(guildId: string, userId: string, options?: object)`
Bans a user from a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Optional**: `options` (object) - Ban options including delete_message_seconds
- **Returns**: Success confirmation

#### `banMember(guildId: string, userId: string, options?: object)`
Alias for createGuildBan.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Optional**: `options` (object) - Ban options
- **Returns**: Success confirmation

#### `removeGuildBan(guildId: string, userId: string)`
Unbans a user from a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Returns**: Success confirmation

#### `unbanMember(guildId: string, userId: string)`
Alias for removeGuildBan.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Returns**: Success confirmation

#### `getGuildRoles(guildId: string)`
Lists all roles in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of role objects

#### `createGuildRole(guildId: string, data: object)`
Creates a new role in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Role configuration
- **Returns**: Created role object

#### `createRole(guildId: string, name: string, options?: object)`
Creates a role with simplified parameters.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `name` (string) - Role name
- **Optional**: `options` (object) - Additional role settings
- **Returns**: Created role object

#### `modifyGuildRolePositions(guildId: string, data: object)`
Reorders roles in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - New role positions
- **Returns**: Array of role objects

#### `modifyGuildRole(guildId: string, roleId: string, options: object)`
Updates a role's properties.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `roleId` (string) - Role ID
- **Required**: `options` (object) - Properties to update
- **Returns**: Updated role object

#### `deleteGuildRole(guildId: string, roleId: string)`
Deletes a role.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `roleId` (string) - Role ID
- **Returns**: Success confirmation

#### `deleteRole(guildId: string, roleId: string)`
Alias for deleteGuildRole.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `roleId` (string) - Role ID
- **Returns**: Success confirmation

#### `getGuildPruneCount(guildId: string, days?: number)`
Gets count of members that would be pruned.
- **Required**: `guildId` (string) - Guild ID
- **Optional**: `days` (number) - Days of inactivity
- **Returns**: Prune count object

#### `beginGuildPrune(guildId: string, data: object)`
Prunes (kicks) inactive members.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Prune configuration
- **Returns**: Prune result object

#### `getGuildVoiceRegions(guildId: string)`
Lists available voice regions for a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of voice region objects

#### `getGuildInvites(guildId: string)`
Lists all invites for a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of invite objects

#### `getGuildIntegrations(guildId: string)`
Gets guild integrations.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of integration objects

#### `deleteGuildIntegration(guildId: string, integrationId: string)`
Deletes a guild integration.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `integrationId` (string) - Integration ID
- **Returns**: Success confirmation

#### `getGuildWidgetSettings(guildId: string)`
Gets guild widget settings.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Widget settings object

#### `modifyGuildWidget(guildId: string, data: object)`
Updates guild widget settings.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Widget configuration
- **Returns**: Updated widget settings object

#### `getGuildWidget(guildId: string)`
Gets guild widget data.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Widget object

#### `getGuildVanityURL(guildId: string)`
Gets the guild's vanity URL if available.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Vanity URL object

#### `getGuildWelcomeScreen(guildId: string)`
Gets the guild's welcome screen.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Welcome screen object

#### `modifyGuildWelcomeScreen(guildId: string, data: object)`
Updates the guild's welcome screen.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Welcome screen configuration
- **Returns**: Updated welcome screen object

#### `getGuildOnboarding(guildId: string)`
Gets guild onboarding configuration.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Onboarding object

#### `modifyGuildOnboarding(guildId: string, data: object)`
Updates guild onboarding.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Onboarding configuration
- **Returns**: Updated onboarding object

#### `modifyCurrentUserVoiceState(guildId: string, data: object)`
Updates current user's voice state.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Voice state updates
- **Returns**: Success confirmation

#### `modifyUserVoiceState(guildId: string, userId: string, data: object)`
Updates another user's voice state.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `userId` (string) - User ID
- **Required**: `data` (object) - Voice state updates
- **Returns**: Success confirmation

#### `listScheduledEventsForGuild(guildId: string)`
Lists scheduled events in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of scheduled event objects

#### `createGuildScheduledEvent(guildId: string, data: object)`
Creates a scheduled event.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Event configuration
- **Returns**: Created scheduled event object

#### `getGuildScheduledEvent(guildId: string, guildScheduledEventId: string)`
Gets a specific scheduled event.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `guildScheduledEventId` (string) - Event ID
- **Returns**: Scheduled event object

#### `modifyGuildScheduledEvent(guildId: string, guildScheduledEventId: string, data: object)`
Updates a scheduled event.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `guildScheduledEventId` (string) - Event ID
- **Required**: `data` (object) - Event updates
- **Returns**: Updated scheduled event object

#### `deleteGuildScheduledEvent(guildId: string, guildScheduledEventId: string)`
Deletes a scheduled event.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `guildScheduledEventId` (string) - Event ID
- **Returns**: Success confirmation

#### `getGuildScheduledEventUsers(guildId: string, guildScheduledEventId: string)`
Lists users interested in a scheduled event.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `guildScheduledEventId` (string) - Event ID
- **Returns**: Array of user objects

#### `getGuildTemplate(templateCode: string)`
Gets a guild template.
- **Required**: `templateCode` (string) - Template code
- **Returns**: Template object

#### `createGuildFromTemplate(templateCode: string, data: object)`
Creates a guild from a template.
- **Required**: `templateCode` (string) - Template code
- **Required**: `data` (object) - Guild configuration
- **Returns**: Created guild object

#### `getGuildTemplates(guildId: string)`
Lists templates for a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of template objects

#### `createGuildTemplate(guildId: string, data: object)`
Creates a template from a guild.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Template configuration
- **Returns**: Created template object

#### `syncGuildTemplate(guildId: string, templateCode: string)`
Syncs a template with guild changes.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `templateCode` (string) - Template code
- **Returns**: Updated template object

#### `modifyGuildTemplate(guildId: string, templateCode: string, data: object)`
Updates a guild template.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `templateCode` (string) - Template code
- **Required**: `data` (object) - Template updates
- **Returns**: Updated template object

#### `deleteGuildTemplate(guildId: string, templateCode: string)`
Deletes a guild template.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `templateCode` (string) - Template code
- **Returns**: Deletion confirmation

#### `getGuildAuditLog(guildId: string, options?: object)`
Gets the audit log for a guild.
- **Required**: `guildId` (string) - Guild ID
- **Optional**: `options` (object) - Filter options
- **Returns**: Audit log object

### Channel Methods

#### `getChannel(channelId: string)`
Gets channel information.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Channel object

#### `modifyChannel(channelId: string, options: object)`
Updates channel settings.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `options` (object) - Settings to update
- **Returns**: Updated channel object

#### `deleteChannel(channelId: string)`
Deletes a channel.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Deleted channel object

#### `getChannelMessages(channelId: string, limit?: number)`
Gets messages from a channel.
- **Required**: `channelId` (string) - Channel ID
- **Optional**: `limit` (number) - Number of messages (default: 50)
- **Returns**: Array of message objects

#### `getMessages(channelId: string, limit?: number)`
Alias for getChannelMessages.
- **Required**: `channelId` (string) - Channel ID
- **Optional**: `limit` (number) - Message limit (default: 50)
- **Returns**: Array of message objects

#### `getChannelMessage(channelId: string, messageId: string)`
Gets a specific message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Returns**: Message object

#### `createMessage(channelId: string, data: object)`
Sends a message to a channel.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `data` (object) - Message content and options
- **Returns**: Created message object

#### `sendMessage(channelId: string, content: string, options?: object)`
Sends a text message with optional embeds and components.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `content` (string) - Message text
- **Optional**: `options` (object) - Embeds, components, etc.
- **Returns**: Created message object

#### `sendEmbed(channelId: string, embed: object, content?: string)`
Sends an embed message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `embed` (object) - Embed object
- **Optional**: `content` (string) - Additional text
- **Returns**: Created message object

#### `crosspostMessage(channelId: string, messageId: string)`
Crossposts a message to following channels.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Returns**: Message object

#### `editMessage(channelId: string, messageId: string, content: string, options?: object)`
Edits a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `content` (string) - New message content
- **Optional**: `options` (object) - Additional updates
- **Returns**: Edited message object

#### `deleteMessage(channelId: string, messageId: string)`
Deletes a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Returns**: Success confirmation

#### `bulkDeleteMessages(channelId: string, messageIds: string[])`
Deletes multiple messages at once.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageIds` (string[]) - Array of message IDs (2-100)
- **Returns**: Success confirmation

#### `createReaction(channelId: string, messageId: string, emoji: string)`
Adds a reaction to a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji (Unicode or custom emoji format)
- **Returns**: Success confirmation

#### `addReaction(channelId: string, messageId: string, emoji: string)`
Alias for createReaction.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji
- **Returns**: Success confirmation

#### `deleteOwnReaction(channelId: string, messageId: string, emoji: string)`
Removes your own reaction from a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji
- **Returns**: Success confirmation

#### `removeReaction(channelId: string, messageId: string, emoji: string)`
Alias for deleteOwnReaction.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji
- **Returns**: Success confirmation

#### `deleteUserReaction(channelId: string, messageId: string, emoji: string, userId: string)`
Removes another user's reaction.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji
- **Required**: `userId` (string) - User ID
- **Returns**: Success confirmation

#### `getReactions(channelId: string, messageId: string, emoji: string)`
Gets users who reacted with an emoji.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji
- **Returns**: Array of user objects

#### `deleteAllReactions(channelId: string, messageId: string)`
Removes all reactions from a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Returns**: Success confirmation

#### `deleteAllReactionsForEmoji(channelId: string, messageId: string, emoji: string)`
Removes all reactions for a specific emoji.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `emoji` (string) - Emoji
- **Returns**: Success confirmation

#### `editChannelPermissions(channelId: string, overwriteId: string, data: object)`
Updates permission overwrites for a channel.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `overwriteId` (string) - Role or user ID
- **Required**: `data` (object) - Permission configuration
- **Returns**: Success confirmation

#### `getChannelInvites(channelId: string)`
Lists invites for a channel.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Array of invite objects

#### `createChannelInvite(channelId: string, options?: object)`
Creates an invite for a channel.
- **Required**: `channelId` (string) - Channel ID
- **Optional**: `options` (object) - Invite configuration
- **Returns**: Created invite object

#### `createInvite(channelId: string, options?: object)`
Alias for createChannelInvite.
- **Required**: `channelId` (string) - Channel ID
- **Optional**: `options` (object) - Invite options
- **Returns**: Created invite object

#### `deleteChannelPermission(channelId: string, overwriteId: string)`
Deletes a permission overwrite.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `overwriteId` (string) - Role or user ID
- **Returns**: Success confirmation

#### `followAnnouncementChannel(channelId: string, data: object)`
Follows an announcement channel to another channel.
- **Required**: `channelId` (string) - Source channel ID
- **Required**: `data` (object) - Target channel configuration
- **Returns**: Followed channel object

#### `triggerTypingIndicator(channelId: string)`
Shows typing indicator in a channel.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Success confirmation

#### `triggerTyping(channelId: string)`
Alias for triggerTypingIndicator.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Success confirmation

#### `getPinnedMessages(channelId: string)`
Gets all pinned messages in a channel.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Array of pinned message objects

#### `pinMessage(channelId: string, messageId: string)`
Pins a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Returns**: Success confirmation

#### `unpinMessage(channelId: string, messageId: string)`
Unpins a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Returns**: Success confirmation

#### `groupDMAddRecipient(channelId: string, userId: string, data: object)`
Adds a user to a group DM.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `userId` (string) - User ID to add
- **Required**: `data` (object) - Access token and nickname
- **Returns**: Success confirmation

#### `groupDMRemoveRecipient(channelId: string, userId: string)`
Removes a user from a group DM.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `userId` (string) - User ID to remove
- **Returns**: Success confirmation

#### `startThreadFromMessage(channelId: string, messageId: string, data: object)`
Creates a thread from a message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `messageId` (string) - Message ID
- **Required**: `data` (object) - Thread configuration
- **Returns**: Created thread channel object

#### `startThreadWithoutMessage(channelId: string, data: object)`
Creates a thread without a starter message.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `data` (object) - Thread configuration
- **Returns**: Created thread channel object

#### `createThread(channelId: string, name: string, options?: object)`
Creates a thread in a channel.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `name` (string) - Thread name
- **Optional**: `options` (object) - Thread settings including messageId
- **Returns**: Created thread channel object

#### `startThreadInForumOrMediaChannel(channelId: string, data: object)`
Creates a thread in a forum/media channel.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `data` (object) - Thread and initial message data
- **Returns**: Created thread channel object

#### `joinThread(threadId: string)`
Joins a thread.
- **Required**: `threadId` (string) - Thread channel ID
- **Returns**: Success confirmation

#### `addThreadMember(threadId: string, userId: string)`
Adds another user to a thread.
- **Required**: `threadId` (string) - Thread channel ID
- **Required**: `userId` (string) - User ID to add
- **Returns**: Success confirmation

#### `leaveThread(threadId: string)`
Leaves a thread.
- **Required**: `threadId` (string) - Thread channel ID
- **Returns**: Success confirmation

#### `removeThreadMember(threadId: string, userId: string)`
Removes a user from a thread.
- **Required**: `threadId` (string) - Thread channel ID
- **Required**: `userId` (string) - User ID to remove
- **Returns**: Success confirmation

#### `getThreadMember(threadId: string, userId: string)`
Gets a thread member.
- **Required**: `threadId` (string) - Thread channel ID
- **Required**: `userId` (string) - User ID
- **Returns**: Thread member object

#### `listThreadMembers(threadId: string)`
Lists all members in a thread.
- **Required**: `threadId` (string) - Thread channel ID
- **Returns**: Array of thread member objects

#### `listPublicArchivedThreads(channelId: string)`
Lists public archived threads.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Array of archived thread objects

#### `listPrivateArchivedThreads(channelId: string)`
Lists private archived threads.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Array of archived thread objects

#### `listJoinedPrivateArchivedThreads(channelId: string)`
Lists private archived threads the user has joined.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Array of archived thread objects

### Emoji Methods

#### `listGuildEmojis(guildId: string)`
Lists all custom emojis in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of emoji objects

#### `getGuildEmojis(guildId: string)`
Alias for listGuildEmojis.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of emoji objects

#### `getGuildEmoji(guildId: string, emojiId: string)`
Gets a specific emoji.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `emojiId` (string) - Emoji ID
- **Returns**: Emoji object

#### `createGuildEmoji(guildId: string, name: string, image: string, roles?: string[])`
Creates a custom emoji.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `name` (string) - Emoji name
- **Required**: `image` (string) - Base64 image data
- **Optional**: `roles` (string[]) - Role IDs that can use this emoji
- **Returns**: Created emoji object

#### `modifyGuildEmoji(guildId: string, emojiId: string, data: object)`
Updates a custom emoji.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `emojiId` (string) - Emoji ID
- **Required**: `data` (object) - Updates (name, roles)
- **Returns**: Updated emoji object

#### `deleteGuildEmoji(guildId: string, emojiId: string)`
Deletes a custom emoji.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `emojiId` (string) - Emoji ID
- **Returns**: Success confirmation

### Invite Methods

#### `getInvite(inviteCode: string)`
Gets information about an invite.
- **Required**: `inviteCode` (string) - Invite code
- **Returns**: Invite object with counts and expiration

#### `deleteInvite(inviteCode: string)`
Deletes/revokes an invite.
- **Required**: `inviteCode` (string) - Invite code
- **Returns**: Deleted invite object

### Voice Methods

#### `listVoiceRegions()`
Lists available voice regions.
- **Returns**: Array of voice region objects

#### `getVoiceRegions()`
Alias for listVoiceRegions.
- **Returns**: Array of voice region objects

### Webhook Methods

#### `createWebhook(channelId: string, name: string, avatar?: string)`
Creates a webhook.
- **Required**: `channelId` (string) - Channel ID
- **Required**: `name` (string) - Webhook name
- **Optional**: `avatar` (string) - Base64 avatar image
- **Returns**: Created webhook object

#### `getChannelWebhooks(channelId: string)`
Lists webhooks for a channel.
- **Required**: `channelId` (string) - Channel ID
- **Returns**: Array of webhook objects

#### `getGuildWebhooks(guildId: string)`
Lists webhooks for a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of webhook objects

#### `getWebhook(webhookId: string)`
Gets a webhook.
- **Required**: `webhookId` (string) - Webhook ID
- **Returns**: Webhook object

#### `getWebhookWithToken(webhookId: string, webhookToken: string)`
Gets a webhook without requiring authentication.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Returns**: Webhook object

#### `modifyWebhook(webhookId: string, data: object)`
Updates a webhook.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `data` (object) - Updates (name, avatar, channel_id)
- **Returns**: Updated webhook object

#### `modifyWebhookWithToken(webhookId: string, webhookToken: string, data: object)`
Updates a webhook using its token.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `data` (object) - Updates
- **Returns**: Updated webhook object

#### `deleteWebhook(webhookId: string)`
Deletes a webhook.
- **Required**: `webhookId` (string) - Webhook ID
- **Returns**: Success confirmation

#### `deleteWebhookWithToken(webhookId: string, webhookToken: string)`
Deletes a webhook using its token.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Returns**: Success confirmation

#### `executeWebhook(webhookId: string, webhookToken: string, content: any)`
Executes a webhook (sends a message).
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `content` (string | object) - Message content or object
- **Returns**: Created message object

#### `executeSlackCompatibleWebhook(webhookId: string, webhookToken: string, data: object)`
Executes a webhook with Slack-compatible payload.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `data` (object) - Slack-formatted payload
- **Returns**: Success confirmation

#### `executeGitHubCompatibleWebhook(webhookId: string, webhookToken: string, data: object)`
Executes a webhook with GitHub-compatible payload.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `data` (object) - GitHub-formatted payload
- **Returns**: Success confirmation

#### `getWebhookMessage(webhookId: string, webhookToken: string, messageId: string)`
Gets a message sent by a webhook.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `messageId` (string) - Message ID
- **Returns**: Message object

#### `editWebhookMessage(webhookId: string, webhookToken: string, messageId: string, data: object)`
Edits a webhook message.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `messageId` (string) - Message ID
- **Required**: `data` (object) - Message updates
- **Returns**: Updated message object

#### `deleteWebhookMessage(webhookId: string, webhookToken: string, messageId: string)`
Deletes a webhook message.
- **Required**: `webhookId` (string) - Webhook ID
- **Required**: `webhookToken` (string) - Webhook token
- **Required**: `messageId` (string) - Message ID
- **Returns**: Success confirmation

### Application Command Methods

(Application/Slash Command methods - extensive list available in Discord API)

### Sticker Methods

#### `getSticker(stickerId: string)`
Gets a sticker.
- **Required**: `stickerId` (string) - Sticker ID
- **Returns**: Sticker object

#### `listStickerPacks()`
Lists available sticker packs.
- **Returns**: Array of sticker pack objects

#### `listGuildStickers(guildId: string)`
Lists stickers in a guild.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of sticker objects

#### `getGuildSticker(guildId: string, stickerId: string)`
Gets a guild sticker.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `stickerId` (string) - Sticker ID
- **Returns**: Sticker object

#### `createGuildSticker(guildId: string, data: object)`
Creates a guild sticker.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Sticker data (name, description, emoji, file)
- **Returns**: Created sticker object

#### `modifyGuildSticker(guildId: string, stickerId: string, data: object)`
Updates a guild sticker.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `stickerId` (string) - Sticker ID
- **Required**: `data` (object) - Updates
- **Returns**: Updated sticker object

#### `deleteGuildSticker(guildId: string, stickerId: string)`
Deletes a guild sticker.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `stickerId` (string) - Sticker ID
- **Returns**: Success confirmation

### Stage Instance Methods

#### `createStageInstance(channelId: string, topic: string, options?: object)`
Creates a stage instance.
- **Required**: `channelId` (string) - Stage channel ID
- **Required**: `topic` (string) - Stage topic
- **Optional**: `options` (object) - Privacy level, notifications
- **Returns**: Created stage instance object

#### `getStageInstance(channelId: string)`
Gets a stage instance.
- **Required**: `channelId` (string) - Stage channel ID
- **Returns**: Stage instance object

#### `modifyStageInstance(channelId: string, topic?: string, privacyLevel?: number)`
Updates a stage instance.
- **Required**: `channelId` (string) - Stage channel ID
- **Optional**: `topic` (string) - New topic
- **Optional**: `privacyLevel` (number) - Privacy level
- **Returns**: Updated stage instance object

#### `deleteStageInstance(channelId: string)`
Deletes a stage instance.
- **Required**: `channelId` (string) - Stage channel ID
- **Returns**: Success confirmation

### Auto Moderation Methods

#### `listAutoModerationRulesForGuild(guildId: string)`
Lists auto-moderation rules.
- **Required**: `guildId` (string) - Guild ID
- **Returns**: Array of auto-moderation rule objects

#### `getAutoModerationRule(guildId: string, autoModerationRuleId: string)`
Gets an auto-moderation rule.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `autoModerationRuleId` (string) - Rule ID
- **Returns**: Auto-moderation rule object

#### `createAutoModerationRule(guildId: string, data: object)`
Creates an auto-moderation rule.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `data` (object) - Rule configuration
- **Returns**: Created auto-moderation rule object

#### `modifyAutoModerationRule(guildId: string, autoModerationRuleId: string, data: object)`
Updates an auto-moderation rule.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `autoModerationRuleId` (string) - Rule ID
- **Required**: `data` (object) - Rule updates
- **Returns**: Updated auto-moderation rule object

#### `deleteAutoModerationRule(guildId: string, autoModerationRuleId: string)`
Deletes an auto-moderation rule.
- **Required**: `guildId` (string) - Guild ID
- **Required**: `autoModerationRuleId` (string) - Rule ID
- **Returns**: Success confirmation

---

## Notion

### Page Methods

#### `getPage(pageId: string)`
Gets a page object including properties and metadata.
- **Required**: `pageId` (string) - Page ID
- **Returns**: Page object

#### `createPage(data: object)`
Creates a new page.
- **Required**: `data` (object) - Page data including parent, properties, children
- **Returns**: Created page object

#### `updatePage(pageId: string, data: object)`
Updates page properties or adds content.
- **Required**: `pageId` (string) - Page ID
- **Required**: `data` (object) - Properties or content to update
- **Returns**: Updated page object

#### `archivePage(pageId: string)`
Archives a page (moves to trash).
- **Required**: `pageId` (string) - Page ID
- **Returns**: Archived page object

#### `getPageProperty(pageId: string, propertyId: string)`
Gets a specific property value from a page.
- **Required**: `pageId` (string) - Page ID
- **Required**: `propertyId` (string) - Property ID
- **Returns**: Property item object

#### `createPageInDatabase(databaseId: string, properties: object, content?: any[])`
Creates a page inside a database.
- **Required**: `databaseId` (string) - Database ID
- **Required**: `properties` (object) - Property values
- **Optional**: `content` (array) - Block children
- **Returns**: Created page object

#### `createPageWithContent(parent: object, title: string, content: any[])`
Creates a page with initial content blocks.
- **Required**: `parent` (object) - Parent object (page or database)
- **Required**: `title` (string) - Page title
- **Required**: `content` (array) - Initial block content
- **Returns**: Created page object

### Database Methods

#### `getDatabase(databaseId: string)`
Gets a database object including schema.
- **Required**: `databaseId` (string) - Database ID
- **Returns**: Database object

#### `createDatabase(data: object)`
Creates a new database.
- **Required**: `data` (object) - Database configuration including parent, properties
- **Returns**: Created database object

#### `updateDatabase(databaseId: string, data: object)`
Updates database properties or schema.
- **Required**: `databaseId` (string) - Database ID
- **Required**: `data` (object) - Database updates
- **Returns**: Updated database object

#### `queryDatabase(databaseId: string, query?: object)`
Queries a database with filters and sorts.
- **Required**: `databaseId` (string) - Database ID
- **Optional**: `query` (object) - Filter, sorts, pagination
- **Returns**: Query results with page objects

### Block Methods

#### `getBlock(blockId: string)`
Gets a block object.
- **Required**: `blockId` (string) - Block ID
- **Returns**: Block object

#### `updateBlock(blockId: string, data: object)`
Updates block content or properties.
- **Required**: `blockId` (string) - Block ID
- **Required**: `data` (object) - Block updates
- **Returns**: Updated block object

#### `deleteBlock(blockId: string)`
Deletes a block.
- **Required**: `blockId` (string) - Block ID
- **Returns**: Deleted block object

#### `getBlockChildren(blockId: string, startCursor?: string, pageSize?: number)`
Gets children of a block.
- **Required**: `blockId` (string) - Block ID
- **Optional**: `startCursor` (string) - Pagination cursor
- **Optional**: `pageSize` (number) - Results per page
- **Returns**: Array of child block objects

#### `appendBlockChildren(blockId: string, children: any[])`
Appends blocks as children of a block.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `children` (array) - Block objects to append
- **Returns**: Block object with new children

#### `addTextBlock(blockId: string, text: string, type?: string)`
Adds a text block (paragraph, heading, etc.).
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - Text content
- **Optional**: `type` (string) - Block type (default: "paragraph")
- **Returns**: Success confirmation

#### `addToDoBlock(blockId: string, text: string, checked?: boolean)`
Adds a to-do/checkbox block.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - To-do text
- **Optional**: `checked` (boolean) - Checked state (default: false)
- **Returns**: Success confirmation

#### `addBulletedListItem(blockId: string, text: string)`
Adds a bulleted list item.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - List item text
- **Returns**: Success confirmation

#### `addNumberedListItem(blockId: string, text: string)`
Adds a numbered list item.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - List item text
- **Returns**: Success confirmation

#### `addToggleBlock(blockId: string, text: string, children?: any[])`
Adds a toggle/collapsible block.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - Toggle heading text
- **Optional**: `children` (array) - Nested blocks
- **Returns**: Success confirmation

#### `addCalloutBlock(blockId: string, text: string, emoji?: string)`
Adds a callout block.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - Callout text
- **Optional**: `emoji` (string) - Callout icon emoji
- **Returns**: Success confirmation

#### `addQuoteBlock(blockId: string, text: string)`
Adds a quote block.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `text` (string) - Quote text
- **Returns**: Success confirmation

#### `addCodeBlock(blockId: string, code: string, language?: string)`
Adds a code block.
- **Required**: `blockId` (string) - Parent block ID
- **Required**: `code` (string) - Code content
- **Optional**: `language` (string) - Programming language (default: "plain text")
- **Returns**: Success confirmation

#### `addDividerBlock(blockId: string)`
Adds a divider/horizontal rule.
- **Required**: `blockId` (string) - Parent block ID
- **Returns**: Success confirmation

### User Methods

#### `getUser(userId: string)`
Gets a user object.
- **Required**: `userId` (string) - User ID
- **Returns**: User object

#### `getCurrentUser()`
Gets the bot/integration user.
- **Returns**: Bot user object

#### `listUsers(startCursor?: string, pageSize?: number)`
Lists all users in the workspace.
- **Optional**: `startCursor` (string) - Pagination cursor
- **Optional**: `pageSize` (number) - Results per page
- **Returns**: Array of user objects

### Comment Methods

#### `createComment(data: object)`
Creates a comment on a page or discussion.
- **Required**: `data` (object) - Comment data including parent and rich_text
- **Returns**: Created comment object

#### `getComments(blockId: string, startCursor?: string, pageSize?: number)`
Gets comments for a block/page.
- **Required**: `blockId` (string) - Block/page ID
- **Optional**: `startCursor` (string) - Pagination cursor
- **Optional**: `pageSize` (number) - Results per page
- **Returns**: Array of comment objects

### Search Methods

#### `search(query: string, options?: object)`
Searches pages and databases.
- **Required**: `query` (string) - Search query text
- **Optional**: `options` (object) - Filter, sort, pagination
- **Returns**: Search results with page/database objects

#### `searchPages(query: string, options?: object)`
Searches specifically for pages.
- **Required**: `query` (string) - Search query
- **Optional**: `options` (object) - Additional filters
- **Returns**: Page search results

#### `searchDatabases(query: string, options?: object)`
Searches specifically for databases.
- **Required**: `query` (string) - Search query
- **Optional**: `options` (object) - Additional filters
- **Returns**: Database search results

### Helper Methods

#### `createRichText(text: string)`
Creates a rich text object for use in properties and blocks.
- **Required**: `text` (string) - Plain text
- **Returns**: Rich text array object

---

## Summary

This document provides comprehensive documentation for all **459+ methods** across the 9 providers supported by Fync:

- **GitHub**: 80+ methods
- **NPM**: 13 methods
- **GitLab**: 85+ methods
- **Spotify**: 70+ methods
- **Google Calendar**: 35+ methods
- **Google Drive**: 45+ methods
- **Vercel**: 30+ methods
- **Discord**: 85+ methods
- **Notion**: 30+ methods

Each method includes:
- Method signature
- Description of functionality
- Required parameters
- Optional parameters
- Return type information

For usage examples and authentication setup, refer to the main README.md file.
