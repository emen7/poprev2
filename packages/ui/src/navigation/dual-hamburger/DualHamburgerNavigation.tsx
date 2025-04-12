import { useNavigation } from '@ub-ecosystem/state-management';
import React, { useEffect } from 'react';

import { BookNavigationPanel } from './BookNavigationPanel';
import styles from './DualHamburgerNavigation.module.css';
import { HamburgerButton } from './HamburgerButton';
import { SectionNavigationPanel } from './SectionNavigationPanel';

export interface DualHamburgerNavigationProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DualHamburgerNavigation Component
 *
 * A navigation component that provides both book-level and section-level navigation
 * through two hamburger buttons and sliding panels.
 */
export function DualHamburgerNavigation({ className = '' }: DualHamburgerNavigationProps) {
  const { isBookNavOpen, isSectionNavOpen, toggleBookNav, toggleSectionNav } = useNavigation();

  // Close navigation panels when pressing Escape key
  useEffect(() => {
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

  // Prevent scrolling of the body when a navigation panel is open
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
