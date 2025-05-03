import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Example usage of the Reader context provider and hooks
 */
import { useState } from 'react';
import { ReaderProvider, UBReaderProvider, useReader, useTheme, useDocument, } from '../context';
import { ContentType } from '../../types/document';
import { ThemeType } from '../../types/reader';
/**
 * Example document
 */
const exampleDocument = {
    id: 'example-doc',
    title: 'Example Document',
    contentType: ContentType.STANDARD,
    sections: [
        {
            id: 'section-1',
            title: 'Introduction',
            number: 1,
            paragraphs: [
                {
                    id: 'p-1',
                    number: 1,
                    text: 'This is the first paragraph of the introduction.',
                },
                {
                    id: 'p-2',
                    number: 2,
                    text: 'This is the second paragraph of the introduction.',
                },
            ],
        },
        {
            id: 'section-2',
            title: 'Main Content',
            number: 2,
            paragraphs: [
                {
                    id: 'p-3',
                    number: 3,
                    text: 'This is the first paragraph of the main content.',
                },
                {
                    id: 'p-4',
                    number: 4,
                    text: 'This is the second paragraph of the main content.',
                },
            ],
        },
    ],
    metadata: {
        author: 'Test Author',
        publicationDate: '2025-04-16',
        language: 'en',
        tags: ['example', 'test'],
        category: 'documentation',
    },
};
/**
 * Reader controls component
 */
const ReaderControls = () => {
    const { navigation, selection } = useReader();
    const { theme, setThemeType } = useTheme();
    const { document } = useDocument();
    // Handle theme change
    const handleThemeChange = (event) => {
        setThemeType(event.target.value);
    };
    // Handle navigation
    const handleNextSection = () => {
        navigation.navigateToNextSection();
    };
    const handlePrevSection = () => {
        navigation.navigateToPreviousSection();
    };
    const handleNextParagraph = () => {
        navigation.navigateToNextParagraph();
    };
    const handlePrevParagraph = () => {
        navigation.navigateToPreviousParagraph();
    };
    // Get current position
    const currentSection = navigation.getCurrentSection();
    const currentParagraph = navigation.getCurrentParagraph();
    return (_jsxs("div", { className: "reader-controls", children: [_jsxs("div", { className: "theme-controls", children: [_jsx("label", { htmlFor: "theme-select", children: "Theme: " }), _jsxs("select", { id: "theme-select", value: theme.type, onChange: handleThemeChange, children: [_jsx("option", { value: ThemeType.LIGHT, children: "Light" }), _jsx("option", { value: ThemeType.DARK, children: "Dark" }), _jsx("option", { value: ThemeType.SEPIA, children: "Sepia" }), _jsx("option", { value: ThemeType.TRADITIONAL, children: "Traditional" })] })] }), _jsxs("div", { className: "navigation-controls", children: [_jsx("button", { onClick: handlePrevSection, children: "Previous Section" }), _jsx("button", { onClick: handleNextSection, children: "Next Section" }), _jsx("button", { onClick: handlePrevParagraph, children: "Previous Paragraph" }), _jsx("button", { onClick: handleNextParagraph, children: "Next Paragraph" })] }), _jsxs("div", { className: "current-position", children: [_jsxs("p", { children: [_jsx("strong", { children: "Document:" }), " ", document === null || document === void 0 ? void 0 : document.title] }), _jsxs("p", { children: [_jsx("strong", { children: "Current Section:" }), " ", currentSection === null || currentSection === void 0 ? void 0 : currentSection.title, " (", currentSection === null || currentSection === void 0 ? void 0 : currentSection.number, ")"] }), _jsxs("p", { children: [_jsx("strong", { children: "Current Paragraph:" }), " ", currentParagraph === null || currentParagraph === void 0 ? void 0 : currentParagraph.number] })] })] }));
};
/**
 * Content display component
 */
const ContentDisplay = () => {
    const { navigation } = useReader();
    const { theme } = useTheme();
    // Get current content
    const currentSection = navigation.getCurrentSection();
    const currentParagraph = navigation.getCurrentParagraph();
    // Apply theme styles
    const themeStyles = {
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '1rem',
        borderRadius: '0.5rem',
    };
    return (_jsx("div", { className: "content-display", style: themeStyles, children: currentSection && (_jsxs("div", { className: "section", children: [_jsx("h2", { children: currentSection.title }), currentParagraph && (_jsxs("div", { className: "paragraph", children: [_jsxs("span", { className: "paragraph-number", children: [currentParagraph.number, "."] }), _jsx("span", { className: "paragraph-text", children: currentParagraph.text })] }))] })) }));
};
/**
 * Selection tools component
 */
const SelectionTools = () => {
    const { selection } = useReader();
    const [selectedText, setSelectedText] = useState('');
    // Handle text selection
    const handleTextSelection = () => {
        var _a;
        const text = ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        setSelectedText(text);
    };
    // Handle highlight creation
    const handleHighlight = () => {
        if (!selectedText)
            return;
        // In a real implementation, we would get the proper selection position
        // For this example, we'll create a dummy selection
        const dummySelection = {
            text: selectedText,
            startPosition: {
                documentId: 'example-doc',
                sectionIndex: 0,
                paragraphIndex: 0,
                textOffset: 0,
            },
            endPosition: {
                documentId: 'example-doc',
                sectionIndex: 0,
                paragraphIndex: 0,
                textOffset: selectedText.length,
            },
        };
        selection.createSelection(dummySelection);
        alert(`Selection created: ${selectedText}`);
        setSelectedText('');
    };
    return (_jsxs("div", { className: "selection-tools", children: [_jsx("div", { className: "selection-input", children: _jsx("textarea", { value: selectedText, onChange: e => setSelectedText(e.target.value), onMouseUp: handleTextSelection, placeholder: "Select text here or type to simulate selection", rows: 3, style: { width: '100%' } }) }), _jsx("div", { className: "selection-actions", children: _jsx("button", { onClick: handleHighlight, disabled: !selectedText, children: "Create Selection" }) }), _jsxs("div", { className: "selections-list", children: [_jsx("h3", { children: "Selections" }), _jsx("ul", { children: selection.getSelections().map(sel => (_jsx("li", { children: sel.text }, sel.id))) })] })] }));
};
/**
 * Main reader example component
 */
export const ReaderExample = () => {
    return (_jsx(ReaderProvider, { document: exampleDocument, children: _jsxs("div", { className: "reader-example", children: [_jsx("h1", { children: "Reader Example" }), _jsxs("div", { className: "reader-layout", children: [_jsxs("div", { className: "reader-sidebar", children: [_jsx(ReaderControls, {}), _jsx(SelectionTools, {})] }), _jsx("div", { className: "reader-content", children: _jsx(ContentDisplay, {}) })] })] }) }));
};
/**
 * UB-specific reader example component
 */
export const UBReaderExample = () => {
    return (_jsx(UBReaderProvider, { document: exampleDocument, children: _jsxs("div", { className: "reader-example", children: [_jsx("h1", { children: "UB Reader Example" }), _jsxs("div", { className: "reader-layout", children: [_jsxs("div", { className: "reader-sidebar", children: [_jsx(ReaderControls, {}), _jsx(SelectionTools, {})] }), _jsx("div", { className: "reader-content", children: _jsx(ContentDisplay, {}) })] })] }) }));
};
export default ReaderExample;
//# sourceMappingURL=ReaderExample.js.map