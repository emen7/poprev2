/**
 * UB Reference Parser Package
 *
 * This package provides utilities for parsing and linking references to The Urantia Book.
 */

/**
 * Types of UB references
 */
export type UBReferenceType = 'paper-section' | 'paper-section-paragraph' | 'paper' | 'section';

/**
 * Represents a reference to the Urantia Book
 */
export interface UBReference {
  /**
   * Type of reference
   */
  type: UBReferenceType;

  /**
   * Paper number
   */
  paper: number;

  /**
   * Section number (optional for paper-only references)
   */
  section?: number;

  /**
   * Paragraph number (optional for paper-section references)
   */
  paragraph?: number;

  /**
   * Original text that was matched
   */
  originalText: string;

  /**
   * Position in the original text
   */
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

  // Pattern 1: Full format (e.g., "Paper 1, Section 3")
  const fullPattern = /Paper\s+(\d+),\s+Section\s+(\d+)(?:,\s+paragraph\s+(\d+))?/gi;
  let match;

  while ((match = fullPattern.exec(text)) !== null) {
    const reference: UBReference = {
      type: match[3] ? 'paper-section-paragraph' : 'paper-section',
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length,
      },
    };

    if (match[3]) {
      reference.paragraph = parseInt(match[3], 10);
    }

    references.push(reference);
  }

  // Pattern 2: Short format with colon (e.g., "1:3" or "1:3.5")
  const shortColonPattern = /\b(\d+):(\d+)(?:\.(\d+))?\b/g;

  while ((match = shortColonPattern.exec(text)) !== null) {
    const reference: UBReference = {
      type: match[3] ? 'paper-section-paragraph' : 'paper-section',
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length,
      },
    };

    if (match[3]) {
      reference.paragraph = parseInt(match[3], 10);
    }

    references.push(reference);
  }

  // Pattern 3: Short format with dash (e.g., "1-3" or "1-3-5")
  const shortDashPattern = /\b(\d+)-(\d+)(?:-(\d+))?\b/g;

  while ((match = shortDashPattern.exec(text)) !== null) {
    const reference: UBReference = {
      type: match[3] ? 'paper-section-paragraph' : 'paper-section',
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length,
      },
    };

    if (match[3]) {
      reference.paragraph = parseInt(match[3], 10);
    }

    references.push(reference);
  }

  // Pattern 4: Paper-only reference (e.g., "Paper 1" or "UB 1")
  const paperOnlyPattern = /\b(?:Paper|UB)\s+(\d+)\b(?!\s*,\s*Section)/gi;

  while ((match = paperOnlyPattern.exec(text)) !== null) {
    references.push({
      type: 'paper',
      paper: parseInt(match[1], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length,
      },
    });
  }

  // Pattern 5: Contextual section reference (e.g., "Section 3" when within the context of a paper)
  const sectionOnlyPattern = /\bSection\s+(\d+)(?:,\s+paragraph\s+(\d+))?\b/gi;

  while ((match = sectionOnlyPattern.exec(text)) !== null) {
    const reference: UBReference = {
      type: match[2] ? 'paper-section-paragraph' : 'section',
      paper: 0, // This will need to be filled in with context
      section: parseInt(match[1], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length,
      },
    };

    if (match[2]) {
      reference.paragraph = parseInt(match[2], 10);
    }

    references.push(reference);
  }

  return references;
}

/**
 * Apply context to references that need it
 *
 * @param references The references to apply context to
 * @param currentPaper The current paper number for context
 * @returns References with context applied
 */
export function applyReferenceContext(
  references: UBReference[],
  currentPaper: number
): UBReference[] {
  return references.map(ref => {
    // Create a new reference object to avoid mutating the original
    const newRef = { ...ref };

    // Apply context to section-only references
    if (newRef.type === 'section' && currentPaper > 0) {
      newRef.paper = currentPaper;
      newRef.type = 'paper-section';
    }

    return newRef;
  });
}

/**
 * Generate a URL for a UB reference
 *
 * @param reference The UB reference
 * @param baseUrl The base URL for the UB Reader (default: "/paper")
 * @returns A URL to the referenced content in the UB Reader
 */
