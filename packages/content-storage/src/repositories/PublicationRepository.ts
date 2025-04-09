/**
 * Publication Repository
 *
 * This module provides a repository implementation for publications.
 */

import { BaseRepository, BaseRepositoryOptions } from './BaseRepository';
import { StorageService } from '../interfaces';

// Import types from local type definitions until the data-models package is built
interface PublicationModel {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  language: string;
  version: string;
  datePublished: string;
  lastUpdated: string;
  structure: PublicationStructure;
  config: PublicationConfig;
}

interface PublicationStructure {
  hasParts: boolean;
  parts?: PublicationPart[];
  hasForeword: boolean;
  hasAppendices: boolean;
}

interface PublicationPart {
  number: number;
  title: string;
  documentIds: string[];
}

interface PublicationConfig {
  defaultFormatType: 'traditional' | 'modern';
  showParagraphNumbers: boolean;
  enableReferenceDetection: boolean;
  enableCrossPublicationReferences: boolean;
  enableAnnotations: boolean;
  enableSearch: boolean;
  enableOfflineAccess: boolean;
  customStyles?: {
    [key: string]: string;
  };
  [key: string]: any;
}

/**
 * Publication repository options
 */
export interface PublicationRepositoryOptions extends BaseRepositoryOptions {
  /**
   * Storage service
   */
  storageService: StorageService;
}

/**
 * Publication repository implementation
 */
export class PublicationRepository extends BaseRepository<PublicationModel> {
  /**
   * Constructor
   * @param options Repository options
   */
  constructor(options: PublicationRepositoryOptions) {
    super({
      entityName: options.entityName || 'publications',
      storageService: options.storageService,
    });
  }

  /**
   * Get a publication by title
   * @param title Publication title
   * @returns Promise resolving to the publication or null if not found
   */
  async getByTitle(title: string): Promise<PublicationModel | null> {
    const results = await this.find(
      pub =>
        pub.title.toLowerCase() === title.toLowerCase() ||
        pub.shortTitle.toLowerCase() === title.toLowerCase()
    );

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Get publications by language
   * @param language Language code
   * @returns Promise resolving to an array of publications
   */
  async getByLanguage(language: string): Promise<PublicationModel[]> {
    return this.find(pub => pub.language === language);
  }

  /**
   * Get the latest version of a publication
   * @param publicationId Publication ID
   * @returns Promise resolving to the latest version of the publication
   */
  async getLatestVersion(publicationId: string): Promise<PublicationModel | null> {
    const publications = await this.find(pub => pub.id.startsWith(publicationId));

    if (publications.length === 0) {
      return null;
    }

    // Sort by version (assuming semantic versioning)
    publications.sort((a, b) => {
      const aVersion = a.version.split('.').map(Number);
      const bVersion = b.version.split('.').map(Number);

      for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
        const aNum = i < aVersion.length ? aVersion[i] : 0;
        const bNum = i < bVersion.length ? bVersion[i] : 0;

        if (aNum !== bNum) {
          return bNum - aNum; // Descending order
        }
      }

      return 0;
    });

    return publications[0];
  }

  /**
   * Update publication configuration
   * @param publicationId Publication ID
   * @param config Updated configuration
   * @returns Promise resolving to the updated publication
   */
  async updateConfig(
    publicationId: string,
    config: Partial<PublicationConfig>
  ): Promise<PublicationModel> {
    const publication = await this.getById(publicationId);

    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }

    const updatedConfig = {
      ...publication.config,
      ...config,
    };

