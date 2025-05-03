import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ParagraphContainer } from '../content/ParagraphContainer';
import './ParagraphNumberingExample.css';
/**
 * Example component demonstrating the paragraph numbering system
 */
export const ParagraphNumberingExample = () => {
    // Sample paragraphs with notes
    const sampleParagraphs = [
        {
            id: 'p1',
            number: 1,
            text: 'This is the first paragraph of the example. It demonstrates the basic paragraph rendering with the new numbering system.',
            hasNotes: true,
        },
        {
            id: 'p2',
            number: 2,
            text: 'The second paragraph has no notes attached to it. Notice how the note indicator is not shown for this paragraph.',
        },
        {
            id: 'p3',
            number: 3,
            text: 'This paragraph has notes attached to it, so you can see the note indicator in the numbering column.',
            hasNotes: true,
        },
        {
            id: 'p4',
            number: 4,
            text: 'This is an indented paragraph, which might represent a quote or special section in the text.',
            metadata: {
                isIndented: true,
            },
        },
        {
            id: 'p5',
            number: 5,
            text: 'This is a numbered list item.',
            hasNotes: true,
            metadata: {
                isList: true,
                listType: 'numbered',
            },
        },
        {
            id: 'p6',
            number: 6,
            text: 'This is another numbered list item.',
            metadata: {
                isList: true,
                listType: 'numbered',
            },
        },
        {
            id: 'p7',
            number: 7,
            text: 'This is a bulleted list item.',
            metadata: {
                isList: true,
                listType: 'bulleted',
            },
        },
        {
            id: 'p8',
            number: 8,
            text: 'This is another bulleted list item with notes.',
            hasNotes: true,
            metadata: {
                isList: true,
                listType: 'bulleted',
            },
        },
        {
            id: 'p9',
            number: 9,
            text: 'This paragraph marks a topic change in the text.',
            metadata: {
                isTopicChange: true,
            },
        },
        {
            id: 'p10',
            number: 10,
            text: 'This is the final paragraph in our example, demonstrating the complete numbering system.',
            hasNotes: true,
        },
    ];
    // State for the formatting type
    const [formatType, setFormatType] = useState('traditional');
    // State for vertical numbering
    const [useVerticalNumbering, setUseVerticalNumbering] = useState(true);
    // State for highlighted paragraph
    const [highlightedParagraphId, setHighlightedParagraphId] = useState(undefined);
    // Handle paragraph click
    const handleParagraphClick = (paragraphId) => {
        setHighlightedParagraphId(paragraphId === highlightedParagraphId ? undefined : paragraphId);
    };
    return (_jsxs("div", { className: "paragraph-numbering-example", children: [_jsxs("div", { className: "example-header", children: [_jsx("h1", { children: "Paragraph Numbering Example" }), _jsx("p", { children: "This example demonstrates the paragraph numbering system for the Urantia Book reader. The numbering column on the left shows paragraph numbers and note indicators." }), _jsxs("div", { className: "example-controls", children: [_jsxs("div", { className: "control-group", children: [_jsx("label", { children: "Format Type:" }), _jsxs("div", { className: "radio-group", children: [_jsxs("label", { children: [_jsx("input", { type: "radio", name: "formatType", value: "traditional", checked: formatType === 'traditional', onChange: () => setFormatType('traditional') }), "Traditional"] }), _jsxs("label", { children: [_jsx("input", { type: "radio", name: "formatType", value: "modern", checked: formatType === 'modern', onChange: () => setFormatType('modern') }), "Modern"] })] })] }), _jsxs("div", { className: "control-group", children: [_jsx("label", { children: "Numbering Style:" }), _jsxs("div", { className: "radio-group", children: [_jsxs("label", { children: [_jsx("input", { type: "radio", name: "numberingStyle", value: "vertical", checked: useVerticalNumbering, onChange: () => setUseVerticalNumbering(true) }), "Vertical Column"] }), _jsxs("label", { children: [_jsx("input", { type: "radio", name: "numberingStyle", value: "inline", checked: !useVerticalNumbering, onChange: () => setUseVerticalNumbering(false) }), "Inline"] })] })] })] })] }), _jsx("div", { className: "example-content", children: _jsx(ParagraphContainer, { paragraphs: sampleParagraphs, formatType: formatType, useVerticalNumbering: useVerticalNumbering, highlightedParagraphId: highlightedParagraphId, onParagraphClick: handleParagraphClick }) }), _jsx("div", { className: "example-footer", children: _jsx("p", { children: "Click on a paragraph to highlight it. Use the toggle button in the bottom left to show/hide paragraph numbers." }) })] }));
};
export default ParagraphNumberingExample;
//# sourceMappingURL=ParagraphNumberingExample.js.map