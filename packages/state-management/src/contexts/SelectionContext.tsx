import React, { createContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import {
  SelectionContextType,
  SelectionState,
  SelectionAction,
  SelectionActionType,
  TextSelection,
} from '../types/selection.types';
import { selectionReducer, initialSelectionState } from '../reducers/selectionReducer';

// Create context with undefined default value
export const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

interface SelectionProviderProps {
  children: ReactNode;
  initialState?: Partial<SelectionState>;
}

export function SelectionProvider({ children, initialState = {} }: SelectionProviderProps) {
  // Merge default state with any provided initial state
  const mergedInitialState = { ...initialSelectionState, ...initialState };

  // Create reducer state and dispatch
  const [state, dispatch] = useReducer(selectionReducer, mergedInitialState);

  // Handle text selection events
  useEffect(() => {
    const handleSelectionChange = () => {
      if (!state.isSelectionModeActive) {
        return; // Only process selections when selection mode is active
      }

      const selection = window.getSelection();

      if (!selection || selection.isCollapsed) {
        // No text selected
        if (state.currentSelection) {
          dispatch({ type: SelectionActionType.CLEAR_CURRENT_SELECTION });
        }
        return;
      }

      const selectedText = selection.toString().trim();

      if (!selectedText) {
        // Empty selection
        if (state.currentSelection) {
          dispatch({ type: SelectionActionType.CLEAR_CURRENT_SELECTION });
        }
        return;
      }

      // Get selection position and range information
      const range = selection.getRangeAt(0);
      const paragraphElement = range.startContainer.parentElement?.closest('[data-paragraph-id]');

      if (!paragraphElement) {
        return; // Not selecting within a paragraph
      }

      const paragraphId = paragraphElement.getAttribute('data-paragraph-id') || '';
      const startOffset = range.startOffset;
      const endOffset = range.endOffset;

      // Create a new selection object
      const newSelection: TextSelection = {
        id: '', // Will be assigned when saved
        text: selectedText,
        paragraphId,
        startOffset,
        endOffset,
        createdAt: Date.now(),
      };

      // Update selection state
      dispatch({
        type: SelectionActionType.SET_CURRENT_SELECTION,
        payload: { selection: newSelection },
      });
    };

    // Add event listener
    document.addEventListener('selectionchange', handleSelectionChange);

    // Clean up
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [state.isSelectionModeActive, state.currentSelection]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <SelectionContext.Provider value={contextValue}>{children}</SelectionContext.Provider>;
}
