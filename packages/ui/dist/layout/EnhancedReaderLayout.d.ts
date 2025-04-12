import { ReactNode } from 'react';
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
export declare function EnhancedReaderLayout({
  children,
  paperTitle,
  sections,
  currentSectionId,
  onSectionChange,
  showHeader,
  showFooter,
  showSidePanel,
  autoHideNavigation,
  showStickyHeaders,
  sidePanelContent,
  headerContent,
  footerContent,
  className,
}: EnhancedReaderLayoutProps): import('react/jsx-runtime').JSX.Element;
export default EnhancedReaderLayout;
//# sourceMappingURL=EnhancedReaderLayout.d.ts.map
