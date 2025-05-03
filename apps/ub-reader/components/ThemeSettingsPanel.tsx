'use client';

import React from &apos;react';

import { useTheme } from '../contexts/ThemeContext';
import '../styles/themes/global.css';
import '../styles/theme-transitions.css';

interface ThemeSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  inline?: boolean; // For embedding in other components
}

/**
 * Enhanced Settings Panel Component with UI and Content Theme options
 */
export function ThemeSettingsPanel({
  isOpen,
  onClose,
  className = '',
  inline = false,
}: ThemeSettingsPanelProps) {
  const { _uiTheme, setUITheme, contentTheme, setContentTheme, isThemeTransitioning } = useTheme();

  // If inline mode is enabled, render without the panel wrapper
  if (inline) {
    return <div className={`settings-content ${className}`}>{renderSettingsContent()}</div>;
  }

  return (
    <aside
      className={`settings-panel ${isOpen ? &apos;panel-open' : ''} ${className} ${isThemeTransitioning ? &apos;theme-transitioning' : ''}`}
      aria-hidden={!isOpen}
      role="complementary"
    >
      {/* Panel Header */}
      <div className="panel-header">
        <h2 className="panel-title">Settings</h2>
        <button className="panel-close-button" onClick={onClose} aria-label="Close settings">
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Panel Content */}
      <div className="panel-content">{renderSettingsContent()}</div>

      {/* Styles */}
      <style jsx>{`
        .settings-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 350px;
          background-color: var(--color-bg-primary);
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform var(--transition-normal);
          z-index: var(--z-index-modal);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .panel-open {
          transform: translateX(0);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--color-border-primary);
        }

        .panel-title {
          margin: 0;
          font-size: var(--font-size-lg);
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .panel-close-button {
          background: none;
          border: none;
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: var(--spacing-xs);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: background-color var(--transition-fast);
        }

        .panel-close-button:hover {
          background-color: var(--color-bg-secondary);
        }

        .panel-content {
          flex: 1;
          padding: var(--spacing-md);
          overflow-y: auto;
        }

        .settings-content {
          color: var(--color-text-primary);
        }

        @media (width <= 768px) {
          .settings-panel {
            width: 100%;
          }
        }
      `}</style>
    </aside>
  );

  // Helper function to render settings content
  function renderSettingsContent() {
    return (
      <>
        {/* UI Theme Option */}
        <div className="settings-option">
          <h3 className="settings-option-title">Display Theme</h3>
          <div className="settings-option-buttons">
            <button
              className={`settings-option-button ${uiTheme === &apos;light' ? &apos;active' : ''}`}
              onClick={() => setUITheme('light')}
              aria-pressed={uiTheme === &apos;light'}
            >
              Light
            </button>
            <button
              className={`settings-option-button ${uiTheme === &apos;dark' ? &apos;active' : ''}`}
              onClick={() => setUITheme('dark')}
              aria-pressed={uiTheme === &apos;dark'}
            >
              Dark
            </button>
            <button
              className={`settings-option-button ${uiTheme === &apos;high-contrast' ? &apos;active' : ''}`}
              onClick={() => setUITheme('high-contrast')}
              aria-pressed={uiTheme === &apos;high-contrast'}
            >
              High Contrast
            </button>
          </div>
        </div>

        {/* Content Theme Option */}
        <div className="settings-option">
          <h3 className="settings-option-title">Content Formatting</h3>
          <div className="settings-option-buttons">
            <button
              className={`settings-option-button ${contentTheme === &apos;modern' ? &apos;active' : ''}`}
              onClick={() => setContentTheme('modern')}
              aria-pressed={contentTheme === &apos;modern'}
            >
              Modern
            </button>
            <button
              className={`settings-option-button ${contentTheme === &apos;traditional' ? &apos;active' : ''}`}
              onClick={() => setContentTheme('traditional')}
              aria-pressed={contentTheme === &apos;traditional'}
            >
              Traditional
            </button>
          </div>
          <div className="settings-option-description">
            <p className="settings-option-help-text">
              {contentTheme === &apos;modern' ? (
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
        <div className="settings-option">
          <h3 className="settings-option-title">Font Size</h3>
          <div className="settings-option-buttons">
            <button className="settings-option-button">Small</button>
            <button className="settings-option-button active">Medium</button>
            <button className="settings-option-button">Large</button>
            <button className="settings-option-button">X-Large</button>
          </div>
        </div>

        {/* Line Spacing Option */}
        <div className="settings-option">
          <h3 className="settings-option-title">Line Spacing</h3>
          <div className="settings-option-buttons">
            <button className="settings-option-button">Compact</button>
            <button className="settings-option-button active">Normal</button>
            <button className="settings-option-button">Relaxed</button>
          </div>
        </div>

        {/* Paragraph Numbers Option */}
        <div className="settings-option">
          <h3 className="settings-option-title">Paragraph Numbers</h3>
          <div className="settings-option-buttons">
            <button className="settings-option-button">Show</button>
            <button className="settings-option-button active">Hide</button>
          </div>
        </div>

        {/* Styles */}
        <style jsx>{`
          .settings-option {
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            border-bottom: 1px solid var(--color-border-secondary);
          }

          .settings-option:last-child {
            border-bottom: none;
          }

          .settings-option-title {
            margin: 0 0 var(--spacing-sm);
            font-size: var(--font-size-md);
            font-weight: 500;
            color: var(--color-text-primary);
          }

          .settings-option-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-xs);
            margin-bottom: var(--spacing-sm);
          }

          .settings-option-button {
            padding: var(--spacing-xs) var(--spacing-sm);
            background-color: var(--color-bg-secondary);
            border: 1px solid var(--color-border-primary);
            border-radius: var(--radius-sm);
            color: var(--color-text-primary);
            font-size: var(--font-size-sm);
            cursor: pointer;
            transition:
              background-color var(--transition-fast),
              border-color var(--transition-fast);
          }

          .settings-option-button:hover {
            background-color: var(--color-bg-tertiary);
          }

          .settings-option-button.active {
            background-color: var(--color-accent-primary);
            color: white;
            border-color: var(--color-accent-primary);
          }

          .settings-option-description {
            margin-top: var(--spacing-sm);
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
          }

          .settings-option-help-text {
            margin: 0;
            line-height: var(--line-height-normal);
          }
        `}</style>
      </>
    );
  }
}

export default ThemeSettingsPanel;
