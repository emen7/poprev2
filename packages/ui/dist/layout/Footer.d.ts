import { ReactNode } from 'react';
import './Footer.css';
export interface FooterProps {
  /**
   * Left section content
   */
  leftContent?: ReactNode;
  /**
   * Center section content
   */
  centerContent?: ReactNode;
  /**
   * Right section content
   */
  rightContent?: ReactNode;
  /**
   * Whether the footer is fixed at the bottom
   * @default false
   */
  fixed?: boolean;
  /**
   * Whether to show a border at the top of the footer
   * @default true
   */
  showBorder?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether to show a shadow above the footer
   * @default false
   */
  showShadow?: boolean;
  /**
   * Whether to show copyright information
   * @default true
   */
  showCopyright?: boolean;
  /**
   * Copyright text to display
   * @default '© Current Year'
   */
  copyrightText?: string;
}
/**
 * Footer Component
 *
 * A flexible footer component with three content sections (left, center, right).
 * Supports fixed positioning, border, and copyright options.
 */
export declare function Footer({
  leftContent,
  centerContent,
  rightContent,
  fixed,
  showBorder,
  className,
  showShadow,
  showCopyright,
  copyrightText,
}: FooterProps): import('react/jsx-runtime').JSX.Element;
export default Footer;
//# sourceMappingURL=Footer.d.ts.map
