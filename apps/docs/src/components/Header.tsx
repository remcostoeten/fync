import { Github, ExternalLink, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { githubApiData } from '../data/github-api';
import { spotifyApiData } from '../data/spotify-api';
import type { TSearchResult } from '../types';

type TProps = {
  onResultClick: (result: TSearchResult) => void;
}

export function Header({ onResultClick }: TProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { query, setQuery, results } = useSearch([...githubApiData, ...spotifyApiData]);

  function handleSearchClose() {
    setQuery('');
    setIsSearchOpen(false);
  }

  function handleResultClick(result: TSearchResult) {
    onResultClick(result);
    handleSearchClose();
  }

  function handleSearchToggle() {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the input after animation completes
      setTimeout(() => {
        const input = document.getElementById('search-input');
        input?.focus();
      }, 200);
    } else {
      setQuery('');
    }
  }

  return (
    <header
      className="bg-background border-b border-border"
    >
      <div
        className="lg:ml-64 px-4 sm:px-6 lg:px-8"
      >
        <div
          className="flex items-center justify-between h-16"
        >
          {/* Mobile Logo - Only shown on mobile when sidebar is hidden */}
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

          {/* Center - Search Bar (Desktop) */}
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
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                />
              </div>
              
              {/* Desktop Search Results */}
              {query && results.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-[60]"
                >
                  {results.slice(0, 8).map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left px-4 py-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                    >
                      <div
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                            <div
                              className="font-medium text-foreground truncate flex items-center space-x-2"
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  result.type === 'method' ? 'bg-blue-400' :
                                  result.type === 'example' ? 'bg-green-400' :
                                  'bg-purple-400'
                                }`}
                              />
                              <span>{result.title}</span>
                            </div>
                            <div
                              className="text-sm text-muted-foreground mt-1 truncate"
                            >
                              {result.description}
                            </div>
                            <div
                              className="text-xs text-muted-foreground/70 mt-1"
                            >
                              {result.category}
                            </div>
                          </div>
                          <div
                            className="flex items-center space-x-2 ml-4 flex-shrink-0"
                          >
                            <span
                              className={`text-xs px-2 py-1 rounded font-medium ${
                                result.type === 'method' ? 'bg-blue-400/20 text-blue-400' :
                                result.type === 'example' ? 'bg-green-400/20 text-green-400' :
                                'bg-purple-400/20 text-purple-400'
                              }`}
                            >
                              {result.type}
                            </span>
                          </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Actions */}
          <div
            className="flex items-center space-x-2"
          >
            {/* Mobile Search Toggle */}
            <button
              onClick={handleSearchToggle}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-muted/50 transition-colors"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* GitHub Link */}
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

        {/* Mobile Search Overlay */}
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
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Mobile Search Results */}
              {query && results.length > 0 && (
                <div
                  className="mt-3 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto"
                >
                  {results.slice(0, 6).map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left px-4 py-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                    >
                      <div
                        className="space-y-1"
                      >
                        <div
                          className="font-medium text-foreground"
                        >
                          {result.title}
                        </div>
                        <div
                          className="text-sm text-muted-foreground line-clamp-2"
                        >
                          {result.description}
                        </div>
                        <div
                          className="flex items-center space-x-2"
                        >
                          <span
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              result.type === 'method' ? 'bg-blue-400/20 text-blue-400' :
                              result.type === 'example' ? 'bg-green-400/20 text-green-400' :
                              'bg-purple-400/20 text-purple-400'
                            }`}
                          >
                            {result.type}
                          </span>
                          <span
                            className="text-xs text-muted-foreground"
                          >
                            {result.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}