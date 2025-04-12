/**
 * Theme provider component for the UB Ecosystem
 */

import React, { createContext, useState, useCallback, useMemo } from 'react';
import { ThemeContext as ThemeContextType, ThemeProviderProps, ThemeType, Theme } from '../types';
import { getThemeByName, defaultTheme } from '../themes';

/**
 * Theme React context
 */
export const ThemeReactContext = createContext<ThemeContextType | null>(null);

/**
 * Theme provider component
 *
 * @param props - The component props
 * @returns The theme provider component
 */
export function ThemeProvider({
  initialTheme = defaultTheme,
  children,
}: ThemeProviderProps): JSX.Element {
  // State for the current theme
  const [theme, setThemeState] = useState<ThemeType>(initialTheme);

  // Get the theme object
  const themeObject = useMemo(() => getThemeByName(theme), [theme]);

  // Set theme handler
  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
  }, []);

  // Toggle theme handler
  const toggleTheme = useCallback(() => {
    setThemeState(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Create context value
  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      themeObject,
      setTheme,
      toggleTheme,
    }),
    [theme, themeObject, setTheme, toggleTheme]
  );

  return <ThemeReactContext.Provider value={contextValue}>{children}</ThemeReactContext.Provider>;
}
