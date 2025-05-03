/**
 * Section Row Component (Row 3)
 *
 * This is the third row of the 3-row header design.
 * It dynamically displays the current section title as the user scrolls,
 * showing "(intro)" when no section is visible.
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useSectionObserver } from '../../hooks/useSectionObserver';
import './SectionRow.css';
/**
 * SectionRow that automatically observes sections and updates
 */
export const DynamicSectionRow = ({ sectionHeadingSelector = '.section-content', containerSelector = '.content' }) => {
    const { currentSection, isIntroVisible } = useSectionObserver({
        sectionHeadingSelector,
        containerSelector,
        additionalOffset: 70, // Add more offset for reliable detection
    });
    // Always log to help with debugging
    console.log('DynamicSectionRow rendering with section:', currentSection, 'intro visible:', isIntroVisible);
    return _jsx(SectionRow, { currentSection: currentSection, isIntroVisible: isIntroVisible });
};
/**
 * Static SectionRow that receives current section as prop
 */
export const SectionRow = ({ currentSection, isIntroVisible }) => {
    // Force re-render on section change to ensure UI updates
    React.useEffect(() => {
        console.log('SectionRow updated with:', currentSection);
    }, [currentSection, isIntroVisible]);
    return (_jsx("div", { className: "section-row", children: isIntroVisible ? (_jsx("span", { className: "faded-intro", children: "(intro)" })) : (_jsx("span", { className: "section-title", children: currentSection })) }));
};
//# sourceMappingURL=SectionRow.js.map