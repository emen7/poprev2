/**
 * User Preferences Model
 *
 * This module defines the user preferences model interfaces for the UB Ecosystem.
 */

/**
 * User preferences model interface
 */
export interface UserPreferencesModel {
  /**
   * Unique identifier for the preferences
   */
  id: string;

  /**
   * User ID these preferences belong to
   */
  userId: string;

  /**
   * Theme preference
   */
  theme: 'light' | 'dark' | 'system';

  /**
   * Content formatting type preference
   */
  formatType: 'traditional' | 'modern';

  /**
   * Font size preference
   */
  fontSize: 'small' | 'medium' | 'large' | 'x-large';

  /**
   * Line spacing preference
   */
  lineSpacing: 'compact' | 'normal' | 'relaxed';

  /**
   * Text width preference
   */
  textWidth: 'narrow' | 'medium' | 'wide';

  /**
   * Font family preference
   */
  fontFamily: 'serif' | 'sans-serif';

  /**
   * Whether to show paragraph numbers
   */
  showParagraphNumbers: boolean;

  /**
   * ID of the last publication accessed
   */
  lastPublication: string;

  /**
   * ID of the last document accessed
   */
  lastDocument: string;

  /**
   * Last reading position
   */
  lastPosition: ReadingPosition;

  /**
   * Publication-specific preferences
   */
  publicationPreferences?: {
    [publicationId: string]: PublicationPreferences;
  };

  /**
   * Date the preferences were last updated
   */
  updatedAt: string;

  /**
   * Device ID these preferences were last updated from
   */
  lastUpdatedDevice?: string;
}

/**
 * Reading position interface
 */
export interface ReadingPosition {
  /**
   * Document ID
   */
  documentId: string;

  /**
   * Section ID
   */
  sectionId: string;

  /**
   * Paragraph ID
   */
  paragraphId?: string;

  /**
   * Scroll position
   */
  scrollPosition: number;
}

/**
 * Publication-specific preferences interface
 */
export interface PublicationPreferences {
  /**
   * Content formatting type preference for this publication
   */
  formatType?: 'traditional' | 'modern';

  /**
   * Font size preference for this publication
   */
  fontSize?: 'small' | 'medium' | 'large' | 'x-large';

  /**
   * Line spacing preference for this publication
   */
  lineSpacing?: 'compact' | 'normal' | 'relaxed';

  /**
   * Text width preference for this publication
   */
  textWidth?: 'narrow' | 'medium' | 'wide';

  /**
   * Whether to show paragraph numbers for this publication
   */
  showParagraphNumbers?: boolean;

  /**
   * Last reading position in this publication
   */
  lastPosition?: ReadingPosition;
}

/**
 * Reading history entry interface
 */
export interface ReadingHistoryEntry {
  /**
   * Unique identifier for the history entry
   */
  id: string;

  /**
   * User ID this history entry belongs to
   */
  userId: string;

  /**
   * Publication ID
   */
  publicationId: string;

  /**
   * Document ID
   */
  documentId: string;

  /**
   * Document title
   */
  documentTitle: string;

  /**
   * Section ID (if applicable)
   */
  sectionId?: string;

  /**
   * Section title (if applicable)
   */
  sectionTitle?: string;

  /**
   * Reading position
   */
  position: ReadingPosition;

  /**
   * Timestamp of when this entry was created
   */
  timestamp: string;
}
