/**
 * ScientificContentProcessor
 *
 * Processes content to automatically wrap scientific terms with tooltips.
 */
import { TooltipDataRecord } from '../types/TooltipData';
/**
 * Options for processing scientific content
 */
export interface ProcessingOptions {
    /**
     * Whether to process abbreviations
     * @default true
     */
    processAbbreviations?: boolean;
    /**
     * Whether to process equations
     * @default true
     */
    processEquations?: boolean;
    /**
     * Whether to process technical terms
     * @default true
     */
    processTerms?: boolean;
    /**
     * Custom class name to add to the wrapped terms
     */
    customClass?: string;
    /**
     * Whether to make tooltips interactive (show on hover/click)
     * @default true
     */
    interactive?: boolean;
    /**
     * Tooltip position
     * @default 'auto'
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}
/**
 * Process scientific content to wrap terms with tooltip markup
 *
 * @param content The content to process
 * @param tooltipData The tooltip data record
 * @param options Processing options
 * @returns The processed content with tooltip markup
 */
export declare function processScientificContent(content: string, tooltipData: TooltipDataRecord, options?: ProcessingOptions): string;
/**
 * Initialize tooltips in the DOM
 *
 * This function finds all elements with tooltip data attributes and
 * initializes them with event listeners for showing/hiding tooltips.
 *
 * @param container The container element to search within (defaults to document.body)
 */
export declare function initializeTooltips(container?: HTMLElement): void;
declare const _default: {
    processScientificContent: typeof processScientificContent;
    initializeTooltips: typeof initializeTooltips;
};
export default _default;
//# sourceMappingURL=ScientificContentProcessor.d.ts.map