'use client';

import React, { useState } from &apos;react';

import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';
import { PullupProvider } from '../contexts/PullupContext';
import { useTheme } from '../contexts/ThemeContext';

import { EnhancedSettingsPanel } from './EnhancedSettingsPanel';
import { Pullup } from './pullup/Pullup';
import type { ReaderSettings } from './pullup/types';

import '../styles/themes/global.css';

/**
 * EnhancedPullupContainer Component
 *
 * This component connects the pullup UI components with the state management.
 * It provides a bottom panel with tabs for Notes, Quotes, and Settings.
 * Uses PullupContext for state management instead of prop drilling.
 */
export const EnhancedPullupContainer: React.FC = () => {
  // Get theme context
  const { _uiTheme } = useTheme();

  // State for settings panel
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // Get preferences
  const { preferences } = useExtendedUserPreferences();

  // Create reader settings object from preferences
  const readerSettings: ReaderSettings = {
    fontSize: preferences.reader.fontSize,
    lineHeight: preferences.reader.lineHeight,
    showParagraphNumbers: preferences.reader.showParagraphNumbers,
    fontFamily: &apos;system-ui, sans-serif', // Default font family
    formatType: &apos;traditional', // Default format type
    theme: uiTheme,
  };

  // Toggle settings panel
  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  return (
    <PullupProvider initialSettings={readerSettings}>
      {/* Use Pullup component with context */}
      <Pullup />

      {/* Settings Panel */}
      <EnhancedSettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
      />
    </PullupProvider>
  );
};

export default EnhancedPullupContainer;
