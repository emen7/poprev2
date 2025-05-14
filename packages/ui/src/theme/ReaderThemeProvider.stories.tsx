import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ReaderThemeProvider, useReaderTheme } from './ReaderThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ReaderThemeProvider> = {
  title: 'Core/Theme/ReaderThemeProvider',
  component: ReaderThemeProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialUITheme: {
      control: 'select',
      options: ['light', 'dark', 'sepia'],
      description: 'The initial UI theme',
    },
    initialContentTheme: {
      control: 'select',
      options: ['modern', 'traditional'],
      description: 'The initial content theme',
    },
    persistTheme: {
      control: 'boolean',
      description: 'Whether to store theme preferences in localStorage',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReaderThemeProvider>;

// Sample content to demonstrate the theme
const ThemeDemo = () => {
  const { uiTheme, contentTheme, setUITheme, setContentTheme } = useReaderTheme();

  // UI theme options
  const uiThemeOptions = [
    { id: 'light', label: 'Light', color: '#ffffff' },
    { id: 'dark', label: 'Dark', color: '#1a1a1a' },
    { id: 'sepia', label: 'Sepia', color: '#f4ecd8' },
  ];

  // Content theme options
  const contentThemeOptions = [
    { id: 'modern', label: 'Modern', color: '#0088ff' },
    { id: 'traditional', label: 'Traditional', color: '#947a62' },
  ];

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1>Reader Theme Provider Demo</h1>
      <p>
        This demonstrates the ReaderThemeProvider component. Use the theme toggles below to switch
        between different UI and content themes.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <h2>UI Theme</h2>
        <ThemeToggle
          themes={uiThemeOptions}
          currentTheme={uiTheme}
          onChange={theme => setUITheme(theme as 'light' | 'dark' | 'sepia')}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Content Theme</h2>
        <ThemeToggle
          themes={contentThemeOptions}
          currentTheme={contentTheme}
          onChange={theme => setContentTheme(theme as 'modern' | 'traditional')}
        />
      </div>

      <div style={{ marginTop: '2rem', padding: '20px', border: '1px solid var(--border-color)' }}>
        <h2>Sample Content</h2>
        <p>
          This is sample content to demonstrate how the theme affects the appearance of text and
          other elements. The UI theme controls the background color, text color, and other UI
          elements, while the content theme controls the typography and spacing.
        </p>
        <h3>Section Title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
          ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
          euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis
          nisl.
        </p>
        <p>
          <a href="#">This is a link</a> that demonstrates how links appear in different themes.
        </p>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-color)' }}>
        <p>
          Current theme: UI: <strong>{uiTheme}</strong>, Content: <strong>{contentTheme}</strong>
        </p>
      </div>
    </div>
  );
};

// Basic story with default props
export const Default: Story = {
  render: args => (
    <ReaderThemeProvider {...args}>
      <ThemeDemo />
    </ReaderThemeProvider>
  ),
  args: {
    initialUITheme: 'light',
    initialContentTheme: 'modern',
    persistTheme: false,
  },
};

// Story with dark theme
export const DarkTheme: Story = {
  render: args => (
    <ReaderThemeProvider {...args}>
      <ThemeDemo />
    </ReaderThemeProvider>
  ),
  args: {
    ...Default.args,
    initialUITheme: 'dark',
  },
};

// Story with sepia theme
export const SepiaTheme: Story = {
  render: args => (
    <ReaderThemeProvider {...args}>
      <ThemeDemo />
    </ReaderThemeProvider>
  ),
  args: {
    ...Default.args,
    initialUITheme: 'sepia',
  },
};

// Story with traditional content theme
export const TraditionalContentTheme: Story = {
  render: args => (
    <ReaderThemeProvider {...args}>
      <ThemeDemo />
    </ReaderThemeProvider>
  ),
  args: {
    ...Default.args,
    initialContentTheme: 'traditional',
  },
};

