import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

// Create a mock PullupTabs component for Storybook
export type PullupTab = 'notes' | 'quotes' | 'settings';

export const PullupTabs = ({ activeTab, onTabSelect, className = '' }) => {
  const tabsContainerStyle = {
    display: 'flex',
    borderBottom: '1px solid #eaeaea',
    backgroundColor: '#f9f9f9',
    paddingLeft: '16px',
  };

  const getTabStyle = (isActive: boolean) => ({
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: isActive ? '#1890ff' : '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    marginRight: '8px',
    fontWeight: isActive ? 500 : 'normal',
    borderBottom: isActive ? '2px solid #1890ff' : 'none',
  });

  const iconStyle = {
    fontSize: '16px',
  };

  const labelStyle = {
    fontSize: '14px',
  };

  return (
    <div style={tabsContainerStyle}>
      <button style={getTabStyle(activeTab === 'notes')} onClick={() => onTabSelect?.('notes')}>
        <span style={iconStyle}>📝</span>
        <span style={labelStyle}>Notes</span>
      </button>
      <button style={getTabStyle(activeTab === 'quotes')} onClick={() => onTabSelect?.('quotes')}>
        <span style={iconStyle}>💬</span>
        <span style={labelStyle}>Quotes</span>
      </button>
      <button
        style={getTabStyle(activeTab === 'settings')}
        onClick={() => onTabSelect?.('settings')}
      >
        <span style={iconStyle}>⚙️</span>
        <span style={labelStyle}>Settings</span>
      </button>
    </div>
  );
};

const meta: Meta<typeof PullupTabs> = {
  title: 'ReaderCore/Pullup/PullupTabs',
  component: PullupTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['notes', 'quotes', 'settings'],
      description: 'The currently active tab',
    },
    onTabSelect: {
      action: 'tabSelected',
      description: 'Function called when a tab is selected',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PullupTabs>;

// Interactive wrapper for the PullupTabs
const PullupTabsWrapper = args => {
  const [activeTab, setActiveTab] = useState<PullupTab>(args.activeTab || 'notes');

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <PullupTabs
        {...args}
        activeTab={activeTab}
        onTabSelect={tab => {
          setActiveTab(tab);
          args.onTabSelect?.(tab);
        }}
      />
      <div style={{ padding: '20px', minHeight: '200px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab Content
        </h2>
        <p>This area would display the content for the {activeTab} tab.</p>
      </div>
    </div>
  );
};

// Basic story with default props
export const Default: Story = {
  render: args => <PullupTabsWrapper {...args} />,
  args: {
    activeTab: 'notes',
  },
};

// Story with quotes tab active
export const QuotesActive: Story = {
  render: args => <PullupTabsWrapper {...args} />,
  args: {
    activeTab: 'quotes',
  },
};

// Story with settings tab active
export const SettingsActive: Story = {
  render: args => <PullupTabsWrapper {...args} />,
  args: {
    activeTab: 'settings',
  },
};

// Add CSS variables for the stories
const styles = `
  :root {
    --tabs-bg-color: #f9f9f9;
    --tabs-border-color: #eaeaea;
    --tab-color: #666;
    --tab-hover-color: #333;
    --tab-hover-bg-color: #f0f0f0;
    --tab-active-color: #1890ff;
    --tab-active-bg-color: #fff;
    --tab-active-indicator-color: #1890ff;
  }

  /* Dark theme */
  .dark-theme {
    --tabs-bg-color: #222;
    --tabs-border-color: #333;
    --tab-color: #aaa;
    --tab-hover-color: #fff;
    --tab-hover-bg-color: #333;
    --tab-active-color: #7fc8f5;
    --tab-active-bg-color: #1a1a1a;
    --tab-active-indicator-color: #7fc8f5;
  }

  /* Add the component styles */
  .pullup-tabs {
    display: flex;
    border-bottom: 1px solid var(--tabs-border-color);
    background-color: var(--tabs-bg-color);
    padding-left: 16px;
  }

  .pullup-tab {
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--tab-color);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    position: relative;
    margin-right: 8px;
  }

  .pullup-tab:hover {
    background-color: var(--tab-hover-bg-color);
    color: var(--tab-hover-color);
  }

  .pullup-tab-active {
    color: var(--tab-active-color);
    font-weight: 500;
  }

  .pullup-tab-active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--tab-active-indicator-color);
  }

  .pullup-tab-icon {
    font-size: 16px;
  }

  .pullup-tab-label {
    font-size: 14px;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

