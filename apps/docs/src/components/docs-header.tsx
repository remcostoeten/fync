'use client'

import { Github, ExternalLink, Search, X } from 'lucide-react'
import { useState } from 'react'
import type { TSearchResult } from '@/types/content'

type TProps = {
  onResultClick?: (result: TSearchResult) => void
}

export function DocsHeader({ onResultClick }: TProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function handleSearchClose() {
    setQuery('')
    setIsSearchOpen(false)
  }

  function handleResultClick(result: TSearchResult) {
    if (onResultClick) {
      onResultClick(result)
    }
    handleSearchClose()
  }

  function handleSearchToggle() {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(function focusInput() {
        const input = document.getElementById('search-input')
        input?.focus()
      }, 200)
    } else {
      setQuery('')
    }
  }

  return (
    <header
      className="bg-background border-b border-border sticky top-0 z-50"
    >
      <div
        className="lg:ml-64 px-4 sm:px-6 lg:px-8"
      >
        <div
          className="flex items-center justify-between h-16"
        >
          <div
            className="flex lg:hidden items-center space-x-3"
          >
            <div
              className="flex items-center space-x-2"
            >
              <div
                className="w-8 h-8 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center"
              >
                <span
                  className="text-accent-foreground font-bold text-sm"
                >
                  F
                </span>
              </div>
              <div>
                <h1
                  className="text-lg font-bold text-foreground"
                >
                  Fync
                </h1>
              </div>
            </div>
          </div>

          <div
            className="hidden md:flex flex-1 justify-center max-w-2xl mx-auto"
          >
            <div
              className="relative w-full max-w-md"
            >
              <div
                className="relative"
              >
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                >
                  <Search className="w-4 h-4" />
                </div>
                <input
                  id="search-input-desktop"
                  type="text"
                  placeholder="Search API methods, examples..."
                  value={query}
                  onChange={function handleChange(e) {
                    setQuery(e.target.value)
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div
            className="flex items-center space-x-2"
          >
            <button
              onClick={handleSearchToggle}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-muted/50 transition-colors"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <a
              href="https://github.com/remcostoeten/fync"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-accent transition-colors rounded-lg hover:bg-muted/50"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">GitHub</span>
              <ExternalLink className="hidden sm:inline w-3 h-3" />
            </a>
          </div>
        </div>

        {isSearchOpen && (
          <div
            className="md:hidden border-t border-border bg-background"
          >
            <div
              className="p-4"
            >
              <div
                className="relative"
              >
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                >
                  <Search className="w-4 h-4" />
                </div>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search API methods, examples..."
                  value={query}
                  onChange={function handleChange(e) {
                    setQuery(e.target.value)
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
