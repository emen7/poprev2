/**
 * Reader Configuration
 *
 * This file defines the interfaces for configuring the Reader component.
 * It provides options for branding, features, navigation, and extensions.
 */
/**
 * Default configuration
 */
export const DEFAULT_CONFIG = {
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
export function createConfig(config) {
  var _a;
  return {
    branding: Object.assign(Object.assign({}, DEFAULT_CONFIG.branding), config.branding),
    features: Object.assign(Object.assign({}, DEFAULT_CONFIG.features), config.features),
    navigation: Object.assign(Object.assign({}, DEFAULT_CONFIG.navigation), config.navigation),
    theme: Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG.theme), config.theme), {
      colors: Object.assign(
        Object.assign({}, DEFAULT_CONFIG.theme.colors),
        (_a = config.theme) === null || _a === void 0 ? void 0 : _a.colors
      ),
    }),
    typography: Object.assign(Object.assign({}, DEFAULT_CONFIG.typography), config.typography),
    layout: Object.assign(Object.assign({}, DEFAULT_CONFIG.layout), config.layout),
    extensions: config.extensions || DEFAULT_CONFIG.extensions,
    extensionConfig: config.extensionConfig,
  };
}
//# sourceMappingURL=config.js.map
