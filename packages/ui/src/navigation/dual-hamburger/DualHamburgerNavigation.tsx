import { useNavigation } from '@ub-ecosystem/state-management';
import React, { useEffect } from 'react';

import { BookNavigationPanel } from './BookNavigationPanel';
import styles from './DualHamburgerNavigation.module.css';
import { HamburgerButton } from './HamburgerButton';
import { SectionNavigationPanel } from './SectionNavigationPanel';

/**
 * Props for the DualHamburgerNavigation component
 *
 * @interface DualHamburgerNavigationProps
 * @description Props for the dual hamburger navigation component
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
export interface DualHamburgerNavigationProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DualHamburgerNavigation Component
 *
 * @description A navigation component that provides both book-level and section-level navigation
 * through two hamburger buttons and sliding panels. This component handles:
 * - Toggling book and section navigation panels
 * - Keyboard navigation (Escape key to close panels)
 * - Preventing body scrolling when panels are open
 * - Overlay click handling to close panels
 *
 * @example
 * ```tsx
 * <DualHamburgerNavigation className="custom-nav" />
 * ```
 */
export function DualHamburgerNavigation({ className = '' }: DualHamburgerNavigationProps) {
  const { isBookNavOpen, isSectionNavOpen, toggleBookNav, toggleSectionNav } = useNavigation();

  /**
   * Effect to handle keyboard navigation (Escape key to close panels)
   *
   * Adds an event listener for the Escape key to close navigation panels
   * and removes the listener when the component unmounts.
   */
  useEffect(() => {
    /**
     * Handle keydown events to close navigation panels when Escape is pressed
     *
     * @param {KeyboardEvent} event - The keyboard event
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isBookNavOpen) {
          toggleBookNav();
        } else if (isSectionNavOpen) {
          toggleSectionNav();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookNavOpen, isSectionNavOpen, toggleBookNav, toggleSectionNav]);

  /**
   * Effect to prevent body scrolling when navigation panels are open
   *
   * Sets the body's overflow style to 'hidden' when a panel is open
   * and restores it when all panels are closed or the component unmounts.
   */
  useEffect(() => {
    if (isBookNavOpen || isSectionNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookNavOpen, isSectionNavOpen]);

  /**
   * Handle clicks on the overlay to close open navigation panels
   *
   * Closes the book navigation panel if it's open, otherwise
   * closes the section navigation panel if it's open.
   */
  const handleOverlayClick = () => {
    if (isBookNavOpen) {
      toggleBookNav();
    } else if (isSectionNavOpen) {
      toggleSectionNav();
    }
  };

  return (
    <>
      <div className={`${styles.dualHamburgerNavigation} ${className}`}>
        <div className={styles.buttonContainer}>
          <HamburgerButton variant="book" isOpen={isBookNavOpen} onClick={toggleBookNav} />
          <HamburgerButton variant="section" isOpen={isSectionNavOpen} onClick={toggleSectionNav} />
        </div>
      </div>

      <BookNavigationPanel isOpen={isBookNavOpen} />
      <SectionNavigationPanel isOpen={isSectionNavOpen} />

      {/* Overlay that closes the navigation when clicked */}
      <div
        className={`${styles.overlay} ${
          isBookNavOpen || isSectionNavOpen ? styles.overlayVisible : ''
        }`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
    </>
  );
}

export default DualHamburgerNavigation;
