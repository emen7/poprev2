import { useNavigation } from '@ub-ecosystem/state-management';
import React, { useCallback, useEffect, useRef } from 'react';

import styles from './SectionTracker.module.css';
import { useIntersectionObserver } from './useIntersectionObserver';

export interface SectionTrackerProps {
  /**
   * The ID of the section
   */
  sectionId: string;

  /**
   * The title of the section
   */
  sectionTitle: string;

  /**
   * The children to render
   */
  children: React.ReactNode;

  /**
   * Whether to show debug information
   * @default false
   */
  debug?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SectionTracker Component
 *
 * A component that tracks when a section is visible in the viewport and
 * updates the navigation state accordingly.
 */
export function SectionTracker({
  sectionId,
  sectionTitle,
  children,
  debug = false,
  className = '',
}: SectionTrackerProps) {
  const { setCurrentSection, updateSectionTitle } = useNavigation();
  const lastUpdateTimeRef = useRef(0);

  // Debounce section updates to prevent rapid changes
  const debouncedUpdateSection = useCallback(
    (entry: IntersectionObserverEntry) => {
      const now = Date.now();
      // Only update if it's been at least 200ms since the last update
      if (now - lastUpdateTimeRef.current > 200) {
        // Only update if the section is more than 50% visible
        if (entry.intersectionRatio > 0.5) {
          setCurrentSection(sectionId);
          updateSectionTitle(sectionTitle);
          lastUpdateTimeRef.current = now;
        }
      }
    },
    [sectionId, sectionTitle, setCurrentSection, updateSectionTitle]
  );

  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>(
    {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -10% 0px', // Add some margin to trigger earlier
    },
    debouncedUpdateSection
  );

  // Set section ID as a data attribute for potential debugging
  const sectionClasses = [
    styles.sectionTracker,
    isIntersecting ? styles.active : '',
    debug ? styles.debug : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={sectionClasses} data-section-id={sectionId} id={sectionId}>
      {children}
    </div>
  );
}

export default SectionTracker;
