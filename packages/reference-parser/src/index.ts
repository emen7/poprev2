/**
 * UB Reference Parser Package
 * 
 * This package provides utilities for parsing and linking references to The Urantia Book.
 */

/**
 * Represents a reference to a UB paper and section
 */
export interface UBReference {
  type: 'paper-section';
  paper: number;
  section: number;
  originalText: string;
  position: {
    start: number;
    end: number;
  };
}

/**
 * Parse UB references from text
 * 
 * @param text The text to parse for references
 * @returns An array of UB references found in the text
 */
export function parseUBReferences(text: string): UBReference[] {
  const references: UBReference[] = [];
  
  // Paper and section pattern (e.g., "Paper 1, Section 3")
  const paperSectionPattern = /Paper\s+(\d+),\s+Section\s+(\d+)/gi;
  let match;
  
  while ((match = paperSectionPattern.exec(text)) !== null) {
    references.push({
      type: 'paper-section',
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length
      }
    });
  }
  
  // Add more patterns for different reference formats
  // For example: "1:3" (paper:section)
  const shortPattern = /\b(\d+):(\d+)\b/g;
  
  while ((match = shortPattern.exec(text)) !== null) {
    references.push({
      type: 'paper-section',
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length
      }
    });
  }
  
  return references;
}

/**
 * Generate a URL for a UB reference
 * 
 * @param reference The UB reference
 * @param baseUrl The base URL for the UB Reader (default: "/reader")
 * @returns A URL to the referenced section in the UB Reader
 */
export function generateUBReferenceUrl(reference: UBReference, baseUrl: string = "/reader"): string {
  return `${baseUrl}/paper/${reference.paper}/section/${reference.section}`;
}

/**
 * Replace UB references in text with HTML links
 * 
 * @param text The text containing references
 * @param baseUrl The base URL for the UB Reader (default: "/reader")
 * @returns The text with references replaced by HTML links
 */
export function replaceUBReferencesWithLinks(text: string, baseUrl: string = "/reader"): string {
  const references = parseUBReferences(text);
  
  // Sort references by position in reverse order to avoid offset issues
  references.sort((a, b) => b.position.start - a.position.start);
  
  let result = text;
  
  for (const ref of references) {
    const url = generateUBReferenceUrl(ref, baseUrl);
    const link = `<a href="${url}" class="ub-reference">${ref.originalText}</a>`;
    
    result = 
      result.substring(0, ref.position.start) + 
      link + 
      result.substring(ref.position.end);
  }
  
  return result;
}