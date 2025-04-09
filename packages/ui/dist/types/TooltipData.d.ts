/**
 * TooltipData Type Definitions
 *
 * This file defines the data structures for scientific content tooltips,
 * including abbreviations, equations, and technical terms.
 */
/**
 * TooltipData interface
 * Defines the structure for tooltip content
 */
export interface TooltipData {
    /**
     * The type of tooltip content
     */
    type: 'abbreviation' | 'equation' | 'term';
    /**
     * The short form (for abbreviations)
     */
    shortForm?: string;
    /**
     * The full text or explanation
     */
    fullForm: string;
    /**
     * Simplified explanation (for equations)
     */
    simplifiedForm?: string;
    /**
     * Additional context or examples
     */
    context?: string;
    /**
     * Related terms or concepts
     */
    relatedTerms?: string[];
    /**
     * Source or reference information
     */
    source?: string;
}
/**
 * TooltipDataRecord type
 * A record mapping term identifiers to their tooltip data
 */
export type TooltipDataRecord = Record<string, TooltipData>;
/**
 * Example tooltip data
 */
export declare const exampleTooltipData: TooltipDataRecord;
/**
 * Function to get tooltip data for a term
 * @param term The term to get tooltip data for
 * @param dataRecord The tooltip data record to search in
 * @returns The tooltip data or undefined if not found
 */
export declare function getTooltipData(term: string, dataRecord: TooltipDataRecord): TooltipData | undefined;
/**
 * Function to register new tooltip data
 * @param term The term to register
 * @param data The tooltip data
 * @param dataRecord The tooltip data record to update
 * @returns The updated tooltip data record
 */
export declare function registerTooltipData(term: string, data: TooltipData, dataRecord: TooltipDataRecord): TooltipDataRecord;
export default TooltipData;
//# sourceMappingURL=TooltipData.d.ts.map