/**
 * Selection module for the UB Ecosystem
 */
import { TextSelection, SelectionPosition, Highlight, HighlightType, SelectionService } from '../types/selection';
export type { TextSelection, SelectionPosition, Highlight, HighlightType, SelectionService };
/**
 * Create a new text selection
 */
export declare function createTextSelection(text: string, startPosition: SelectionPosition, endPosition: SelectionPosition, color?: string, note?: string): Omit<TextSelection, 'id' | 'timestamp'>;
/**
 * Create a new selection position
 */
export declare function createSelectionPosition(documentId: string, sectionIndex: number, paragraphIndex: number, textOffset: number): SelectionPosition;
/**
 * Create a new highlight
 */
export declare function createHighlight(selection: Omit<TextSelection, 'id' | 'timestamp'>, type: HighlightType, tags?: string[]): Omit<Highlight, 'id' | 'timestamp'>;
/**
 * Generate a unique ID for a selection
 */
export declare function generateSelectionId(): string;
//# sourceMappingURL=index.d.ts.map