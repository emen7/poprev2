'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UITheme = 'light' | 'dark';
export type ContentTheme = 'modern' | 'traditional';

interface ThemeContextType {
  uiTheme: UITheme;
  setUITheme: (theme: UITheme) => void;
  contentTheme: ContentTheme;
  setContentTheme: (theme: ContentTheme) => void;
  toggleUITheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialUITheme?: UITheme;
  initialContentTheme?: ContentTheme;
}

/**
 * Theme Provider Component
 *
 * This component provides theme context to the application.
 * It manages both UI theme (light/dark) and content theme (modern/traditional).
 */
export function ThemeProvider({
  children,
  initialUITheme = 'light',
  initialContentTheme = 'traditional',
}: ThemeProviderProps) {
  const [uiTheme, setUITheme] = useState<UITheme>(initialUITheme);
  const [contentTheme, setContentTheme] = useState<ContentTheme>(initialContentTheme);

  // Toggle between light and dark themes
  const toggleUITheme = () => {
    setUITheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${uiTheme}-theme`);
  }, [uiTheme]);

  return (
    <ThemeContext.Provider
      value={{ uiTheme, setUITheme, contentTheme, setContentTheme, toggleUITheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 *
 * This hook provides access to the theme context.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
