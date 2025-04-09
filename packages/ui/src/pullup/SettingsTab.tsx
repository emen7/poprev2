import React from 'react';
import './SettingsTab.css';

export interface ReaderSettings {
  /**
   * The font size for the reader
   */
  fontSize: number;

  /**
   * The line height for the reader
   */
  lineHeight: number;

  /**
   * The font family for the reader
   */
  fontFamily: string;

  /**
   * The theme for the reader
   */
  theme: 'light' | 'dark' | 'sepia';

  /**
   * Whether to show paragraph numbers
   */
  showParagraphNumbers: boolean;

  /**
   * The formatting type for paragraphs
   */
  formatType: 'traditional' | 'modern';
}

export interface SettingsTabProps {
  /**
   * The current reader settings
   */
  settings: ReaderSettings;

  /**
   * Function called when settings are changed
   */
  onSettingsChange: (settings: Partial<ReaderSettings>) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SettingsTab Component
 *
 * A tab for configuring reader settings in the pullup panel.
 */
export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onSettingsChange,
  className = '',
}) => {
  // Handle font size change
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize = parseInt(e.target.value, 10);
    onSettingsChange({ fontSize });
  };

  // Handle line height change
  const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lineHeight = parseFloat(e.target.value);
    onSettingsChange({ lineHeight });
  };

  // Handle font family change
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = e.target.value;
    onSettingsChange({ fontFamily });
  };

  // Handle theme change
  const handleThemeChange = (theme: 'light' | 'dark' | 'sepia') => {
    onSettingsChange({ theme });
  };

  // Handle paragraph numbers toggle
  const handleParagraphNumbersToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const showParagraphNumbers = e.target.checked;
    onSettingsChange({ showParagraphNumbers });
  };

  // Handle format type change
  const handleFormatTypeChange = (formatType: 'traditional' | 'modern') => {
    onSettingsChange({ formatType });
  };

  // Determine container classes
  const containerClasses = ['settings-tab', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <h2 className="settings-tab-title">Reader Settings</h2>

      <div className="settings-section">
        <h3 className="settings-section-title">Text</h3>

        {/* Font size */}
        <div className="settings-control">
          <label htmlFor="font-size" className="settings-label">
            Font Size
          </label>
          <div className="settings-input-group">
            <input
              id="font-size"
              type="range"
              min="12"
              max="24"
              step="1"
              value={settings.fontSize}
              onChange={handleFontSizeChange}
              className="settings-range"
            />
            <span className="settings-value">{settings.fontSize}px</span>
          </div>
        </div>

        {/* Line height */}
        <div className="settings-control">
          <label htmlFor="line-height" className="settings-label">
            Line Height
          </label>
          <div className="settings-input-group">
            <input
              id="line-height"
              type="range"
              min="1.2"
              max="2.0"
              step="0.1"
              value={settings.lineHeight}
              onChange={handleLineHeightChange}
              className="settings-range"
            />
            <span className="settings-value">{settings.lineHeight}</span>
          </div>
        </div>

        {/* Font family */}
        <div className="settings-control">
          <label htmlFor="font-family" className="settings-label">
            Font Family
          </label>
          <select
            id="font-family"
            value={settings.fontFamily}
            onChange={handleFontFamilyChange}
            className="settings-select"
          >
            <option value="Georgia, serif">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Helvetica Neue', sans-serif">Helvetica</option>
            <option value="'Segoe UI', sans-serif">Segoe UI</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Appearance</h3>

        {/* Theme */}
        <div className="settings-control">
          <span className="settings-label">Theme</span>
          <div className="settings-theme-options">
            <button
              className={`settings-theme-option ${
                settings.theme === 'light' ? 'settings-theme-option-active' : ''
              }`}
              onClick={() => handleThemeChange('light')}
            >
              <div className="settings-theme-preview settings-theme-light"></div>
              <span>Light</span>
            </button>
            <button
              className={`settings-theme-option ${
                settings.theme === 'dark' ? 'settings-theme-option-active' : ''
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              <div className="settings-theme-preview settings-theme-dark"></div>
              <span>Dark</span>
            </button>
            <button
              className={`settings-theme-option ${
                settings.theme === 'sepia' ? 'settings-theme-option-active' : ''
              }`}
              onClick={() => handleThemeChange('sepia')}
            >
              <div className="settings-theme-preview settings-theme-sepia"></div>
              <span>Sepia</span>
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Formatting</h3>

        {/* Paragraph numbers */}
        <div className="settings-control">
          <label htmlFor="paragraph-numbers" className="settings-label">
            Show Paragraph Numbers
          </label>
          <div className="settings-switch">
            <input
              id="paragraph-numbers"
              type="checkbox"
              checked={settings.showParagraphNumbers}
              onChange={handleParagraphNumbersToggle}
              className="settings-checkbox"
            />
            <span className="settings-switch-slider"></span>
          </div>
        </div>

        {/* Format type */}
        <div className="settings-control">
          <span className="settings-label">Format Type</span>
          <div className="settings-format-options">
            <button
              className={`settings-format-option ${
                settings.formatType === 'traditional' ? 'settings-format-option-active' : ''
              }`}
              onClick={() => handleFormatTypeChange('traditional')}
            >
              Traditional
            </button>
            <button
              className={`settings-format-option ${
                settings.formatType === 'modern' ? 'settings-format-option-active' : ''
              }`}
              onClick={() => handleFormatTypeChange('modern')}
            >
              Modern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
