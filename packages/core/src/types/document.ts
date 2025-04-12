/**
 * Document types for the UB Ecosystem
 */

/**
 * Document interface representing a structured document
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
   */
  [key: string]: any;
}
