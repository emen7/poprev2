/**
 * Notation System Types
 *
 * This file defines the core data types for the notation system,
 * including highlights, notes, and collections.
 */

/**
 * Highlight color options
 */
export type HighlightColor = 'yellow' | 'green' | 'orange' | 'purple';

/**
 * Highlight data structure
 */
export interface Highlight {
  id: string;
  paperNumber: number;
  sectionId: string;
  selectedText: string;
  color: HighlightColor;
  noteId?: string;
  createdAt: number; // timestamp
  tags: string[];
  // Selection range information for re-applying highlights
  startOffset: number;
  endOffset: number;
  startContainer: string; // XPath or other identifier
  endContainer: string;
}

/**
 * Note formatting data
 */
export interface NoteFormatting {
  bold?: [number, number][]; // Ranges of bold text (start, end)
  italic?: [number, number][]; // Ranges of italic text
  lists?: {
    type: 'bullet' | 'numbered';
    items: string[];
    startIndex: number;
  }[];
}

/**
 * Note data structure
 */
export interface Note {
  id: string;
  highlightId: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  // Optional formatting data
  formatting?: NoteFormatting;
}

/**
 * Collection for organizing related highlights
 */
export interface Collection {
  id: string;
  name: string;
  description?: string;
  highlightIds: string[];
  createdAt: number;
}

/**
 * Filter options for highlights and notes
 */
export interface NotationFilter {
  papers?: number[];
  colors?: HighlightColor[];
  tags?: string[];
  hasNotes?: boolean;
  dateRange?: {
    start: number;
    end: number;
  };
}

/**
 * Sort options for highlights and notes
 */
export type NotationSortBy = 'paper' | 'date' | 'color';

/**
 * Text selection data
 */
export interface TextSelection {
  text: string;
  range: Range;
  sectionId: string;
  paperNumber: number;
}
