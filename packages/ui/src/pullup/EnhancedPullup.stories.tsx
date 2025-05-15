import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Pullup } from './Pullup';
import { PullupTab } from './PullupTabs';
import { Note } from './NotesTab';
import { Quote } from './QuotesTab';
import { ReaderSettings } from './SettingsTab';
import { SearchResult } from './SearchTab';

const meta: Meta<typeof Pullup> = {
  title: 'Core/Pullup/EnhancedPullup',
  component: Pullup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pullup>;

// Mock data
const mockNotes: Note[] = [
  {
    id: '1',
    content: 'This is a note about the Universal Father.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paragraphId: 'p1',
    reference: '1:1.1',
    selectedText: 'Of all the names by which God the Father is known throughout the universes',
  },
  {
    id: '2',
    content: 'The concept of the First Source is profound.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paragraphId: 'p2',
    reference: '1:1.2',
    selectedText: 'The First Father is known by various names in different universes',
  },
];

const mockQuotes: Quote[] = [
  {
    id: '1',
    content:
      'Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered.',
    createdAt: new Date().toISOString(),
    paragraphId: 'p1',
    reference: '1:1.1',
  },
  {
    id: '2',
    content:
      'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
    createdAt: new Date().toISOString(),
    paragraphId: 'p3',
    reference: '1:1.3',
  },
];

const mockSettings: ReaderSettings = {
  fontSize: 18,
  lineHeight: 1.6,
  fontFamily: 'Georgia, serif',
  theme: 'dark',
  showParagraphNumbers: true,
  formatType: 'modern',
};

// Mock search results
const mockSearchResults: SearchResult[] = [
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
];

// Mock search function
const mockSearch = async (query: string): Promise<SearchResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!query.trim()) return [];

  // Filter results based on query
  return mockSearchResults.filter(result =>
    result.content.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Interactive Pullup Component
 */
export const Interactive = () => {
  // State
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<PullupTab>('notes');
  const [height, setHeight] = useState(300);
  const [isPersistent, setIsPersistent] = useState(false);
  const [enableSnapPoints, setEnableSnapPoints] = useState(true);
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [settings, setSettings] = useState<ReaderSettings>(mockSettings);
  const [sortOrder, setSortOrder] = useState<'entry' | 'paper'>('entry');
  const [selectedSearchResult, setSelectedSearchResult] = useState<SearchResult | null>(null);

  // Handlers
  const handleNoteUpdate = (id: string, content: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, content, updatedAt: new Date().toISOString() } : note
      )
    );
  };

  const handleSearchResultSelect = (result: SearchResult) => {
    setSelectedSearchResult(result);
    console.log('Selected search result:', result);
  };

  const handleNoteDelete = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const handleQuoteDelete = (id: string) => {
    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id));
  };

  const handleSettingsChange = (newSettings: Partial<ReaderSettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div style={{ padding: '20px' }}>
        <h1>Enhanced Pullup Demo</h1>
        <p>This demonstrates the enhanced Pullup component with Google Maps-style features.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h3>Pullup Controls</h3>
            <div>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={e => setIsOpen(e.target.checked)}
                />{' '}
                Is Open
              </label>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={isPersistent}
                  onChange={e => setIsPersistent(e.target.checked)}
                />{' '}
                Is Persistent
              </label>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={enableSnapPoints}
                  onChange={e => setEnableSnapPoints(e.target.checked)}
                />{' '}
                Enable Snap Points
              </label>
            </div>
          </div>

          <div>
            <h3>Active Tab</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <button
                onClick={() => setActiveTab('notes')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'notes' ? '#0088ff' : '#eee',
                  color: activeTab === 'notes' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Notes
              </button>

              <button
                onClick={() => setActiveTab('quotes')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'quotes' ? '#0088ff' : '#eee',
                  color: activeTab === 'quotes' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Quotes
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'settings' ? '#0088ff' : '#eee',
                  color: activeTab === 'settings' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Settings
              </button>

              <button
                onClick={() => setActiveTab('search')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'search' ? '#0088ff' : '#eee',
                  color: activeTab === 'search' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Height: {height}px</h3>
          <input
            type="range"
            min={100}
            max={600}
            value={height}
            onChange={e => setHeight(parseInt(e.target.value))}
            style={{ width: '100%', maxWidth: '400px' }}
          />
        </div>

        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '10px 20px',
              background: '#0088ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            {isOpen ? 'Close Pullup' : 'Open Pullup'}
          </button>
        </div>

        {selectedSearchResult && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#f9f9f9',
            }}
          >
            <h3>Selected Search Result</h3>
            <p>
              <strong>Reference:</strong> {selectedSearchResult.reference}
            </p>
            <p>
              <strong>Content:</strong>{' '}
              {selectedSearchResult.fullContent || selectedSearchResult.content}
            </p>
          </div>
        )}
      </div>

      <Pullup
        isOpen={isOpen}
        activeTab={activeTab}
        height={height}
        isPersistent={isPersistent}
        enableSnapPoints={enableSnapPoints}
        onClose={() => setIsOpen(false)}
        onTabSelect={setActiveTab}
        onHeightChange={setHeight}
        notes={notes}
        onNoteUpdate={handleNoteUpdate}
        onNoteDelete={handleNoteDelete}
        quotes={quotes}
        onQuoteDelete={handleQuoteDelete}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onSearch={mockSearch}
        onSearchResultSelect={handleSearchResultSelect}
        minHeight={100}
        maxHeight={600}
      />
    </div>
  );
};

