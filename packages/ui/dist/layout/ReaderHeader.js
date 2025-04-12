import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Header, SidePanel } from './';
import HamburgerButton from '../navigation/HamburgerButton';
import './ReaderHeader.css';
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
}) {
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
  const leftContent = _jsx('div', {
    className: 'reader-header-nav-container',
    children: _jsx(HamburgerButton, {
      onClick: toggleBookNav,
      isOpen: isBookNavOpen,
      ariaLabel: 'Toggle book navigation',
      variant: 'primary',
      className: 'book-nav-button',
    }),
  });
  // Center content with title and section navigation hamburger
  const centerContent = _jsxs('div', {
    className: 'reader-header-title-container',
    children: [
      _jsx('h1', { className: 'reader-header-title', children: title }),
      _jsx(HamburgerButton, {
        onClick: toggleSectionNav,
        isOpen: isSectionNavOpen,
        ariaLabel: 'Toggle section navigation',
        variant: 'secondary',
        className: 'section-nav-button',
      }),
    ],
  });
  return _jsxs(_Fragment, {
    children: [
      _jsx(Header, {
        leftContent: leftContent,
        centerContent: centerContent,
        rightContent: rightContent,
        fixed: fixed,
        showBorder: showBorder,
        transparentOnTop: transparentOnTop,
        showShadow: showShadow,
        className: `reader-header-container ${className}`,
      }),
      _jsx(SidePanel, {
        isOpen: isBookNavOpen,
        onClose: closeBookNav,
        position: 'left',
        className: 'book-navigation-panel',
        children: bookNavigationContent,
      }),
      _jsx(SidePanel, {
        isOpen: isSectionNavOpen,
        onClose: closeSectionNav,
        position: 'right',
        className: 'section-navigation-panel',
        children: sectionNavigationContent,
      }),
    ],
  });
}
export default ReaderHeader;
//# sourceMappingURL=ReaderHeader.js.map
