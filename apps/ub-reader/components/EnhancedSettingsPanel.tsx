'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useEnhancedHighlight } from './EnhancedHighlightProvider';
import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';

interface EnhancedSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * Enhanced Settings Panel Component with UI and Content Theme options
 */
export function EnhancedSettingsPanel({
  isOpen,
  onClose,
  className = '',
}: EnhancedSettingsPanelProps) {
  const { uiTheme, setUITheme, contentTheme, setContentTheme } = useTheme();
  const { showHighlights, toggleHighlights } = useEnhancedHighlight();
  const { preferences, updatePreferences } = useExtendedUserPreferences();

  // Handle font size change
  const handleFontSizeChange = (fontSize: 'small' | 'medium' | 'large') => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        fontSize,
      },
    });
  };

  // Handle line height change
  const handleLineHeightChange = (lineHeight: 'compact' | 'normal' | 'relaxed') => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        lineHeight,
      },
    });
  };

  // Handle paragraph numbers toggle
  const handleParagraphNumbersToggle = () => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        showParagraphNumbers: !preferences.reader.showParagraphNumbers,
      },
    });
  };

  // Handle note indicators toggle
  const handleNoteIndicatorsToggle = () => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        showNoteIndicators: !preferences.reader.showNoteIndicators,
      },
    });
  };

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
                  <strong>Traditional:</strong> Matches the original book&apos;s presentation with
                  serif fonts and traditional paragraph formatting.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Font Size Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Font Size</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${preferences.reader.fontSize === 'small' ? 'er-active' : ''}`}
              onClick={() => handleFontSizeChange('small')}
              aria-pressed={preferences.reader.fontSize === 'small'}
            >
              Small
            </button>
            <button
              className={`er-settings-option-button ${preferences.reader.fontSize === 'medium' ? 'er-active' : ''}`}
              onClick={() => handleFontSizeChange('medium')}
              aria-pressed={preferences.reader.fontSize === 'medium'}
            >
              Medium
            </button>
            <button
              className={`er-settings-option-button ${preferences.reader.fontSize === 'large' ? 'er-active' : ''}`}
              onClick={() => handleFontSizeChange('large')}
              aria-pressed={preferences.reader.fontSize === 'large'}
            >
              Large
            </button>
          </div>
        </div>

        {/* Line Spacing Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Line Spacing</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${preferences.reader.lineHeight === 'compact' ? 'er-active' : ''}`}
              onClick={() => handleLineHeightChange('compact')}
              aria-pressed={preferences.reader.lineHeight === 'compact'}
            >
              Compact
            </button>
            <button
              className={`er-settings-option-button ${preferences.reader.lineHeight === 'normal' ? 'er-active' : ''}`}
              onClick={() => handleLineHeightChange('normal')}
              aria-pressed={preferences.reader.lineHeight === 'normal'}
            >
              Normal
            </button>
            <button
              className={`er-settings-option-button ${preferences.reader.lineHeight === 'relaxed' ? 'er-active' : ''}`}
              onClick={() => handleLineHeightChange('relaxed')}
              aria-pressed={preferences.reader.lineHeight === 'relaxed'}
            >
              Relaxed
            </button>
          </div>
        </div>

        {/* Paragraph Numbers Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Paragraph Numbers</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${preferences.reader.showParagraphNumbers ? 'er-active' : ''}`}
              onClick={handleParagraphNumbersToggle}
              aria-pressed={preferences.reader.showParagraphNumbers}
            >
              Show
            </button>
            <button
              className={`er-settings-option-button ${!preferences.reader.showParagraphNumbers ? 'er-active' : ''}`}
              onClick={handleParagraphNumbersToggle}
              aria-pressed={!preferences.reader.showParagraphNumbers}
            >
              Hide
            </button>
          </div>
        </div>

        {/* Note Indicators Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Note Indicators</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${preferences.reader.showNoteIndicators ? 'er-active' : ''}`}
              onClick={handleNoteIndicatorsToggle}
              aria-pressed={preferences.reader.showNoteIndicators}
            >
              Show
            </button>
            <button
              className={`er-settings-option-button ${!preferences.reader.showNoteIndicators ? 'er-active' : ''}`}
              onClick={handleNoteIndicatorsToggle}
              aria-pressed={!preferences.reader.showNoteIndicators}
            >
              Hide
            </button>
          </div>
        </div>

        {/* Highlights Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Highlights</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${showHighlights ? 'er-active' : ''}`}
              onClick={toggleHighlights}
              aria-pressed={showHighlights}
            >
              Show
            </button>
            <button
              className={`er-settings-option-button ${!showHighlights ? 'er-active' : ''}`}
              onClick={toggleHighlights}
              aria-pressed={!showHighlights}
            >
              Hide
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .er-settings-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100vh;
          background-color: var(--panel-background, #fff);
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 1000;
          overflow-y: auto;
          padding: 1rem;
        }

        .er-settings-panel.er-open {
          transform: translateX(0);
        }

        .er-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-color, #eee);
        }

        .er-panel-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .er-panel-close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
        }

        .er-panel-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .er-settings-option-title {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .er-settings-option-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .er-settings-option-button {
          padding: 0.5rem 1rem;
          background-color: var(--button-background, #f5f5f5);
          border: 1px solid var(--button-border, #ddd);
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .er-settings-option-button:hover {
          background-color: var(--button-hover-background, #e9e9e9);
        }

        .er-settings-option-button.er-active {
          background-color: var(--button-active-background, #007bff);
          color: white;
          border-color: var(--button-active-border, #0069d9);
        }

        .er-settings-option-description {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--description-color, #666);
        }

        /* Dark mode styles */
        :global(.dark-theme) .er-settings-panel {
          background-color: var(--panel-background-dark, #222);
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
        }

        :global(.dark-theme) .er-panel-header {
          border-bottom-color: var(--border-color-dark, #444);
        }

        :global(.dark-theme) .er-settings-option-button {
          background-color: var(--button-background-dark, #333);
          border-color: var(--button-border-dark, #555);
          color: var(--text-color-dark, #eee);
        }

        :global(.dark-theme) .er-settings-option-button:hover {
          background-color: var(--button-hover-background-dark, #444);
        }

        :global(.dark-theme) .er-settings-option-button.er-active {
          background-color: var(--button-active-background-dark, #0069d9);
          border-color: var(--button-active-border-dark, #0062cc);
        }

        :global(.dark-theme) .er-settings-option-description {
          color: var(--description-color-dark, #aaa);
        }
      `}</style>
    </aside>
  );
}

export default EnhancedSettingsPanel;
