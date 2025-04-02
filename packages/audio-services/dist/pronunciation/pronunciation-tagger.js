import { urantiaPronunciations } from './urantia-terms';
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
export function tagContentWithPronunciation(content, format = 'ssml') {
    // Sort terms by length (descending) to ensure longer terms are matched first
    // This prevents partial matches (e.g., "Urantia" in "Urantia Book")
    const sortedTerms = [...urantiaPronunciations].sort((a, b) => b.term.length - a.term.length);
    // For each term in our pronunciation dictionary
    return sortedTerms.reduce((taggedContent, entry) => {
        // Create regex to find the term (with word boundaries)
        const termRegex = new RegExp(`\\b${entry.term}\\b`, 'gi');
        // Format depends on the target system
        if (format === 'ssml') {
            // For standard SSML (AWS, Google, etc.)
            return taggedContent.replace(termRegex, `<phoneme alphabet="ipa" ph="${entry.ipa}">${entry.term}</phoneme>`);
        }
        else {
            // For Narakeet with ellipses for pauses
            return taggedContent.replace(termRegex, `<phoneme alphabet="ipa" ph="${entry.ipa}">${entry.term}... ...</phoneme>`);
        }
    }, content);
}
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
export function tagSpecificTerms(content, terms, format = 'ssml') {
    // Get pronunciation entries for the specified terms
    const entries = terms
        .map(term => urantiaPronunciations.find(entry => entry.term.toLowerCase() === term.toLowerCase()))
        .filter((entry) => entry !== undefined);
    // Sort entries by length (descending)
    const sortedEntries = [...entries].sort((a, b) => b.term.length - a.term.length);
    // For each term in our filtered list
    return sortedEntries.reduce((taggedContent, entry) => {
        // Create regex to find the term (with word boundaries)
        const termRegex = new RegExp(`\\b${entry.term}\\b`, 'gi');
        // Format depends on the target system
        if (format === 'ssml') {
            // For standard SSML (AWS, Google, etc.)
            return taggedContent.replace(termRegex, `<phoneme alphabet="ipa" ph="${entry.ipa}">${entry.term}</phoneme>`);
        }
        else {
            // For Narakeet with ellipses for pauses
            return taggedContent.replace(termRegex, `<phoneme alphabet="ipa" ph="${entry.ipa}">${entry.term}... ...</phoneme>`);
        }
    }, content);
}
/**
 * Extract Urantia terms from content
 *
 * This function identifies Urantia terms in the content and returns
 * a list of the terms found.
 *
 * @param content The content to analyze
 * @returns Array of Urantia terms found in the content
 */
export function extractUrantiaTerms(content) {
    const terms = new Set();
    urantiaPronunciations.forEach(entry => {
        const termRegex = new RegExp(`\\b${entry.term}\\b`, 'gi');
        const matches = content.match(termRegex);
        if (matches) {
            matches.forEach(match => terms.add(match));
        }
    });
    return Array.from(terms);
}
/**
 * Add pauses to content
 *
 * This function adds pauses (ellipses) after sentences and
 * between complex concepts.
 *
 * @param content The content to process
 * @returns The content with pauses added
 */
export function addPauses(content) {
    // Add pauses after sentences
    let result = content.replace(/\.\s+/g, '... ... ');
    // Add pauses after commas
    result = result.replace(/,\s+/g, ',... ');
    // Add pauses after semicolons
    result = result.replace(/;\s+/g, ';... ... ');
    // Add pauses after colons
    result = result.replace(/:\s+/g, ':... ');
    return result;
}
//# sourceMappingURL=pronunciation-tagger.js.map