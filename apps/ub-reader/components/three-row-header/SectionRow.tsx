/**
 * Section Row Component (Row 3)
 *
 * This is the third row of the 3-row header design.
 * It dynamically displays the current section title as the user scrolls,
 * showing "(intro)" when no section is visible.
 */

&apos;use client';

import React from &apos;react';

import { useSectionObserver } from '../../hooks/useSectionObserver';

import type { SectionRowProps } from './types';
import './SectionRow.css';

/**
 * SectionRow that automatically observes sections and updates
 */
export const DynamicSectionRow: React.FC<{
  sectionHeadingSelector?: string;
  containerSelector?: string;
}> = ({ sectionHeadingSelector = '.section-content', containerSelector = '.content' }) => {
  const { currentSection, isIntroVisible } = useSectionObserver({
    sectionHeadingSelector,
    containerSelector,
    additionalOffset: 70, // Add more offset for reliable detection
  });

  // Always log to help with debugging
  console.log(
    &apos;DynamicSectionRow rendering with section:',
    currentSection,
    &apos;intro visible:',
    isIntroVisible
  );

  return <SectionRow currentSection={currentSection} isIntroVisible={isIntroVisible} />;
};

/**
 * Static SectionRow that receives current section as prop
 */
export const SectionRow: React.FC<SectionRowProps> = ({ currentSection, isIntroVisible }) => {
  // Force re-render on section change to ensure UI updates
  React.useEffect(() => {
    // Removed console.log
  }, [currentSection, isIntroVisible]);

  return (
    <div className="section-row">
      {isIntroVisible ? (
        <span className="faded-intro">(intro)</span>
      ) : (
        <span className="section-title">{currentSection}</span>
      )}

      {/* Styles moved to external SectionRow.css file */}
    </div>
  );
};
