import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppStateProvider, useNavigation } from '@ub-ecosystem/state-management';
import { useState, useEffect } from 'react';
import { ContentRenderer } from '../content/ContentRenderer';
import { mockDocument } from '../content/mockDocument';
import { ContentContainer } from '../layout/ContentContainer';
import './BasicReaderExample.css';
/**
 * BasicReaderExampleContent Component
 *
 * This is the inner component that uses the state management hooks.
 */
function BasicReaderExampleContent() {
    // State from state management
    const { currentSectionId, setCurrentSection, updateSectionTitle } = useNavigation();
    // Local state for format type (default to Traditional as per requirements)
    const [formatType, setFormatType] = useState('traditional');
    // State for paragraph numbering
    const [showNumbers, setShowNumbers] = useState(true);
    // State for highlighted sections and paragraphs
    const [highlightedSections, setHighlightedSections] = useState([]);
    const [highlightedParagraphs, setHighlightedParagraphs] = useState([]);
    // Update navigation state when a section becomes visible
    useEffect(() => {
        if (currentSectionId) {
            const section = mockDocument.sections.find(s => s.id === currentSectionId);
            if (section) {
                updateSectionTitle(section.title);
            }
        }
    }, [currentSectionId, updateSectionTitle]);
    // Toggle format type (keeping the toggle for future use, but focusing on Traditional for now)
    const toggleFormat = () => {
        setFormatType(prev => (prev === 'traditional' ? 'modern' : 'traditional'));
        // Note: Modern formatting will be carefully worked on later in the implementation
        if (formatType === 'traditional') {
            console.log('Note: Modern formatting is a future enhancement. Focus is on Traditional formatting for now.');
        }
    };
    // Toggle paragraph numbering
    const toggleNumbers = () => {
        setShowNumbers(prev => !prev);
    };
    // Toggle section highlighting (for demo purposes)
    const toggleSectionHighlight = (sectionId) => {
        setHighlightedSections(prev => prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]);
    };
    // Toggle paragraph highlighting (for demo purposes)
    const toggleParagraphHighlight = (paragraphId) => {
        setHighlightedParagraphs(prev => prev.includes(paragraphId) ? prev.filter(id => id !== paragraphId) : [...prev, paragraphId]);
    };
    return (_jsxs("div", { className: "basic-reader-example", children: [_jsxs("div", { className: "reader-controls", children: [_jsx("h2", { children: "Reader Controls" }), _jsxs("div", { className: "control-group", children: [_jsxs("button", { onClick: toggleFormat, children: ["Format: ", formatType === 'traditional' ? 'Traditional' : 'Modern'] }), _jsxs("button", { onClick: toggleNumbers, children: ["Numbers: ", showNumbers ? 'On' : 'Off'] })] }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "State Management" }), _jsx("div", { children: _jsxs("span", { children: ["Current Section ID: ", currentSectionId || 'None'] }) })] }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "Highlight Sections" }), mockDocument.sections.map(section => (_jsx("button", { onClick: () => toggleSectionHighlight(section.id), className: highlightedSections.includes(section.id) ? 'active' : '', children: section.title }, section.id)))] }), _jsxs("div", { className: "control-group", children: [_jsx("h3", { children: "Highlight Paragraphs" }), _jsx("button", { onClick: () => toggleParagraphHighlight('para-1-1'), className: highlightedParagraphs.includes('para-1-1') ? 'active' : '', children: "Paragraph 1.1" }), _jsx("button", { onClick: () => toggleParagraphHighlight('para-2-2'), className: highlightedParagraphs.includes('para-2-2') ? 'active' : '', children: "Paragraph 2.2" }), _jsx("button", { onClick: () => toggleParagraphHighlight('para-3-2'), className: highlightedParagraphs.includes('para-3-2') ? 'active' : '', children: "Paragraph 3.2" })] })] }), _jsx("div", { className: "reader-content", children: _jsx(ContentContainer, { width: "medium", centered: true, padding: "normal", children: _jsx(ContentRenderer, { content: mockDocument, formatType: formatType, showParagraphNumbers: showNumbers, highlightedSections: highlightedSections, highlightedParagraphs: highlightedParagraphs, onSectionVisible: sectionId => {
                            console.log(`Section visible: ${sectionId}`);
                            setCurrentSection(sectionId);
                        }, onParagraphVisible: paragraphId => {
                            console.log(`Paragraph visible: ${paragraphId}`);
                        } }) }) })] }));
}
/**
 * BasicReaderExample Component
 *
 * A simple example that demonstrates the basic reading experience
 * with the ContentRenderer component, now integrated with the state
 * management system.
 */
export function BasicReaderExample() {
    return (_jsx(AppStateProvider, { documentId: "basic-reader-example", children: _jsx(BasicReaderExampleContent, {}) }));
}
export default BasicReaderExample;
//# sourceMappingURL=BasicReaderExample.js.map