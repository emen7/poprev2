import React, { ReactNode, useState, useEffect } from 'react';
import { ReaderHeader, ContentContainer, MultiPurposePanel, Footer } from './';
import './UBReaderLayout.css';

export interface UBReaderLayoutProps {
  /**
   * The title of the current paper/document
   */
  title: string;

  /**
   * The main content to be rendered in the layout
   */
  children: ReactNode;

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
  headerRightContent?: ReactNode;

  /**
   * Whether to show the footer
   * @default true
   */
  showFooter?: boolean;

  /**
   * Content to be rendered in the footer
   */
  footerContent?: ReactNode;

  /**
   * Width setting for the content
   * @default 'medium'
   */
  contentWidth?: 'narrow' | 'medium' | 'wide';

  /**
   * Whether to show the bottom panel
   * @default false
   */
  showBottomPanel?: boolean;

  /**
   * Tabs for the bottom panel
   */
  bottomPanelTabs?: {
    id: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
  }[];

  /**
   * Initial height for the bottom panel
   * @default 300
   */
  bottomPanelInitialHeight?: number;

  /**
   * Additional CSS class name
   */
  className?: string;
}

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
}: UBReaderLayoutProps) {
  // State for the bottom panel
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(showBottomPanel);

  // Update bottom panel state when prop changes
  useEffect(() => {
    setIsBottomPanelOpen(showBottomPanel);
  }, [showBottomPanel]);

  // Classes for the layout
  const layoutClasses = ['ub-reader-layout', className].filter(Boolean).join(' ');

  return (
    <div className={layoutClasses}>
      {/* Header with navigation */}
      <ReaderHeader
        title={title}
        bookNavigationContent={bookNavigationContent}
        sectionNavigationContent={sectionNavigationContent}
        rightContent={headerRightContent}
      />

      {/* Main content area */}
      <main className="ub-reader-content">
        <ContentContainer width={contentWidth}>{children}</ContentContainer>
      </main>

      {/* Footer (optional) */}
      {showFooter && footerContent && <Footer centerContent={footerContent} />}

      {/* Bottom panel */}
      <MultiPurposePanel
        isOpen={isBottomPanelOpen}
        onClose={() => setIsBottomPanelOpen(false)}
        initialHeight={bottomPanelInitialHeight}
        tabs={bottomPanelTabs}
        children={<div />} /* Placeholder for required children prop */
      />

      {/* Toggle button for bottom panel */}
      {!isBottomPanelOpen && bottomPanelTabs.length > 0 && (
        <button
          className="bottom-panel-toggle"
          onClick={() => setIsBottomPanelOpen(true)}
          aria-label="Open panel"
        >
          <span className="toggle-icon">▲</span>
        </button>
      )}
    </div>
  );
}

export default UBReaderLayout;
