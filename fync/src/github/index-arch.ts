import { createFyncApi, createFyncMethod, createFyncResource } from '../core';

function initGitHub(token: string) {
  const api = createFyncApi({
    baseUrl: 'https://api.github.com',
    auth: { type: 'bearer', token },
    headers: { 
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  return api;
}

// Define methods using fluent pattern as shown in architecture.md
const getUser = createFyncMethod('getUser')
  .args('username')
  .endpoint('/users/{username}')
  .build();

const getUserRepos = createFyncMethod('getUserRepos')
  .args('username')
  .endpoint('/users/{username}/repos')
  .build();

const getRepo = createFyncMethod('getRepo')
  .args('owner', 'repo')
  .endpoint('/repos/{owner}/{repo}')
  .build();

const getRepoIssues = createFyncMethod('getRepoIssues')
  .args('owner', 'repo')
  .endpoint('/repos/{owner}/{repo}/issues')
  .build();

const createIssue = createFyncMethod('createIssue')
  .args('owner', 'repo', 'data')
  .endpoint('/repos/{owner}/{repo}/issues')
  .method('POST')
  .build();

const getRepoCommits = createFyncMethod('getRepoCommits')
  .args('owner', 'repo')
  .endpoint('/repos/{owner}/{repo}/commits')
  .build();

const getRepoPulls = createFyncMethod('getRepoPulls')
  .args('owner', 'repo')
  .endpoint('/repos/{owner}/{repo}/pulls')
  .build();

const searchRepos = createFyncMethod('searchRepos')
  .args('query')
  .endpoint('/search/repositories')
  .build();

const searchUsers = createFyncMethod('searchUsers')
  .args('query')
  .endpoint('/search/users')
  .build();

const getOrg = createFyncMethod('getOrg')
  .args('org')
  .endpoint('/orgs/{org}')
  .build();

const getOrgRepos = createFyncMethod('getOrgRepos')
  .args('org')
  .endpoint('/orgs/{org}/repos')
  .build();

// Export using createFyncResource pattern
export function GitHub(config: { token: string }) {
  const api = initGitHub(config.token);
  
  const resource = createFyncResource('github')
    .methods({
      getUser,
      getUserRepos,
      getRepo,
      getRepoIssues,
      createIssue,
      getRepoCommits,
      getRepoPulls,
      searchRepos,
      searchUsers,
      getOrg,
      getOrgRepos,
    })
    .build(api);
    
  return resource;
}
