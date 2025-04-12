import React from 'react';
import './StickyHeadersContainer.css';
export interface Section {
  /**
   * Unique identifier for the section
   */
  id: string;
  /**
   * Display title for the section
   */
  title: string;
}
export interface StickyHeadersContainerProps {
  /**
   * Paper title to display at the top
   */
  paperTitle: React.ReactNode;
  /**
   * Array of sections in the document
   */
  sections: Section[];
  /**
   * ID of the currently active section
   */
  currentSectionId?: string;
  /**
   * Function called when the active section changes
   */
  onSectionChange?: (sectionId: string) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * StickyHeadersContainer Component
 *
 * A component that provides sticky paper title and section headers that update as the user scrolls.
 * - Paper title remains fixed at the top of the viewport
 * - Current section title sticks below the paper title
 * - Section titles update automatically as the user scrolls through the document
 */
export declare function StickyHeadersContainer({
  paperTitle,
  sections,
  currentSectionId,
  onSectionChange,
  className,
}: StickyHeadersContainerProps): import('react/jsx-runtime').JSX.Element;
export default StickyHeadersContainer;
//# sourceMappingURL=StickyHeadersContainer.d.ts.map
