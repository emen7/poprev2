/**
 * Enhanced Reader Configuration Types
 *
 * This file contains type definitions for the Enhanced Reader configuration system.
 */

/**
 * Typography Configuration
 */
export interface TypographyConfig {
  /**
   * Font size
   */
  fontSize: 'small' | 'medium' | 'large' | 'x-large';

  /**
   * Font family
   */
  fontFamily: 'serif' | 'sans-serif' | 'monospace';

  /**
   * Line spacing
   */
  lineSpacing: 'compact' | 'normal' | 'relaxed';
}

/**
 * Default typography configuration
 */
export const DEFAULT_TYPOGRAPHY_CONFIG: TypographyConfig = {
  fontSize: 'medium',
  fontFamily: 'serif',
  lineSpacing: 'normal',
};

/**
 * Layout Configuration
 */
export interface LayoutConfig {
  /**
   * Text width
   */
  textWidth: 'narrow' | 'medium' | 'wide' | 'full';

  /**
   * Whether to show paragraph numbers
   */
  showParagraphNumbers: boolean;

  /**
   * Whether to make the header sticky
   */
  stickyHeader: boolean;
}

/**
 * Default layout configuration
 */
export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  textWidth: 'medium',
  showParagraphNumbers: false,
  stickyHeader: true,
};

/**
 * Enhanced Reader Configuration
 */
export interface EnhancedReaderConfig {
  /**
   * Theme
   */
  theme: 'light' | 'dark' | 'system';

  /**
   * Typography configuration
   */
  typography: TypographyConfig;

  /**
   * Layout configuration
   */
  layout: LayoutConfig;
}

/**
 * Default Enhanced Reader configuration
 */
export const DEFAULT_CONFIG: EnhancedReaderConfig = {
  theme: 'light',
  typography: DEFAULT_TYPOGRAPHY_CONFIG,
  layout: DEFAULT_LAYOUT_CONFIG,
};
