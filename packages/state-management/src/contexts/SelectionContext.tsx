import React, { createContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import {
  SelectionContextType,
  SelectionState,
  SelectionAction,
  SelectionActionType,
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
      const selection = window.getSelection();

      if (!selection || selection.isCollapsed) {
        // No text selected
        if (state.selectedText) {
          dispatch({ type: SelectionActionType.END_SELECTION });
        }
        return;
      }

      const selectedText = selection.toString().trim();

      if (!selectedText) {
        // Empty selection
        if (state.selectedText) {
          dispatch({ type: SelectionActionType.END_SELECTION });
        }
        return;
      }

      // Get selection position for displaying controls
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const position = {
        top: rect.top + window.scrollY - 40, // Position above the selection
        left: rect.left + rect.width / 2 + window.scrollX, // Center horizontally
      };

      // Update selection state
      dispatch({
        type: SelectionActionType.UPDATE_SELECTION,
        payload: {
          text: selectedText,
          position,
        },
      });
    };

    // Add event listener
    document.addEventListener('selectionchange', handleSelectionChange);

    // Clean up
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [state.selectedText]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <SelectionContext.Provider value={contextValue}>{children}</SelectionContext.Provider>;
}
