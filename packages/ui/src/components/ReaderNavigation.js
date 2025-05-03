/**
 * Reader Navigation Component
 *
 * This component displays navigation elements like table of contents,
 * breadcrumbs, and relationship map.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import './ReaderNavigation.css';
/**
 * The ReaderNavigation component
 */
export function ReaderNavigation({ document, config, activeSection, onSectionSelect, className = '', onNavigationOpen, onNavigationClose, initiallyOpen = false, closeOnSelect = true, }) {
    // State for navigation panel
    const [isOpen, setIsOpen] = useState(initiallyOpen);
    const [activePart, setActivePart] = useState(null);
    const [expandedParts, setExpandedParts] = useState([]);
    // Ref for navigation panel
    const navPanelRef = useRef(null);
    // Mock data for parts and papers (in a real implementation, this would come from the API)
    const parts = [
        {
            id: 'part1',
            title: 'PART I. THE CENTRAL AND SUPERUNIVERSES',
            papers: [
                {
                    id: 'paper1',
                    title: 'Paper 1: The Universal Father',
                    sections: document.sections, // Use the current document's sections for demo
                },
                {
                    id: 'paper2',
                    title: 'Paper 2: The Nature of God',
                    sections: [],
                },
            ],
        },
        {
            id: 'part2',
            title: 'PART II. THE LOCAL UNIVERSE',
            papers: [
                {
                    id: 'paper32',
                    title: 'Paper 32: The Evolution of Local Universes',
                    sections: [],
                },
                {
                    id: 'paper33',
                    title: 'Paper 33: Administration of the Local Universe',
                    sections: [],
                },
            ],
        },
        {
            id: 'part3',
            title: 'PART III. THE HISTORY OF URANTIA',
            papers: [
                {
                    id: 'paper57',
                    title: 'Paper 57: The Origin of Urantia',
                    sections: [],
                },
                {
                    id: 'paper58',
                    title: 'Paper 58: Life Establishment on Urantia',
                    sections: [],
                },
            ],
        },
        {
            id: 'part4',
            title: 'PART IV. THE LIFE AND TEACHINGS OF JESUS',
            papers: [
                {
                    id: 'paper120',
                    title: 'Paper 120: The Bestowal of Michael on Urantia',
                    sections: [],
                },
                {
                    id: 'paper121',
                    title: "Paper 121: The Times of Michael's Bestowal",
                    sections: [],
                },
            ],
        },
    ];
    // Set the active part based on the current document
    useEffect(() => {
        // In a real implementation, we would determine the active part based on the document
        // For now, we'll just set the first part as active
        setActivePart('part1');
        setExpandedParts(['part1']);
    }, [document]);
    // Toggle navigation panel
    const toggleNavigation = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (newIsOpen) {
            onNavigationOpen === null || onNavigationOpen === void 0 ? void 0 : onNavigationOpen();
        }
        else {
            onNavigationClose === null || onNavigationClose === void 0 ? void 0 : onNavigationClose();
        }
    };
    // Toggle part expansion
    const togglePart = (partId) => {
        if (expandedParts.includes(partId)) {
            setExpandedParts(expandedParts.filter(id => id !== partId));
        }
        else {
            setExpandedParts([...expandedParts, partId]);
            setActivePart(partId);
        }
    };
    // Handle section selection
    const handleSectionSelect = (sectionId) => {
        onSectionSelect(sectionId);
        if (closeOnSelect && window.innerWidth < 768) {
            setIsOpen(false);
            onNavigationClose === null || onNavigationClose === void 0 ? void 0 : onNavigationClose();
        }
    };
    // Close navigation when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navPanelRef.current && !navPanelRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
                onNavigationClose === null || onNavigationClose === void 0 ? void 0 : onNavigationClose();
            }
        };
        window.document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onNavigationClose]);
    // Get extension components
    const extensionTocComponents = config.extensions
        .map(extensionId => {
        // This would be implemented to get custom TOC components from extensions
        // For now, we'll return null
        return null;
    })
        .filter(Boolean);
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "reader-header-button reader-nav-toggle", onClick: toggleNavigation, "aria-label": "Toggle navigation", "aria-expanded": isOpen, children: _jsx("i", { className: `fas ${isOpen ? 'fa-times' : 'fa-bars'}` }) }), _jsxs("div", { ref: navPanelRef, className: `reader-navigation-menu ${isOpen ? 'open' : ''}`, "aria-hidden": !isOpen, children: [_jsx("div", { className: "reader-nav-fixed-top", children: parts
                            .filter(part => part.id === activePart)
                            .map(part => (_jsxs("div", { children: [_jsxs("button", { className: `reader-part-toggle ${expandedParts.includes(part.id) ? 'expanded' : ''}`, onClick: () => togglePart(part.id), "aria-expanded": expandedParts.includes(part.id), children: [part.title, _jsx("i", { className: "fas fa-chevron-down" })] }), expandedParts.includes(part.id) && (_jsx("div", { className: "reader-part-content", children: _jsx("ul", { className: "reader-nav-list", children: part.papers.map(paper => (_jsx("li", { className: "reader-nav-item", children: _jsx("a", { href: `#${paper.id}`, className: `reader-nav-link ${paper.id === document.id ? 'active' : ''}`, children: paper.title }) }, paper.id))) }) }))] }, part.id))) }), _jsx("div", { className: "reader-nav-scrollable" }), _jsx("div", { className: "reader-nav-fixed-bottom", children: parts
                            .filter(part => part.id !== activePart)
                            .map(part => (_jsxs("div", { children: [_jsxs("button", { className: `reader-part-toggle ${expandedParts.includes(part.id) ? 'expanded' : ''}`, onClick: () => togglePart(part.id), "aria-expanded": expandedParts.includes(part.id), children: [part.title, _jsx("i", { className: "fas fa-chevron-down" })] }), expandedParts.includes(part.id) && (_jsx("div", { className: "reader-part-content", children: _jsx("ul", { className: "reader-nav-list", children: part.papers.map(paper => (_jsx("li", { className: "reader-nav-item", children: _jsx("a", { href: `#${paper.id}`, className: `reader-nav-link ${paper.id === document.id ? 'active' : ''}`, children: paper.title }) }, paper.id))) }) }))] }, part.id))) })] }), _jsx("div", { className: `reader-overlay ${isOpen ? 'active' : ''}`, onClick: () => {
                    setIsOpen(false);
                    onNavigationClose === null || onNavigationClose === void 0 ? void 0 : onNavigationClose();
                } }), _jsxs("div", { className: `reader-navigation ${className}`, children: [config.navigation.showBreadcrumbs && (_jsxs("div", { className: "reader-breadcrumbs", children: [_jsx("span", { className: "reader-breadcrumb-item", children: "Home" }), _jsx("span", { className: "reader-breadcrumb-separator", children: "/" }), _jsx("span", { className: "reader-breadcrumb-item", children: document.title }), activeSection && (_jsxs(_Fragment, { children: [_jsx("span", { className: "reader-breadcrumb-separator", children: "/" }), _jsx("span", { className: "reader-breadcrumb-item", children: findSectionTitle(document, activeSection) })] }))] })), config.navigation.showTableOfContents && (_jsxs("div", { className: "reader-toc", children: [_jsx("h3", { className: "reader-toc-title", children: "Table of Contents" }), _jsx("ul", { className: "reader-toc-list", children: document.sections.map(section => (_jsx(TableOfContentsItem, { section: section, activeSection: activeSection, onSectionSelect: handleSectionSelect, level: 1 }, section.id))) })] })), config.navigation.showRelationshipMap && document.relationships.length > 0 && (_jsxs("div", { className: "reader-relationship-map", children: [_jsx("h3", { className: "reader-relationship-map-title", children: "Related Documents" }), _jsx("ul", { className: "reader-relationship-list", children: document.relationships.map((relationship, index) => (_jsxs("li", { className: "reader-relationship-item", children: [_jsx("span", { className: "reader-relationship-type", children: relationship.type }), _jsx("span", { className: "reader-relationship-target", children: relationship.targetDocumentId }), relationship.description && (_jsx("span", { className: "reader-relationship-description", children: relationship.description }))] }, index))) })] }))] })] }));
}
/**
 * Component for rendering a table of contents item
 */
