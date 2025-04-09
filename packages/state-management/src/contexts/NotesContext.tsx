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
  /**
   * Whether to persist notes in localStorage
   * @default true
   */
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

  // Load notes from localStorage on initial render
  useEffect(() => {
    if (!persistNotes || !state.documentId) return;

    dispatch({ type: NotesActionType.SET_LOADING, payload: { isLoading: true } });

    try {
      // Load notes
      const notesKey = `notes-${state.documentId}`;
      const storedNotes = localStorage.getItem(notesKey);

      if (storedNotes) {
        const notes = JSON.parse(storedNotes) as Note[];
        dispatch({ type: NotesActionType.LOAD_NOTES, payload: { notes } });
      }

      // Load quotes
      const quotesKey = `quotes-${state.documentId}`;
      const storedQuotes = localStorage.getItem(quotesKey);

      if (storedQuotes) {
        const quotes = JSON.parse(storedQuotes) as Quote[];
        dispatch({ type: NotesActionType.LOAD_QUOTES, payload: { quotes } });
      }

      dispatch({ type: NotesActionType.SET_ERROR, payload: { error: null } });
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);
      dispatch({
        type: NotesActionType.SET_ERROR,
        payload: { error: 'Failed to load notes from storage' },
      });
    } finally {
      dispatch({ type: NotesActionType.SET_LOADING, payload: { isLoading: false } });
    }
  }, [persistNotes, state.documentId]);

  // Save notes to localStorage when they change
  useEffect(() => {
    if (!persistNotes || !state.documentId) return;

    try {
      // Save notes
      const notesKey = `notes-${state.documentId}`;
      localStorage.setItem(notesKey, JSON.stringify(state.notes));

      // Save quotes
      const quotesKey = `quotes-${state.documentId}`;
      localStorage.setItem(quotesKey, JSON.stringify(state.quotes));
    } catch (error) {
      console.error('Error saving notes to localStorage:', error);
      dispatch({
        type: NotesActionType.SET_ERROR,
        payload: { error: 'Failed to save notes to storage' },
      });
    }
  }, [persistNotes, state.documentId, state.notes, state.quotes]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>;
}
