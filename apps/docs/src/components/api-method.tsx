'use client'

import { Code, BookOpen } from 'lucide-react'
import { CodeBlock } from './code-block'
import type { TApiMethod } from '@/types/content'

type TProps = {
  method: TApiMethod
}

export function ApiMethod({ method }: TProps) {
  return (
    <div
      id={method.id}
      className="space-y-6 scroll-mt-24"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-semibold text-foreground flex items-center space-x-2">
            <Code className="w-6 h-6 text-accent" />
            <span>{method.name}</span>
          </h3>
        </div>

        <p className="text-muted-foreground">
          {method.description}
        </p>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <code className="text-sm font-mono text-foreground">
            {method.signature}
          </code>
        </div>
      </div>

      {method.parameters.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span>Parameters</span>
          </h4>
          
          <div className="space-y-3">
            {method.parameters.map(function renderParameter(param) {
              return (
                <div
                  key={param.name}
                  className="bg-card border border-border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-accent">
                      {param.name}
                    </code>
                    <code className="text-xs font-mono text-muted-foreground">
                      {param.type}
                    </code>
                    {param.required && (
                      <span className="text-xs px-2 py-0.5 bg-red-400/20 text-red-400 rounded">
                        required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {param.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-foreground">
          Returns
        </h4>
        <code className="text-sm font-mono text-accent bg-muted/50 px-3 py-1.5 rounded inline-block">
          {method.returnType}
        </code>
      </div>

      {method.examples.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Examples
          </h4>
          
          {method.examples.map(function renderExample(example, index) {
            return (
              <div
                key={example.id}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <h5 className="text-base font-medium text-foreground">
                    {example.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map(function renderTag(tag) {
                      return (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <CodeBlock
                  code={example.code}
                  language={example.language}
                  showLineNumbers={example.code.split('\n').length > 10}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
