import React from 'react';
import { UBReference } from './ReferenceUtils';
import './ReferenceProcessor.css';
interface ReferenceProcessorProps {
    /**
     * The content to process for references
     */
    content: string;
    /**
     * The current paper number for context (optional)
     */
    currentPaper?: number;
    /**
     * The base URL for reference links (optional)
     */
    baseUrl?: string;
    /**
     * Whether to show tooltips on hover (optional)
     */
    showTooltips?: boolean;
    /**
     * Maximum number of papers (optional)
     */
    maxPapers?: number;
    /**
     * Map of maximum sections per paper (optional)
     */
    maxSections?: Record<number, number>;
    /**
     * Custom class name for reference links (optional)
     */
    linkClassName?: string;
    /**
     * Callback when a reference is clicked (optional)
     */
    onReferenceClick?: (reference: UBReference, event: React.MouseEvent) => void;
}
/**
 * ReferenceProcessor Component
 *
 * This component processes text content and converts references to interactive links.
 */
export declare function ReferenceProcessor({ content, currentPaper, baseUrl, showTooltips, maxPapers, maxSections, linkClassName, onReferenceClick, }: ReferenceProcessorProps): import("react/jsx-runtime").JSX.Element;
export default ReferenceProcessor;
//# sourceMappingURL=ReferenceProcessor.d.ts.map