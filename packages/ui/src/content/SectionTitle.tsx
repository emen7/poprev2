import React from 'react';
import './SectionTitle.css';

export interface SectionTitleProps {
  /**
   * The section number (e.g., "1", "2.3")
   */
  number?: string;

  /**
   * The section title text
   */
  title: string;

  /**
   * Whether to show the section number
   * @default true
   */
  showNumber?: boolean;

  /**
   * The heading level to use (h1-h6)
   * @default 'h3'
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ID for the section element
   */
  id?: string;

  /**
   * Click handler for the section title
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * SectionTitle Component
 *
 * A component for displaying section titles in the UB Reader.
 * Supports different heading levels and optional section numbers.
 * @param root0
 * @param root0.number
 * @param root0.title
 * @param root0.showNumber
 * @param root0.level
 * @param root0.className
 * @param root0.id
 * @param root0.onClick
 * @returns A section title component
 */
export function SectionTitle({
  number,
  title,
  showNumber = true,
  level = 'h3',
  className = '',
  id,
  onClick,
}: SectionTitleProps) {
  // Determine container classes
  const containerClasses = ['section-title', `section-title-${level}`, className]
    .filter(Boolean)
    .join(' ');

  // Create the heading element based on the level prop
  const HeadingTag = level;

  // Format the title with the number if showNumber is true and number is provided
  const formattedTitle = showNumber && number ? `${number}. ${title}` : title;

  return (
    <HeadingTag className={containerClasses} id={id} onClick={onClick}>
      {formattedTitle}
    </HeadingTag>
  );
}

export default SectionTitle;
