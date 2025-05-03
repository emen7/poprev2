import { KeyboardEvent } from 'react';

/**
 * Key codes for common keyboard keys
 */
export const KEYS = {
  TAB: 'Tab',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  END: 'End',
  HOME: 'Home',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
};

/**
 * Handles keyboard navigation for a list of items
 * 
 * @param event - The keyboard event
 * @param currentIndex - The current focused index
 * @param itemCount - The total number of items
 * @param onSelect - Callback when an item is selected
 * @returns The new index to focus
 */
export const handleListKeyboardNavigation = (
  event: KeyboardEvent,
  currentIndex: number,
  itemCount: number,
  onSelect?: (index: number) => void
): number => {
  let newIndex = currentIndex;

  switch (event.key) {
    case KEYS.ARROW_DOWN:
      event.preventDefault();
      newIndex = Math.min(currentIndex + 1, itemCount - 1);
      break;
    case KEYS.ARROW_UP:
      event.preventDefault();
      newIndex = Math.max(currentIndex - 1, 0);
      break;
    case KEYS.HOME:
      event.preventDefault();
      newIndex = 0;
      break;
    case KEYS.END:
      event.preventDefault();
      newIndex = itemCount - 1;
      break;
    case KEYS.ENTER:
    case KEYS.SPACE:
      event.preventDefault();
      if (onSelect) {
        onSelect(currentIndex);
      }
      break;
    default:
      return currentIndex;
  }

  return newIndex;
};

/**
 * Creates a keyboard event handler for interactive elements
 * 
 * @param onClick - The click handler function
 * @returns A keyboard event handler
 */
export const createKeyboardHandler = (
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
      event.preventDefault();
      onClick(event);
    }
  };
};

/**
 * Traps focus within a container when Tab key is pressed
 * 
 * @param event - The keyboard event
 * @param containerRef - Reference to the container element
 */
export const trapFocus = (
  event: KeyboardEvent,
  containerRef: React.RefObject<HTMLElement>
): void => {
  if (event.key !== KEYS.TAB || !containerRef.current) {
    return;
  }

  const focusableElements = containerRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};
