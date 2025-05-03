/**
 * Publication Repository
 *
 * This module provides a repository implementation for publications.
 */
import { StorageService } from '../interfaces';
import { BaseRepository, BaseRepositoryOptions } from './BaseRepository';
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
export declare class PublicationRepository extends BaseRepository<PublicationModel> {
    /**
     * Constructor
     * @param options Repository options
     */
    constructor(options: PublicationRepositoryOptions);
    /**
     * Get a publication by title
     * @param title Publication title
     * @returns Promise resolving to the publication or null if not found
     */
    getByTitle(title: string): Promise<PublicationModel | null>;
    /**
     * Get publications by language
     * @param language Language code
     * @returns Promise resolving to an array of publications
     */
    getByLanguage(language: string): Promise<PublicationModel[]>;
    /**
     * Get the latest version of a publication
     * @param publicationId Publication ID
     * @returns Promise resolving to the latest version of the publication
     */
    getLatestVersion(publicationId: string): Promise<PublicationModel | null>;
    /**
     * Update publication configuration
     * @param publicationId Publication ID
     * @param config Updated configuration
     * @returns Promise resolving to the updated publication
     */
    updateConfig(publicationId: string, config: Partial<PublicationConfig>): Promise<PublicationModel>;
    /**
     * Add a part to a publication
     * @param publicationId Publication ID
     * @param part Part to add
     * @returns Promise resolving to the updated publication
     */
    addPart(publicationId: string, part: PublicationPart): Promise<PublicationModel>;
    /**
     * Update a part in a publication
     * @param publicationId Publication ID
     * @param partNumber Part number
     * @param updates Part updates
     * @returns Promise resolving to the updated publication
     */
    updatePart(publicationId: string, partNumber: number, updates: Partial<PublicationPart>): Promise<PublicationModel>;
    /**
     * Remove a part from a publication
     * @param publicationId Publication ID
     * @param partNumber Part number
     * @returns Promise resolving to the updated publication
     */
    removePart(publicationId: string, partNumber: number): Promise<PublicationModel>;
    /**
     * Add a document to a part
     * @param publicationId Publication ID
     * @param partNumber Part number
     * @param documentId Document ID
     * @returns Promise resolving to the updated publication
     */
    addDocumentToPart(publicationId: string, partNumber: number, documentId: string): Promise<PublicationModel>;
    /**
     * Remove a document from a part
     * @param publicationId Publication ID
     * @param partNumber Part number
     * @param documentId Document ID
     * @returns Promise resolving to the updated publication
     */
    removeDocumentFromPart(publicationId: string, partNumber: number, documentId: string): Promise<PublicationModel>;
}
export {};
//# sourceMappingURL=PublicationRepository.d.ts.map