import React from 'react';
import './ParagraphNumbering.css';
export interface ParagraphNumberingProps {
    /**
     * Paragraph number to display
     */
    number: number;
    /**
     * Whether the paragraph has notes
     */
    hasNotes?: boolean;
    /**
     * Whether the numbering is visible
     */
    visible?: boolean;
    /**
     * Whether to show note indicators
     * @default true
     */
    showNoteIndicators?: boolean;
}
/**
 * Component for displaying paragraph numbers in a vertical column
 */
export declare const ParagraphNumbering: React.FC<ParagraphNumberingProps>;
/**
 * Container component for paragraph numbering
 */
export interface ParagraphNumberingContainerProps {
    /**
     * Whether the numbering is visible
     */
    visible?: boolean;
    /**
     * Whether to show note indicators
     * @default true
     */
    showNoteIndicators?: boolean;
    /**
     * Children elements
     */
    children: React.ReactNode;
}
/**
 * Container component for paragraph numbering
 */
export declare const ParagraphNumberingContainer: React.FC<ParagraphNumberingContainerProps>;
//# sourceMappingURL=ParagraphNumbering.d.ts.map