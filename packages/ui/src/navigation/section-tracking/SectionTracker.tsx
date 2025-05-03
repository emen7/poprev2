import { useNavigation } from '@ub-ecosystem/state-management';
import React, { useCallback, useEffect, useRef } from 'react';

import styles from './SectionTracker.module.css';
import { useIntersectionObserver } from './useIntersectionObserver';

/**
 * Props for the SectionTracker component
 *
 * @interface SectionTrackerProps
 * @description Props for the section tracker component
 * @property {string} sectionId - The unique identifier for the section
 * @property {string} sectionTitle - The title of the section to display in the navigation
 * @property {React.ReactNode} children - The content of the section
 * @property {boolean} [debug=false] - Whether to show debug information
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
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
 * @description A component that tracks when a section is visible in the viewport and
 * updates the navigation state accordingly. It uses the Intersection Observer API
 * to detect when the section enters and exits the viewport, and updates the
 * navigation state with the current section ID and title.
 *
 * The component includes debouncing to prevent rapid updates when scrolling quickly,
 * and only updates when the section is more than 50% visible.
 *
 * @example
 * ```tsx
 * <SectionTracker
 *   sectionId="introduction"
 *   sectionTitle="Introduction"
 *   className="custom-section"
 * >
 *   <h2>Introduction</h2>
 *   <p>This is the introduction section.</p>
 * </SectionTracker>
 * ```
 */
export function SectionTracker({
  sectionId,
  sectionTitle,
  children,
  debug = false,
  className = '',
}: SectionTrackerProps) {
  const { setCurrentSection, updateSectionTitle } = useNavigation();

  /**
   * Reference to the timestamp of the last section update
   * Used for debouncing to prevent rapid changes when scrolling
   */
  const lastUpdateTimeRef = useRef(0);

  /**
   * Debounced callback to update the current section in the navigation state
   *
   * This function:
   * 1. Checks if enough time has passed since the last update (200ms)
   * 2. Checks if the section is more than 50% visible
   * 3. Updates the current section ID and title in the navigation state
   * 4. Records the timestamp of the update
   *
   * @param {IntersectionObserverEntry} entry - The intersection observer entry
   */
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
