import {
  UBContentItem,
  UBPart,
  UBPaper,
  UBSection,
  UBParagraph,
  StructuredUBPart,
  StructuredUBPaper,
  StructuredUBSection,
  StructuredUBContent,
  UBContentMetadata,
  UBReference,
  parseUBReference,
} from '../types/ub-content.types';
import { loadJsonFile, fileExists } from '../utils/fileUtils';

// Base path for UB content
const UB_CONTENT_BASE_PATH = '/apps/ub-reader/content/ub-json';

/**
 * Service for loading and accessing Urantia Book content
 */
export class UBContentService {
  private static instance: UBContentService;
  private content: StructuredUBContent | null = null;
  private metadata: UBContentMetadata | null = null;
  private isLoading = false;
  private loadPromise: Promise<StructuredUBContent> | null = null;

  /**
   * Get the singleton instance of UBContentService
   */
  public static getInstance(): UBContentService {
    if (!UBContentService.instance) {
      UBContentService.instance = new UBContentService();
    }
    return UBContentService.instance;
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Load the UB content from the JSON files
   * @returns Promise that resolves to the structured UB content
   */
  public async loadContent(): Promise<StructuredUBContent> {
    // If content is already loaded, return it
    if (this.content) {
      return this.content;
    }

    // If content is already being loaded, return the existing promise
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    // Set loading state
    this.isLoading = true;

    // Create a new promise to load the content
    this.loadPromise = new Promise<StructuredUBContent>(async (resolve, reject) => {
      try {
        // Load the parts
        const parts = await this.loadParts();

        // Create the structured content
        const structuredContent: StructuredUBContent = {
          parts: [],
        };

        // Process each part
        for (const part of parts) {
          const structuredPart = await this.processPartContent(part);
          structuredContent.parts.push(structuredPart);
        }

        // Generate metadata
        this.metadata = this.generateMetadata(structuredContent);

        // Store the content
        this.content = structuredContent;

        // Reset loading state
        this.isLoading = false;

        // Resolve the promise with the content
        resolve(structuredContent);
      } catch (error) {
        // Reset loading state
        this.isLoading = false;

        // Reject the promise with the error
        reject(error);
      }
    });

    return this.loadPromise;
  }

  /**
   * Load the UB parts from the JSON files
   * @returns Promise that resolves to an array of UB parts
   */
  private async loadParts(): Promise<UBPart[]> {
    try {
      const parts: UBPart[] = [];

      // Load part 1
      const part1Exists = await fileExists(`${UB_CONTENT_BASE_PATH}/1-part.json`);
      if (part1Exists) {
        const part1Data = await loadJsonFile<UBPart[]>(`${UB_CONTENT_BASE_PATH}/1-part.json`);
        parts.push(...part1Data);
      }

      // Load part 2
      const part2Exists = await fileExists(`${UB_CONTENT_BASE_PATH}/2-part.json`);
      if (part2Exists) {
        const part2Data = await loadJsonFile<UBPart[]>(`${UB_CONTENT_BASE_PATH}/2-part.json`);
        parts.push(...part2Data);
      }

      // Load part 3
      const part3Exists = await fileExists(`${UB_CONTENT_BASE_PATH}/3-part.json`);
      if (part3Exists) {
        const part3Data = await loadJsonFile<UBPart[]>(`${UB_CONTENT_BASE_PATH}/3-part.json`);
        parts.push(...part3Data);
      }

      // Load part 4
      const part4Exists = await fileExists(`${UB_CONTENT_BASE_PATH}/4-part.json`);
      if (part4Exists) {
        const part4Data = await loadJsonFile<UBPart[]>(`${UB_CONTENT_BASE_PATH}/4-part.json`);
        parts.push(...part4Data);
      }

      return parts;
    } catch (error) {
      console.error('Error loading UB parts:', error);
      throw error;
    }
  }

  /**
   * Process a UB part and its papers
   * @param part UB part
   * @returns Promise that resolves to a structured UB part
   */
  private async processPartContent(part: UBPart): Promise<StructuredUBPart> {
    try {
      // Create the structured part
      const structuredPart: StructuredUBPart = {
        part,
        papers: [],
      };

      // Load papers for the part
      const papers = await this.loadPapersForPart(part.partId);

      // Process each paper
      for (const paper of papers) {
        const structuredPaper = await this.processPaperContent(paper);
        structuredPart.papers.push(structuredPaper);
      }

      return structuredPart;
    } catch (error) {
      console.error(`Error processing part ${part.partId}:`, error);
      throw error;
    }
  }

  /**
   * Load the papers for a part
   * @param partId Part ID
   * @returns Promise that resolves to an array of UB papers
   */
  private async loadPapersForPart(partId: string): Promise<UBPaper[]> {
    try {
      const papers: UBPaper[] = [];

      // Determine the paper range for the part
      let startPaper = 0;
      let endPaper = 0;

      switch (partId) {
        case '1':
          startPaper = 1;
          endPaper = 31;
          break;
        case '2':
          startPaper = 32;
          endPaper = 56;
          break;
        case '3':
          startPaper = 57;
          endPaper = 119;
          break;
        case '4':
          startPaper = 120;
          endPaper = 196;
          break;
        default:
          throw new Error(`Invalid part ID: ${partId}`);
      }

      // Load each paper in the range
      for (let i = startPaper; i <= endPaper; i++) {
        const paperNumber = i.toString().padStart(3, '0');
        const paperExists = await fileExists(`${UB_CONTENT_BASE_PATH}/${paperNumber}.json`);

        if (paperExists) {
          const paperData = await loadJsonFile<UBContentItem[]>(
            `${UB_CONTENT_BASE_PATH}/${paperNumber}.json`
          );

          // Find the paper item
          const paperItem = paperData.find(item => item.type === 'paper') as UBPaper;

          if (paperItem) {
            papers.push(paperItem);
          }
        }
      }

      return papers;
    } catch (error) {
      console.error(`Error loading papers for part ${partId}:`, error);
      throw error;
    }
  }

  /**
   * Process a UB paper and its sections
   * @param paper UB paper
   * @returns Promise that resolves to a structured UB paper
   */
  private async processPaperContent(paper: UBPaper): Promise<StructuredUBPaper> {
    try {
      // Create the structured paper
      const structuredPaper: StructuredUBPaper = {
        paper,
        sections: [],
      };

      // Load the paper content
      const paperNumber = paper.paperId.padStart(3, '0');
      const paperContent = await loadJsonFile<UBContentItem[]>(
        `${UB_CONTENT_BASE_PATH}/${paperNumber}.json`
      );

      // Group the content by section
      const sectionMap = new Map<string, UBContentItem[]>();

      for (const item of paperContent) {
        if (item.type === 'section' || item.type === 'paragraph') {
          // Type guard to ensure we're dealing with a section or paragraph
          const sectionItem = item as UBSection | UBParagraph;
          const sectionId = sectionItem.sectionId;

          if (!sectionMap.has(sectionId)) {
            sectionMap.set(sectionId, []);
          }

          sectionMap.get(sectionId)!.push(item);
        }
      }

      // Process each section
      for (const [sectionId, sectionItems] of sectionMap.entries()) {
        // Find the section item
        const sectionItem = sectionItems.find(item => item.type === 'section') as UBSection;

        if (sectionItem) {
          // Find the paragraphs for the section
          const paragraphs = sectionItems.filter(
            item => item.type === 'paragraph'
          ) as UBParagraph[];

          // Sort the paragraphs by sortId
          paragraphs.sort((a, b) => a.sortId.localeCompare(b.sortId));

          // Create the structured section
          const structuredSection: StructuredUBSection = {
            section: sectionItem,
            paragraphs,
          };

          // Add the section to the paper
          structuredPaper.sections.push(structuredSection);
        }
      }

      // Sort the sections by sortId
      structuredPaper.sections.sort((a, b) => a.section.sortId.localeCompare(b.section.sortId));

      return structuredPaper;
    } catch (error) {
      console.error(`Error processing paper ${paper.paperId}:`, error);
      throw error;
    }
  }

  /**
   * Generate metadata for the UB content
   * @param content Structured UB content
   * @returns UB content metadata
   */
  private generateMetadata(content: StructuredUBContent): UBContentMetadata {
    let totalParts = 0;
    let totalPapers = 0;
    let totalSections = 0;
    let totalParagraphs = 0;

    // Count parts
    totalParts = content.parts.length;

    // Count papers, sections, and paragraphs
    for (const part of content.parts) {
      totalPapers += part.papers.length;

      for (const paper of part.papers) {
        totalSections += paper.sections.length;

        for (const section of paper.sections) {
          totalParagraphs += section.paragraphs.length;
        }
      }
    }

    return {
      totalParts,
      totalPapers,
      totalSections,
      totalParagraphs,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get the UB content
   * @returns Structured UB content or null if not loaded
   */
  public getContent(): StructuredUBContent | null {
    return this.content;
  }

  /**
   * Get the UB content metadata
   * @returns UB content metadata or null if not loaded
   */
  public getMetadata(): UBContentMetadata | null {
    return this.metadata;
  }

  /**
   * Get a UB part by ID
   * @param partId Part ID
   * @returns Structured UB part or null if not found
   */
  public getPart(partId: string): StructuredUBPart | null {
    if (!this.content) return null;

    return this.content.parts.find(part => part.part.partId === partId) || null;
  }

  /**
   * Get a UB paper by ID
   * @param paperId Paper ID
   * @returns Structured UB paper or null if not found
   */
  public getPaper(paperId: string): StructuredUBPaper | null {
    if (!this.content) return null;

    for (const part of this.content.parts) {
      const paper = part.papers.find(paper => paper.paper.paperId === paperId);
      if (paper) return paper;
    }

    return null;
  }

  /**
   * Get a UB section by paper ID and section ID
   * @param paperId Paper ID
   * @param sectionId Section ID
   * @returns Structured UB section or null if not found
   */
  public getSection(paperId: string, sectionId: string): StructuredUBSection | null {
    const paper = this.getPaper(paperId);
    if (!paper) return null;

    return paper.sections.find(section => section.section.sectionId === sectionId) || null;
  }

  /**
   * Get a UB paragraph by paper ID, section ID, and paragraph ID
   * @param paperId Paper ID
   * @param sectionId Section ID
   * @param paragraphId Paragraph ID
   * @returns UB paragraph or null if not found
   */
  public getParagraph(paperId: string, sectionId: string, paragraphId: string): UBParagraph | null {
    const section = this.getSection(paperId, sectionId);
    if (!section) return null;

    return section.paragraphs.find(paragraph => paragraph.paragraphId === paragraphId) || null;
  }

  /**
   * Get a UB paragraph by reference
   * @param reference UB reference (e.g., "1:1.2")
   * @returns UB paragraph or null if not found
   */
  public getParagraphByReference(reference: string): UBParagraph | null {
    const parsedReference = parseUBReference(reference);
    if (!parsedReference) return null;

    return this.getParagraph(
      parsedReference.paperId,
      parsedReference.sectionId,
      parsedReference.paragraphId
    );
  }

  /**
   * Search for UB content
   * @param query Search query
   * @returns Array of UB content items that match the query
   */
  public search(query: string): UBContentItem[] {
    if (!this.content || !query) return [];

    const results: UBContentItem[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in parts
    for (const part of this.content.parts) {
      // Search in part title
      if (part.part.partTitle.toLowerCase().includes(lowerQuery)) {
        results.push(part.part);
      }

      // Search in papers
      for (const paper of part.papers) {
        // Search in paper title
        if (paper.paper.paperTitle.toLowerCase().includes(lowerQuery)) {
          results.push(paper.paper);
        }

        // Search in sections
        for (const section of paper.sections) {
          // Search in section title
          if (
            section.section.sectionTitle &&
            section.section.sectionTitle.toLowerCase().includes(lowerQuery)
          ) {
            results.push(section.section);
          }

          // Search in paragraphs
          for (const paragraph of section.paragraphs) {
            // Search in paragraph text
            if (paragraph.text && paragraph.text.toLowerCase().includes(lowerQuery)) {
              results.push(paragraph);
            }
          }
        }
      }
    }

    return results;
  }
}

// Export the singleton instance
export const ubContentService = UBContentService.getInstance();
