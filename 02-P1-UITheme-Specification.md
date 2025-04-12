# 02-P1-UITheme: System Specification

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: UI Theme System

## 1. Overview

The UI Theme System provides a consistent visual styling framework for the entire UB Ecosystem. It manages theme preferences (light/dark mode), color palettes, typography, spacing, and other visual aspects of the user interface. This system is separate from the Content Format system, which handles how the actual UB content is displayed.

## 2. Directory Structure

```
packages/
└── ui-theme/
    ├── themes/             # Theme definitions
    │   ├── light.ts        # Light theme
    │   ├── dark.ts         # Dark theme
    │   └── custom.ts       # Custom theme utilities
    ├── components/         # Theme components
    │   ├── ThemeProvider/  # Theme provider component
    │   └── ThemeToggle/    # Theme toggle component
    ├── hooks/              # Theme hooks
    │   ├── useUITheme.ts   # Main theme hook
    │   └── useThemeDetector.ts # System theme detection
    ├── styles/             # Style utilities
    │   ├── colors.ts       # Color utilities
    │   ├── typography.ts   # Typography utilities
    │   └── spacing.ts      # Spacing utilities
    ├── storage/            # Theme persistence
    │   └── themeStorage.ts # Local storage utilities
    └── index.ts            # Public API exports
```

## 3. Component Specifications

### 3.1 Theme Definitions

The theme definitions provide the core visual properties for each theme.

#### 3.1.1 Key Interfaces

```typescript
interface UITheme {
  id: string;
  name: string;
  type: 'light' | 'dark' | 'custom';
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  borderRadius: BorderRadius;
  transitions: Transitions;
}

interface ColorPalette {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // Accent colors
  accent: string;
  accentLight: string;
  accentDark: string;

  // Background colors
  background: string;
  backgroundAlt: string;
  backgroundElevated: string;

  // Text colors
  text: string;
  textSecondary: string;
  textDisabled: string;

  // UI element colors
  border: string;
  divider: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Highlighting colors
  highlight1: string; // Cyan
  highlight2: string; // Pink
  highlight3: string; // Orange
  highlight4: string; // Green
  highlight5: string; // Purple
}

interface Typography {
  fontFamily: {
    base: string;
    heading: string;
    monospace: string;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

interface Spacing {
  unit: number; // Base unit in pixels
  xs: string; // 0.25 * unit
  sm: string; // 0.5 * unit
  md: string; // 1 * unit
  lg: string; // 1.5 * unit
  xl: string; // 2 * unit
  xxl: string; // 3 * unit
}

interface Shadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

interface Transitions {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  timing: {
    ease: string;
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}
```

#### 3.1.2 Default Themes

```typescript
// Light theme
const lightTheme: UITheme = {
  id: 'light',
  name: 'Light',
  type: 'light',
  colors: {
    primary: '#2563eb', // Blue
    primaryLight: '#60a5fa',
    primaryDark: '#1d4ed8',

    secondary: '#4b5563', // Gray
    secondaryLight: '#9ca3af',
    secondaryDark: '#374151',

    accent: '#8b5cf6', // Purple
    accentLight: '#a78bfa',
    accentDark: '#7c3aed',

    background: '#ffffff',
    backgroundAlt: '#f9fafb',
    backgroundElevated: '#f3f4f6',

    text: '#111827',
    textSecondary: '#4b5563',
    textDisabled: '#9ca3af',

    border: '#e5e7eb',
    divider: '#d1d5db',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    highlight1: '#06b6d4', // Cyan
    highlight2: '#ec4899', // Pink
    highlight3: '#f97316', // Orange
    highlight4: '#22c55e', // Green
    highlight5: '#a855f7', // Purple
  },
  // ... other properties
};

// Dark theme
const darkTheme: UITheme = {
  id: 'dark',
  name: 'Dark',
  type: 'dark',
  colors: {
    primary: '#3b82f6', // Blue
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',

    secondary: '#9ca3af', // Gray
    secondaryLight: '#d1d5db',
    secondaryDark: '#6b7280',

    accent: '#a78bfa', // Purple
    accentLight: '#c4b5fd',
    accentDark: '#8b5cf6',

    background: '#111827',
    backgroundAlt: '#1f2937',
    backgroundElevated: '#374151',

    text: '#f9fafb',
    textSecondary: '#e5e7eb',
    textDisabled: '#9ca3af',

    border: '#4b5563',
    divider: '#6b7280',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    highlight1: '#22d3ee', // Cyan
    highlight2: '#f472b6', // Pink
    highlight3: '#fb923c', // Orange
    highlight4: '#4ade80', // Green
    highlight5: '#c084fc', // Purple
  },
  // ... other properties
};
```

