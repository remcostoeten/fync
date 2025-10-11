import type { TApiSection } from '@/types/content'

export const gitlabContent: TApiSection[] = [
  {
    id: 'gitlab-client',
    title: 'GitLab API Client',
    description: 'Comprehensive GitLab API client for project management, CI/CD, and collaboration features',
    methods: [
      {
        id: 'gitlab-main-client',
        name: 'GitLab()',
        description: 'Main GitLab client factory with token-based authentication',
        signature: 'GitLab(config: { token: string }): GitLabClient',
        parameters: [
          {
            name: 'config',
            type: '{ token: string }',
            description: 'Configuration object containing the GitLab personal access token',
            required: true
          }
        ],
        returnType: 'GitLabClient',
        examples: [
          {
            id: 'gitlab-client-init',
            title: 'Initialize GitLab Client',
            description: 'Create a GitLab client with personal access token',
            code: `import { GitLab } from '@remcostoeten/fync/gitlab'

const gitlab = GitLab({
  token: 'your-gitlab-token'
})

const currentUser = await gitlab.getCurrentUser()
const projects = await gitlab.me.getUserProjects({})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['initialization', 'authentication']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-users',
    title: 'User Operations',
    description: 'Methods for working with GitLab users and their profiles',
    methods: [
      {
        id: 'get-user',
        name: 'getUser()',
        description: 'Get detailed information about a specific user',
        signature: 'gitlab.getUser(id: string | number): Promise<User>',
        parameters: [
          {
            name: 'id',
            type: 'string | number',
            description: 'The user ID or username',
            required: true
          }
        ],
        returnType: 'Promise<User>',
        examples: [
          {
            id: 'get-user-example',
            title: 'Get User Information',
            description: 'Fetch user profile and statistics',
            code: `const user = await gitlab.getUser('john_doe')

console.log(user.name)
console.log(user.username)
console.log(user.bio)
console.log(user.public_email)
console.log(user.created_at)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['users', 'profile']
          }
        ]
      },
      {
        id: 'get-current-user',
        name: 'getCurrentUser()',
        description: 'Get detailed information about the authenticated user',
        signature: 'gitlab.getCurrentUser(): Promise<User>',
        parameters: [],
        returnType: 'Promise<User>',
        examples: [
          {
            id: 'get-current-user-example',
            title: 'Get Current User',
            description: 'Fetch authenticated user information',
            code: `const me = await gitlab.getCurrentUser()

console.log(me.name)
console.log(me.email)
console.log(me.username)
console.log(me.is_admin)
console.log(me.can_create_project)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['users', 'authentication']
          }
        ]
      },
      {
        id: 'get-user-stats',
        name: 'getUserStats()',
        description: 'Get comprehensive statistics for a user including projects, commits, and stars',
        signature: 'gitlab.getUserStats(userId: string | number): Promise<UserStats>',
        parameters: [
          {
            name: 'userId',
            type: 'string | number',
            description: 'The user ID',
            required: true
          }
        ],
        returnType: 'Promise<UserStats>',
        examples: [
          {
            id: 'get-user-stats-example',
            title: 'Get User Statistics',
            description: 'Fetch comprehensive user activity statistics',
            code: `const stats = await gitlab.getUserStats(123)

console.log('Total Projects:', stats.totalProjects)
console.log('Total Stars:', stats.totalStars)
console.log('Recent Commits:', stats.recentCommits)
console.log('Public Projects:', stats.publicProjects)
console.log('Followers:', stats.followers)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['users', 'statistics']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-projects',
    title: 'Project Operations',
    description: 'Comprehensive project management including creation, retrieval, and modification',
    methods: [
      {
        id: 'get-project',
        name: 'getProject()',
        description: 'Get detailed information about a specific project',
        signature: 'gitlab.getProject(id: string | number): Promise<Project>',
        parameters: [
          {
            name: 'id',
            type: 'string | number',
            description: 'The project ID or URL-encoded path',
            required: true
          }
        ],
        returnType: 'Promise<Project>',
        examples: [
          {
            id: 'get-project-example',
            title: 'Get Project Information',
            description: 'Fetch project details and metadata',
            code: `const project = await gitlab.getProject('namespace/project')

console.log(project.name)
console.log(project.description)
console.log(project.star_count)
console.log(project.default_branch)
console.log(project.visibility)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['projects', 'metadata']
          }
        ]
      },
      {
        id: 'get-project-from-url',
        name: 'getProjectFromUrl()',
        description: 'Get project information from a GitLab URL',
        signature: 'gitlab.getProjectFromUrl(url: string): Promise<Project>',
        parameters: [
          {
            name: 'url',
            type: 'string',
            description: 'Full GitLab project URL',
            required: true
          }
        ],
        returnType: 'Promise<Project>',
        examples: [
          {
            id: 'get-project-from-url-example',
            title: 'Get Project from URL',
            description: 'Parse URL and fetch project details',
            code: `const project = await gitlab.getProjectFromUrl(
  'https://gitlab.com/gitlab-org/gitlab'
)

console.log('Found project:', project.name)
console.log('Stars:', project.star_count)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['projects', 'url-parsing']
          }
        ]
      },
      {
        id: 'search-projects',
        name: 'searchProjects()',
        description: 'Search for projects using a query string',
        signature: 'gitlab.searchProjects(query: string, options?: SearchOptions): Promise<Project[]>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters',
            required: false
          }
        ],
        returnType: 'Promise<Project[]>',
        examples: [
          {
            id: 'search-projects-example',
            title: 'Search for Projects',
            description: 'Find projects matching a query',
            code: `const projects = await gitlab.searchProjects('vue', {
  per_page: 20,
  order_by: 'stars'
})

projects.forEach(function displayProject(project) {
  console.log(project.name, '- Stars:', project.star_count)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['projects', 'search']
          }
        ]
      },
      {
        id: 'get-project-stars',
        name: 'getProjectStars()',
        description: 'Get the star count for a specific project',
        signature: 'gitlab.getProjectStars(projectId: string | number): Promise<number>',
        parameters: [
          {
            name: 'projectId',
            type: 'string | number',
            description: 'The project ID',
            required: true
          }
        ],
        returnType: 'Promise<number>',
        examples: [
          {
            id: 'get-project-stars-example',
            title: 'Get Project Star Count',
            description: 'Fetch how many users starred a project',
            code: `const stars = await gitlab.getProjectStars('gitlab-org/gitlab')
console.log('Project has', stars, 'stars')`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['projects', 'statistics']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-commits',
    title: 'Commit Operations',
    description: 'Methods for accessing commit history and details',
    methods: [
      {
        id: 'get-user-commits',
        name: 'getUserCommits()',
        description: 'Get commit history for a specific user',
        signature: 'gitlab.getUserCommits(userId: string | number, options?: CommitOptions): Promise<Commit[]>',
        parameters: [
          {
            name: 'userId',
            type: 'string | number',
            description: 'The user ID',
            required: true
          },
          {
            name: 'options',
            type: 'CommitOptions',
            description: 'Optional parameters like limit',
            required: false
          }
        ],
        returnType: 'Promise<Commit[]>',
        examples: [
          {
            id: 'get-user-commits-example',
            title: 'Get User Commit History',
            description: 'Fetch recent commits by a user',
            code: `const commits = await gitlab.getUserCommits(123, {
  limit: 50
})

commits.forEach(function displayCommit(commit) {
  console.log(commit.title)
  console.log('  Author:', commit.author_name)
  console.log('  Date:', commit.created_at)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['commits', 'history']
          }
        ]
      },
      {
        id: 'get-user-latest-commit',
        name: 'getUserLatestCommit()',
        description: 'Get the most recent commit by a user',
        signature: 'gitlab.getUserLatestCommit(userId: string | number): Promise<Commit>',
        parameters: [
          {
            name: 'userId',
            type: 'string | number',
            description: 'The user ID',
            required: true
          }
        ],
        returnType: 'Promise<Commit>',
        examples: [
          {
            id: 'get-user-latest-commit-example',
            title: 'Get Latest User Commit',
            description: 'Fetch the most recent commit',
            code: `const latestCommit = await gitlab.getUserLatestCommit(123)

if (latestCommit) {
  console.log('Latest commit:', latestCommit.title)
  console.log('Date:', latestCommit.created_at)
}`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['commits', 'latest']
          }
        ]
      },
      {
        id: 'get-user-commits-in-timeframe',
        name: 'getUserCommitsInTimeframe()',
        description: 'Get user commits within a specific timeframe',
        signature: 'gitlab.getUserCommitsInTimeframe(userId: string | number, timeframe: string): Promise<Commit[]>',
        parameters: [
          {
            name: 'userId',
            type: 'string | number',
            description: 'The user ID',
            required: true
          },
          {
            name: 'timeframe',
            type: 'string',
            description: 'Timeframe string like "7D", "1M", "1Y"',
            required: true
          }
        ],
        returnType: 'Promise<Commit[]>',
        examples: [
          {
            id: 'get-user-commits-in-timeframe-example',
            title: 'Get Commits in Timeframe',
            description: 'Fetch commits from the last week',
            code: `const recentCommits = await gitlab.getUserCommitsInTimeframe(
  123,
  '7D'
)

console.log(\`Found \${recentCommits.length} commits in the last 7 days\`)

recentCommits.forEach(function displayCommit(commit) {
  console.log('-', commit.title)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['commits', 'timeframe']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-issues',
    title: 'Issue Operations',
    description: 'Methods for creating, updating, and managing issues',
    methods: [
      {
        id: 'get-project-issues',
        name: 'projects.getProjectIssues()',
        description: 'Get all issues for a specific project',
        signature: 'gitlab.projects.getProjectIssues({ id: string | number }): Promise<Issue[]>',
        parameters: [
          {
            name: 'id',
            type: 'string | number',
            description: 'The project ID',
            required: true
          }
        ],
        returnType: 'Promise<Issue[]>',
        examples: [
          {
            id: 'get-project-issues-example',
            title: 'Get Project Issues',
            description: 'Fetch all issues from a project',
            code: `const issues = await gitlab.projects.getProjectIssues({
  id: 'namespace/project'
})

issues.forEach(function displayIssue(issue) {
  console.log(\`#\${issue.iid}: \${issue.title}\`)
  console.log('  State:', issue.state)
  console.log('  Author:', issue.author.name)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['issues', 'projects']
          }
        ]
      },
      {
        id: 'create-project-issue',
        name: 'projects.createProjectIssue()',
        description: 'Create a new issue in a project',
        signature: 'gitlab.projects.createProjectIssue(data: IssueData, params: { id: string }): Promise<Issue>',
        parameters: [
          {
            name: 'data',
            type: 'IssueData',
            description: 'Issue title, description, and other properties',
            required: true
          },
          {
            name: 'params',
            type: '{ id: string }',
            description: 'Project ID or path',
            required: true
          }
        ],
        returnType: 'Promise<Issue>',
        examples: [
          {
            id: 'create-project-issue-example',
            title: 'Create New Issue',
            description: 'Create an issue with title and description',
            code: `const issue = await gitlab.projects.createProjectIssue(
  {
    title: 'Bug: Login not working',
    description: 'Users cannot log in with valid credentials',
    labels: ['bug', 'priority::high']
  },
  { id: 'namespace/project' }
)

console.log('Created issue #' + issue.iid)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['issues', 'creation']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-merge-requests',
    title: 'Merge Request Operations',
    description: 'Methods for managing merge requests and code reviews',
    methods: [
      {
        id: 'get-project-merge-requests',
        name: 'projects.getProjectMergeRequests()',
        description: 'Get all merge requests for a project',
        signature: 'gitlab.projects.getProjectMergeRequests({ id: string }): Promise<MergeRequest[]>',
        parameters: [
          {
            name: 'id',
            type: 'string | number',
            description: 'The project ID',
            required: true
          }
        ],
        returnType: 'Promise<MergeRequest[]>',
        examples: [
          {
            id: 'get-project-merge-requests-example',
            title: 'Get Project Merge Requests',
            description: 'Fetch all merge requests from a project',
            code: `const mrs = await gitlab.projects.getProjectMergeRequests({
  id: 'namespace/project'
})

mrs.forEach(function displayMR(mr) {
  console.log(\`!!\${mr.iid}: \${mr.title}\`)
  console.log('  State:', mr.state)
  console.log('  Author:', mr.author.name)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['merge-requests', 'projects']
          }
        ]
      },
      {
        id: 'create-project-merge-request',
        name: 'projects.createProjectMergeRequest()',
        description: 'Create a new merge request',
        signature: 'gitlab.projects.createProjectMergeRequest(data: MRData, params: { id: string }): Promise<MergeRequest>',
        parameters: [
          {
            name: 'data',
            type: 'MRData',
            description: 'MR title, source/target branches, and description',
            required: true
          },
          {
            name: 'params',
            type: '{ id: string }',
            description: 'Project ID or path',
            required: true
          }
        ],
        returnType: 'Promise<MergeRequest>',
        examples: [
          {
            id: 'create-project-merge-request-example',
            title: 'Create Merge Request',
            description: 'Create an MR from feature branch to main',
            code: `const mr = await gitlab.projects.createProjectMergeRequest(
  {
    title: 'feat: Add user authentication',
    source_branch: 'feature/auth',
    target_branch: 'main',
    description: 'Implements JWT-based authentication'
  },
  { id: 'namespace/project' }
)

console.log('Created MR !' + mr.iid)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['merge-requests', 'creation']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-groups',
    title: 'Group Operations',
    description: 'Methods for working with GitLab groups and subgroups',
    methods: [
      {
        id: 'get-group',
        name: 'getGroup()',
        description: 'Get detailed information about a group',
        signature: 'gitlab.getGroup(id: string | number): Promise<Group>',
        parameters: [
          {
            name: 'id',
            type: 'string | number',
            description: 'The group ID or URL-encoded path',
            required: true
          }
        ],
        returnType: 'Promise<Group>',
        examples: [
          {
            id: 'get-group-example',
            title: 'Get Group Information',
            description: 'Fetch group details and metadata',
            code: `const group = await gitlab.getGroup('gitlab-org')

console.log(group.name)
console.log(group.description)
console.log(group.visibility)
console.log('Projects:', group.projects?.length || 0)`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['groups', 'metadata']
          }
        ]
      },
      {
        id: 'search-groups',
        name: 'searchGroups()',
        description: 'Search for groups using a query string',
        signature: 'gitlab.searchGroups(query: string, options?: SearchOptions): Promise<Group[]>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters',
            required: false
          }
        ],
        returnType: 'Promise<Group[]>',
        examples: [
          {
            id: 'search-groups-example',
            title: 'Search for Groups',
            description: 'Find groups matching a query',
            code: `const groups = await gitlab.searchGroups('frontend', {
  per_page: 10
})

groups.forEach(function displayGroup(group) {
  console.log(group.name, '- Visibility:', group.visibility)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['groups', 'search']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-pipelines',
    title: 'CI/CD Pipeline Operations',
    description: 'Methods for managing CI/CD pipelines and jobs',
    methods: [
      {
        id: 'get-project-pipelines',
        name: 'projects.getProjectPipelines()',
        description: 'Get all pipelines for a project',
        signature: 'gitlab.projects.getProjectPipelines({ id: string }): Promise<Pipeline[]>',
        parameters: [
          {
            name: 'id',
            type: 'string | number',
            description: 'The project ID',
            required: true
          }
        ],
        returnType: 'Promise<Pipeline[]>',
        examples: [
          {
            id: 'get-project-pipelines-example',
            title: 'Get Project Pipelines',
            description: 'Fetch pipeline execution history',
            code: `const pipelines = await gitlab.projects.getProjectPipelines({
  id: 'namespace/project'
})

pipelines.forEach(function displayPipeline(pipeline) {
  console.log(\`Pipeline #\${pipeline.id}\`)
  console.log('  Status:', pipeline.status)
  console.log('  Branch:', pipeline.ref)
  console.log('  Started:', pipeline.created_at)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['pipelines', 'ci-cd']
          }
        ]
      }
    ]
  },
  {
    id: 'gitlab-activity',
    title: 'Activity Operations',
    description: 'Methods for tracking user and project activity',
    methods: [
      {
        id: 'get-user-activity',
        name: 'getUserActivity()',
        description: 'Get activity events for a specific user',
        signature: 'gitlab.getUserActivity(userId: string | number, options?: ActivityOptions): Promise<Event[]>',
        parameters: [
          {
            name: 'userId',
            type: 'string | number',
            description: 'The user ID',
            required: true
          },
          {
            name: 'options',
            type: 'ActivityOptions',
            description: 'Optional filtering parameters',
            required: false
          }
        ],
        returnType: 'Promise<Event[]>',
        examples: [
          {
            id: 'get-user-activity-example',
            title: 'Get User Activity',
            description: 'Fetch recent activity events for a user',
            code: `const activity = await gitlab.getUserActivity(123, {
  per_page: 50
})

activity.forEach(function displayEvent(event) {
  console.log(event.action_name)
  console.log('  Target:', event.target_type)
  console.log('  Created:', event.created_at)
})`,
            language: 'typescript',
            category: 'gitlab',
            tags: ['activity', 'events']
          }
        ]
      }
    ]
  }
]
