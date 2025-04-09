import React, { ReactNode } from 'react';
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
export function Breadcrumbs({
  items,
  separator = '/',
  onItemClick,
  maxItems,
  showRoot = true,
  className = '',
}: BreadcrumbsProps) {
  // Handle truncation if maxItems is set
  const displayItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Truncate the middle items
    const truncatedItems: BreadcrumbItem[] = [];

    if (showRoot && items.length > 0) {
      // Add the first item (root)
      truncatedItems.push(items[0]);
    }

    // Add ellipsis item
    truncatedItems.push({
      id: 'ellipsis',
      title: '...',
      isCurrent: false,
    });

    // Calculate how many items to show at the end
    const endItemsCount = maxItems - truncatedItems.length;
    const endItems = items.slice(-endItemsCount);

    return [...truncatedItems, ...endItems];
  }, [items, maxItems, showRoot]);

  // Handle item click
  const handleClick = (e: React.MouseEvent, item: BreadcrumbItem) => {
    if (item.isCurrent) {
      e.preventDefault();
      return;
    }

    if (onItemClick) {
      e.preventDefault();
      onItemClick(item);
    }
  };

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumbs">
      <ol className="breadcrumbs-list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;

          return (
            <li
              key={item.id}
              className={`breadcrumbs-item ${item.isCurrent ? 'breadcrumbs-item-current' : ''}`}
            >
              {item.id === 'ellipsis' ? (
                <span className="breadcrumbs-ellipsis">{item.title}</span>
              ) : (
                <a
                  href={item.url}
                  className="breadcrumbs-link"
                  onClick={e => handleClick(e, item)}
                  aria-current={item.isCurrent ? 'page' : undefined}
                >
                  {item.title}
                </a>
              )}

              {!isLast && (
                <span className="breadcrumbs-separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
