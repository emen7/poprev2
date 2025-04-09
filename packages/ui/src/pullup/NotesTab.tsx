import React, { useState } from 'react';
import './NotesTab.css';

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
   * The ID of the paragraph the note is associated with
   */
  paragraphId: string;

  /**
   * The reference information (Paper:Section.Paragraph)
   */
  reference: string;

  /**
   * The selected text that the note is associated with
   */
  selectedText: string;

  /**
   * Tags associated with the note
   */
  tags?: string[];
}

export interface NotesTabProps {
  /**
   * Array of notes to display
   */
  notes: Note[];

  /**
   * Function called when a note is updated
   */
  onNoteUpdate?: (id: string, content: string) => void;

  /**
   * Function called when a note is deleted
   */
  onNoteDelete?: (id: string) => void;

  /**
   * The sort order for notes
   */
  sortOrder?: 'entry' | 'paper';

  /**
   * Function called when the sort order is changed
   */
  onSortOrderChange?: (sortOrder: 'entry' | 'paper') => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * NotesTab Component
 *
 * A tab for displaying and managing notes in the pullup panel.
 */
export const NotesTab: React.FC<NotesTabProps> = ({
  notes,
  onNoteUpdate,
  onNoteDelete,
  sortOrder = 'entry',
  onSortOrderChange,
  className = '',
}) => {
  // State for the note being edited
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Handle note edit
  const handleNoteEdit = (id: string) => {
    setEditingNoteId(id);
  };

  // Handle note save
  const handleNoteSave = (id: string, content: string) => {
    if (onNoteUpdate) {
      onNoteUpdate(id, content);
    }
    setEditingNoteId(null);
  };

  // Handle note delete
  const handleNoteDelete = (id: string) => {
    if (onNoteDelete) {
      onNoteDelete(id);
    }
  };

  // Handle sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value as 'entry' | 'paper';
    if (onSortOrderChange) {
      onSortOrderChange(newSortOrder);
    }
  };

  // Sort notes based on sort order
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOrder === 'entry') {
      // Sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by paper reference
      return a.reference.localeCompare(b.reference);
    }
  });

  // Determine container classes
  const containerClasses = ['notes-tab', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Header with sort controls */}
      <div className="notes-tab-header">
        <h2 className="notes-tab-title">Notes</h2>
        <div className="notes-tab-controls">
          <label htmlFor="sort-order">Sort by:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="notes-tab-sort"
          >
            <option value="entry">Entry Date</option>
            <option value="paper">Paper Reference</option>
          </select>
        </div>
      </div>

      {/* Notes list */}
      {sortedNotes.length > 0 ? (
        <ul className="notes-list">
          {sortedNotes.map(note => (
            <li key={note.id} className="note-item">
              {/* Note reference and selected text */}
              <div className="note-header">
                <span className="note-reference">{note.reference}</span>
                <div className="note-actions">
                  <button
                    className="note-edit-button"
                    onClick={() => handleNoteEdit(note.id)}
                    aria-label="Edit note"
                  >
                    ✏️
                  </button>
                  <button
                    className="note-delete-button"
                    onClick={() => handleNoteDelete(note.id)}
                    aria-label="Delete note"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Selected text */}
              <div className="note-selected-text">"{note.selectedText}"</div>

              {/* Note content */}
              {editingNoteId === note.id ? (
                <div className="note-editor">
                  <textarea
                    defaultValue={note.content}
                    className="note-textarea"
                    autoFocus
                    onBlur={e => handleNoteSave(note.id, e.target.value)}
                  />
                  <div className="note-editor-actions">
                    <button
                      className="note-save-button"
                      onClick={e => {
                        const textarea = e.currentTarget.parentElement
                          ?.previousElementSibling as HTMLTextAreaElement;
                        if (textarea) {
                          handleNoteSave(note.id, textarea.value);
                        }
                      }}
                    >
                      Save
                    </button>
                    <button className="note-cancel-button" onClick={() => setEditingNoteId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="note-content">
                  {note.content || <em>No note content. Click edit to add a note.</em>}
                </div>
              )}

              {/* Note metadata */}
              <div className="note-metadata">
                <span className="note-date">{new Date(note.updatedAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="notes-empty">
          <p>No notes yet. Select text and choose "note" to add notes.</p>
        </div>
      )}
    </div>
  );
};

export default NotesTab;
