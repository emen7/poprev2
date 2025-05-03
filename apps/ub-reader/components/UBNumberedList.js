'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '../contexts/ThemeContext';
/**
 * Component for displaying a numbered list with support for Modern and Traditional themes
 * Numbers are included directly in the text content for better copy-paste functionality
 * Visual alignment is handled with CSS while maintaining good copy behavior
 */
export const UBNumberedList = ({ items, withDots = false, className = '', }) => {
    // Try to use the ThemeContext, but provide a fallback if it's not available
    // We get the theme but don't directly use the variable - it affects the styling through CSS variables
    try {
        useTheme(); // This ensures the theme context is available and CSS variables are set
    }
    catch (_) {
        // ThemeContext not available, use default theme (traditional)
        // Silent catch - no need for console logs in production code
    }
    // Apply appropriate classes based on the content theme and dots option
    const listClasses = [
        'ub-list',
        'ub-list-numbered',
        withDots ? 'ub-list-with-dots' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Process the item content to apply theme-specific formatting
    const processContent = (content) => {
        // Replace italic tags with our custom classes
        let processed = content.replace(/<i>(.*?)<\/i>/g, '<span class="ub-emphasis">$1</span>');
        // Replace bold italic tags with our custom classes
        processed = processed.replace(/<b><i>(.*?)<\/i><\/b>/g, '<span class="ub-strong-emphasis">$1</span>');
        processed = processed.replace(/<i><b>(.*?)<\/b><\/i>/g, '<span class="ub-strong-emphasis">$1</span>');
        // Detect and mark ALL CAPS text (words of 2 or more characters)
        processed = processed.replace(/\b([A-Z]{2,})\b/g, '<span class="ub-all-caps">$1</span>');
        // Detect and mark bold ALL CAPS text
        processed = processed.replace(/<b>([A-Z]{2,})<\/b>/g, '<span class="ub-strong-all-caps">$1</span>');
        return processed;
    };
    // Render list items recursively with numbers included in the text content
    const renderItems = (items, level = 1) => {
        return items.map((item, index) => {
            const itemNumber = typeof item.id === 'number' ? item.id : index + 1;
            return (_jsxs("div", { className: "ub-list-item", id: `list-item-${item.id}`, children: [_jsxs("div", { className: "ub-list-item-wrapper", children: [_jsxs("span", { className: "ub-list-item-number-visual", children: [itemNumber, "."] }), _jsx("span", { className: "ub-list-item-content-visual", dangerouslySetInnerHTML: { __html: processContent(item.content) } }), _jsx("span", { className: "ub-list-item-copy-text", dangerouslySetInnerHTML: { __html: `${itemNumber}. ${processContent(item.content)}` } })] }), item.children && item.children.length > 0 && (_jsx("div", { className: `ub-list ub-list-nested ub-list-level-${level + 1}`, children: renderItems(item.children, level + 1) }))] }, item.id));
        });
    };
    return _jsx("div", { className: listClasses, children: renderItems(items) });
};
export default UBNumberedList;
//# sourceMappingURL=UBNumberedList.js.map