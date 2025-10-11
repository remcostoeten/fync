import type { TApiSection } from '@/types/content'

export const githubContent: TApiSection[] = [
  {
    id: 'core-exports',
    title: 'Core Exports',
    description: 'Main entry points and core functionality of the Fync library',
    methods: [
      {
        id: 'main-entry-points',
        name: 'Main Entry Points',
        description: 'Primary package exports for different API clients and utilities',
        signature: 'import { ... } from "@remcostoeten/fync"',
        parameters: [],
        returnType: 'Various client factories and utilities',
        examples: [
          {
            id: 'core-imports',
            title: 'Core Package Imports',
            description: 'Import different parts of the Fync library',
            code: `import { GitHub } from '@remcostoeten/fync/github'
import { Spotify } from '@remcostoeten/fync/spotify'
import { createCore } from '@remcostoeten/fync/core'`,
            language: 'typescript',
            category: 'github',
            tags: ['imports', 'setup']
          }
        ]
      }
    ]
  },
  {
    id: 'github-client',
    title: 'GitHub API Client',
    description: 'Comprehensive GitHub API client with authentication and resource management',
    methods: [
      {
        id: 'github-main-client',
        name: 'GitHub()',
        description: 'Main GitHub client factory with optional configuration',
        signature: 'GitHub(config?: TGitHubClientConfig): GitHubClient',
        parameters: [
          {
            name: 'config',
            type: 'TGitHubClientConfig',
            description: 'Optional configuration including token, baseUrl, and other settings',
            required: false
          }
        ],
        returnType: 'GitHubClient',
        examples: [
          {
            id: 'github-client-init',
            title: 'Initialize GitHub Client',
            description: 'Create a GitHub client with authentication',
            code: `import { GitHub } from '@remcostoeten/fync/github'

const github = GitHub({
  token: 'your-github-token',
  baseUrl: 'https://api.github.com'
})

const userClient = github.user('octocat')
const repoClient = github.repo('facebook', 'react')`,
            language: 'typescript',
            category: 'github',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'github-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main GitHub client',
        signature: 'github.user() | github.repo() | github.org() | github.search | github.me',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'github-client-methods-example',
            title: 'GitHub Client Methods',
            description: 'Access different GitHub API endpoints through specialized clients',
            code: `const github = GitHub({ token: 'your-token' })

const userClient = github.user('username')
const meClient = github.me
const repoClient = github.repo('owner', 'repo')
const orgClient = github.org('organization')
const searchClient = github.search
const rateLimit = github.rateLimit`,
            language: 'typescript',
            category: 'github',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'github-user-operations',
    title: 'User Client Methods',
    description: 'Methods for interacting with GitHub users and their resources',
    methods: [
      {
        id: 'user-get',
        name: 'user().get()',
        description: 'Get user information and profile details',
        signature: 'github.user(username: string).get(): Promise<TGitHubUser>',
        parameters: [
          {
            name: 'username',
            type: 'string',
            description: 'GitHub username to fetch',
            required: true
          }
        ],
        returnType: 'Promise<TGitHubUser>',
        examples: [
          {
            id: 'user-get-example',
            title: 'Get User Information',
            description: 'Fetch detailed user profile information',
            code: `const user = await github.user('octocat').get()

console.log(user.name)
console.log(user.bio)
console.log(user.public_repos)
console.log(user.followers)
console.log(user.location)`,
            language: 'typescript',
            category: 'github',
            tags: ['user', 'profile']
          },
          {
            id: 'user-get-multiple',
            title: 'Get Multiple Users',
            description: 'Fetch information for multiple users efficiently',
            code: `const usernames = ['octocat', 'defunkt', 'mojombo']

const users = await Promise.all(
  usernames.map(function getUser(username) {
    return github.user(username).get()
  })
)

users.forEach(function displayUser(user) {
  console.log(user.name, user.followers)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['user', 'multiple']
          }
        ]
      },
      {
        id: 'user-resources',
        name: 'User Resources',
        description: 'Access user-related resources like repositories, gists, followers',
        signature: 'github.user(username).repos | .gists | .followers | .following',
        parameters: [],
        returnType: 'Various resource clients',
        examples: [
          {
            id: 'user-resources-example',
            title: 'Access User Resources',
            description: 'Get different types of user-related data',
            code: `const userClient = github.user('octocat')

const repos = await userClient.repos.get()
const gists = await userClient.gists.get()
const followers = await userClient.followers.get()
const following = await userClient.following.get()
const starred = await userClient.starred.get()`,
            language: 'typescript',
            category: 'github',
            tags: ['user', 'resources']
          }
        ]
      }
    ]
  },
  {
    id: 'github-repository-operations',
    title: 'Repository Client Methods',
    description: 'Comprehensive repository management and information retrieval',
    methods: [
      {
        id: 'repo-get',
        name: 'repo().get()',
        description: 'Get repository information and metadata',
        signature: 'github.repo(owner: string, repo: string).get(): Promise<TGitHubRepository>',
        parameters: [
          {
            name: 'owner',
            type: 'string',
            description: 'Repository owner username or organization',
            required: true
          },
          {
            name: 'repo',
            type: 'string',
            description: 'Repository name',
            required: true
          }
        ],
        returnType: 'Promise<TGitHubRepository>',
        examples: [
          {
            id: 'repo-get-example',
            title: 'Get Repository Information',
            description: 'Fetch comprehensive repository details',
            code: `const repo = await github.repo('facebook', 'react').get()

console.log(repo.name)
console.log(repo.description)
console.log(repo.stargazers_count)
console.log(repo.language)
console.log(repo.license.name)`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'details']
          },
          {
            id: 'repo-comparison',
            title: 'Compare Repositories',
            description: 'Compare multiple repositories side by side',
            code: `const frameworks = [
  ['facebook', 'react'],
  ['vuejs', 'vue'],
  ['angular', 'angular']
]

const repos = await Promise.all(
  frameworks.map(function getRepo([owner, name]) {
    return github.repo(owner, name).get()
  })
)

const sorted = repos.sort(function sortByStars(a, b) {
  return b.stargazers_count - a.stargazers_count
})

sorted.forEach(function displayRepo(repo, index) {
  console.log(index + 1, repo.name, repo.stargazers_count)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'comparison']
          }
        ]
      },
      {
        id: 'repo-issues',
        name: 'Issue Management',
        description: 'Manage repository issues, comments, and events',
        signature: 'github.repo(owner, repo).getIssues() | .getIssue()',
        parameters: [],
        returnType: 'Promise<TGitHubIssue[]>',
        examples: [
          {
            id: 'repo-issues-example',
            title: 'Repository Issue Management',
            description: 'Work with repository issues and their details',
            code: `const repoClient = github.repo('facebook', 'react')

const issues = await repoClient.getIssues()
const issue = await repoClient.getIssue(123)
const comments = await repoClient.getIssueComments(123)

issues.forEach(function displayIssue(issue) {
  console.log(issue.number, issue.title, issue.state)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'issues']
          }
        ]
      },
      {
        id: 'repo-pulls',
        name: 'Pull Request Management',
        description: 'Handle pull requests, reviews, and comments',
        signature: 'github.repo(owner, repo).getPulls() | .getPull()',
        parameters: [],
        returnType: 'Promise<TGitHubPullRequest[]>',
        examples: [
          {
            id: 'repo-pulls-example',
            title: 'Pull Request Management',
            description: 'Manage pull requests and their reviews',
            code: `const repoClient = github.repo('facebook', 'react')

const pulls = await repoClient.getPulls()
const pull = await repoClient.getPull(456)
const reviews = await repoClient.getPullReviews(456)

pulls.forEach(function displayPR(pr) {
  console.log(pr.number, pr.title, pr.state)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'pull-requests']
          }
        ]
      },
      {
        id: 'repo-releases',
        name: 'Release Management',
        description: 'Manage repository releases and assets',
        signature: 'github.repo(owner, repo).getReleases() | .getLatestRelease()',
        parameters: [],
        returnType: 'Promise<TGitHubRelease[]>',
        examples: [
          {
            id: 'repo-releases-example',
            title: 'Repository Release Management',
            description: 'Work with repository releases',
            code: `const repoClient = github.repo('facebook', 'react')

const releases = await repoClient.getReleases()
const latest = await repoClient.getLatestRelease()
const assets = await repoClient.getReleaseAssets('v18.0.0')

console.log(latest.tag_name)
console.log(latest.published_at)`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'releases']
          }
        ]
      },
      {
        id: 'repo-metadata',
        name: 'Repository Metadata',
        description: 'Access repository tags, labels, and milestones',
        signature: 'github.repo(owner, repo).getTags() | .getLabels()',
        parameters: [],
        returnType: 'Promise<Array>',
        examples: [
          {
            id: 'repo-metadata-example',
            title: 'Repository Metadata',
            description: 'Get repository tags, labels, and milestones',
            code: `const repoClient = github.repo('facebook', 'react')

const tags = await repoClient.getTags()
const labels = await repoClient.getLabels()
const milestones = await repoClient.getMilestones()

tags.forEach(function displayTag(tag) {
  console.log(tag.name, tag.commit.sha)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'metadata']
          }
        ]
      },
      {
        id: 'repo-resources',
        name: 'Repository Resources',
        description: 'Access branches, commits, contents, contributors',
        signature: 'github.repo(owner, repo).branches | .commits | .contents',
        parameters: [],
        returnType: 'Various resource clients',
        examples: [
          {
            id: 'repo-resources-example',
            title: 'Repository Resources',
            description: 'Access various repository resources',
            code: `const repoClient = github.repo('facebook', 'react')

const branches = await repoClient.branches.get()
const commits = await repoClient.commits.get()
const contributors = await repoClient.contributors.get()
const contents = await repoClient.contents.get()

console.log(branches.length, 'branches')
console.log(contributors.length, 'contributors')`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'resources']
          }
        ]
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        description: 'Manage GitHub Actions workflows, runs, and secrets',
        signature: 'github.repo(owner, repo).actions.workflows',
        parameters: [],
        returnType: 'GitHub Actions clients',
        examples: [
          {
            id: 'github-actions-example',
            title: 'GitHub Actions Management',
            description: 'Work with GitHub Actions',
            code: `const repoClient = github.repo('facebook', 'react')

const workflows = await repoClient.actions.workflows.list()
const runs = await repoClient.actions.runs.list()
const secrets = await repoClient.actions.secrets.list()

workflows.forEach(function displayWorkflow(workflow) {
  console.log(workflow.name, workflow.state)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'actions']
          }
        ]
      }
    ]
  },
  {
    id: 'github-search-operations',
    title: 'Search Client Methods',
    description: 'Search across repositories, users, issues, code, and more',
    methods: [
      {
        id: 'search-repositories',
        name: 'search.repositories()',
        description: 'Search for repositories using query parameters',
        signature: 'github.search.repositories(query: string): Promise<TGitHubRepository[]>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query with optional qualifiers',
            required: true
          }
        ],
        returnType: 'Promise<TGitHubRepository[]>',
        examples: [
          {
            id: 'search-repositories-example',
            title: 'Search Repositories',
            description: 'Find repositories using various criteria',
            code: `const repos = await github.search.repositories('javascript framework')

const reactRepos = await github.search.repositories(
  'language:javascript topic:react stars:>1000'
)

const facebookRepos = await github.search.repositories(
  'user:facebook language:javascript'
)

repos.forEach(function displayRepo(repo) {
  console.log(repo.full_name, repo.stargazers_count)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['search', 'repositories']
          },
          {
            id: 'search-advanced',
            title: 'Advanced Search',
            description: 'Use complex search queries',
            code: `const reactLibs = await github.search.repositories(
  'react library stars:>500 language:javascript'
)

const activeTS = await github.search.repositories(
  'language:typescript pushed:>2024-01-01 stars:>100'
)

const mlRepos = await github.search.repositories(
  'machine learning OR AI language:python stars:>1000'
)

const topReact = reactLibs.reduce(function findMostStarred(prev, current) {
  return prev.stargazers_count > current.stargazers_count ? prev : current
})

console.log(topReact.full_name)`,
            language: 'typescript',
            category: 'github',
            tags: ['search', 'advanced']
          }
        ]
      },
      {
        id: 'search-comprehensive',
        name: 'Comprehensive Search',
        description: 'Search across all GitHub content types',
        signature: 'github.search.users() | .issues() | .code() | .commits()',
        parameters: [],
        returnType: 'Promise<Array>',
        examples: [
          {
            id: 'search-comprehensive-example',
            title: 'Search All Content Types',
            description: 'Search users, issues, code, commits, and more',
            code: `const users = await github.search.users('location:amsterdam followers:>100')
const issues = await github.search.issues('is:open bug label:priority')
const code = await github.search.code('console.log filename:*.js')
const commits = await github.search.commits('author:octocat merge:false')
const topics = await github.search.topics('javascript')

users.forEach(function displayUser(user) {
  console.log(user.login, user.location)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['search', 'comprehensive']
          }
        ]
      }
    ]
  },
  {
    id: 'github-oauth2',
    title: 'OAuth2 System',
    description: 'Complete OAuth2 flow implementation for GitHub authentication',
    methods: [
      {
        id: 'oauth2-core',
        name: 'Core OAuth2 Functions',
        description: 'Create and manage OAuth2 authentication flows',
        signature: 'createGitHubOAuth2Flow()',
        parameters: [],
        returnType: 'OAuth2Flow',
        examples: [
          {
            id: 'oauth2-core-example',
            title: 'OAuth2 Flow Setup',
            description: 'Set up OAuth2 authentication for GitHub',
            code: `import { createGitHubOAuth2Flow, GITHUB_OAUTH2_SCOPES } from '@remcostoeten/fync/github/oauth'

const oauth = createGitHubOAuth2Flow({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'http://localhost:3000/api/auth/callback',
  scopes: [
    GITHUB_OAUTH2_SCOPES.USER,
    GITHUB_OAUTH2_SCOPES.REPO,
    GITHUB_OAUTH2_SCOPES.READ_ORG
  ]
})

const authUrl = await oauth.getAuthorizationUrl({ state: 'random-state' })
const tokens = await oauth.exchangeCodeForToken({ code: 'auth-code', state: 'random-state' })`,
            language: 'typescript',
            category: 'github',
            tags: ['oauth2', 'authentication']
          }
        ]
      },
      {
        id: 'nextjs-helpers',
        name: 'Next.js Framework Helpers',
        description: 'Next.js specific OAuth2 integration helpers',
        signature: 'createNextJSOAuth2Handler()',
        parameters: [],
        returnType: 'NextJS API handlers',
        examples: [
          {
            id: 'nextjs-helpers-example',
            title: 'Next.js OAuth2 Integration',
            description: 'Integrate OAuth2 with Next.js API routes',
            code: `import { createNextJSOAuth2Handler } from '@remcostoeten/fync/github/oauth'

export default createNextJSOAuth2Handler({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  redirectUri: process.env.GITHUB_REDIRECT_URI,
  scopes: ['user', 'repo']
})`,
            language: 'typescript',
            category: 'github',
            tags: ['oauth2', 'nextjs']
          }
        ]
      },
      {
        id: 'oauth2-utilities',
        name: 'OAuth2 Utilities',
        description: 'Utility functions for OAuth2 token and state management',
        signature: 'isTokenExpired() | generateRandomString()',
        parameters: [],
        returnType: 'Various utility functions',
        examples: [
          {
            id: 'oauth2-utilities-example',
            title: 'OAuth2 Utilities',
            description: 'Use OAuth2 utility functions',
            code: `import {
  isTokenExpired,
  shouldRefreshToken,
  generateRandomString,
  generateCodeVerifier,
  sanitizeScopes
} from '@remcostoeten/fync/github/oauth'

const expired = isTokenExpired(tokenExpiresAt)
const shouldRefresh = shouldRefreshToken(tokenExpiresAt, 300)
const state = generateRandomString(32)
const codeVerifier = generateCodeVerifier()
const scopes = sanitizeScopes(['user', 'repo'])`,
            language: 'typescript',
            category: 'github',
            tags: ['oauth2', 'utilities']
          }
        ]
      }
    ]
  }
]
