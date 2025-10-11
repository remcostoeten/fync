import React from 'react';
import { Menu, Home, Code, Play, Settings, Github, Music, ChevronDown, ChevronRight } from 'lucide-react';
;
import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['github', 'spotify']));

  const sections = [
    { id: 'overview', label: 'Overview', icon: Home },
    { 
      id: 'github', 
      label: 'GitHub API', 
      icon: Github,
      subsections: [
        { id: 'core-exports', label: 'Core Exports' },
        { id: 'github-client', label: 'GitHub Client' },
        { id: 'github-user-operations', label: 'User Operations' },
        { id: 'github-repository-operations', label: 'Repository Operations' },
        { id: 'github-search-operations', label: 'Search Operations' },
        { id: 'github-oauth2', label: 'OAuth2 System' }
      ]
    },
    { 
      id: 'spotify', 
      label: 'Spotify API', 
      icon: Music,
      subsections: [
        { id: 'spotify-client', label: 'Spotify Client' },
        { id: 'spotify-user-operations', label: 'User Operations' },
        { id: 'player-operations', label: 'Player Operations' },
        { id: 'search-operations-spotify', label: 'Search Operations' },
        { id: 'playlist-operations', label: 'Playlist Operations' },
        { id: 'library-operations', label: 'Library Operations' },
        { id: 'spotify-auth', label: 'Authentication' }
      ]
    },
    { id: 'interactive', label: 'Interactive', icon: Play },
  ];

  function toggleSection(sectionId: string) {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  }

  function handleSectionClick(sectionId: string, hasSubsections: boolean) {
    if (hasSubsections) {
      toggleSection(sectionId);
    }
    onSectionChange(sectionId);
  }

  return (
    <div 
      className="fixed left-0 top-12 w-64 h-[calc(100vh-3rem)] bg-sidebar border-r border-sidebar-border flex flex-col z-40"
    >
      <div 
        className="p-4 border-b border-sidebar-border"
      >
        <div 
          className="flex items-center space-x-3"
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
              className="text-lg font-bold text-sidebar-foreground"
            >
              Fync
            </h1>
            <p 
              className="text-xs text-sidebar-foreground/60"
            >
              API Documentation
            </p>
          </div>
        </div>
      </div>
      
      <nav 
        className="flex-1 p-4 overflow-y-auto"
      >
        <ul 
          className="space-y-2"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const hasSubsections = section.subsections && section.subsections.length > 0;
            const isExpanded = expandedSections.has(section.id);
            
            return (
              <li key={section.id} className="space-y-1">
                <button
                  onClick={() => handleSectionClick(section.id, hasSubsections)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <div
                    className={`${isActive ? 'text-accent' : 'text-sidebar-foreground/70'}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span 
                    className="font-medium flex-1"
                  >
                    {section.label}
                  </span>
                  {hasSubsections && (
                    <div
                      className="text-sidebar-foreground/50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
                
                {/* Subsections */}
                {hasSubsections && isExpanded && (
                  <div
                    className="ml-8 space-y-1"
                  >
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => onSectionChange(subsection.id)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                          activeSection === subsection.id
                            ? 'text-accent bg-accent/10'
                            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                        }`}
                      >
                        {subsection.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

      </nav>

      {/* Footer */}
      <div 
        className="p-4 border-t border-sidebar-border"
      >
        <div 
          className="text-xs text-sidebar-foreground/60 space-y-1"
        >
          <p>Version 1.0.0</p>
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
  );
}
