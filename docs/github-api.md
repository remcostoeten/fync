# GitHub API Methods

## Client Configuration

```typescript
import { GitHub } from '@remcostoeten/fync/github';

const github = GitHub({ 
  token: process.env.GITHUB_TOKEN,
  cache: true,
  cacheTTL: 600000
});
```

## Core Client Methods

### github.api
```typescript
const response = await github.api.users.octocat.get();
```

### github.user(username)
```typescript
const userClient = github.user('octocat');
const profile = await userClient.get();
```

### github.repo(owner, repo)
```typescript
const repoClient = github.repo('facebook', 'react');
const repository = await repoClient.get();
```

### github.org(orgName)
```typescript
const orgClient = github.org('facebook');
const organization = await orgClient.get();
```

### github.gist(gistId)
```typescript
const gistClient = github.gist('1234567890abcdef');
const gist = await gistClient.get();
```

### github.rateLimit.get()
```typescript
const rateLimit = await github.rateLimit.get();
console.log(`Remaining: ${rateLimit.remaining}`);
```

## User Methods

### user.get()
```typescript
const user = await github.user('octocat').get();
console.log(user.name);
```

### user.repos
```typescript
const repos = await github.user('octocat').repos.get();
```

### user.gists
```typescript
const gists = await github.user('octocat').gists.get();
```

### user.followers
```typescript
const followers = await github.user('octocat').followers.get();
```

### user.following
```typescript
const following = await github.user('octocat').following.get();
```

### user.starred
```typescript
const starred = await github.user('octocat').starred.get();
```

### user.subscriptions
```typescript
const subscriptions = await github.user('octocat').subscriptions.get();
```

### user.orgs
```typescript
const orgs = await github.user('octocat').orgs.get();
```

### user.events
```typescript
const events = await github.user('octocat').events.get();
```

### user.received_events
```typescript
const receivedEvents = await github.user('octocat').received_events.get();
```

## Repository Methods

### repo.get()
```typescript
const repo = await github.repo('facebook', 'react').get();
console.log(`Stars: ${repo.stargazers_count}`);
```

### repo.branches
```typescript
const branches = await github.repo('facebook', 'react').branches.get();
```

### repo.commits
```typescript
const commits = await github.repo('facebook', 'react').commits.get();
```

### repo.contents
```typescript
const contents = await github.repo('facebook', 'react').contents.get();
```

### repo.contributors
```typescript
const contributors = await github.repo('facebook', 'react').contributors.get();
```

### repo.deployments
```typescript
const deployments = await github.repo('facebook', 'react').deployments.get();
```

### repo.forks
```typescript
const forks = await github.repo('facebook', 'react').forks.get();
```

### repo.issues
```typescript
const issues = await github.repo('facebook', 'react').issues.get();
```

### repo.pulls
```typescript
const pulls = await github.repo('facebook', 'react').pulls.get();
```

### repo.releases
```typescript
const releases = await github.repo('facebook', 'react').releases.get();
```

### repo.tags
```typescript
const tags = await github.repo('facebook', 'react').tags.get();
```

### repo.topics
```typescript
const topics = await github.repo('facebook', 'react').topics.get();
```

### repo.labels
```typescript
const labels = await github.repo('facebook', 'react').labels.get();
```

### repo.milestones
```typescript
const milestones = await github.repo('facebook', 'react').milestones.get();
```

## Enhanced Repository Methods

### repo.getIssues(options?)
```typescript
const issues = await github.repo('facebook', 'react').getIssues({
  params: { state: 'open', per_page: 50 }
});
```

### repo.getIssue(issueNumber)
```typescript
const issue = await github.repo('facebook', 'react').getIssue(1234);
```

### repo.getIssueComments(issueNumber, options?)
```typescript
const comments = await github.repo('facebook', 'react').getIssueComments(1234);
```

### repo.getIssueEvents(issueNumber, options?)
```typescript
const events = await github.repo('facebook', 'react').getIssueEvents(1234);
```

### repo.getPulls(options?)
```typescript
const pulls = await github.repo('facebook', 'react').getPulls({
  params: { state: 'open' }
});
```

### repo.getPull(pullNumber)
```typescript
const pull = await github.repo('facebook', 'react').getPull(567);
```

### repo.getPullReviews(pullNumber, options?)
```typescript
const reviews = await github.repo('facebook', 'react').getPullReviews(567);
```

### repo.getPullComments(pullNumber, options?)
```typescript
const comments = await github.repo('facebook', 'react').getPullComments(567);
```

### repo.getReleases(options?)
```typescript
const releases = await github.repo('facebook', 'react').getReleases();
```

### repo.getRelease(releaseId)
```typescript
const release = await github.repo('facebook', 'react').getRelease(123456);
```

### repo.getLatestRelease()
```typescript
const latest = await github.repo('facebook', 'react').getLatestRelease();
```

### repo.getReleaseAssets(releaseId)
```typescript
const assets = await github.repo('facebook', 'react').getReleaseAssets(123456);
```

### repo.getTags(options?)
```typescript
const tags = await github.repo('facebook', 'react').getTags();
```

