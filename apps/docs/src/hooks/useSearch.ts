import { useState, useMemo } from 'react';
import type { TSearchResult, TApiSection } from '../types';

export function useSearch(data: TApiSection[]) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const searchResults: TSearchResult[] = [];

    data.forEach(section => {
      if (section.title.toLowerCase().includes(searchTerm) || 
          section.description.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: section.id,
          title: section.title,
          description: section.description,
          type: 'section',
          href: `#${section.id}`,
          category: section.title
        });
      }

      section.methods.forEach(method => {
        if (method.name.toLowerCase().includes(searchTerm) || 
            method.description.toLowerCase().includes(searchTerm)) {
          searchResults.push({
            id: method.id,
            title: method.name,
            description: method.description,
            type: 'method',
            href: `#${method.id}`,
            category: section.title
          });
        }

        method.examples.forEach(example => {
          if (example.title.toLowerCase().includes(searchTerm) || 
              example.description.toLowerCase().includes(searchTerm) ||
              example.code.toLowerCase().includes(searchTerm)) {
            searchResults.push({
              id: example.id,
              title: example.title,
              description: example.description,
              type: 'example',
              href: `#${example.id}`,
              category: section.title
            });
          }
        });
      });
    });

    return searchResults;
  }, [query, data]);

  return { query, setQuery, results };
}