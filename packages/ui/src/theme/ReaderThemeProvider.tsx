import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import './ReaderThemeProvider.css';

// Define the available themes
export type UITheme = 'light' | 'dark' | 'sepia' | 'system';
export type ContentTheme = 'modern' | 'traditional';

export interface ThemeContextType {
  /**
   * The current UI theme (light, dark, sepia, system)
   */
  uiTheme: UITheme;

  /**
   * The current content theme (modern, traditional)
   */
  contentTheme: ContentTheme;

  /**
   * Function to change the UI theme
   */
  setUITheme: (theme: UITheme) => void;

  /**
   * Function to change the content theme
   */
  setContentTheme: (theme: ContentTheme) => void;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ReaderThemeProviderProps {
  /**
   * The children to render within the theme provider
   */
  children: ReactNode;

  /**
   * The initial UI theme
   * @default 'light'
   */
  initialUITheme?: UITheme;

  /**
   * The initial content theme
   * @default 'modern'
   */
  initialContentTheme?: ContentTheme;

  /**
   * Whether to store theme preferences in localStorage
   * @default true
   */
  persistTheme?: boolean;

  /**
   * The localStorage key for the UI theme
   * @default 'ub-reader-ui-theme'
   */
  uiThemeStorageKey?: string;

  /**
   * The localStorage key for the content theme
   * @default 'ub-reader-content-theme'
   */
  contentThemeStorageKey?: string;
}

/**
 * ReaderThemeProvider Component
 *
 * A context provider for managing UI and content themes in the UB Reader.
 * Supports light, dark, and sepia UI themes, and modern and traditional content themes.
 * @param root0
 * @param root0.children
 * @param root0.initialUITheme
 * @param root0.initialContentTheme
 * @param root0.persistTheme
 * @param root0.uiThemeStorageKey
 * @param root0.contentThemeStorageKey
 * @returns A theme provider component
 */
export function ReaderThemeProvider({
  children,
  initialUITheme = 'light',
  initialContentTheme = 'modern',
  persistTheme = true,
  uiThemeStorageKey = 'ub-reader-ui-theme',
  contentThemeStorageKey = 'ub-reader-content-theme',
}: ReaderThemeProviderProps) {
  // Initialize state with stored values or defaults
  const [uiTheme, setUIThemeState] = useState<UITheme>(() => {
    if (persistTheme && typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(uiThemeStorageKey) as UITheme | null;
      return storedTheme || initialUITheme;
    }
    return initialUITheme;
  });

  const [contentTheme, setContentThemeState] = useState<ContentTheme>(() => {
    if (persistTheme && typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(contentThemeStorageKey) as ContentTheme | null;
      return storedTheme || initialContentTheme;
    }
    return initialContentTheme;
  });

  // Update UI theme and store in localStorage if persistTheme is true
  const setUITheme = (theme: UITheme) => {
    setUIThemeState(theme);
    if (persistTheme && typeof window !== 'undefined') {
      localStorage.setItem(uiThemeStorageKey, theme);
    }
  };

  // Update content theme and store in localStorage if persistTheme is true
  const setContentTheme = (theme: ContentTheme) => {
    setContentThemeState(theme);
    if (persistTheme && typeof window !== 'undefined') {
      localStorage.setItem(contentThemeStorageKey, theme);
    }
  };

  // Apply the theme classes to the document element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Remove all theme classes
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
      document.documentElement.classList.remove('content-modern', 'content-traditional');

      // Add the current theme classes
      document.documentElement.classList.add(`theme-${uiTheme}`);
      document.documentElement.classList.add(`content-${contentTheme}`);
    }
  }, [uiTheme, contentTheme]);

  // Create the context value
  const contextValue: ThemeContextType = {
    uiTheme,
    contentTheme,
    setUITheme,
    setContentTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`reader-theme-provider theme-${uiTheme} content-${contentTheme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use the theme context
 * @returns The theme context
 * @throws Error if used outside of a ReaderThemeProvider
 */
export function useReaderTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useReaderTheme must be used within a ReaderThemeProvider');
  }
  return context;
}

export default ReaderThemeProvider;
