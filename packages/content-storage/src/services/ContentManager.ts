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
export class ContentManager {
  private storageService: StorageService;
  private documentRepository: DocumentRepository;
  private publicationRepository: PublicationRepository;

  /**
   * Constructor
   * @param options Content manager options
   */
  constructor(options: ContentManagerOptions) {
    this.storageService = options.storageService;

    this.documentRepository = new DocumentRepository({
      entityName: options.documentRepositoryOptions?.entityName || 'documents',
      storageService: this.storageService,
    });

    this.publicationRepository = new PublicationRepository({
      entityName: options.publicationRepositoryOptions?.entityName || 'publications',
      storageService: this.storageService,
    });
  }

  /**
   * Initialize the content manager
   * @returns Promise resolving to true if successful
   */
  async initialize(): Promise<boolean> {
    return this.storageService.initialize();
  }

  /**
   * Get the document repository
   * @returns Document repository
   */
  getDocumentRepository(): DocumentRepository {
    return this.documentRepository;
  }

  /**
   * Get the publication repository
   * @returns Publication repository
   */
  getPublicationRepository(): PublicationRepository {
    return this.publicationRepository;
  }

  /**
   * Import a publication with all its documents
   * @param publication Publication to import
   * @param documents Documents to import
   * @returns Promise resolving to true if successful
   */
  async importPublication(publication: any, documents: any[]): Promise<boolean> {
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
      } catch (error) {
        // Abort the transaction on error
        await transaction.abort();
        throw error;
      }
    } catch (error) {
      console.error('Failed to import publication:', error);
      return false;
    }
  }

  /**
   * Export a publication with all its documents
   * @param publicationId Publication ID
   * @returns Promise resolving to the publication and its documents
   */
  async exportPublication(publicationId: string): Promise<{ publication: any; documents: any[] }> {
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
  async getDocumentWithPublication(
    documentId: string
  ): Promise<{ document: any; publication: any }> {
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
  async getAllPublicationsWithDocuments(): Promise<{ publication: any; documents: any[] }[]> {
    // Get all publications
    const publications = await this.publicationRepository.getAll();

    // Get documents for each publication
    const result = await Promise.all(
      publications.map(async publication => {
        const documents = await this.documentRepository.getByPublicationId(publication.id);
        return {
          publication,
          documents,
        };
      })
    );

    return result;
  }

  /**
   * Clear all content
   * @returns Promise resolving to true if successful
   */
  async clearAllContent(): Promise<boolean> {
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
      } catch (error) {
        // Abort the transaction on error
        await transaction.abort();
        throw error;
      }
    } catch (error) {
      console.error('Failed to clear content:', error);
      return false;
    }
  }

  /**
   * Get storage statistics
   * @returns Promise resolving to storage statistics
   */
  async getStorageStatistics(): Promise<any> {
    return this.storageService.getStatistics();
  }
}
