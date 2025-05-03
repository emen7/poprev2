import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { UBContentRenderer } from '../content/UBContentRenderer';
import './UBContentRendererExample.css';
/**
 * Example component demonstrating the UB content renderer
 */
export const UBContentRendererExample = () => {
    // State for paper ID
    const [paperId, setPaperId] = useState('1');
    // State for section ID
    const [sectionId, setSectionId] = useState('1');
    // State for formatting type
    const [formatType, setFormatType] = useState('traditional');
    // State for vertical numbering
    const [useVerticalNumbering, setUseVerticalNumbering] = useState(true);
    // State for highlighted paragraph
    const [highlightedParagraphId, setHighlightedParagraphId] = useState(undefined);
    // Handle paragraph click
    const handleParagraphClick = (paragraphId) => {
        setHighlightedParagraphId(paragraphId === highlightedParagraphId ? undefined : paragraphId);
    };
    // Handle paper ID change
    const handlePaperIdChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPaperId(value);
        }
    };
    // Handle section ID change
    const handleSectionIdChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setSectionId(value);
        }
    };
    return (_jsxs("div", { className: "ub-content-renderer-example", children: [_jsxs("div", { className: "example-header", children: [_jsx("h1", { children: "UB Content Renderer Example" }), _jsx("p", { children: "This example demonstrates the UB content renderer with paragraph numbering. Enter a paper ID and section ID to load content." }), _jsxs("div", { className: "example-controls", children: [_jsxs("div", { className: "control-group", children: [_jsx("label", { children: "Paper ID:" }), _jsx("input", { type: "text", value: paperId, onChange: handlePaperIdChange, placeholder: "Enter paper ID" })] }), _jsxs("div", { className: "control-group", children: [_jsx("label", { children: "Section ID:" }), _jsx("input", { type: "text", value: sectionId, onChange: handleSectionIdChange, placeholder: "Enter section ID" })] }), _jsxs("div", { className: "control-group", children: [_jsx("label", { children: "Format Type:" }), _jsxs("div", { className: "radio-group", children: [_jsxs("label", { children: [_jsx("input", { type: "radio", name: "formatType", value: "traditional", checked: formatType === 'traditional', onChange: () => setFormatType('traditional') }), "Traditional"] }), _jsxs("label", { children: [_jsx("input", { type: "radio", name: "formatType", value: "modern", checked: formatType === 'modern', onChange: () => setFormatType('modern') }), "Modern"] })] })] }), _jsxs("div", { className: "control-group", children: [_jsx("label", { children: "Numbering Style:" }), _jsxs("div", { className: "radio-group", children: [_jsxs("label", { children: [_jsx("input", { type: "radio", name: "numberingStyle", value: "vertical", checked: useVerticalNumbering, onChange: () => setUseVerticalNumbering(true) }), "Vertical Column"] }), _jsxs("label", { children: [_jsx("input", { type: "radio", name: "numberingStyle", value: "inline", checked: !useVerticalNumbering, onChange: () => setUseVerticalNumbering(false) }), "Inline"] })] })] }), _jsx("div", { className: "control-group", children: _jsx("button", { className: "load-button", onClick: () => {
                                        // Force a re-render by setting the highlighted paragraph ID to undefined
                                        setHighlightedParagraphId(undefined);
                                    }, children: "Load Content" }) })] })] }), _jsx("div", { className: "example-content", children: _jsx(UBContentRenderer, { paperId: paperId, sectionId: sectionId, formatType: formatType, useVerticalNumbering: useVerticalNumbering, highlightedParagraphId: highlightedParagraphId, onParagraphClick: handleParagraphClick }) }), _jsx("div", { className: "example-footer", children: _jsx("p", { children: "Click on a paragraph to highlight it. Use the toggle button in the bottom left to show/hide paragraph numbers." }) })] }));
};
export default UBContentRendererExample;
//# sourceMappingURL=UBContentRendererExample.js.map