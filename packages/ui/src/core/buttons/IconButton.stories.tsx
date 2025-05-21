import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { SearchIcon, HeartIcon, GearIcon, BookmarkIcon, NoteIcon } from '../icons/IconWrapper';

const meta: Meta<typeof IconButton> = {
  title: 'Core/Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'danger'],
      description: 'The visual style variant of the button',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      defaultValue: 'medium',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'only'],
      description: 'The position of the icon relative to the text',
      defaultValue: 'left',
    },
    iconWeight: {
      control: 'select',
      options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
      description: 'The weight/style of the icon',
      defaultValue: 'regular',
    },
    iconColor: {
      control: 'color',
      description: 'The color of the icon',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    circular: {
      control: 'boolean',
      description: 'Whether to use a circular shape',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Icon on the left (default)
export const IconLeft: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    variant: 'default',
    iconPosition: 'left',
  },
};

// Icon on the right
export const IconRight: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    variant: 'default',
    iconPosition: 'right',
  },
};

// Icon only
export const IconOnly: Story = {
  args: {
    icon: <SearchIcon />,
    iconPosition: 'only',
    ariaLabel: 'Search',
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    variant: 'primary',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    icon: <HeartIcon />,
    children: 'Favorite',
    variant: 'secondary',
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    icon: <HeartIcon />,
    children: 'Remove',
    variant: 'danger',
  },
};

// Small size
export const Small: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    size: 'small',
  },
};

// Large size
export const Large: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    size: 'large',
  },
};

// Circular icon-only button
export const CircularIconOnly: Story = {
  args: {
    icon: <GearIcon />,
    iconPosition: 'only',
    circular: true,
    ariaLabel: 'Settings',
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    disabled: true,
  },
};

// With bold icon weight
export const BoldIconWeight: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    variant: 'primary',
    iconWeight: 'bold',
  },
};

// With fill icon weight
export const FillIconWeight: Story = {
  args: {
    icon: <HeartIcon />,
    children: 'Favorite',
    variant: 'secondary',
    iconWeight: 'fill',
  },
};

// With custom icon color
export const CustomIconColor: Story = {
  args: {
    icon: <BookmarkIcon />,
    children: 'Bookmark',
    iconColor: '#ff6b6b',
  },
};

// Multiple buttons example
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <IconButton
        icon={<SearchIcon />}
        variant="primary"
        iconPosition="only"
        circular
        ariaLabel="Search"
      />
      <IconButton
        icon={<HeartIcon weight="fill" />}
        variant="secondary"
        iconPosition="only"
        circular
        ariaLabel="Favorite"
      />
      <IconButton
        icon={<BookmarkIcon />}
        variant="default"
        iconPosition="only"
        circular
        ariaLabel="Bookmark"
      />
      <IconButton
        icon={<NoteIcon />}
        variant="danger"
        iconPosition="only"
        circular
        ariaLabel="Notes"
      />
      <IconButton
        icon={<GearIcon />}
        variant="default"
        iconPosition="only"
        circular
        ariaLabel="Settings"
      />
    </div>
  ),
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    variant: 'primary',
  },
  decorators: [
    Story => (
      <ThemeProvider initialThemeMode="dark">
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// Sepia theme
export const SepiaTheme: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
    variant: 'primary',
  },
  parameters: {
    backgrounds: { default: 'sepia' },
  },
  decorators: [
    Story => (
      <div className="theme-sepia" style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};
