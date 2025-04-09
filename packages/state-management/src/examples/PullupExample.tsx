import React from 'react';
import { usePullup } from '../hooks/usePullup';
import { useNotes } from '../hooks/useNotes';

/**
 * Example component demonstrating the use of the usePullup hook
 */
export function PullupExample() {
  const {
    isOpen,
    activeTab,
    height,
    isPersistent,
    openPullup,
    closePullup,
    togglePullup,
    setActiveTab,
    setHeight,
  } = usePullup();

  const { notes, quotes, addNote, addQuote } = useNotes();

  const handleAddNote = () => {
    addNote({
      content: `Example note created at ${new Date().toLocaleTimeString()}`,
      paragraphId: 'p1s1',
      reference: 'Paper 1:1. Introduction',
      tags: ['example'],
    });

    // Open the pullup to the notes tab
    openPullup('notes');
  };

  const handleAddQuote = () => {
    addQuote({
      content: `Example quote created at ${new Date().toLocaleTimeString()}`,
      paragraphId: 'p1s1',
      reference: 'Paper 1:1. Introduction',
    });

    // Open the pullup to the quotes tab
    openPullup('quotes');
  };

  return (
    <div className="pullup-example">
      <h2>Pullup Example</h2>

      <div className="pullup-controls">
        <button
          onClick={togglePullup}
          aria-label={isOpen ? 'Close pullup' : 'Open pullup'}
          aria-expanded={isOpen}
        >
          {isOpen ? 'Close Pullup' : 'Open Pullup'}
        </button>

        <div className="tab-buttons">
          <button
            className={activeTab === 'notes' ? 'active' : ''}
            onClick={() => setActiveTab('notes')}
            aria-selected={activeTab === 'notes'}
          >
            Notes ({notes.length})
          </button>

          <button
            className={activeTab === 'quotes' ? 'active' : ''}
            onClick={() => setActiveTab('quotes')}
            aria-selected={activeTab === 'quotes'}
          >
            Quotes ({quotes.length})
          </button>

          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
            aria-selected={activeTab === 'settings'}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="pullup-state">
        <h3>Current State</h3>
        <ul>
          <li>Pullup Open: {isOpen ? 'Yes' : 'No'}</li>
          <li>Active Tab: {activeTab}</li>
          <li>Height: {height}px</li>
          <li>Persistent Mode: {isPersistent ? 'Yes' : 'No'}</li>
          <li>Notes Count: {notes.length}</li>
          <li>Quotes Count: {quotes.length}</li>
        </ul>
      </div>

      <div className="pullup-actions">
        <h3>Actions</h3>

        <div className="action-group">
          <h4>Content Actions</h4>
          <div className="button-group">
            <button onClick={handleAddNote}>Add Example Note</button>
            <button onClick={handleAddQuote}>Add Example Quote</button>
          </div>
        </div>

        <div className="action-group">
          <h4>Height Control</h4>
          <div className="button-group">
            <button onClick={() => setHeight(200)}>Small (200px)</button>
            <button onClick={() => setHeight(300)}>Medium (300px)</button>
            <button onClick={() => setHeight(500)}>Large (500px)</button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="pullup-panel-preview"
          style={{
            height: `${height}px`,
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '8px 8px 0 0',
            padding: '16px',
            marginTop: '20px',
          }}
        >
          <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab</h3>

          {activeTab === 'notes' && (
            <div className="notes-preview">
              {notes.length === 0 ? (
                <p>No notes yet. Add a note to see it here.</p>
              ) : (
                <ul>
                  {notes.map(note => (
                    <li key={note.id}>
                      <p>{note.content}</p>
                      <small>
                        {note.reference} - {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="quotes-preview">
              {quotes.length === 0 ? (
                <p>No quotes yet. Add a quote to see it here.</p>
              ) : (
                <ul>
                  {quotes.map(quote => (
                    <li key={quote.id}>
                      <p>"{quote.content}"</p>
                      <small>
                        {quote.reference} - {new Date(quote.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-preview">
              <p>Settings panel content would go here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
