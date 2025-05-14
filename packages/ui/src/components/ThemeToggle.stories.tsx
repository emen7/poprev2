import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Core/Toggles/ThemeToggle',
  component: ThemeToggle,
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
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// Default story
export const Default: Story = {
  args: {
    showLabels: true,
    showSystemOption: true,
  },
};

// Icons only
export const IconsOnly: Story = {
  args: {
    showLabels: false,
    showSystemOption: true,
  },
};

// Without system option
export const WithoutSystemOption: Story = {
  args: {
    showLabels: true,
    showSystemOption: false,
  },
};

// Theme demo with content
export const ThemeDemo: Story = {
  render: (args) => (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Theme Toggle Demo</h2>
      <p style={{ marginBottom: '1rem' }}>
        This demonstrates how the theme toggle affects the appearance of content.
      </p>
      <ThemeToggle {...args} />
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
        <h3>Sample Content</h3>
        <p>
          This text will change appearance based on the selected theme. The theme affects colors,
          fonts, and other visual elements.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li>Dark theme: High contrast, dark background</li>
          <li>Light theme: Standard light background</li>
          <li>System theme: Follows your system preferences</li>
        </ul>
      </div>
    </div>
  ),
  args: {
    showLabels: true,
    showSystemOption: true,
  },
};

