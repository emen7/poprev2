import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import './StickyHeadersContainer.css';
/**
 * StickyHeadersContainer Component
 *
 * A component that provides sticky paper title and section headers that update as the user scrolls.
 * - Paper title remains fixed at the top of the viewport
 * - Current section title sticks below the paper title
 * - Section titles update automatically as the user scrolls through the document
 */
export function StickyHeadersContainer({ paperTitle, sections, currentSectionId, onSectionChange, className = '', }) {
    const [activeSectionId, setActiveSectionId] = useState(currentSectionId);
    const [isScrolled, setIsScrolled] = useState(false);
    const observerRef = useRef(null);
    const sectionRefs = useRef(new Map());
    // Set up intersection observer for section headers
    useEffect(() => {
        observerRef.current = new IntersectionObserver(entries => {
            // Sort entries by their position in the document (top to bottom)
            const sortedEntries = [...entries].sort((a, b) => {
                const rectA = a.boundingClientRect;
                const rectB = b.boundingClientRect;
                return rectA.top - rectB.top;
            });
            // Find the first entry that is intersecting or about to intersect
            for (const entry of sortedEntries) {
                const sectionId = entry.target.getAttribute('data-section-id');
                if (sectionId && entry.isIntersecting) {
                    if (activeSectionId !== sectionId) {
                        setActiveSectionId(sectionId);
                        if (onSectionChange) {
                            onSectionChange(sectionId);
                        }
                    }
                    break;
                }
            }
        }, {
            threshold: 0,
            rootMargin: '-56px 0px 0px 0px', // Adjust based on paper title height
        });
        // Observe all section headers
        const sectionElements = sectionRefs.current;
        sections.forEach(section => {
            var _a;
            const element = sectionElements.get(section.id);
            if (element) {
                (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.observe(element);
            }
        });
        return () => {
            var _a;
            (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }, [sections, onSectionChange, activeSectionId]);
    // Handle scroll events for paper title shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // Get the active section data
    const activeSection = sections.find(section => section.id === activeSectionId);
    return (_jsxs("div", { className: `sticky-headers-container ${className}`, children: [_jsx("div", { className: `sticky-paper-title ${isScrolled ? 'scrolled' : ''}`, children: paperTitle }), activeSection && _jsx("div", { className: "sticky-section-header", children: activeSection.title }), _jsx("div", { className: "section-headers", children: sections.map(section => (_jsx("div", { ref: el => {
                        if (el)
                            sectionRefs.current.set(section.id, el);
                    }, "data-section-id": section.id, className: "section-header", children: section.title }, section.id))) })] }));
}
export default StickyHeadersContainer;
//# sourceMappingURL=StickyHeadersContainer.js.map