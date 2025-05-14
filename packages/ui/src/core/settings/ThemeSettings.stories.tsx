import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeSettings } from './ThemeSettings';
import { ThemeProvider } from '../../contexts/ThemeContext';

const meta: Meta<typeof ThemeSettings> = {
  title: 'Core/Settings/ThemeSettings',
  component: ThemeSettings,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels next to icons',
    },
    showSystemOption: {
      control: 'boolean',
      description: 'Whether to show the system theme option',
    },
    alignmentOptions: {
      control: 'array',
      description: 'Which alignment options to show',
    },
    showThemeToggle: {
      control: 'boolean',
      description: 'Whether to show the theme toggle',
    },
    showAlignmentToggle: {
      control: 'boolean',
      description: 'Whether to show the text alignment toggle',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div
          style={{
            padding: '2rem',
            background: 'var(--color-background)',
            color: 'var(--color-text-primary)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeSettings>;

// Default story
export const Default: Story = {
  args: {
    showLabels: true,
    showSystemOption: true,
    alignmentOptions: ['left', 'justify', 'right'],
    showThemeToggle: true,
    showAlignmentToggle: true,
  },
};

// Theme only
export const ThemeOnly: Story = {
  args: {
    showLabels: true,
    showSystemOption: true,
    showThemeToggle: true,
    showAlignmentToggle: false,
  },
};

// Alignment only
export const AlignmentOnly: Story = {
  args: {
    showLabels: true,
    alignmentOptions: ['left', 'justify', 'right', 'center'],
    showThemeToggle: false,
    showAlignmentToggle: true,
  },
};

// Icons only
export const IconsOnly: Story = {
  args: {
    showLabels: false,
    showSystemOption: true,
    alignmentOptions: ['left', 'justify', 'right'],
    showThemeToggle: true,
    showAlignmentToggle: true,
  },
};

// Settings demo with content
export const SettingsDemo: Story = {
  render: args => (
    <div style={{ width: '800px', display: 'flex', gap: '2rem' }}>
      <div style={{ flex: '0 0 300px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Theme Settings</h2>
        <ThemeSettings {...args} />
      </div>

      <div
        style={{
          flex: '1 1 auto',
          padding: '1.5rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-md)',
          backgroundColor: 'var(--color-surface)',
          textAlign: 'var(--text-align)',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>Content Preview</h3>
        <p style={{ marginBottom: '1rem' }}>
          This content will update based on your theme and text alignment settings. Try changing the
          settings to see how they affect the appearance of this text.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-sm)',
          }}
        >
          <h4 style={{ marginBottom: '0.5rem' }}>Sample Card</h4>
          <p>
            This card demonstrates how nested elements inherit the theme styles. The appearance will
            change based on your selected theme.
          </p>
        </div>
      </div>
    </div>
  ),
  args: {
    showLabels: true,
    showSystemOption: true,
    alignmentOptions: ['left', 'justify', 'right', 'center'],
    showThemeToggle: true,
    showAlignmentToggle: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
