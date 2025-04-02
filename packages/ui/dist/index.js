import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * A component that renders a link to a UB reference
 */
export const UBReferenceLink = ({ reference, baseUrl = '/reader', className = '', children, }) => {
    const url = `${baseUrl}/paper/${reference.paper}/section/${reference.section}`;
    return (_jsx("a", { href: url, className: `ub-reference ${className}`, children: children || reference.originalText }));
};
/**
 * A component that renders a UB paper
 */
export const UBPaperViewer = ({ paper, className = '', }) => {
    return (_jsxs("div", { className: `ub-paper ${className}`, children: [_jsxs("h1", { className: "ub-paper-title", children: ["Paper ", paper.number, ": ", paper.title] }), paper.author && (_jsxs("div", { className: "ub-paper-author", children: ["Presented by: ", paper.author] })), _jsx("div", { className: "ub-paper-sections", children: paper.sections.map((section) => (_jsx(UBSectionViewer, { section: section }, section.number))) })] }));
};
/**
 * A component that renders a UB section
 */
export const UBSectionViewer = ({ section, className = '', }) => {
    return (_jsxs("div", { className: `ub-section ${className}`, id: `section-${section.number}`, children: [_jsxs("h2", { className: "ub-section-title", children: [section.number, ". ", section.title] }), _jsx("div", { className: "ub-section-paragraphs", children: section.paragraphs.map((paragraph) => (_jsx(UBParagraphViewer, { paragraph: paragraph }, paragraph.number))) })] }));
};
/**
 * A component that renders a UB paragraph
 */
export const UBParagraphViewer = ({ paragraph, className = '', }) => {
    return (_jsxs("div", { className: `ub-paragraph ${className}`, id: `p-${paragraph.number}`, children: [_jsx("span", { className: "ub-paragraph-number", children: paragraph.number }), _jsx("span", { className: "ub-paragraph-text", dangerouslySetInnerHTML: { __html: paragraph.text } })] }));
};
/**
 * A component that renders a document
 */
export const DocumentViewer = ({ content, className = '', }) => {
    return (_jsx("div", { className: `document-viewer ${className}`, children: _jsx("div", { className: "document-content", dangerouslySetInnerHTML: { __html: content } }) }));
};
//# sourceMappingURL=index.js.map