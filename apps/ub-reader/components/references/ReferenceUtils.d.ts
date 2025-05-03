/**
 * Reference Utilities
 *
 * This file contains utilities for parsing and linking references to The Urantia Book.
 */
/**
 * Types of UB references
 */
export type UBReferenceType = 'paper-section' | 'paper-section-paragraph' | 'paper' | 'section';
/**
 * Represents a reference to the Urantia Book
 */
export interface UBReference {
    /**
     * Type of reference
     */
    type: UBReferenceType;
    /**
     * Paper number
     */
    paper: number;
    /**
     * Section number (optional for paper-only references)
     */
    section?: number;
    /**
     * Paragraph number (optional for paper-section references)
     */
    paragraph?: number;
    /**
     * Original text that was matched
     */
    originalText: string;
    /**
     * Position in the original text
     */
    position: {
        start: number;
        end: number;
    };
}
/**
 * Parse UB references from text
 *
 * @param text The text to parse for references
 * @returns An array of UB references found in the text
 */
export declare function parseUBReferences(text: string): UBReference[];
/**
 * Apply context to references that need it
 *
 * @param references The references to apply context to
 * @param currentPaper The current paper number for context
 * @returns References with context applied
 */
export declare function applyReferenceContext(references: UBReference[], currentPaper: number): UBReference[];
/**
 * Generate a URL for a UB reference
 *
 * @param reference The UB reference
 * @param baseUrl The base URL for the UB Reader (default: "/paper")
 * @returns A URL to the referenced content in the UB Reader
 */
export declare function generateUBReferenceUrl(reference: UBReference, baseUrl?: string): string;
/**
 * Check if a reference is valid
 *
 * @param reference The reference to check
 * @param maxPapers The maximum number of papers (default: 196)
 * @param maxSections Optional map of maximum sections per paper
 * @param maxParagraphs Optional map of maximum paragraphs per section
 * @returns Whether the reference is valid
 */
export declare function isValidReference(reference: UBReference, maxPapers?: number, maxSections?: Record<number, number>, maxParagraphs?: Record<string, number>): boolean;
/**
 * Replace UB references in text with HTML links
 *
 * @param text The text containing references
 * @param baseUrl The base URL for the UB Reader (default: "/paper")
 * @param currentPaper The current paper number for context (default: 0)
 * @returns The text with references replaced by HTML links
 */
export declare function replaceUBReferencesWithLinks(text: string, baseUrl?: string, currentPaper?: number): string;
/**
 * Format a reference as a string
 *
 * @param reference The reference to format
 * @param format The format to use (default: 'short')
 * @returns Formatted reference string
 */
export declare function formatReference(reference: UBReference, format?: 'short' | 'medium' | 'full'): string;
//# sourceMappingURL=ReferenceUtils.d.ts.map