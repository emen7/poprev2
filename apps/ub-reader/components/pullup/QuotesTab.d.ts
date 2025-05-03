import { Quote } from './types';
import './QuotesTab.css';
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
 * A tab for displaying and managing quotes.
 */
export declare function QuotesTab({ quotes, onQuoteDelete, sortOrder, onSortOrderChange, className, }: QuotesTabProps): import("react/jsx-runtime").JSX.Element;
export default QuotesTab;
//# sourceMappingURL=QuotesTab.d.ts.map