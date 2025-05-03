/**
 * Search Results Component
 *
 * This component displays search results.
 */
import type { SearchResult } from '@ub-ecosystem/reference-parser';
/**
 * Props for the SearchResults component
 */
interface SearchResultsProps {
    initialResults?: SearchResult[];
    query: string;
    filters?: {
        types?: string[];
    };
    className?: string;
}
/**
 * Search results component
 *
 * @param props Component props
 * @returns React component
 */
export declare function SearchResults({ initialResults, query, filters, className, }: SearchResultsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=search-results.d.ts.map