import { useContext, useCallback } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { NotesActionType, Note, Quote } from '../types/notes.types';

/**
 * Hook for accessing and manipulating notes and quotes
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
    (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      const newNote: Note = {
        id: `note-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        ...note,
      };

      dispatch({
        type: NotesActionType.ADD_NOTE,
        payload: { note: newNote },
      });

      return newNote;
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
    (quote: Omit<Quote, 'id' | 'createdAt'>) => {
      const now = new Date().toISOString();
      const newQuote: Quote = {
        id: `quote-${Date.now()}`,
        createdAt: now,
        ...quote,
      };

      dispatch({
        type: NotesActionType.ADD_QUOTE,
        payload: { quote: newQuote },
      });

      return newQuote;
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

  // Get sorted notes based on current sort order
  const getSortedNotes = useCallback(() => {
    if (state.sortOrder === 'entry') {
      // Already sorted by entry (most recent first)
      return state.notes;
    } else {
      // Sort by paper (paragraph ID)
      return [...state.notes].sort((a, b) => {
        // Extract paper and section numbers from paragraphId
        const getOrderValue = (id: string) => {
          const match = id.match(/^p(\d+)s(\d+)/);
          if (match) {
            const paper = parseInt(match[1], 10);
            const section = parseInt(match[2], 10);
            return paper * 1000 + section;
          }
          return 0;
        };

        return getOrderValue(a.paragraphId) - getOrderValue(b.paragraphId);
      });
    }
  }, [state.notes, state.sortOrder]);

  return {
    // State properties
    notes: state.notes,
    quotes: state.quotes,
    documentId: state.documentId,
    isLoading: state.isLoading,
    error: state.error,
    sortOrder: state.sortOrder,

    // Computed properties
    sortedNotes: getSortedNotes(),

    // Actions
    addNote,
    updateNote,
    deleteNote,
    addQuote,
    deleteQuote,
    setDocumentId,
    setSortOrder,

    // Raw dispatch for advanced usage
    dispatch,
  };
}
