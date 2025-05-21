import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SnapPointIndicator } from './SnapPointIndicator';

const meta: Meta<typeof SnapPointIndicator> = {
  title: 'Core/Indicators/SnapPointIndicator',
  component: SnapPointIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentHeight: {
      control: { type: 'number', min: 0, max: 1000, step: 10 },
      description: 'The current height of the pullup panel',
    },
    snapPoints: {
      control: 'object',
      description: 'The snap points configuration',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SnapPointIndicator>;

/**
 * Default SnapPointIndicator with collapsed state active
 */
export const Collapsed: Story = {
  args: {
    currentHeight: 100,
    snapPoints: {
      collapsed: 100,
      half: 300,
      full: 600,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#333', borderRadius: '8px', position: 'relative', height: '30px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * SnapPointIndicator with half-expanded state active
 */
export const HalfExpanded: Story = {
  args: {
    currentHeight: 300,
    snapPoints: {
      collapsed: 100,
      half: 300,
      full: 600,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#333', borderRadius: '8px', position: 'relative', height: '30px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * SnapPointIndicator with fully-expanded state active
 */
export const FullyExpanded: Story = {
  args: {
    currentHeight: 600,
    snapPoints: {
      collapsed: 100,
      half: 300,
      full: 600,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#333', borderRadius: '8px', position: 'relative', height: '30px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive SnapPointIndicator that allows you to change the current height
 */
export const Interactive = () => {
  const snapPoints = {
    collapsed: 100,
    half: 300,
    full: 600,
  };
  
  const [currentHeight, setCurrentHeight] = useState(snapPoints.collapsed);
  
  return (
    <div style={{ padding: '20px', background: '#333', borderRadius: '8px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="height-slider" style={{ color: 'white', marginRight: '10px' }}>
          Current Height: {currentHeight}px
        </label>
        <input
          id="height-slider"
          type="range"
          min={snapPoints.collapsed}
          max={snapPoints.full}
          value={currentHeight}
          onChange={(e) => setCurrentHeight(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      <div style={{ position: 'relative', height: '30px' }}>
        <SnapPointIndicator currentHeight={currentHeight} snapPoints={snapPoints} />
      </div>
    </div>
  );
};
