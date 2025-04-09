import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ContentContainer } from '../layout/ContentContainer';
import { ContentRenderer } from '../content/ContentRenderer';
import { Header } from '../layout/header';
import { Footer } from '../layout/Footer';
import { NavigationControls } from '../navigation/NavigationControls';
import { TableOfContents } from '../navigation/TableOfContents';
import { mockDocument } from '../content/mockDocument';
import './NavigationExample.css';
/**
 * NavigationExample Component
 *
 * A simple example that demonstrates the essential navigation features:
 * - Header with navigation controls
 * - Table of contents with section linking
 * - Prev/next navigation
 * - Footer with navigation information
 */
export function NavigationExample() {
    // State for format type
    const [formatType, setFormatType] = useState('traditional');
    // State for paragraph numbering
    const [showNumbers, setShowNumbers] = useState(true);
    // State for current section
    const [currentSectionId, setCurrentSectionId] = useState(mockDocument.sections[0].id);
    // Generate table of contents items from the mock document
    const tocItems = mockDocument.sections.map(section => ({
        id: section.id,
        title: section.title,
        level: 0,
        children: [],
    }));
    // Find the current section index
    const currentSectionIndex = mockDocument.sections.findIndex(section => section.id === currentSectionId);
    // Determine if prev/next navigation is available
    const hasPrevious = currentSectionIndex > 0;
    const hasNext = currentSectionIndex < mockDocument.sections.length - 1;
    // Handle navigation to previous section
    const handlePrevious = () => {
        if (hasPrevious) {
            setCurrentSectionId(mockDocument.sections[currentSectionIndex - 1].id);
        }
    };
    // Handle navigation to next section
    const handleNext = () => {
        if (hasNext) {
            setCurrentSectionId(mockDocument.sections[currentSectionIndex + 1].id);
        }
    };
    // Handle TOC item selection
    const handleTocItemSelect = (itemId) => {
        setCurrentSectionId(itemId);
    };
    // Toggle format type
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
    // Filter the document to show only the current section
    const currentSection = mockDocument.sections.find(section => section.id === currentSectionId);
    const filteredDocument = Object.assign(Object.assign({}, mockDocument), { sections: currentSection ? [currentSection] : [] });
    // Create header content
    const headerLeftContent = (_jsx(NavigationControls, { prevEnabled: hasPrevious, nextEnabled: hasNext, onPrevious: handlePrevious, onNext: handleNext, size: "small" }));
    const headerCenterContent = _jsx("h1", { className: "reader-title", children: mockDocument.title });
    const headerRightContent = (_jsxs("div", { className: "reader-controls", children: [_jsx("button", { onClick: toggleFormat, className: "reader-control-button", children: formatType === 'traditional' ? 'Traditional' : 'Modern' }), _jsx("button", { onClick: toggleNumbers, className: "reader-control-button", children: showNumbers ? 'Hide Numbers' : 'Show Numbers' })] }));
    // Create footer content
    const footerLeftContent = (_jsxs("div", { className: "reader-section-info", children: ["Section ", currentSectionIndex + 1, " of ", mockDocument.sections.length] }));
    const footerRightContent = (_jsx(NavigationControls, { prevEnabled: hasPrevious, nextEnabled: hasNext, onPrevious: handlePrevious, onNext: handleNext, size: "small", showLabels: true }));
    return (_jsxs("div", { className: "navigation-example", children: [_jsx(Header, { leftContent: headerLeftContent, centerContent: headerCenterContent, rightContent: headerRightContent }), _jsxs("div", { className: "reader-body", children: [_jsx("aside", { className: "reader-sidebar", children: _jsx(TableOfContents, { items: tocItems, currentItemId: currentSectionId, onItemSelect: handleTocItemSelect, maxHeight: "calc(100vh - 120px)" }) }), _jsx("main", { className: "reader-main", children: _jsx(ContentContainer, { width: "medium", centered: true, padding: "normal", children: _jsx(ContentRenderer, { content: filteredDocument, formatType: formatType, showParagraphNumbers: showNumbers, onSectionVisible: sectionId => {
                                    console.log(`Section visible: ${sectionId}`);
                                } }) }) })] }), _jsx(Footer, { leftContent: footerLeftContent, rightContent: footerRightContent, showCopyright: true, copyrightText: `© ${new Date().getFullYear()} UB Reader` })] }));
}
export default NavigationExample;
//# sourceMappingURL=NavigationExample.js.map