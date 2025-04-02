import { PronunciationEntry } from '../types';
/**
 * Sample of Urantia terms with their pronunciations from the official guide:
 * https://www.urantia.org/sites/default/files/study-materials/terms-and-pronunciation/Term-and-Pronunciation-List-for-The-Urantia-Book-2023-en.pdf
 *
 * This is a subset of the full dictionary. In a production implementation,
 * this would be generated from the PDF or stored in a database.
 */
export declare const urantiaPronunciations: PronunciationEntry[];
/**
 * Get a pronunciation entry by term
 */
export declare function getPronunciation(term: string): PronunciationEntry | undefined;
/**
 * Search for pronunciation entries by partial term
 */
export declare function searchPronunciations(partialTerm: string): PronunciationEntry[];
/**
 * Get all pronunciations by category
 */
export declare function getPronunciationsByCategory(category: string): PronunciationEntry[];
//# sourceMappingURL=urantia-terms.d.ts.map