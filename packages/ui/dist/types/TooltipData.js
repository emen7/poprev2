/**
 * TooltipData Type Definitions
 *
 * This file defines the data structures for scientific content tooltips,
 * including abbreviations, equations, and technical terms.
 */
/**
 * Example tooltip data
 */
export const exampleTooltipData = {
    DNA: {
        type: 'abbreviation',
        shortForm: 'DNA',
        fullForm: 'Deoxyribonucleic Acid',
        context: 'The molecule that carries genetic information in all living organisms',
        relatedTerms: ['RNA', 'Nucleotide', 'Double Helix'],
        source: 'Molecular Biology',
    },
    RNA: {
        type: 'abbreviation',
        shortForm: 'RNA',
        fullForm: 'Ribonucleic Acid',
        context: 'A molecule similar to DNA that has various roles in the coding, decoding, regulation, and expression of genes',
        relatedTerms: ['DNA', 'mRNA', 'tRNA'],
        source: 'Molecular Biology',
    },
    'E=mc²': {
        type: 'equation',
        fullForm: 'Energy equals mass times the speed of light squared',
        simplifiedForm: 'Energy and mass are equivalent and convertible',
        context: "Einstein's famous equation from the theory of special relativity",
        source: 'Physics - Special Relativity',
    },
    'Quantum Entanglement': {
        type: 'term',
        fullForm: 'A physical phenomenon that occurs when a group of particles interact in such a way that the quantum state of each particle cannot be described independently of the state of the others',
        context: 'A key concept in quantum mechanics with applications in quantum computing and cryptography',
        relatedTerms: ['Superposition', 'Quantum Computing', "Bell's Theorem"],
        source: 'Quantum Physics',
    },
};
/**
 * Function to get tooltip data for a term
 * @param term The term to get tooltip data for
 * @param dataRecord The tooltip data record to search in
 * @returns The tooltip data or undefined if not found
 */
export function getTooltipData(term, dataRecord) {
    return dataRecord[term];
}
/**
 * Function to register new tooltip data
 * @param term The term to register
 * @param data The tooltip data
 * @param dataRecord The tooltip data record to update
 * @returns The updated tooltip data record
 */
export function registerTooltipData(term, data, dataRecord) {
    return Object.assign(Object.assign({}, dataRecord), { [term]: data });
}
//# sourceMappingURL=TooltipData.js.map