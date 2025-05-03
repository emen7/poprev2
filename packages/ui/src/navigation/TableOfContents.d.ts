import './TableOfContents.css';
export interface TOCItem {
    /**
     * Unique identifier for the item
     */
    id: string;
    /**
     * Display title for the item
     */
    title: string;
    /**
     * Nesting level (0 for top level)
     */
    level: number;
    /**
     * Optional URL for direct navigation
     */
    url?: string;
    /**
     * Child items
     */
    children?: TOCItem[];
}
export interface TableOfContentsProps {
    /**
     * Array of TOC items to display
     */
    items: TOCItem[];
    /**
     * ID of the currently active item
     */
    currentItemId?: string;
    /**
     * Function called when an item is selected
     */
    onItemSelect?: (itemId: string, url?: string) => void;
    /**
     * Whether to allow collapsing sections
     * @default true
     */
    collapsible?: boolean;
    /**
     * IDs of initially expanded items (only used if collapsible is true)
     */
    initiallyExpanded?: string[];
    /**
     * Whether to automatically expand the parent items of the current item
     * @default true
     */
    autoExpandCurrent?: boolean;
    /**
     * Maximum height of the TOC container (with scrolling)
     */
    maxHeight?: string;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * TableOfContents Component
 *
 * A hierarchical table of contents component that supports:
 * - Nested items with collapsible sections
 * - Current item highlighting
 * - Auto-expansion of current item's parents
 * - Custom styling and height limits
 */
export declare function TableOfContents({ items, currentItemId, onItemSelect, collapsible, initiallyExpanded, autoExpandCurrent, maxHeight, className, }: TableOfContentsProps): import("react/jsx-runtime").JSX.Element;
export default TableOfContents;
//# sourceMappingURL=TableOfContents.d.ts.map