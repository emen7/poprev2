/**
 * Title Row Component (Row 1)
 *
 * This is the first row of the 3-row header design.
 * It contains the Book Hamburger menu, Section menu, navigation arrows,
 * main title, and branding space.
 */

&apos;use client';

import React from &apos;react';

import type { TitleRowProps } from './types';
import './TitleRow.css';

export const TitleRow: React.FC<TitleRowProps> = ({
  title,
  onBookMenuToggle,
  onSectionMenuToggle,
  onPreviousPaper,
  onNextPaper,
  brandingElement,
}) => {
  return (
    <div className="title-row">
      {/* Book Hamburger Menu */}
      <button
        className="row-button book-menu-button"
        onClick={onBookMenuToggle}
        aria-label="Toggle Book Menu"
      >
        <i className="fas fa-bars" />
      </button>

      {/* Section Hamburger Menu */}
      <button
        className="row-button section-menu-button"
        onClick={onSectionMenuToggle}
        aria-label="Toggle Sections Menu"
      >
        <i className="fas fa-list" />
      </button>

      {/* Previous Paper Arrow */}
      <button
        className="row-button prev-paper-button"
        onClick={onPreviousPaper}
        aria-label="Previous Paper"
      >
        <i className="fas fa-chevron-left" />
      </button>

      {/* Main Title */}
      <h1 className="book-title">{title}</h1>

      {/* Next Paper Arrow */}
      <button
        className="row-button next-paper-button"
        onClick={onNextPaper}
        aria-label="Next Paper"
      >
        <i className="fas fa-chevron-right" />
      </button>

      {/* Branding Space */}
      {brandingElement && <div className="branding-area">{brandingElement}</div>}
    </div>
  );
};
