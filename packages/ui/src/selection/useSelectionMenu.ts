import { useState, useEffect, useCallback } from 'react';

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

  return {
    isMenuVisible,
    menuPosition,
    selectedText,
    showMenu,
    hideMenu,
    copySelectedText,
  };
}

export default useSelectionMenu;
