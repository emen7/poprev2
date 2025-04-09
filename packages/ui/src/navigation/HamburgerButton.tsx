import React from 'react';
import './HamburgerButton.css';

export interface HamburgerButtonProps {
  /**
   * Function called when the button is clicked
   */
  onClick: () => void;

  /**
   * Whether the menu is currently open
   * @default false
   */
  isOpen?: boolean;

  /**
   * Accessible label for the button
   * @default 'Toggle menu'
   */
  ariaLabel?: string;

  /**
   * Color variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Size of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * HamburgerButton Component
 *
 * A button that displays a hamburger icon for toggling navigation menus.
 * Supports different sizes, variants, and open/closed states.
 */
export function HamburgerButton({
  onClick,
  isOpen = false,
  ariaLabel = 'Toggle menu',
  variant = 'primary',
  size = 'medium',
  className = '',
}: HamburgerButtonProps) {
  const buttonClasses = [
    'hamburger-button',
    `hamburger-button-${variant}`,
    `hamburger-button-${size}`,
    isOpen ? 'hamburger-button-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      type="button"
    >
      <span className="hamburger-line hamburger-line-1"></span>
      <span className="hamburger-line hamburger-line-2"></span>
      <span className="hamburger-line hamburger-line-3"></span>
    </button>
  );
}

export default HamburgerButton;
