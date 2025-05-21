import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AuthPanel } from './AuthPanel';
import { AuthProvider } from '../../../../server/auth/AuthContext';
import { StorageProvider } from '../../../../server/storage/StorageContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { IconButton } from '../buttons/IconButton';
import { GearIcon } from '../icons/IconWrapper';

const meta: Meta<typeof AuthPanel> = {
  title: 'Core/Auth/AuthPanel',
  component: AuthPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <AuthProvider>
          <StorageProvider>
            <Story />
          </StorageProvider>
        </AuthProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AuthPanel>;

// Basic example
export const Default: Story = {
  args: {
    isOpen: true,
  },
};

// With toggle button
export const WithToggleButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ padding: '2rem' }}>
        <IconButton
          icon={<GearIcon />}
          onClick={() => setIsOpen(true)}
          ariaLabel="Open authentication panel"
        >
          Sign In
        </IconButton>
        
        <AuthPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    isOpen: true,
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialThemeMode="dark">
        <AuthProvider>
          <StorageProvider>
            <Story />
          </StorageProvider>
        </AuthProvider>
      </ThemeProvider>
    ),
  ],
};

// Sepia theme
export const SepiaTheme: Story = {
  args: {
    isOpen: true,
  },
  decorators: [
    (Story) => (
      <div className="theme-sepia" style={{ height: '100vh' }}>
        <AuthProvider>
          <StorageProvider>
            <Story />
          </StorageProvider>
        </AuthProvider>
      </div>
    ),
  ],
};
