import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { ParagraphRenderer } from './ParagraphRenderer';
import './SectionRenderer.css';
/**
 * SectionRenderer Component
 *
 * A component that renders a section with its title and paragraphs.
 * Supports different formatting types and highlighting.
 */
export const SectionRenderer = forwardRef(function SectionRenderer({ section, formatType, showParagraphNumbers = true, isHighlighted = false, highlightedParagraphs = [], onVisible, onParagraphVisible, onParagraphClick, className = '', }, ref) {
    const { id, number, title, paragraphs, metadata = {} } = section;
    const { hasSpecialFormatting, specialFormattingType } = metadata;
    // Determine section classes
    const sectionClasses = [
        'section',
        `section-format-${formatType}`,
        isHighlighted ? 'section-highlighted' : '',
        hasSpecialFormatting ? `section-special section-special-${specialFormattingType}` : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("section", { className: sectionClasses, "data-section-id": id, ref: ref, children: [_jsxs("h2", { className: "section-title", children: [number && _jsxs("span", { className: "section-number", children: [number, "."] }), _jsx("span", { className: "section-title-text", children: title })] }), _jsx("div", { className: "section-content", children: paragraphs.map(paragraph => (_jsx(ParagraphRenderer, { paragraph: paragraph, formatType: formatType, showNumber: showParagraphNumbers, isHighlighted: highlightedParagraphs.includes(paragraph.id), onVisible: onParagraphVisible, onClick: onParagraphClick }, paragraph.id))) })] }));
});
export default SectionRenderer;
//# sourceMappingURL=SectionRenderer.js.map