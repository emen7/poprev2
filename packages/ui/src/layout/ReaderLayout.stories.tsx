import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ReaderLayout } from './ReaderLayout';

const meta: Meta<typeof ReaderLayout> = {
  title: 'ReaderCore/Layout/ReaderLayout',
  component: ReaderLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    contentWidth: {
      control: 'select',
      options: ['narrow', 'medium', 'wide'],
      description: 'Width setting for the content area',
    },
    showHeader: {
      control: 'boolean',
      description: 'Whether to show the header',
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show the footer',
    },
    showSidePanel: {
      control: 'boolean',
      description: 'Whether to show the side panel',
    },
    showBottomPanel: {
      control: 'boolean',
      description: 'Whether to show the bottom panel',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReaderLayout>;

// Sample content for the stories
const SampleContent = () => (
  <div style={{ padding: '20px' }}>
    <h1>Sample Content</h1>
    <p>
      This is sample content for the ReaderLayout component. In a real application, this would be
      the main content of the reader, such as a paper or article.
    </p>
    <p>
      The ReaderLayout component provides a flexible layout for reader applications, with optional
      header, footer, side panel, and bottom panel.
    </p>
  </div>
);

const SampleHeader = () => (
  <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', height: '100%' }}>
    <div style={{ flex: 1 }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>≡</button>
    </div>
    <div style={{ flex: 2, textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.2rem' }}>The Urantia Book</h1>
    </div>
    <div style={{ flex: 1, textAlign: 'right' }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>⚙️</button>
    </div>
  </div>
);

const SampleFooter = () => (
  <div style={{ padding: '10px 20px', textAlign: 'center' }}>
    <p style={{ margin: 0, fontSize: '0.8rem' }}>© 2023 UB Ecosystem</p>
  </div>
);

const SampleSidePanel = () => (
  <div style={{ padding: '20px' }}>
    <h2>Navigation</h2>
    <ul>
      <li>Paper 1</li>
      <li>Paper 2</li>
      <li>Paper 3</li>
    </ul>
  </div>
);

const SampleBottomPanel = () => (
  <div style={{ padding: '20px' }}>
    <h2>Notes</h2>
    <p>Your notes will appear here.</p>
  </div>
);

// Basic story with default props
export const Default: Story = {
  args: {
    children: <SampleContent />,
    showHeader: true,
    showFooter: true,
    showSidePanel: false,
    showBottomPanel: false,
    headerContent: <SampleHeader />,
    footerContent: <SampleFooter />,
    contentWidth: 'medium',
  },
};

// Story with all panels visible
export const WithAllPanels: Story = {
  args: {
    ...Default.args,
    showSidePanel: true,
    showBottomPanel: true,
    sidePanelContent: <SampleSidePanel />,
    bottomPanelContent: <SampleBottomPanel />,
  },
};

// Story with narrow content width
export const NarrowContent: Story = {
  args: {
    ...Default.args,
    contentWidth: 'narrow',
  },
};

// Story with wide content width
export const WideContent: Story = {
  args: {
    ...Default.args,
    contentWidth: 'wide',
  },
};

// Mobile view story
export const MobileView: Story = {
  args: {
    ...Default.args,
    showSidePanel: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

