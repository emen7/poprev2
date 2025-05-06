import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { UBReaderLayout } from './UBReaderLayout';

const meta: Meta<typeof UBReaderLayout> = {
  title: 'Layout/UBReaderLayout',
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

// Sample tabs for the bottom panel
const bottomPanelTabs = [
  {
    id: 'notes',
    label: 'Notes',
    content: (
      <div style={{ padding: '20px' }}>
        <h2>Notes</h2>
        <p>Your notes will appear here.</p>
      </div>
    ),
  },
  {
    id: 'quotes',
    label: 'Quotes',
    content: (
      <div style={{ padding: '20px' }}>
        <h2>Quotes</h2>
        <p>Your saved quotes will appear here.</p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div style={{ padding: '20px' }}>
        <h2>Settings</h2>
        <div style={{ marginBottom: '1rem' }}>
          <h3>Theme</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div>
              <div
                style={{
                  width: '50px',
                  height: '30px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              ></div>
              <span>Dark</span>
            </div>
            <div>
              <div
                style={{
                  width: '50px',
                  height: '30px',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              ></div>
              <span>Light</span>
            </div>
            <div>
              <div
                style={{
                  width: '50px',
                  height: '30px',
                  backgroundColor: '#f4ecd8',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              ></div>
              <span>Sepia</span>
            </div>
          </div>
        </div>
      </div>
    ),
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
