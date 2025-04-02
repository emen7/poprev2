/**
 * Settings Panel Component
 * 
 * This component renders a slide-in settings panel with theme options.
 */

'use client';

import React from 'react';
import { SettingsPanelProps } from './types';

/**
 * Settings Panel Component
 */
export function SettingsPanel({ 
  isOpen, 
  onClose, 
  theme, 
  onThemeChange, 
  className = '' 
}: SettingsPanelProps) {
  return (
    <aside
      className={`er-settings-panel ${isOpen ? 'er-open' : ''} ${className}`}
      aria-hidden={!isOpen}
      role="complementary"
    >
      {/* Panel Header */}
      <div className="er-panel-header">
        <h2 className="er-panel-title">Settings</h2>
        <button
          className="er-panel-close-button"
          onClick={onClose}
          aria-label="Close settings"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
      
      {/* Panel Content */}
      <div className="er-panel-content">
        {/* Theme Option */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Theme</h3>
          <div className="er-settings-option-buttons">
            <button
              className={`er-settings-option-button ${theme === 'light' ? 'er-active' : ''}`}
              onClick={() => onThemeChange('light')}
              aria-pressed={theme === 'light'}
            >
              Light
            </button>
            <button
              className={`er-settings-option-button ${theme === 'dark' ? 'er-active' : ''}`}
              onClick={() => onThemeChange('dark')}
              aria-pressed={theme === 'dark'}
            >
              Dark
            </button>
          </div>
        </div>
        
        {/* Future settings options will be added here */}
        <div className="er-settings-option">
          <h3 className="er-settings-option-title">Coming Soon</h3>
          <p>More settings options will be available in future updates:</p>
          <ul>
            <li>Font size</li>
            <li>Font style</li>
            <li>Line spacing</li>
            <li>Text width</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}