import React from 'react';

import styles from './HamburgerButton.module.css';

/**
 * Props for the HamburgerButton component
 *
 * @interface HamburgerButtonProps
 * @description Props for the hamburger button component
 * @property {'book'|'section'} variant - Whether the button is for book navigation (large) or section navigation (small)
 * @property {boolean} isOpen - Whether the navigation panel is open
 * @property {() => void} onClick - Function to call when the button is clicked
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
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
 * @description A button that toggles between hamburger and X icons for navigation menus.
 * The button has two variants: 'book' (larger) and 'section' (smaller).
 * It transforms from a hamburger icon to an X icon when the navigation panel is open.
 *
 * @example
 * ```tsx
 * <HamburgerButton
 *   variant="book"
 *   isOpen={isNavOpen}
 *   onClick={toggleNav}
 *   className="custom-button"
 * />
 * ```
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