### 3.2 Theme Provider

The Theme Provider is a React component that provides the current theme to all child components.

#### 3.2.1 Component Interface

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
  customTheme?: UITheme;
}

function ThemeProvider({
  children,
  initialTheme = 'system',
  customTheme,
}: ThemeProviderProps): JSX.Element;
```

#### 3.2.2 Theme Context

```typescript
interface ThemeContextValue {
  theme: UITheme;
  themeType: 'light' | 'dark' | 'custom';
  setTheme: (theme: 'light' | 'dark' | 'system' | UITheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);
```

### 3.3 Theme Hooks

#### 3.3.1 useUITheme Hook

```typescript
function useUITheme(): ThemeContextValue;
```

#### 3.3.2 useThemeDetector Hook

```typescript
function useThemeDetector(): {
  isDarkMode: boolean;
  isSystemDarkMode: boolean;
  systemThemeChanged: boolean;
};
```

### 3.4 Style Utilities

#### 3.4.1 Color Utilities

```typescript
// Get a color from the current theme
function getColor(color: keyof ColorPalette): string;

// Adjust color opacity
function withOpacity(color: string, opacity: number): string;

// Lighten or darken a color
function adjustColor(color: string, amount: number): string;

// Check if a color is light or dark
function isLightColor(color: string): boolean;

// Get contrasting text color (black or white)
function getContrastColor(backgroundColor: string): string;
```

#### 3.4.2 Typography Utilities

```typescript
// Get font size
function getFontSize(size: keyof Typography['fontSize']): string;

// Get font weight
function getFontWeight(weight: keyof Typography['fontWeight']): number;

// Get line height
function getLineHeight(height: keyof Typography['lineHeight']): number;

// Get font family
function getFontFamily(family: keyof Typography['fontFamily']): string;
```

#### 3.4.3 Spacing Utilities

```typescript
// Get spacing value
function getSpacing(size: keyof Spacing): string;

// Get multiple spacing values
function getSpacingMultiple(size: keyof Spacing, multiplier: number): string;
```

### 3.5 Theme Storage

```typescript
// Save theme preference to localStorage
function saveThemePreference(preference: 'light' | 'dark' | 'system'): void;

// Get theme preference from localStorage
function getThemePreference(): 'light' | 'dark' | 'system';

// Save custom theme to localStorage
function saveCustomTheme(theme: UITheme): void;

// Get custom theme from localStorage
function getCustomTheme(): UITheme | null;
```

## 4. Implementation Guidelines

### 4.1 CSS-in-JS Strategy

The UI Theme system will use a CSS-in-JS approach for styling components. We recommend using either:

1. **Emotion**: For its performance and flexibility
2. **Styled Components**: For its familiar API and strong community support

Example with Emotion:

```typescript
import { css } from '@emotion/react';

function Button({ children, variant = 'primary' }) {
  const { theme } = useUITheme();

  const buttonStyles = css`
    background-color: ${variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
    color: ${theme.colors.text};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    font-family: ${theme.typography.fontFamily.base};
    font-size: ${theme.typography.fontSize.md};
    transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};

    &:hover {
      background-color: ${variant === 'primary'
        ? theme.colors.primaryDark
        : theme.colors.secondaryDark};
    }
  `;

  return <button css={buttonStyles}>{children}</button>;
}
```

### 4.2 Theme Switching

Theme switching should be smooth and non-disruptive to the user experience:

1. Use CSS transitions for smooth theme changes
2. Avoid layout shifts when switching themes
3. Persist theme preference in localStorage
4. Respect user's system preference by default

### 4.3 Accessibility Considerations

1. Ensure sufficient color contrast (WCAG AA compliance at minimum)
2. Provide focus indicators for keyboard navigation
3. Support reduced motion preferences
4. Test with screen readers and keyboard navigation

### 4.4 Performance Optimization

1. Memoize theme values to prevent unnecessary re-renders
2. Use CSS variables for dynamic theme properties
3. Avoid theme recalculations during animations
4. Lazy-load theme assets when possible

## 5. Dependencies

- React 18+
- TypeScript 4.9+
- Emotion or Styled Components
- Color manipulation library (e.g., color2k, polished)

## 6. Testing Strategy

1. **Unit Tests**: Test individual theme utilities and hooks
2. **Component Tests**: Test theme provider and consumers
3. **Visual Tests**: Use Storybook for visual regression testing
4. **Accessibility Tests**: Test color contrast and keyboard navigation

## 7. Next Steps

1. Create the directory structure
2. Define the theme interfaces
3. Implement light and dark themes
4. Create the ThemeProvider component
5. Develop theme hooks and utilities
6. Implement theme persistence
7. Create documentation and examples
