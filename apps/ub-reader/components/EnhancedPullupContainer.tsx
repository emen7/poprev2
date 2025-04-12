'use client';

import React, { useState, useEffect } from 'react';
import { PullupPanel } from './pullup/PullupPanel';
import { EnhancedSettingsPanel } from './EnhancedSettingsPanel';
import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';

// Define the Note type
interface Note {
  id: string;
  paragraphNumber: number;
  content: string;
  createdAt: string;
}

// Define the Quote type
interface Quote {
  id: string;
  text: string;
  source: string;
  paragraphNumber: number;
  createdAt: string;
}

/**
 * EnhancedPullupContainer Component
 *
 * This component connects the pullup UI components with the state management.
 * It provides a bottom panel with tabs for Notes, Quotes, and Settings.
 */
export const EnhancedPullupContainer: React.FC = () => {
  // State for pullup
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'quotes' | 'settings'>('notes');
  const [height, setHeight] = useState(300);
  const [isPersistent, setIsPersistent] = useState(false);

  // State for settings panel
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // State for notes
  const [notes, setNotes] = useState<Note[]>([]);

  // State for quotes
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Get preferences
  const { preferences } = useExtendedUserPreferences();

  // Load notes and quotes from localStorage on component mount
  useEffect(() => {
    const loadedNotes = localStorage.getItem('ub-reader-notes');
    if (loadedNotes) {
      try {
        setNotes(JSON.parse(loadedNotes));
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
      }
    }

    const loadedQuotes = localStorage.getItem('ub-reader-quotes');
    if (loadedQuotes) {
      try {
        setQuotes(JSON.parse(loadedQuotes));
      } catch (error) {
        console.error('Error loading quotes from localStorage:', error);
      }
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ub-reader-notes', JSON.stringify(notes));
  }, [notes]);

  // Save quotes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ub-reader-quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Open pullup
  const openPullup = (tab: 'notes' | 'quotes' | 'settings' = 'notes') => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  // Close pullup
  const closePullup = () => {
    setIsOpen(false);
  };

  // Toggle settings panel
  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  // Handle note update
  const handleNoteUpdate = (id: string, content: string) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, content, createdAt: new Date().toISOString() } : note
      )
    );
  };

  // Handle note delete
  const handleNoteDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Handle quote delete
  const handleQuoteDelete = (id: string) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  // Handle note creation
  const handleNoteCreate = (note: Note) => {
    setNotes([note, ...notes]);
    openPullup('notes');
  };

  // Handle quote creation
  const handleQuoteCreate = (quote: Quote) => {
    setQuotes([quote, ...quotes]);
    openPullup('quotes');
  };

  return (
    <>
      {/* Pullup Panel */}
      <PullupPanel
        isOpen={isOpen}
        height={height}
        isPersistent={isPersistent}
        onClose={closePullup}
        onHeightChange={setHeight}
      >
        {/* Pullup Tabs */}
        <div className="pullup-tabs">
          <button
            className={`pullup-tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button
            className={`pullup-tab ${activeTab === 'quotes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            Quotes
          </button>
          <button
            className={`pullup-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Pullup Content */}
        <div className="pullup-content">
          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="notes-tab">
              {notes.length === 0 ? (
                <div className="empty-state">
                  <p>No notes yet. Select text and choose "Add Note" to create one.</p>
                </div>
              ) : (
                <div className="notes-list">
                  {notes.map(note => (
                    <div key={note.id} className="note-item">
                      <div className="note-header">
                        <span className="note-paragraph">Paragraph {note.paragraphNumber}</span>
                        <button
                          className="note-delete"
                          onClick={() => handleNoteDelete(note.id)}
                          aria-label="Delete note"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea
                        className="note-content"
                        value={note.content}
                        onChange={e => handleNoteUpdate(note.id, e.target.value)}
                      />
                      <div className="note-footer">
                        <span className="note-date">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div className="quotes-tab">
              {quotes.length === 0 ? (
                <div className="empty-state">
                  <p>No quotes yet. Select text and choose "Add Quote" to create one.</p>
                </div>
              ) : (
                <div className="quotes-list">
                  {quotes.map(quote => (
                    <div key={quote.id} className="quote-item">
                      <div className="quote-header">
                        <span className="quote-source">{quote.source}</span>
                        <button
                          className="quote-delete"
                          onClick={() => handleQuoteDelete(quote.id)}
                          aria-label="Delete quote"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="quote-text">{quote.text}</div>
                      <div className="quote-footer">
                        <span className="quote-paragraph">Paragraph {quote.paragraphNumber}</span>
                        <span className="quote-date">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-controls">
                <div className="settings-section">
                  <h3>Display Options</h3>
                  <div className="settings-row">
                    <label>
                      <input
                        type="checkbox"
                        checked={preferences.reader.showParagraphNumbers}
                        onChange={() => {
                          // This is handled by the EnhancedSettingsPanel
                        }}
                      />
                      Show paragraph numbers
                    </label>
                  </div>
                  <div className="settings-row">
                    <label>
                      <input
                        type="checkbox"
                        checked={preferences.reader.showNoteIndicators}
                        onChange={() => {
                          // This is handled by the EnhancedSettingsPanel
                        }}
                      />
                      Show note indicators
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Advanced Settings</h3>
                  <button className="settings-button" onClick={toggleSettingsPanel}>
                    Open Settings Panel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </PullupPanel>

      {/* Settings Panel */}
      <EnhancedSettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
      />

      {/* Styles */}
      <style jsx>{`
        .pullup-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color, #ddd);
        }

        .pullup-tab {
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--tab-color, #666);
        }

        .pullup-tab.active {
          border-bottom-color: var(--tab-active-color, #007bff);
          color: var(--tab-active-text-color, #007bff);
        }

        .pullup-content {
          padding: 1rem;
          overflow-y: auto;
          height: calc(100% - 3rem);
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: var(--empty-state-color, #999);
          text-align: center;
          padding: 2rem;
        }

        .notes-list,
        .quotes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .note-item,
        .quote-item {
          border: 1px solid var(--item-border-color, #ddd);
          border-radius: 4px;
          overflow: hidden;
        }

        .note-header,
        .quote-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background-color: var(--item-header-background, #f5f5f5);
          border-bottom: 1px solid var(--item-border-color, #ddd);
        }

        .note-paragraph,
        .quote-source {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .note-delete,
        .quote-delete {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--delete-button-color, #999);
        }

        .note-delete:hover,
        .quote-delete:hover {
          color: var(--delete-button-hover-color, #666);
        }

        .note-content {
          width: 100%;
          min-height: 100px;
          padding: 0.75rem;
          border: none;
          resize: vertical;
          font-family: inherit;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .quote-text {
          padding: 0.75rem;
          font-style: italic;
          line-height: 1.5;
        }

        .note-footer,
        .quote-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background-color: var(--item-footer-background, #f9f9f9);
          border-top: 1px solid var(--item-border-color, #ddd);
          font-size: 0.8rem;
          color: var(--footer-text-color, #999);
        }

        .settings-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .settings-section {
          border-bottom: 1px solid var(--section-border-color, #eee);
          padding-bottom: 1rem;
        }

        .settings-section h3 {
          margin: 0 0 0.75rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .settings-row {
          margin-bottom: 0.5rem;
        }

        .settings-row label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .settings-button {
          padding: 0.5rem 1rem;
          background-color: var(--button-background, #007bff);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .settings-button:hover {
          background-color: var(--button-hover-background, #0069d9);
        }

        /* Dark mode styles */
        :global(.dark-theme) .pullup-tab {
          color: var(--tab-color-dark, #aaa);
        }

        :global(.dark-theme) .pullup-tab.active {
          border-bottom-color: var(--tab-active-color-dark, #3498db);
          color: var(--tab-active-text-color-dark, #3498db);
        }

        :global(.dark-theme) .note-header,
        :global(.dark-theme) .quote-header {
          background-color: var(--item-header-background-dark, #333);
          border-bottom-color: var(--item-border-color-dark, #444);
        }

        :global(.dark-theme) .note-item,
        :global(.dark-theme) .quote-item {
          border-color: var(--item-border-color-dark, #444);
        }

        :global(.dark-theme) .note-content {
          background-color: var(--content-background-dark, #222);
          color: var(--content-text-color-dark, #eee);
        }

        :global(.dark-theme) .note-footer,
        :global(.dark-theme) .quote-footer {
          background-color: var(--item-footer-background-dark, #2a2a2a);
          border-top-color: var(--item-border-color-dark, #444);
          color: var(--footer-text-color-dark, #888);
        }

        :global(.dark-theme) .settings-section {
          border-bottom-color: var(--section-border-color-dark, #333);
        }

        :global(.dark-theme) .settings-button {
          background-color: var(--button-background-dark, #3498db);
        }

        :global(.dark-theme) .settings-button:hover {
          background-color: var(--button-hover-background-dark, #2980b9);
        }
      `}</style>
    </>
  );
};

export default EnhancedPullupContainer;
