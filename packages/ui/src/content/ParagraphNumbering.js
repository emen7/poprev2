import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './ParagraphNumbering.css';
/**
 * Component for displaying paragraph numbers in a vertical column
 */
export const ParagraphNumbering = ({ number, hasNotes = false, visible = true, showNoteIndicators = true, }) => {
    if (!visible) {
        return null;
    }
    return (_jsxs("div", { className: "paragraph-numbering", children: [_jsx("div", { className: "paragraph-note-indicator-container", children: hasNotes && showNoteIndicators && (_jsx("div", { className: "paragraph-note-indicator", title: "This paragraph has notes", children: "\u25CF" })) }), _jsx("div", { className: "paragraph-number", children: number })] }));
};
/**
 * Container component for paragraph numbering
 */
export const ParagraphNumberingContainer = ({ visible = true, showNoteIndicators = true, children, }) => {
    if (!visible) {
        return _jsx(_Fragment, { children: children });
    }
    const containerClasses = [
        'paragraph-numbering-container',
        showNoteIndicators ? 'show-note-indicators' : '',
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("div", { className: containerClasses, children: [showNoteIndicators && (_jsx("div", { className: "paragraph-notes-column" })), _jsx("div", { className: "paragraph-numbering-column" }), _jsx("div", { className: "paragraph-content", children: children })] }));
};
//# sourceMappingURL=ParagraphNumbering.js.map