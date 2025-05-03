import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Simple Reader Example
 *
 * This example demonstrates how to use the Core Package to create a simple reader application.
 */
import { useState } from 'react';
import { ReaderProvider, useReader, useNavigation, useSelection, useTheme, ThemeType, ContentType, } from '../src';
// Sample document
const sampleDocument = {
    id: 'sample-doc',
    title: 'Sample Document',
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
                    text: 'Welcome to the Simple Reader example. This demonstrates how to use the Core Package to create a reader application.',
                },
                {
                    id: 'p-2',
                    number: 2,
                    text: 'The Core Package provides a flexible and extensible architecture for building reader applications with features like navigation, selection, and theming.',
                },
            ],
        },
        {
            id: 'section-2',
            title: 'Features',
            number: 2,
            paragraphs: [
                {
                    id: 'p-3',
                    number: 3,
                    text: 'Navigation: The reader provides navigation between sections and paragraphs with history tracking.',
                },
                {
                    id: 'p-4',
                    number: 4,
                    text: 'Selection: You can select and highlight text with different highlight types.',
                },
                {
                    id: 'p-5',
                    number: 5,
                    text: 'Theming: The reader supports different themes like light, dark, and sepia.',
                },
            ],
        },
        {
            id: 'section-3',
            title: 'Conclusion',
            number: 3,
            paragraphs: [
                {
                    id: 'p-6',
                    number: 6,
                    text: 'This example demonstrates the basic functionality of the Core Package. You can use it as a starting point for building your own reader application.',
                },
            ],
        },
    ],
    metadata: {
        author: 'Core Package Team',
        publicationDate: '2025-04-16',
    },
};
/**
 * Reader Header Component
 */
const ReaderHeader = () => {
    const { document } = useReader();
    const { theme, setThemeType } = useTheme();
    const handleThemeChange = (e) => {
        setThemeType(e.target.value);
    };
    return (_jsxs("header", { style: {
            backgroundColor: theme.primaryColor,
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }, children: [_jsx("h1", { style: { margin: 0 }, children: document === null || document === void 0 ? void 0 : document.title }), _jsxs("div", { children: [_jsx("label", { htmlFor: "theme-select", style: { marginRight: '0.5rem' }, children: "Theme:" }), _jsxs("select", { id: "theme-select", value: theme.type, onChange: handleThemeChange, style: {
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: 'none',
                        }, children: [_jsx("option", { value: ThemeType.LIGHT, children: "Light" }), _jsx("option", { value: ThemeType.DARK, children: "Dark" }), _jsx("option", { value: ThemeType.SEPIA, children: "Sepia" }), _jsx("option", { value: ThemeType.TRADITIONAL, children: "Traditional" })] })] })] }));
};
/**
 * Navigation Controls Component
 */
const NavigationControls = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const buttonStyle = {
        backgroundColor: theme.primaryColor,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        margin: '0 0.25rem',
        cursor: 'pointer',
    };
    return (_jsxs("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: theme.backgroundColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
        }, children: [_jsx("button", { onClick: () => navigation.navigateToPreviousSection(), style: buttonStyle, children: "Previous Section" }), _jsx("button", { onClick: () => navigation.navigateToPreviousParagraph(), style: buttonStyle, children: "Previous Paragraph" }), _jsx("button", { onClick: () => navigation.navigateToNextParagraph(), style: buttonStyle, children: "Next Paragraph" }), _jsx("button", { onClick: () => navigation.navigateToNextSection(), style: buttonStyle, children: "Next Section" })] }));
};
/**
 * Table of Contents Component
 */
const TableOfContents = () => {
    const { document } = useReader();
    const navigation = useNavigation();
    const { theme } = useTheme();
    if (!document)
        return null;
    return (_jsxs("div", { style: {
            width: '250px',
            padding: '1rem',
            backgroundColor: theme.backgroundColor,
            borderRight: `1px solid ${theme.secondaryColor}`,
            color: theme.textColor,
        }, children: [_jsx("h2", { children: "Table of Contents" }), _jsx("ul", { style: { listStyleType: 'none', padding: 0 }, children: document.sections.map((section, index) => (_jsx("li", { style: { marginBottom: '0.5rem' }, children: _jsxs("button", { onClick: () => navigation.navigateToSection(index), style: {
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: theme.linkColor,
                            cursor: 'pointer',
                            textAlign: 'left',
                            padding: '0.5rem',
                            width: '100%',
                            borderRadius: '4px',
                        }, children: [section.number, ". ", section.title] }) }, section.id))) })] }));
};
/**
 * Content Display Component
 */
const ContentDisplay = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const selection = useSelection();
    const [selectedText, setSelectedText] = useState('');
    const currentSection = navigation.getCurrentSection();
    const currentParagraph = navigation.getCurrentParagraph();
    const handleTextSelection = () => {
        var _a;
        const text = ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        setSelectedText(text);
    };
    const handleHighlight = () => {
        if (!selectedText || !currentParagraph)
            return;
        // In a real implementation, we would get the proper selection position
        // For this example, we'll create a dummy selection
        const dummySelection = {
            text: selectedText,
            startPosition: {
                documentId: 'sample-doc',
                sectionIndex: navigation.getState().currentSectionIndex,
                paragraphIndex: navigation.getState().currentParagraphIndex,
                textOffset: 0,
            },
            endPosition: {
                documentId: 'sample-doc',
                sectionIndex: navigation.getState().currentSectionIndex,
                paragraphIndex: navigation.getState().currentParagraphIndex,
                textOffset: selectedText.length,
            },
        };
        selection.createSelection(dummySelection);
        alert(`Selection created: ${selectedText}`);
        setSelectedText('');
    };
    return (_jsx("div", { style: {
            flex: 1,
            padding: '2rem',
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            overflowY: 'auto',
        }, children: currentSection && (_jsxs("div", { children: [_jsx("h2", { style: { color: theme.primaryColor }, children: currentSection.title }), currentParagraph && (_jsxs("div", { style: {
                        marginBottom: '1.5rem',
                        lineHeight: '1.6',
                        fontSize: '1.1rem',
                    }, onMouseUp: handleTextSelection, children: [_jsxs("span", { style: {
                                fontWeight: 'bold',
                                marginRight: '0.5rem',
                                color: theme.secondaryColor,
                            }, children: [currentParagraph.number, "."] }), _jsx("span", { children: currentParagraph.text })] })), selectedText && (_jsxs("div", { style: {
                        marginTop: '1rem',
                        padding: '1rem',
                        backgroundColor: theme.type === ThemeType.DARK ? '#333' : '#f5f5f5',
                        borderRadius: '4px',
                    }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Selected Text:" }), " ", selectedText] }), _jsx("button", { onClick: handleHighlight, style: {
                                backgroundColor: theme.primaryColor,
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                            }, children: "Highlight Selection" })] }))] })) }));
};
/**
 * Simple Reader Component
 */
export const SimpleReader = () => {
    return (_jsx(ReaderProvider, { document: sampleDocument, children: _jsxs("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }, children: [_jsx(ReaderHeader, {}), _jsx(NavigationControls, {}), _jsxs("div", { style: { display: 'flex', flex: 1, overflow: 'hidden' }, children: [_jsx(TableOfContents, {}), _jsx(ContentDisplay, {})] })] }) }));
};
export default SimpleReader;
//# sourceMappingURL=SimpleReader.js.map