import React, { useState, useEffect } from 'react';
import './NotesPanel.css';

export interface Note {
  /**
   * Unique identifier for the note
   */
  id: string;

  /**
   * The content of the note
   */
  content: string;

  /**
   * The timestamp when the note was created
   */
  createdAt: string;

  /**
   * The timestamp when the note was last updated
   */
  updatedAt: string;

  /**
   * The document or section the note is associated with
   */
  reference?: string;

  /**
   * Tags associated with the note
   */
  tags?: string[];
}

export interface NotesPanelProps {
  /**
   * The document ID the notes are associated with
   */
  documentId?: string;

  /**
   * Initial notes to display
   */
  initialNotes?: Note[];

  /**
   * Whether to persist notes in localStorage
   * @default true
   */
  persistNotes?: boolean;

  /**
   * Function to call when notes are updated
   */
  onNotesChange?: (notes: Note[]) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * NotesPanel Component
 *
 * A panel for displaying and managing user notes.
 */
export function NotesPanel({
  documentId = 'default',
  initialNotes = [],
  persistNotes = true,
  onNotesChange,
  className = '',
}: NotesPanelProps) {
  // State for notes
  const [notes, setNotes] = useState<Note[]>(() => {
    // Try to load from localStorage if persistNotes is true
    if (persistNotes) {
      try {
        const storedNotes = localStorage.getItem(`notes-${documentId}`);
        if (storedNotes) {
          return JSON.parse(storedNotes);
        }
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
      }
    }

    // Otherwise use initial notes
    return initialNotes;
  });

  // State for the current note being edited
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  // State for the new note content
  const [newNoteContent, setNewNoteContent] = useState('');

  // Persist notes to localStorage when they change
  useEffect(() => {
    if (persistNotes) {
      try {
        localStorage.setItem(`notes-${documentId}`, JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes to localStorage:', error);
      }
    }

    // Call onNotesChange if provided
    if (onNotesChange) {
      onNotesChange(notes);
    }
  }, [notes, documentId, persistNotes, onNotesChange]);

  /**
   * Add a new note
   */
  const addNote = () => {
    if (!newNoteContent.trim()) return;

    const now = new Date().toISOString();
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: newNoteContent,
      createdAt: now,
      updatedAt: now,
      reference: documentId,
      tags: [],
    };

    setNotes([newNote, ...notes]);
    setNewNoteContent('');
  };

  /**
   * Update an existing note
   */
  const updateNote = (id: string, content: string) => {
    const now = new Date().toISOString();

    setNotes(
      notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            content,
            updatedAt: now,
          };
        }
        return note;
      })
    );

    setCurrentNote(null);
  };

  /**
   * Delete a note
   */
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));

    if (currentNote?.id === id) {
      setCurrentNote(null);
    }
  };

  /**
   * Start editing a note
   */
  const editNote = (note: Note) => {
    setCurrentNote(note);
  };

  /**
   * Cancel editing a note
   */
  const cancelEdit = () => {
    setCurrentNote(null);
  };

  /**
   * Format a date string
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`notes-panel ${className}`}>
      <div className="notes-input-container">
        <textarea
          className="notes-input"
          placeholder="Add a new note..."
          value={newNoteContent}
          onChange={e => setNewNoteContent(e.target.value)}
          rows={3}
        />
        <button className="notes-add-button" onClick={addNote}>
          Add Note
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="notes-empty-state">No notes yet. Add your first note above.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-item">
              {currentNote?.id === note.id ? (
                <div className="note-edit-container">
                  <textarea
                    className="note-edit-input"
                    value={currentNote.content}
                    onChange={e => setCurrentNote({ ...currentNote, content: e.target.value })}
                    rows={4}
                    autoFocus
                  />
                  <div className="note-edit-actions">
                    <button
                      className="note-save-button"
                      onClick={() => updateNote(note.id, currentNote.content)}
                    >
                      Save
                    </button>
                    <button className="note-cancel-button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="note-content">{note.content}</div>
                  <div className="note-meta">
                    <span className="note-date">{formatDate(note.updatedAt)}</span>
                    <div className="note-actions">
                      <button
                        className="note-edit-button"
                        onClick={() => editNote(note)}
                        aria-label="Edit note"
                      >
                        Edit
                      </button>
                      <button
                        className="note-delete-button"
                        onClick={() => deleteNote(note.id)}
                        aria-label="Delete note"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesPanel;
