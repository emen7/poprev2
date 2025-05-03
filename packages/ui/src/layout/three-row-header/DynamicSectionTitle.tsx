import { useState, useEffect } from 'react';

import styles from './DynamicSectionTitle.module.css';

/**
 * Props for the DynamicSectionTitle component
 *
 * @interface DynamicSectionTitleProps
 * @description Props for the dynamic section title component
 * @property {string} title - The section title to display
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
export interface DynamicSectionTitleProps {
  /**
   * The title to display
   */
  title: string;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DynamicSectionTitle Component
 *
 * @description A component that displays the current section title with a fade-in animation
 * when the title changes. The component manages its own state to track when the title
 * changes and applies a CSS animation to create a smooth transition effect.
 *
 * If the title is empty, it displays a default message "Select a section".
 *
 * @example
 * ```tsx
 * <DynamicSectionTitle
 *   title="Introduction"
 *   className="custom-title"
 * />
 * ```
 */
export function DynamicSectionTitle({ title, className = '' }: DynamicSectionTitleProps) {
  const [displayTitle, setDisplayTitle] = useState(title);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  /**
   * Effect to handle title changes and animations
   *
   * This effect:
   * 1. Detects when the title prop changes
   * 2. Applies animation if the new title is not empty
   * 3. Updates the displayed title
   * 4. Cleans up the animation timer when unmounting
   */
  useEffect(() => {
    // Only animate if the title changes and is not empty
    if (title !== displayTitle && title) {
      // Start the animation
      setShouldAnimate(true);

      // Update the displayed title
      setDisplayTitle(title);

      // Reset animation after it completes
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 300); // Match the animation duration in CSS

      // Clean up the timer when the component unmounts or the effect runs again
      return () => clearTimeout(timer);
    } else if (title !== displayTitle) {
      // If title is empty, just update without animation
      setDisplayTitle(title);
    }

    // Return empty cleanup function for all other cases
    return () => {};
  }, [title, displayTitle]);

  /**
   * Combine CSS classes for the title element
   * - Base class for styling
   * - Animation class when title changes
   * - Custom class from props
   */
  const titleClasses = [styles.dynamicSectionTitle, shouldAnimate ? styles.fadeIn : '', className]
    .filter(Boolean) // Remove empty strings
    .join(' ');

  return <h3 className={titleClasses}>{displayTitle || 'Select a section'}</h3>;
}

export default DynamicSectionTitle;
