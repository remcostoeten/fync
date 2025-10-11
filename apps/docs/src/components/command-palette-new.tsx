'use client'

import { useEffect, useState, useCallback } from 'react'
import { Command } from 'cmdk'
import { Search, FileText, Github, Package, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type TCommandItem = {
  id: string
  title: string
  description?: string
  icon?: typeof FileText
  action: () => void
  category: string
}

const DOCUMENTATION_PAGES: TCommandItem[] = [
  {
    id: 'docs-overview',
    title: 'Documentation Overview',
    description: 'Get started with Fync',
    icon: FileText,
    action: () => {},
    category: 'Documentation'
  },
  {
    id: 'docs-github',
    title: 'GitHub API',
    description: 'GitHub API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-spotify',
    title: 'Spotify API',
    description: 'Spotify API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-gitlab',
    title: 'GitLab API',
    description: 'GitLab API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-npm',
    title: 'npm Registry',
    description: 'npm Registry API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-calendar',
    title: 'Google Calendar',
    description: 'Google Calendar API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-drive',
    title: 'Google Drive',
    description: 'Google Drive API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-vercel',
    title: 'Vercel API',
    description: 'Vercel API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-discord',
    title: 'Discord API',
    description: 'Discord API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  },
  {
    id: 'docs-notion',
    title: 'Notion API',
    description: 'Notion API documentation',
    icon: FileText,
    action: () => {},
    category: 'APIs'
  }
]

export function CommandPaletteNew() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleKeyDown = useCallback(function handleKeyboardShortcut(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setOpen(function toggle(current) {
        return !current
      })
    }
  }, [])

  useEffect(function setupKeyboardListener() {
    document.addEventListener('keydown', handleKeyDown)
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  function navigateTo(path: string) {
    setOpen(false)
    router.push(path)
  }

  function openExternal(url: string) {
    setOpen(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const commands: TCommandItem[] = [
    ...DOCUMENTATION_PAGES.map(function mapDocPage(page) {
      return {
        ...page,
        action: function navigate() {
          const path = page.id === 'docs-overview' 
            ? '/docs' 
            : `/docs/${page.id.replace('docs-', '')}`
          navigateTo(path)
        }
      }
    }),
    {
      id: 'github',
      title: 'View on GitHub',
      description: 'Open Fync repository',
      icon: Github,
      action: function openGithub() {
        openExternal('https://github.com/remcostoeten/fync')
      },
      category: 'Links'
    },
    {
      id: 'npm',
      title: 'View on npm',
      description: 'Open npm package',
      icon: Package,
      action: function openNpm() {
        openExternal('https://www.npmjs.com/package/@remcostoeten/fync')
      },
      category: 'Links'
    }
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={function handleBackdropClick() {
              setOpen(false)
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className=\"fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl z-50\"
          >
            <Command className=\"rounded-lg border border-border bg-card shadow-2xl overflow-hidden\">
              <div className=\"flex items-center border-b border-border px-3\">
                <Search className=\"w-4 h-4 text-muted-foreground mr-2\" />
                <Command.Input
                  placeholder=\"Search documentation or type a command...\"
                  className=\"flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50\"
                />
                <kbd className=\"pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100\">
                  ESC
                </kbd>
              </div>
              <Command.List className=\"max-h-[400px] overflow-y-auto p-2\">
                <Command.Empty className=\"py-6 text-center text-sm text-muted-foreground\">
                  No results found.
                </Command.Empty>

                <Command.Group heading=\"Documentation\" className=\"text-xs font-semibold text-muted-foreground px-2 py-2\">
                  {commands
                    .filter(function filterDocs(cmd) {
                      return cmd.category === 'Documentation'
                    })
                    .map(function renderDoc(cmd) {
                      const Icon = cmd.icon || FileText
                      return (
                        <Command.Item
                          key={cmd.id}
                          onSelect={cmd.action}
                          className=\"flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-accent/10 data-[selected=true]:bg-accent/10 transition-colors\"
                        >
                          <Icon className=\"w-4 h-4 text-muted-foreground\" />
                          <div className=\"flex-1\">
                            <div className=\"text-sm font-medium text-foreground\">{cmd.title}</div>
                            {cmd.description && (
                              <div className=\"text-xs text-muted-foreground\">{cmd.description}</div>
                            )}
                          </div>
                        </Command.Item>
                      )
                    })}
                </Command.Group>

                <Command.Group heading=\"APIs\" className=\"text-xs font-semibold text-muted-foreground px-2 py-2 mt-2\">
                  {commands
                    .filter(function filterApis(cmd) {
                      return cmd.category === 'APIs'
                    })
                    .map(function renderApi(cmd) {
                      const Icon = cmd.icon || FileText
                      return (
                        <Command.Item
                          key={cmd.id}
                          onSelect={cmd.action}
                          className=\"flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-accent/10 data-[selected=true]:bg-accent/10 transition-colors\"
                        >
                          <Icon className=\"w-4 h-4 text-muted-foreground\" />
                          <div className=\"flex-1\">
                            <div className=\"text-sm font-medium text-foreground\">{cmd.title}</div>
                            {cmd.description && (
                              <div className=\"text-xs text-muted-foreground\">{cmd.description}</div>
                            )}
                          </div>
                        </Command.Item>
                      )
                    })}
                </Command.Group>

                <Command.Group heading=\"Links\" className=\"text-xs font-semibold text-muted-foreground px-2 py-2 mt-2\">
                  {commands
                    .filter(function filterLinks(cmd) {
                      return cmd.category === 'Links'
                    })
                    .map(function renderLink(cmd) {
                      const Icon = cmd.icon || ExternalLink
                      return (
                        <Command.Item
                          key={cmd.id}
                          onSelect={cmd.action}
                          className=\"flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-accent/10 data-[selected=true]:bg-accent/10 transition-colors\"
                        >
                          <Icon className=\"w-4 h-4 text-muted-foreground\" />
                          <div className=\"flex-1\">
                            <div className=\"text-sm font-medium text-foreground\">{cmd.title}</div>
                            {cmd.description && (
                              <div className=\"text-xs text-muted-foreground\">{cmd.description}</div>
                            )}
                          </div>
                          <ExternalLink className=\"w-3 h-3 text-muted-foreground\" />
                        </Command.Item>
                      )
                    })}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
