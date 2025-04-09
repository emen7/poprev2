/**
 * TypeScript interfaces for Urantia Book content
 * Based on the structure of the JSON files in apps/ub-reader/content/ub-json
 */

/**
 * Base interface for all UB content items
 */
export interface UBContentItem {
  globalId: string;
  objectID: string;
  language: string;
  type: 'part' | 'paper' | 'section' | 'paragraph';
  typeRank: number;
  sortId: string;
  labels: string[];
  text: string | null;
  htmlText: string | null;
}

/**
 * Interface for a UB Part (e.g., "The Central and Superuniverses")
 */
export interface UBPart extends UBContentItem {
  type: 'part';
  typeRank: 0;
  partId: string;
  partTitle: string;
  partSponsorship: string;
  paperId: null;
  paperTitle: null;
  paperSectionId: null;
  sectionId: null;
  sectionTitle: null;
  paragraphId: null;
  paperSectionParagraphId: null;
  standardReferenceId: null;
}

/**
 * Interface for a UB Paper (e.g., "The Universal Father")
 */
export interface UBPaper extends UBContentItem {
  type: 'paper';
  typeRank: 1;
  partId: string;
  paperId: string;
  paperTitle: string;
  paperSectionId: null;
  sectionId: null;
  sectionTitle: null;
  paragraphId: null;
  paperSectionParagraphId: null;
  standardReferenceId: string;
}

/**
 * Interface for a UB Section (e.g., "The Father's Name")
 */
export interface UBSection extends UBContentItem {
  type: 'section';
  typeRank: 2;
  partId: string;
  paperId: string;
  paperTitle: string;
  paperSectionId: string;
  sectionId: string;
  sectionTitle: string | null;
  paragraphId: null;
  paperSectionParagraphId: null;
  standardReferenceId: string;
}

/**
 * Interface for a UB Paragraph
 */
export interface UBParagraph extends UBContentItem {
  type: 'paragraph';
  typeRank: 3;
  partId: string;
  paperId: string;
  paperTitle: string;
  paperSectionId: string;
  sectionId: string;
  sectionTitle: string | null;
  paragraphId: string;
  paperSectionParagraphId: string;
  standardReferenceId: string;
}

/**
 * Union type for all UB content items
 */
export type UBContentItemType = UBPart | UBPaper | UBSection | UBParagraph;

/**
 * Interface for a structured UB Paper with nested sections and paragraphs
 */
export interface StructuredUBPaper {
  paper: UBPaper;
  sections: StructuredUBSection[];
}

/**
 * Interface for a structured UB Section with nested paragraphs
 */
export interface StructuredUBSection {
  section: UBSection;
  paragraphs: UBParagraph[];
}

/**
 * Interface for a structured UB Part with nested papers
 */
export interface StructuredUBPart {
  part: UBPart;
  papers: StructuredUBPaper[];
}

/**
 * Interface for the complete structured UB content
 */
export interface StructuredUBContent {
  parts: StructuredUBPart[];
}

/**
 * Interface for UB content metadata
 */
export interface UBContentMetadata {
  totalParts: number;
  totalPapers: number;
  totalSections: number;
  totalParagraphs: number;
  lastUpdated: string;
}

/**
 * Interface for a paragraph with note indicator
 */
export interface UBParagraphWithNotes extends UBParagraph {
  hasNotes: boolean;
  noteCount: number;
}

/**
 * Interface for UB reference
 * Format: paper:section.paragraph (e.g., "1:1.2")
 */
export interface UBReference {
  paperId: string;
  sectionId: string;
  paragraphId: string;
  fullReference: string;
}

/**
 * Parse a standard reference ID into a UB reference object
 * @param referenceId Standard reference ID (e.g., "1:1.2")
 * @returns UB reference object
 */
export function parseUBReference(referenceId: string): UBReference | null {
  const match = referenceId.match(/^(\d+):(\d+)\.(\d+)$/);
  if (!match) return null;

  const [, paperId, sectionId, paragraphId] = match;
  return {
    paperId,
    sectionId,
    paragraphId,
    fullReference: referenceId,
  };
}

/**
 * Create a standard reference ID from paper, section, and paragraph IDs
 * @param paperId Paper ID
 * @param sectionId Section ID
 * @param paragraphId Paragraph ID
 * @returns Standard reference ID (e.g., "1:1.2")
 */
export function createUBReference(paperId: string, sectionId: string, paragraphId: string): string {
  return `${paperId}:${sectionId}.${paragraphId}`;
}
