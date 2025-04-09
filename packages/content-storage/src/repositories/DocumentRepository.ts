/**
 * Document Repository
 *
 * This module provides a repository implementation for documents.
 */

import { BaseRepository, BaseRepositoryOptions } from './BaseRepository';
import { StorageService } from '../interfaces';

// Import types from local type definitions until the data-models package is built
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
export class DocumentRepository extends BaseRepository<DocumentModel> {
  /**
   * Constructor
   * @param options Repository options
   */
  constructor(options: DocumentRepositoryOptions) {
    super({
      entityName: options.entityName || 'documents',
      storageService: options.storageService,
    });
  }

  /**
   * Get documents by publication ID
   * @param publicationId Publication ID
   * @returns Promise resolving to an array of documents
   */
  async getByPublicationId(publicationId: string): Promise<DocumentModel[]> {
    return this.find(doc => doc.publicationId === publicationId);
  }

  /**
   * Get documents by type
   * @param type Document type
   * @returns Promise resolving to an array of documents
   */
  async getByType(type: DocumentModel['type']): Promise<DocumentModel[]> {
    return this.find(doc => doc.type === type);
  }

  /**
   * Get documents by publication ID and type
   * @param publicationId Publication ID
   * @param type Document type
   * @returns Promise resolving to an array of documents
   */
  async getByPublicationIdAndType(
    publicationId: string,
    type: DocumentModel['type']
  ): Promise<DocumentModel[]> {
    return this.find(doc => doc.publicationId === publicationId && doc.type === type);
  }

