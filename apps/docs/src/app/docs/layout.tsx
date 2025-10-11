import type { Metadata } from 'next'
import { DocsSidebar } from '@/components/docs-sidebar'
import { DocsHeader } from '@/components/docs-header'
import { TableOfContentsNew } from '@/components/table-of-contents-new'
import { CommandPaletteNew } from '@/components/command-palette-new'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for the Fync unified API client library',
}

type TProps = {
  children: React.ReactNode
}

export default function DocsLayout({ children }: TProps) {
  return (
    <div className="min-h-screen bg-background dark">
      <CommandPaletteNew />
      <DocsHeader />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DocsSidebar />
        <main className="flex-1 lg:ml-64 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              <div className="flex-1 max-w-4xl">
                {children}
              </div>
              <TableOfContentsNew />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
