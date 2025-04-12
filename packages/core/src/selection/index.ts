/**
 * Selection module for the UB Ecosystem
 */

import {
  TextSelection,
  SelectionPosition,
  Highlight,
  HighlightType,
  SelectionService,
} from '../types/selection';

// Re-export types
export type { TextSelection, SelectionPosition, Highlight, HighlightType, SelectionService };

// This is a placeholder for future implementation
// The actual implementation will be added in subsequent tasks

/**
 * Create a new text selection
 */
export function createTextSelection(
  text: string,
  startPosition: SelectionPosition,
  endPosition: SelectionPosition,
  color?: string,
  note?: string
): Omit<TextSelection, 'id' | 'timestamp'> {
  return {
    text,
    startPosition,
    endPosition,
    color,
    note,
  };
}

/**
 * Create a new selection position
 */
export function createSelectionPosition(
  documentId: string,
  sectionIndex: number,
  paragraphIndex: number,
  textOffset: number
): SelectionPosition {
  return {
    documentId,
    sectionIndex,
    paragraphIndex,
    textOffset,
  };
}

/**
 * Create a new highlight
 */
export function createHighlight(
  selection: Omit<TextSelection, 'id' | 'timestamp'>,
  type: HighlightType,
  tags?: string[]
): Omit<Highlight, 'id' | 'timestamp'> {
  return {
    ...selection,
    type,
    tags,
  };
}

/**
 * Generate a unique ID for a selection
 */
export function generateSelectionId(): string {
  return `selection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
