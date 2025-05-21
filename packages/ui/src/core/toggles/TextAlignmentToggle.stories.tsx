import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextAlignmentToggle } from './TextAlignmentToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta: Meta<typeof TextAlignmentToggle> = {
  title: 'Core/Toggles/TextAlignmentToggle',
  component: TextAlignmentToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels next to icons',
    },
    options: {
      control: 'array',
      description: 'Which alignment options to show',
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
type Story = StoryObj<typeof TextAlignmentToggle>;

// Default story
export const Default: Story = {
  args: {
    showLabels: true,
    options: ['left', 'justify', 'right'],
  },
};

// Icons only
export const IconsOnly: Story = {
  args: {
    showLabels: false,
    options: ['left', 'justify', 'right'],
  },
};

// All options
export const AllOptions: Story = {
  args: {
    showLabels: true,
    options: ['left', 'justify', 'right', 'center'],
  },
};

// Alignment demo with content
export const AlignmentDemo: Story = {
  render: (args) => (
    <div style={{ width: '500px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Text Alignment Demo</h2>
      <p style={{ marginBottom: '1rem' }}>
        This demonstrates how the text alignment toggle affects the appearance of content.
      </p>
      <TextAlignmentToggle {...args} />
      <div 
        style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          border: '1px solid var(--color-border)',
          textAlign: 'var(--text-align)'
        }}
      >
        <h3>Sample Content</h3>
        <p>
          This text will change alignment based on the selected option. Text alignment is an important
          aspect of readability and design. Different alignment options serve different purposes and
          can enhance the reading experience in various contexts.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  ),
  args: {
    showLabels: true,
    options: ['left', 'justify', 'right', 'center'],
  },
};

