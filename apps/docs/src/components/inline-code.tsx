'use client'

import { useEffect, useState } from 'react'
import Prism from 'prismjs'

type TProps = {
  children: string
  language?: string
  className?: string
}

export function InlineCode({ children, language = 'typescript', className = '' }: TProps) {
  const [highlighted, setHighlighted] = useState('')

  useEffect(function highlightInlineCode() {
    if (language && Prism.languages[language]) {
      const highlightedText = Prism.highlight(
        children,
        Prism.languages[language],
        language
      )
      setHighlighted(highlightedText)
    } else {
      setHighlighted(children)
    }
  }, [children, language])

  return (
    <code 
      className={`inline-block bg-muted/80 text-accent px-2 py-0.5 rounded font-mono text-sm border border-border/50 ${className}`}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}
