import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React from 'react';
import './Breadcrumbs.css';
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
}) {
  // Handle truncation if maxItems is set
  const displayItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }
    // Truncate the middle items
    const truncatedItems = [];
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
  const handleClick = (e, item) => {
    if (item.isCurrent) {
      e.preventDefault();
      return;
    }
    if (onItemClick) {
      e.preventDefault();
      onItemClick(item);
    }
  };
  return _jsx('nav', {
    className: `breadcrumbs ${className}`,
    'aria-label': 'Breadcrumbs',
    children: _jsx('ol', {
      className: 'breadcrumbs-list',
      children: displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        return _jsxs(
          'li',
          {
            className: `breadcrumbs-item ${item.isCurrent ? 'breadcrumbs-item-current' : ''}`,
            children: [
              item.id === 'ellipsis'
                ? _jsx('span', { className: 'breadcrumbs-ellipsis', children: item.title })
                : _jsx('a', {
                    href: item.url,
                    className: 'breadcrumbs-link',
                    onClick: e => handleClick(e, item),
                    'aria-current': item.isCurrent ? 'page' : undefined,
                    children: item.title,
                  }),
              !isLast &&
                _jsx('span', {
                  className: 'breadcrumbs-separator',
                  'aria-hidden': 'true',
                  children: separator,
                }),
            ],
          },
          item.id
        );
      }),
    }),
  });
}
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map
