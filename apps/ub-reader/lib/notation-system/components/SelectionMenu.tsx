/**
 * Selection Menu Component
 *
 * This component displays a floating menu when text is selected,
 * allowing the user to highlight the text, add a note, or copy the text.
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TextSelection, HighlightColor } from '../models';

interface SelectionMenuProps {
  /**
   * The current text selection, or null if no text is selected
   */
  selection: TextSelection | null;

  /**
   * Callback function called when the user highlights text
   */
  onHighlight: (color: HighlightColor) => void;

  /**
   * Callback function called when the user adds a note
   */
  onAddNote: () => void;

  /**
   * Callback function called when the user copies text
   */
  onCopy: () => void;

  /**
   * Callback function called when the user cancels the selection
   */
  onCancel: () => void;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * SelectionMenu Component
 */
export function SelectionMenu({
  selection,
  onHighlight,
  onAddNote,
  onCopy,
  onCancel,
  className = '',
}: SelectionMenuProps) {
  // Reference to the menu element
  const menuRef = useRef<HTMLDivElement>(null);

  // State for menu position
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Update menu position when selection changes
  useEffect(() => {
    if (selection && selection.range) {
      const rect = selection.range.getBoundingClientRect();

      // Position the menu above the selection
      const top = rect.top - 50; // 50px above the selection
      const left = rect.left + rect.width / 2 - 100; // Centered horizontally

      // Adjust position to ensure menu is within viewport
      const adjustedTop = Math.max(10, top); // At least 10px from top
      const adjustedLeft = Math.max(10, Math.min(window.innerWidth - 200, left)); // Keep within viewport width

      setPosition({ top: adjustedTop, left: adjustedLeft });
    }
  }, [selection]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!selection) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selection, onCancel]);

  // If no selection, don't render the menu
  if (!selection) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className={`selection-menu ${className}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Highlight color buttons */}
      <button
        className="selection-menu-button yellow"
        onClick={() => onHighlight('yellow')}
        title="Highlight Yellow"
      >
        <span className="sr-only">Highlight Yellow</span>
        <span aria-hidden="true">Y</span>
      </button>

      <button
        className="selection-menu-button green"
        onClick={() => onHighlight('green')}
        title="Highlight Green"
      >
        <span className="sr-only">Highlight Green</span>
        <span aria-hidden="true">G</span>
      </button>

      <button
        className="selection-menu-button orange"
        onClick={() => onHighlight('orange')}
        title="Highlight Orange"
      >
        <span className="sr-only">Highlight Orange</span>
        <span aria-hidden="true">O</span>
      </button>

      <button
        className="selection-menu-button purple"
        onClick={() => onHighlight('purple')}
        title="Highlight Purple"
      >
        <span className="sr-only">Highlight Purple</span>
        <span aria-hidden="true">P</span>
      </button>

      {/* Add note button */}
      <button className="selection-menu-button note" onClick={onAddNote} title="Add Note">
        <span className="sr-only">Add Note</span>
        <span aria-hidden="true">N</span>
      </button>

      {/* Copy button */}
      <button className="selection-menu-button copy" onClick={onCopy} title="Copy Text">
        <span className="sr-only">Copy Text</span>
        <span aria-hidden="true">C</span>
      </button>
    </div>
  );
}

export default SelectionMenu;
