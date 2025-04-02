# Integration Plan for Navigation and Settings Components

Based on the design patterns observed in the improved-demo.html, this document outlines a plan for integrating the hamburger menu navigation and settings panel into our existing Reader component architecture.

## 1. Component Structure Updates

### ReaderNavigation Component Enhancement

The existing `ReaderNavigation` component should be enhanced to include the hierarchical navigation structure seen in the demo:

```tsx
// Enhanced ReaderNavigation component
export interface ReaderNavigationProps {
  document: Document;
  activeSection?: string;
  onSectionSelect: (sectionId: string) => void;
  config: ReaderConfig;
}

export const ReaderNavigation: React.FC<ReaderNavigationProps> = ({
  document,
  activeSection,
  onSectionSelect,
  config,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePart, setActivePart] = useState<string | null>(null);

  // Toggle navigation panel
  const toggleNavigation = () => {
    setIsOpen(!isOpen);
    // Close settings panel if open
    if (settingsPanel.isOpen) {
      settingsPanel.close();
    }
  };

  // Part toggle functionality
  const togglePart = (partId: string) => {
    if (activePart === partId) {
      setActivePart(null);
    } else {
      setActivePart(partId);
    }
  };

  return (
    <>
      {/* Hamburger button in header */}
      <button
        className="reader-header-button"
        onClick={toggleNavigation}
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Navigation panel */}
      <nav className={`reader-navigation-menu ${isOpen ? "open" : ""}`}>
        {/* Active part container */}
        <div className="reader-nav-fixed-top">{/* Render active part */}</div>

        {/* Scrollable papers container */}
        <div className="reader-nav-scrollable">
          {/* Render papers of active part */}
        </div>

        {/* Inactive parts container */}
        <div className="reader-nav-fixed-bottom">
          {/* Render inactive parts */}
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`reader-overlay ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
};
```

### ReaderSettings Component Creation

Create a new `ReaderSettings` component to handle the settings panel functionality:

```tsx
// New ReaderSettings component
export interface ReaderSettingsProps {
  config: ReaderConfig;
  onConfigChange: (newConfig: Partial<ReaderConfig>) => void;
}

