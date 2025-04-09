import { Dispatch } from 'react';

export interface Note {
  /**
   * Unique identifier for the note
   */
  id: string;

  /**
   * The content of the note
   */
  content: string;

  /**
   * The timestamp when the note was created
   */
  createdAt: string;

  /**
   * The timestamp when the note was last updated
   */
  updatedAt: string;

  /**
   * The ID of the paragraph the note is associated with
   */
  paragraphId: string;

  /**
   * The reference information (Paper:Section.Title)
   */
  reference: string;

  /**
   * Tags associated with the note
   */
  tags?: string[];
}

export interface Quote {
  /**
   * Unique identifier for the quote
   */
  id: string;

  /**
   * The content of the quote
   */
  content: string;

  /**
   * The timestamp when the quote was created
   */
  createdAt: string;

  /**
   * The ID of the paragraph the quote is associated with
   */
  paragraphId: string;

  /**
   * The reference information (Paper:Section.Title)
   */
  reference: string;
}

export interface NotesState {
  /**
   * All notes for the current document
   */
  notes: Note[];

  /**
   * All quotes for the current document
   */
  quotes: Quote[];

  /**
   * The ID of the current document
   */
  documentId: string;

  /**
   * Whether notes are being loaded
   */
  isLoading: boolean;

  /**
   * Any error that occurred during loading or saving
   */
  error: string | null;

  /**
   * The sort order for notes
   */
  sortOrder: 'entry' | 'paper';
}

export enum NotesActionType {
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  ADD_QUOTE = 'ADD_QUOTE',
  DELETE_QUOTE = 'DELETE_QUOTE',
  SET_DOCUMENT_ID = 'SET_DOCUMENT_ID',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_SORT_ORDER = 'SET_SORT_ORDER',
  LOAD_NOTES = 'LOAD_NOTES',
  LOAD_QUOTES = 'LOAD_QUOTES',
}

export type NotesAction =
  | { type: NotesActionType.ADD_NOTE; payload: { note: Note } }
  | { type: NotesActionType.UPDATE_NOTE; payload: { id: string; content: string } }
  | { type: NotesActionType.DELETE_NOTE; payload: { id: string } }
  | { type: NotesActionType.ADD_QUOTE; payload: { quote: Quote } }
  | { type: NotesActionType.DELETE_QUOTE; payload: { id: string } }
  | { type: NotesActionType.SET_DOCUMENT_ID; payload: { documentId: string } }
  | { type: NotesActionType.SET_LOADING; payload: { isLoading: boolean } }
  | { type: NotesActionType.SET_ERROR; payload: { error: string | null } }
  | { type: NotesActionType.SET_SORT_ORDER; payload: { sortOrder: 'entry' | 'paper' } }
  | { type: NotesActionType.LOAD_NOTES; payload: { notes: Note[] } }
  | { type: NotesActionType.LOAD_QUOTES; payload: { quotes: Quote[] } };

export interface NotesContextType {
  state: NotesState;
  dispatch: Dispatch<NotesAction>;
}
