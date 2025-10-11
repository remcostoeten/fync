'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search, FileText, Code, Package, ExternalLink } from 'lucide-react'
import type { TSearchResult } from '@/types/content'

type TProps = {
  searchData: TSearchResult[]
}

export function CommandPalette({ searchData }: TProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredResults, setFilteredResults] = useState<TSearchResult[]>([])

  const handleKeyDown = useCallback(function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setOpen(function toggleOpen(prev) {
        return !prev
      })
    }
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }, [])

  useEffect(function setupKeyboardShortcut() {
    document.addEventListener('keydown', handleKeyDown)
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(function filterResults() {
    if (!search) {
      setFilteredResults(searchData.slice(0, 8))
      return
    }

    const query = search.toLowerCase()
    const filtered = searchData.filter(function matchQuery(item) {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags?.some(function matchTag(tag) {
          return tag.toLowerCase().includes(query)
        })
      )
    }).slice(0, 10)

    setFilteredResults(filtered)
  }, [search, searchData])

  function handleSelect(href: string) {
    setOpen(false)
    setSearch('')
    router.push(href)
  }

  function getIcon(type: string) {
    switch (type) {
      case 'method':
        return Code
      case 'example':
        return FileText
      case 'section':
        return Package
      default:
        return FileText
    }
  }

  function getCategoryColor(category: string) {
    const colors = {
      github: 'text-purple-400',
      spotify: 'text-green-400',
      gitlab: 'text-orange-400',
      npm: 'text-red-400',
      'google-calendar': 'text-blue-400',
      'google-drive': 'text-yellow-400',
      vercel: 'text-white',
      discord: 'text-indigo-400',
      notion: 'text-gray-400',
      core: 'text-accent'
    }
    return colors[category.toLowerCase() as keyof typeof colors] || 'text-muted-foreground'
  }

  return (
    <>
      <button
        onClick={function handleOpen() {
          setOpen(true)
        }}
        className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:border-accent transition-colors bg-background/50"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={function handleClose() {
              setOpen(false)
            }}
          />

          <div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
          >
              <Command className="rounded-lg border border-border bg-background shadow-2xl">
                <div className="flex items-center border-b border-border px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  <Command.Input
                    placeholder="Search documentation..."
                    value={search}
                    onValueChange={setSearch}
                    className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <Command.List className="max-h-96 overflow-y-auto p-2">
                  {filteredResults.length === 0 && search && (
                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </Command.Empty>
                  )}

                  {filteredResults.length > 0 && (
                    <Command.Group heading="Results" className="text-xs text-muted-foreground px-2 py-1.5">
                      {filteredResults.map(function renderResult(result) {
                        const Icon = getIcon(result.type)
                        const categoryColor = getCategoryColor(result.category)

                        return (
                          <Command.Item
                            key={result.id}
                            value={result.id}
                            onSelect={function handleItemSelect() {
                              handleSelect(result.href)
                            }}
                            className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm outline-none hover:bg-accent/10 data-[selected=true]:bg-accent/10"
                          >
                            <Icon className="mr-3 h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-foreground">
                                  {result.title}
                                </span>
                                <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColor}`}>
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {result.description}
                              </p>
                            </div>
                            <ExternalLink className="ml-2 h-3 w-3 text-muted-foreground" />
                          </Command.Item>
                        )
                      })}
                    </Command.Group>
                  )}

                  {!search && (
                    <Command.Group heading="Quick Links" className="text-xs text-muted-foreground px-2 py-1.5 mt-2">
                      <Command.Item
                        onSelect={function handleGitHub() {
                          handleSelect('/docs/github')
                        }}
                        className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none hover:bg-accent/10 data-[selected=true]:bg-accent/10"
                      >
                        <Code className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>GitHub API Documentation</span>
                      </Command.Item>
                      <Command.Item
                        onSelect={function handleSpotify() {
                          handleSelect('/docs/spotify')
                        }}
                        className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none hover:bg-accent/10 data-[selected=true]:bg-accent/10"
                      >
                        <Code className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>Spotify API Documentation</span>
                      </Command.Item>
                    </Command.Group>
                  )}
                </Command.List>

                <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Press ESC to close</span>
                    <div className="flex items-center space-x-2">
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs">
                        ↑↓
                      </kbd>
                      <span>to navigate</span>
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs">
                        ↵
                      </kbd>
                      <span>to select</span>
                    </div>
                  </div>
                </div>
              </Command>
            </div>
          </>
        )}
    </>
  )
}
