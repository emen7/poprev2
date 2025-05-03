'use client';

import type { ReactNode } from &apos;react';
import { createContext, useContext, useState, useEffect } from &apos;react';
import '../styles/themes/global.css';

export type UITheme = &apos;light' | &apos;dark' | &apos;high-contrast';
export type ContentTheme = &apos;modern' | &apos;traditional';

interface ThemeContextType {
  uiTheme: UITheme;
  setUITheme: (theme: UITheme) => void;
  contentTheme: ContentTheme;
  setContentTheme: (theme: ContentTheme) => void;
  toggleUITheme: () => void;
  isThemeTransitioning: boolean;
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
 * It also handles theme transitions and persistence.
 */
export function ThemeProvider({
  children,
  initialUITheme = &apos;light',
  initialContentTheme = &apos;traditional',
}: ThemeProviderProps) {
  // Try to load theme from localStorage
  const getSavedTheme = (): UITheme => {
    if (typeof window === &apos;undefined') return initialUITheme;

    const savedTheme = localStorage.getItem('ub-reader-ui-theme');
    if (
      savedTheme &&
      (savedTheme === &apos;light' || savedTheme === &apos;dark' || savedTheme === &apos;high-contrast')
    ) {
      return savedTheme;
    }
    return initialUITheme;
  };

  const [uiTheme, setUITheme] = useState<UITheme>(getSavedTheme());
  const [contentTheme, setContentTheme] = useState<ContentTheme>(initialContentTheme);
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

  // Toggle between light and dark themes
  const toggleUITheme = () => {
    setUITheme(prevTheme => {
      if (prevTheme === &apos;light') return &apos;dark';
      if (prevTheme === &apos;dark') return &apos;light';
      return &apos;light'; // Default fallback
    });
  };

  // Handle theme change with transition
  const handleThemeChange = (newTheme: UITheme) => {
    setIsThemeTransitioning(true);
    setUITheme(newTheme);

    // Save theme preference to localStorage
    if (typeof window !== &apos;undefined') {
      localStorage.setItem('ub-reader-ui-theme', newTheme);
    }

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsThemeTransitioning(false);
    }, 300); // Match this with CSS transition duration
  };

  // Apply theme class to body and handle theme changes
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('light-theme', &apos;dark-theme', &apos;high-contrast-theme');

    // Add current theme class
    document.body.classList.add(`${_uiTheme}-theme`);

    // Add transition class if transitioning
    if (isThemeTransitioning) {
      document.body.classList.add('theme-transitioning');
    } else {
      document.body.classList.remove('theme-transitioning');
    }
  }, [uiTheme, isThemeTransitioning]);

  // Override setUITheme to include transition
  const setUIThemeWithTransition = (theme: UITheme) => {
    handleThemeChange(theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        _uiTheme,
        setUITheme: setUIThemeWithTransition,
        contentTheme,
        setContentTheme,
        toggleUITheme,
        isThemeTransitioning,
      }}
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
