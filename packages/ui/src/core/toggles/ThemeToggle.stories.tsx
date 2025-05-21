import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../contexts/ThemeContext';

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

// With custom class
export const WithCustomClass: Story = {
  args: {
    showLabels: true,
    showSystemOption: true,
    className: 'custom-theme-toggle',
  },
};
