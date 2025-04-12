import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { ResponsiveHeader } from './responsive/ResponsiveHeader';
import { ResponsiveFooter } from './responsive/ResponsiveFooter';
import { StickyHeadersContainer } from '../navigation/sticky/StickyHeadersContainer';
import './ReaderLayout.css';
import './EnhancedReaderLayout.css';
/**
 * EnhancedReaderLayout Component
 *
 * An enhanced version of the ReaderLayout that includes:
 * - Responsive header with auto-hiding on mobile
 * - Responsive footer with auto-hiding on mobile
 * - Sticky paper title and section headers
 * - All the features of the standard ReaderLayout
 */
export function EnhancedReaderLayout({
  children,
  paperTitle,
  sections,
  currentSectionId,
  onSectionChange,
  showHeader = true,
  showFooter = true,
  showSidePanel = false,
  autoHideNavigation = true,
  showStickyHeaders = true,
  sidePanelContent,
  headerContent,
  footerContent,
  className = '',
}) {
  return _jsxs('div', {
    className: `reader-layout enhanced-reader-layout ${className}`,
    children: [
      showHeader &&
        _jsx(ResponsiveHeader, { autoHide: autoHideNavigation, children: headerContent }),
      _jsxs('div', {
        className: 'reader-layout-body',
        children: [
          showSidePanel &&
            _jsx('aside', { className: 'reader-layout-sidebar', children: sidePanelContent }),
          _jsxs('main', {
            className: 'reader-layout-content',
            children: [
              showStickyHeaders &&
                _jsx(StickyHeadersContainer, {
                  paperTitle: paperTitle,
                  sections: sections,
                  currentSectionId: currentSectionId,
                  onSectionChange: onSectionChange,
                }),
              _jsx('div', { className: 'reader-layout-content-inner', children: children }),
            ],
          }),
        ],
      }),
      showFooter &&
        _jsx(ResponsiveFooter, { autoHide: autoHideNavigation, children: footerContent }),
    ],
  });
}
export default EnhancedReaderLayout;
//# sourceMappingURL=EnhancedReaderLayout.js.map
