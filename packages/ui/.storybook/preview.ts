import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { withThemeProvider } from './preview-wrapper';

// Import our theme CSS
import '../src/styles/theme.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable Storybook backgrounds in favor of our theme system
    },
    layout: 'centered',
    themes: {
      default: 'dark',
      list: [
        { name: 'dark', class: 'dark-theme', color: '#121212' },
        { name: 'light', class: 'light-theme', color: '#ffffff' },
        { name: 'system', class: 'system-theme', color: '#888888' },
      ],
    },
  },
  decorators: [
    withThemeProvider,
    withThemeByClassName({
      themes: {
        dark: 'dark-theme',
        light: 'light-theme',
        system: 'system-theme',
      },
      defaultTheme: 'dark',
    }),
  ],
};

export default preview;
