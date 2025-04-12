'use client';

import React from 'react';

import { ReaderSettings } from './types';
import './SettingsTab.css';

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
 * A tab for adjusting reader settings.
 */
export function SettingsTab({ settings, onSettingsChange, className = '' }: SettingsTabProps) {
  // Handle font size change
  const handleFontSizeChange = (fontSize: number) => {
    onSettingsChange({ fontSize });
  };

  // Handle line height change
  const handleLineHeightChange = (lineHeight: number) => {
    onSettingsChange({ lineHeight });
  };

  // Handle font family change
  const handleFontFamilyChange = (fontFamily: string) => {
    onSettingsChange({ fontFamily });
  };

  // Handle theme change
  const handleThemeChange = (theme: 'light' | 'dark') => {
    onSettingsChange({ theme });
  };

  // Handle paragraph numbers toggle
  const handleParagraphNumbersToggle = (showParagraphNumbers: boolean) => {
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
      <h3 className="settings-tab-title">Reader Settings</h3>

      {/* Font Size */}
      <div className="settings-section">
        <h4 className="settings-section-title">Font Size</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${settings.fontSize === 14 ? 'active' : ''}`}
            onClick={() => handleFontSizeChange(14)}
          >
            Small
          </button>
          <button
            className={`settings-option-button ${settings.fontSize === 16 ? 'active' : ''}`}
            onClick={() => handleFontSizeChange(16)}
          >
            Medium
          </button>
          <button
            className={`settings-option-button ${settings.fontSize === 18 ? 'active' : ''}`}
            onClick={() => handleFontSizeChange(18)}
          >
            Large
          </button>
          <button
            className={`settings-option-button ${settings.fontSize === 20 ? 'active' : ''}`}
            onClick={() => handleFontSizeChange(20)}
          >
            X-Large
          </button>
        </div>
      </div>

      {/* Line Height */}
      <div className="settings-section">
        <h4 className="settings-section-title">Line Spacing</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${settings.lineHeight === 1.4 ? 'active' : ''}`}
            onClick={() => handleLineHeightChange(1.4)}
          >
            Compact
          </button>
          <button
            className={`settings-option-button ${settings.lineHeight === 1.6 ? 'active' : ''}`}
            onClick={() => handleLineHeightChange(1.6)}
          >
            Normal
          </button>
          <button
            className={`settings-option-button ${settings.lineHeight === 1.8 ? 'active' : ''}`}
            onClick={() => handleLineHeightChange(1.8)}
          >
            Relaxed
          </button>
        </div>
      </div>

      {/* Font Family */}
      <div className="settings-section">
        <h4 className="settings-section-title">Font Style</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${
              settings.fontFamily === 'Arial, sans-serif' ? 'active' : ''
            }`}
            onClick={() => handleFontFamilyChange('Arial, sans-serif')}
          >
            Sans-serif
          </button>
          <button
            className={`settings-option-button ${
              settings.fontFamily === 'Georgia, serif' ? 'active' : ''
            }`}
            onClick={() => handleFontFamilyChange('Georgia, serif')}
          >
            Serif
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="settings-section">
        <h4 className="settings-section-title">Theme</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${settings.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </button>
          <button
            className={`settings-option-button ${settings.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Format Type */}
      <div className="settings-section">
        <h4 className="settings-section-title">Content Formatting</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${
              settings.formatType === 'traditional' ? 'active' : ''
            }`}
            onClick={() => handleFormatTypeChange('traditional')}
          >
            Traditional
          </button>
          <button
            className={`settings-option-button ${settings.formatType === 'modern' ? 'active' : ''}`}
            onClick={() => handleFormatTypeChange('modern')}
          >
            Modern
          </button>
        </div>
      </div>

      {/* Paragraph Numbers */}
      <div className="settings-section">
        <h4 className="settings-section-title">Paragraph Numbers</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${settings.showParagraphNumbers ? 'active' : ''}`}
            onClick={() => handleParagraphNumbersToggle(true)}
          >
            Show
          </button>
          <button
            className={`settings-option-button ${!settings.showParagraphNumbers ? 'active' : ''}`}
            onClick={() => handleParagraphNumbersToggle(false)}
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsTab;
