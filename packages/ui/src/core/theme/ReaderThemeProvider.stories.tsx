import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ReaderThemeProvider, useReaderTheme } from './ReaderThemeProvider';

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
      options: ['light', 'dark', 'sepia', 'system'],
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

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1>Reader Theme Provider Demo</h1>
      <p>
        This demonstrates the ReaderThemeProvider component. Use the theme toggles below to switch
        between different UI and content themes.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <h2>UI Theme</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setUITheme('light')}
            style={{
              padding: '10px 20px',
              backgroundColor: uiTheme === 'light' ? 'var(--accent-color)' : 'var(--bg-color)',
              color: uiTheme === 'light' ? 'white' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Light
          </button>
          <button
            onClick={() => setUITheme('dark')}
            style={{
              padding: '10px 20px',
              backgroundColor: uiTheme === 'dark' ? 'var(--accent-color)' : 'var(--bg-color)',
              color: uiTheme === 'dark' ? 'white' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Dark
          </button>
          <button
            onClick={() => setUITheme('sepia')}
            style={{
              padding: '10px 20px',
              backgroundColor: uiTheme === 'sepia' ? 'var(--accent-color)' : 'var(--bg-color)',
              color: uiTheme === 'sepia' ? 'white' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Sepia
          </button>
          <button
            onClick={() => setUITheme('system')}
            style={{
              padding: '10px 20px',
              backgroundColor: uiTheme === 'system' ? 'var(--accent-color)' : 'var(--bg-color)',
              color: uiTheme === 'system' ? 'white' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            System
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Content Theme</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setContentTheme('modern')}
            style={{
              padding: '10px 20px',
              backgroundColor: contentTheme === 'modern' ? 'var(--accent-color)' : 'var(--bg-color)',
              color: contentTheme === 'modern' ? 'white' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Modern
          </button>
          <button
            onClick={() => setContentTheme('traditional')}
            style={{
              padding: '10px 20px',
              backgroundColor:
                contentTheme === 'traditional' ? 'var(--accent-color)' : 'var(--bg-color)',
              color: contentTheme === 'traditional' ? 'white' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Traditional
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Sample Content</h2>
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--base-font-size)',
            lineHeight: 'var(--content-line-height)',
          }}
        >
          <h3 style={{ color: 'var(--heading-color)', fontSize: 'var(--heading-font-size)' }}>
            The Urantia Book
          </h3>
          <p style={{ marginBottom: 'var(--paragraph-spacing)' }}>
            The Urantia Book is a spiritual, philosophical, and religious book that originated in
            Chicago sometime between 1924 and 1955. The authorship remains a matter of speculation.
            The book has been published in multiple languages and has sold over 600,000 copies
            worldwide.
          </p>
          <blockquote
            style={{
              backgroundColor: 'var(--blockquote-bg-color)',
              borderLeft: '4px solid var(--blockquote-border-color)',
              padding: '10px 20px',
              margin: '0 0 var(--paragraph-spacing) 0',
            }}
          >
            <p>
              "The universe of universes is a vast integrated mechanism which is absolutely
              controlled by one infinite mind."
            </p>
            <footer>- Paper 3:0.1</footer>
          </blockquote>
          <p style={{ marginBottom: 'var(--paragraph-spacing)' }}>
            The book aims to reconcile science with religion while also updating a reader's concept
            of philosophy and truth. It covers topics such as the origin and meaning of life, humankind's
            place in the universe, the relationship between God and people, and the life of Jesus.
          </p>
          <div
            style={{
              backgroundColor: 'var(--note-bg-color)',
              padding: '15px',
              borderRadius: '4px',
              marginBottom: 'var(--paragraph-spacing)',
            }}
          >
            <h4>Note</h4>
            <p>This is an example of a note that might be added by a reader.</p>
          </div>
          <p>
            <span
              style={{
                backgroundColor: 'var(--highlight-color)',
                border: '1px solid var(--highlight-border-color)',
                padding: '2px 0',
              }}
            >
              The book is divided into four parts
            </span>
            : The Central and Superuniverses, The Local Universe, The History of Urantia, and The
            Life and Teachings of Jesus.
          </p>
        </div>
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
export const TraditionalContent: Story = {
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
