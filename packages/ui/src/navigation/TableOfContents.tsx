import React, { useState } from 'react';
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
export function TableOfContents({
  items,
  currentItemId,
  onItemSelect,
  collapsible = true,
  initiallyExpanded = [],
  autoExpandCurrent = true,
  maxHeight,
  className = '',
}: TableOfContentsProps) {
  // Track expanded state for collapsible items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(initiallyExpanded));

  // Recursively find if an item is an ancestor of the current item
  const isAncestorOfCurrent = (item: TOCItem, currentId?: string): boolean => {
    if (!currentId) return false;

    if (item.id === currentId) return true;

    if (item.children) {
      return item.children.some(child => isAncestorOfCurrent(child, currentId));
    }

    return false;
  };

  // Auto-expand parents of current item on first render or when current changes
  React.useEffect(() => {
    if (!collapsible || !autoExpandCurrent || !currentItemId) return;

    const expandParents = (items: TOCItem[]): void => {
      items.forEach(item => {
        if (isAncestorOfCurrent(item, currentItemId)) {
          setExpandedItems(prev => new Set([...prev, item.id]));

          if (item.children) {
            expandParents(item.children);
          }
        }
      });
    };

    expandParents(items);
  }, [collapsible, autoExpandCurrent, currentItemId, items]);

  // Toggle expanded state for an item
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Render a single TOC item
  const renderItem = (item: TOCItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.id === currentItemId;

    return (
      <li
        key={item.id}
        className={`toc-item toc-level-${item.level} ${isActive ? 'toc-item-active' : ''}`}
      >
        <div className="toc-item-row">
          {hasChildren && collapsible && (
            <button
              className={`toc-toggle ${isExpanded ? 'toc-toggle-expanded' : ''}`}
              onClick={() => toggleExpanded(item.id)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
            >
              <span className="toc-toggle-icon"></span>
            </button>
          )}

          <a
            className="toc-link"
            href={item.url}
            onClick={e => {
              if (onItemSelect) {
                e.preventDefault();
                onItemSelect(item.id, item.url);
              }
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.title}
          </a>
        </div>

        {hasChildren && (isExpanded || !collapsible) && (
          <ul className="toc-children">{item.children!.map(child => renderItem(child))}</ul>
        )}
      </li>
    );
  };

  return (
    <nav
      className={`table-of-contents ${className}`}
      style={{ maxHeight }}
      aria-label="Table of contents"
    >
      <ul className="toc-list">{items.map(item => renderItem(item))}</ul>
    </nav>
  );
}

export default TableOfContents;
