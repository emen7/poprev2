'use client';

import React from 'react';

import { ThemeProvider } from '../contexts/ThemeContext';

import { ThemeSettingsPanel } from './ThemeSettingsPanel';
import '../styles/themes/index.css';

interface ThemeEnabledReaderProps {
  title: string;
  children: React.ReactNode;
  initialUITheme?: 'light' | 'dark';
  initialContentTheme?: 'modern' | 'traditional';
  className?: string;
}

/**
 * Theme-Enabled Reader Component
 *
 * This component wraps content with the ThemeProvider and provides
 * a header with navigation and settings toggles, as well as a settings panel
 * that includes UI theme and content formatting theme options.
 */
export function ThemeEnabledReader({
  title,
  children,
  initialUITheme = 'light',
  initialContentTheme = 'modern',
  className = '',
}: ThemeEnabledReaderProps) {
  // Navigation panel state
  const [navigationOpen, setNavigationOpen] = React.useState(false);

  // Settings panel state
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  // Handle navigation toggle
  const handleNavigationToggle = () => {
    setNavigationOpen(!navigationOpen);
    if (navigationOpen) {
      setSettingsOpen(false);
    }
  };

  // Handle settings toggle
  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
    if (settingsOpen) {
      setNavigationOpen(false);
    }
  };

  // Handle overlay click
  const handleOverlayClick = () => {
    setNavigationOpen(false);
    setSettingsOpen(false);
  };

  return (
    <ThemeProvider initialUITheme={initialUITheme} initialContentTheme={initialContentTheme}>
      <div className={`er-enhanced-reader ${className}`}>
        {/* Header */}
        <header className="er-reader-header">
          <button
            className="er-reader-header-button"
            onClick={handleNavigationToggle}
            aria-label="Toggle navigation"
            aria-expanded={navigationOpen}
          >
            <span aria-hidden="true">☰</span>
          </button>
          <h1 className="er-reader-title">{title}</h1>
          <button
            className="er-reader-header-button"
            onClick={handleSettingsToggle}
            aria-label="Toggle settings"
            aria-expanded={settingsOpen}
          >
            <span aria-hidden="true">⚙</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="er-reader-main">
          <div className="er-reader-content">{children}</div>
        </main>

        {/* Navigation Panel - To be implemented */}

        {/* Settings Panel */}
        <ThemeSettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

        {/* Overlay */}
        {(navigationOpen || settingsOpen) && (
          <div className="er-overlay er-active" onClick={handleOverlayClick} aria-hidden="true" />
        )}
      </div>
    </ThemeProvider>
  );
}

export default ThemeEnabledReader;
