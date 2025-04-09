import React from 'react';
import { useNavigation } from '@ub-ecosystem/state-management';
import { HeaderRow } from './HeaderRow';
import { DynamicSectionTitle } from './DynamicSectionTitle';
import { DualHamburgerNavigation } from '../../navigation/dual-hamburger';
import styles from './ThreeRowHeader.module.css';

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
 * A header component with three rows:
 * 1. Top row: Main title and navigation buttons
 * 2. Paper row: Current paper title
 * 3. Section row: Dynamic section title that updates based on scroll position
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
