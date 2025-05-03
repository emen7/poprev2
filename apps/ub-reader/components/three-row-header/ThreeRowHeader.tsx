/**
 * Three-Row Header Component
 *
 * This component implements the new 3-row fixed header design for the UB Reader.
 * It combines the Title, Paper, and Section rows into a single component.
 */

&apos;use client';

import React from &apos;react';

import { PaperRow } from './PaperRow';
import { DynamicSectionRow } from './SectionRow';
import { TitleRow } from './TitleRow';
import type { ThreeRowHeaderProps } from './types';
import '../../styles/three-row-header.css';

export const ThreeRowHeader: React.FC<ThreeRowHeaderProps> = ({
  paper,
  className = '',
  onBookMenuToggle,
  onSectionMenuToggle,
  onPreviousPaper,
  onNextPaper,
  brandingElement,
}) => {
  return (
    <header className={`three-row-header ${className}`}>
      {/* Row 1 - Title Row */}
      <TitleRow
        title="Urantia Book"
        onBookMenuToggle={onBookMenuToggle}
        onSectionMenuToggle={onSectionMenuToggle}
        onPreviousPaper={onPreviousPaper}
        onNextPaper={onNextPaper}
        brandingElement={brandingElement}
      />

      {/* Row 2 - Paper Row */}
      <PaperRow paperTitle={`Paper ${paper.number}: ${paper.title}`} />

      {/* Row 3 - Dynamic Section Row */}
      <DynamicSectionRow
        sectionHeadingSelector=".section-title"
        containerSelector=".reading-area"
      />

      {/* Using global styles from three-row-header.css */}
    </header>
  );
};
