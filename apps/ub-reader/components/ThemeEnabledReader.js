'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ThemeSettingsPanel } from './ThemeSettingsPanel';
import '../styles/themes/index.css';
/**
 * Theme-Enabled Reader Component
 *
 * This component wraps content with the ThemeProvider and provides
 * a header with navigation and settings toggles, as well as a settings panel
 * that includes UI theme and content formatting theme options.
 */
export function ThemeEnabledReader({ title, children, initialUITheme = 'light', initialContentTheme = 'modern', className = '', }) {
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
    return (_jsx(ThemeProvider, { initialUITheme: initialUITheme, initialContentTheme: initialContentTheme, children: _jsxs("div", { className: `er-enhanced-reader ${className}`, children: [_jsxs("header", { className: "er-reader-header", children: [_jsx("button", { className: "er-reader-header-button", onClick: handleNavigationToggle, "aria-label": "Toggle navigation", "aria-expanded": navigationOpen, children: _jsx("span", { "aria-hidden": "true", children: "\u2630" }) }), _jsx("h1", { className: "er-reader-title", children: title }), _jsx("button", { className: "er-reader-header-button", onClick: handleSettingsToggle, "aria-label": "Toggle settings", "aria-expanded": settingsOpen, children: _jsx("span", { "aria-hidden": "true", children: "\u2699" }) })] }), _jsx("main", { className: "er-reader-main", children: _jsx("div", { className: "er-reader-content", children: children }) }), _jsx(ThemeSettingsPanel, { isOpen: settingsOpen, onClose: () => setSettingsOpen(false) }), (navigationOpen || settingsOpen) && (_jsx("div", { className: "er-overlay er-active", onClick: handleOverlayClick, "aria-hidden": "true" }))] }) }));
}
export default ThemeEnabledReader;
//# sourceMappingURL=ThemeEnabledReader.js.map