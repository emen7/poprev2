import { useState, useEffect, useCallback } from 'react';
import { HighlightColor } from './HighlightColorPicker';

export interface SelectionPosition {
  top: number;
  left: number;
}

export interface UseSelectionMenuOptions {
  /**
   * Element to listen for selection events on
   * If not provided, the document body will be used
   */
  targetElement?: HTMLElement | null;

  /**
   * Whether to show the selection menu on right-click
   * @default true
   */
  showOnRightClick?: boolean;

  /**
   * Whether to show the selection menu on mouse up
   * @default true
   */
  showOnMouseUp?: boolean;

  /**
   * Minimum length of selected text to show the menu
   * @default 1
   */
  minSelectionLength?: number;

  /**
   * Offset for the menu position
   * @default { top: 10, left: 0 }
   */
  offset?: { top: number; left: number };

  /**
   * Whether the component is in dark mode
   * @default false
   */
  darkMode?: boolean;
}

export interface UseSelectionMenuResult {
  /**
   * Whether the selection menu is visible
   */
  isMenuVisible: boolean;

  /**
   * Position of the selection menu
   */
  menuPosition: SelectionPosition;

  /**
   * Selected text
   */
  selectedText: string;

  /**
   * Show the selection menu
   */
  showMenu: (position?: SelectionPosition) => void;

  /**
   * Hide the selection menu
   */
  hideMenu: () => void;

  /**
   * Copy the selected text to clipboard
   */
  copySelectedText: () => void;

  /**
   * Highlight the selected text
   */
  highlightSelectedText: (color: HighlightColor) => void;

  /**
   * Whether the component is in dark mode
   */
  darkMode: boolean;
}

/**
 * Hook for handling text selection and showing a selection menu
 */
export function useSelectionMenu({
  targetElement = null,
  showOnRightClick = true,
  showOnMouseUp = true,
  minSelectionLength = 1,
  offset = { top: 10, left: 0 },
  darkMode = false,
}: UseSelectionMenuOptions = {}): UseSelectionMenuResult {
  // State for menu visibility
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  // State for menu position
  const [menuPosition, setMenuPosition] = useState<SelectionPosition>({ top: 0, left: 0 });

  // State for selected text
  const [selectedText, setSelectedText] = useState<string>('');

  // Show the selection menu
  const showMenu = useCallback(
    (position?: SelectionPosition) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const selectionText = selection.toString().trim();
      if (selectionText.length < minSelectionLength) return;

      setSelectedText(selectionText);

      // If position is provided, use it
      if (position) {
        setMenuPosition(position);
        setIsMenuVisible(true);
        return;
      }

      // Otherwise, calculate position from selection
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setMenuPosition({
        top: rect.bottom + window.scrollY + offset.top,
        left: rect.left + window.scrollX + offset.left,
      });

      setIsMenuVisible(true);
    },
    [minSelectionLength, offset]
  );

  // Hide the selection menu
  const hideMenu = useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  // Copy selected text to clipboard
  const copySelectedText = useCallback(() => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText).catch(error => {
        console.error('Failed to copy text:', error);
      });
    }
  }, [selectedText]);

  // Highlight selected text
  const highlightSelectedText = useCallback((color: HighlightColor) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    // Get the selected range
    const range = selection.getRangeAt(0);

    // Create a span element for the highlight
    const highlightSpan = document.createElement('span');
    highlightSpan.className = `highlight-${color}`;

    // Surround the selected text with the highlight span
    range.surroundContents(highlightSpan);

    // Collapse the selection
    selection.removeAllRanges();
  }, []);

  // Handle mouse up event
  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      // Ignore right-click
      if (event.button === 2) return;

      // Check if there's a selection
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        hideMenu();
        return;
      }

      // Show menu if there's a selection
      if (showOnMouseUp) {
        showMenu();
      }
    },
    [hideMenu, showMenu, showOnMouseUp]
  );

  // Handle context menu event (right-click)
  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      // Check if there's a selection
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      // Show menu if there's a selection
      if (showOnRightClick) {
        event.preventDefault();
        showMenu({
          top: event.clientY + window.scrollY,
          left: event.clientX + window.scrollX,
        });
      }
    },
    [showMenu, showOnRightClick]
  );

  // Add event listeners
  useEffect(() => {
    const element = targetElement || document.body;

    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('contextmenu', handleContextMenu);

    return () => {
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [targetElement, handleMouseUp, handleContextMenu]);

  // Add dark mode selection styles
  useEffect(() => {
    if (darkMode) {
      // Add a style element for dark mode selection
      const styleElement = document.createElement('style');
      styleElement.id = 'dark-mode-selection-styles';
      styleElement.textContent = `
        ::selection {
          background-color: rgba(0, 0, 0, 0.1);
          color: #7c83ff; /* Perplexity AI-like selection color */
        }
        
        .highlight-yellow {
          background-color: transparent;
          color: #ffff00;
        }
        
        .highlight-green {
          background-color: transparent;
          color: #00ff00;
        }
        
        .highlight-blue {
          background-color: transparent;
          color: #00bfff;
        }
        
        .highlight-pink {
          background-color: transparent;
          color: #ff69b4;
        }
        
        .highlight-purple {
          background-color: transparent;
          color: #9370db;
        }
      `;
      document.head.appendChild(styleElement);

      return () => {
        // Remove the style element when component unmounts or dark mode changes
        const existingStyle = document.getElementById('dark-mode-selection-styles');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    } else {
      // Add a style element for light mode highlights
      const styleElement = document.createElement('style');
      styleElement.id = 'light-mode-highlight-styles';
      styleElement.textContent = `
        .highlight-yellow {
          background-color: rgba(255, 255, 0, 0.5);
          color: inherit;
        }
        
        .highlight-green {
          background-color: rgba(0, 255, 0, 0.5);
          color: inherit;
        }
        
        .highlight-blue {
          background-color: rgba(0, 191, 255, 0.5);
          color: inherit;
        }
        
        .highlight-pink {
          background-color: rgba(255, 105, 180, 0.5);
          color: inherit;
        }
        
        .highlight-purple {
          background-color: rgba(147, 112, 219, 0.5);
          color: inherit;
        }
      `;
      document.head.appendChild(styleElement);

      return () => {
        // Remove the style element when component unmounts or dark mode changes
        const existingStyle = document.getElementById('light-mode-highlight-styles');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [darkMode]);

  return {
    isMenuVisible,
    menuPosition,
    selectedText,
    showMenu,
    hideMenu,
    copySelectedText,
    highlightSelectedText,
    darkMode,
  };
}

export default useSelectionMenu;
