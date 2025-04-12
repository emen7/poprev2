/**
 * Theme exports for the UB Ecosystem
 */

import { lightTheme } from './light';
import { darkTheme } from './dark';
import { traditionalTheme } from './traditional';
import { Theme, ThemeType } from '../types';

// Export themes
export { lightTheme, darkTheme, traditionalTheme };

/**
 * Get theme by name
 */
export function getThemeByName(name: ThemeType): Theme {
  switch (name) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'traditional':
      return traditionalTheme;
    default:
      // Default to light theme if not found
      console.warn(`Theme "${name}" not found, using light theme as fallback.`);
      return lightTheme;
  }
}

/**
 * Available themes
 */
export const availableThemes: ThemeType[] = ['light', 'dark', 'traditional'];

/**
 * Default theme
 */
export const defaultTheme: ThemeType = 'light';
