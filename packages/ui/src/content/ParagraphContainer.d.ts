import React from 'react';
import { Paragraph } from './ParagraphRenderer';
import './ParagraphContainer.css';
export interface ParagraphContainerProps {
    /**
     * Array of paragraphs to render
     */
    paragraphs: Paragraph[];
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
     * Function called when a paragraph becomes visible
     */
    onParagraphVisible?: (paragraphId: string) => void;
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
 * ParagraphContainer Component
 *
 * A component that renders multiple paragraphs with a vertical numbering column.
 */
export declare const ParagraphContainer: React.FC<ParagraphContainerProps>;
export default ParagraphContainer;
//# sourceMappingURL=ParagraphContainer.d.ts.map