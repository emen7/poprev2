/**
 * Three-Row Header Types
 *
 * Type definitions for the 3-row header components
 */

export interface Paper {
  id: string;
  number: number;
  title: string;
  sections?: Section[];
}

export interface Section {
  id: string;
  number: number;
  title: string;
}

export interface ThreeRowHeaderProps {
  /**
   * The current paper being displayed
   */
  paper: Paper;

  /**
   * Optional CSS class name for custom styling
   */
  className?: string;

  /**
   * Handler for book hamburger menu toggle
   */
  onBookMenuToggle: () => void;

  /**
   * Handler for section hamburger menu toggle
   */
  onSectionMenuToggle: () => void;

  /**
   * Handler for navigating to previous paper
   */
  onPreviousPaper: () => void;

  /**
   * Handler for navigating to next paper
   */
  onNextPaper: () => void;

  /**
   * Custom element to display in the branding space
   */
  brandingElement?: React.ReactNode;
}

export interface TitleRowProps {
  /**
   * The title to display (e.g., "Urantia Book")
   */
  title: string;

  /**
   * Handler for book hamburger menu toggle
   */
  onBookMenuToggle: () => void;

  /**
   * Handler for section hamburger menu toggle
   */
  onSectionMenuToggle: () => void;

  /**
   * Handler for navigating to previous paper
   */
  onPreviousPaper: () => void;

  /**
   * Handler for navigating to next paper
   */
  onNextPaper: () => void;

  /**
   * Custom element to display in the branding space
   */
  brandingElement?: React.ReactNode;
}

export interface PaperRowProps {
  /**
   * The paper title to display
   */
  paperTitle: string;
}

export interface SectionRowProps {
  /**
   * The current section title to display
   */
  currentSection: string;

  /**
   * Whether intro content is currently visible
   */
  isIntroVisible: boolean;
}
