/**
 * Note Editor Component
 *
 * This component provides a simple editor for creating and editing notes.
 * It supports basic formatting like bold, italic, and lists.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Note, NoteFormatting } from '../models';

interface NoteEditorProps {
  /**
   * The note to edit, or null for a new note
   */
  note: Note | null;

  /**
   * Callback function called when the note is saved
   */
  onSave: (content: string, formatting?: NoteFormatting) => void;

  /**
   * Callback function called when the editor is cancelled
   */
  onCancel: () => void;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * NoteEditor Component
 */
export function NoteEditor({ note, onSave, onCancel, className = '' }: NoteEditorProps) {
  // State for note content
  const [content, setContent] = useState('');

  // State for formatting
  const [formatting, setFormatting] = useState<NoteFormatting>({
    bold: [],
    italic: [],
    lists: [],
  });

  // Initialize content and formatting from note
  useEffect(() => {
    if (note) {
      setContent(note.content);
      setFormatting(note.formatting || { bold: [], italic: [], lists: [] });
    } else {
      setContent('');
      setFormatting({ bold: [], italic: [], lists: [] });
    }
  }, [note]);

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Handle save
  const handleSave = () => {
    onSave(content, formatting);
  };

  // Apply bold formatting
  const applyBold = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const textarea = document.getElementById('note-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Add to bold ranges
    const newBold = [...(formatting.bold || []), [start, end] as [number, number]];
    setFormatting({ ...formatting, bold: newBold });

    // Visual feedback
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + `**${selectedText}**` + content.substring(end);

    setContent(newContent);
  };

  // Apply italic formatting
  const applyItalic = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const textarea = document.getElementById('note-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Add to italic ranges
    const newItalic = [...(formatting.italic || []), [start, end] as [number, number]];
    setFormatting({ ...formatting, italic: newItalic });

    // Visual feedback
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + `*${selectedText}*` + content.substring(end);

    setContent(newContent);
  };

  // Add bullet list
  const addBulletList = () => {
    const textarea = document.getElementById('note-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;

    // Insert bullet list template
    const bulletList = '\n• Item 1\n• Item 2\n• Item 3\n';
    const newContent = content.substring(0, cursorPos) + bulletList + content.substring(cursorPos);

    setContent(newContent);

    // Add to lists
    const newList = {
      type: 'bullet' as const,
      items: ['Item 1', 'Item 2', 'Item 3'],
      startIndex: cursorPos + 1, // +1 for the newline
    };

    const newLists = [...(formatting.lists || []), newList];
    setFormatting({ ...formatting, lists: newLists });
  };

  // Add numbered list
  const addNumberedList = () => {
    const textarea = document.getElementById('note-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;

    // Insert numbered list template
    const numberedList = '\n1. Item 1\n2. Item 2\n3. Item 3\n';
    const newContent =
      content.substring(0, cursorPos) + numberedList + content.substring(cursorPos);

    setContent(newContent);

    // Add to lists
    const newList = {
      type: 'numbered' as const,
      items: ['Item 1', 'Item 2', 'Item 3'],
      startIndex: cursorPos + 1, // +1 for the newline
    };

    const newLists = [...(formatting.lists || []), newList];
    setFormatting({ ...formatting, lists: newLists });
  };

  return (
    <div className={`note-editor ${className}`}>
      <div className="note-editor-toolbar">
        <button className="note-editor-button" onClick={applyBold} title="Bold">
          <span className="sr-only">Bold</span>
          <span aria-hidden="true">B</span>
        </button>

        <button className="note-editor-button" onClick={applyItalic} title="Italic">
          <span className="sr-only">Italic</span>
          <span aria-hidden="true">I</span>
        </button>

        <button className="note-editor-button" onClick={addBulletList} title="Bullet List">
          <span className="sr-only">Bullet List</span>
          <span aria-hidden="true">•</span>
        </button>

        <button className="note-editor-button" onClick={addNumberedList} title="Numbered List">
          <span className="sr-only">Numbered List</span>
          <span aria-hidden="true">1.</span>
        </button>
      </div>

      <textarea
        id="note-editor-textarea"
        className="note-editor-textarea"
        value={content}
        onChange={handleContentChange}
        placeholder="Add your notes here..."
      />

      <div className="note-editor-actions">
        <button className="note-editor-cancel" onClick={onCancel}>
          Cancel
        </button>

        <button className="note-editor-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
