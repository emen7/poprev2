import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ReaderHeader, ContentContainer, MultiPurposePanel, Footer } from './';
import './UBReaderLayout.css';
/**
 * UBReaderLayout Component
 *
 * A specialized layout for the UB Reader with book and section navigation,
 * content container with optimized width, and multi-purpose bottom panel.
 */
export function UBReaderLayout({
  title,
  children,
  bookNavigationContent,
  sectionNavigationContent,
  headerRightContent,
  showFooter = true,
  footerContent,
  contentWidth = 'medium',
  showBottomPanel = false,
  bottomPanelTabs = [],
  bottomPanelInitialHeight = 300,
  className = '',
}) {
  // State for the bottom panel
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(showBottomPanel);
  // Update bottom panel state when prop changes
  useEffect(() => {
    setIsBottomPanelOpen(showBottomPanel);
  }, [showBottomPanel]);
  // Classes for the layout
  const layoutClasses = ['ub-reader-layout', className].filter(Boolean).join(' ');
  return _jsxs('div', {
    className: layoutClasses,
    children: [
      _jsx(ReaderHeader, {
        title: title,
        bookNavigationContent: bookNavigationContent,
        sectionNavigationContent: sectionNavigationContent,
        rightContent: headerRightContent,
      }),
      _jsx('main', {
        className: 'ub-reader-content',
        children: _jsx(ContentContainer, { width: contentWidth, children: children }),
      }),
      showFooter && footerContent && _jsx(Footer, { centerContent: footerContent }),
      _jsx(MultiPurposePanel, {
        isOpen: isBottomPanelOpen,
        onClose: () => setIsBottomPanelOpen(false),
        initialHeight: bottomPanelInitialHeight,
        tabs: bottomPanelTabs,
        children: _jsx('div', {}),
      }),
      !isBottomPanelOpen &&
        bottomPanelTabs.length > 0 &&
        _jsx('button', {
          className: 'bottom-panel-toggle',
          onClick: () => setIsBottomPanelOpen(true),
          'aria-label': 'Open panel',
          children: _jsx('span', { className: 'toggle-icon', children: '\u25B2' }),
        }),
    ],
  });
}
export default UBReaderLayout;
//# sourceMappingURL=UBReaderLayout.js.map