export function generateUBReferenceUrl(reference: UBReference, baseUrl: string = '/paper'): string {
  switch (reference.type) {
    case 'paper':
      return `${baseUrl}/${reference.paper}`;

    case 'paper-section':
      return `${baseUrl}/${reference.paper}#section-${reference.section}`;

    case 'paper-section-paragraph':
      return `${baseUrl}/${reference.paper}#p-${reference.section}-${reference.paragraph}`;

    case 'section':
      // This should not happen after applying context, but just in case
      return `#section-${reference.section}`;

    default:
      return '#';
  }
}

/**
 * Replace UB references in text with HTML links
 *
 * @param text The text containing references
 * @param baseUrl The base URL for the UB Reader (default: "/paper")
 * @param currentPaper The current paper number for context (default: 0)
 * @returns The text with references replaced by HTML links
 */
export function replaceUBReferencesWithLinks(
  text: string,
  baseUrl: string = '/paper',
  currentPaper: number = 0
): string {
  let references = parseUBReferences(text);

  // Apply context if we have a current paper
  if (currentPaper > 0) {
    references = applyReferenceContext(references, currentPaper);
  }

  // Sort references by position in reverse order to avoid offset issues
  references.sort((a, b) => b.position.start - a.position.start);

  let result = text;

  for (const ref of references) {
    const url = generateUBReferenceUrl(ref, baseUrl);
    const link = `<a href="${url}" class="ub-reference" data-reference-type="${ref.type}">${ref.originalText}</a>`;

    result = result.substring(0, ref.position.start) + link + result.substring(ref.position.end);
  }

  return result;
}

/**
 * Check if a reference is valid
 *
 * @param reference The reference to check
 * @param maxPapers The maximum number of papers (default: 196)
 * @param maxSections Optional map of maximum sections per paper
 * @param maxParagraphs Optional map of maximum paragraphs per section
 * @returns Whether the reference is valid
 */
export function isValidReference(
  reference: UBReference,
  maxPapers: number = 196,
  maxSections?: Record<number, number>,
  maxParagraphs?: Record<string, number>
): boolean {
  // Check paper number
  if (reference.paper < 0 || reference.paper > maxPapers) {
    return false;
  }

  // Check section number if present
  if (reference.section !== undefined) {
    if (reference.section < 0) {
      return false;
    }

    // Check against max sections if provided
    if (
      maxSections &&
      maxSections[reference.paper] &&
      reference.section > maxSections[reference.paper]
    ) {
      return false;
    }
  }

  // Check paragraph number if present
  if (reference.paragraph !== undefined) {
    if (reference.paragraph < 0) {
      return false;
    }

    // Check against max paragraphs if provided
    if (maxParagraphs) {
      const key = `${reference.paper}-${reference.section}`;
      if (maxParagraphs[key] && reference.paragraph > maxParagraphs[key]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Format a reference as a string
 *
 * @param reference The reference to format
 * @param format The format to use (default: 'short')
 * @returns Formatted reference string
 */
export function formatReference(
  reference: UBReference,
  format: 'short' | 'medium' | 'full' = 'short'
): string {
  switch (format) {
    case 'full':
      if (reference.type === 'paper') {
        return `Paper ${reference.paper}`;
      } else if (reference.type === 'paper-section') {
        return `Paper ${reference.paper}, Section ${reference.section}`;
      } else if (reference.type === 'paper-section-paragraph') {
        return `Paper ${reference.paper}, Section ${reference.section}, Paragraph ${reference.paragraph}`;
      } else {
        return `Section ${reference.section}`;
      }

    case 'medium':
      if (reference.type === 'paper') {
        return `Paper ${reference.paper}`;
      } else if (reference.type === 'paper-section') {
        return `${reference.paper}:${reference.section}`;
      } else if (reference.type === 'paper-section-paragraph') {
        return `${reference.paper}:${reference.section}.${reference.paragraph}`;
      } else {
        return `Section ${reference.section}`;
      }

    case 'short':
    default:
      if (reference.type === 'paper') {
        return `${reference.paper}`;
      } else if (reference.type === 'paper-section') {
        return `${reference.paper}:${reference.section}`;
      } else if (reference.type === 'paper-section-paragraph') {
        return `${reference.paper}:${reference.section}.${reference.paragraph}`;
      } else {
        return `${reference.section}`;
      }
  }
}
