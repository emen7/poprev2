/**
 * Reader types for the UB Ecosystem
 */

import React from 'react';
import { Document, UBDocument, ContentType } from './document';
import { NavigationService, NavigationPosition } from './navigation';
import { SelectionService } from './selection';
import { ExtensionRegistry } from './extension';

/**
 * Theme type enum
 */
export enum ThemeType {
  /**
   * Light theme
   */
  LIGHT = 'light',

  /**
   * Dark theme
   */
  DARK = 'dark',

  /**
   * Sepia theme
   */
  SEPIA = 'sepia',

  /**
   * Traditional theme
   */
  TRADITIONAL = 'traditional',

  /**
   * Scientific theme
   */
  SCIENTIFIC = 'scientific',

  /**
   * Custom theme
   */
  CUSTOM = 'custom',
}

/**
 * Font size preset enum
 */
export enum FontSizePreset {
  /**
   * Extra small font size
   */
  XS = 'xs',

  /**
   * Small font size
   */
  SMALL = 'small',

  /**
   * Medium font size
   */
  MEDIUM = 'medium',

  /**
   * Large font size
   */
  LARGE = 'large',

  /**
   * Extra large font size
   */
  XL = 'xl',

  /**
   * Custom font size
   */
  CUSTOM = 'custom',
}

/**
 * Reader context interface
 */
export interface ReaderContext {
  /**
   * Current document
   */
  document: Document | null;

  /**
   * Navigation service
   */
  navigation: NavigationService;

  /**
   * Selection service
   */
  selection: SelectionService;

  /**
   * Reader settings
   */
  settings: ReaderSettings;

  /**
   * Extension registry
   */
  extensions: ExtensionRegistry;

  /**
   * Update reader settings
   */
  updateSettings: (settings: Partial<ReaderSettings>) => void;

  /**
   * Load a document
   */
  loadDocument: (document: Document) => Promise<void>;

  /**
   * Get document by ID
   */
  getDocumentById: (id: string) => Promise<Document | null>;

  /**
   * Navigate to position
   */
  navigateTo: (position: NavigationPosition) => void;

  /**
   * Get current theme
   */
  getTheme: () => ThemeSettings;
}

/**
 * Theme settings interface
 */
export interface ThemeSettings {
  /**
   * Theme type
   */
  type: ThemeType;

  /**
   * Primary color
   */
  primaryColor: string;

  /**
   * Secondary color
   */
  secondaryColor: string;

  /**
   * Background color
   */
  backgroundColor: string;

  /**
   * Text color
   */
  textColor: string;

  /**
   * Link color
   */
  linkColor: string;

  /**
   * Accent color
   */
  accentColor: string;

  /**
   * Custom CSS variables
   */
  customVariables?: Record<string, string>;
}

/**
 * Reader settings interface
 */
export interface ReaderSettings {
  /**
   * Font size in pixels
   */
  fontSize: number;

  /**
   * Font size preset
   */
  fontSizePreset: FontSizePreset;

  /**
   * Line height
   */
  lineHeight: number;

  /**
   * Font family
   */
  fontFamily: string;

  /**
   * Show paragraph numbers
   */
  showParagraphNumbers: boolean;

  /**
   * Show section titles
   */
  showSectionTitles: boolean;

  /**
   * Theme type
   */
  theme: ThemeType;

  /**
   * Theme settings
   */
  themeSettings: ThemeSettings;

  /**
   * Enable text selection
   */
  enableTextSelection: boolean;

  /**
   * Enable highlighting
   */
  enableHighlighting: boolean;

  /**
   * Enable annotations
   */
  enableAnnotations: boolean;

  /**
   * Enable bookmarks
   */
  enableBookmarks: boolean;

  /**
   * Enable search
   */
  enableSearch: boolean;

  /**
   * Enable text-to-speech
   */
  enableTextToSpeech: boolean;

  /**
   * Enable offline mode
   */
  enableOfflineMode: boolean;

  /**
   * Content display mode
   */
  contentDisplayMode: 'paginated' | 'continuous' | 'scrolling';

  /**
   * Margin size
   */
  marginSize: 'small' | 'medium' | 'large' | 'custom';

  /**
   * Custom margin size in pixels
   */
  customMarginSize?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  /**
   * Additional settings
   * Using Record instead of index signature for better type safety
   */
  additionalSettings?: Record<string, unknown>;
}

/**
 * UB-specific reader settings
 */
export interface UBReaderSettings extends ReaderSettings {
  /**
   * Show paper numbers
   */
  showPaperNumbers: boolean;

  /**
   * Show part titles
   */
  showPartTitles: boolean;

  /**
   * Enable reference tooltips
   */
  enableReferenceTooltips: boolean;

  /**
   * Enable cross-references
   */
  enableCrossReferences: boolean;

  /**
   * Enable scientific content
   */
  enableScientificContent: boolean;
}

/**
 * Reader provider props interface
 */
export interface ReaderProviderProps {
  /**
   * Initial document
   */
  document?: Document;

  /**
   * Initial settings
   */
  initialSettings?: Partial<ReaderSettings>;

  /**
   * Extensions to load
   */
  extensions?: string[];

  /**
   * Content type
   */
  contentType?: ContentType;

  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * Default theme settings
 */
export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  type: ThemeType.LIGHT,
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  backgroundColor: '#ffffff',
  textColor: '#212529',
  linkColor: '#007bff',
  accentColor: '#28a745',
};

/**
 * Default reader settings
 */
export const DEFAULT_READER_SETTINGS: ReaderSettings = {
  fontSize: 16,
  fontSizePreset: FontSizePreset.MEDIUM,
  lineHeight: 1.5,
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  showParagraphNumbers: true,
  showSectionTitles: true,
  theme: ThemeType.LIGHT,
  themeSettings: DEFAULT_THEME_SETTINGS,
  enableTextSelection: true,
  enableHighlighting: true,
  enableAnnotations: true,
  enableBookmarks: true,
  enableSearch: true,
  enableTextToSpeech: false,
  enableOfflineMode: false,
  contentDisplayMode: 'continuous',
  marginSize: 'medium',
};

/**
 * Default UB reader settings
 */
export const DEFAULT_UB_READER_SETTINGS: UBReaderSettings = {
  ...DEFAULT_READER_SETTINGS,
  showPaperNumbers: true,
  showPartTitles: true,
  enableReferenceTooltips: true,
  enableCrossReferences: true,
  enableScientificContent: true,
};
