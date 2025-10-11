'use client'

import { Home, Github, Music, ChevronRight, Code2, Calendar, HardDrive, Cloud, MessageSquare, FileText, Package } from 'lucide-react'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type TSubsection = {
  id: string
  label: string
  href: string
}

type TSection = {
  id: string
  label: string
  icon: typeof Home
  href: string
  subsections?: TSubsection[]
}

type TProps = {
  className?: string
}

const sections: TSection[] = [
  { 
    id: 'overview', 
    label: 'Overview', 
    icon: Home, 
    href: '/docs' 
  },
  { 
    id: 'github', 
    label: 'GitHub API', 
    icon: Github,
    href: '/docs/github',
    subsections: [
      { id: 'core-exports', label: 'Core Exports', href: '/docs/github#core-exports' },
      { id: 'github-client', label: 'GitHub Client', href: '/docs/github#github-client' },
      { id: 'github-user-operations', label: 'User Operations', href: '/docs/github#github-user-operations' },
      { id: 'github-repository-operations', label: 'Repository Operations', href: '/docs/github#github-repository-operations' },
      { id: 'github-search-operations', label: 'Search Operations', href: '/docs/github#github-search-operations' },
      { id: 'github-oauth2', label: 'OAuth2 System', href: '/docs/github#github-oauth2' }
    ]
  },
  { 
    id: 'spotify', 
    label: 'Spotify API', 
    icon: Music,
    href: '/docs/spotify',
    subsections: [
      { id: 'spotify-client', label: 'Spotify Client', href: '/docs/spotify#spotify-client' },
      { id: 'spotify-user-operations', label: 'User Operations', href: '/docs/spotify#spotify-user-operations' },
      { id: 'player-operations', label: 'Player Operations', href: '/docs/spotify#player-operations' },
      { id: 'search-operations', label: 'Search Operations', href: '/docs/spotify#search-operations' },
      { id: 'playlist-operations', label: 'Playlist Operations', href: '/docs/spotify#playlist-operations' },
      { id: 'library-operations', label: 'Library Operations', href: '/docs/spotify#library-operations' },
      { id: 'spotify-auth', label: 'Authentication', href: '/docs/spotify#spotify-auth' }
    ]
  },
  { 
    id: 'gitlab', 
    label: 'GitLab API', 
    icon: Code2,
    href: '/docs/gitlab',
    subsections: [
      { id: 'gitlab-client', label: 'GitLab Client', href: '/docs/gitlab#gitlab-client' },
      { id: 'gitlab-users', label: 'User Operations', href: '/docs/gitlab#gitlab-users' },
      { id: 'gitlab-projects', label: 'Project Operations', href: '/docs/gitlab#gitlab-projects' },
      { id: 'gitlab-commits', label: 'Commit Operations', href: '/docs/gitlab#gitlab-commits' },
      { id: 'gitlab-issues', label: 'Issue Operations', href: '/docs/gitlab#gitlab-issues' },
      { id: 'gitlab-merge-requests', label: 'Merge Requests', href: '/docs/gitlab#gitlab-merge-requests' },
      { id: 'gitlab-groups', label: 'Group Operations', href: '/docs/gitlab#gitlab-groups' },
      { id: 'gitlab-pipelines', label: 'CI/CD Pipelines', href: '/docs/gitlab#gitlab-pipelines' },
      { id: 'gitlab-activity', label: 'Activity', href: '/docs/gitlab#gitlab-activity' }
    ]
  },
  { 
    id: 'npm', 
    label: 'npm Registry', 
    icon: Package,
    href: '/docs/npm',
    subsections: [
      { id: 'npm-client', label: 'npm Client', href: '/docs/npm#npm-client' },
      { id: 'npm-packages', label: 'Package Operations', href: '/docs/npm#npm-packages' },
      { id: 'npm-dependencies', label: 'Dependencies', href: '/docs/npm#npm-dependencies' },
      { id: 'npm-search', label: 'Search', href: '/docs/npm#npm-search' },
      { id: 'npm-downloads', label: 'Download Statistics', href: '/docs/npm#npm-downloads' },
      { id: 'npm-size', label: 'Package Size', href: '/docs/npm#npm-size' },
      { id: 'npm-deprecation', label: 'Package Status', href: '/docs/npm#npm-deprecation' }
    ]
  },
  { 
    id: 'google-calendar', 
    label: 'Google Calendar', 
    icon: Calendar,
    href: '/docs/google-calendar',
    subsections: [
      { id: 'calendar-client', label: 'Calendar Client', href: '/docs/google-calendar#calendar-client' },
      { id: 'calendar-events-operations', label: 'Events', href: '/docs/google-calendar#calendar-events-operations' },
      { id: 'calendar-management', label: 'Calendar Management', href: '/docs/google-calendar#calendar-management' },
      { id: 'calendar-oauth2', label: 'OAuth2', href: '/docs/google-calendar#calendar-oauth2' }
    ]
  },
  { 
    id: 'google-drive', 
    label: 'Google Drive', 
    icon: HardDrive,
    href: '/docs/google-drive',
    subsections: [
      { id: 'drive-client', label: 'Drive Client', href: '/docs/google-drive#drive-client' },
      { id: 'drive-files-operations', label: 'Files', href: '/docs/google-drive#drive-files-operations' },
      { id: 'drive-folders-operations', label: 'Folders', href: '/docs/google-drive#drive-folders-operations' },
      { id: 'drive-permissions', label: 'Permissions', href: '/docs/google-drive#drive-permissions' },
      { id: 'drive-oauth2', label: 'OAuth2', href: '/docs/google-drive#drive-oauth2' }
    ]
  },
  { 
    id: 'vercel', 
    label: 'Vercel API', 
    icon: Cloud,
    href: '/docs/vercel',
    subsections: [
      { id: 'vercel-client', label: 'Vercel Client', href: '/docs/vercel#vercel-client' },
      { id: 'vercel-deployments-operations', label: 'Deployments', href: '/docs/vercel#vercel-deployments-operations' },
      { id: 'vercel-projects-operations', label: 'Projects', href: '/docs/vercel#vercel-projects-operations' },
      { id: 'vercel-domains-operations', label: 'Domains', href: '/docs/vercel#vercel-domains-operations' }
    ]
  },
  { 
    id: 'discord', 
    label: 'Discord API', 
    icon: MessageSquare,
    href: '/docs/discord',
    subsections: [
      { id: 'discord-client', label: 'Discord Client', href: '/docs/discord#discord-client' },
      { id: 'discord-guilds-operations', label: 'Guilds', href: '/docs/discord#discord-guilds-operations' },
      { id: 'discord-channels-operations', label: 'Channels', href: '/docs/discord#discord-channels-operations' }
    ]
  },
  { 
    id: 'notion', 
    label: 'Notion API', 
    icon: FileText,
    href: '/docs/notion',
    subsections: [
      { id: 'notion-client', label: 'Notion Client', href: '/docs/notion#notion-client' },
      { id: 'notion-databases', label: 'Databases', href: '/docs/notion#notion-databases' },
      { id: 'notion-pages', label: 'Pages', href: '/docs/notion#notion-pages' },
      { id: 'notion-blocks', label: 'Blocks', href: '/docs/notion#notion-blocks' }
    ]
  },
]

