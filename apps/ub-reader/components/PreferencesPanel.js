'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useHighlight } from '@ub/highlighting';
import { useState } from 'react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
/**
 * Component for displaying and managing user preferences
 */
export const PreferencesPanel = () => {
    const { preferences, updatePreferences, resetPreferences } = useUserPreferences();
    const { showHighlights, setShowHighlights } = useHighlight();
    const [isOpen, setIsOpen] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    const handleToggleParagraphNumbers = () => {
        updatePreferences({
            reader: Object.assign(Object.assign({}, preferences.reader), { showParagraphNumbers: !preferences.reader.showParagraphNumbers }),
        });
    };
    const handleFontSizeChange = (size) => {
        updatePreferences({
            reader: Object.assign(Object.assign({}, preferences.reader), { fontSize: size }),
        });
    };
    const handleThemeChange = (theme) => {
        updatePreferences({
            reader: Object.assign(Object.assign({}, preferences.reader), { theme: theme }),
        });
    };
    const handleResetPreferences = () => {
        resetPreferences();
    };
    return (_jsxs("div", { className: "preferences-panel", children: [_jsx("button", { onClick: togglePanel, className: "fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg", "aria-label": "Preferences", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })] }) }), isOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 max-w-md w-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "Reader Preferences" }), _jsx("button", { onClick: togglePanel, className: "text-gray-500 hover:text-gray-700", "aria-label": "Close", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("label", { className: "flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: preferences.reader.showParagraphNumbers, onChange: handleToggleParagraphNumbers, className: "form-checkbox h-5 w-5 text-blue-600" }), _jsx("span", { className: "ml-2 text-gray-700", children: "Show paragraph numbers" })] }) }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("label", { className: "flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: showHighlights, onChange: e => setShowHighlights(e.target.checked), className: "form-checkbox h-5 w-5 text-blue-600" }), _jsx("span", { className: "ml-2 text-gray-700", children: "Show highlights" })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2", children: "Font Size" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => handleFontSizeChange('small'), className: `px-4 py-2 rounded ${preferences.reader.fontSize === 'small'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'}`, children: "Small" }), _jsx("button", { onClick: () => handleFontSizeChange('medium'), className: `px-4 py-2 rounded ${preferences.reader.fontSize === 'medium'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'}`, children: "Medium" }), _jsx("button", { onClick: () => handleFontSizeChange('large'), className: `px-4 py-2 rounded ${preferences.reader.fontSize === 'large'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'}`, children: "Large" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2", children: "Theme" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => handleThemeChange('light'), className: `px-4 py-2 rounded ${preferences.reader.theme === 'light'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'}`, children: "Light" }), _jsx("button", { onClick: () => handleThemeChange('dark'), className: `px-4 py-2 rounded ${preferences.reader.theme === 'dark'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'}`, children: "Dark" }), _jsx("button", { onClick: () => handleThemeChange('system'), className: `px-4 py-2 rounded ${preferences.reader.theme === 'system'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'}`, children: "System" })] })] }), _jsx("div", { className: "pt-4 border-t border-gray-200", children: _jsx("button", { onClick: handleResetPreferences, className: "text-red-500 hover:text-red-700", children: "Reset to defaults" }) })] })] }) }))] }));
};
export default PreferencesPanel;
//# sourceMappingURL=PreferencesPanel.js.map