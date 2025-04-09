import React, { useState, ReactNode } from 'react';
import { Header, SidePanel } from './';
import HamburgerButton from '../navigation/HamburgerButton';
import './ReaderHeader.css';

export interface ReaderHeaderProps {
  /**
   * The title of the current paper/document
   */
  title: string;

  /**
   * Content for the book navigation panel
   */
  bookNavigationContent?: ReactNode;

  /**
   * Content for the section navigation panel
   */
  sectionNavigationContent?: ReactNode;

  /**
   * Additional content for the right section of the header
   */
  rightContent?: ReactNode;

  /**
   * Whether the header is fixed at the top
   * @default true
   */
  fixed?: boolean;

  /**
   * Whether to show a border at the bottom of the header
   * @default true
   */
  showBorder?: boolean;

  /**
   * Whether to make the header transparent when scrolled to top
   * @default false
   */
  transparentOnTop?: boolean;

  /**
   * Whether to show a shadow under the header
   * @default true
   */
  showShadow?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ReaderHeader Component
 *
 * A specialized header for the UB Reader with book and section navigation.
 * Includes two hamburger buttons and a title, with side panels for navigation.
 */
export function ReaderHeader({
  title,
  bookNavigationContent,
  sectionNavigationContent,
  rightContent,
  fixed = true,
  showBorder = true,
  transparentOnTop = false,
  showShadow = true,
  className = '',
}: ReaderHeaderProps) {
  // State for tracking which panel is open
  const [isBookNavOpen, setIsBookNavOpen] = useState(false);
  const [isSectionNavOpen, setIsSectionNavOpen] = useState(false);

  // Toggle functions for the panels
  const toggleBookNav = () => {
    setIsBookNavOpen(!isBookNavOpen);
    if (!isBookNavOpen) {
      setIsSectionNavOpen(false);
    }
  };

  const toggleSectionNav = () => {
    setIsSectionNavOpen(!isSectionNavOpen);
    if (!isSectionNavOpen) {
      setIsBookNavOpen(false);
    }
  };

  // Close functions for the panels
  const closeBookNav = () => {
    setIsBookNavOpen(false);
  };

  const closeSectionNav = () => {
    setIsSectionNavOpen(false);
  };

  // Left content with book navigation hamburger
  const leftContent = (
    <div className="reader-header-nav-container">
      <HamburgerButton
        onClick={toggleBookNav}
        isOpen={isBookNavOpen}
        ariaLabel="Toggle book navigation"
        variant="primary"
        className="book-nav-button"
      />
    </div>
  );

  // Center content with title and section navigation hamburger
  const centerContent = (
    <div className="reader-header-title-container">
      <h1 className="reader-header-title">{title}</h1>
      <HamburgerButton
        onClick={toggleSectionNav}
        isOpen={isSectionNavOpen}
        ariaLabel="Toggle section navigation"
        variant="secondary"
        className="section-nav-button"
      />
    </div>
  );

  return (
    <>
      <Header
        leftContent={leftContent}
        centerContent={centerContent}
        rightContent={rightContent}
        fixed={fixed}
        showBorder={showBorder}
        transparentOnTop={transparentOnTop}
        showShadow={showShadow}
        className={`reader-header-container ${className}`}
      />

      {/* Book Navigation Side Panel */}
      <SidePanel
        isOpen={isBookNavOpen}
        onClose={closeBookNav}
        position="left"
        className="book-navigation-panel"
      >
        {bookNavigationContent}
      </SidePanel>

      {/* Section Navigation Side Panel */}
      <SidePanel
        isOpen={isSectionNavOpen}
        onClose={closeSectionNav}
        position="right"
        className="section-navigation-panel"
      >
        {sectionNavigationContent}
      </SidePanel>
    </>
  );
}

export default ReaderHeader;
