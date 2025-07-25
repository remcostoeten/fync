"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GitHub = GitHub;
var _githubClient = require("./services/github-client");
/**
 * Creates a new GitHub API client
 *
 * @param config - Configuration for the GitHub client
 * @param config.token - GitHub personal access token or OAuth token (required)
 * @param config.baseUrl - Custom GitHub API URL (default: https://api.github.com)
 * @param config.cache - Enable response caching (default: false)
 * @param config.cacheTTL - Cache time-to-live in milliseconds (default: 300000)
 * @param config.timeout - Request timeout in milliseconds (default: 30000)
 *
 * @returns GitHub client instance with access to users, repositories, organizations, and more
 *
 * @example
 * ```typescript
 * const github = GitHub({
 *   token: process.env.GITHUB_TOKEN,
 *   cache: true
 * });
 *
 * // Get user information
 * const user = await github.user('octocat').get();
 *
 * // Get repository details
 * const repo = await github.repo('facebook', 'react').get();
 *
 * // Search repositories
 * const results = await github.search.repositories('typescript');
 *
 * // Get current user's notifications
 * const notifications = await github.notifications.get();
 * ```
 */
function GitHub(config) {
  const client = (0, _githubClient.createGitHubClient)(config);
  function createUserClient(username) {
    const userBase = client.users[username];
    return {
      get: () => userBase.get(),
      repos: userBase.repos,
      gists: userBase.gists,
      followers: userBase.followers,
      following: userBase.following,
      starred: userBase.starred,
      subscriptions: userBase.subscriptions,
      orgs: userBase.orgs,
      events: userBase.events,
      received_events: userBase.received_events,
      chain: userBase
    };
  }
  function createRepoClient(owner, repo) {
    const repoBase = client.repos[owner][repo];
    return {
      get: () => repoBase.get(),
      branches: repoBase.branches,
      commits: repoBase.commits,
      contents: repoBase.contents,
      contributors: repoBase.contributors,
      deployments: repoBase.deployments,
      forks: repoBase.forks,
      issues: repoBase.issues,
      pulls: repoBase.pulls,
      releases: repoBase.releases,
      tags: repoBase.tags,
      topics: repoBase.topics,
      labels: repoBase.labels,
      milestones: repoBase.milestones,
      // Enhanced typed methods for common operations
      getIssues: options => repoBase.issues.get(options),
      getIssue: issueNumber => repoBase.issues[issueNumber].get(),
      getIssueComments: (issueNumber, options) => repoBase.issues[issueNumber].comments.get(options),
      getIssueEvents: (issueNumber, options) => repoBase.issues[issueNumber].events.get(options),
      getPulls: options => repoBase.pulls.get(options),
      getPull: pullNumber => repoBase.pulls[pullNumber].get(),
      getPullReviews: (pullNumber, options) => repoBase.pulls[pullNumber].reviews.get(options),
      getPullComments: (pullNumber, options) => repoBase.pulls[pullNumber].comments.get(options),
      getReleases: options => repoBase.releases.get(options),
      getRelease: releaseId => repoBase.releases[releaseId].get(),
      getLatestRelease: () => repoBase.releases.latest.get(),
      getReleaseAssets: releaseId => repoBase.releases[releaseId].assets.get(),
      getTags: options => repoBase.tags.get(options),
      getLabels: options => repoBase.labels.get(options),
      getMilestones: options => repoBase.milestones.get(options),
      // Actions and workflows
      actions: {
        workflows: {
          list: options => repoBase.actions.workflows.get(options),
          get: workflowId => repoBase.actions.workflows[workflowId].get(),
          runs: (workflowId, options) => repoBase.actions.workflows[workflowId].runs.get(options),
          jobs: (runId, options) => repoBase.actions.runs[runId].jobs.get(options)
        },
        runs: {
          list: options => repoBase.actions.runs.get(options),
          get: runId => repoBase.actions.runs[runId].get(),
          jobs: (runId, options) => repoBase.actions.runs[runId].jobs.get(options)
        },
        secrets: {
          get: options => repoBase.actions.secrets.get(options)
        }
      },
      chain: repoBase
    };
  }
  function createOrgClient(orgName) {
    const orgBase = client.orgs[orgName];
    return {
      get: () => orgBase.get(),
      repos: orgBase.repos,
      members: orgBase.members,
      teams: orgBase.teams,
      events: orgBase.events,
      chain: orgBase
    };
  }
  function createGistClient(gistId) {
    const gistBase = client.gists[gistId];
    return {
      get: () => gistBase.get(),
      comments: gistBase.comments,
      commits: gistBase.commits,
      forks: gistBase.forks,
      star: gistBase.star,
      chain: gistBase
    };
  }
  const searchClient = {
    repositories: (query, options) => client.search.repositories.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    }),
    users: (query, options) => client.search.users.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    }),
    issues: (query, options) => client.search.issues.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    }),
    code: (query, options) => client.search.code.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    }),
    commits: (query, options) => client.search.commits.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    }),
    topics: (query, options) => client.search.topics.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    }),
    labels: (query, options) => client.search.labels.get({
      ...options,
      params: {
        ...options?.params,
        q: query
      }
    })
  };
  const authenticatedUserClient = {
    get: () => client.user.get(),
    repos: client.user.repos,
    gists: client.user.gists,
    followers: client.user.followers,
    following: client.user.following,
    starred: client.user.starred,
    subscriptions: client.user.subscriptions,
    orgs: client.user.orgs,
    issues: client.user.issues,
    chain: client.user
  };
  const rateLimitClient = {
    get: () => client.rate_limit.get()
  };
  const notificationsClient = {
    get: options => client.notifications.get(options),
    markAsRead: options => client.notifications.put({}, options),
    markRepoAsRead: (owner, repo, options) => client.repos[owner][repo].notifications.put({}, options)
  };
  return {
    api: client,
    user: createUserClient,
    repo: createRepoClient,
    org: createOrgClient,
    gist: createGistClient,
    search: searchClient,
    me: authenticatedUserClient,
    rateLimit: rateLimitClient,
    notifications: notificationsClient
  };
}