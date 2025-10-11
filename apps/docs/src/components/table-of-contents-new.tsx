'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type THeading = {
  id: string
  text: string
  level: number
}

type TProps = {
  containerRef?: React.RefObject<HTMLElement>
}

export function TableOfContentsNew({ containerRef }: TProps) {
  const [headings, setHeadings] = useState<THeading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(function extractHeadings() {
    const container = containerRef?.current || document
    const elements = container.querySelectorAll('h2, h3')
    
    const headingElements = Array.from(elements).map(function parseHeading(element, index) {
      if (!element.id) {
        element.id = `heading-${index}`
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1))
      }
    })
    
    setHeadings(headingElements)
  }, [containerRef])

  useEffect(function setupScrollSpy() {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      function handleIntersection(entries) {
        entries.forEach(function processEntry(entry) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    )

    headings.forEach(function observeHeading(heading) {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return function cleanup() {
      observer.disconnect()
    }
  }, [headings])

  function scrollToHeading(id: string) {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (headings.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden xl:block sticky top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          On This Page
        </h2>
        <ul className="space-y-2 text-sm">
          {headings.map(function renderHeading(heading) {
            const isActive = activeId === heading.id
            const isH3 = heading.level === 3
            
            return (
              <li
                key={heading.id}
                className={isH3 ? 'ml-4' : ''}
              >
                <button
                  onClick={function handleClick() {
                    scrollToHeading(heading.id)
                  }}
                  className={`
                    text-left w-full py-1 px-2 rounded transition-colors
                    hover:text-accent
                    ${isActive 
                      ? 'text-accent font-medium border-l-2 border-accent -ml-0.5 pl-1.5' 
                      : 'text-muted-foreground border-l-2 border-transparent'
                    }
                  `}
                >
                  {heading.text}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.nav>
  )
}
