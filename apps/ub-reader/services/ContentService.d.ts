/**
 * Content Service
 *
 * This service provides functions for loading and accessing content from the content repository.
 * This version uses hardcoded data for Next.js compatibility.
 */
interface ContentIndex {
    title: string;
    description: string;
    version: string;
    lastUpdated: string;
    parts: ContentPart[];
    contentStructure: {
        paper: {
            properties: string[];
        };
        section: {
            properties: string[];
        };
        paragraph: {
            properties: string[];
        };
    };
}
interface ContentPart {
    number: number;
    title: string;
    papers: ContentPaperInfo[];
}
interface ContentPaperInfo {
    number: number;
    title: string;
    author: string;
    sections: string[];
    path: string;
    available: boolean;
}
/**
 * Load the content index
 */
export declare function loadContentIndex(): Promise<ContentIndex>;
/**
 * Get paper metadata by number
 */
export declare function getPaperMetadata(paperNumber: number): Promise<ContentPaperInfo | null>;
/**
 * Check if a paper is available in the content repository
 */
export declare function isPaperAvailable(paperNumber: number): Promise<boolean>;
/**
 * Load a paper from the content repository
 */
export declare function loadPaper(paperNumber: number): Promise<any | null>;
/**
 * Clear the content cache
 */
export declare function clearContentCache(): void;
export {};
//# sourceMappingURL=ContentService.d.ts.map