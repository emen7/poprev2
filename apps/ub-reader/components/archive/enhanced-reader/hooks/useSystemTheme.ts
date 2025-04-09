/**
 * System Theme Hook
 * 
 * This hook detects the system theme preference (light or dark).
 */

'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Use System Theme Hook
 * 
 * @returns The current system theme preference ('light' or 'dark')
 */
export function useSystemTheme(): Theme {
  const [systemTheme, setSystemTheme] = useState<Theme>('light');
  
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return;
    }
    
    // Check if user prefers dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Create event handler
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return systemTheme;
}