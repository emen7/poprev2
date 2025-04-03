/**
 * Notation Manager Component
 *
 * This component integrates all the notation system components
 * and provides a unified interface for highlighting and notes.
 */

'use client';

import React, { useState, useRef } from 'react';
import { useNotation } from '../hooks';
import { TextSelection, HighlightColor } from '../models';
import { createHighlightFromSelection } from '../utils';
import { TextSelectionHandler } from './TextSelectionHandler';
import { SelectionMenu } from './SelectionMenu';
import { HighlightRenderer } from './HighlightRenderer';
import { NotesPanel } from './NotesPanel';
import { CollectionManager } from './CollectionManager';
import { SearchPanel } from './SearchPanel';

interface NotationManagerProps {
  /**
   * Paper number for the current document
   */
  paperNumber: number;

  /**
   * Section ID for the current section
   */
  sectionId: string;

  /**
   * Children to render within the notation manager
   */
  children: React.ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * NotationManager Component
 */
export function NotationManager({
  paperNumber,
  sectionId,
  children,
  className = '',
}: NotationManagerProps) {
  // Get notation context
  const notation = useNotation();

  // State for current text selection
  const [selection, setSelection] = useState<TextSelection | null>(null);

  // State for collection manager
  const [isCollectionManagerOpen, setIsCollectionManagerOpen] = useState(false);

  // State for search panel
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);

  // Reference to the content container
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle text selection
  const handleSelection = (newSelection: TextSelection | null) => {
    setSelection(newSelection);
  };

  // Handle highlight creation
  const handleHighlight = (color: HighlightColor) => {
    if (!selection || !containerRef.current) return;

    // Create highlight from selection
    const highlightData = createHighlightFromSelection(selection, color, containerRef.current);

    if (highlightData) {
      // Add highlight to notation system
      notation.addHighlight(highlightData);

      // Clear selection
      setSelection(null);
    }
  };

  // Handle note creation
  const handleAddNote = () => {
    if (!selection || !containerRef.current) return;

    // Create highlight from selection (using yellow as default color)
    const highlightData = createHighlightFromSelection(selection, 'yellow', containerRef.current);

    if (highlightData) {
      // Add highlight to notation system
      const highlightId = notation.addHighlight(highlightData);

      // Set as active highlight
      notation.setActiveHighlight(highlightId);

      // Open note panel
      notation.openNotePanel();

      // Clear selection
      setSelection(null);
    }
  };

  // Handle copy text
  const handleCopy = () => {
    if (!selection) return;

    // Copy text to clipboard
    navigator.clipboard
      .writeText(selection.text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });

    // Clear selection
    setSelection(null);
  };

  // Handle highlight click
  const handleHighlightClick = (id: string) => {
    // Set as active highlight
    notation.setActiveHighlight(id);

    // If highlight has a note, set it as active note
    const highlight = notation.highlights.find(h => h.id === id);
    if (highlight && highlight.noteId) {
      notation.setActiveNote(highlight.noteId);
    }

    // Open note panel
    notation.openNotePanel();
  };

  // Handle note panel close
  const handleNotePanelClose = () => {
    notation.closeNotePanel();
    notation.setActiveHighlight(null);
    notation.setActiveNote(null);
  };

  // Handle collection manager open
  const handleCollectionManagerOpen = () => {
    setIsCollectionManagerOpen(true);
  };

  // Handle collection manager close
  const handleCollectionManagerClose = () => {
    setIsCollectionManagerOpen(false);
  };

  // Handle search panel open
  const handleSearchPanelOpen = () => {
    setIsSearchPanelOpen(true);
  };

  // Handle search panel close
  const handleSearchPanelClose = () => {
    setIsSearchPanelOpen(false);
  };

  // Get highlights for current paper and section
  const currentHighlights = notation.highlights.filter(
    h => h.paperNumber === paperNumber && h.sectionId === sectionId
  );

  return (
    <div className={`notation-manager ${className}`}>
      {/* Text Selection Handler */}
      <TextSelectionHandler
        onSelection={handleSelection}
        paperNumber={paperNumber}
        sectionId={sectionId}
      >
        {/* Content Container */}
        <div ref={containerRef} className="notation-content">
          {children}
        </div>
      </TextSelectionHandler>

      {/* Highlight Renderer */}
      <HighlightRenderer
        highlights={currentHighlights}
        onHighlightClick={handleHighlightClick}
        containerRef={containerRef}
      />

      {/* Selection Menu */}
      <SelectionMenu
        selection={selection}
        onHighlight={handleHighlight}
        onAddNote={handleAddNote}
        onCopy={handleCopy}
        onCancel={() => setSelection(null)}
      />

      {/* Notes Panel */}
      <NotesPanel isOpen={notation.isNotePanelOpen} onClose={handleNotePanelClose} />

      {/* Collection Manager */}
      <CollectionManager isOpen={isCollectionManagerOpen} onClose={handleCollectionManagerClose} />

      {/* Search Panel */}
      <SearchPanel
        isOpen={isSearchPanelOpen}
        onClose={handleSearchPanelClose}
        onHighlightClick={handleHighlightClick}
        onNoteClick={noteId => {
          const note = notation.notes.find(n => n.id === noteId);
          if (note) {
            notation.setActiveNote(noteId);
            notation.setActiveHighlight(note.highlightId);
            notation.openNotePanel();
          }
        }}
      />

      {/* Floating Action Buttons */}
      <div className="notation-fab-container">
        <button
          className="notation-fab notation-fab-collections"
          onClick={handleCollectionManagerOpen}
          title="Collections"
        >
          <span className="sr-only">Collections</span>
          <span aria-hidden="true">📚</span>
        </button>

        <button
          className="notation-fab notation-fab-search"
          onClick={handleSearchPanelOpen}
          title="Search"
        >
          <span className="sr-only">Search</span>
          <span aria-hidden="true">🔍</span>
        </button>
      </div>
    </div>
  );
}

export default NotationManager;
