import React from 'react';
import './UBContentRenderer.css';
export interface UBContentRendererProps {
    /**
     * Paper ID to render
     */
    paperId: string;
    /**
     * Section ID to render (optional)
     * If not provided, all sections of the paper will be rendered
     */
    sectionId?: string;
    /**
     * The formatting type to use
     */
    formatType: 'traditional' | 'modern';
    /**
     * Whether to show paragraph numbers
     * @default true
     */
    showNumbers?: boolean;
    /**
     * Whether to use the vertical numbering column
     * @default true
     */
    useVerticalNumbering?: boolean;
    /**
     * Text alignment for paragraphs
     * @default 'left'
     */
    textAlignment?: 'left' | 'right' | 'justified';
    /**
     * Whether to show note indicators
     * @default true
     */
    showNoteIndicators?: boolean;
    /**
     * ID of the currently highlighted paragraph
     */
    highlightedParagraphId?: string;
    /**
     * Function called when a paragraph is clicked
     */
    onParagraphClick?: (paragraphId: string, event: React.MouseEvent) => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * UBContentRenderer Component
 *
 * A component that renders UB content with paragraph numbering.
 */
export declare const UBContentRenderer: React.FC<UBContentRendererProps>;
export default UBContentRenderer;
//# sourceMappingURL=UBContentRenderer.d.ts.map