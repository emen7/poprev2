import React, { ReactNode } from 'react';

import { StickyHeadersContainer } from '../navigation/sticky/StickyHeadersContainer';

import { ResponsiveFooter } from './responsive/ResponsiveFooter';
import { ResponsiveHeader } from './responsive/ResponsiveHeader';
import './ReaderLayout.css';
import './EnhancedReaderLayout.css';

export interface EnhancedReaderLayoutProps {
  /**
   * The main content to be rendered in the layout
   */
  children: ReactNode;

  /**
   * Paper title to display at the top
   */
  paperTitle: ReactNode;

  /**
   * Array of sections in the document
   */
  sections: Array<{
    id: string;
    title: string;
  }>;

  /**
   * ID of the currently active section
   */
  currentSectionId?: string;

  /**
   * Function called when the active section changes
   */
  onSectionChange?: (sectionId: string) => void;

  /**
   * Whether to show the header
   * @default true
   */
  showHeader?: boolean;

  /**
   * Whether to show the footer
   * @default true
   */
  showFooter?: boolean;

  /**
   * Whether to show the side panel
   * @default false
   */
  showSidePanel?: boolean;

  /**
   * Whether to auto-hide navigation on small screens
   * @default true
   */
  autoHideNavigation?: boolean;

  /**
   * Whether to show sticky headers
   * @default true
   */
  showStickyHeaders?: boolean;

  /**
   * Content to be rendered in the side panel
   */
  sidePanelContent?: ReactNode;

  /**
   * Content to be rendered in the header
   */
  headerContent?: ReactNode;

  /**
   * Content to be rendered in the footer
   */
  footerContent?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

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
}: EnhancedReaderLayoutProps) {
  return (
    <div className={`reader-layout enhanced-reader-layout ${className}`}>
      {showHeader && (
        <ResponsiveHeader autoHide={autoHideNavigation}>{headerContent}</ResponsiveHeader>
      )}

      <div className="reader-layout-body">
        {showSidePanel && <aside className="reader-layout-sidebar">{sidePanelContent}</aside>}

        <main className="reader-layout-content">
          {showStickyHeaders && (
            <StickyHeadersContainer
              paperTitle={paperTitle}
              sections={sections}
              currentSectionId={currentSectionId}
              onSectionChange={onSectionChange}
            />
          )}
          <div className="reader-layout-content-inner">{children}</div>
        </main>
      </div>

      {showFooter && (
        <ResponsiveFooter autoHide={autoHideNavigation}>{footerContent}</ResponsiveFooter>
      )}
    </div>
  );
}

export default EnhancedReaderLayout;
