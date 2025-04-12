import { ReactNode } from 'react';
import './Breadcrumbs.css';
export interface BreadcrumbItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Display title for the item
   */
  title: string;
  /**
   * URL for navigation
   */
  url?: string;
  /**
   * Whether this is the current/active item
   */
  isCurrent?: boolean;
}
export interface BreadcrumbsProps {
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItem[];
  /**
   * Custom separator between items
   * @default '/'
   */
  separator?: ReactNode;
  /**
   * Function called when a breadcrumb item is clicked
   */
  onItemClick?: (item: BreadcrumbItem) => void;
  /**
   * Maximum number of items to show before truncating
   * If set, breadcrumbs will be truncated with an ellipsis
   */
  maxItems?: number;
  /**
   * Whether to show the root item when truncating
   * @default true
   */
  showRoot?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * Breadcrumbs Component
 *
 * A navigation component that displays a trail of links.
 * Supports custom separators, truncation, and click handling.
 */
export declare function Breadcrumbs({
  items,
  separator,
  onItemClick,
  maxItems,
  showRoot,
  className,
}: BreadcrumbsProps): import('react/jsx-runtime').JSX.Element;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.d.ts.map
