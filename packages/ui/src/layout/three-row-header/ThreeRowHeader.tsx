import { useNavigation } from '@ub-ecosystem/state-management';

import { DualHamburgerNavigation } from '../../navigation/dual-hamburger';

import { DynamicSectionTitle } from './DynamicSectionTitle';
import { HeaderRow } from './HeaderRow';
import styles from './ThreeRowHeader.module.css';

/**
 * Props for the ThreeRowHeader component
 *
 * @interface ThreeRowHeaderProps
 * @description Props for the three-row header component
 * @property {string} paperTitle - The title of the current paper to display in the middle row
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
export interface ThreeRowHeaderProps {
  /**
   * The title of the current paper
   */
  paperTitle: string;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ThreeRowHeader Component
 *
 * @description A header component with three rows that provides a consistent navigation
 * experience across the application:
 * 1. Top row: Main title and navigation buttons
 * 2. Paper row: Current paper title
 * 3. Section row: Dynamic section title that updates based on scroll position
 *
 * The component uses the navigation context to display the current section title
 * and automatically updates when the user scrolls to a different section.
 *
 * @example
 * ```tsx
 * <ThreeRowHeader
 *   paperTitle="Paper 1: The Universal Father"
 *   className="custom-header"
 * />
 * ```
 */
export function ThreeRowHeader({ paperTitle, className = '' }: ThreeRowHeaderProps) {
  const { currentSectionTitle } = useNavigation();

  return (
    <header className={`${styles.threeRowHeader} ${className}`}>
      <HeaderRow
        rowType="top"
        leftContent={<DualHamburgerNavigation />}
        centerContent={<h1 className={styles.mainTitle}>Urantia Book</h1>}
      />

      <HeaderRow
        rowType="paper"
        centerContent={<h2 className={styles.paperTitle}>{paperTitle}</h2>}
      />

      <HeaderRow
        rowType="section"
        centerContent={
          <DynamicSectionTitle title={currentSectionTitle} className={styles.sectionTitle} />
        }
      />
    </header>
  );
}

export default ThreeRowHeader;
