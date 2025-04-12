import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { useNavigation } from '@ub-ecosystem/state-management';
import { HamburgerButton } from './HamburgerButton';
import { BookNavigationPanel } from './BookNavigationPanel';
import { SectionNavigationPanel } from './SectionNavigationPanel';
import styles from './DualHamburgerNavigation.module.css';
/**
 * DualHamburgerNavigation Component
 *
 * A navigation component that provides both book-level and section-level navigation
 * through two hamburger buttons and sliding panels.
 */
export function DualHamburgerNavigation({ className = '' }) {
  const { isBookNavOpen, isSectionNavOpen, toggleBookNav, toggleSectionNav } = useNavigation();
  // Close navigation panels when pressing Escape key
  useEffect(() => {
    const handleKeyDown = event => {
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
  return _jsxs(_Fragment, {
    children: [
      _jsx('div', {
        className: `${styles.dualHamburgerNavigation} ${className}`,
        children: _jsxs('div', {
          className: styles.buttonContainer,
          children: [
            _jsx(HamburgerButton, {
              variant: 'book',
              isOpen: isBookNavOpen,
              onClick: toggleBookNav,
            }),
            _jsx(HamburgerButton, {
              variant: 'section',
              isOpen: isSectionNavOpen,
              onClick: toggleSectionNav,
            }),
          ],
        }),
      }),
      _jsx(BookNavigationPanel, { isOpen: isBookNavOpen }),
      _jsx(SectionNavigationPanel, { isOpen: isSectionNavOpen }),
      _jsx('div', {
        className: `${styles.overlay} ${isBookNavOpen || isSectionNavOpen ? styles.overlayVisible : ''}`,
        onClick: handleOverlayClick,
        'aria-hidden': 'true',
      }),
    ],
  });
}
export default DualHamburgerNavigation;
//# sourceMappingURL=DualHamburgerNavigation.js.map
