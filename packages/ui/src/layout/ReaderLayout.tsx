import React, { ReactNode, useState } from 'react';

import './ReaderLayout.css';
import ContentContainer from './ContentContainer';
import MultiPurposePanel from './MultiPurposePanel';

export interface ReaderLayoutProps {
  /**
   * The main content to be rendered in the layout
   */
  children: ReactNode;

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
   * Content to be rendered in the bottom panel
   */
  bottomPanelContent?: ReactNode;

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
}

/**
 * ReaderLayout Component
 *
 * A flexible layout component for reader applications that includes:
 * - Header (optional)
 * - Footer (optional)
 * - Side panel (optional)
 * - Main content area
 */
export function ReaderLayout({
  children,
  showHeader = true,
  showFooter = true,
  showSidePanel = false,
  sidePanelContent,
  headerContent,
  footerContent,
  className = '',
  contentWidth = 'medium',
  showBottomPanel = false,
  bottomPanelContent,
  bottomPanelTabs = [],
  bottomPanelInitialHeight = 300,
}: ReaderLayoutProps) {
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(showBottomPanel);
  return (
    <div className={`reader-layout ${className}`}>
      {showHeader && <header className="reader-layout-header">{headerContent}</header>}

      <div className="reader-layout-body">
        {showSidePanel && <aside className="reader-layout-sidebar">{sidePanelContent}</aside>}

        <main className="reader-layout-content">
          <ContentContainer width={contentWidth}>{children}</ContentContainer>
        </main>
      </div>

      {showFooter && <footer className="reader-layout-footer">{footerContent}</footer>}

      {/* Bottom Panel */}
      <MultiPurposePanel
        isOpen={isBottomPanelOpen}
        onClose={() => setIsBottomPanelOpen(false)}
        initialHeight={bottomPanelInitialHeight}
        tabs={bottomPanelTabs}
      >
        {bottomPanelContent}
      </MultiPurposePanel>

      {/* Toggle button for bottom panel */}
      {!isBottomPanelOpen && (
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

export default ReaderLayout;
