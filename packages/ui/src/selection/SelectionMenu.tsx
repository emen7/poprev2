import React, { useState, useEffect, useRef } from 'react';
import './SelectionMenu.css';

export interface SelectionMenuProps {
  /**
   * Position of the selection menu
   */
  position: { top: number; left: number };

  /**
   * Selected text
   */
  selectedText: string;

  /**
   * Function called when the copy action is selected
   */
  onCopy?: () => void;

  /**
   * Function called when the note action is selected
   */
  onNote?: () => void;

  /**
   * Function called when the quote action is selected
   */
  onQuote?: () => void;

  /**
   * Function called when the menu is closed
   */
  onClose?: () => void;
}

/**
 * SelectionMenu Component
 *
 * A component that displays a menu for text selection with options for copying, adding notes, and saving quotes.
 */
export const SelectionMenu: React.FC<SelectionMenuProps> = ({
  position,
  selectedText,
  onCopy,
  onNote,
  onQuote,
  onClose,
}) => {
  // State for the selected action
  const [selectedAction, setSelectedAction] = useState<'copy' | 'note' | 'quote' | null>(null);

  // Ref for the menu element
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle action selection
  const handleActionSelect = (action: 'copy' | 'note' | 'quote') => {
    setSelectedAction(action);
  };

  // Handle confirm button click
  const handleConfirm = () => {
    if (selectedAction === 'copy' && onCopy) {
      onCopy();
    } else if (selectedAction === 'note' && onNote) {
      onNote();
    } else if (selectedAction === 'quote' && onQuote) {
      onQuote();
    }

    // Close the menu
    if (onClose) {
      onClose();
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  // Handle click outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to ensure the menu is within the viewport
  const adjustedPosition = { ...position };

  if (menuRef.current) {
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjust horizontal position
    if (position.left + menuRect.width > viewportWidth) {
      adjustedPosition.left = viewportWidth - menuRect.width - 10;
    }

    // Adjust vertical position
    if (position.top + menuRect.height > viewportHeight) {
      adjustedPosition.top = position.top - menuRect.height - 10;
    }
  }

  return (
    <div
      className="selection-menu"
      style={{ top: adjustedPosition.top, left: adjustedPosition.left }}
      ref={menuRef}
    >
      <div className="selection-actions">
        <button
          className={`action-button ${selectedAction === 'copy' ? 'selected' : ''}`}
          onClick={() => handleActionSelect('copy')}
        >
          [copy]
        </button>
        <button
          className={`action-button ${selectedAction === 'note' ? 'selected' : ''}`}
          onClick={() => handleActionSelect('note')}
        >
          [note]
        </button>
        <button
          className={`action-button ${selectedAction === 'quote' ? 'selected' : ''}`}
          onClick={() => handleActionSelect('quote')}
        >
          [quote]
        </button>
      </div>
      <div className="selection-controls">
        <button className="confirm-button" onClick={handleConfirm} title="Apply">
          ✓
        </button>
        <button className="cancel-button" onClick={handleCancel} title="Cancel">
          ✕
        </button>
      </div>
    </div>
  );
};

export default SelectionMenu;
