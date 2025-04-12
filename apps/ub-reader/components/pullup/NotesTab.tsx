'use client';

import React, { useState } from 'react';

import { Note } from './types';
import './NotesTab.css';

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
 * A tab for displaying and managing notes.
 */
export function NotesTab({
  notes,
  onNoteUpdate,
  onNoteDelete,
  sortOrder = 'entry',
  onSortOrderChange,
  className = '',
}: NotesTabProps) {
  // State for tracking which note is being edited
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // State for tracking the content of the note being edited
  const [editingContent, setEditingContent] = useState<string>('');

  // Handle edit button click
  const handleEditClick = (note: Note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  // Handle save button click
  const handleSaveClick = (id: string) => {
    if (onNoteUpdate) {
      onNoteUpdate(id, editingContent);
    }
    setEditingNoteId(null);
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setEditingNoteId(null);
  };

  // Handle delete button click
  const handleDeleteClick = (id: string) => {
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
        <h3 className="notes-tab-title">Notes</h3>
        <div className="notes-tab-sort">
          <label htmlFor="notes-sort">Sort by:</label>
          <select
            id="notes-sort"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="notes-tab-sort-select"
          >
            <option value="entry">Date Added</option>
            <option value="paper">Paper Reference</option>
          </select>
        </div>
      </div>

      {/* Notes list */}
      {sortedNotes.length === 0 ? (
        <div className="notes-tab-empty">
          <p>No notes yet. Select text in the document and choose "Add Note" to create one.</p>
        </div>
      ) : (
        <div className="notes-list">
          {sortedNotes.map(note => (
            <div key={note.id} className="note-item">
              <div className="note-header">
                <div className="note-reference">{note.reference}</div>
                <div className="note-actions">
                  {editingNoteId === note.id ? (
                    <>
                      <button
                        className="note-action-button note-save-button"
                        onClick={() => handleSaveClick(note.id)}
                        title="Save"
                      >
                        Save
                      </button>
                      <button
                        className="note-action-button note-cancel-button"
                        onClick={handleCancelClick}
                        title="Cancel"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="note-action-button note-edit-button"
                        onClick={() => handleEditClick(note)}
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        className="note-action-button note-delete-button"
                        onClick={() => handleDeleteClick(note.id)}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {note.selectedText && <div className="note-selected-text">"{note.selectedText}"</div>}

              {editingNoteId === note.id ? (
                <textarea
                  className="note-edit-textarea"
                  value={editingContent}
                  onChange={e => setEditingContent(e.target.value)}
                  autoFocus
                />
              ) : (
                <div className="note-content">{note.content}</div>
              )}

              <div className="note-date">
                {new Date(note.updatedAt).toLocaleDateString()}{' '}
                {new Date(note.updatedAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesTab;
