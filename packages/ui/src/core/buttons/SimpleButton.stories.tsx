import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { SimpleButton } from './SimpleButton';
import { ThemeProvider } from '../../contexts/ThemeContext';

const meta: Meta<typeof SimpleButton> = {
  title: 'Core/Buttons/SimpleButton',
  component: SimpleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    primary: {
      control: 'boolean',
      description: 'Is this the principal call to action on the page?',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'How large should the button be?',
    },
    label: {
      control: 'text',
      description: 'Button contents',
    },
    disabled: {
      control: 'boolean',
      description: 'Is the button disabled?',
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SimpleButton>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
};

export const WithCustomBackgroundColor: Story = {
  args: {
    backgroundColor: '#ff4081',
    label: 'Button',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-button',
    label: 'Button',
  },
};

// Theme variants
export const PrimaryDarkTheme: Story = {
  args: {
    primary: true,
    label: 'Dark Theme Button',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialThemeMode="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const PrimarySepiaTheme: Story = {
  args: {
    primary: true,
    label: 'Sepia Theme Button',
  },
  parameters: {
    backgrounds: { default: 'sepia' },
  },
  decorators: [
    (Story) => (
      <div className="theme-sepia" style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};
