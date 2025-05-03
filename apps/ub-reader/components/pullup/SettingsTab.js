'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeSettingsPanel } from '../ThemeSettingsPanel';
import { usePullup } from '../../contexts/PullupContext';
import './SettingsTab.css';
/**
 * SettingsTab Component
 *
 * A tab for adjusting reader settings.
 * Uses PullupContext for state management.
 *
 * Note: We removed the onSettingsChange prop to fix Next.js serialization errors.
 * The component now uses the context directly for settings updates.
 */
export function SettingsTab({ settings, className = '' }) {
    // Get pullup context
    const { updateSettings } = usePullup();
    // Handle font size change
    const handleFontSizeChange = (fontSize) => {
        updateSettings({ fontSize });
    };
    // Handle line height change
    const handleLineHeightChange = (lineHeight) => {
        updateSettings({ lineHeight });
    };
    // Handle font family change
    const handleFontFamilyChange = (fontFamily) => {
        updateSettings({ fontFamily });
    };
    // Handle theme change
    const handleThemeChange = (theme) => {
        updateSettings({ theme });
    };
    // Handle paragraph numbers toggle
    const handleParagraphNumbersToggle = (showParagraphNumbers) => {
        updateSettings({ showParagraphNumbers });
    };
    // Handle format type change
    const handleFormatTypeChange = (formatType) => {
        updateSettings({ formatType });
    };
    // Determine container classes
    const containerClasses = ['settings-tab', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsx("h3", { className: "settings-tab-title", children: "Reader Settings" }), _jsxs("div", { className: "settings-section", children: [_jsx("h4", { className: "settings-section-title", children: "Font Size" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `settings-option-button ${settings.fontSize === 14 ? 'active' : ''}`, onClick: () => handleFontSizeChange(14), children: "Small" }), _jsx("button", { className: `settings-option-button ${settings.fontSize === 16 ? 'active' : ''}`, onClick: () => handleFontSizeChange(16), children: "Medium" }), _jsx("button", { className: `settings-option-button ${settings.fontSize === 18 ? 'active' : ''}`, onClick: () => handleFontSizeChange(18), children: "Large" }), _jsx("button", { className: `settings-option-button ${settings.fontSize === 20 ? 'active' : ''}`, onClick: () => handleFontSizeChange(20), children: "X-Large" })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h4", { className: "settings-section-title", children: "Line Spacing" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `settings-option-button ${settings.lineHeight === 1.4 ? 'active' : ''}`, onClick: () => handleLineHeightChange(1.4), children: "Compact" }), _jsx("button", { className: `settings-option-button ${settings.lineHeight === 1.6 ? 'active' : ''}`, onClick: () => handleLineHeightChange(1.6), children: "Normal" }), _jsx("button", { className: `settings-option-button ${settings.lineHeight === 1.8 ? 'active' : ''}`, onClick: () => handleLineHeightChange(1.8), children: "Relaxed" })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h4", { className: "settings-section-title", children: "Font Style" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `settings-option-button ${settings.fontFamily === 'Arial, sans-serif' ? 'active' : ''}`, onClick: () => handleFontFamilyChange('Arial, sans-serif'), children: "Sans-serif" }), _jsx("button", { className: `settings-option-button ${settings.fontFamily === 'Georgia, serif' ? 'active' : ''}`, onClick: () => handleFontFamilyChange('Georgia, serif'), children: "Serif" })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h4", { className: "settings-section-title", children: "Theme" }), _jsx(ThemeSettingsPanel, { inline: true, isOpen: true, onClose: () => { } })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h4", { className: "settings-section-title", children: "Content Formatting" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `settings-option-button ${settings.formatType === 'traditional' ? 'active' : ''}`, onClick: () => handleFormatTypeChange('traditional'), children: "Traditional" }), _jsx("button", { className: `settings-option-button ${settings.formatType === 'modern' ? 'active' : ''}`, onClick: () => handleFormatTypeChange('modern'), children: "Modern" })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h4", { className: "settings-section-title", children: "Paragraph Numbers" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `settings-option-button ${settings.showParagraphNumbers ? 'active' : ''}`, onClick: () => handleParagraphNumbersToggle(true), children: "Show" }), _jsx("button", { className: `settings-option-button ${!settings.showParagraphNumbers ? 'active' : ''}`, onClick: () => handleParagraphNumbersToggle(false), children: "Hide" })] })] })] }));
}
export default SettingsTab;
//# sourceMappingURL=SettingsTab.js.map