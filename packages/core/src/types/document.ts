/**
 * Document types for the UB Ecosystem
 */

/**
 * Content type enum for different document types
 */
export enum ContentType {
  /**
   * Standard Urantia Book content
   */
  STANDARD = 'standard',

  /**
   * Scientific content with specialized formatting
   */
  SCIENTIFIC = 'scientific',

  /**
   * Commentary or study guide content
   */
  COMMENTARY = 'commentary',

  /**
   * Reference material
   */
  REFERENCE = 'reference',
}

/**
 * Formatting type enum for paragraph formatting
 */
export enum FormattingType {
  /**
   * Standard paragraph formatting
   */
  STANDARD = 'standard',

  /**
   * Quote formatting
   */
  QUOTE = 'quote',

  /**
   * Poetry formatting
   */
  POETRY = 'poetry',

  /**
   * List item formatting
   */
  LIST = 'list',

  /**
   * Table formatting
   */
  TABLE = 'table',

  /**
   * Formula or equation formatting
   */
  FORMULA = 'formula',
}

/**
 * Base Document interface representing a structured document
 */
export interface Document {
  /**
   * Unique identifier for the document
   */
  id: string;

  /**
   * Document title
   */
  title: string;

  /**
   * Document sections
   */
  sections: Section[];

  /**
   * Document metadata
   */
  metadata: DocumentMetadata;

  /**
   * Content type
   */
  contentType: ContentType;
}

/**
 * Urantia Book specific document interface
 */
export interface UBDocument extends Document {
  /**
   * Part number (1-4 for UB)
   */
  part?: number;

  /**
   * Paper number
   */
  paper?: number;

  /**
   * Whether this is a foreword
   */
  isForeword?: boolean;
}

/**
 * Section interface representing a document section
 */
export interface Section {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Section title
   */
  title: string;

  /**
   * Section number
   */
  number: number;

  /**
   * Section paragraphs
   */
  paragraphs: Paragraph[];
}

/**
 * UB-specific section interface
 */
export interface UBSection extends Section {
  /**
   * Roman numeral for foreword sections
   */
  romanNumeral?: string;

  /**
   * Whether this section represents a topic change
   */
  isTopicChange?: boolean;

  /**
   * Parent paper number
   */
  paperNumber?: number;
}

/**
 * Paragraph interface representing a document paragraph
 */
export interface Paragraph {
  /**
   * Unique identifier for the paragraph
   */
  id: string;

  /**
   * Paragraph number
   */
  number: number;

  /**
   * Paragraph text content
   */
  text: string;

  /**
   * Paragraph references
   */
  references?: Reference[];
}

/**
 * UB-specific paragraph interface
 */
export interface UBParagraph extends Paragraph {
  /**
   * Whether this paragraph represents a topic change
   */
  isTopicChange?: boolean;

  /**
   * Whether this paragraph has special formatting
   */
  hasSpecialFormatting?: boolean;

  /**
   * Formatting type for this paragraph
   */
  formattingType?: FormattingType;

  /**
   * Parent section ID
   */
  sectionId?: string;

  /**
   * Parent paper number
   */
  paperNumber?: number;
}

/**
 * Reference interface representing a document reference
 */
export interface Reference {
  /**
   * Reference type
   */
  type: ReferenceType;

  /**
   * Reference target
   */
  target: string;

  /**
   * Reference text
   */
  text: string;
}

/**
 * UB-specific reference interface
 */
export interface UBReference extends Reference {
  /**
   * Paper number for paper references
   */
  paperNumber?: number;

  /**
   * Section number for section references
   */
  sectionNumber?: number;

  /**
   * Paragraph number for paragraph references
   */
  paragraphNumber?: number;
}

/**
 * Reference type enum
 */
export enum ReferenceType {
  /**
   * Internal reference to another document
   */
  INTERNAL = 'internal',

  /**
   * External reference to a URL
   */
  EXTERNAL = 'external',

  /**
   * Footnote reference
   */
  FOOTNOTE = 'footnote',

  /**
   * Paper reference (e.g., "Paper 1")
   */
  PAPER = 'paper',

  /**
   * Section reference (e.g., "Paper 1:2")
   */
  SECTION = 'section',

  /**
   * Paragraph reference (e.g., "Paper 1:2.3")
   */
  PARAGRAPH = 'paragraph',

  /**
   * Biblical reference
   */
  BIBLICAL = 'biblical',

  /**
   * Scientific citation
   */
  CITATION = 'citation',
}

/**
 * Document metadata interface
 */
export interface DocumentMetadata {
  /**
   * Document author
   */
  author?: string;

  /**
   * Document publication date
   */
  publicationDate?: string;

  /**
   * Document language
   */
  language?: string;

  /**
   * Document tags
   */
  tags?: string[];

  /**
   * Document category
   */
  category?: string;

  /**
   * Additional metadata properties
   * Using Record instead of index signature for better type safety
   */
  additionalProperties?: Record<string, unknown>;
}

/**
 * UB-specific document metadata
 */
export interface UBDocumentMetadata extends DocumentMetadata {
  /**
   * Part number
   */
  partNumber?: number;

  /**
   * Paper number
   */
  paperNumber?: number;

  /**
   * Whether this is a foreword
   */
  isForeword?: boolean;

  /**
   * Original publication year
   */
  originalPublicationYear?: number;

  /**
   * Edition number
   */
  editionNumber?: number;
}
