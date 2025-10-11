'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, List } from 'lucide-react'
import type { TTocItem } from '@/types/content'

type TProps = {
  items: TTocItem[]
  className?: string
  title?: string
}

export function TableOfContents({ items, className, title = 'On This Page' }: TProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(function observeHeadings() {
    const observer = new IntersectionObserver(
      function handleIntersection(entries) {
        const visibleEntries = entries.filter(function isVisible(entry) {
          return entry.isIntersecting
        })

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce(function findTopmost(prev, curr) {
            return prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          })
          
          setActiveId(topEntry.target.id)
          const index = items.findIndex(function findIndex(item) {
            return item.id === topEntry.target.id
          })
          if (index !== -1) {
            setActiveIndex(index)
          }
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    const headings = items.map(function getHeading(item) {
      return document.getElementById(item.id)
    }).filter(function filterNull(el): el is HTMLElement {
      return el !== null
    })

    for (const heading of headings) {
      observer.observe(heading)
    }

    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id)
      setActiveIndex(0)
    }

    return function cleanup() {
      for (const heading of headings) {
        observer.unobserve(heading)
      }
    }
  }, [items, activeId])

  function scrollToHeading(id: string) {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div
      className={`hidden xl:block ${className || ''}`}
    >
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <div className="space-y-4 p-4 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-border/50">
            <List className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
              {title}
            </h3>
          </div>

          {!isCollapsed && (
            <nav
              ref={navRef}
              className="relative space-y-1 pt-2"
            >
              <div
                className="absolute left-0 w-0.5 bg-accent rounded-full shadow-[0_0_8px_rgba(135,255,135,0.5)] transition-all duration-300"
                style={{
                  top: `${activeIndex * 40}px`,
                  height: '36px'
                }}
              />
              
              <div className="absolute left-0 w-px h-full bg-gradient-to-b from-border/30 via-border/60 to-border/30" />

              {items.map(function renderItem(item, index) {
                const isActive = activeId === item.id
                const indent = item.level === 3 ? 'pl-7' : item.level === 4 ? 'pl-11' : 'pl-4'

                return (
                  <button
                    key={item.id}
                    onClick={function handleClick() {
                      scrollToHeading(item.id)
                    }}
                    className={`relative flex items-center w-full text-left text-sm py-2.5 pr-3 rounded-md transition-all duration-200 group ${indent} ${
                      isActive
                        ? 'text-accent font-semibold bg-accent/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  >
                    <span
                      className="truncate"
                    >
                      {item.title}
                    </span>
                    {isActive && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_4px_rgba(135,255,135,0.6)]"
                      />
                    )}
                  </button>
                )
              })}
            </nav>
          )}
        </div>
      </div>

      <div className="xl:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleCollapse}
          className="p-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <List className={`w-5 h-5`} />
        </button>

        {!isCollapsed && (
          <div
            className="absolute bottom-16 right-0 w-64 bg-background border border-border rounded-lg shadow-xl p-4 max-h-96 overflow-y-auto"
          >
            <div className="flex items-center space-x-2 mb-3">
              <List className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">
                {title}
              </h3>
            </div>
            <nav className="relative space-y-0.5">
              <div
                className="absolute left-0 w-0.5 bg-accent rounded-full transition-all duration-300"
                style={{
                  top: `${activeIndex * 28}px`,
                  height: '28px'
                }}
              />
                
                <div className="absolute left-0 w-0.5 h-full bg-border rounded-full" />

                {items.map(function renderMobileItem(item) {
                  const isActive = activeId === item.id
                  const indent = item.level === 3 ? 'pl-6' : item.level === 4 ? 'pl-10' : 'pl-3'

                  return (
                    <button
                      key={item.id}
                      onClick={function handleClick() {
                        scrollToHeading(item.id)
                        setIsCollapsed(true)
                      }}
                      className={`relative block w-full text-left text-sm py-1.5 pr-2 transition-all ${indent} ${
                        isActive
                          ? 'text-accent font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span>
                        {item.title}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          )}
      </div>
    </div>
  )
}
