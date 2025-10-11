'use client'

import { MessageSquare } from 'lucide-react'
import { discordContent } from '@/content/discord'
import { ApiMethod } from '@/components/api-method'
import { TableOfContents } from '@/components/table-of-contents'
import { CodeBlock } from '@/components/code-block'
import { useToc } from '@/hooks/use-toc'

export function DiscordApiView() {
  const tocItems = useToc({ sections: discordContent })

  return (
    <div className="flex gap-8">
      <div
        className="flex-1 space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-400/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Discord API
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive Discord API client for bot development and server automation. 
            Build powerful Discord bots with type-safe methods for messages, guilds, channels, and interactions.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-green-400/20 text-green-400 rounded-full">
              Stable
            </span>
            <span className="text-xs px-3 py-1.5 bg-indigo-400/20 text-indigo-400 rounded-full">
              Bot Token Auth
            </span>
            <span className="text-xs px-3 py-1.5 bg-blue-400/20 text-blue-400 rounded-full">
              Slash Commands
            </span>
            <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-400 rounded-full">
              Webhooks
            </span>
            <span className="text-xs px-3 py-1.5 bg-purple-400/20 text-purple-400 rounded-full">
              Event System
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Quick Start
          </h2>
          <CodeBlock
            code={`import { Discord, DiscordBot } from '@remcostoeten/fync/discord'

const discord = Discord({ 
  token: 'your-bot-token',
  intents: ['GUILDS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT']
})

const message = await discord.messages.send('123456789012345678', {
  content: 'Hello, Discord! 👋',
  embeds: [{
    title: 'Bot Status',
    description: 'Bot is now online!',
    color: 0x00ff00
  }]
})

const bot = DiscordBot({
  token: 'your-bot-token',
  events: {
    ready: (client) => console.log('Ready!', client.user.tag),
    messageCreate: (msg) => {
      if (msg.content === '!ping') msg.reply('Pong!')
    }
  }
})

bot.start()`}
            language="typescript"
            filename="discord-example.ts"
          />
        </div>

        <div className="space-y-16">
          {discordContent.map(function renderSection(section, sectionIndex) {
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