/**
 * Reader Navigation Component
 *
 * This component displays navigation elements like table of contents,
 * breadcrumbs, and relationship map.
 */
import { Document, ReaderConfig } from '../models';
import './ReaderNavigation.css';
/**
 * Props for the ReaderNavigation component
 */
export interface ReaderNavigationProps {
  /**
   * The document to display
   */
  document: Document;
  /**
   * Reader configuration
   */
  config: ReaderConfig;
  /**
   * Currently active section ID
   */
  activeSection: string | null;
  /**
   * Callback when a section is selected
   */
  onSectionSelect: (sectionId: string) => void;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Callback when the navigation panel is opened
   */
  onNavigationOpen?: () => void;
  /**
   * Callback when the navigation panel is closed
   */
  onNavigationClose?: () => void;
  /**
   * Whether the navigation panel is initially open
   */
  initiallyOpen?: boolean;
  /**
   * Whether to close the navigation panel when a section is selected (mobile)
   */
  closeOnSelect?: boolean;
}
/**
 * The ReaderNavigation component
 */
export declare function ReaderNavigation({
  document,
  config,
  activeSection,
  onSectionSelect,
  className,
  onNavigationOpen,
  onNavigationClose,
  initiallyOpen,
  closeOnSelect,
}: ReaderNavigationProps): import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=ReaderNavigation.d.ts.map
