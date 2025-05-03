import React from 'react';
interface UBEnhancedParagraphProps {
    /**
     * The paragraph data
     */
    paragraph: {
        number: number;
        text: string;
    };
    /**
     * Whether this paragraph marks a topic change
     */
    isTopicChange?: boolean;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * The current paper number
     */
    currentPaper?: number;
    /**
     * Whether this paragraph has a note attached
     */
    hasNote?: boolean;
    /**
     * Function called when the note indicator is clicked
     */
    onNoteIndicatorClick?: (paragraphId: string) => void;
}
/**
 * Enhanced paragraph component with note indicators
 *
 * This component displays a paragraph with:
 * - A column for note indicators (dots)
 * - A column for paragraph numbers
 * - The paragraph text content
 */
export declare const UBEnhancedParagraph: React.FC<UBEnhancedParagraphProps>;
export default UBEnhancedParagraph;
//# sourceMappingURL=UBEnhancedParagraph.d.ts.map