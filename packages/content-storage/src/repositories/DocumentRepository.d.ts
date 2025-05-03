/**
 * Document Repository
 *
 * This module provides a repository implementation for documents.
 */
import { StorageService } from '../interfaces';
import { BaseRepository, BaseRepositoryOptions } from './BaseRepository';
interface DocumentModel {
    id: string;
    type: 'paper' | 'foreword' | 'appendix' | 'chapter';
    publicationId: string;
    number: number;
    title: string;
    author?: string;
    sections: SectionModel[];
    metadata: {
        part?: number;
        partTitle?: string;
        [key: string]: any;
    };
}
interface SectionModel {
    id: string;
    documentId: string;
    number: number | string;
    title: string;
    paragraphs: ParagraphModel[];
    metadata?: {
        hasSpecialFormatting?: boolean;
        specialFormattingType?: string;
        [key: string]: any;
    };
}
interface ParagraphModel {
    id: string;
    documentId: string;
    sectionId: string;
    number: number | string;
    text: string;
    format?: {
        isIndented?: boolean;
        isList?: boolean;
        listType?: 'numbered' | 'bulleted';
        isTable?: boolean;
        hasSpecialFormatting?: boolean;
        specialFormattingType?: string;
    };
    references?: any[];
}
/**
 * Document repository options
 */
export interface DocumentRepositoryOptions extends BaseRepositoryOptions {
    /**
     * Storage service
     */
    storageService: StorageService;
}
/**
 * Document repository implementation
 */
export declare class DocumentRepository extends BaseRepository<DocumentModel> {
    /**
     * Constructor
     * @param options Repository options
     */
    constructor(options: DocumentRepositoryOptions);
    /**
     * Get documents by publication ID
     * @param publicationId Publication ID
     * @returns Promise resolving to an array of documents
     */
    getByPublicationId(publicationId: string): Promise<DocumentModel[]>;
    /**
     * Get documents by type
     * @param type Document type
     * @returns Promise resolving to an array of documents
     */
    getByType(type: DocumentModel['type']): Promise<DocumentModel[]>;
    /**
     * Get documents by publication ID and type
     * @param publicationId Publication ID
     * @param type Document type
     * @returns Promise resolving to an array of documents
     */
    getByPublicationIdAndType(publicationId: string, type: DocumentModel['type']): Promise<DocumentModel[]>;
    /**
     * Get a document by publication ID and number
     * @param publicationId Publication ID
     * @param number Document number
     * @returns Promise resolving to the document or null if not found
     */
    getByPublicationIdAndNumber(publicationId: string, number: number): Promise<DocumentModel | null>;
    /**
     * Get a section by ID
     * @param documentId Document ID
     * @param sectionId Section ID
     * @returns Promise resolving to the section or null if not found
     */
    getSectionById(documentId: string, sectionId: string): Promise<SectionModel | null>;
    /**
     * Get a section by number
     * @param documentId Document ID
     * @param sectionNumber Section number
     * @returns Promise resolving to the section or null if not found
     */
    getSectionByNumber(documentId: string, sectionNumber: number | string): Promise<SectionModel | null>;
    /**
     * Get a paragraph by ID
     * @param documentId Document ID
     * @param sectionId Section ID
     * @param paragraphId Paragraph ID
     * @returns Promise resolving to the paragraph or null if not found
     */
    getParagraphById(documentId: string, sectionId: string, paragraphId: string): Promise<ParagraphModel | null>;
    /**
     * Get a paragraph by number
     * @param documentId Document ID
     * @param sectionId Section ID
     * @param paragraphNumber Paragraph number
     * @returns Promise resolving to the paragraph or null if not found
     */
    getParagraphByNumber(documentId: string, sectionId: string, paragraphNumber: number | string): Promise<ParagraphModel | null>;
    /**
     * Add a section to a document
     * @param documentId Document ID
     * @param section Section to add
     * @returns Promise resolving to the updated document
     */
    addSection(documentId: string, section: SectionModel): Promise<DocumentModel>;
    /**
     * Update a section in a document
     * @param documentId Document ID
     * @param sectionId Section ID
     * @param updates Section updates
     * @returns Promise resolving to the updated document
     */
    updateSection(documentId: string, sectionId: string, updates: Partial<SectionModel>): Promise<DocumentModel>;
    /**
     * Remove a section from a document
     * @param documentId Document ID
     * @param sectionId Section ID
     * @returns Promise resolving to the updated document
     */
    removeSection(documentId: string, sectionId: string): Promise<DocumentModel>;
    /**
     * Add a paragraph to a section
     * @param documentId Document ID
     * @param sectionId Section ID
     * @param paragraph Paragraph to add
     * @returns Promise resolving to the updated document
     */
    addParagraph(documentId: string, sectionId: string, paragraph: ParagraphModel): Promise<DocumentModel>;
    /**
     * Update a paragraph in a section
     * @param documentId Document ID
     * @param sectionId Section ID
     * @param paragraphId Paragraph ID
     * @param updates Paragraph updates
     * @returns Promise resolving to the updated document
     */
    updateParagraph(documentId: string, sectionId: string, paragraphId: string, updates: Partial<ParagraphModel>): Promise<DocumentModel>;
    /**
     * Remove a paragraph from a section
     * @param documentId Document ID
     * @param sectionId Section ID
     * @param paragraphId Paragraph ID
     * @returns Promise resolving to the updated document
     */
    removeParagraph(documentId: string, sectionId: string, paragraphId: string): Promise<DocumentModel>;
}
export {};
//# sourceMappingURL=DocumentRepository.d.ts.map