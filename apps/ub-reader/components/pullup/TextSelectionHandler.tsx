'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePullup } from './PullupContext';
import { Note, Quote } from './types';
import './TextSelectionHandler.css';

export interface TextSelectionHandlerProps {
  /**
   * Function called when a note is created
   */
  onNoteCreate?: (note: Note) => void;

  /**
   * Function called when a quote is created
   */
  onQuoteCreate?: (quote: Quote) => void;
}

/**
 * TextSelectionHandler Component
 *
 * A component that handles text selection and shows a menu with options to create notes or quotes.
 */
export function TextSelectionHandler({ onNoteCreate, onQuoteCreate }: TextSelectionHandlerProps) {
  // State for menu position and visibility
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [paragraphId, setParagraphId] = useState<string>('');
  const [paragraphReference, setParagraphReference] = useState<string>('');

  // Ref for the menu element
  const menuRef = useRef<HTMLDivElement>(null);

  // Get pullup state and actions
  const { openPullup, setActiveTab } = usePullup();

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();

      if (selection && !selection.isCollapsed) {
        // Get selected text
        const text = selection.toString().trim();

        if (text) {
          // Find the paragraph element that contains the selection
          const range = selection.getRangeAt(0);
          const paragraphElement =
            range.commonAncestorContainer.parentElement?.closest('.paragraph');

          if (paragraphElement) {
            // Get paragraph ID and reference
            const id = paragraphElement.getAttribute('data-paragraph-id') || '';

            // Get paragraph number
            const numberElement = paragraphElement.querySelector('.paragraph-number');
            const number = numberElement ? numberElement.textContent || '' : '';

            // Get section title
            const sectionElement = paragraphElement.closest('.section-content');
            const sectionTitleElement = sectionElement?.querySelector('.section-title');
            const sectionTitle = sectionTitleElement ? sectionTitleElement.textContent || '' : '';

            // Get paper title
            const paperTitleElement = document.querySelector('.paper-title');
            const paperTitle = paperTitleElement ? paperTitleElement.textContent || '' : '';

            // Create reference in format "Paper:Section.Paragraph"
            const paperNumber = paperTitle.match(/PAPER (\d+)/)?.[1] || '';
            const sectionNumber = sectionTitle.match(/(\d+)\./)?.[1] || '';
            const reference = `(${paperNumber}:${sectionNumber}.${number})`;

            // Set state
            setSelectedText(text);
            setParagraphId(id);
            setParagraphReference(reference);

            // Calculate menu position
            const rect = range.getBoundingClientRect();
            setMenuPosition({
              x: rect.left + rect.width / 2,
              y: rect.bottom + window.scrollY + 10,
            });
          }
        }
      }
    };

    // Handle click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuPosition(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle create note
  const handleCreateNote = () => {
    if (onNoteCreate && selectedText && paragraphId) {
      const note: Note = {
        id: Date.now().toString(),
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paragraphId,
        reference: paragraphReference,
        selectedText,
      };

      onNoteCreate(note);

      // Open pullup with notes tab
      setActiveTab('notes');
      openPullup('notes');

      // Close menu
      setMenuPosition(null);
    }
  };

  // Handle create quote
  const handleCreateQuote = () => {
    if (onQuoteCreate && selectedText && paragraphId) {
      const quote: Quote = {
        id: Date.now().toString(),
        content: selectedText,
        createdAt: new Date().toISOString(),
        paragraphId,
        reference: paragraphReference,
      };

      onQuoteCreate(quote);

      // Open pullup with quotes tab
      setActiveTab('quotes');
      openPullup('quotes');

      // Close menu
      setMenuPosition(null);
    }
  };

  // Handle copy text
  const handleCopyText = () => {
    if (selectedText) {
      navigator.clipboard
        .writeText(selectedText)
        .then(() => {
          // Show toast
          const toast = document.querySelector('.toast');
          if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
              toast.classList.remove('show');
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });

      // Close menu
      setMenuPosition(null);
    }
  };

  // If no menu position, don't render anything
  if (!menuPosition) {
    return null;
  }

  // Calculate menu style
  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${menuPosition.x}px`,
    top: `${menuPosition.y}px`,
    transform: 'translateX(-50%)',
  };

  return (
    <div className="text-selection-menu" style={menuStyle} ref={menuRef}>
      <button className="menu-button note-button" onClick={handleCreateNote}>
        <span className="menu-icon">📝</span>
        <span className="menu-label">Add Note</span>
      </button>
      <button className="menu-button quote-button" onClick={handleCreateQuote}>
        <span className="menu-icon">💬</span>
        <span className="menu-label">Save Quote</span>
      </button>
      <button className="menu-button copy-button" onClick={handleCopyText}>
        <span className="menu-icon">📋</span>
        <span className="menu-label">Copy</span>
      </button>
    </div>
  );
}

export default TextSelectionHandler;
