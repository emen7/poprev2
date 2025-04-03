/**
 * Notes Panel Component
 *
 * This component displays a panel for viewing and editing notes.
 * It shows the highlighted text and provides an editor for the note.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useNotation } from '../hooks';
import { NoteEditor } from './NoteEditor';
import { TagInput } from './TagInput';
import { Note } from '../models';

interface NotesPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Callback function called when the panel is closed
   */
  onClose: () => void;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * NotesPanel Component
 */
export function NotesPanel({ isOpen, onClose, className = '' }: NotesPanelProps) {
  // Get notation context
  const notation = useNotation();

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Get active highlight and note
  const activeHighlight = notation.activeHighlight
    ? notation.highlights.find(h => h.id === notation.activeHighlight)
    : null;

  const activeNote: Note | null = notation.activeNote
    ? notation.notes.find(n => n.id === notation.activeNote) || null
    : activeHighlight?.noteId
    ? notation.notes.find(n => n.id === activeHighlight.noteId) || null
    : null;

  // Reset editing mode when active highlight changes
  useEffect(() => {
    setIsEditing(activeNote === null);
  }, [notation.activeHighlight, activeNote]);

  // Handle save note
  const handleSaveNote = (content: string, formatting?: any) => {
    if (activeHighlight) {
      if (activeNote) {
        // Update existing note
        notation.updateNote(activeNote.id, { content, formatting });
      } else {
        // Create new note
        notation.addNote({
          highlightId: activeHighlight.id,
          content,
          formatting,
        });
      }
    }

    // Exit editing mode
    setIsEditing(false);
  };

  // Handle delete note
  const handleDeleteNote = () => {
    if (activeNote) {
      notation.removeNote(activeNote.id);
    }

    // Exit editing mode
    setIsEditing(false);
  };

  // Handle edit note
  const handleEditNote = () => {
    setIsEditing(true);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);

    // If there's no note, close the panel
    if (!activeNote) {
      onClose();
    }
  };

  // Handle tags change
  const handleTagsChange = (tags: string[]) => {
    if (activeHighlight) {
      notation.updateHighlight(activeHighlight.id, { tags });
    }
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // If panel is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`notes-panel ${isOpen ? 'open' : ''} ${className}`}>
      <div className="notes-panel-header">
        <h2 className="notes-panel-title">{activeNote ? 'Edit Note' : 'Add Note'}</h2>

        <button className="notes-panel-close" onClick={onClose} title="Close">
          <span className="sr-only">Close</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      {activeHighlight && (
        <div className="notes-panel-highlight">
          <div className="notes-panel-highlight-header">
            <span className={`notes-panel-highlight-color ${activeHighlight.color}`}></span>
            <span className="notes-panel-highlight-paper">
              Paper {activeHighlight.paperNumber}, Section {activeHighlight.sectionId}
            </span>
          </div>

          <div className="notes-panel-highlight-text">"{activeHighlight.selectedText}"</div>

          {/* Tags Input */}
          <div className="notes-panel-tags">
            <h3 className="notes-panel-tags-title">Tags</h3>
            <TagInput
              tags={activeHighlight.tags}
              onTagsChange={handleTagsChange}
              placeholder="Add tags (e.g., important, review, question)"
            />
          </div>
        </div>
      )}

      {isEditing ? (
        <NoteEditor note={activeNote} onSave={handleSaveNote} onCancel={handleCancelEdit} />
      ) : (
        activeNote && (
          <div className="notes-panel-note">
            <div className="notes-panel-note-header">
              <span className="notes-panel-note-date">{formatDate(activeNote.updatedAt)}</span>

              <div className="notes-panel-note-actions">
                <button className="notes-panel-note-edit" onClick={handleEditNote} title="Edit">
                  <span className="sr-only">Edit</span>
                  <span aria-hidden="true">✎</span>
                </button>

                <button
                  className="notes-panel-note-delete"
                  onClick={handleDeleteNote}
                  title="Delete"
                >
                  <span className="sr-only">Delete</span>
                  <span aria-hidden="true">🗑</span>
                </button>
              </div>
            </div>

            <div className="notes-panel-note-content">
              {activeNote.content.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default NotesPanel;
