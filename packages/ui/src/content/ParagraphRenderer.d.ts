import React from 'react';
import './ParagraphRenderer.css';
export interface Paragraph {
    /**
     * Unique identifier for the paragraph
     */
    id: string;
    /**
     * Paragraph number
     */
    number: number | string;
    /**
     * Paragraph text content (can include HTML)
     */
    text: string;
    /**
     * Whether this paragraph has notes
     */
    hasNotes?: boolean;
    /**
     * Optional metadata for the paragraph
     */
    metadata?: {
        /**
         * Whether this paragraph is indented
         */
        isIndented?: boolean;
        /**
         * Whether this paragraph is part of a list
         */
        isList?: boolean;
        /**
         * Type of list if this paragraph is part of a list
         */
        listType?: 'numbered' | 'bulleted';
        /**
         * Whether this paragraph is part of a table
         */
        isTable?: boolean;
        /**
         * Whether this paragraph marks a topic change
         */
        isTopicChange?: boolean;
        /**
         * Any additional metadata
         */
        [key: string]: any;
    };
}
export interface ParagraphRendererProps {
    /**
     * The paragraph to render
     */
    paragraph: Paragraph;
    /**
     * The formatting type to use
     */
    formatType: 'traditional' | 'modern';
    /**
     * Whether to show paragraph numbers
     * @default true
     */
    showNumber?: boolean;
    /**
     * Whether to use the new vertical numbering column
     * @default false
     */
    useVerticalNumbering?: boolean;
    /**
     * Whether this paragraph is highlighted
     * @default false
     */
    isHighlighted?: boolean;
    /**
     * Function called when the paragraph becomes visible
     */
    onVisible?: (paragraphId: string) => void;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Function called when the paragraph is clicked
     */
    onClick?: (paragraphId: string, event: React.MouseEvent) => void;
    /**
     * Text alignment for the paragraph
     * @default 'left'
     */
    textAlignment?: 'left' | 'right' | 'justified';
    /**
     * Whether to show note indicators
     * @default true
     */
    showNoteIndicators?: boolean;
}
/**
 * ParagraphRenderer Component
 *
 * A component that renders a single paragraph with support for:
 * - Traditional and Modern formatting
 * - Paragraph numbering
 * - Highlighting
 * - Special formatting (indentation, lists, tables, topic changes)
 */
export declare const ParagraphRenderer: React.ForwardRefExoticComponent<ParagraphRendererProps & React.RefAttributes<HTMLDivElement>>;
export default ParagraphRenderer;
//# sourceMappingURL=ParagraphRenderer.d.ts.map