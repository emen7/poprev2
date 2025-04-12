/**
 * Traditional theme for the UB Ecosystem
 */

import { Theme } from '../types';

/**
 * Traditional theme
 */
export const traditionalTheme: Theme = {
  name: 'traditional',
  colors: {
    primary: '#8b4513', // SaddleBrown
    secondary: '#556b2f', // DarkOliveGreen
    background: '#f5f5dc', // Beige
    surface: '#f8f8ff', // GhostWhite
    text: '#2f4f4f', // DarkSlateGray
    accent: '#800000', // Maroon
    error: '#8b0000', // DarkRed
    warning: '#cd853f', // Peru
    success: '#2e8b57', // SeaGreen
    info: '#4682b4', // SteelBlue
    disabled: '#a9a9a9', // DarkGray
    border: '#d2b48c', // Tan
    divider: '#deb887', // BurlyWood
    highlight: {
      default: 'rgba(139, 69, 19, 0.2)', // SaddleBrown with opacity
      yellow: 'rgba(218, 165, 32, 0.3)', // GoldenRod with opacity
      green: 'rgba(85, 107, 47, 0.2)', // DarkOliveGreen with opacity
      blue: 'rgba(70, 130, 180, 0.2)', // SteelBlue with opacity
      pink: 'rgba(188, 143, 143, 0.3)', // RosyBrown with opacity
    },
  },
  typography: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
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
      sm: 1.3,
      md: 1.6,
      lg: 1.8,
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
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 3px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    pill: '9999px',
    circle: '50%',
  },
};
