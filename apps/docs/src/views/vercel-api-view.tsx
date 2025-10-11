'use client'

import { Zap } from 'lucide-react'
import { vercelContent } from '@/content/vercel'
import { ApiMethod } from '@/components/api-method'
import { TableOfContents } from '@/components/table-of-contents'
import { CodeBlock } from '@/components/code-block'
import { useToc } from '@/hooks/use-toc'

export function VercelApiView() {
  const tocItems = useToc({ sections: vercelContent })

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Vercel API
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive Vercel API client for deployments, projects, and team management. 
            Build powerful deployment automation with type-safe methods for hosting, domains, and CI/CD workflows.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-green-400/20 text-green-400 rounded-full">
              Stable
            </span>
            <span className="text-xs px-3 py-1.5 bg-black/20 text-white rounded-full">
              API Token Auth
            </span>
            <span className="text-xs px-3 py-1.5 bg-blue-400/20 text-blue-400 rounded-full">
              Deployments
            </span>
            <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-400 rounded-full">
              Projects
            </span>
            <span className="text-xs px-3 py-1.5 bg-purple-400/20 text-purple-400 rounded-full">
              Webhooks
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Quick Start
          </h2>
          <CodeBlock
            code={`import { Vercel } from '@remcostoeten/fync/vercel'

const vercel = Vercel({ 
  token: 'your-vercel-token',
  teamId: 'your-team-id' 
})

const deployments = await vercel.deployments.list({
  limit: 10,
  state: 'READY'
})

const newDeployment = await vercel.deployments.create({
  name: 'my-app',
  files: [
    { file: 'index.html', data: '<h1>Hello World</h1>' }
  ]
})

const projects = await vercel.projects.list()
console.log('Active projects:', projects.length)`}
            language="typescript"
            filename="vercel-example.ts"
          />
        </div>

        <div className="space-y-16">
          {vercelContent.map(function renderSection(section, sectionIndex) {
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