import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { PullupPanel } from './PullupPanel';

const meta: Meta<typeof PullupPanel> = {
  title: 'Pullup/PullupPanel',
  component: PullupPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the panel is open',
    },
    height: {
      control: 'number',
      description: 'Height of the panel in pixels',
    },
    isPersistent: {
      control: 'boolean',
      description: 'Whether the panel stays open when clicking outside',
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height of the panel in pixels',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the panel in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PullupPanel>;

// Interactive wrapper for the PullupPanel
const PullupPanelWrapper = args => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  const [height, setHeight] = useState(args.height || 300);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div style={{ padding: '20px' }}>
        <h1>PullupPanel Demo</h1>
        <p>
          This demonstrates the PullupPanel component. Click the button below to toggle the panel.
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '10px 20px',
            background: '#0088ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isOpen ? 'Close Panel' : 'Open Panel'}
        </button>
      </div>

      <PullupPanel
        {...args}
        isOpen={isOpen}
        height={height}
        onClose={() => setIsOpen(false)}
        onHeightChange={newHeight => setHeight(newHeight)}
      >
        <div style={{ padding: '20px' }}>
          <h2>Pullup Panel Content</h2>
          <p>
            This is the content of the pullup panel. You can drag the handle at the top to resize
            the panel.
          </p>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '10px 20px',
                background: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close Panel
            </button>
          </div>
        </div>
      </PullupPanel>
    </div>
  );
};

// Basic story with default props
export const Default: Story = {
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    isOpen: true,
    height: 300,
    isPersistent: false,
    minHeight: 100,
    maxHeight: 600,
  },
};

// Story with panel closed initially
export const Closed: Story = {
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    isOpen: false,
  },
};

// Story with persistent panel
export const Persistent: Story = {
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    isPersistent: true,
  },
};

// Story with custom height
export const CustomHeight: Story = {
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    height: 400,
  },
};

// Mobile view story
export const MobileView: Story = {
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
