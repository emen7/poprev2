'use client';

import React, { useState, useCallback, useEffect } from &apos;react';

import { usePullup } from '../../contexts/PullupContext';

import { BatchOperationsToolbar } from './BatchOperationsToolbar';
import type { Note } from './types';
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
  sortOrder?: &apos;entry' | &apos;paper';

  /**
   * Function called when the sort order is changed
   */
  onSortOrderChange?: (sortOrder: &apos;entry' | &apos;paper') => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Function called when a new note should be added, passing the new note's ID
   */
  onNoteAdd?: (newNoteId: string) => void;

  /**
   * ID of a note that was just added and should be edited immediately
   */
  justAddedNoteId?: string | null;

  /**
   * Callback to notify parent that editing has started for the just added note
   */
  onEditStarted?: () => void;
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
  sortOrder = &apos;entry',
  onSortOrderChange,
  className = '',
  onNoteAdd,
  justAddedNoteId, // Destructure new props
  onEditStarted,
}: NotesTabProps) {
  // State for tracking which note is being edited
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // State for tracking the content of the note being edited
  const [editingContent, setEditingContent] = useState<string>('');

  // State for tracking selected notes
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  // Reset selection when notes change
  useEffect(() => {
    setSelectedNotes([]);
  }, [notes]);

  // Effect to automatically enter edit mode for a newly added note
  useEffect(() => {
    if (justAddedNoteId && notes.some(note => note.id === justAddedNoteId)) {
      const newNote = notes.find(note => note.id === justAddedNoteId);
      if (newNote) {
        setEditingNoteId(newNote.id);
        setEditingContent(newNote.content); // Start with empty content
        if (onEditStarted) {
          onEditStarted(); // Notify parent to reset justAddedNoteId
        }
      }
    }
  }, [justAddedNoteId, notes, onEditStarted]);

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

  // Handle note selection
  const handleNoteSelect = (note: Note, isSelected: boolean) => {
    if (isSelected) {
      setSelectedNotes([...selectedNotes, note]);
    } else {
      setSelectedNotes(selectedNotes.filter(n => n.id !== note.id));
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    setSelectedNotes([...notes]);
  };

  // Handle deselect all
  const handleDeselectAll = () => {
    setSelectedNotes([]);
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    if (selectedNotes.length === 0) return;

    try {
      // Format notes for clipboard
      const formattedNotes = selectedNotes
        .map(note => {
          const text = note.selectedText ? `"${note.selectedText}"` : '';
          return `${text}\n${note.content}\n${note.reference}\n`;
        })
        .join('\n---\n\n');

      await navigator.clipboard.writeText(formattedNotes);

      // Show success message
      alert('Notes copied to clipboard');
    } catch (error) {
      console.error('Failed to copy notes to clipboard:', error);
      alert('Failed to copy notes to clipboard');
    }
  }, [selectedNotes]);

  // Handle delete selected
  const handleDeleteSelected = useCallback(() => {
    if (selectedNotes.length === 0) return;

    // Confirm deletion
    if (window.confirm(`Are you sure you want to delete ${selectedNotes.length} note(s)?`)) {
      // Delete each selected note
      selectedNotes.forEach(note => {
        if (onNoteDelete) {
          onNoteDelete(note.id);
        }
      });

      // Clear selection
      setSelectedNotes([]);
    }
  }, [selectedNotes, onNoteDelete]);

  // Handle sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value as &apos;entry' | &apos;paper';
    if (onSortOrderChange) {
      onSortOrderChange(newSortOrder);
    }
  };

  // Sort notes based on sort order
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOrder === &apos;entry') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by paper reference
      return a.reference.localeCompare(b.reference);
    }
  });

  // Handle add new note button click
  const handleAddNewNote = () => {
    if (onNoteAdd) {
      // We expect the parent to call onNoteAdd and provide the new ID
      // For now, we just call it. The parent needs to handle this
      // A better approach might be needed here.
      onNoteAdd('temp-new-id'); // Placeholder call, parent needs to handle this
      // Ideally, the parent calls back with the real ID to set editingNoteId
    }
  };

  // Determine container classes
  const containerClasses = ['notes-tab', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Header with sort controls */}
      <div className="notes-tab-header">
        <h3 className="notes-tab-title">Notes</h3>
        <button className="add-note-button" onClick={handleAddNewNote}>
          + Add Note
        </button>
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

      {/* Batch operations toolbar */}
      {notes.length > 0 && (
        <BatchOperationsToolbar
          selectedNotes={selectedNotes}
          onCopyToClipboard={handleCopyToClipboard}
          onDeleteSelected={handleDeleteSelected}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          totalNotes={notes.length}
        />
      )}

      {/* Notes list */}
      {sortedNotes.length === 0 ? (
        <div className="notes-tab-empty">
          <p>No notes yet. Select text in the document and choose &quot;Add Note" to create one.</p>
        </div>
      ) : (
        <div className="notes-list">
          {sortedNotes.map(note => (
            <div key={note.id} className="note-item">
              <div className="note-header">
                <div className="note-selection">
                  <input
                    type="checkbox"
                    checked={selectedNotes.some(n => n.id === note.id)}
                    onChange={e => handleNoteSelect(note, e.target.checked)}
                    className="note-checkbox"
                    aria-label={`Select note ${note.reference}`}
                  />
                </div>
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
