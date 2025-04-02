/**
 * useTheme Hook
 * 
 * This hook manages the theme state and provides functions to change the theme.
 */

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Hook for managing theme state
 * 
 * @param initialTheme Initial theme value
 * @returns Theme state and functions to change it
 */
export function useTheme(initialTheme: Theme = 'light') {
  // State for the theme
  const [theme, setTheme] = useState<Theme>(initialTheme);
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('reader-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('reader-theme', theme);
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return {
    theme,
    setTheme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };
}