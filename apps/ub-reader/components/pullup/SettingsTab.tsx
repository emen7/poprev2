'use client';

import React from &apos;react';

import { usePullup } from '../../contexts/PullupContext';
import { ThemeSettingsPanel } from '../ThemeSettingsPanel';

import type { ReaderSettings } from './types';
import './SettingsTab.css';

export interface SettingsTabProps {
  /**
   * The current reader settings
   */
  settings: ReaderSettings;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SettingsTab Component
 *
 * A tab for adjusting reader settings.
 * Uses PullupContext for state management.
 *
 * Note: We removed the onSettingsChange prop to fix Next.js serialization errors.
 * The component now uses the context directly for settings updates.
 */
export function SettingsTab({ settings, className = '' }: SettingsTabProps) {
  // Get pullup context
  const { updateSettings } = usePullup();

  // Handle font size change
  const handleFontSizeChange = (fontSize: number) => {
    updateSettings({ fontSize });
  };

  // Handle line height change
  const handleLineHeightChange = (lineHeight: number) => {
    updateSettings({ lineHeight });
  };

  // Handle font family change
  const handleFontFamilyChange = (fontFamily: string) => {
    updateSettings({ fontFamily });
  };

  // Handle theme change
  const handleThemeChange = (theme: &apos;light' | &apos;dark') => {
    updateSettings({ theme });
  };

  // Handle paragraph numbers toggle
  const handleParagraphNumbersToggle = (showParagraphNumbers: boolean) => {
    updateSettings({ showParagraphNumbers });
  };

  // Handle format type change
  const handleFormatTypeChange = (formatType: &apos;traditional' | &apos;modern') => {
    updateSettings({ formatType });
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
            className={`settings-option-button ${settings.fontSize === 14 ? &apos;active' : ''}`}
            onClick={() => handleFontSizeChange(14)}
          >
            Small
          </button>
          <button
            className={`settings-option-button ${settings.fontSize === 16 ? &apos;active' : ''}`}
            onClick={() => handleFontSizeChange(16)}
          >
            Medium
          </button>
          <button
            className={`settings-option-button ${settings.fontSize === 18 ? &apos;active' : ''}`}
            onClick={() => handleFontSizeChange(18)}
          >
            Large
          </button>
          <button
            className={`settings-option-button ${settings.fontSize === 20 ? &apos;active' : ''}`}
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
            className={`settings-option-button ${settings.lineHeight === 1.4 ? &apos;active' : ''}`}
            onClick={() => handleLineHeightChange(1.4)}
          >
            Compact
          </button>
          <button
            className={`settings-option-button ${settings.lineHeight === 1.6 ? &apos;active' : ''}`}
            onClick={() => handleLineHeightChange(1.6)}
          >
            Normal
          </button>
          <button
            className={`settings-option-button ${settings.lineHeight === 1.8 ? &apos;active' : ''}`}
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
              settings.fontFamily === &apos;Arial, sans-serif' ? &apos;active' : ''
            }`}
            onClick={() => handleFontFamilyChange('Arial, sans-serif')}
          >
            Sans-serif
          </button>
          <button
            className={`settings-option-button ${
              settings.fontFamily === &apos;Georgia, serif' ? &apos;active' : ''
            }`}
            onClick={() => handleFontFamilyChange('Georgia, serif')}
          >
            Serif
          </button>
        </div>
      </div>

      {/* Theme - Using the shared ThemeSettingsPanel component */}
      <div className="settings-section">
        <h4 className="settings-section-title">Theme</h4>
        <ThemeSettingsPanel inline={true} isOpen={true} onClose={() => {}} />
      </div>

      {/* Format Type */}
      <div className="settings-section">
        <h4 className="settings-section-title">Content Formatting</h4>
        <div className="settings-options">
          <button
            className={`settings-option-button ${
              settings.formatType === &apos;traditional' ? &apos;active' : ''
            }`}
            onClick={() => handleFormatTypeChange('traditional')}
          >
            Traditional
          </button>
          <button
            className={`settings-option-button ${settings.formatType === &apos;modern' ? &apos;active' : ''}`}
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
            className={`settings-option-button ${settings.showParagraphNumbers ? &apos;active' : ''}`}
            onClick={() => handleParagraphNumbersToggle(true)}
          >
            Show
          </button>
          <button
            className={`settings-option-button ${!settings.showParagraphNumbers ? &apos;active' : ''}`}
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
