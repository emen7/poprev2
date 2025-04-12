/**
 * Document Model
 *
 * This file defines the interfaces for the document model used by the Reader component.
 * It provides a hierarchical structure for documents, sections, paragraphs, and references.
 */

/**
 * Represents a document in the system
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
   * Document type (main document or satellite)
   */
  type: 'main' | 'satellite';

  /**
   * Sections that make up the document
   */
  sections: Section[];

  /**
   * Relationships to other documents
   */
  relationships: Relationship[];

  /**
   * Document metadata
   */
  metadata: DocumentMetadata;

  /**
   * Raw content (if available)
   */
  content?: any;
}

/**
 * Represents a section within a document
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
   * Paragraphs within the section
   */
  paragraphs: Paragraph[];

  /**
   * Subsections (for hierarchical structure)
   */
  subsections?: Section[];
}

/**
 * Represents a paragraph within a section
 */
export interface Paragraph {
  /**
   * Unique identifier for the paragraph
   */
  id: string;

  /**
   * Paragraph content
   */
  content: string;

  /**
   * References to other documents or paragraphs
   */
  references: Reference[];
}

/**
 * Represents a reference to another document or paragraph
 */
export interface Reference {
  /**
   * Unique identifier for the reference
   */
  id: string;

  /**
   * Type of reference
   */
  type: 'direct' | 'conceptual' | 'supporting';

  /**
   * ID of the target document
   */
  targetDocumentId: string;

  /**
   * ID of the target paragraph
   */
  targetParagraphId: string;

  /**
   * Context for the reference (optional)
   */
  context?: string;
}

/**
 * Represents a relationship between documents
 */
export interface Relationship {
  /**
   * Type of relationship
   */
  type: 'supports' | 'extends' | 'critiques';

  /**
   * ID of the target document
   */
  targetDocumentId: string;

  /**
   * Description of the relationship
   */
  description: string;
}

/**
 * Represents document metadata
 */
export interface DocumentMetadata {
  /**
   * Document title
   */
  title?: string;

  /**
   * Document subtitle
   */
  subtitle?: string;

  /**
   * Document author(s)
   */
  author?: string | string[];

  /**
   * Publication date
   */
  date?: string;

  /**
   * Document categories
   */
  categories?: string[];

  /**
   * Document tags
   */
  tags?: string[];

  /**
   * Related content
   */
  relatedContent?: string[];

  /**
   * Additional metadata properties
   */
  [key: string]: any;
}

/**
 * Compatibility interface for the existing TransformedDocument
 * This allows us to work with the existing document transformer system
 */
export interface TransformedDocumentAdapter {
  /**
   * Convert a TransformedDocument to our Document model
   *
   * @param transformedDocument The transformed document to convert
   * @returns A Document object
   */
  fromTransformedDocument(transformedDocument: any): Document;

  /**
   * Convert our Document model to a TransformedDocument
   *
   * @param document The document to convert
   * @returns A TransformedDocument object
   */
  toTransformedDocument(document: Document): any;
}
