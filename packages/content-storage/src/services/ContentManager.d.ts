/**
 * Content Manager
 *
 * This module provides a high-level API for managing content.
 */
import { StorageService } from '../interfaces';
import { DocumentRepository, PublicationRepository } from '../repositories';
/**
 * Content manager options
 */
export interface ContentManagerOptions {
    /**
     * Storage service
     */
    storageService: StorageService;
    /**
     * Document repository options
     */
    documentRepositoryOptions?: {
        /**
         * Entity name for documents
         * @default 'documents'
         */
        entityName?: string;
    };
    /**
     * Publication repository options
     */
    publicationRepositoryOptions?: {
        /**
         * Entity name for publications
         * @default 'publications'
         */
        entityName?: string;
    };
}
/**
 * Content manager service
 */
export declare class ContentManager {
    private storageService;
    private documentRepository;
    private publicationRepository;
    /**
     * Constructor
     * @param options Content manager options
     */
    constructor(options: ContentManagerOptions);
    /**
     * Initialize the content manager
     * @returns Promise resolving to true if successful
     */
    initialize(): Promise<boolean>;
    /**
     * Get the document repository
     * @returns Document repository
     */
    getDocumentRepository(): DocumentRepository;
    /**
     * Get the publication repository
     * @returns Publication repository
     */
    getPublicationRepository(): PublicationRepository;
    /**
     * Import a publication with all its documents
     * @param publication Publication to import
     * @param documents Documents to import
     * @returns Promise resolving to true if successful
     */
    importPublication(publication: any, documents: any[]): Promise<boolean>;
    /**
     * Export a publication with all its documents
     * @param publicationId Publication ID
     * @returns Promise resolving to the publication and its documents
     */
    exportPublication(publicationId: string): Promise<{
        publication: any;
        documents: any[];
    }>;
    /**
     * Get a document with its publication
     * @param documentId Document ID
     * @returns Promise resolving to the document and its publication
     */
    getDocumentWithPublication(documentId: string): Promise<{
        document: any;
        publication: any;
    }>;
    /**
     * Get all publications with their documents
     * @returns Promise resolving to an array of publications with their documents
     */
    getAllPublicationsWithDocuments(): Promise<{
        publication: any;
        documents: any[];
    }[]>;
    /**
     * Clear all content
     * @returns Promise resolving to true if successful
     */
    clearAllContent(): Promise<boolean>;
    /**
     * Get storage statistics
     * @returns Promise resolving to storage statistics
     */
    getStorageStatistics(): Promise<any>;
}
//# sourceMappingURL=ContentManager.d.ts.map