    return this.update(publicationId, { config: updatedConfig });
  }

  /**
   * Add a part to a publication
   * @param publicationId Publication ID
   * @param part Part to add
   * @returns Promise resolving to the updated publication
   */
  async addPart(publicationId: string, part: PublicationPart): Promise<PublicationModel> {
    const publication = await this.getById(publicationId);

    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }

    // Check if part with same number already exists
    const existingPart = publication.structure.parts?.find(p => p.number === part.number);
    if (existingPart) {
      throw new Error(
        `Part with number ${part.number} already exists in publication ${publicationId}`
      );
    }

    // Add the part
    const updatedParts = [...(publication.structure.parts || []), part];

    // Sort parts by number
    updatedParts.sort((a, b) => a.number - b.number);

    const updatedStructure = {
      ...publication.structure,
      hasParts: true,
      parts: updatedParts,
    };

    return this.update(publicationId, { structure: updatedStructure });
  }

  /**
   * Update a part in a publication
   * @param publicationId Publication ID
   * @param partNumber Part number
   * @param updates Part updates
   * @returns Promise resolving to the updated publication
   */
  async updatePart(
    publicationId: string,
    partNumber: number,
    updates: Partial<PublicationPart>
  ): Promise<PublicationModel> {
    const publication = await this.getById(publicationId);

    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }

    if (!publication.structure.parts) {
      throw new Error(`Publication ${publicationId} has no parts`);
    }

    // Find the part
    const partIndex = publication.structure.parts.findIndex(p => p.number === partNumber);
    if (partIndex === -1) {
      throw new Error(`Part with number ${partNumber} not found in publication ${publicationId}`);
    }

    // Update the part
    const updatedParts = [...publication.structure.parts];
    updatedParts[partIndex] = {
      ...updatedParts[partIndex],
      ...updates,
    };

    const updatedStructure = {
      ...publication.structure,
      parts: updatedParts,
    };

    return this.update(publicationId, { structure: updatedStructure });
  }

  /**
   * Remove a part from a publication
   * @param publicationId Publication ID
   * @param partNumber Part number
   * @returns Promise resolving to the updated publication
   */
  async removePart(publicationId: string, partNumber: number): Promise<PublicationModel> {
    const publication = await this.getById(publicationId);

    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }

    if (!publication.structure.parts) {
      throw new Error(`Publication ${publicationId} has no parts`);
    }

    // Filter out the part
    const updatedParts = publication.structure.parts.filter(p => p.number !== partNumber);

    // Check if part was found
    if (updatedParts.length === publication.structure.parts.length) {
      throw new Error(`Part with number ${partNumber} not found in publication ${publicationId}`);
    }

    const updatedStructure = {
      ...publication.structure,
      hasParts: updatedParts.length > 0,
      parts: updatedParts,
    };

    return this.update(publicationId, { structure: updatedStructure });
  }

  /**
   * Add a document to a part
   * @param publicationId Publication ID
   * @param partNumber Part number
   * @param documentId Document ID
   * @returns Promise resolving to the updated publication
   */
  async addDocumentToPart(
    publicationId: string,
    partNumber: number,
    documentId: string
  ): Promise<PublicationModel> {
    const publication = await this.getById(publicationId);

    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }

    if (!publication.structure.parts) {
      throw new Error(`Publication ${publicationId} has no parts`);
    }

    // Find the part
    const partIndex = publication.structure.parts.findIndex(p => p.number === partNumber);
    if (partIndex === -1) {
      throw new Error(`Part with number ${partNumber} not found in publication ${publicationId}`);
    }

    // Check if document already exists in the part
    if (publication.structure.parts[partIndex].documentIds.includes(documentId)) {
      throw new Error(`Document ${documentId} already exists in part ${partNumber}`);
    }

    // Add the document
    const updatedPart = {
      ...publication.structure.parts[partIndex],
      documentIds: [...publication.structure.parts[partIndex].documentIds, documentId],
    };

    // Update the part
    const updatedParts = [...publication.structure.parts];
    updatedParts[partIndex] = updatedPart;

    const updatedStructure = {
      ...publication.structure,
      parts: updatedParts,
    };

    return this.update(publicationId, { structure: updatedStructure });
  }

  /**
   * Remove a document from a part
   * @param publicationId Publication ID
   * @param partNumber Part number
   * @param documentId Document ID
   * @returns Promise resolving to the updated publication
   */
  async removeDocumentFromPart(
    publicationId: string,
    partNumber: number,
    documentId: string
  ): Promise<PublicationModel> {
    const publication = await this.getById(publicationId);

    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }

    if (!publication.structure.parts) {
      throw new Error(`Publication ${publicationId} has no parts`);
    }

    // Find the part
    const partIndex = publication.structure.parts.findIndex(p => p.number === partNumber);
    if (partIndex === -1) {
      throw new Error(`Part with number ${partNumber} not found in publication ${publicationId}`);
    }

    // Filter out the document
    const updatedDocumentIds = publication.structure.parts[partIndex].documentIds.filter(
      id => id !== documentId
    );

    // Check if document was found
    if (updatedDocumentIds.length === publication.structure.parts[partIndex].documentIds.length) {
      throw new Error(`Document ${documentId} not found in part ${partNumber}`);
    }

    // Update the part
    const updatedPart = {
      ...publication.structure.parts[partIndex],
      documentIds: updatedDocumentIds,
    };

    const updatedParts = [...publication.structure.parts];
    updatedParts[partIndex] = updatedPart;

    const updatedStructure = {
      ...publication.structure,
      parts: updatedParts,
    };

    return this.update(publicationId, { structure: updatedStructure });
  }
}
