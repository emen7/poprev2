import React, { createContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import {
  NotesContextType,
  NotesState,
  NotesAction,
  NotesActionType,
  Note,
  Quote,
} from '../types/notes.types';
import { notesReducer, initialNotesState } from '../reducers/notesReducer';

// Create context with undefined default value
export const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
  initialState?: Partial<NotesState>;
  persistNotes?: boolean;
}

export function NotesProvider({
  children,
  initialState = {},
  persistNotes = true,
}: NotesProviderProps) {
  // Merge default state with any provided initial state
  const mergedInitialState = { ...initialNotesState, ...initialState };

  // Create reducer state and dispatch
  const [state, dispatch] = useReducer(notesReducer, mergedInitialState);

  // Load notes from localStorage on mount
  useEffect(() => {
    if (persistNotes && state.documentId) {
      try {
        // Load notes
        const savedNotes = localStorage.getItem(`ub-notes-${state.documentId}`);
        if (savedNotes) {
          dispatch({
            type: NotesActionType.LOAD_NOTES,
            payload: { notes: JSON.parse(savedNotes) },
          });
        }

        // Load quotes
        const savedQuotes = localStorage.getItem(`ub-quotes-${state.documentId}`);
        if (savedQuotes) {
          dispatch({
            type: NotesActionType.LOAD_QUOTES,
            payload: { quotes: JSON.parse(savedQuotes) },
          });
        }
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
        dispatch({
          type: NotesActionType.SET_ERROR,
          payload: { error: 'Failed to load notes from storage' },
        });
      }
    }
  }, [persistNotes, state.documentId]);

  // Save notes to localStorage when they change
  useEffect(() => {
    if (persistNotes && state.documentId) {
      try {
        // Save notes
        localStorage.setItem(`ub-notes-${state.documentId}`, JSON.stringify(state.notes));

        // Save quotes
        localStorage.setItem(`ub-quotes-${state.documentId}`, JSON.stringify(state.quotes));
      } catch (error) {
        console.error('Error saving notes to localStorage:', error);
        dispatch({
          type: NotesActionType.SET_ERROR,
          payload: { error: 'Failed to save notes to storage' },
        });
      }
    }
  }, [persistNotes, state.documentId, state.notes, state.quotes]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>;
}
