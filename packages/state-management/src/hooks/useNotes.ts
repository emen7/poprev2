import { useContext, useCallback } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { NotesActionType, Note, Quote } from '../types/notes.types';

/**
 * Hook for accessing and manipulating notes state
 *
 * @returns Notes state and actions
 */
export function useNotes() {
  const context = useContext(NotesContext);

  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  const { state, dispatch } = context;

  // Provide action creators for common operations
  const addNote = useCallback(
    (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & Partial<Note>) => {
      dispatch({
        type: NotesActionType.ADD_NOTE,
        payload: { note: note as Note },
      });
    },
    [dispatch]
  );

  const updateNote = useCallback(
    (id: string, content: string) => {
      dispatch({
        type: NotesActionType.UPDATE_NOTE,
        payload: { id, content },
      });
    },
    [dispatch]
  );

  const deleteNote = useCallback(
    (id: string) => {
      dispatch({
        type: NotesActionType.DELETE_NOTE,
        payload: { id },
      });
    },
    [dispatch]
  );

  const addQuote = useCallback(
    (quote: Omit<Quote, 'id' | 'createdAt'> & Partial<Quote>) => {
      dispatch({
        type: NotesActionType.ADD_QUOTE,
        payload: { quote: quote as Quote },
      });
    },
    [dispatch]
  );

  const deleteQuote = useCallback(
    (id: string) => {
      dispatch({
        type: NotesActionType.DELETE_QUOTE,
        payload: { id },
      });
    },
    [dispatch]
  );

  const setDocumentId = useCallback(
    (documentId: string) => {
      dispatch({
        type: NotesActionType.SET_DOCUMENT_ID,
        payload: { documentId },
      });
    },
    [dispatch]
  );

  const setSortOrder = useCallback(
    (sortOrder: 'entry' | 'paper') => {
      dispatch({
        type: NotesActionType.SET_SORT_ORDER,
        payload: { sortOrder },
      });
    },
    [dispatch]
  );

  // Get notes for a specific paragraph
  const getNotesForParagraph = useCallback(
    (paragraphId: string) => {
      return state.notes.filter(note => note.paragraphId === paragraphId);
    },
    [state.notes]
  );

  // Get quotes for a specific paragraph
  const getQuotesForParagraph = useCallback(
    (paragraphId: string) => {
      return state.quotes.filter(quote => quote.paragraphId === paragraphId);
    },
    [state.quotes]
  );

  return {
    // State properties
    notes: state.notes,
    quotes: state.quotes,
    documentId: state.documentId,
    isLoading: state.isLoading,
    error: state.error,
    sortOrder: state.sortOrder,

    // Computed properties
    hasNotes: state.notes.length > 0,
    hasQuotes: state.quotes.length > 0,

    // Actions
    addNote,
    updateNote,
    deleteNote,
    addQuote,
    deleteQuote,
    setDocumentId,
    setSortOrder,

    // Helper functions
    getNotesForParagraph,
    getQuotesForParagraph,

    // Raw dispatch for advanced usage
    dispatch,
  };
}
