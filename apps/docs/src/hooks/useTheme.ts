import { useState, useEffect } from 'react';

export function useTheme() {
  // Always use dark theme
  const [theme] = useState<'dark'>('dark');

  useEffect(() => {
    // Force dark theme on mount
    document.documentElement.classList.add('dark');
    localStorage.setItem('fync-theme', 'dark');
  }, []);

  // No-op toggle function since we only support dark theme
  function toggleTheme() {
    // Dark theme only - no toggle functionality
  }

  return { theme, toggleTheme };
}