import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { TabsComponent } from './TabsComponent';

const meta: Meta<typeof TabsComponent> = {
  title: 'Navigation/TabsComponent',
  component: TabsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects',
    },
    activeTab: {
      control: 'text',
      description: 'ID of the active tab',
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Callback when tab is changed',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabsComponent>;

// Interactive wrapper for the TabsComponent
const TabsComponentWrapper = args => {
  const [activeTab, setActiveTab] = useState(args.activeTab || args.tabs[0]?.id);

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <TabsComponent
        {...args}
        activeTab={activeTab}
        onTabChange={tabId => {
          setActiveTab(tabId);
          args.onTabChange?.(tabId);
        }}
      />
      <div
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderTop: 'none',
          minHeight: '200px',
        }}
      >
        {args.tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// Default tabs
const defaultTabs = [
  {
    id: 'notes',
    label: 'Notes',
    content: (
      <div>
        <h3>Notes</h3>
        <p>Your notes will appear here.</p>
      </div>
    ),
  },
  {
    id: 'quotes',
    label: 'Quotes',
    content: (
      <div>
        <h3>Quotes</h3>
        <p>Your saved quotes will appear here.</p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div>
        <h3>Settings</h3>
        <p>Adjust your reading preferences here.</p>
      </div>
    ),
  },
];

// Basic story with default props
export const Default: Story = {
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    tabs: defaultTabs,
    activeTab: 'notes',
    orientation: 'horizontal',
    size: 'medium',
  },
};

// Story with vertical orientation
export const VerticalTabs: Story = {
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
};

// Story with small size
export const SmallTabs: Story = {
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'small',
  },
};

// Story with large size
export const LargeTabs: Story = {
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'large',
  },
};

// Story with icons in tabs
export const TabsWithIcons: Story = {
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    tabs: [
      {
        id: 'notes',
        label: 'Notes',
        icon: '📝',
        content: (
          <div>
            <h3>Notes</h3>
            <p>Your notes will appear here.</p>
          </div>
        ),
      },
      {
        id: 'quotes',
        label: 'Quotes',
        icon: '💬',
        content: (
          <div>
            <h3>Quotes</h3>
            <p>Your saved quotes will appear here.</p>
          </div>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: '⚙️',
        content: (
          <div>
            <h3>Settings</h3>
            <p>Adjust your reading preferences here.</p>
          </div>
        ),
      },
    ],
  },
};

// Mobile view story
export const MobileView: Story = {
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
