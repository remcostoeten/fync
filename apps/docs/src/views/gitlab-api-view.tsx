'use client'

import { GitBranch } from 'lucide-react'
import { gitlabContent } from '@/content/gitlab'
import { ApiMethod } from '@/components/api-method'
import { TableOfContents } from '@/components/table-of-contents'
import { CodeBlock } from '@/components/code-block'
import { useToc } from '@/hooks/use-toc'

export function GitlabApiView() {
  const tocItems = useToc({ sections: gitlabContent })

  return (
    <div className="flex gap-8">
      <div
        className="flex-1 space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center">
              <GitBranch className="w-7 h-7 text-orange-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              GitLab API
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive GitLab API client for project management, CI/CD pipelines, and team collaboration.
            Manage projects, issues, merge requests, and track development activity with type-safe methods.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-green-400/20 text-green-400 rounded-full">
              Stable
            </span>
            <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-400 rounded-full">
              CI/CD Support
            </span>
            <span className="text-xs px-3 py-1.5 bg-blue-400/20 text-blue-400 rounded-full">
              Token Auth
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Quick Start
          </h2>
          <CodeBlock
            code={`import { GitLab } from '@remcostoeten/fync/gitlab'

const gitlab = GitLab({ token: 'your-gitlab-token' })

const currentUser = await gitlab.getCurrentUser()
const projects = await gitlab.me.getUserProjects({})`}
            language="typescript"
            filename="example.ts"
          />
        </div>

        <div className="space-y-16">
          {gitlabContent.map(function renderSection(section, sectionIndex) {
            return (
              <section
                key={section.id}
                id={section.id}
                className="space-y-8 scroll-mt-24"
              >
                <div className="space-y-3 border-l-4 border-accent pl-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {section.description}
                  </p>
                </div>

                <div className="space-y-12">
                  {section.methods.map(function renderMethod(method) {
                    return (
                      <ApiMethod key={method.id} method={method} />
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Need more examples? Check out the{' '}
                <a
                  href="https://github.com/remcostoeten/fync/tree/main/examples"
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  examples repository
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <TableOfContents items={tocItems} className="w-64" />
    </div>
  )
}
