import { jsx as _jsx } from 'react/jsx-runtime';
import { useCallback, useRef } from 'react';
import { useNavigation } from '@ub-ecosystem/state-management';
import { useIntersectionObserver } from './useIntersectionObserver';
import styles from './SectionTracker.module.css';
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
}) {
  const { setCurrentSection, updateSectionTitle } = useNavigation();
  const lastUpdateTimeRef = useRef(0);
  // Debounce section updates to prevent rapid changes
  const debouncedUpdateSection = useCallback(
    entry => {
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
  const [ref, isIntersecting] = useIntersectionObserver(
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
  return _jsx('div', {
    ref: ref,
    className: sectionClasses,
    'data-section-id': sectionId,
    id: sectionId,
    children: children,
  });
}
export default SectionTracker;
//# sourceMappingURL=SectionTracker.js.map
