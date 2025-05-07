import React, { useState, useEffect, useRef } from 'react';
import './NoteEditor.css';

export interface NoteEditorProps {
  /**
   * Whether the editor is visible
   */
  isVisible: boolean;
  
  /**
   * Initial note text
   */
  initialText?: string;
  
  /**
   * Selected text that the note is associated with
   */
  selectedText?: string;
  
  /**
   * Handler for when the note is saved
   */
  onSave?: (noteText: string) => void;
  
  /**
   * Handler for when the editor is closed without saving
   */
  onCancel?: () => void;
  
  /**
   * Handler for when the note is deleted
   */
  onDelete?: () => void;
  
  /**
   * Whether to show the delete button
   * @default false
   */
  showDeleteButton?: boolean;
  
  /**
   * CSS class name for the editor container
   */
  className?: string;
}

/**
 * NoteEditor Component
 * 
 * A component for creating and editing notes.
 */
export const NoteEditor: React.FC<NoteEditorProps> = ({
  isVisible,
  initialText = '',
  selectedText = '',
  onSave,
  onCancel,
  onDelete,
  showDeleteButton = false,
  className = '',
}) => {
  const [noteText, setNoteText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Focus the textarea when the editor becomes visible
  useEffect(() => {
    if (isVisible && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isVisible]);
  
  // Reset note text when initialText changes
  useEffect(() => {
    setNoteText(initialText);
  }, [initialText]);
  
  // Handle click outside the editor
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node) && isVisible) {
        onCancel?.();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onCancel]);
  
  // Handle save
  const handleSave = () => {
    onSave?.(noteText);
  };
  
  // Handle cancel
  const handleCancel = () => {
    onCancel?.();
  };
  
  // Handle delete
  const handleDelete = () => {
    onDelete?.();
  };
  
  // If editor is not visible, don't render anything
  if (!isVisible) {
    return null;
  }
  
  // Combine class names
  const containerClasses = ['note-editor', className]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div className="note-editor-backdrop">
      <div ref={editorRef} className={containerClasses}>
        <div className="note-editor-header">
          <h3 className="note-editor-title">Add Note</h3>
          <button
            className="note-editor-close-button"
            onClick={handleCancel}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        
        {selectedText && (
          <div className="note-editor-selected-text">
            <p>{selectedText}</p>
          </div>
        )}
        
        <div className="note-editor-content">
          <textarea
            ref={textareaRef}
            className="note-editor-textarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter your note here..."
            rows={5}
          />
        </div>
        
        <div className="note-editor-actions">
          {showDeleteButton && (
            <button
              className="note-editor-delete-button"
              onClick={handleDelete}
              aria-label="Delete"
            >
              Delete
            </button>
          )}
          <button
            className="note-editor-cancel-button"
            onClick={handleCancel}
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            className="note-editor-save-button"
            onClick={handleSave}
            aria-label="Save"
            disabled={!noteText.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
