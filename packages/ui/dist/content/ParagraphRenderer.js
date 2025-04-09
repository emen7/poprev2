import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import './ParagraphRenderer.css';
/**
 * ParagraphRenderer Component
 *
 * A component that renders a single paragraph with support for:
 * - Traditional and Modern formatting
 * - Paragraph numbering
 * - Highlighting
 * - Special formatting (indentation, lists, tables, topic changes)
 */
export const ParagraphRenderer = forwardRef(function ParagraphRenderer({ paragraph, formatType, showNumber = true, isHighlighted = false, onVisible, className = '', onClick, }, ref) {
    const { id, number, text, metadata = {} } = paragraph;
    const { isIndented, isList, listType, isTable, isTopicChange } = metadata;
    // Determine paragraph classes
    const paragraphClasses = [
        'paragraph',
        `paragraph-format-${formatType}`,
        isHighlighted ? 'paragraph-highlighted' : '',
        isIndented ? 'paragraph-indented' : '',
        isList ? `paragraph-list paragraph-list-${listType}` : '',
        isTable ? 'paragraph-table' : '',
        isTopicChange ? 'paragraph-topic-change' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Handle paragraph click
    const handleClick = (event) => {
        if (onClick) {
            onClick(id, event);
        }
    };
    // Extract just the paragraph number without section prefix (e.g., "1" from "1.2")
    const paragraphNumberOnly = typeof number === 'string' && number.includes('.') ? number.split('.').pop() : number;
    // For list items, we need special handling to ensure numbers are visible
    // and avoid using <li> elements for better copy/paste experience
    if (isList && listType === 'numbered') {
        return (_jsxs("div", { className: paragraphClasses, "data-paragraph-id": id, ref: ref, onClick: handleClick, children: [showNumber && _jsx("span", { className: "paragraph-number", children: paragraphNumberOnly }), _jsxs("div", { className: "paragraph-text", children: [_jsxs("span", { className: "list-number", children: [number, "."] }), " ", _jsx("span", { dangerouslySetInnerHTML: { __html: text } })] })] }));
    }
    else if (isList && listType === 'bulleted') {
        return (_jsxs("div", { className: paragraphClasses, "data-paragraph-id": id, ref: ref, onClick: handleClick, children: [showNumber && _jsx("span", { className: "paragraph-number", children: paragraphNumberOnly }), _jsxs("div", { className: "paragraph-text", children: [_jsx("span", { className: "list-bullet", children: "\u2022" }), " ", _jsx("span", { dangerouslySetInnerHTML: { __html: text } })] })] }));
    }
    else {
        // Standard paragraph rendering
        return (_jsxs("div", { className: paragraphClasses, "data-paragraph-id": id, ref: ref, onClick: handleClick, children: [showNumber && _jsx("span", { className: "paragraph-number", children: paragraphNumberOnly }), _jsx("div", { className: "paragraph-text", dangerouslySetInnerHTML: { __html: text } })] }));
    }
});
export default ParagraphRenderer;
//# sourceMappingURL=ParagraphRenderer.js.map