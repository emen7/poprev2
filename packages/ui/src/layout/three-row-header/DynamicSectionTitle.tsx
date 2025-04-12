import React, { useState, useEffect } from 'react';

import styles from './DynamicSectionTitle.module.css';

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
 * A component that displays the current section title with a fade-in animation
 * when the title changes.
 */
export function DynamicSectionTitle({ title, className = '' }: DynamicSectionTitleProps) {
  const [displayTitle, setDisplayTitle] = useState(title);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Only animate if the title changes and is not empty
    if (title !== displayTitle && title) {
      setShouldAnimate(true);
      setDisplayTitle(title);

      // Reset animation after it completes
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 300); // Match the animation duration

      return () => clearTimeout(timer);
    } else if (title !== displayTitle) {
      // If title is empty, just update without animation
      setDisplayTitle(title);
    }
  }, [title, displayTitle]);

  const titleClasses = [styles.dynamicSectionTitle, shouldAnimate ? styles.fadeIn : '', className]
    .filter(Boolean)
    .join(' ');

  return <h3 className={titleClasses}>{displayTitle || 'Select a section'}</h3>;
}

export default DynamicSectionTitle;
