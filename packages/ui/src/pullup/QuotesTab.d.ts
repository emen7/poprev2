import React from 'react';
import './QuotesTab.css';
export interface Quote {
    /**
     * Unique identifier for the quote
     */
    id: string;
    /**
     * The content of the quote
     */
    content: string;
    /**
     * The timestamp when the quote was created
     */
    createdAt: string;
    /**
     * The ID of the paragraph the quote is associated with
     */
    paragraphId: string;
    /**
     * The reference information (Paper:Section.Paragraph)
     */
    reference: string;
}
export interface QuotesTabProps {
    /**
     * Array of quotes to display
     */
    quotes: Quote[];
    /**
     * Function called when a quote is deleted
     */
    onQuoteDelete?: (id: string) => void;
    /**
     * The sort order for quotes
     */
    sortOrder?: 'entry' | 'paper';
    /**
     * Function called when the sort order is changed
     */
    onSortOrderChange?: (sortOrder: 'entry' | 'paper') => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * QuotesTab Component
 *
 * A tab for displaying and managing quotes in the pullup panel.
 */
export declare const QuotesTab: React.FC<QuotesTabProps>;
export default QuotesTab;
//# sourceMappingURL=QuotesTab.d.ts.map