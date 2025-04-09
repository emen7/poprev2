import React, { ReactNode } from 'react';
import styles from './HeaderRow.module.css';

export interface HeaderRowProps {
  /**
   * The row type (top, paper, section)
   */
  rowType: 'top' | 'paper' | 'section';

  /**
   * The content to display on the left side of the row
   */
  leftContent?: ReactNode;

  /**
   * The content to display in the center of the row
   */
  centerContent?: ReactNode;

  /**
   * The content to display on the right side of the row
   */
  rightContent?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * HeaderRow Component
 *
 * A flexible row component for the three-row header system.
 */
export function HeaderRow({
  rowType,
  leftContent,
  centerContent,
  rightContent,
  className = '',
}: HeaderRowProps) {
  const rowClasses = [styles.headerRow, styles[rowType], className].filter(Boolean).join(' ');

  return (
    <div className={rowClasses}>
      <div className={styles.leftContent}>{leftContent}</div>
      <div className={styles.centerContent}>{centerContent}</div>
      <div className={styles.rightContent}>{rightContent}</div>
    </div>
  );
}

export default HeaderRow;
