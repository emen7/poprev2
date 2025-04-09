import { NotesState, NotesAction, NotesActionType, Note, Quote } from '../types/notes.types';

// Simple ID generation function
const generateId = () => `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Format date as ISO string
const formatDate = () => new Date().toISOString();

export const initialNotesState: NotesState = {
  notes: [],
  quotes: [],
  documentId: '',
  isLoading: false,
  error: null,
  sortOrder: 'entry',
};

export function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case NotesActionType.ADD_NOTE: {
      const newNote: Note = {
        ...action.payload.note,
        id: action.payload.note.id || generateId(),
        createdAt: action.payload.note.createdAt || formatDate(),
        updatedAt: action.payload.note.updatedAt || formatDate(),
      };

      return {
        ...state,
        notes: [...state.notes, newNote],
      };
    }

    case NotesActionType.UPDATE_NOTE: {
      const { id, content } = action.payload;

      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === id ? { ...note, content, updatedAt: formatDate() } : note
        ),
      };
    }

    case NotesActionType.DELETE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id),
      };
    }

    case NotesActionType.ADD_QUOTE: {
      const newQuote: Quote = {
        ...action.payload.quote,
        id: action.payload.quote.id || generateId(),
        createdAt: action.payload.quote.createdAt || formatDate(),
      };

      return {
        ...state,
        quotes: [...state.quotes, newQuote],
      };
    }

    case NotesActionType.DELETE_QUOTE: {
      return {
        ...state,
        quotes: state.quotes.filter(quote => quote.id !== action.payload.id),
      };
    }

    case NotesActionType.SET_DOCUMENT_ID: {
      return {
        ...state,
        documentId: action.payload.documentId,
      };
    }

    case NotesActionType.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }

    case NotesActionType.SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case NotesActionType.SET_SORT_ORDER: {
      return {
        ...state,
        sortOrder: action.payload.sortOrder,
      };
    }

    case NotesActionType.LOAD_NOTES: {
      return {
        ...state,
        notes: action.payload.notes,
      };
    }

    case NotesActionType.LOAD_QUOTES: {
      return {
        ...state,
        quotes: action.payload.quotes,
      };
    }

    default:
      return state;
  }
}