  /**
   * Get a document by publication ID and number
   * @param publicationId Publication ID
   * @param number Document number
   * @returns Promise resolving to the document or null if not found
   */
  async getByPublicationIdAndNumber(
    publicationId: string,
    number: number
  ): Promise<DocumentModel | null> {
    const results = await this.find(
      doc => doc.publicationId === publicationId && doc.number === number
    );

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Get a section by ID
   * @param documentId Document ID
   * @param sectionId Section ID
   * @returns Promise resolving to the section or null if not found
   */
  async getSectionById(documentId: string, sectionId: string): Promise<SectionModel | null> {
    const document = await this.getById(documentId);

    if (!document) {
      return null;
    }

    const section = document.sections.find((s: SectionModel) => s.id === sectionId);
    return section || null;
  }

  /**
   * Get a section by number
   * @param documentId Document ID
   * @param sectionNumber Section number
   * @returns Promise resolving to the section or null if not found
   */
  async getSectionByNumber(
    documentId: string,
    sectionNumber: number | string
  ): Promise<SectionModel | null> {
    const document = await this.getById(documentId);

    if (!document) {
      return null;
    }

    const section = document.sections.find((s: SectionModel) => s.number === sectionNumber);
    return section || null;
  }

  /**
   * Get a paragraph by ID
   * @param documentId Document ID
   * @param sectionId Section ID
   * @param paragraphId Paragraph ID
   * @returns Promise resolving to the paragraph or null if not found
   */
  async getParagraphById(
    documentId: string,
    sectionId: string,
    paragraphId: string
  ): Promise<ParagraphModel | null> {
    const section = await this.getSectionById(documentId, sectionId);

    if (!section) {
      return null;
    }

    const paragraph = section.paragraphs.find((p: ParagraphModel) => p.id === paragraphId);
    return paragraph || null;
  }

  /**
   * Get a paragraph by number
   * @param documentId Document ID
   * @param sectionId Section ID
   * @param paragraphNumber Paragraph number
   * @returns Promise resolving to the paragraph or null if not found
   */
  async getParagraphByNumber(
    documentId: string,
    sectionId: string,
    paragraphNumber: number | string
  ): Promise<ParagraphModel | null> {
    const section = await this.getSectionById(documentId, sectionId);

    if (!section) {
      return null;
    }

    const paragraph = section.paragraphs.find((p: ParagraphModel) => p.number === paragraphNumber);
    return paragraph || null;
  }

  /**
   * Add a section to a document
   * @param documentId Document ID
   * @param section Section to add
   * @returns Promise resolving to the updated document
   */
  async addSection(documentId: string, section: SectionModel): Promise<DocumentModel> {
    const document = await this.getById(documentId);

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Check if section with same ID already exists
    const existingSection = document.sections.find((s: SectionModel) => s.id === section.id);
    if (existingSection) {
      throw new Error(`Section with ID ${section.id} already exists in document ${documentId}`);
    }

    // Add the section
    const updatedSections = [...document.sections, section];

    // Sort sections by number
    updatedSections.sort((a: SectionModel, b: SectionModel) => {
      const aNum = typeof a.number === 'number' ? a.number : parseInt(a.number, 10);
      const bNum = typeof b.number === 'number' ? b.number : parseInt(b.number, 10);
      return aNum - bNum;
    });

    return this.update(documentId, { sections: updatedSections });
  }

  /**
   * Update a section in a document
   * @param documentId Document ID
   * @param sectionId Section ID
   * @param updates Section updates
   * @returns Promise resolving to the updated document
   */
  async updateSection(
    documentId: string,
    sectionId: string,
    updates: Partial<SectionModel>
  ): Promise<DocumentModel> {
    const document = await this.getById(documentId);

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Find the section
    const sectionIndex = document.sections.findIndex((s: SectionModel) => s.id === sectionId);
    if (sectionIndex === -1) {
      throw new Error(`Section with ID ${sectionId} not found in document ${documentId}`);
    }

    // Update the section
    const updatedSections = [...document.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      ...updates,
    };

    return this.update(documentId, { sections: updatedSections });
  }

  /**
   * Remove a section from a document
   * @param documentId Document ID
   * @param sectionId Section ID
   * @returns Promise resolving to the updated document
   */
  async removeSection(documentId: string, sectionId: string): Promise<DocumentModel> {
    const document = await this.getById(documentId);

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Filter out the section
    const updatedSections = document.sections.filter((s: SectionModel) => s.id !== sectionId);

    // Check if section was found
    if (updatedSections.length === document.sections.length) {
      throw new Error(`Section with ID ${sectionId} not found in document ${documentId}`);
    }

    return this.update(documentId, { sections: updatedSections });
  }

  /**
   * Add a paragraph to a section
   * @param documentId Document ID
   * @param sectionId Section ID
   * @param paragraph Paragraph to add
   * @returns Promise resolving to the updated document
   */
  async addParagraph(
    documentId: string,
    sectionId: string,
    paragraph: ParagraphModel
  ): Promise<DocumentModel> {
    const document = await this.getById(documentId);

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Find the section
    const sectionIndex = document.sections.findIndex((s: SectionModel) => s.id === sectionId);
    if (sectionIndex === -1) {
      throw new Error(`Section with ID ${sectionId} not found in document ${documentId}`);
    }

    // Check if paragraph with same ID already exists
    const existingParagraph = document.sections[sectionIndex].paragraphs.find(
      (p: ParagraphModel) => p.id === paragraph.id
    );
    if (existingParagraph) {
      throw new Error(`Paragraph with ID ${paragraph.id} already exists in section ${sectionId}`);
    }

    // Add the paragraph
    const updatedSection = {
      ...document.sections[sectionIndex],
      paragraphs: [...document.sections[sectionIndex].paragraphs, paragraph],
    };

    // Sort paragraphs by number
    updatedSection.paragraphs.sort((a: ParagraphModel, b: ParagraphModel) => {
      const aNum = typeof a.number === 'number' ? a.number : parseInt(a.number, 10);
      const bNum = typeof b.number === 'number' ? b.number : parseInt(b.number, 10);
      return aNum - bNum;
    });

    // Update the section
    const updatedSections = [...document.sections];
    updatedSections[sectionIndex] = updatedSection;

    return this.update(documentId, { sections: updatedSections });
  }

  /**
   * Update a paragraph in a section
   * @param documentId Document ID
   * @param sectionId Section ID
   * @param paragraphId Paragraph ID
   * @param updates Paragraph updates
   * @returns Promise resolving to the updated document
   */
  async updateParagraph(
    documentId: string,
    sectionId: string,
    paragraphId: string,
    updates: Partial<ParagraphModel>
  ): Promise<DocumentModel> {
    const document = await this.getById(documentId);

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Find the section
    const sectionIndex = document.sections.findIndex((s: SectionModel) => s.id === sectionId);
    if (sectionIndex === -1) {
      throw new Error(`Section with ID ${sectionId} not found in document ${documentId}`);
    }

    // Find the paragraph
    const paragraphIndex = document.sections[sectionIndex].paragraphs.findIndex(
      (p: ParagraphModel) => p.id === paragraphId
    );
    if (paragraphIndex === -1) {
      throw new Error(`Paragraph with ID ${paragraphId} not found in section ${sectionId}`);
    }

    // Update the paragraph
    const updatedParagraphs = [...document.sections[sectionIndex].paragraphs];
    updatedParagraphs[paragraphIndex] = {
      ...updatedParagraphs[paragraphIndex],
      ...updates,
    };

    // Update the section
    const updatedSections = [...document.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      paragraphs: updatedParagraphs,
    };

    return this.update(documentId, { sections: updatedSections });
  }

  /**
   * Remove a paragraph from a section
   * @param documentId Document ID
   * @param sectionId Section ID
   * @param paragraphId Paragraph ID
   * @returns Promise resolving to the updated document
   */
  async removeParagraph(
    documentId: string,
    sectionId: string,
    paragraphId: string
  ): Promise<DocumentModel> {
    const document = await this.getById(documentId);

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Find the section
    const sectionIndex = document.sections.findIndex((s: SectionModel) => s.id === sectionId);
    if (sectionIndex === -1) {
      throw new Error(`Section with ID ${sectionId} not found in document ${documentId}`);
    }

    // Filter out the paragraph
    const updatedParagraphs = document.sections[sectionIndex].paragraphs.filter(
      (p: ParagraphModel) => p.id !== paragraphId
    );

    // Check if paragraph was found
    if (updatedParagraphs.length === document.sections[sectionIndex].paragraphs.length) {
      throw new Error(`Paragraph with ID ${paragraphId} not found in section ${sectionId}`);
    }

    // Update the section
    const updatedSections = [...document.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      paragraphs: updatedParagraphs,
    };

    return this.update(documentId, { sections: updatedSections });
  }
}
