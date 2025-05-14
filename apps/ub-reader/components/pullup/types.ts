/**
 * Pullup Types
 *
 * This file defines the types for the pullup components.
 */

export type PullupTab = 'notes' | 'quotes' | 'settings' | 'search';

export interface PullupState {
  /**
   * Whether the pullup panel is open
   */
  isOpen: boolean;

  /**
   * The currently active tab
   */
  activeTab: PullupTab;

  /**
   * The current height of the pullup panel
   */
  height: number;

  /**
   * Whether the pullup panel is in persistent mode (for large screens)
   */
  isPersistent: boolean;
}

export interface Note {
  /**
   * Unique identifier for the note
   */
  id: string;

  /**
   * The content of the note
   */
  content: string;

  /**
   * When the note was created
   */
  createdAt: string;

  /**
   * When the note was last updated
   */
  updatedAt: string;

  /**
   * The ID of the paragraph the note is associated with
   */
  paragraphId: string;

  /**
   * The reference to the paragraph (e.g., "1:1.1")
   */
  reference: string;

  /**
   * The text that was selected when the note was created
   */
  selectedText?: string;
}

export interface Quote {
  /**
   * Unique identifier for the quote
   */
  id: string;

  /**
   * The content of the quote
   */
  content: string;

  /**
   * When the quote was created
   */
  createdAt: string;

  /**
   * The ID of the paragraph the quote is associated with
   */
  paragraphId: string;

  /**
   * The reference to the paragraph (e.g., "1:1.1")
   */
  reference: string;
}

export interface ReaderSettings {
  /**
   * Font size in pixels
   */
  fontSize: number;

  /**
   * Line height as a multiplier
   */
  lineHeight: number;

  /**
   * Font family
   */
  fontFamily: string;

  /**
   * Theme (light, dark, sepia, or system)
   */
  theme: 'light' | 'dark' | 'sepia' | 'system';

  /**
   * Whether to show paragraph numbers
   */
  showParagraphNumbers: boolean;

  /**
   * Format type (traditional or modern)
   */
  formatType: 'traditional' | 'modern';
}
