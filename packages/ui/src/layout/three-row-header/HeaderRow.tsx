import type { ReactNode } from 'react';

import styles from './HeaderRow.module.css';

/**
 * Props for the HeaderRow component
 *
 * @interface HeaderRowProps
 * @description Props for the header row component
 * @property {'top'|'paper'|'section'} rowType - The type of row, which affects styling and behavior
 * @property {React.ReactNode} [leftContent] - Content to display on the left side of the row
 * @property {React.ReactNode} [centerContent] - Content to display in the center of the row
 * @property {React.ReactNode} [rightContent] - Content to display on the right side of the row
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
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
 * @description A flexible row component for the three-row header system.
 * Each row has three content areas (left, center, right) and can be styled
 * differently based on its type (top, paper, section).
 *
 * The component automatically applies appropriate styling based on the rowType
 * and allows for custom content in each section.
 *
 * @example
 * ```tsx
 * <HeaderRow
 *   rowType="paper"
 *   leftContent={<BackButton />}
 *   centerContent={<h2>Paper Title</h2>}
 *   rightContent={<SettingsButton />}
 *   className="custom-row"
 * />
 * ```
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
