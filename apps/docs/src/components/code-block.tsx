'use client'

import { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import Prism from 'prismjs'
import '@/styles/prism-custom.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'

type TAnnotation = {
  line: number
  text: string
}

type TProps = {
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  annotations?: TAnnotation[]
}

export function CodeBlock({ 
  code, 
  language, 
  filename, 
  showLineNumbers = false,
  highlightLines = [],
  annotations = []
}: TProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')

  useEffect(function highlightCode() {
    if (Prism.languages[language]) {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language],
        language
      )
      setHighlightedCode(highlighted)
    } else {
      setHighlightedCode(code)
    }
  }, [code, language])

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(function resetCopied() {
      setCopied(false)
    }, 2000)
  }

  function renderLineNumbers() {
    const lines = code.split('\n')
    return lines.map(function renderLine(_, index) {
      const lineNumber = index + 1
      const isHighlighted = highlightLines.includes(lineNumber)
      
      return (
        <div
          key={lineNumber}
          className={`text-right pr-4 select-none leading-6 ${
            isHighlighted ? 'bg-accent/10' : ''
          }`}
          style={{ height: '24px' }}
        >
          {lineNumber}
        </div>
      )
    })
  }

  function renderCodeLines() {
    const lines = highlightedCode.split('\n')
    return lines.map(function renderLine(line, index) {
      const lineNumber = index + 1
      const isHighlighted = highlightLines.includes(lineNumber)
      
      return (
        <div
          key={lineNumber}
          className={`leading-6 ${isHighlighted ? 'bg-accent/10' : ''}`}
          style={{ minHeight: '24px' }}
          dangerouslySetInnerHTML={{ __html: line || ' ' }}
        />
      )
    })
  }

  const hasAnnotations = annotations.length > 0
  const annotatedLines = annotations.map(function getLine(a) {
    return a.line
  })

  return (
    <div className="space-y-4">
      <div
        className="relative group rounded-lg overflow-hidden border border-border bg-[#1e1e1e] shadow-lg"
      >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-[#161616]">
          <span className="text-sm text-gray-300 font-mono">
            {filename}
          </span>
          <span className="text-xs text-gray-500 uppercase font-semibold">
            {language}
          </span>
        </div>
      )}

      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-[#2a2a2a] border border-gray-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#333] hover:border-accent"
          
          
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
          )}
        </button>

        <div className="flex overflow-x-auto">
          {showLineNumbers && (
            <div className="text-xs text-gray-500 pl-4 py-4 bg-[#161616] font-mono border-r border-gray-800 leading-6">
              {renderLineNumbers()}
            </div>
          )}
          
          <pre className="flex-1 p-4 text-sm overflow-x-auto bg-[#1e1e1e] leading-6">
            <code className={`language-${language} font-mono leading-6`}>
              {showLineNumbers || highlightLines.length > 0 || hasAnnotations ? (
                <div className="leading-6">
                  {code.split('\n').map(function renderAnnotatedLine(line, index) {
                    const lineNumber = index + 1
                    const isHighlighted = highlightLines.includes(lineNumber) || annotatedLines.includes(lineNumber)
                    const annotation = annotations.find(function findAnnotation(a) {
                      return a.line === lineNumber
                    })
                    const highlighted = Prism.highlight(line || ' ', Prism.languages[language] || {}, language)
                    
                    return (
                      <div
                        key={lineNumber}
                        className={`leading-6 relative group/line ${
                          isHighlighted ? 'bg-accent/10' : ''
                        }`}
                        style={{ minHeight: '24px' }}
                      >
                        {annotation && (
                          <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                            {annotations.indexOf(annotation) + 1}
                          </span>
                        )}
                        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="leading-6" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>

      {hasAnnotations && (
        <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
          <div className="text-sm font-semibold text-foreground mb-2">Code Explanations:</div>
          {annotations.map(function renderAnnotation(annotation, index) {
            return (
              <div key={annotation.line} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <span className="text-muted-foreground">Line {annotation.line}:</span>
                  <span className="text-foreground ml-2">{annotation.text}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
