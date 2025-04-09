import React, { ReactNode } from 'react';
import './Header.css';

export interface HeaderProps {
  /**
   * Left section content (typically navigation controls)
   */
  leftContent?: ReactNode;

  /**
   * Center section content (typically title)
   */
  centerContent?: ReactNode;

  /**
   * Right section content (typically actions/settings)
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
   * Additional CSS class name
   */
  className?: string;

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
}

/**
 * Header Component
 *
 * A flexible header component with three content sections (left, center, right).
 * Supports fixed positioning, border, and transparency options.
 */
export function Header({
  leftContent,
  centerContent,
  rightContent,
  fixed = true,
  showBorder = true,
  className = '',
  transparentOnTop = false,
  showShadow = true,
}: HeaderProps) {
  const headerClasses = [
    'reader-header',
    fixed ? 'reader-header-fixed' : '',
    showBorder ? 'reader-header-bordered' : '',
    transparentOnTop ? 'reader-header-transparent-on-top' : '',
    showShadow ? 'reader-header-shadow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClasses}>
      <div className="reader-header-container">
        {leftContent && <div className="reader-header-left">{leftContent}</div>}

        {centerContent && <div className="reader-header-center">{centerContent}</div>}

        {rightContent && <div className="reader-header-right">{rightContent}</div>}
      </div>
    </header>
  );
}

export default Header;
