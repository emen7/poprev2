/**
 * Navigation types for the UB Ecosystem
 */

import { Document, Section, Paragraph } from './document';

/**
 * Navigation state interface
 */
export interface NavigationState {
  /**
   * Current document
   */
  document: Document | null;

  /**
   * Current section index
   */
  currentSectionIndex: number;

  /**
   * Current paragraph index
   */
  currentParagraphIndex: number;

  /**
   * Navigation history
   */
  history: NavigationHistoryEntry[];

  /**
   * Current history index
   */
  historyIndex: number;
}

/**
 * Navigation history entry interface
 */
export interface NavigationHistoryEntry {
  /**
   * Document ID
   */
  documentId: string;

  /**
   * Section index
   */
  sectionIndex: number;

  /**
   * Paragraph index
   */
  paragraphIndex: number;

  /**
   * Timestamp
   */
  timestamp: number;
}

/**
 * Navigation position interface
 */
export interface NavigationPosition {
  /**
   * Document ID
   */
  documentId: string;

  /**
   * Section index
   */
  sectionIndex: number;

  /**
   * Paragraph index
   */
  paragraphIndex: number;
}

/**
 * Navigation service interface
 */
export interface NavigationService {
  /**
   * Get current navigation state
   */
  getState(): NavigationState;

  /**
   * Navigate to a specific position
   */
  navigateTo(position: NavigationPosition): void;

  /**
   * Navigate to a specific section
   */
  navigateToSection(sectionIndex: number): void;

  /**
   * Navigate to a specific paragraph
   */
  navigateToParagraph(sectionIndex: number, paragraphIndex: number): void;

  /**
   * Navigate to the next section
   */
  navigateToNextSection(): void;

  /**
   * Navigate to the previous section
   */
  navigateToPreviousSection(): void;

  /**
   * Navigate to the next paragraph
   */
  navigateToNextParagraph(): void;

  /**
   * Navigate to the previous paragraph
   */
  navigateToPreviousParagraph(): void;

  /**
   * Navigate back in history
   */
  navigateBack(): void;

  /**
   * Navigate forward in history
   */
  navigateForward(): void;

  /**
   * Get the current section
   */
  getCurrentSection(): Section | null;

  /**
   * Get the current paragraph
   */
  getCurrentParagraph(): Paragraph | null;
}
