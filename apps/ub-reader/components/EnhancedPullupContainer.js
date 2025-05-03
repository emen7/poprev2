'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Pullup } from './pullup/Pullup';
import { EnhancedSettingsPanel } from './EnhancedSettingsPanel';
import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';
import { useTheme } from '../contexts/ThemeContext';
import { PullupProvider } from '../contexts/PullupContext';
import '../styles/themes/global.css';
/**
 * EnhancedPullupContainer Component
 *
 * This component connects the pullup UI components with the state management.
 * It provides a bottom panel with tabs for Notes, Quotes, and Settings.
 * Uses PullupContext for state management instead of prop drilling.
 */
export const EnhancedPullupContainer = () => {
    // Get theme context
    const { uiTheme } = useTheme();
    // State for settings panel
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    // Get preferences
    const { preferences } = useExtendedUserPreferences();
    // Create reader settings object from preferences
    const readerSettings = {
        fontSize: preferences.reader.fontSize,
        lineHeight: preferences.reader.lineHeight,
        showParagraphNumbers: preferences.reader.showParagraphNumbers,
        fontFamily: 'system-ui, sans-serif', // Default font family
        formatType: 'traditional', // Default format type
        theme: uiTheme,
    };
    // Toggle settings panel
    const toggleSettingsPanel = () => {
        setIsSettingsPanelOpen(!isSettingsPanelOpen);
    };
    return (_jsxs(PullupProvider, { initialSettings: readerSettings, children: [_jsx(Pullup, {}), _jsx(EnhancedSettingsPanel, { isOpen: isSettingsPanelOpen, onClose: () => setIsSettingsPanelOpen(false) })] }));
};
export default EnhancedPullupContainer;
//# sourceMappingURL=EnhancedPullupContainer.js.map