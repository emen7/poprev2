# @ub-ecosystem/theme-system

Theme system for the UB Ecosystem, providing theming capabilities for reader applications.

## Features

- Theme definitions for light, dark, and traditional themes
- ThemeProvider component for React applications
- Theme hooks for easy theme access and switching
- Customizable theme components

## Installation

```bash
npm install @ub-ecosystem/theme-system
# or
yarn add @ub-ecosystem/theme-system
# or
pnpm add @ub-ecosystem/theme-system
```

## Usage

```tsx
import { ThemeProvider, useTheme } from '@ub-ecosystem/theme-system';
import { lightTheme } from '@ub-ecosystem/theme-system/themes';

// Wrap your application with ThemeProvider
const App = () => {
  return (
    <ThemeProvider initialTheme="light">
      <YourApp />
    </ThemeProvider>
  );
};

// Use theme hooks in components
const ThemedComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`themed-component ${theme}`}>
      <h1>Current theme: {theme}</h1>
      <button onClick={() => setTheme('dark')}>Switch to Dark</button>
      <button onClick={() => setTheme('light')}>Switch to Light</button>
      <button onClick={() => setTheme('traditional')}>Switch to Traditional</button>
    </div>
  );
};
```

## Architecture

The theme system is organized into the following modules:

- **themes**: Theme definitions and utilities
- **components**: Theme-related components
- **hooks**: Theme hooks for React applications
- **types**: TypeScript type definitions

## Development

```bash
# Build the package
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT
