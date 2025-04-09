import { NotesState, NotesAction, NotesActionType } from '../types/notes.types';

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
    case NotesActionType.ADD_NOTE:
      return {
        ...state,
        notes: [action.payload.note, ...state.notes],
      };

    case NotesActionType.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? {
                ...note,
                content: action.payload.content,
                updatedAt: new Date().toISOString(),
              }
            : note
        ),
      };

    case NotesActionType.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id),
      };

    case NotesActionType.ADD_QUOTE:
      return {
        ...state,
        quotes: [action.payload.quote, ...state.quotes],
      };

    case NotesActionType.DELETE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.filter(quote => quote.id !== action.payload.id),
      };

    case NotesActionType.SET_DOCUMENT_ID:
      return {
        ...state,
        documentId: action.payload.documentId,
      };

    case NotesActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case NotesActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case NotesActionType.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload.sortOrder,
      };

    case NotesActionType.LOAD_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
      };

    case NotesActionType.LOAD_QUOTES:
      return {
        ...state,
        quotes: action.payload.quotes,
      };

    default:
      return state;
  }
}
