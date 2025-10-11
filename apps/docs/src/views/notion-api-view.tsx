'use client'

import { BookOpen } from 'lucide-react'
import { notionContent } from '@/content/notion'
import { ApiMethod } from '@/components/api-method'
import { TableOfContents } from '@/components/table-of-contents'
import { CodeBlock } from '@/components/code-block'
import { useToc } from '@/hooks/use-toc'

export function NotionApiView() {
  const tocItems = useToc({ sections: notionContent })

  return (
    <div className="flex gap-8">
      <div
        className="flex-1 space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-400/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Notion API
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive Notion API client for workspace, database, and page management. 
            Build powerful productivity integrations with type-safe methods for databases, pages, blocks, and rich content.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-green-400/20 text-green-400 rounded-full">
              Stable
            </span>
            <span className="text-xs px-3 py-1.5 bg-gray-400/20 text-gray-400 rounded-full">
              Integration Token
            </span>
            <span className="text-xs px-3 py-1.5 bg-blue-400/20 text-blue-400 rounded-full">
              Databases
            </span>
            <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-400 rounded-full">
              Rich Text
            </span>
            <span className="text-xs px-3 py-1.5 bg-purple-400/20 text-purple-400 rounded-full">
              Blocks System
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Quick Start
          </h2>
          <CodeBlock
            code={`import { Notion } from '@remcostoeten/fync/notion'

const notion = Notion({ 
  token: 'your-notion-integration-token',
  version: '2022-06-28'
})

const databases = await notion.databases.list()
console.log('Available databases:', databases.length)

const pages = await notion.databases.query('database-id', {
  filter: {
    property: 'Status',
    select: { equals: 'In Progress' }
  },
  sorts: [{ property: 'Due Date', direction: 'ascending' }]
})

const newPage = await notion.pages.create({
  parent: { database_id: 'database-id' },
  properties: {
    'Name': {
      title: [{ type: 'text', text: { content: 'New Task' } }]
    },
    'Status': { select: { name: 'Not Started' } }
  }
})`}
            language="typescript"
            filename="notion-example.ts"
          />
        </div>

        <div className="space-y-16">
          {notionContent.map(function renderSection(section, sectionIndex) {
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