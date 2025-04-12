/**
 * Theme hook for the UB Ecosystem
 */

import { useContext } from 'react';
import { ThemeContext as ThemeContextType } from '../types';
import { ThemeReactContext } from '../components/ThemeProvider';

/**
 * Hook to use the theme context
 *
 * @returns The theme context
 * @throws Error if used outside of a ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeReactContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
