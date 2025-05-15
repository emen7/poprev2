/**
 * Theme Components
 *
 * This module exports all theme-related components and utilities.
 */

// Legacy theme components (to be deprecated)
export { default as ThemeToggle } from './ThemeToggle';
export type { ThemeToggleProps, ThemeOption } from './ThemeToggle';

export { default as ReaderThemeProvider, useReaderTheme } from './ReaderThemeProvider';
export type {
  ReaderThemeProviderProps,
  ThemeContextType,
  UITheme,
  ContentTheme,
} from './ReaderThemeProvider';

// New theme system (preferred)
export { ThemeProvider, useTheme } from '../contexts/ThemeContext';
export type { ThemeMode, TextAlignment } from '../contexts/ThemeContext';

// New theme components
export { default as EnhancedThemeToggle } from '../components/ThemeToggle';
export { default as TextAlignmentToggle } from '../components/TextAlignmentToggle';
export { default as ThemeSettings } from '../components/ThemeSettings';
