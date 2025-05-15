import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SearchTab, SearchResult } from './SearchTab';

// Mock search results
const mockResults: SearchResult[] = [
  {
    id: '1',
    reference: '1:1.1',
    content: 'Of all the names by which God the Father is known throughout the universes',
    type: 'paragraph',
    fullContent:
      'Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered.',
  },
  {
    id: '2',
    reference: '1:1.2',
    content: 'The Universal Father never imposes any form of arbitrary recognition',
    type: 'paragraph',
    fullContent:
      'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
  },
  {
    id: '3',
    reference: '1:1.3',
    content:
      'The evolutionary creatures of time and space must of themselves recognize and love him',
    type: 'paragraph',
    fullContent:
      'The evolutionary creatures of time and space must of themselves - in their own hearts - recognize, love, and voluntarily worship him.',
  },
  {
    id: '4',
    reference: '1:2.1',
    content:
      'The Creator refuses to coerce or compel the submission of the spiritual free wills of his material creatures',
    type: 'paragraph',
    fullContent:
      "The Creator refuses to coerce or compel the submission of the spiritual free wills of his material creatures. The affectionate dedication of the human will to the doing of the Father's will is man's choicest gift to God.",
  },
];

// Mock search function
const mockSearch = async (query: string): Promise<SearchResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!query.trim()) return [];

  // Filter results based on query
  return mockResults.filter(result => result.content.toLowerCase().includes(query.toLowerCase()));
};

const meta: Meta<typeof SearchTab> = {
  title: 'ReaderCore/Pullup/SearchTab',
  component: SearchTab,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchTab>;

/**
 * Interactive SearchTab Component
 */
export const Interactive = () => {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
    console.log('Selected result:', result);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
        <SearchTab onSearch={mockSearch} onResultSelect={handleResultSelect} />
      </div>

      {selectedResult && (
        <div
          style={{
            flex: 1,
            padding: '20px',
            borderLeft: '1px solid #ddd',
            overflow: 'auto',
          }}
        >
          <h2>Selected Result</h2>
          <p>
            <strong>Reference:</strong> {selectedResult.reference}
          </p>
          <p>
            <strong>Type:</strong> {selectedResult.type}
          </p>
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              background: '#f9f9f9',
              borderRadius: '4px',
              border: '1px solid #eee',
            }}
          >
            {selectedResult.fullContent || selectedResult.content}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Default SearchTab with empty state
 */
export const Default: Story = {
  args: {
    onSearch: mockSearch,
  },
};

/**
 * SearchTab with loading state
 */
export const Loading: Story = {
  render: () => {
    // Create a mock search function that never resolves
    const neverEndingSearch = () => new Promise<SearchResult[]>(() => {});

    return (
      <div style={{ height: '400px' }}>
        <SearchTab onSearch={neverEndingSearch} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement.querySelector('.search-tab');
    const input = canvas?.querySelector('input');
    const button = canvas?.querySelector('button[type="submit"]');

    if (input && button) {
      input.value = 'universe';
      button.click();
    }
  },
};

/**
 * SearchTab with search results
 */
export const WithResults: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <SearchTab onSearch={mockSearch} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = canvasElement.querySelector('.search-tab');
    const input = canvas?.querySelector('input');
    const button = canvas?.querySelector('button[type="submit"]');

    if (input && button) {
      input.value = 'universe';
      button.click();
    }
  },
};

/**
 * SearchTab with selected result
 */
export const WithSelectedResult: Story = {
  render: () => {
    const [selectedResult, setSelectedResult] = React.useState<SearchResult | null>(null);

    return (
      <div style={{ height: '400px' }}>
        <SearchTab onSearch={mockSearch} onResultSelect={setSelectedResult} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement.querySelector('.search-tab');
    const input = canvas?.querySelector('input');
    const button = canvas?.querySelector('button[type="submit"]');

    if (input && button) {
      input.value = 'universe';
      button.click();

      // Wait for results to load
      await new Promise(resolve => setTimeout(resolve, 600));

      // Click the first result
      const firstResult = canvas?.querySelector('.search-result');
      if (firstResult) {
        firstResult.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    }
  },
};

/**
 * SearchTab with error state
 */
export const WithError: Story = {
  render: () => {
    // Create a mock search function that throws an error
    const errorSearch = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      throw new Error('Failed to search');
    };

    return (
      <div style={{ height: '400px' }}>
        <SearchTab onSearch={errorSearch} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement.querySelector('.search-tab');
    const input = canvas?.querySelector('input');
    const button = canvas?.querySelector('button[type="submit"]');

    if (input && button) {
      input.value = 'universe';
      button.click();
    }
  },
};

/**
 * Mobile view of SearchTab
 */
export const MobileView: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <SearchTab onSearch={mockSearch} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

