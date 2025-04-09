'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ContentTheme = 'modern' | 'traditional';

interface ThemeContextType {
  contentTheme: ContentTheme;
  setContentTheme: (theme: ContentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider Component
 *
 * This component provides theme context to the application.
 * It manages the content theme state (modern or traditional).
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [contentTheme, setContentTheme] = useState<ContentTheme>('traditional');

  return (
    <ThemeContext.Provider value={{ contentTheme, setContentTheme }}>
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