### repo.getLabels(options?)
```typescript
const labels = await github.repo('facebook', 'react').getLabels();
```

### repo.getMilestones(options?)
```typescript
const milestones = await github.repo('facebook', 'react').getMilestones();
```

## Repository Actions Methods

### repo.actions.workflows.list(options?)
```typescript
const workflows = await github.repo('facebook', 'react').actions.workflows.list();
```

### repo.actions.workflows.get(workflowId)
```typescript
const workflow = await github.repo('facebook', 'react').actions.workflows.get(123);
```

### repo.actions.workflows.runs(workflowId, options?)
```typescript
const runs = await github.repo('facebook', 'react').actions.workflows.runs(123);
```

### repo.actions.workflows.jobs(runId, options?)
```typescript
const jobs = await github.repo('facebook', 'react').actions.workflows.jobs(456);
```

### repo.actions.runs.list(options?)
```typescript
const runs = await github.repo('facebook', 'react').actions.runs.list();
```

### repo.actions.runs.get(runId)
```typescript
const run = await github.repo('facebook', 'react').actions.runs.get(456);
```

### repo.actions.runs.jobs(runId, options?)
```typescript
const jobs = await github.repo('facebook', 'react').actions.runs.jobs(456);
```

### repo.actions.secrets.get(options?)
```typescript
const secrets = await github.repo('facebook', 'react').actions.secrets.get();
```

## Organization Methods

### org.get()
```typescript
const org = await github.org('facebook').get();
console.log(org.name);
```

### org.repos
```typescript
const repos = await github.org('facebook').repos.get();
```

### org.members
```typescript
const members = await github.org('facebook').members.get();
```

### org.teams
```typescript
const teams = await github.org('facebook').teams.get();
```

### org.events
```typescript
const events = await github.org('facebook').events.get();
```

## Gist Methods

### gist.get()
```typescript
const gist = await github.gist('1234567890abcdef').get();
```

### gist.comments
```typescript
const comments = await github.gist('1234567890abcdef').comments.get();
```

### gist.commits
```typescript
const commits = await github.gist('1234567890abcdef').commits.get();
```

### gist.forks
```typescript
const forks = await github.gist('1234567890abcdef').forks.get();
```

### gist.star
```typescript
await github.gist('1234567890abcdef').star.put({});
```

## Search Methods

### search.repositories(query, options?)
```typescript
const results = await github.search.repositories('typescript', {
  params: { sort: 'stars', order: 'desc' }
});
```

### search.users(query, options?)
```typescript
const users = await github.search.users('tom location:san-francisco');
```

### search.issues(query, options?)
```typescript
const issues = await github.search.issues('bug label:frontend is:open');
```

### search.code(query, options?)
```typescript
const code = await github.search.code('fetch user:octocat');
```

### search.commits(query, options?)
```typescript
const commits = await github.search.commits('fix bug author:octocat');
```

### search.topics(query, options?)
```typescript
const topics = await github.search.topics('machine-learning');
```

### search.labels(query, options?)
```typescript
const labels = await github.search.labels('enhancement repo:facebook/react');
```

## Authenticated User Methods

### me.get()
```typescript
const currentUser = await github.me.get();
console.log(currentUser.login);
```

### me.repos
```typescript
const myRepos = await github.me.repos.get();
```

### me.gists
```typescript
const myGists = await github.me.gists.get();
```

### me.followers
```typescript
const myFollowers = await github.me.followers.get();
```

### me.following
```typescript
const following = await github.me.following.get();
```

### me.starred
```typescript
const starred = await github.me.starred.get();
```

### me.subscriptions
```typescript
const subscriptions = await github.me.subscriptions.get();
```

### me.orgs
```typescript
const myOrgs = await github.me.orgs.get();
```

### me.issues
```typescript
const myIssues = await github.me.issues.get();
```

## Notification Methods

### notifications.get(options?)
```typescript
const notifications = await github.notifications.get();
```

### notifications.markAsRead(options?)
```typescript
await github.notifications.markAsRead();
```

### notifications.markRepoAsRead(owner, repo, options?)
```typescript
await github.notifications.markRepoAsRead('facebook', 'react');
```

## Chainable Client Methods

### .get<T>(options?)
```typescript
const data = await github.api.users.octocat.get();
```

### .post<T>(data, options?)
```typescript
const result = await github.api.user.repos.post({
  name: 'new-repo',
  private: false
});
```

### .put<T>(data, options?)
```typescript
await github.api.user.starred.facebook.react.put({});
```

### .patch<T>(data, options?)
```typescript
const updated = await github.api.repos.owner.repo.patch({
  description: 'Updated description'
});
```

### .delete<T>(options?)
```typescript
await github.api.repos.owner.repo.delete();
```

### .paginate<T>(options?)
```typescript
const allIssues = await github.api.repos.facebook.react.issues.paginate();
```

### .stream<T>(options?)
```typescript
for await (const issue of github.api.repos.facebook.react.issues.stream()) {
  console.log(issue.title);
}
```

### .path()
```typescript
const currentPath = github.api.users.octocat.repos.path();
console.log(currentPath);
```
