import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import the theme CSS
import '../styles/theme.css';

// Define theme types
export type ThemeMode = 'dark' | 'light' | 'system';
export type TextAlignment = 'left' | 'justify' | 'right' | 'center';

// Define the context interface
interface ThemeContextType {
  /**
   * Current theme mode (dark, light, or system)
   */
  themeMode: ThemeMode;

  /**
   * Whether the current effective theme is dark
   * (either explicitly set to dark or system preference is dark)
   */
  isDarkTheme: boolean;

  /**
   * Current text alignment preference
   */
  textAlignment: TextAlignment;

  /**
   * Change the theme mode
   */
  setThemeMode: (mode: ThemeMode) => void;

  /**
   * Change the text alignment
   */
  setTextAlignment: (alignment: TextAlignment) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props for the ThemeProvider component
interface ThemeProviderProps {
  /**
   * Initial theme mode (defaults to dark)
   */
  initialThemeMode?: ThemeMode;

  /**
   * Initial text alignment (defaults to left)
   */
  initialTextAlignment?: TextAlignment;

  /**
   * Children components
   */
  children: ReactNode;
}

/**
 * ThemeProvider Component
 *
 * Provides theme context to all child components and manages theme state.
 * Automatically applies the appropriate CSS classes to the document body.
 * Uses dark mode as the default theme and left alignment as the default text alignment.
 * @param root0
 * @param root0.initialThemeMode
 * @param root0.initialTextAlignment
 * @param root0.children
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialThemeMode = 'dark',
  initialTextAlignment = 'left',
  children,
}) => {
  // Initialize state from localStorage if available, otherwise use props
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ub-theme-mode');
      return (savedTheme as ThemeMode) || initialThemeMode;
    }
    return initialThemeMode;
  });

  const [textAlignment, setTextAlignmentState] = useState<TextAlignment>(() => {
    if (typeof window !== 'undefined') {
      const savedAlignment = localStorage.getItem('ub-text-alignment');
      return (savedAlignment as TextAlignment) || initialTextAlignment;
    }
    return initialTextAlignment;
  });

  // Track whether the system preference is for dark mode
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Determine if the current effective theme is dark
  const isDarkTheme = themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);

  // Update theme mode and save to localStorage
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ub-theme-mode', mode);
    }
  };

  // Update text alignment and save to localStorage
  const setTextAlignment = (alignment: TextAlignment) => {
    setTextAlignmentState(alignment);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ub-text-alignment', alignment);
    }
  };

  // Listen for system color scheme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        setSystemPrefersDark(e.matches);
      };

      // Add listener for theme changes
      mediaQuery.addEventListener('change', handleChange);

      // Clean up listener
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);

  // Apply theme classes to body element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Remove all theme classes
      document.body.classList.remove('dark-theme', 'light-theme', 'system-theme');

      // Add the current theme class
      document.body.classList.add(`${themeMode}-theme`);

      // Remove all text alignment classes
      document.body.classList.remove('text-left', 'text-justify', 'text-right', 'text-center');

      // Add the current text alignment class
      document.body.classList.add(`text-${textAlignment}`);
    }
  }, [themeMode, textAlignment, systemPrefersDark]);

  // Provide the theme context to children
  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDarkTheme,
        textAlignment,
        setThemeMode,
        setTextAlignment,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use the theme context
 * @returns The theme context
 * @throws Error if used outside of a ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default ThemeProvider;
