/**
 * Document module for the UB Ecosystem
 */
import { Document, Section, Paragraph, Reference, ReferenceType, DocumentMetadata } from '../types/document';
export type { Document, Section, Paragraph, Reference, ReferenceType, DocumentMetadata };
/**
 * Create a new document
 */
export declare function createDocument(id: string, title: string, sections?: Section[], metadata?: Partial<DocumentMetadata>): Document;
/**
 * Create a new section
 */
export declare function createSection(id: string, title: string, number: number, paragraphs?: Paragraph[]): Section;
/**
 * Create a new paragraph
 */
export declare function createParagraph(id: string, number: number, text: string, references?: Reference[]): Paragraph;
/**
 * Create a new reference
 */
export declare function createReference(type: ReferenceType, target: string, text: string): Reference;
//# sourceMappingURL=index.d.ts.map