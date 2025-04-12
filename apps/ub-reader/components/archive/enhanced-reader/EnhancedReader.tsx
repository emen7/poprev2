/**
 * Enhanced Reader Component
 *
 * This is the main component that renders a document with enhanced navigation and settings.
 */

'use client';

import React from 'react';

import { useTheme, usePanel } from './hooks';
import { NavigationPanel } from './NavigationPanel';
import { Overlay } from './Overlay';
import { ReaderHeader } from './ReaderHeader';
import { SettingsPanel } from './SettingsPanel';
import { EnhancedReaderProps } from './types';
import './EnhancedReader.css';

/**
 * Enhanced Reader Component
 */
export function EnhancedReader({
  title,
  children,
  initialTheme = 'light',
  className = '',
}: EnhancedReaderProps) {
  // Theme state
  const { theme, setTheme } = useTheme(initialTheme);

  // Navigation panel state
  const navigation = usePanel();

  // Settings panel state
  const settings = usePanel();

  // Handle navigation toggle
  const handleNavigationToggle = () => {
    navigation.toggle();
    if (!navigation.isOpen) {
      settings.close();
    }
  };

  // Handle settings toggle
  const handleSettingsToggle = () => {
    settings.toggle();
    if (!settings.isOpen) {
      navigation.close();
    }
  };

  // Handle overlay click
  const handleOverlayClick = () => {
    navigation.close();
    settings.close();
  };

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <div className={`er-enhanced-reader er-${theme} ${className}`}>
      {/* Header */}
      <ReaderHeader
        title={title}
        onNavigationToggle={handleNavigationToggle}
        onSettingsToggle={handleSettingsToggle}
      />

      {/* Main Content */}
      <main className="er-reader-main">
        <div className="er-reader-content">{children}</div>
      </main>

      {/* Navigation Panel */}
      <NavigationPanel isOpen={navigation.isOpen} onClose={navigation.close} />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settings.isOpen}
        onClose={settings.close}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Overlay */}
      {(navigation.isOpen || settings.isOpen) && <Overlay onClick={handleOverlayClick} />}
    </div>
  );
}
