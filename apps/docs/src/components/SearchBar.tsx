import { Search, X } from 'lucide-react';
import type { TSearchResult } from '../types';

type TProps = {
  query: string;
  onQueryChange: (query: string) => void;
  results: TSearchResult[];
  isOpen: boolean;
  onResultClick: (result: TSearchResult) => void;
  onClose: () => void;
}

export function SearchBar({ query, onQueryChange, results, isOpen, onResultClick, onClose }: TProps) {
  return (
    <div className="relative">
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        >
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search API methods, examples..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        {query && (
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-[60]"
        >
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => onResultClick(result)}
              className="w-full text-left px-4 py-3 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {result.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {result.description}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    {result.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {result.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}