export function DocsSidebar({ className }: TProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['github', 'spotify'])
  )

  function toggleSection(sectionId: string) {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  function isActive(href: string) {
    return pathname === href
  }

  function isParentActive(section: TSection) {
    if (pathname === section.href) return true
    if (section.subsections) {
      return section.subsections.some(function checkSubsection(sub) {
        return pathname === sub.href
      })
    }
    return false
  }

  return (
    <div 
      className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border flex flex-col z-40 ${className || ''}`}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">
              F
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">
              Fync
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              API Documentation
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sections.map(function renderSection(section) {
            const Icon = section.icon
            const isActiveSection = isParentActive(section)
            const hasSubsections = section.subsections && section.subsections.length > 0
            const isExpanded = expandedSections.has(section.id)
            
            return (
              <li key={section.id} className="space-y-1">
                <button
                  onClick={function handleClick(e) {
                    e.preventDefault()
                    if (hasSubsections) {
                      toggleSection(section.id)
                    }
                    router.push(section.href)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    isActiveSection
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`}
                >
                    <div className={`${isActiveSection ? 'text-accent' : 'text-sidebar-foreground/70'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium flex-1">
                      {section.label}
                    </span>
                    {hasSubsections && (
                      <div className={`text-sidebar-foreground/50 transition-transform ${
                        isExpanded ? 'rotate-90' : 'rotate-0'
                      }`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                
                {hasSubsections && isExpanded && (
                  <div className="ml-8 space-y-1">
                    {section.subsections!.map(function renderSubsection(subsection) {
                      const isAnchorLink = subsection.href.includes('#')
                      
                      return (
                        <button
                          key={subsection.id}
                          onClick={function handleSubClick() {
                            if (isAnchorLink) {
                              const [path, hash] = subsection.href.split('#')
                              if (pathname === path) {
                                const element = document.getElementById(hash)
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }
                              } else {
                                router.push(subsection.href)
                              }
                            } else {
                              router.push(subsection.href)
                            }
                          }}
                          className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                            isActive(subsection.href)
                              ? 'text-accent bg-accent/10'
                              : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                          }`}
                        >
                          {subsection.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60 space-y-1">
          <p>Version 5.1.2</p>
          <p>
            <a 
              href="https://github.com/remcostoeten/fync" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
