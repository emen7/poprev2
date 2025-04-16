/**
 * Document module for the UB Ecosystem
 */

import {
  Document,
  Section,
  Paragraph,
  Reference,
  ReferenceType,
  DocumentMetadata,
  ContentType,
} from '../types/document';

// Re-export types
export type { Document, Section, Paragraph, Reference, ReferenceType, DocumentMetadata };
export { ContentType };

// This is a placeholder for future implementation
// The actual implementation will be added in subsequent tasks

/**
 * Create a new document
 */
export function createDocument(
  id: string,
  title: string,
  sections: Section[] = [],
  metadata: Partial<DocumentMetadata> = {},
  contentType: ContentType = ContentType.STANDARD
): Document {
  return {
    id,
    title,
    sections,
    metadata: {
      ...metadata,
    },
    contentType,
  };
}

/**
 * Create a new section
 */
export function createSection(
  id: string,
  title: string,
  number: number,
  paragraphs: Paragraph[] = []
): Section {
  return {
    id,
    title,
    number,
    paragraphs,
  };
}

/**
 * Create a new paragraph
 */
export function createParagraph(
  id: string,
  number: number,
  text: string,
  references: Reference[] = []
): Paragraph {
  return {
    id,
    number,
    text,
    references,
  };
}

/**
 * Create a new reference
 */
export function createReference(type: ReferenceType, target: string, text: string): Reference {
  return {
    type,
    target,
    text,
  };
}
