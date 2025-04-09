/**
 * Document Model
 *
 * This module defines the core document model interfaces for the UB Ecosystem.
 */
/**
 * Base document model interface
 */
export interface DocumentModel {
    /**
     * Unique identifier for the document
     */
    id: string;
    /**
     * Type of document
     */
    type: 'paper' | 'foreword' | 'appendix' | 'chapter';
    /**
     * ID of the publication this document belongs to
     */
    publicationId: string;
    /**
     * Document number (e.g., paper number)
     */
    number: number;
    /**
     * Document title
     */
    title: string;
    /**
     * Document author (if applicable)
     */
    author?: string;
    /**
     * Document sections
     */
    sections: SectionModel[];
    /**
     * Additional metadata
     */
    metadata: DocumentMetadata;
}
/**
 * Document metadata
 */
export interface DocumentMetadata {
    /**
     * Part number (if applicable)
     */
    part?: number;
    /**
     * Part title (if applicable)
     */
    partTitle?: string;
    /**
     * Date the document was created
     */
    dateCreated?: string;
    /**
     * Date the document was last modified
     */
    lastModified?: string;
    /**
     * Document version
     */
    version?: string;
    /**
     * Any additional metadata
     */
    [key: string]: any;
}
/**
 * Section model interface
 */
export interface SectionModel {
    /**
     * Unique identifier for the section
     */
    id: string;
    /**
     * ID of the document this section belongs to
     */
    documentId: string;
    /**
     * Section number
     */
    number: number | string;
    /**
     * Section title
     */
    title: string;
    /**
     * Section paragraphs
     */
    paragraphs: ParagraphModel[];
    /**
     * Additional metadata
     */
    metadata?: {
        /**
         * Whether this section has special formatting
         */
        hasSpecialFormatting?: boolean;
        /**
         * Type of special formatting
         */
        specialFormattingType?: string;
        /**
         * Any additional metadata
         */
        [key: string]: any;
    };
}
/**
 * Paragraph model interface
 */
export interface ParagraphModel {
    /**
     * Unique identifier for the paragraph
     */
    id: string;
    /**
     * ID of the document this paragraph belongs to
     */
    documentId: string;
    /**
     * ID of the section this paragraph belongs to
     */
    sectionId: string;
    /**
     * Paragraph number
     */
    number: number | string;
    /**
     * Paragraph text content
     */
    text: string;
    /**
     * Formatting information
     */
    format?: {
        /**
         * Whether this paragraph is indented
         */
        isIndented?: boolean;
        /**
         * Whether this paragraph is part of a list
         */
        isList?: boolean;
        /**
         * Type of list if this paragraph is part of a list
         */
        listType?: 'numbered' | 'bulleted';
        /**
         * Whether this paragraph is part of a table
         */
        isTable?: boolean;
        /**
         * Whether this paragraph has special formatting
         */
        hasSpecialFormatting?: boolean;
        /**
         * Type of special formatting
         */
        specialFormattingType?: string;
    };
    /**
     * References found in this paragraph
     */
    references?: ReferenceModel[];
}
/**
 * Reference model interface
 */
export interface ReferenceModel {
    /**
     * Unique identifier for the reference
     */
    id: string;
    /**
     * Reference text as it appears in the content
     */
    text: string;
    /**
     * Type of reference
     */
    type: 'paper' | 'section' | 'paragraph' | 'external';
    /**
     * Target document ID
     */
    targetDocumentId?: string;
    /**
     * Target section ID
     */
    targetSectionId?: string;
    /**
     * Target paragraph ID
     */
    targetParagraphId?: string;
    /**
     * External URL (for external references)
     */
    externalUrl?: string;
    /**
     * Start position in the paragraph text
     */
    startPosition: number;
    /**
     * End position in the paragraph text
     */
    endPosition: number;
}
//# sourceMappingURL=DocumentModel.d.ts.map