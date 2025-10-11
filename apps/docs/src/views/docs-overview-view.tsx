'use client'

import { Github, Music, Code2, Package, Calendar, HardDrive, Cloud, MessageSquare, FileText } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/code-block'

type TApiCard = {
  name: string
  description: string
  icon: typeof Github
  href: string
  status: 'stable' | 'beta'
}

const apis: TApiCard[] = [
  {
    name: 'GitHub API',
    description: 'Comprehensive GitHub API client with authentication and resource management',
    icon: Github,
    href: '/docs/github',
    status: 'stable'
  },
  {
    name: 'Spotify API',
    description: 'Full-featured Spotify API client for music and player operations',
    icon: Music,
    href: '/docs/spotify',
    status: 'stable'
  },
  {
    name: 'GitLab API',
    description: 'Complete GitLab API integration for project and pipeline management',
    icon: Code2,
    href: '/docs/gitlab',
    status: 'stable'
  },
  {
    name: 'npm Registry',
    description: 'npm Registry API client for package information and search',
    icon: Package,
    href: '/docs/npm',
    status: 'stable'
  },
  {
    name: 'Google Calendar',
    description: 'Google Calendar API integration for event and calendar management',
    icon: Calendar,
    href: '/docs/google-calendar',
    status: 'stable'
  },
  {
    name: 'Google Drive',
    description: 'Google Drive API client for file storage and management',
    icon: HardDrive,
    href: '/docs/google-drive',
    status: 'stable'
  },
  {
    name: 'Vercel API',
    description: 'Vercel platform API for deployment and project management',
    icon: Cloud,
    href: '/docs/vercel',
    status: 'stable'
  },
  {
    name: 'Discord API',
    description: 'Discord API integration for bot development and server management',
    icon: MessageSquare,
    href: '/docs/discord',
    status: 'stable'
  },
  {
    name: 'Notion API',
    description: 'Notion API client for workspace and content management',
    icon: FileText,
    href: '/docs/notion',
    status: 'stable'
  }
]

export function DocsOverviewView() {
  return (
    <div
      className="space-y-12"
    >
      <div className="space-y-4">
        <h1 
          className="text-4xl font-bold text-foreground"
        >
          Fync Documentation
        </h1>
        <p 
          className="text-lg text-muted-foreground max-w-3xl"
        >
          Unified TypeScript library for 9 popular APIs with consistent functional architecture.
          Built with type safety, functional patterns, and developer experience in mind.
        </p>
      </div>

      <div className="space-y-6">
        <h2 id="what-is-fync" className="text-2xl font-semibold text-foreground">
          What is Fync?
        </h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <p className="text-muted-foreground">
            Fync is a unified TypeScript library that provides a consistent interface for interacting with 9 popular APIs:
            GitHub, Spotify, GitLab, npm, Google Calendar, Google Drive, Vercel, Discord, and Notion.
          </p>
          <p className="text-muted-foreground">
            Instead of learning different patterns and conventions for each API client, Fync offers a single,
            predictable interface with identical function signatures, error handling, and type definitions across all platforms.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 id="why-fync" className="text-2xl font-semibold text-foreground">
          Why Fync?
        </h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-3">
              The Problem
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                <span>Managing multiple API clients with different patterns and conventions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                <span>Inconsistent error handling and response formats across libraries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                <span>Missing or incomplete TypeScript types in existing clients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                <span>Different authentication patterns for each service</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-3">
              The Solution
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Single, unified interface for all APIs with consistent patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Standardized error handling and response formatting everywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Full TypeScript support with comprehensive type definitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Consistent authentication and configuration across all services</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 id="how-it-works" className="text-2xl font-semibold text-foreground">
          How It Works
        </h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <p className="text-muted-foreground">
            Fync uses a functional, chainable API design. Each API follows the same pattern:
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">1. Initialize the client with credentials</p>
              <CodeBlock 
                code="const github = GitHub({ token: 'your-token' })" 
                language="typescript"
                annotations={[
                  { line: 1, text: 'Create a new GitHub client instance by passing your personal access token' }
                ]}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">2. Chain resource accessors</p>
              <CodeBlock 
                code="github.user('octocat').repos" 
                language="typescript" 
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">3. Call methods to interact with the API</p>
              <CodeBlock 
                code={`const repos = await github.user('octocat').repos.list()
const repo = await github.repo('owner', 'name').get()`}
                language="typescript"
                annotations={[
                  { line: 1, text: 'List all repositories for a specific GitHub user' },
                  { line: 2, text: 'Fetch detailed information about a specific repository' }
                ]}
              />
            </div>
          </div>
          <p className="text-muted-foreground">
            This pattern remains consistent across all 9 supported APIs, making it easy to switch between services
            or work with multiple APIs in the same codebase.
          </p>
        </div>
      </div>

      <div 
        className="space-y-6"
      >
        <h2 id="getting-started" className="text-2xl font-semibold text-foreground">
          Getting Started
        </h2>
        
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Installation
          </h3>
          <CodeBlock 
            code="bun add @remcostoeten/fync" 
            language="bash" 
          />
          
          <h3 className="text-lg font-medium text-foreground mt-6">
            Basic Usage
          </h3>
          <CodeBlock 
            code={`import { GitHub } from '@remcostoeten/fync/github'

const github = GitHub({ token: 'your-token' })
const user = await github.user('octocat').get()`}
            language="typescript"
            annotations={[
              { line: 1, text: 'Import the GitHub client from the Fync library' },
              { line: 3, text: 'Initialize the client with your authentication token' },
              { line: 4, text: 'Fetch user profile data using the chainable API' }
            ]}
          />
        </div>
      </div>

      <div 
        className="space-y-6"
      >
        <h2 id="available-apis" className="text-2xl font-semibold text-foreground">
          Available APIs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apis.map(function renderApiCard(api, index) {
            const Icon = api.icon
            
            return (
              <Link key={api.name} href={api.href}>
                <div
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-card border border-border rounded-lg p-6 space-y-3 hover:border-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span 
                      className={`text-xs px-2 py-1 rounded ${
                        api.status === 'stable' 
                          ? 'bg-green-400/20 text-green-400' 
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}
                    >
                      {api.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground">
                    {api.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {api.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div 
        className="space-y-6"
      >
        <h2 id="key-features" className="text-2xl font-semibold text-foreground">
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              🎯 Type-Safe
            </h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with comprehensive type definitions for all API methods and responses.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              🔧 Functional Architecture
            </h3>
            <p className="text-sm text-muted-foreground">
              Built with pure functions and immutable patterns for predictable and testable code.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              ⚡ Chainable API
            </h3>
            <p className="text-sm text-muted-foreground">
              Fluent, chainable methods for intuitive API interactions and clean code.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              🚀 Modern Tooling
            </h3>
            <p className="text-sm text-muted-foreground">
              Built with modern JavaScript features, optimized for Bun runtime, and ESM-first.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
