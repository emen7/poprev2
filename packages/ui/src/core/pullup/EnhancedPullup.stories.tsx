import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { EnhancedPullup } from './EnhancedPullup';
import { ThemeProvider } from '../../contexts/ThemeContext';

const meta: Meta<typeof EnhancedPullup> = {
  title: 'Core/Pullup/EnhancedPullup',
  component: EnhancedPullup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the pullup panel is open',
    },
    activeTab: {
      control: 'select',
      options: ['notes', 'quotes', 'settings', 'search'],
      description: 'The currently active tab',
    },
    height: {
      control: { type: 'number', min: 100, max: 600, step: 10 },
      description: 'The height of the pullup panel',
    },
    isPersistent: {
      control: 'boolean',
      description: 'Whether the pullup panel is in persistent mode (for large screens)',
    },
    enableSnapPoints: {
      control: 'boolean',
      description: 'Whether to enable snap points',
    },
    minHeight: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
      description: 'The minimum height of the pullup panel',
    },
    maxHeight: {
      control: { type: 'number', min: 300, max: 800, step: 10 },
      description: 'The maximum height of the pullup panel',
    },
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
type Story = StoryObj<typeof EnhancedPullup>;

// Interactive wrapper for the EnhancedPullup
const EnhancedPullupWrapper = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  const [activeTab, setActiveTab] = useState(args.activeTab);
  const [height, setHeight] = useState(args.height);

  // Sample content for tabs
  const notesContent = (
    <div>
      <h3>Notes</h3>
      <p>This is the notes tab content. You can add your notes here.</p>
      <div style={{ marginTop: '20px' }}>
        <textarea
          placeholder="Add a note..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            minHeight: '100px',
          }}
        />
        <button
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save Note
        </button>
      </div>
    </div>
  );

  const quotesContent = (
    <div>
      <h3>Quotes</h3>
      <p>This is the quotes tab content. Your saved quotes will appear here.</p>
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          borderLeft: '4px solid #3498db',
        }}
      >
        <p>
          "The universe of universes is a vast integrated mechanism which is absolutely controlled by
          one infinite mind."
        </p>
        <div style={{ textAlign: 'right', fontStyle: 'italic' }}>- Paper 3:0.1</div>
      </div>
    </div>
  );

  const settingsContent = (
    <div>
      <h3>Settings</h3>
      <p>This is the settings tab content. Adjust your reading preferences here.</p>
      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Theme</label>
          <select
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Font Size</label>
          <input
            type="range"
            min="12"
            max="24"
            defaultValue="16"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );

  const searchContent = (
    <div>
      <h3>Search</h3>
      <p>This is the search tab content. Search for content in the book.</p>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <button
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isOpen ? 'Close Pullup' : 'Open Pullup'}
        </button>
      </div>

      <EnhancedPullup
        {...args}
        isOpen={isOpen}
        activeTab={activeTab}
        height={height}
        onClose={() => setIsOpen(false)}
        onTabSelect={(tab) => setActiveTab(tab)}
        onHeightChange={(newHeight) => setHeight(newHeight)}
        notesContent={notesContent}
        quotesContent={quotesContent}
        settingsContent={settingsContent}
        searchContent={searchContent}
      />
    </div>
  );
};

// Default story
export const Default: Story = {
  render: (args) => <EnhancedPullupWrapper {...args} />,
  args: {
    isOpen: true,
    activeTab: 'notes',
    height: 300,
    isPersistent: false,
    enableSnapPoints: true,
    minHeight: 100,
    maxHeight: 600,
  },
};

// Persistent mode story
export const PersistentMode: Story = {
  render: (args) => <EnhancedPullupWrapper {...args} />,
  args: {
    ...Default.args,
    isPersistent: true,
  },
};

// Without snap points story
export const WithoutSnapPoints: Story = {
  render: (args) => <EnhancedPullupWrapper {...args} />,
  args: {
    ...Default.args,
    enableSnapPoints: false,
  },
};

// Mobile view story
export const MobileView: Story = {
  render: (args) => <EnhancedPullupWrapper {...args} />,
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
