import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import './TableOfContents.css';
/**
 * TableOfContents Component
 *
 * A hierarchical table of contents component that supports:
 * - Nested items with collapsible sections
 * - Current item highlighting
 * - Auto-expansion of current item's parents
 * - Custom styling and height limits
 */
export function TableOfContents({ items, currentItemId, onItemSelect, collapsible = true, initiallyExpanded = [], autoExpandCurrent = true, maxHeight, className = '', }) {
    // Track expanded state for collapsible items
    const [expandedItems, setExpandedItems] = useState(new Set(initiallyExpanded));
    // Recursively find if an item is an ancestor of the current item
    const isAncestorOfCurrent = (item, currentId) => {
        if (!currentId)
            return false;
        if (item.id === currentId)
            return true;
        if (item.children) {
            return item.children.some(child => isAncestorOfCurrent(child, currentId));
        }
        return false;
    };
    // Auto-expand parents of current item on first render or when current changes
    React.useEffect(() => {
        if (!collapsible || !autoExpandCurrent || !currentItemId)
            return;
        const expandParents = (items) => {
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
    const toggleExpanded = (itemId) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            }
            else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };
    // Render a single TOC item
    const renderItem = (item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.has(item.id);
        const isActive = item.id === currentItemId;
        return (_jsxs("li", { className: `toc-item toc-level-${item.level} ${isActive ? 'toc-item-active' : ''}`, children: [_jsxs("div", { className: "toc-item-row", children: [hasChildren && collapsible && (_jsx("button", { className: `toc-toggle ${isExpanded ? 'toc-toggle-expanded' : ''}`, onClick: () => toggleExpanded(item.id), "aria-expanded": isExpanded, "aria-label": isExpanded ? 'Collapse section' : 'Expand section', children: _jsx("span", { className: "toc-toggle-icon" }) })), _jsx("a", { className: "toc-link", href: item.url, onClick: e => {
                                if (onItemSelect) {
                                    e.preventDefault();
                                    onItemSelect(item.id, item.url);
                                }
                            }, "aria-current": isActive ? 'page' : undefined, children: item.title })] }), hasChildren && (isExpanded || !collapsible) && (_jsx("ul", { className: "toc-children", children: item.children.map(child => renderItem(child)) }))] }, item.id));
    };
    return (_jsx("nav", { className: `table-of-contents ${className}`, style: { maxHeight }, "aria-label": "Table of contents", children: _jsx("ul", { className: "toc-list", children: items.map(item => renderItem(item)) }) }));
}
export default TableOfContents;
//# sourceMappingURL=TableOfContents.js.map