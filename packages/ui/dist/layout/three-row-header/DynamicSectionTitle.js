import { jsx as _jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import styles from './DynamicSectionTitle.module.css';
/**
 * DynamicSectionTitle Component
 *
 * A component that displays the current section title with a fade-in animation
 * when the title changes.
 */
export function DynamicSectionTitle({ title, className = '' }) {
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
  return _jsx('h3', { className: titleClasses, children: displayTitle || 'Select a section' });
}
export default DynamicSectionTitle;
//# sourceMappingURL=DynamicSectionTitle.js.map