function TableOfContentsItem({ section, activeSection, onSectionSelect, level, }) {
    const isActive = activeSection === section.id;
    const hasSubsections = section.subsections && section.subsections.length > 0;
    return (_jsxs("li", { className: `reader-toc-item reader-toc-level-${level} ${isActive ? 'active' : ''}`, children: [_jsx("a", { href: `#${section.id}`, className: "reader-toc-link", onClick: e => {
                    e.preventDefault();
                    onSectionSelect(section.id);
                }, children: section.title }), hasSubsections && (_jsx("ul", { className: "reader-toc-sublist", children: section.subsections.map(subsection => (_jsx(TableOfContentsItem, { section: subsection, activeSection: activeSection, onSectionSelect: onSectionSelect, level: level + 1 }, subsection.id))) }))] }));
}
/**
 * Find the title of a section by its ID
 *
 * @param document The document to search
 * @param sectionId The ID of the section to find
 * @returns The title of the section, or undefined if not found
 */
function findSectionTitle(document, sectionId) {
    // Search in top-level sections
    for (const section of document.sections) {
        if (section.id === sectionId) {
            return section.title;
        }
        // Search in subsections
        if (section.subsections) {
            const subsectionTitle = findSubsectionTitle(section.subsections, sectionId);
            if (subsectionTitle) {
                return subsectionTitle;
            }
        }
    }
    return undefined;
}
/**
 * Find the title of a subsection by its ID
 *
 * @param subsections The subsections to search
 * @param sectionId The ID of the section to find
 * @returns The title of the section, or undefined if not found
 */
function findSubsectionTitle(subsections, sectionId) {
    for (const subsection of subsections) {
        if (subsection.id === sectionId) {
            return subsection.title;
        }
        // Search in nested subsections
        if (subsection.subsections) {
            const nestedTitle = findSubsectionTitle(subsection.subsections, sectionId);
            if (nestedTitle) {
                return nestedTitle;
            }
        }
    }
    return undefined;
}
//# sourceMappingURL=ReaderNavigation.js.map