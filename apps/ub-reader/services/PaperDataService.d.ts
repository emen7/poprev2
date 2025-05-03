/**
 * Paper Data Service
 *
 * This service provides functions for fetching paper data and related information.
 * It uses the ContentService to load real content when available and falls back to mock data.
 */
export interface Paragraph {
    number: number;
    text: string;
}
export interface Section {
    number: number;
    title: string;
    paragraphs: Paragraph[];
}
export interface Paper {
    number: number;
    title: string;
    author: string;
    sections: Section[];
}
export interface Part {
    number: number;
    title: string;
    papers: {
        number: number;
        title: string;
    }[];
}
export interface SectionInfo {
    number: number;
    title: string;
}
export interface PaperInfo {
    number: number;
    title: string;
    author: string;
    sections: SectionInfo[];
}
export interface PartInfo {
    number: number;
    title: string;
    papers: PaperInfo[];
}
export declare const FOREWORD_SECTIONS: {
    number: number;
    romanNumeral: string;
    title: string;
}[];
/**
 * Get all parts of the Urantia Book
 */
export declare function getParts(): Part[];
/**
 * Get a specific part by number
 */
export declare function getPart(partNumber: number): Part | undefined;
/**
 * Get a specific paper by number
 */
export declare function getPaper(paperNumber: number): Promise<Paper>;
/**
 * Get the part number for a paper
 */
export declare function getPartForPaper(paperNumber: number): number;
/**
 * Get the previous paper number
 */
export declare function getPreviousPaper(paperNumber: number): number | null;
/**
 * Get the next paper number
 */
export declare function getNextPaper(paperNumber: number): number | null;
/**
 * Get detailed information for all parts, papers, and sections
 */
export declare function getContentsData(): Promise<PartInfo[]>;
//# sourceMappingURL=PaperDataService.d.ts.map