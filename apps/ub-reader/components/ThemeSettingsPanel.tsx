'use client';

import React from 'react';
import { useTheme, UITheme, ContentTheme } from '../contexts/ThemeContext';

interface ThemeSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * Enhanced Settings Panel Component with UI and Content Theme options
 */
export function ThemeSettingsPanel({ isOpen, onClose, className = '' }: ThemeSettingsPanelProps) {
  const { uiTheme, setUITheme, contentTheme, setContentTheme } = useTheme();

  return (
    <aside
      className={`er-settings-panel ${isOpen ? 'er-open' : ''} ${className}`}
      aria-hidden={!isOpen}
      role="complementary"
    >
      {/* Panel Header */}
      <div className="er-panel-header">
        <h2 className="er-panel-title">Settings</h2>
        <button className="er-panel-close-button" onClick={onClose} aria-label="Close settings">
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Panel Content */}
      <div className="er-panel-content">
        {/* UI Theme Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Display Theme</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${uiTheme === 'light' ? 'er-active' : ''}`}
              onClick={() => setUITheme('light')}
              aria-pressed={uiTheme === 'light'}
            >
              Light
            </button>
            <button
              className={`er-settings-option-button ${uiTheme === 'dark' ? 'er-active' : ''}`}
              onClick={() => setUITheme('dark')}
              aria-pressed={uiTheme === 'dark'}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Content Theme Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Content Formatting</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${
                contentTheme === 'modern' ? 'er-active' : ''
              }`}
              onClick={() => setContentTheme('modern')}
              aria-pressed={contentTheme === 'modern'}
            >
              Modern
            </button>
            <button
              className={`er-settings-option-button ${
                contentTheme === 'traditional' ? 'er-active' : ''
              }`}
              onClick={() => setContentTheme('traditional')}
              aria-pressed={contentTheme === 'traditional'}
            >
              Traditional
            </button>
          </div>
          <div className="er-settings-option-description">
            <p className="er-settings-option-help-text">
              {contentTheme === 'modern' ? (
                <>
                  <strong>Modern:</strong> Optimized for digital reading with improved list
                  formatting, sans-serif fonts, and visual indicators for topic changes.
                </>
              ) : (
                <>
                  <strong>Traditional:</strong> Matches the original book's presentation with serif
                  fonts and traditional paragraph formatting.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Font Size Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Font Size</h3>
          <div className="er-settings-option-buttons">
            <button className="er-settings-option-button">Small</button>
            <button className="er-settings-option-button er-active">Medium</button>
            <button className="er-settings-option-button">Large</button>
            <button className="er-settings-option-button">X-Large</button>
          </div>
        </div>

        {/* Line Spacing Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Line Spacing</h3>
          <div className="er-settings-option-buttons">
            <button className="er-settings-option-button">Compact</button>
            <button className="er-settings-option-button er-active">Normal</button>
            <button className="er-settings-option-button">Relaxed</button>
          </div>
        </div>

        {/* Paragraph Numbers Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Paragraph Numbers</h3>
          <div className="er-settings-option-buttons">
            <button className="er-settings-option-button">Show</button>
            <button className="er-settings-option-button er-active">Hide</button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ThemeSettingsPanel;
