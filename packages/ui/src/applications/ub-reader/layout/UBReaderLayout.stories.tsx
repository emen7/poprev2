import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { UBReaderLayout } from './UBReaderLayout';
import { NotesPanel } from '../../../reader-core/panels/NotesPanel';

const meta: Meta<typeof UBReaderLayout> = {
  title: 'Applications/UBReader/Layout/UBReaderLayout',
  component: UBReaderLayout,
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
    showFooter: {
      control: 'boolean',
      description: 'Whether to show the footer',
    },
    showBottomPanel: {
      control: 'boolean',
      description: 'Whether to show the bottom panel',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBReaderLayout>;

// Sample content for the stories
const SampleContent = () => (
  <div style={{ padding: '20px' }}>
    <h1>Paper 1: The Universal Father</h1>
    <p style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
      Presented by a Divine Counselor, a member of a group of celestial personalities assigned by
      the Ancients of Days on Uversa.
    </p>

    <div style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '45px' }}>
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: '0.25rem',
          color: '#777',
          fontSize: '0.75rem',
          width: '40px',
          textAlign: 'right',
          paddingRight: '5px',
        }}
      >
        1:0.1
      </span>
      <div>
        THE Universal Father is the God of all creation, the First Source and Center of all things
        and beings. First think of God as a creator, then as a controller, and lastly as an infinite
        upholder.
      </div>
    </div>

    <div style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '45px' }}>
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: '0.25rem',
          color: '#777',
          fontSize: '0.75rem',
          width: '40px',
          textAlign: 'right',
          paddingRight: '5px',
        }}
      >
        1:0.2
      </span>
      <div>
        The myriads of planetary systems were all made to be eventually inhabited by many different
        types of intelligent creatures, beings who could know God, receive the divine affection, and
        love the Creator in return.
      </div>
    </div>
  </div>
);

const BookNavigationContent = () => (
  <div style={{ padding: '20px' }}>
    <h2>The Urantia Book</h2>
    <ul>
      <li>Foreword</li>
      <li>Part I: The Central and Superuniverses</li>
      <li>Part II: The Local Universe</li>
      <li>Part III: The History of Urantia</li>
      <li>Part IV: The Life and Teachings of Jesus</li>
    </ul>
  </div>
);

const SectionNavigationContent = () => (
  <div style={{ padding: '20px' }}>
    <h2>Paper 1: The Universal Father</h2>
    <ul>
      <li>Introduction</li>
      <li>1. The Father&apos;s Name</li>
      <li>2. The Reality of God</li>
      <li>3. God is a Universal Spirit</li>
      <li>4. The Mystery of God</li>
      <li>5. Personality of the Universal Father</li>
      <li>6. Personality in the Universe</li>
      <li>7. Spiritual Value of the Personality Concept</li>
    </ul>
  </div>
);

const FooterContent = () => (
  <div style={{ padding: '10px 20px', textAlign: 'center' }}>
    <p style={{ margin: 0, fontSize: '0.8rem' }}>© 2023 UB Ecosystem</p>
  </div>
);

// Sample notes for the notes panel
const sampleNotes = [
  {
    id: 'note-1',
    content:
      'This is a note about the Universal Father. The concept of God as a loving parent is central to understanding the Urantia Book.',
    createdAt: new Date(2023, 0, 15).toISOString(),
    updatedAt: new Date(2023, 0, 15).toISOString(),
    reference: 'Paper 1',
  },
  {
    id: 'note-2',
    content: "The Father's name section explains how God is known throughout the universes.",
    createdAt: new Date(2023, 1, 20).toISOString(),
    updatedAt: new Date(2023, 2, 5).toISOString(),
    reference: 'Paper 1, Section 1',
  },
];

// Sample quotes for the quotes panel
const QuotesPanel = () => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Saved Quotes</h2>
    <div
      style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        borderLeft: '3px solid #1976d2',
      }}
    >
      <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>
        "THE Universal Father is the God of all creation, the First Source and Center of all things
        and beings."
      </p>
      <p style={{ fontSize: '0.8rem', color: '#666' }}>Paper 1:0.1</p>
    </div>
    <div
      style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        borderLeft: '3px solid #1976d2',
      }}
    >
      <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>
        "The Universal Father never imposes any form of arbitrary recognition, formal worship, or
        slavish service upon the intelligent will creatures of the universes."
      </p>
      <p style={{ fontSize: '0.8rem', color: '#666' }}>Paper 1:1.2</p>
    </div>
  </div>
);

// Settings panel
const SettingsPanel = () => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Reader Settings</h2>

    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Theme</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Light
        </button>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#333',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Dark
        </button>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#f4ecd8',
            border: '1px solid #d2b48c',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Traditional
        </button>
      </div>
    </div>

    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Text Size</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem' }}>A</span>
        <input type="range" min="1" max="3" defaultValue="2" style={{ flex: 1 }} />
        <span style={{ fontSize: '1.2rem' }}>A</span>
      </div>
    </div>

    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Display Options</h3>
      <div>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
          Show paragraph numbers
        </label>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
          Enable text selection
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
          Show reference tooltips
        </label>
      </div>
    </div>
  </div>
);

// Sample tabs for the bottom panel
const bottomPanelTabs = [
  {
    id: 'notes',
    label: 'Notes',
    content: <NotesPanel documentId="paper-1" initialNotes={sampleNotes} persistNotes={false} />,
  },
  {
    id: 'quotes',
    label: 'Quotes',
    content: <QuotesPanel />,
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <SettingsPanel />,
  },
];

// Basic story with default props
export const Default: Story = {
  args: {
    title: 'The Urantia Book',
    children: <SampleContent />,
    bookNavigationContent: <BookNavigationContent />,
    sectionNavigationContent: <SectionNavigationContent />,
    showFooter: true,
    footerContent: <FooterContent />,
    contentWidth: 'medium',
    showBottomPanel: false,
    bottomPanelTabs: bottomPanelTabs,
    bottomPanelInitialHeight: 300,
  },
};

// Story with bottom panel open
export const WithBottomPanel: Story = {
  args: {
    ...Default.args,
    showBottomPanel: true,
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
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Mobile view with bottom panel open
export const MobileWithBottomPanel: Story = {
  args: {
    ...Default.args,
    showBottomPanel: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
