/**
 * Dark theme for the UB Ecosystem
 */

import { Theme } from '../types';

/**
 * Dark theme
 */
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#90caf9',
    secondary: '#f48fb1',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    accent: '#4fc3f7',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#2196f3',
    disabled: '#757575',
    border: '#424242',
    divider: '#424242',
    highlight: {
      default: 'rgba(144, 202, 249, 0.2)',
      yellow: 'rgba(255, 235, 59, 0.3)',
      green: 'rgba(76, 175, 80, 0.2)',
      blue: 'rgba(33, 150, 243, 0.2)',
      pink: 'rgba(233, 30, 99, 0.2)',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      sm: 1.25,
      md: 1.5,
      lg: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  transitions: {
    short: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    medium: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    long: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.36)',
    md: '0 3px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.24)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    pill: '9999px',
    circle: '50%',
  },
};
