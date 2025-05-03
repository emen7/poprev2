import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ParagraphNumberingContainer } from './ParagraphNumbering';
import { ParagraphRenderer } from './ParagraphRenderer';
import './ParagraphContainer.css';
/**
 * ParagraphContainer Component
 *
 * A component that renders multiple paragraphs with a vertical numbering column.
 */
export const ParagraphContainer = ({ paragraphs, formatType, showNumbers = true, useVerticalNumbering = true, textAlignment = 'left', showNoteIndicators = true, highlightedParagraphId, onParagraphVisible, onParagraphClick, className = '', }) => {
    // State for toggling the visibility of paragraph numbers
    const [numbersVisible, setNumbersVisible] = useState(showNumbers);
    // Toggle paragraph numbers visibility
    const toggleNumbersVisibility = () => {
        setNumbersVisible(!numbersVisible);
    };
    // Determine container classes
    const containerClasses = [
        'paragraph-container',
        useVerticalNumbering ? 'paragraph-container-vertical-numbering' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsx(ParagraphNumberingContainer, { visible: numbersVisible && useVerticalNumbering, showNoteIndicators: showNoteIndicators, children: paragraphs.map(paragraph => (_jsx(ParagraphRenderer, { paragraph: paragraph, formatType: formatType, showNumber: numbersVisible, useVerticalNumbering: useVerticalNumbering, textAlignment: textAlignment, showNoteIndicators: showNoteIndicators, isHighlighted: paragraph.id === highlightedParagraphId, onVisible: onParagraphVisible ? () => onParagraphVisible(paragraph.id) : undefined, onClick: onParagraphClick ? (id, event) => onParagraphClick(id, event) : undefined }, paragraph.id))) }), _jsx("button", { className: "paragraph-numbering-toggle", onClick: toggleNumbersVisibility, title: numbersVisible ? 'Hide paragraph numbers' : 'Show paragraph numbers', children: _jsx("span", { className: "paragraph-numbering-toggle-icon" }) })] }));
};
export default ParagraphContainer;
//# sourceMappingURL=ParagraphContainer.js.map