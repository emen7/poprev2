import { ReactNode } from 'react';
import './ReaderHeader.css';
export interface ReaderHeaderProps {
  /**
   * The title of the current paper/document
   */
  title: string;
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
  rightContent?: ReactNode;
  /**
   * Whether the header is fixed at the top
   * @default true
   */
  fixed?: boolean;
  /**
   * Whether to show a border at the bottom of the header
   * @default true
   */
  showBorder?: boolean;
  /**
   * Whether to make the header transparent when scrolled to top
   * @default false
   */
  transparentOnTop?: boolean;
  /**
   * Whether to show a shadow under the header
   * @default true
   */
  showShadow?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * ReaderHeader Component
 *
 * A specialized header for the UB Reader with book and section navigation.
 * Includes two hamburger buttons and a title, with side panels for navigation.
 */
export declare function ReaderHeader({
  title,
  bookNavigationContent,
  sectionNavigationContent,
  rightContent,
  fixed,
  showBorder,
  transparentOnTop,
  showShadow,
  className,
}: ReaderHeaderProps): import('react/jsx-runtime').JSX.Element;
export default ReaderHeader;
//# sourceMappingURL=ReaderHeader.d.ts.map
