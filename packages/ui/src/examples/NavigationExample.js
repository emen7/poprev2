import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppStateProvider, useNavigation } from '@ub-ecosystem/state-management';
import { useState, useEffect } from 'react';
import { ContentRenderer } from '../content/ContentRenderer';
import { mockDocument } from '../content/mockDocument';
import { ContentContainer } from '../layout/ContentContainer';
import { Footer } from '../layout/Footer';
import { Header } from '../layout/header';
import { NavigationControls } from '../navigation/NavigationControls';
import { TableOfContents } from '../navigation/TableOfContents';
import './NavigationExample.css';
/**
 * NavigationExampleContent Component
 *
 * This is the inner component that uses the state management hooks.
 */
function NavigationExampleContent() {
    // State from state management
    const { currentSectionId: navCurrentSectionId, setCurrentSection, updateSectionTitle, } = useNavigation();
    // Local state for format type and paragraph numbering
    const [formatType, setFormatType] = useState('traditional');
    const [showNumbers, setShowNumbers] = useState(true);
    // Local state for current section ID (synced with navigation state)
    const [currentSectionId, setCurrentSectionId] = useState(mockDocument.sections[0].id);
    // Sync local state with navigation state
    useEffect(() => {
        if (navCurrentSectionId && navCurrentSectionId !== currentSectionId) {
            setCurrentSectionId(navCurrentSectionId);
        }
    }, [navCurrentSectionId]);
    // Update navigation state when local state changes
    useEffect(() => {
        if (currentSectionId) {
            setCurrentSection(currentSectionId);
            // Also update the section title in the navigation state
            const currentSection = mockDocument.sections.find(section => section.id === currentSectionId);
            if (currentSection) {
                updateSectionTitle(currentSection.title);
            }
        }
    }, [currentSectionId, setCurrentSection, updateSectionTitle]);
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
                                    // Update the navigation state when a section becomes visible
                                    if (sectionId !== currentSectionId) {
                                        setCurrentSectionId(sectionId);
                                    }
                                } }) }) })] }), _jsx(Footer, { leftContent: footerLeftContent, rightContent: footerRightContent, showCopyright: true, copyrightText: `© ${new Date().getFullYear()} UB Reader` })] }));
}
/**
 * NavigationExample Component
 *
 * A simple example that demonstrates the essential navigation features:
 * - Header with navigation controls
 * - Table of contents with section linking
 * - Prev/next navigation
 * - Footer with navigation information
 *
 * This component is now wrapped with the AppStateProvider to provide
 * access to the state management system.
 */
export function NavigationExample() {
    return (_jsx(AppStateProvider, { documentId: "navigation-example", children: _jsx(NavigationExampleContent, {}) }));
}
export default NavigationExample;
//# sourceMappingURL=NavigationExample.js.map