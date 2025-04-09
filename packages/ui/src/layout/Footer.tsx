import React, { ReactNode } from 'react';
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
export function Footer({
  leftContent,
  centerContent,
  rightContent,
  fixed = false,
  showBorder = true,
  className = '',
  showShadow = false,
  showCopyright = true,
  copyrightText = `© ${new Date().getFullYear()}`,
}: FooterProps) {
  const footerClasses = [
    'reader-footer',
    fixed ? 'reader-footer-fixed' : '',
    showBorder ? 'reader-footer-bordered' : '',
    showShadow ? 'reader-footer-shadow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={footerClasses}>
      <div className="reader-footer-container">
        <div className="reader-footer-left">{leftContent}</div>

        <div className="reader-footer-center">
          {centerContent}
          {showCopyright && !centerContent && (
            <div className="reader-footer-copyright">{copyrightText}</div>
          )}
        </div>

        <div className="reader-footer-right">
          {rightContent}
          {showCopyright && !centerContent && !rightContent && (
            <div className="reader-footer-copyright">{copyrightText}</div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
