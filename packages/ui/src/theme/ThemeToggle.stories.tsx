import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Theme/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentTheme: {
      control: 'select',
      options: ['light', 'dark', 'sepia'],
      description: 'The current theme',
    },
    themes: {
      control: 'object',
      description: 'Available themes',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when theme is changed',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show theme labels',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the toggle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// Interactive wrapper for the ThemeToggle
const ThemeToggleWrapper = args => {
  const [currentTheme, setCurrentTheme] = useState(args.currentTheme || 'light');

  return (
    <div style={{ padding: '20px' }}>
      <ThemeToggle
        {...args}
        currentTheme={currentTheme}
        onChange={theme => {
          setCurrentTheme(theme);
          args.onChange?.(theme);
        }}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Current theme: {currentTheme}</p>
      </div>
    </div>
  );
};

// Default themes
const defaultThemes = [
  {
    id: 'light',
    label: 'Light',
    color: '#f5f5f5',
  },
  {
    id: 'dark',
    label: 'Dark',
    color: '#1a1a1a',
  },
  {
    id: 'sepia',
    label: 'Sepia',
    color: '#f4ecd8',
  },
];

// Basic story with default props
export const Default: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    currentTheme: 'light',
    themes: defaultThemes,
    showLabels: true,
    size: 'medium',
  },
};

// Story with dark theme selected
export const DarkTheme: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    currentTheme: 'dark',
  },
};

// Story with sepia theme selected
export const SepiaTheme: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    currentTheme: 'sepia',
  },
};

// Story without labels
export const WithoutLabels: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    showLabels: false,
  },
};

// Story with small size
export const SmallSize: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'small',
  },
};

// Story with large size
export const LargeSize: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'large',
  },
};

// Story with custom themes
export const CustomThemes: Story = {
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    themes: [
      {
        id: 'blue',
        label: 'Blue',
        color: '#e3f2fd',
      },
      {
        id: 'green',
        label: 'Green',
        color: '#e8f5e9',
      },
      {
        id: 'purple',
        label: 'Purple',
        color: '#f3e5f5',
      },
    ],
    currentTheme: 'blue',
  },
};
