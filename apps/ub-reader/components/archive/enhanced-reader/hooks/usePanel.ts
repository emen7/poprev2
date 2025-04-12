/**
 * usePanel Hook
 *
 * This hook manages the state of a panel (open/closed) and provides functions to control it.
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * Hook for managing panel state
 *
 * @param initialState Initial open state
 * @returns Panel state and functions to control it
 */
export function usePanel(initialState: boolean = false) {
  // State for the panel
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  // Open the panel
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close the panel
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Toggle the panel
  const toggle = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  // Close panel on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