export const ReaderSettings: React.FC<ReaderSettingsProps> = ({
  config,
  onConfigChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle settings panel
  const toggleSettings = () => {
    setIsOpen(!isOpen);
    // Close navigation panel if open
    if (navigationPanel.isOpen) {
      navigationPanel.close();
    }
  };

  // Update a specific setting
  const updateSetting = (category: string, setting: string, value: any) => {
    onConfigChange({
      ...config,
      [category]: {
        ...config[category],
        [setting]: value,
      },
    });
  };

  return (
    <>
      {/* Settings button in header */}
      <button
        className="reader-header-button"
        onClick={toggleSettings}
        aria-label="Toggle settings"
      >
        <i className="fas fa-cog"></i>
      </button>

      {/* Settings panel */}
      <div className={`reader-settings-panel ${isOpen ? "open" : ""}`}>
        {/* Display settings */}
        <div className="reader-settings-section">
          <h3 className="reader-settings-title">Display Settings</h3>

          {/* Theme setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Theme</h4>
            <div className="reader-settings-option-list">
              <button
                className={`reader-settings-option-button ${
                  config.theme === "dark" ? "active" : ""
                }`}
                onClick={() => updateSetting("theme", "mode", "dark")}
              >
                Dark
              </button>
              <button
                className={`reader-settings-option-button ${
                  config.theme === "light" ? "active" : ""
                }`}
                onClick={() => updateSetting("theme", "mode", "light")}
              >
                Light
              </button>
            </div>
          </div>

          {/* Font size setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Font Size</h4>
            <div className="reader-settings-option-list">
              {["small", "medium", "large", "x-large"].map((size) => (
                <button
                  key={size}
                  className={`reader-settings-option-button ${
                    config.typography.fontSize === size ? "active" : ""
                  }`}
                  onClick={() => updateSetting("typography", "fontSize", size)}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Additional settings */}
          {/* ... */}
        </div>

        {/* Extension-specific settings */}
        {config.extensions?.map((extensionId) => {
          const extension = globalExtensionRegistry.getExtension(extensionId);
          if (extension && extension.getSettingsComponent) {
            const ExtensionSettings = extension.getSettingsComponent();
            return (
              <div key={extensionId} className="reader-settings-section">
                <h3 className="reader-settings-title">
                  {extension.name} Settings
                </h3>
                <ExtensionSettings
                  config={config.extensionConfig?.[extensionId] || {}}
                  onConfigChange={(newConfig) => {
                    onConfigChange({
                      ...config,
                      extensionConfig: {
                        ...config.extensionConfig,
                        [extensionId]: newConfig,
                      },
                    });
                  }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};
```

### Reader Component Update

Update the main `Reader` component to integrate these enhanced components:

```tsx
export const Reader: React.FC<ReaderProps> = ({
  document,
  config: userConfig,
}) => {
  // Merge user config with default config
  const config = createConfig(userConfig);

  // State for active section
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // State for reader config (for settings changes)
  const [readerConfig, setReaderConfig] = useState(config);

  // Handle config changes from settings panel
  const handleConfigChange = (newConfig: Partial<ReaderConfig>) => {
    setReaderConfig({ ...readerConfig, ...newConfig });
  };

  // Handle section selection
  const handleSectionSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    // ...
  };

  return (
    <div className="reader-container">
      <ReaderHeader document={document} config={readerConfig}>
        <ReaderNavigation
          document={document}
          activeSection={activeSection}
          onSectionSelect={handleSectionSelect}
          config={readerConfig}
        />
        <ReaderSettings
          config={readerConfig}
          onConfigChange={handleConfigChange}
        />
      </ReaderHeader>

      <div className="reader-main">
        <ReaderContent
          document={document}
          activeSection={activeSection}
          config={readerConfig}
        />
      </div>
    </div>
  );
};
```

## 2. Extension System Enhancements

### Extension Interface Updates

Update the `ReaderExtension` interface to support settings components:

```tsx
export interface ReaderExtension {
  id: string;
  name: string;
  description: string;
  version: string;

  initialize(config: any): void;
  getComponents(): ExtensionComponents;
  getHooks(): ExtensionHooks;
  getUtils(): ExtensionUtils;

  // New method for providing settings UI
  getSettingsComponent?(): React.ComponentType<ExtensionSettingsProps>;
}

export interface ExtensionSettingsProps {
  config: any;
  onConfigChange: (newConfig: any) => void;
}
```

### Scientific Extension Update

Update the Scientific Extension to include settings:

```tsx
export class ScientificExtension implements ReaderExtension {
  // ... existing implementation

  getSettingsComponent() {
    return ScientificExtensionSettings;
  }
}

const ScientificExtensionSettings: React.FC<ExtensionSettingsProps> = ({
  config,
  onConfigChange,
}) => {
  return (
    <div className="scientific-extension-settings">
      {/* Citation style setting */}
      <div className="reader-settings-option">
        <h4 className="reader-settings-option-title">Citation Style</h4>
        <div className="reader-settings-option-list">
          {["APA", "MLA", "Chicago", "Harvard"].map((style) => (
            <button
              key={style}
              className={`reader-settings-option-button ${
                config.citationStyle === style ? "active" : ""
              }`}
              onClick={() =>
                onConfigChange({ ...config, citationStyle: style })
              }
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* MathJax setting */}
      <div className="reader-settings-option">
        <h4 className="reader-settings-option-title">Math Rendering</h4>
        <div className="reader-settings-option-list">
          <button
            className={`reader-settings-option-button ${
              config.enableMathJax ? "active" : ""
            }`}
            onClick={() => onConfigChange({ ...config, enableMathJax: true })}
          >
            Enabled
          </button>
          <button
            className={`reader-settings-option-button ${
              !config.enableMathJax ? "active" : ""
            }`}
            onClick={() => onConfigChange({ ...config, enableMathJax: false })}
          >
            Disabled
          </button>
        </div>
      </div>
    </div>
  );
};
```

## 3. CSS Enhancements

Add the necessary CSS styles to support the new navigation and settings components:

```css
/* Navigation menu styles */
.reader-navigation-menu {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--reader-background-color);
  border-right: 1px solid var(--reader-border-color);
  z-index: 40;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.reader-navigation-menu.open {
  transform: translateX(0);
}

/* Fixed top and bottom containers for part toggles */
.reader-nav-fixed-top,
.reader-nav-fixed-bottom {
  background-color: var(--reader-background-color);
  border-bottom: 1px solid var(--reader-border-color);
}

.reader-nav-fixed-bottom {
  margin-top: auto;
  border-top: 1px solid var(--reader-border-color);
  border-bottom: none;
}

.reader-nav-scrollable {
  overflow-y: auto;
  flex-grow: 1;
}

/* Settings panel styles */
.reader-settings-panel {
  position: fixed;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--reader-background-color);
  border-left: 1px solid var(--reader-border-color);
  z-index: 40;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
}

.reader-settings-panel.open {
  transform: translateX(0);
}

/* Overlay */
.reader-overlay {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  display: none;
}

.reader-overlay.active {
  display: block;
}

/* Additional styles for settings components */
/* ... */
```

## 4. Configuration System Updates

Enhance the `ReaderConfig` interface to support the new settings:

```tsx
export interface ReaderConfig {
  // Existing configuration
  branding: BrandingConfig;
  navigation: NavigationConfig;
  extensions?: string[];
  extensionConfig?: Record<string, any>;

  // New configuration options
  theme: ThemeConfig;
  typography: TypographyConfig;
  layout: LayoutConfig;
}

export interface ThemeConfig {
  mode: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
}

export interface TypographyConfig {
  fontFamily: string;
  fontSize: "small" | "medium" | "large" | "x-large";
  fontStyle: "sans-serif" | "serif";
  lineSpacing: "compact" | "normal" | "relaxed";
}

export interface LayoutConfig {
  textWidth: "narrow" | "medium" | "wide";
  showParagraphNumbers: boolean;
}
```

## 5. Implementation Phases

### Phase 1: Core Structure

1. Update the `ReaderConfig` interface
2. Enhance the `ReaderNavigation` component
3. Create the `ReaderSettings` component
4. Update the main `Reader` component

### Phase 2: Extension System Integration

1. Update the `ReaderExtension` interface
2. Implement settings for the Scientific Extension
3. Create a mechanism for extensions to register settings

### Phase 3: Styling and Refinement

1. Add CSS styles for navigation and settings
2. Implement responsive design adjustments
3. Add animations and transitions

### Phase 4: Testing and Documentation

1. Test on different devices and screen sizes
2. Document the new components and configuration options
3. Create examples demonstrating the new features

## 6. Accessibility Considerations

1. Ensure keyboard navigation works for all components
2. Add proper ARIA attributes for screen readers
3. Maintain focus management when opening/closing panels
4. Provide sufficient color contrast in both light and dark themes

## 7. Performance Optimizations

1. Use virtualization for long lists of papers/sections
2. Implement efficient scroll detection for section tracking
3. Lazy-load content for inactive parts
4. Use React.memo and useCallback to prevent unnecessary re-renders

This integration plan provides a comprehensive approach to incorporating the navigation and settings features from the improved-demo.html into our existing Reader component architecture, while maintaining the extensibility and modularity of our system.
