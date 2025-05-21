import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { PullupPanel } from './PullupPanel';

const meta: Meta<typeof PullupPanel> = {
  title: 'ReaderCore/Pullup/PullupPanel',
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
    enableSnapPoints: {
      control: 'boolean',
      description: 'Whether to enable snap points for the panel',
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
        <div style={{ marginBottom: '10px' }}>
          <p>
            {args.enableSnapPoints
              ? '✅ Snap points are enabled. Try dragging the handle to see them in action. You can also double-tap the handle to cycle through snap points.'
              : '❌ Snap points are disabled. The panel will stay at whatever height you drag it to.'}
          </p>
        </div>
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
          {args.enableSnapPoints && (
            <p>
              <strong>Snap Points:</strong> The panel will snap to collapsed (100px), half-expanded
              (300px), or fully-expanded (600px) positions when you release the handle. Double-tap
              the handle to cycle through these positions.
            </p>
          )}
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
    enableSnapPoints: true,
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

// Story with snap points disabled
export const WithoutSnapPoints: Story = {
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    enableSnapPoints: false,
  },
};

// Story with snap points at different heights
export const CustomSnapPoints: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    const [height, setHeight] = useState(args.height || 300);
    const [activeSnapPoint, setActiveSnapPoint] = useState('half');

    // Custom snap points
    const snapPoints = {
      collapsed: 80,
      half: 250,
      full: 500,
    };

    // Get closest snap point
    const getClosestSnapPoint = (height: number): string => {
      const points = Object.entries(snapPoints);
      const closest = points.reduce((prev, curr) => {
        return Math.abs(curr[1] - height) < Math.abs(prev[1] - height) ? curr : prev;
      });

      return closest[0];
    };

    // Handle height change
    const handleHeightChange = (newHeight: number) => {
      setHeight(newHeight);
      setActiveSnapPoint(getClosestSnapPoint(newHeight));
    };

    return (
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{ padding: '20px' }}>
          <h1>Custom Snap Points Demo</h1>
          <p>This demonstrates the PullupPanel with custom snap points.</p>
          <div style={{ marginBottom: '10px' }}>
            <p>
              Current snap point: <strong>{activeSnapPoint}</strong> ({height}px)
            </p>
            <p>
              Available snap points:
              <ul>
                <li>Collapsed: {snapPoints.collapsed}px</li>
                <li>Half-expanded: {snapPoints.half}px</li>
                <li>Fully-expanded: {snapPoints.full}px</li>
              </ul>
            </p>
          </div>
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
          minHeight={snapPoints.collapsed}
          maxHeight={snapPoints.full}
          onClose={() => setIsOpen(false)}
          onHeightChange={handleHeightChange}
        >
          <div style={{ padding: '20px' }}>
            <h2>Custom Snap Points</h2>
            <p>
              This panel has custom snap points at {snapPoints.collapsed}px, {snapPoints.half}px,
              and {snapPoints.full}px.
            </p>
            <p>Try dragging the handle or double-tapping it to cycle through the snap points.</p>
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
  },
  args: {
    isOpen: true,
    height: 250,
    isPersistent: false,
    enableSnapPoints: true,
  },
};

