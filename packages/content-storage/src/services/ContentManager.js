/**
 * Content Manager
 *
 * This module provides a high-level API for managing content.
 */
import { DocumentRepository, PublicationRepository } from '../repositories';
/**
 * Content manager service
 */
export class ContentManager {
    /**
     * Constructor
     * @param options Content manager options
     */
    constructor(options) {
        var _a, _b;
        this.storageService = options.storageService;
        this.documentRepository = new DocumentRepository({
            entityName: ((_a = options.documentRepositoryOptions) === null || _a === void 0 ? void 0 : _a.entityName) || 'documents',
            storageService: this.storageService,
        });
        this.publicationRepository = new PublicationRepository({
            entityName: ((_b = options.publicationRepositoryOptions) === null || _b === void 0 ? void 0 : _b.entityName) || 'publications',
            storageService: this.storageService,
        });
    }
    /**
     * Initialize the content manager
     * @returns Promise resolving to true if successful
     */
    async initialize() {
        return this.storageService.initialize();
    }
    /**
     * Get the document repository
     * @returns Document repository
     */
    getDocumentRepository() {
        return this.documentRepository;
    }
    /**
     * Get the publication repository
     * @returns Publication repository
     */
    getPublicationRepository() {
        return this.publicationRepository;
    }
    /**
     * Import a publication with all its documents
     * @param publication Publication to import
     * @param documents Documents to import
     * @returns Promise resolving to true if successful
     */
    async importPublication(publication, documents) {
        try {
            // Start a transaction
            const transaction = await this.storageService.startTransaction([
                this.publicationRepository.getEntityName(),
                this.documentRepository.getEntityName(),
            ]);
            try {
                // Add the publication
                await this.publicationRepository.create(publication);
                // Add all documents
                await this.documentRepository.createMany(documents);
                // Commit the transaction
                await transaction.commit();
                return true;
            }
            catch (error) {
                // Abort the transaction on error
                await transaction.abort();
                throw error;
            }
        }
        catch (error) {
            console.error('Failed to import publication:', error);
            return false;
        }
    }
    /**
     * Export a publication with all its documents
     * @param publicationId Publication ID
     * @returns Promise resolving to the publication and its documents
     */
    async exportPublication(publicationId) {
        // Get the publication
        const publication = await this.publicationRepository.getById(publicationId);
        if (!publication) {
            throw new Error(`Publication with ID ${publicationId} not found`);
        }
        // Get all documents for the publication
        const documents = await this.documentRepository.getByPublicationId(publicationId);
        return {
            publication,
            documents,
        };
    }
    /**
     * Get a document with its publication
     * @param documentId Document ID
     * @returns Promise resolving to the document and its publication
     */
    async getDocumentWithPublication(documentId) {
        // Get the document
        const document = await this.documentRepository.getById(documentId);
        if (!document) {
            throw new Error(`Document with ID ${documentId} not found`);
        }
        // Get the publication
        const publication = await this.publicationRepository.getById(document.publicationId);
        if (!publication) {
            throw new Error(`Publication with ID ${document.publicationId} not found`);
        }
        return {
            document,
            publication,
        };
    }
    /**
     * Get all publications with their documents
     * @returns Promise resolving to an array of publications with their documents
     */
    async getAllPublicationsWithDocuments() {
        // Get all publications
        const publications = await this.publicationRepository.getAll();
        // Get documents for each publication
        const result = await Promise.all(publications.map(async (publication) => {
            const documents = await this.documentRepository.getByPublicationId(publication.id);
            return {
                publication,
                documents,
            };
        }));
        return result;
    }
    /**
     * Clear all content
     * @returns Promise resolving to true if successful
     */
    async clearAllContent() {
        try {
            // Start a transaction
            const transaction = await this.storageService.startTransaction([
                this.publicationRepository.getEntityName(),
                this.documentRepository.getEntityName(),
            ]);
            try {
                // Clear all publications
                await this.publicationRepository.clear();
                // Clear all documents
                await this.documentRepository.clear();
                // Commit the transaction
                await transaction.commit();
                return true;
            }
            catch (error) {
                // Abort the transaction on error
                await transaction.abort();
                throw error;
            }
        }
        catch (error) {
            console.error('Failed to clear content:', error);
            return false;
        }
    }
    /**
     * Get storage statistics
     * @returns Promise resolving to storage statistics
     */
    async getStorageStatistics() {
        return this.storageService.getStatistics();
    }
}
//# sourceMappingURL=ContentManager.js.map