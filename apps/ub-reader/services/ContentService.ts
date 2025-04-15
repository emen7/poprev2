/**
 * Content Service
 *
 * This service provides functions for loading and accessing content from the content repository.
 */
import * as fs from 'fs';
import * as path from 'path';

// Define types for the content index
interface ContentIndex {
  title: string;
  description: string;
  version: string;
  lastUpdated: string;
  parts: ContentPart[];
  contentStructure: {
    paper: { properties: string[] };
    section: { properties: string[] };
    paragraph: { properties: string[] };
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

// Cache for content index and papers
let contentIndexCache: ContentIndex | null = null;
const paperCache: Record<number, any> = {};

/**
 * Load the content index
 */
export async function loadContentIndex(): Promise<ContentIndex> {
  // Return cached content index if available
  if (contentIndexCache) {
    return contentIndexCache;
  }

  try {
    // Load the content index from the file
    const indexPath = path.join(process.cwd(), 'content/raw/urantia/content-index.json');
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Parse the JSON content
    const contentIndex = JSON.parse(indexContent) as ContentIndex;

    // Cache the content index
    contentIndexCache = contentIndex;

    return contentIndex;
  } catch (error) {
    console.error('Error loading content index:', error);
    throw new Error('Failed to load content index');
  }
}

/**
 * Get paper metadata by number
 */
export async function getPaperMetadata(paperNumber: number): Promise<ContentPaperInfo | null> {
  try {
    // Load the content index
    const contentIndex = await loadContentIndex();

    // Find the paper in the content index
    for (const part of contentIndex.parts) {
      const paper = part.papers.find(p => p.number === paperNumber);
      if (paper) {
        return paper;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting metadata for paper ${paperNumber}:`, error);
    return null;
  }
}

/**
 * Check if a paper is available in the content repository
 */
export async function isPaperAvailable(paperNumber: number): Promise<boolean> {
  try {
    // Get the paper metadata
    const paperMetadata = await getPaperMetadata(paperNumber);

    // Return whether the paper is available
    return paperMetadata?.available || false;
  } catch (error) {
    console.error(`Error checking availability for paper ${paperNumber}:`, error);
    return false;
  }
}

/**
 * Load a paper from the content repository
 */
export async function loadPaper(paperNumber: number): Promise<any | null> {
  // Return cached paper if available
  if (paperCache[paperNumber]) {
    return paperCache[paperNumber];
  }

  try {
    // Get the paper metadata
    const paperMetadata = await getPaperMetadata(paperNumber);

    // If the paper is not available, return null
    if (!paperMetadata || !paperMetadata.available) {
      return null;
    }

    // Load the paper from the file
    const paperPath = path.join(process.cwd(), 'content/raw/urantia', paperMetadata.path);
    const paperContent = fs.readFileSync(paperPath, 'utf8');

    // Parse the JSON content
    const paper = JSON.parse(paperContent);

    // Cache the paper
    paperCache[paperNumber] = paper;

    return paper;
  } catch (error) {
    console.error(`Error loading paper ${paperNumber}:`, error);
    return null;
  }
}

/**
 * Clear the content cache
 */
export function clearContentCache(): void {
  contentIndexCache = null;
  Object.keys(paperCache).forEach(key => {
    delete paperCache[Number(key)];
  });
}
