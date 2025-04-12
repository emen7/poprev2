/**
 * Reader Configuration
 *
 * This file defines the interfaces for configuring the Reader component.
 * It provides options for branding, features, navigation, and extensions.
 */

/**
 * Configuration for the Reader component
 */
export interface ReaderConfig {
  /**
   * Branding configuration
   */
  branding: BrandingConfig;

  /**
   * Feature configuration
   */
  features: FeatureConfig;

  /**
   * Navigation configuration
   */
  navigation: NavigationConfig;

  /**
   * Theme configuration
   */
  theme: ThemeConfig;

  /**
   * Typography configuration
   */
  typography: TypographyConfig;

  /**
   * Layout configuration
   */
  layout: LayoutConfig;

  /**
   * Extensions to enable
   */
  extensions: string[];

  /**
   * Extension-specific configuration
   */
  extensionConfig?: Record<string, any>;
}

/**
 * Branding configuration
 */
export interface BrandingConfig {
  /**
   * Primary color (CSS color value)
   */
  primaryColor: string;

  /**
   * Secondary color (CSS color value)
   */
  secondaryColor: string;

  /**
   * Logo URL
   */
  logo?: string;

  /**
   * Favicon URL
   */
  favicon?: string;

  /**
   * Application name
   */
  appName?: string;

  /**
   * Custom CSS class to apply to the Reader container
   */
  customClass?: string;

  /**
   * Custom CSS styles to apply to the Reader container
   */
  customStyles?: Record<string, string>;
}

/**
 * Feature configuration
 */
export interface FeatureConfig {
  /**
   * Enable split view for comparing documents
   */
  splitView: boolean;

  /**
   * Enable citation view for showing reference context
   */
  citationView: boolean;

  /**
   * Enable hover previews for references
   */
  hoverPreviews: boolean;

  /**
   * Enable reference verification
   */
  referenceVerification: boolean;

  /**
   * Enable advanced search
   */
  advancedSearch: boolean;

  /**
   * Enable annotations
   */
  annotations: boolean;

  /**
   * Enable bookmarks
   */
  bookmarks: boolean;

  /**
   * Enable highlighting
   */
  highlighting: boolean;

  /**
   * Enable sharing
   */
  sharing: boolean;

  /**
   * Enable printing
   */
  printing: boolean;

  /**
   * Enable export
   */
  export: boolean;

  /**
   * Additional feature flags
   */
  [key: string]: boolean;
}

/**
 * Navigation configuration
 */
export interface NavigationConfig {
  /**
   * Show breadcrumbs
   */
  showBreadcrumbs: boolean;

  /**
   * Show table of contents
   */
  showTableOfContents: boolean;

  /**
   * Show relationship map
   */
  showRelationshipMap: boolean;

  /**
   * URL to link back to
   */
  linkbackUrl?: string;

  /**
   * Text for linkback
   */
  linkbackText?: string;

  /**
   * Show navigation controls
   */
  showNavigationControls: boolean;

  /**
   * Show search
   */
  showSearch: boolean;

  /**
   * Show settings
   */
  showSettings: boolean;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /**
   * Theme mode
   */
  mode: 'light' | 'dark';

  /**
   * Custom theme colors
   */
  colors?: {
    /**
     * Background color
     */
    background?: string;

    /**
     * Text color
     */
    text?: string;

    /**
     * Border color
     */
    border?: string;

    /**
     * Panel background color
     */
    panelBackground?: string;
  };
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /**
   * Font family
   */
  fontFamily?: string;

  /**
   * Font size
   */
  fontSize: 'small' | 'medium' | 'large' | 'x-large';

  /**
   * Font style
   */
  fontStyle: 'sans-serif' | 'serif';

  /**
   * Line spacing
   */
  lineSpacing: 'compact' | 'normal' | 'relaxed';
}

/**
 * Layout configuration
 */
export interface LayoutConfig {
  /**
   * Text width
   */
  textWidth: 'narrow' | 'medium' | 'wide';

  /**
   * Show paragraph numbers
   */
  showParagraphNumbers: boolean;

  /**
   * Enable sticky headers
   */
  enableStickyHeaders: boolean;
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: ReaderConfig = {
  branding: {
    primaryColor: '#0070f3',
    secondaryColor: '#6c757d',
    appName: 'UB Reader',
  },
  features: {
    splitView: false,
    citationView: true,
    hoverPreviews: true,
    referenceVerification: true,
    advancedSearch: true,
    annotations: true,
    bookmarks: true,
    highlighting: true,
    sharing: true,
    printing: true,
    export: true,
  },
  navigation: {
    showBreadcrumbs: true,
    showTableOfContents: true,
    showRelationshipMap: false,
    showNavigationControls: true,
    showSearch: true,
    showSettings: true,
  },
  theme: {
    mode: 'light',
    colors: {
      background: '#ffffff',
      text: '#333333',
      border: '#e2e8f0',
      panelBackground: '#f7fafc',
    },
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 'medium',
    fontStyle: 'sans-serif',
    lineSpacing: 'normal',
  },
  layout: {
    textWidth: 'medium',
    showParagraphNumbers: true,
    enableStickyHeaders: true,
  },
  extensions: [],
};

/**
 * Create a configuration by merging with the default configuration
 *
 * @param config Partial configuration to merge with defaults
 * @returns Complete configuration
 */
export function createConfig(config: Partial<ReaderConfig>): ReaderConfig {
  return {
    branding: {
      ...DEFAULT_CONFIG.branding,
      ...config.branding,
    },
    features: {
      ...DEFAULT_CONFIG.features,
      ...config.features,
    },
    navigation: {
      ...DEFAULT_CONFIG.navigation,
      ...config.navigation,
    },
    theme: {
      ...DEFAULT_CONFIG.theme,
      ...config.theme,
      colors: {
        ...DEFAULT_CONFIG.theme.colors,
        ...config.theme?.colors,
      },
    },
    typography: {
      ...DEFAULT_CONFIG.typography,
      ...config.typography,
    },
    layout: {
      ...DEFAULT_CONFIG.layout,
      ...config.layout,
    },
    extensions: config.extensions || DEFAULT_CONFIG.extensions,
    extensionConfig: config.extensionConfig,
  };
}
