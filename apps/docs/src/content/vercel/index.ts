import type { TApiSection } from '@/types/content'

export const vercelContent: TApiSection[] = [
  {
    id: 'core-exports',
    title: 'Core Exports',
    description: 'Main entry points and core functionality for Vercel API integration',
    methods: [
      {
        id: 'main-entry-points',
        name: 'Main Entry Points',
        description: 'Primary package exports for Vercel API client and utilities',
        signature: 'import { ... } from "@remcostoeten/fync"',
        parameters: [],
        returnType: 'Vercel client factories and utilities',
        examples: [
          {
            id: 'core-imports',
            title: 'Core Package Imports',
            description: 'Import Vercel parts of the Fync library',
            code: `import { Vercel } from '@remcostoeten/fync/vercel'`,
            language: 'typescript',
            category: 'vercel',
            tags: ['imports', 'setup']
          }
        ]
      }
    ]
  },
  {
    id: 'vercel-client',
    title: 'Vercel API Client',
    description: 'Comprehensive Vercel API client for deployments, projects, and team management',
    methods: [
      {
        id: 'vercel-main-client',
        name: 'Vercel()',
        description: 'Main Vercel client factory with API token authentication',
        signature: 'Vercel(config?: TVercelClientConfig): VercelClient',
        parameters: [
          {
            name: 'config',
            type: 'TVercelClientConfig',
            description: 'Configuration including API token, team ID, and other settings',
            required: false
          }
        ],
        returnType: 'VercelClient',
        examples: [
          {
            id: 'vercel-client-init',
            title: 'Initialize Vercel Client',
            description: 'Create a Vercel client with API token authentication',
            code: `import { Vercel } from '@remcostoeten/fync/vercel'

const vercel = Vercel({
  token: 'your-vercel-token',
  teamId: 'your-team-id'
})

const deployments = vercel.deployments
const projects = vercel.projects
const domains = vercel.domains`,
            language: 'typescript',
            category: 'vercel',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'vercel-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main Vercel client',
        signature: 'vercel.deployments | vercel.projects | vercel.domains | vercel.teams | vercel.aliases',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'vercel-client-methods-example',
            title: 'Vercel Client Methods',
            description: 'Access different Vercel API endpoints through specialized clients',
            code: `const vercel = Vercel({ token: 'your-token' })

const deploymentsClient = vercel.deployments
const projectsClient = vercel.projects
const domainsClient = vercel.domains
const teamsClient = vercel.teams
const aliasesClient = vercel.aliases
const certsClient = vercel.certs`,
            language: 'typescript',
            category: 'vercel',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'vercel-deployments-operations',
    title: 'Deployments Client Methods',
    description: 'Methods for managing Vercel deployments including creation, monitoring, and analysis',
    methods: [
      {
        id: 'deployments-list',
        name: 'deployments.list()',
        description: 'List deployments with optional filtering and pagination',
        signature: 'vercel.deployments.list(options?: TDeploymentListOptions): Promise<TVercelDeployment[]>',
        parameters: [
          {
            name: 'options',
            type: 'TDeploymentListOptions',
            description: 'Optional filtering options like limit, since, until, projectId',
            required: false
          }
        ],
        returnType: 'Promise<TVercelDeployment[]>',
        examples: [
          {
            id: 'deployments-list-example',
            title: 'List Recent Deployments',
            description: 'Fetch recent deployments with filtering',
            code: `const deployments = await vercel.deployments.list({
  limit: 10,
  projectId: 'prj_abc123',
  state: 'READY'
})

deployments.forEach(function displayDeployment(deployment) {
  console.log(deployment.name, deployment.url, deployment.state)
  console.log('Created:', new Date(deployment.createdAt))
})`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'list']
          },
          {
            id: 'deployments-filter-example',
            title: 'Filter Deployments by Status',
            description: 'Get deployments by different states and time ranges',
            code: `const readyDeployments = await vercel.deployments.list({
  state: 'READY',
  limit: 20
})

const failedDeployments = await vercel.deployments.list({
  state: 'ERROR',
  since: Date.now() - 86400000
})

const buildingDeployments = await vercel.deployments.list({
  state: 'BUILDING'
})

console.log('Ready deployments:', readyDeployments.length)
console.log('Failed deployments (24h):', failedDeployments.length)
console.log('Currently building:', buildingDeployments.length)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'filter']
          }
        ]
      },
      {
        id: 'deployments-get',
        name: 'deployments.get()',
        description: 'Get detailed information about a specific deployment',
        signature: 'vercel.deployments.get(deploymentId: string): Promise<TVercelDeployment>',
        parameters: [
          {
            name: 'deploymentId',
            type: 'string',
            description: 'ID or URL of the deployment to retrieve',
            required: true
          }
        ],
        returnType: 'Promise<TVercelDeployment>',
        examples: [
          {
            id: 'deployments-get-example',
            title: 'Get Deployment Details',
            description: 'Retrieve comprehensive deployment information',
            code: `const deployment = await vercel.deployments.get('dpl_abc123')

console.log('Deployment name:', deployment.name)
console.log('URL:', deployment.url)
console.log('State:', deployment.state)
console.log('Created:', new Date(deployment.createdAt))
console.log('Build time:', deployment.buildingAt ? 
  new Date(deployment.readyAt) - new Date(deployment.buildingAt) + 'ms' : 
  'N/A'
)

if (deployment.aliasAssigned) {
  console.log('Aliases:', deployment.alias)
}`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'details']
          }
        ]
      },
      {
        id: 'deployments-create',
        name: 'deployments.create()',
        description: 'Create a new deployment from files or Git repository',
        signature: 'vercel.deployments.create(deploymentData: TDeploymentCreateData): Promise<TVercelDeployment>',
        parameters: [
          {
            name: 'deploymentData',
            type: 'TDeploymentCreateData',
            description: 'Deployment configuration including files, environment variables, and build settings',
            required: true
          }
        ],
        returnType: 'Promise<TVercelDeployment>',
        examples: [
          {
            id: 'deployments-create-example',
            title: 'Create Deployment from Files',
            description: 'Deploy a static site from local files',
            code: `const deployment = await vercel.deployments.create({
  name: 'my-static-site',
  files: [
    {
      file: 'index.html',
      data: '<html><body><h1>Hello World</h1></body></html>'
    },
    {
      file: 'style.css',
      data: 'body { font-family: Arial, sans-serif; }'
    }
  ],
  projectSettings: {
    buildCommand: null,
    outputDirectory: null
  },
  env: {
    NODE_ENV: 'production'
  }
})

console.log('Deployment created:', deployment.url)
console.log('State:', deployment.state)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'create']
          },
          {
            id: 'deployments-create-git',
            title: 'Create Deployment from Git',
            description: 'Deploy from a Git repository',
            code: `const deployment = await vercel.deployments.create({
  name: 'my-next-app',
  gitSource: {
    type: 'github',
    repoId: 'username/my-repo',
    ref: 'main'
  },
  projectSettings: {
    framework: 'nextjs',
    buildCommand: 'npm run build',
    outputDirectory: '.next'
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
    DATABASE_URL: process.env.DATABASE_URL
  }
})

console.log('Git deployment created:', deployment.url)
console.log('Inspecting:', deployment.inspectorUrl)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'git']
          }
        ]
      },
      {
        id: 'deployments-cancel',
        name: 'deployments.cancel()',
        description: 'Cancel a deployment that is currently building',
        signature: 'vercel.deployments.cancel(deploymentId: string): Promise<void>',
        parameters: [
          {
            name: 'deploymentId',
            type: 'string',
            description: 'ID of the deployment to cancel',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'deployments-cancel-example',
            title: 'Cancel Building Deployment',
            description: 'Cancel a deployment that is taking too long',
            code: `await vercel.deployments.cancel('dpl_abc123')

console.log('Deployment cancelled successfully')`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'cancel']
          }
        ]
      },
      {
        id: 'deployments-logs',
        name: 'deployments.getLogs()',
        description: 'Get build and runtime logs for a deployment',
        signature: 'vercel.deployments.getLogs(deploymentId: string): Promise<TVercelLog[]>',
        parameters: [
          {
            name: 'deploymentId',
            type: 'string',
            description: 'ID of the deployment to get logs from',
            required: true
          }
        ],
        returnType: 'Promise<TVercelLog[]>',
        examples: [
          {
            id: 'deployments-logs-example',
            title: 'Get Deployment Logs',
            description: 'Retrieve build and runtime logs for debugging',
            code: `const logs = await vercel.deployments.getLogs('dpl_abc123')

const buildLogs = logs.filter(function isBuildLog(log) {
  return log.type === 'build'
})

const runtimeLogs = logs.filter(function isRuntimeLog(log) {
  return log.type === 'runtime'
})

console.log('Build logs:', buildLogs.length)
console.log('Runtime logs:', runtimeLogs.length)

logs.forEach(function displayLog(log) {
  console.log(new Date(log.timestamp), log.message)
})`,
            language: 'typescript',
            category: 'vercel',
            tags: ['deployments', 'logs']
          }
        ]
      }
    ]
  },
  {
    id: 'vercel-projects-operations',
    title: 'Projects Management',
    description: 'Methods for managing Vercel projects and their configuration',
    methods: [
      {
        id: 'projects-list',
        name: 'projects.list()',
        description: 'List all projects in the account or team',
        signature: 'vercel.projects.list(options?: TProjectListOptions): Promise<TVercelProject[]>',
        parameters: [
          {
            name: 'options',
            type: 'TProjectListOptions',
            description: 'Optional filtering and pagination options',
            required: false
          }
        ],
        returnType: 'Promise<TVercelProject[]>',
        examples: [
          {
            id: 'projects-list-example',
            title: 'List All Projects',
            description: 'Get all projects with their basic information',
            code: `const projects = await vercel.projects.list()

projects.forEach(function displayProject(project) {
  console.log('Project:', project.name)
  console.log('Framework:', project.framework)
  console.log('Latest deployment:', project.latestDeployments?.[0]?.url)
  console.log('Updated:', new Date(project.updatedAt))
})

const nextjsProjects = projects.filter(function isNextJS(project) {
  return project.framework === 'nextjs'
})

console.log('Next.js projects:', nextjsProjects.length)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['projects', 'list']
          }
        ]
      },
      {
        id: 'projects-create',
        name: 'projects.create()',
        description: 'Create a new project with configuration',
        signature: 'vercel.projects.create(projectData: TProjectCreateData): Promise<TVercelProject>',
        parameters: [
          {
            name: 'projectData',
            type: 'TProjectCreateData',
            description: 'Project configuration including name, framework, and Git settings',
            required: true
          }
        ],
        returnType: 'Promise<TVercelProject>',
        examples: [
          {
            id: 'projects-create-example',
            title: 'Create New Project',
            description: 'Create a project connected to a Git repository',
            code: `const project = await vercel.projects.create({
  name: 'my-new-app',
  framework: 'nextjs',
  gitRepository: {
    type: 'github',
    repo: 'username/my-new-app'
  },
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  installCommand: 'npm install',
  devCommand: 'npm run dev',
  environmentVariables: [
    {
      key: 'NODE_ENV',
      value: 'production',
      target: ['production']
    },
    {
      key: 'API_URL',
      value: 'https://api.example.com',
      target: ['production', 'preview']
    }
  ]
})

console.log('Project created:', project.name)
console.log('ID:', project.id)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['projects', 'create']
          }
        ]
      },
      {
        id: 'projects-update',
        name: 'projects.update()',
        description: 'Update project settings and configuration',
        signature: 'vercel.projects.update(projectId: string, updates: TProjectUpdateData): Promise<TVercelProject>',
        parameters: [
          {
            name: 'projectId',
            type: 'string',
            description: 'ID of the project to update',
            required: true
          },
          {
            name: 'updates',
            type: 'TProjectUpdateData',
            description: 'Updated project settings',
            required: true
          }
        ],
        returnType: 'Promise<TVercelProject>',
        examples: [
          {
            id: 'projects-update-example',
            title: 'Update Project Settings',
            description: 'Modify build settings and environment variables',
            code: `const updatedProject = await vercel.projects.update('prj_abc123', {
  buildCommand: 'npm run build:production',
  environmentVariables: [
    {
      key: 'FEATURE_FLAG_ENABLED',
      value: 'true',
      target: ['production']
    }
  ],
  framework: 'nextjs'
})

console.log('Project updated:', updatedProject.name)
console.log('New build command:', updatedProject.buildCommand)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['projects', 'update']
          }
        ]
      },
      {
        id: 'projects-delete',
        name: 'projects.delete()',
        description: 'Delete a project and all its deployments',
        signature: 'vercel.projects.delete(projectId: string): Promise<void>',
        parameters: [
          {
            name: 'projectId',
            type: 'string',
            description: 'ID of the project to delete',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'projects-delete-example',
            title: 'Delete Project',
            description: 'Remove a project and all its deployments',
            code: `await vercel.projects.delete('prj_abc123')

console.log('Project deleted successfully')`,
            language: 'typescript',
            category: 'vercel',
            tags: ['projects', 'delete']
          }
        ]
      }
    ]
  },
  {
    id: 'vercel-domains-operations',
    title: 'Domains Management',
    description: 'Methods for managing custom domains and DNS configuration',
    methods: [
      {
        id: 'domains-list',
        name: 'domains.list()',
        description: 'List all domains in the account or team',
        signature: 'vercel.domains.list(): Promise<TVercelDomain[]>',
        parameters: [],
        returnType: 'Promise<TVercelDomain[]>',
        examples: [
          {
            id: 'domains-list-example',
            title: 'List All Domains',
            description: 'Get all domains with their configuration status',
            code: `const domains = await vercel.domains.list()

domains.forEach(function displayDomain(domain) {
  console.log('Domain:', domain.name)
  console.log('Verified:', domain.verified)
  console.log('Created:', new Date(domain.createdAt))
})

const verifiedDomains = domains.filter(function isVerified(domain) {
  return domain.verified === true
})

console.log('Verified domains:', verifiedDomains.length)`,
            language: 'typescript',
            category: 'vercel',
            tags: ['domains', 'list']
          }
        ]
      },
      {
        id: 'domains-add',
        name: 'domains.add()',
        description: 'Add a new custom domain',
        signature: 'vercel.domains.add(domainName: string): Promise<TVercelDomain>',
        parameters: [
          {
            name: 'domainName',
            type: 'string',
            description: 'Domain name to add',
            required: true
          }
        ],
        returnType: 'Promise<TVercelDomain>',
        examples: [
          {
            id: 'domains-add-example',
            title: 'Add Custom Domain',
            description: 'Add and configure a custom domain',
            code: `const domain = await vercel.domains.add('example.com')

console.log('Domain added:', domain.name)
console.log('Verification required:', !domain.verified)

if (!domain.verified) {
  console.log('Add this TXT record to verify:')
  console.log('Name:', domain.verification?.domain)
  console.log('Value:', domain.verification?.value)
}`,
            language: 'typescript',
            category: 'vercel',
            tags: ['domains', 'add']
          }
        ]
      },
      {
        id: 'domains-verify',
        name: 'domains.verify()',
        description: 'Verify ownership of a domain',
        signature: 'vercel.domains.verify(domainName: string): Promise<TVercelDomain>',
        parameters: [
          {
            name: 'domainName',
            type: 'string',
            description: 'Domain name to verify',
            required: true
          }
        ],
        returnType: 'Promise<TVercelDomain>',
        examples: [
          {
            id: 'domains-verify-example',
            title: 'Verify Domain Ownership',
            description: 'Check if domain verification is complete',
            code: `const domain = await vercel.domains.verify('example.com')

if (domain.verified) {
  console.log('Domain verified successfully!')
} else {
  console.log('Verification pending. Please check DNS records.')
}`,
            language: 'typescript',
            category: 'vercel',
            tags: ['domains', 'verify']
          }
        ]
      }
    ]
  }
]