import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { usePullup } from '../hooks/usePullup';

// CSS styles
const styles = {
  notesExample: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  controlPanel: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  label: {
    fontWeight: 'bold' as const,
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
    fontFamily: 'inherit',
  },
  button: (primary: boolean = false) => ({
    padding: '8px 12px',
    backgroundColor: primary ? '#4CAF50' : '#f0f0f0',
    color: primary ? 'white' : 'inherit',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: primary ? 'bold' : 'normal',
  }),
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  notesList: {
    marginTop: '20px',
  },
  note: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '15px',
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  noteReference: {
    fontSize: '0.9rem',
    color: '#666',
  },
  noteDate: {
    fontSize: '0.8rem',
    color: '#888',
  },
  noteContent: {
    marginBottom: '10px',
  },
  noteTags: {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap' as const,
  },
  tag: {
    padding: '3px 8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    fontSize: '0.8rem',
  },
  noteActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
  },
  sortControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    marginBottom: '20px',
  },
  tab: (active: boolean) => ({
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: active ? '2px solid #4CAF50' : 'none',
    fontWeight: active ? 'bold' : 'normal',
  }),
};

/**
 * Example component demonstrating the use of the useNotes hook
 */
export function NotesExample() {
  const {
    notes,
    quotes,
    documentId,
    sortOrder,
    addNote,
    updateNote,
    deleteNote,
    addQuote,
    deleteQuote,
    setDocumentId,
    setSortOrder,
  } = useNotes();

  const { openPullup } = usePullup();

  const [activeTab, setActiveTab] = useState<'notes' | 'quotes'>('notes');
  const [noteContent, setNoteContent] = useState('');
  const [noteParagraphId, setNoteParagraphId] = useState('');
  const [noteReference, setNoteReference] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [quoteContent, setQuoteContent] = useState('');
  const [quoteParagraphId, setQuoteParagraphId] = useState('');
  const [quoteReference, setQuoteReference] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const handleAddNote = () => {
    if (noteContent && noteParagraphId) {
      addNote({
        content: noteContent,
        paragraphId: noteParagraphId,
        reference: noteReference || `Reference (${noteParagraphId})`,
        tags: noteTags ? noteTags.split(',').map(tag => tag.trim()) : [],
      });

      // Reset form
      setNoteContent('');
      setNoteParagraphId('');
      setNoteReference('');
      setNoteTags('');
    }
  };

  const handleUpdateNote = () => {
    if (editingNoteId && noteContent) {
      updateNote(editingNoteId, noteContent);

      // Reset form
      setNoteContent('');
      setNoteParagraphId('');
      setNoteReference('');
      setNoteTags('');
      setEditingNoteId(null);
    }
  };

  const handleCancelEdit = () => {
    setNoteContent('');
    setNoteParagraphId('');
    setNoteReference('');
    setNoteTags('');
    setEditingNoteId(null);
  };

  const handleEditNote = (note: any) => {
    setNoteContent(note.content);
    setNoteParagraphId(note.paragraphId);
    setNoteReference(note.reference);
    setNoteTags(note.tags ? note.tags.join(', ') : '');
    setEditingNoteId(note.id);
  };

  const handleAddQuote = () => {
    if (quoteContent && quoteParagraphId) {
      addQuote({
        content: quoteContent,
        paragraphId: quoteParagraphId,
        reference: quoteReference || `Reference (${quoteParagraphId})`,
      });

      // Reset form
      setQuoteContent('');
      setQuoteParagraphId('');
      setQuoteReference('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div style={styles.notesExample}>
      <h2>Notes Example</h2>

      <div style={styles.controlPanel}>
        <h3>Document Settings</h3>
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Document ID</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={documentId}
                onChange={e => setDocumentId(e.target.value)}
                placeholder="Enter document ID"
                style={{ ...styles.input, flex: 1 }}
              />
              <button onClick={() => setDocumentId('example-document')} style={styles.button()}>
                Use Example ID
              </button>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Sort Order</label>
            <div style={styles.sortControls}>
              <button
                onClick={() => setSortOrder('entry')}
                style={styles.button(sortOrder === 'entry')}
              >
                Sort by Entry Date
              </button>
              <button
                onClick={() => setSortOrder('paper')}
                style={styles.button(sortOrder === 'paper')}
              >
                Sort by Paper Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.tabs}>
        <div style={styles.tab(activeTab === 'notes')} onClick={() => setActiveTab('notes')}>
          Notes ({notes.length})
        </div>
        <div style={styles.tab(activeTab === 'quotes')} onClick={() => setActiveTab('quotes')}>
          Quotes ({quotes.length})
        </div>
      </div>

      {activeTab === 'notes' && (
        <>
          <div style={styles.controlPanel}>
            <h3>{editingNoteId ? 'Edit Note' : 'Add New Note'}</h3>
            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Content</label>
                <textarea
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  placeholder="Enter note content"
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Paragraph ID</label>
                <input
                  type="text"
                  value={noteParagraphId}
                  onChange={e => setNoteParagraphId(e.target.value)}
                  placeholder="Enter paragraph ID"
                  style={styles.input}
                  disabled={!!editingNoteId}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Reference</label>
                <input
                  type="text"
                  value={noteReference}
                  onChange={e => setNoteReference(e.target.value)}
                  placeholder="Enter reference (optional)"
                  style={styles.input}
                  disabled={!!editingNoteId}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={e => setNoteTags(e.target.value)}
                  placeholder="Enter tags (optional)"
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonGroup}>
                {editingNoteId ? (
                  <>
                    <button onClick={handleUpdateNote} style={styles.button(true)}>
                      Update Note
                    </button>
                    <button onClick={handleCancelEdit} style={styles.button()}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddNote}
                    style={styles.button(true)}
                    disabled={!noteContent || !noteParagraphId}
                  >
                    Add Note
                  </button>
                )}
              </div>
            </div>
          </div>

          <div style={styles.notesList}>
            <h3>Notes</h3>
            {notes.length === 0 ? (
              <p>No notes yet. Add your first note above.</p>
            ) : (
              notes.map(note => (
                <div key={note.id} style={styles.note}>
                  <div style={styles.noteHeader}>
                    <div style={styles.noteReference}>{note.reference}</div>
                    <div style={styles.noteDate}>
                      Created: {formatDate(note.createdAt)}
                      {note.updatedAt !== note.createdAt &&
                        ` (Updated: ${formatDate(note.updatedAt)})`}
                    </div>
                  </div>

                  <div style={styles.noteContent}>{note.content}</div>

                  {note.tags && note.tags.length > 0 && (
                    <div style={styles.noteTags}>
                      {note.tags.map((tag, index) => (
                        <span key={index} style={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={styles.noteActions}>
                    <button onClick={() => handleEditNote(note)} style={styles.button()}>
                      Edit
                    </button>
                    <button onClick={() => deleteNote(note.id)} style={styles.button()}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === 'quotes' && (
        <>
          <div style={styles.controlPanel}>
            <h3>Add New Quote</h3>
            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Content</label>
                <textarea
                  value={quoteContent}
                  onChange={e => setQuoteContent(e.target.value)}
                  placeholder="Enter quote content"
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Paragraph ID</label>
                <input
                  type="text"
                  value={quoteParagraphId}
                  onChange={e => setQuoteParagraphId(e.target.value)}
                  placeholder="Enter paragraph ID"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Reference</label>
                <input
                  type="text"
                  value={quoteReference}
                  onChange={e => setQuoteReference(e.target.value)}
                  placeholder="Enter reference (optional)"
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={handleAddQuote}
                  style={styles.button(true)}
                  disabled={!quoteContent || !quoteParagraphId}
                >
                  Add Quote
                </button>
              </div>
            </div>
          </div>

          <div style={styles.notesList}>
            <h3>Quotes</h3>
            {quotes.length === 0 ? (
              <p>No quotes yet. Add your first quote above.</p>
            ) : (
              quotes.map(quote => (
                <div key={quote.id} style={styles.note}>
                  <div style={styles.noteHeader}>
                    <div style={styles.noteReference}>{quote.reference}</div>
                    <div style={styles.noteDate}>Created: {formatDate(quote.createdAt)}</div>
                  </div>

                  <div style={styles.noteContent}>"{quote.content}"</div>

                  <div style={styles.noteActions}>
                    <button onClick={() => deleteQuote(quote.id)} style={styles.button()}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
