import React from 'react';

import styles from './HamburgerButton.module.css';

export interface HamburgerButtonProps {
  /**
   * Whether the button is for book navigation (large) or section navigation (small)
   */
  variant: 'book' | 'section';

  /**
   * Whether the navigation panel is open
   */
  isOpen: boolean;

  /**
   * Function to call when the button is clicked
   */
  onClick: () => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * HamburgerButton Component
 *
 * A button that toggles between hamburger and X icons for navigation menus.
 */
export function HamburgerButton({
  variant,
  isOpen,
  onClick,
  className = '',
}: HamburgerButtonProps) {
  const buttonClasses = [
    styles.hamburgerButton,
    styles[variant],
    isOpen ? styles.open : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      aria-label={`Toggle ${variant} navigation`}
      aria-expanded={isOpen}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );
}

export default HamburgerButton;
