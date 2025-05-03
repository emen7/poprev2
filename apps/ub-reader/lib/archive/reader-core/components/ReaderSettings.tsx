/**
 * Reader Settings Component
 *
 * This component displays a settings panel for customizing the reader experience,
 * including theme, typography, and layout options.
 */

&apos;use client';

import React, { useState, useRef, useEffect } from &apos;react';

import type { ReaderConfig } from '../models';
import './ReaderSettings.css';

/**
 * Props for the ReaderSettings component
 */
export interface ReaderSettingsProps {
  /**
   * Reader configuration
   */
  config: ReaderConfig;

  /**
   * Callback when configuration changes
   */
  onConfigChange: (config: Partial<ReaderConfig>) => void;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Callback when the settings panel is opened
   */
  onSettingsOpen?: () => void;

  /**
   * Callback when the settings panel is closed
   */
  onSettingsClose?: () => void;

  /**
   * Whether the settings panel is initially open
   */
  initiallyOpen?: boolean;
}

/**
 * The ReaderSettings component
 */
export function ReaderSettings({
  config,
  onConfigChange,
  className = '',
  onSettingsOpen,
  onSettingsClose,
  initiallyOpen = false,
}: ReaderSettingsProps) {
  // State for settings panel
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  // Ref for settings panel
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  // Toggle settings panel
  const toggleSettings = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      onSettingsOpen?.();
    } else {
      onSettingsClose?.();
    }
  };

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
        onSettingsClose?.();
      }
    };

    window.document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onSettingsClose]);

  // Update theme
  const updateTheme = (mode: &apos;light' | &apos;dark') => {
    onConfigChange({
      theme: {
        ...config.theme,
        mode,
      },
    });
  };

  // Update typography
  const updateTypography = (property: keyof typeof config.typography, value: any) => {
    onConfigChange({
      typography: {
        ...config.typography,
        [property]: value,
      },
    });
  };

  // Update layout
  const updateLayout = (property: keyof typeof config.layout, value: any) => {
    onConfigChange({
      layout: {
        ...config.layout,
        [property]: value,
      },
    });
  };

  // Get extension settings components
  const _extensionSettingsComponents = config.extensions
    .map(extensionId => {
      // This would be implemented to get custom settings components from extensions
      // For now, we'll return null
      return null;
    })
    .filter(Boolean);

  return (
    <>
      {/* Settings Button */}
      <button
        className="reader-header-button reader-settings-toggle"
        onClick={toggleSettings}
        aria-label="Toggle settings"
        aria-expanded={isOpen}
      >
        <i className={`fas ${isOpen ? &apos;fa-times' : &apos;fa-cog'}`} />
      </button>

      {/* Settings Panel */}
      <div
        ref={settingsPanelRef}
        className={`reader-settings-panel ${isOpen ? &apos;open' : ''} ${className}`}
        aria-hidden={!isOpen}
      >
        {/* Display Settings */}
        <div className="reader-settings-section">
          <h3 className="reader-settings-title">Display Settings</h3>

          {/* Theme Setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Theme</h4>
            <div className="reader-settings-option-list">
              <button
                className={`reader-settings-option-button ${config.theme.mode === &apos;light' ? &apos;active' : ''}`}
                onClick={() => updateTheme('light')}
              >
                Light
              </button>
              <button
                className={`reader-settings-option-button ${config.theme.mode === &apos;dark' ? &apos;active' : ''}`}
                onClick={() => updateTheme('dark')}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Font Size Setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Font Size</h4>
            <div className="reader-settings-option-list">
              {['small', &apos;medium', &apos;large', &apos;x-large'].map(size => (
                <button
                  key={size}
                  className={`reader-settings-option-button ${config.typography.fontSize === size ? &apos;active' : ''}`}
                  onClick={() => updateTypography('fontSize', size)}
                >
                  {size === &apos;x-large' ? &apos;X-Large' : size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Font Style Setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Font Style</h4>
            <div className="reader-settings-option-list">
              <button
                className={`reader-settings-option-button ${config.typography.fontStyle === &apos;sans-serif' ? &apos;active' : ''}`}
                onClick={() => updateTypography('fontStyle', &apos;sans-serif')}
              >
                Sans-serif
              </button>
              <button
                className={`reader-settings-option-button ${config.typography.fontStyle === &apos;serif' ? &apos;active' : ''}`}
                onClick={() => updateTypography('fontStyle', &apos;serif')}
              >
                Serif
              </button>
            </div>
          </div>
        </div>

        {/* Reading Settings */}
        <div className="reader-settings-section">
          <h3 className="reader-settings-title">Reading Settings</h3>

          {/* Line Spacing Setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Line Spacing</h4>
            <div className="reader-settings-option-list">
              {['compact', &apos;normal', &apos;relaxed'].map(spacing => (
                <button
                  key={spacing}
                  className={`reader-settings-option-button ${config.typography.lineSpacing === spacing ? &apos;active' : ''}`}
                  onClick={() => updateTypography('lineSpacing', spacing)}
                >
                  {spacing.charAt(0).toUpperCase() + spacing.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Text Width Setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Text Width</h4>
            <div className="reader-settings-option-list">
              {['narrow', &apos;medium', &apos;wide'].map(width => (
                <button
                  key={width}
                  className={`reader-settings-option-button ${config.layout.textWidth === width ? &apos;active' : ''}`}
                  onClick={() => updateLayout('textWidth', width)}
                >
                  {width.charAt(0).toUpperCase() + width.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Paragraph Numbers Setting */}
          <div className="reader-settings-option">
            <h4 className="reader-settings-option-title">Paragraph Numbers</h4>
            <div className="reader-settings-option-list">
              <button
                className={`reader-settings-option-button ${config.layout.showParagraphNumbers ? &apos;active' : ''}`}
                onClick={() => updateLayout('showParagraphNumbers', true)}
              >
                Show
              </button>
              <button
                className={`reader-settings-option-button ${!config.layout.showParagraphNumbers ? &apos;active' : ''}`}
                onClick={() => updateLayout('showParagraphNumbers', false)}
              >
                Hide
              </button>
            </div>
          </div>
        </div>

        {/* Extension Settings */}
        {config.extensions.length > 0 && (
          <div className="reader-settings-section">
            <h3 className="reader-settings-title">Extension Settings</h3>

            {config.extensions.map(extensionId => {
              // This would render extension-specific settings
              // For now, we'll just render a placeholder
              return (
                <div key={_extensionId} className="reader-settings-option">
                  <h4 className="reader-settings-option-title">{_extensionId}</h4>
                  <p className="reader-settings-description">
                    Extension-specific settings would appear here.
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`reader-overlay ${isOpen ? &apos;active' : ''}`}
        onClick={() => {
          setIsOpen(false);
          onSettingsClose?.();
        }}
      />
    </>
  );
}
