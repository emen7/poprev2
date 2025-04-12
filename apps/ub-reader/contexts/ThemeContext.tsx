'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UITheme = 'light' | 'dark';
export type ContentTheme = 'modern' | 'traditional';

interface ThemeContextType {
  uiTheme: UITheme;
  setUITheme: (theme: UITheme) => void;
  contentTheme: ContentTheme;
  setContentTheme: (theme: ContentTheme) => void;
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
 * It manages the content theme state (modern or traditional).
 */
export function ThemeProvider({
  children,
  initialUITheme = 'light',
  initialContentTheme = 'traditional',
}: ThemeProviderProps) {
  const [uiTheme, setUITheme] = useState<UITheme>(initialUITheme);
  const [contentTheme, setContentTheme] = useState<ContentTheme>(initialContentTheme);

  return (
    <ThemeContext.Provider value={{ uiTheme, setUITheme, contentTheme, setContentTheme }}>
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
