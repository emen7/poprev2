import React from 'react';
import { Paragraph } from './ParagraphRenderer';
import './SectionRenderer.css';
export interface Section {
    /**
     * Unique identifier for the section
     */
    id: string;
    /**
     * Section number
     */
    number: number | string;
    /**
     * Section title
     */
    title: string;
    /**
     * Paragraphs in the section
     */
    paragraphs: Paragraph[];
    /**
     * Optional metadata for the section
     */
    metadata?: {
        /**
         * Whether this section has special formatting
         */
        hasSpecialFormatting?: boolean;
        /**
         * Type of special formatting
         */
        specialFormattingType?: string;
        /**
         * Any additional metadata
         */
        [key: string]: any;
    };
}
export interface SectionRendererProps {
    /**
     * The section to render
     */
    section: Section;
    /**
     * The formatting type to use
     */
    formatType: 'traditional' | 'modern';
    /**
     * Whether to show paragraph numbers
     * @default true
     */
    showParagraphNumbers?: boolean;
    /**
     * Whether this section is highlighted
     * @default false
     */
    isHighlighted?: boolean;
    /**
     * IDs of paragraphs to highlight
     */
    highlightedParagraphs?: string[];
    /**
     * Function called when the section becomes visible
     */
    onVisible?: (sectionId: string) => void;
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
 * SectionRenderer Component
 *
 * A component that renders a section with its title and paragraphs.
 * Supports different formatting types and highlighting.
 */
export declare const SectionRenderer: React.ForwardRefExoticComponent<SectionRendererProps & React.RefAttributes<HTMLElement>>;
export default SectionRenderer;
//# sourceMappingURL=SectionRenderer.d.ts.map