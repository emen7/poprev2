import { PhoneticFormat } from '../types';
/**
 * Tag content with pronunciation markup
 *
 * This function identifies Urantia terms in the content and adds
 * appropriate phonetic markup based on the specified format.
 *
 * @param content The content to tag
 * @param format The format to use for phonetic markup (ssml or narakeet)
 * @returns The tagged content
 */
export declare function tagContentWithPronunciation(content: string, format?: PhoneticFormat): string;
/**
 * Tag content with pronunciation markup for specific terms
 *
 * This function is similar to tagContentWithPronunciation, but only
 * tags the specified terms.
 *
 * @param content The content to tag
 * @param terms The terms to tag
 * @param format The format to use for phonetic markup
 * @returns The tagged content
 */
export declare function tagSpecificTerms(content: string, terms: string[], format?: PhoneticFormat): string;
/**
 * Extract Urantia terms from content
 *
 * This function identifies Urantia terms in the content and returns
 * a list of the terms found.
 *
 * @param content The content to analyze
 * @returns Array of Urantia terms found in the content
 */
export declare function extractUrantiaTerms(content: string): string[];
/**
 * Add pauses to content
 *
 * This function adds pauses (ellipses) after sentences and
 * between complex concepts.
 *
 * @param content The content to process
 * @returns The content with pauses added
 */
export declare function addPauses(content: string): string;
//# sourceMappingURL=pronunciation-tagger.d.ts.map