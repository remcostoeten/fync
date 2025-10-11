'use client'

import { HardDrive } from 'lucide-react'
import { driveContent } from '@/content/drive'
import { ApiMethod } from '@/components/api-method'
import { TableOfContents } from '@/components/table-of-contents'
import { CodeBlock } from '@/components/code-block'
import { useToc } from '@/hooks/use-toc'

export function DriveApiView() {
  const tocItems = useToc({ sections: driveContent })

  return (
    <div className="flex gap-8">
      <div
        className="flex-1 space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center">
              <HardDrive className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Google Drive API
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive Google Drive API client with OAuth2 authentication and file management. 
            Build powerful cloud storage integrations with type-safe methods for files, folders, and permissions.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-green-400/20 text-green-400 rounded-full">
              Stable
            </span>
            <span className="text-xs px-3 py-1.5 bg-emerald-400/20 text-emerald-400 rounded-full">
              OAuth2 Support
            </span>
            <span className="text-xs px-3 py-1.5 bg-blue-400/20 text-blue-400 rounded-full">
              File Management
            </span>
            <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-400 rounded-full">
              Permissions
            </span>
            <span className="text-xs px-3 py-1.5 bg-purple-400/20 text-purple-400 rounded-full">
              Batch Operations
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Quick Start
          </h2>
          <CodeBlock
            code={`import { GoogleDrive } from '@remcostoeten/fync/google-drive'

const drive = GoogleDrive({ 
  token: 'your-oauth-token'
})

const files = await drive.files.list({
  q: "mimeType='application/pdf'",
  pageSize: 10
})

const uploadedFile = await drive.files.upload({
  name: 'document.pdf',
  content: fileBuffer,
  parents: ['folder-id']
})

await drive.permissions.create(uploadedFile.id, {
  role: 'reader',
  type: 'user',
  emailAddress: 'colleague@company.com'
})`}
            language="typescript"
            filename="drive-example.ts"
          />
        </div>

        <div className="space-y-16">
          {driveContent.map(function renderSection(section, sectionIndex) {
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