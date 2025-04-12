/**
 * Selection types for the UB Ecosystem
 */

import { NavigationPosition } from './navigation';

/**
 * Text selection interface
 */
export interface TextSelection {
  /**
   * Selection ID
   */
  id: string;

  /**
   * Selected text
   */
  text: string;

  /**
   * Selection start position
   */
  startPosition: SelectionPosition;

  /**
   * Selection end position
   */
  endPosition: SelectionPosition;

  /**
   * Selection color
   */
  color?: string;

  /**
   * Selection timestamp
   */
  timestamp: number;

  /**
   * Selection note
   */
  note?: string;
}

/**
 * Selection position interface
 */
export interface SelectionPosition extends NavigationPosition {
  /**
   * Text offset within the paragraph
   */
  textOffset: number;
}

/**
 * Highlight interface
 */
export interface Highlight extends TextSelection {
  /**
   * Highlight type
   */
  type: HighlightType;

  /**
   * Highlight tags
   */
  tags?: string[];
}

/**
 * Highlight type enum
 */
export enum HighlightType {
  /**
   * Standard highlight
   */
  STANDARD = 'standard',

  /**
   * Note highlight
   */
  NOTE = 'note',

  /**
   * Quote highlight
   */
  QUOTE = 'quote',
}

/**
 * Selection service interface
 */
export interface SelectionService {
  /**
   * Get all selections
   */
  getSelections(): TextSelection[];

  /**
   * Get selection by ID
   */
  getSelectionById(id: string): TextSelection | null;

  /**
   * Create a new selection
   */
  createSelection(selection: Omit<TextSelection, 'id' | 'timestamp'>): TextSelection;

  /**
   * Update an existing selection
   */
  updateSelection(id: string, selection: Partial<TextSelection>): TextSelection | null;

  /**
   * Delete a selection
   */
  deleteSelection(id: string): boolean;

  /**
   * Get all highlights
   */
  getHighlights(): Highlight[];

  /**
   * Create a highlight from a selection
   */
  createHighlight(selection: TextSelection, type: HighlightType, color?: string): Highlight;

  /**
   * Update a highlight
   */
  updateHighlight(id: string, highlight: Partial<Highlight>): Highlight | null;

  /**
   * Delete a highlight
   */
  deleteHighlight(id: string): boolean;
}
