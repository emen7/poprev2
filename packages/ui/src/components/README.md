# UB Reader Theme Components

This directory contains components for managing the theme and appearance of the UB Reader application.

## Components

### ThemeToggle

A component for switching between different themes (dark, light, system).

```tsx
import { ThemeToggle } from '@ub-ecosystem/ui';

<ThemeToggle showLabels={true} showSystemOption={true} />;
```

#### Props

- `showLabels` (boolean, default: true): Whether to show labels next to icons
- `showSystemOption` (boolean, default: true): Whether to show the system theme option
- `className` (string, optional): Additional CSS class name

### TextAlignmentToggle

A component for switching between different text alignment options (left, justify, right, center).

```tsx
import { TextAlignmentToggle } from '@ub-ecosystem/ui';

<TextAlignmentToggle showLabels={true} options={['left', 'justify', 'right']} />;
```

#### Props

- `showLabels` (boolean, default: true): Whether to show labels next to icons
- `options` (array, default: ['left', 'justify', 'right']): Which alignment options to show
- `className` (string, optional): Additional CSS class name

### ThemeSettings

A component that combines theme and text alignment controls.

```tsx
import { ThemeSettings } from '@ub-ecosystem/ui';

<ThemeSettings
  showLabels={true}
  showSystemOption={true}
  alignmentOptions={['left', 'justify', 'right']}
  showThemeToggle={true}
  showAlignmentToggle={true}
/>;
```

#### Props

- `showLabels` (boolean, default: true): Whether to show labels next to icons
- `showSystemOption` (boolean, default: true): Whether to show the system theme option
- `alignmentOptions` (array, default: ['left', 'justify', 'right']): Which alignment options to show
- `showThemeToggle` (boolean, default: true): Whether to show the theme toggle
- `showAlignmentToggle` (boolean, default: true): Whether to show the text alignment toggle
- `className` (string, optional): Additional CSS class name

## Theme Context

The theme components use the `ThemeContext` to manage theme state. You can access the theme context using the `useTheme` hook:

```tsx
import { useTheme } from '@ub-ecosystem/ui';

function MyComponent() {
  const { themeMode, isDarkTheme, textAlignment, setThemeMode, setTextAlignment } = useTheme();

  return (
    <div>
      <p>Current theme: {themeMode}</p>
      <p>Is dark theme: {isDarkTheme ? 'Yes' : 'No'}</p>
      <p>Text alignment: {textAlignment}</p>
      <button onClick={() => setThemeMode('dark')}>Set Dark Theme</button>
      <button onClick={() => setTextAlignment('justify')}>Set Justify Alignment</button>
    </div>
  );
}
```

## Theme Provider

To use the theme components, you need to wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@ub-ecosystem/ui';

function App() {
  return (
    <ThemeProvider initialThemeMode="dark" initialTextAlignment="left">
      <YourApp />
    </ThemeProvider>
  );
}
```

## CSS Variables

The theme system uses CSS variables to define colors, typography, and other design tokens. These variables are defined in `src/styles/theme.css`.

### Dark Theme (Default)

The dark theme uses a warmish off-white text color (#f0f0e8) on a dark background (#1a1a1a) to reduce eye strain. It avoids pure black and white for better readability.

### Light Theme

The light theme uses a dark text color (#212121) on a light background (#ffffff) for high contrast.

### System Theme

The system theme follows the user's system preferences, switching between light and dark themes automatically.

## Responsive Typography

The theme system includes responsive typography that automatically switches between serif fonts on desktop and sans-serif fonts on mobile:

- Desktop: Georgia, 'Times New Roman', Times, serif
- Mobile (< 768px): System fonts (San Francisco, Segoe UI, etc.)

## Text Alignment

The theme system supports the following text alignment options:

- Left (default)
- Justify
- Right
- Center (optional)
