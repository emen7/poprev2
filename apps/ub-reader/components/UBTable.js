'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../contexts/ThemeContext';
/**
 * Component for displaying a table with support for Modern and Traditional themes
 */
export const UBTable = ({ caption, rows, className = '' }) => {
    // Try to use the ThemeContext, but provide a fallback if it's not available
    // We get the theme but don't directly use the variable - it affects the styling through CSS variables
    try {
        useTheme(); // This ensures the theme context is available and CSS variables are set
    }
    catch (_) {
        // ThemeContext not available, use default theme (traditional)
        // Silent catch - no need for console logs in production code
    }
    // Apply appropriate classes based on the content theme
    const tableClasses = ['ub-table', className].filter(Boolean).join(' ');
    // Process the cell content to apply theme-specific formatting
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
    return (_jsx("div", { className: "ub-table-container", children: _jsxs("table", { className: tableClasses, children: [caption && _jsx("caption", { className: "ub-table-caption", children: caption }), _jsx("tbody", { children: rows.map((row, rowIndex) => (_jsx("tr", { className: "ub-table-row", children: row.cells.map((cell, cellIndex) => {
                            const CellTag = cell.isHeader ? 'th' : 'td';
                            return (_jsx(CellTag, { className: "ub-table-cell", colSpan: cell.colSpan, rowSpan: cell.rowSpan, dangerouslySetInnerHTML: { __html: processContent(cell.content) } }, cellIndex));
                        }) }, rowIndex))) })] }) }));
};
export default UBTable;
//# sourceMappingURL=UBTable.js.map