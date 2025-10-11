import type { TApiSection } from '../types';

export const githubApiData: TApiSection[] = [
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
            code: `// Core functionality
import { createCore } from '@remcostoeten/fync'

// Spotify API client
import { Spotify, SPOTIFY_SCOPES } from '@remcostoeten/fync/spotify'

// GitHub API client
import { GitHub, GITHUB_OAUTH2_SCOPES } from '@remcostoeten/fync/github'

// Core utilities
import { createLRUCache, createHttpClient } from '@remcostoeten/fync/core'`,
            language: 'typescript',
            category: 'core',
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

// Basic initialization
const github = GitHub()

// With authentication token
const github = GitHub({
  token: 'your-github-token',
  baseUrl: 'https://api.github.com' // optional
})

// Access different client methods
const userClient = github.user('octocat')
const repoClient = github.repo('facebook', 'react')
const searchClient = github.search`,
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

// User operations
const userClient = github.user('username')
const meClient = github.me

// Repository operations
const repoClient = github.repo('owner', 'repo')

// Organization operations
const orgClient = github.org('organization')

// Gist operations
const gistClient = github.gist('gist-id')

// Search operations
const searchClient = github.search

// Rate limiting and notifications
const rateLimit = github.rateLimit
const notifications = github.notifications`,
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
            code: `// Get basic user information
const user = await github.user('octocat').get()

console.log(user.name) // The Octocat
console.log(user.bio) // A passionate developer
console.log(user.public_repos) // 8
console.log(user.followers) // 4000
console.log(user.location) // San Francisco

// Check if user is hireable
if (user.hireable) {
  console.log(\`\${user.name} is available for hire!\`)
}`,
            language: 'typescript',
            category: 'github',
            tags: ['user', 'profile']
          },
          {
            id: 'user-get-with-error-handling',
            title: 'Get User with Error Handling',
            description: 'Handle cases where user might not exist or API fails',
            code: `try {
  const user = await github.user('someusername').get()
  
  console.log(\`Found user: \${user.login}\`)
  console.log(\`Joined GitHub: \${new Date(user.created_at).getFullYear()}\`)
  
  // Check account type
  if (user.type === 'Organization') {
    console.log('This is an organization account')
  } else {
    console.log('This is a personal account')
  }
} catch (error) {
  if (error.status === 404) {
    console.log('User not found')
  } else if (error.status === 403) {
    console.log('Rate limit exceeded or access forbidden')
  } else {
    console.log('API error:', error.message)
  }
}`,
            language: 'typescript',
            category: 'github',
            tags: ['user', 'profile']
          },
          {
            id: 'user-get-multiple-users',
            title: 'Get Multiple Users',
            description: 'Fetch information for multiple users efficiently',
            code: `// Get multiple users
const usernames = ['octocat', 'defunkt', 'mojombo']

const users = await Promise.all(
  usernames.map(username => github.user(username).get())
)

// Display user stats
users.forEach(user => {
  console.log(\`\${user.name} (@\${user.login})\`)
  console.log(\`  Repos: \${user.public_repos}\`)
  console.log(\`  Followers: \${user.followers}\`)
  console.log(\`  Following: \${user.following}\`)
  console.log('---')
})

// Find most followed user
const mostFollowed = users.reduce((prev, current) => 
  prev.followers > current.followers ? prev : current
)
console.log(\`Most followed: \${mostFollowed.name} with \${mostFollowed.followers} followers\`)`,
            language: 'typescript',
            category: 'github',
            tags: ['user', 'multiple', 'comparison']
          }
        ]
      },
      {
        id: 'user-resources',
        name: 'User Resources',
        description: 'Access user-related resources like repositories, gists, followers, etc.',
        signature: 'github.user(username).repos | .gists | .followers | .following | .starred',
        parameters: [],
        returnType: 'Various resource clients',
        examples: [
          {
            id: 'user-resources-example',
            title: 'Access User Resources',
            description: 'Get different types of user-related data',
            code: `const userClient = github.user('octocat')

// Get user repositories
const repos = await userClient.repos.get()

// Get user gists
const gists = await userClient.gists.get()

// Get followers and following
const followers = await userClient.followers.get()
const following = await userClient.following.get()

// Get starred repositories
const starred = await userClient.starred.get()

// Get subscriptions and organizations
const subscriptions = await userClient.subscriptions.get()
const orgs = await userClient.orgs.get()

// Get user events
const events = await userClient.events.get()
const receivedEvents = await userClient.received_events.get()`,
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
            code: `// Get repository information
const repo = await github.repo('facebook', 'react').get()

console.log(repo.name) // react
console.log(repo.description) // The library for web and native user interfaces
console.log(repo.stargazers_count) // 220000+
console.log(repo.language) // JavaScript
console.log(repo.license.name) // MIT License
console.log(repo.default_branch) // main

// Check repository status
console.log(\`Repository is \${repo.private ? 'private' : 'public'}\`)
console.log(\`Fork: \${repo.fork ? 'Yes' : 'No'}\`)
console.log(\`Has issues: \${repo.has_issues ? 'Yes' : 'No'}\`)`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'details']
          },
          {
            id: 'repo-get-with-stats',
            title: 'Repository with Statistics',
            description: 'Get repository info and calculate useful statistics',
            code: `const repo = await github.repo('microsoft', 'vscode').get()

// Basic info
console.log(\`Repository: \${repo.full_name}\`)
console.log(\`Description: \${repo.description}\`)

// Statistics
const createdDate = new Date(repo.created_at)
const updatedDate = new Date(repo.updated_at)
const ageInDays = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24))

console.log(\`Age: \${ageInDays} days\`)
console.log(\`Stars: \${repo.stargazers_count.toLocaleString()}\`)
console.log(\`Forks: \${repo.forks_count.toLocaleString()}\`)
console.log(\`Open Issues: \${repo.open_issues_count}\`)
console.log(\`Size: \${(repo.size / 1024).toFixed(2)} MB\`)

// Calculate engagement rate
const engagementRate = ((repo.stargazers_count + repo.forks_count) / repo.watchers_count * 100).toFixed(2)
console.log(\`Engagement Rate: \${engagementRate}%\`)`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'statistics']
          },
          {
            id: 'repo-get-comparison',
            title: 'Compare Repositories',
            description: 'Compare multiple repositories side by side',
            code: `// Compare popular JavaScript frameworks
const frameworks = [
  ['facebook', 'react'],
  ['vuejs', 'vue'],
  ['angular', 'angular']
]

const repos = await Promise.all(
  frameworks.map(([owner, name]) => github.repo(owner, name).get())
)

// Sort by stars
const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count)

console.log('Framework Comparison (by stars):')
sortedRepos.forEach((repo, index) => {
  console.log(\`\${index + 1}. \${repo.name}\`)
  console.log(\`   Stars: \${repo.stargazers_count.toLocaleString()}\`)
  console.log(\`   Forks: \${repo.forks_count.toLocaleString()}\`)
  console.log(\`   Language: \${repo.language}\`)
  console.log(\`   Last Updated: \${new Date(repo.updated_at).toLocaleDateString()}\`)
  console.log('---')
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'details']
          }
        ]
      },
      {
        id: 'repo-issues',
        name: 'Issue Management',
        description: 'Manage repository issues, comments, and events',
        signature: 'github.repo(owner, repo).getIssues() | .getIssue() | .getIssueComments()',
        parameters: [],
        returnType: 'Promise<TGitHubIssue[]> | Promise<TGitHubIssue>',
        examples: [
          {
            id: 'repo-issues-example',
            title: 'Repository Issue Management',
            description: 'Work with repository issues and their details',
            code: `// Get repository issues
const repoClient = github.repo('facebook', 'react')

// Get all issues
const issues = await repoClient.getIssues()

// Get specific issue
const issue = await repoClient.getIssue(123)

// Get issue comments
const comments = await repoClient.getIssueComments(123)

// Get issue events
const events = await repoClient.getIssueEvents(123)

// Display issue information
issues.forEach(issue => {
  console.log(\`#\${issue.number}: \${issue.title}\`)
  console.log(\`State: \${issue.state}\`)
  console.log(\`Author: \${issue.user.login}\`)
  console.log(\`Labels: \${issue.labels.map(l => l.name).join(', ')}\`)
  console.log('---')
})`,
            language: 'typescript',
            category: 'github',
            tags: ['repository', 'issues']
          },
          {
            id: 'repo-issues-filtering',
            title: 'Filter and Search Issues',
            description: 'Filter issues by state, labels, and other criteria',
            code: `const repoClient = github.repo('microsoft', 'typescript')

// Get open issues only
const openIssues = await repoClient.getIssues({ state: 'open' })

// Get issues with specific labels
const bugIssues = await repoClient.getIssues({ 
  labels: 'bug',
  state: 'open'
})

// Get recent issues
const recentIssues = await repoClient.getIssues({
  state: 'all',
  sort: 'created',
  direction: 'desc',
  per_page: 10
})

console.log(\`Open issues: \${openIssues.length}\`)
console.log(\`Bug reports: \${bugIssues.length}\`)
console.log(\`Recent issues: \${recentIssues.length}\`)

// Analyze issue trends
const issuesByLabel = {}
openIssues.forEach(issue => {
  issue.labels.forEach(label => {
    issuesByLabel[label.name] = (issuesByLabel[label.name] || 0) + 1
  })
})

console.log('Issues by label:', issuesByLabel)`,
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
        signature: 'github.repo(owner, repo).getPulls() | .getPull() | .getPullReviews()',
        parameters: [],
        returnType: 'Promise<TGitHubPullRequest[]>',
        examples: [
          {
            id: 'repo-pulls-example',
            title: 'Pull Request Management',
            description: 'Manage pull requests and their reviews',
            code: `const repoClient = github.repo('facebook', 'react')

// Get all pull requests
const pulls = await repoClient.getPulls()

// Get specific pull request
const pull = await repoClient.getPull(456)

// Get pull request reviews
const reviews = await repoClient.getPullReviews(456)

// Get pull request comments
const comments = await repoClient.getPullComments(456)

pulls.forEach(pr => {
  console.log(\`#\${pr.number}: \${pr.title}\`)
  console.log(\`State: \${pr.state}\`)
  console.log(\`Base: \${pr.base.ref} <- Head: \${pr.head.ref}\`)
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
        signature: 'github.repo(owner, repo).getReleases() | .getLatestRelease() | .getReleaseAssets()',
        parameters: [],
        returnType: 'Promise<TGitHubRelease[]>',
        examples: [
          {
            id: 'repo-releases-example',
            title: 'Repository Release Management',
            description: 'Work with repository releases and their assets',
            code: `const repoClient = github.repo('facebook', 'react')

// Get all releases
const releases = await repoClient.getReleases()

// Get specific release
const release = await repoClient.getRelease('v18.0.0')

// Get latest release
const latest = await repoClient.getLatestRelease()

// Get release assets
const assets = await repoClient.getReleaseAssets('v18.0.0')

console.log(\`Latest: \${latest.tag_name}\`)
console.log(\`Published: \${latest.published_at}\`)
console.log(\`Downloads: \${assets.length} assets\`)`,
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
        signature: 'github.repo(owner, repo).getTags() | .getLabels() | .getMilestones()',
        parameters: [],
        returnType: 'Promise<Array>',
        examples: [
          {
            id: 'repo-metadata-example',
            title: 'Repository Metadata Access',
            description: 'Get repository tags, labels, and milestones',
            code: `const repoClient = github.repo('facebook', 'react')

// Get repository tags
const tags = await repoClient.getTags()

// Get repository labels
const labels = await repoClient.getLabels()

// Get repository milestones
const milestones = await repoClient.getMilestones()

tags.forEach(tag => {
  console.log(\`Tag: \${tag.name} - \${tag.commit.sha}\`)
})

labels.forEach(label => {
  console.log(\`Label: \${label.name} (\${label.color})\`)
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
        description: 'Access branches, commits, contents, contributors, and more',
        signature: 'github.repo(owner, repo).branches | .commits | .contents | .contributors',
        parameters: [],
        returnType: 'Various resource clients',
        examples: [
          {
            id: 'repo-resources-example',
            title: 'Repository Resource Access',
            description: 'Access various repository resources and data',
            code: `const repoClient = github.repo('facebook', 'react')

// Get branches
const branches = await repoClient.branches.get()

// Get commits
const commits = await repoClient.commits.get()

// Get repository contents
const contents = await repoClient.contents.get()

// Get contributors
const contributors = await repoClient.contributors.get()

// Get deployments and forks
const deployments = await repoClient.deployments.get()
const forks = await repoClient.forks.get()

console.log(\`Branches: \${branches.length}\`)
console.log(\`Contributors: \${contributors.length}\`)`,
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
        signature: 'github.repo(owner, repo).actions.workflows | .actions.runs | .actions.secrets',
        parameters: [],
        returnType: 'GitHub Actions clients',
        examples: [
          {
            id: 'github-actions-example',
            title: 'GitHub Actions Management',
            description: 'Work with GitHub Actions workflows and runs',
            code: `const repoClient = github.repo('facebook', 'react')

// Get workflows
const workflows = await repoClient.actions.workflows.list()

// Get workflow runs
const runs = await repoClient.actions.runs.list()

// Get specific workflow run
const run = await repoClient.actions.runs.get(123)

// Get workflow jobs
const jobs = await repoClient.actions.workflows.jobs(123)

// Get secrets
const secrets = await repoClient.actions.secrets.list()

workflows.forEach(workflow => {
  console.log(\`Workflow: \${workflow.name} (\${workflow.state})\`)
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
    description: 'Search across repositories, users, issues, code, commits, topics, and labels',
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
            description: 'Find repositories using various search criteria',
            code: `// Basic repository search
const repos = await github.search.repositories('javascript framework')

// Search with qualifiers
const reactRepos = await github.search.repositories('language:javascript topic:react stars:>1000')

// Search by organization
const facebookRepos = await github.search.repositories('user:facebook language:javascript')

// Search by creation date
const recentRepos = await github.search.repositories('created:>2023-01-01 language:typescript')

// Display results
repos.forEach(repo => {
  console.log(\`\${repo.full_name} - \${repo.stargazers_count} stars\`)
  console.log(\`Language: \${repo.language}\`)
  console.log(\`Description: \${repo.description}\`)
  console.log('---')
})

// Find trending repositories
const trending = repos
  .filter(repo => repo.stargazers_count > 1000)
  .sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, 5)

console.log('Top 5 trending repositories:')
trending.forEach((repo, index) => {
  console.log(\`\${index + 1}. \${repo.full_name} (\${repo.stargazers_count} stars)\`)
})`,
            language: 'typescript',
            category: 'github',
            tags: ['search', 'repositories']
          },
          {
            id: 'search-advanced-queries',
            title: 'Advanced Search Queries',
            description: 'Use complex search queries to find specific repositories',
            code: `// Search for popular React libraries
const reactLibs = await github.search.repositories(
  'react library stars:>500 language:javascript'
)

// Search for recently updated TypeScript projects
const activeTS = await github.search.repositories(
  'language:typescript pushed:>2024-01-01 stars:>100'
)

// Search for machine learning repositories
const mlRepos = await github.search.repositories(
  'machine learning OR artificial intelligence language:python stars:>1000'
)

// Search by organization and topic
const googleAI = await github.search.repositories(
  'org:google topic:artificial-intelligence'
)

// Analyze search results
console.log('Search Results Summary:')
console.log(\`React libraries: \${reactLibs.length}\`)
console.log(\`Active TypeScript projects: \${activeTS.length}\`)
console.log(\`ML repositories: \${mlRepos.length}\`)
console.log(\`Google AI projects: \${googleAI.length}\`)

// Find most starred in each category
const topReact = reactLibs.reduce((prev, current) => 
  prev.stargazers_count > current.stargazers_count ? prev : current
)
console.log(\`Most popular React library: \${topReact.full_name}\`)`,
            language: 'typescript',
            category: 'github',
            tags: ['search', 'advanced', 'filtering']
          }
        ]
      },
      {
        id: 'search-comprehensive',
        name: 'Comprehensive Search',
        description: 'Search across all GitHub content types',
        signature: 'github.search.users() | .issues() | .code() | .commits() | .topics() | .labels()',
        parameters: [],
        returnType: 'Promise<Array>',
        examples: [
          {
            id: 'search-comprehensive-example',
            title: 'Comprehensive GitHub Search',
            description: 'Search across different types of GitHub content',
            code: `// Search users
const users = await github.search.users('location:amsterdam followers:>100')

// Search issues
const issues = await github.search.issues('is:open bug label:priority-high')

// Search code
const codeResults = await github.search.code('console.log filename:*.js repo:facebook/react')

// Search commits
const commits = await github.search.commits('author:octocat merge:false')

// Search topics
const topics = await github.search.topics('javascript')

// Search labels
const labels = await github.search.labels('bug repo:facebook/react')

users.forEach(user => {
  console.log(\`\${user.login} - \${user.name}\`)
  console.log(\`Location: \${user.location}\`)
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
        signature: 'createOAuth2Flow() | createGitHubOAuth2Flow()',
        parameters: [],
        returnType: 'OAuth2Flow',
        examples: [
          {
            id: 'oauth2-core-example',
            title: 'OAuth2 Flow Setup',
            description: 'Set up OAuth2 authentication for GitHub',
            code: `import { 
  createGitHubOAuth2Flow, 
  GITHUB_OAUTH2_SCOPES 
} from '@remcostoeten/fync/github/oauth'

// Create OAuth2 flow
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

// Generate authorization URL
const authUrl = await oauth.getAuthorizationUrl({
  state: 'random-state-string'
})

// Exchange code for token
const tokens = await oauth.exchangeCodeForToken({
  code: 'authorization-code',
  state: 'random-state-string'
})`,
            language: 'typescript',
            category: 'github',
            tags: ['oauth2', 'authentication']
          }
        ]
      },
      {
        id: 'nextjs-helpers',
        name: 'NextJS Framework Helpers',
        description: 'Next.js specific OAuth2 integration helpers',
        signature: 'createNextJSAPIHandler() | createNextJSOAuth2Handler()',
        parameters: [],
        returnType: 'NextJS API handlers',
        examples: [
          {
            id: 'nextjs-helpers-example',
            title: 'Next.js OAuth2 Integration',
            description: 'Integrate OAuth2 with Next.js API routes',
            code: `import { 
  createNextJSOAuth2Handler,
  createNextJSAPIHandler 
} from '@remcostoeten/fync/github/oauth'

// Create Next.js OAuth2 handler
export default createNextJSOAuth2Handler({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  redirectUri: process.env.GITHUB_REDIRECT_URI,
  scopes: ['user', 'repo']
})

// Create general API handler
export const handler = createNextJSAPIHandler({
  onSuccess: (tokens) => {
    // Handle successful authentication
    console.log('Tokens received:', tokens)
  },
  onError: (error) => {
    // Handle authentication error
    console.error('Auth error:', error)
  }
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
        signature: 'isTokenExpired() | shouldRefreshToken() | generateRandomString()',
        parameters: [],
        returnType: 'Various utility functions',
        examples: [
          {
            id: 'oauth2-utilities-example',
            title: 'OAuth2 Utility Functions',
            description: 'Use OAuth2 utility functions for token management',
            code: `import {
  isTokenExpired,
  shouldRefreshToken,
  generateRandomString,
  generateCodeChallenge,
  generateCodeVerifier,
  buildUrlWithParams,
  sanitizeScopes,
  validateRequiredParams
} from '@remcostoeten/fync/github/oauth'

// Check token expiration
const expired = isTokenExpired(tokenExpiresAt)

// Check if token should be refreshed (5 min buffer)
const shouldRefresh = shouldRefreshToken(tokenExpiresAt, 300)

// Generate random strings for state/nonce
const state = generateRandomString(32)

// PKCE utilities
const codeVerifier = generateCodeVerifier()
const codeChallenge = generateCodeChallenge(codeVerifier)

// URL building
const authUrl = buildUrlWithParams('https://github.com/login/oauth/authorize', {
  client_id: 'your-client-id',
  redirect_uri: 'your-redirect-uri',
  scope: sanitizeScopes(['user', 'repo']).join(' '),
  state
})`,
            language: 'typescript',
            category: 'github',
            tags: ['oauth2', 'utilities']
          }
        ]
      }
    ]
  }
];