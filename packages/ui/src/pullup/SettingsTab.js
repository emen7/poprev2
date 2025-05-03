import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './SettingsTab.css';
/**
 * SettingsTab Component
 *
 * A tab for configuring reader settings in the pullup panel.
 */
export const SettingsTab = ({ settings, onSettingsChange, className = '', }) => {
    // Handle font size change
    const handleFontSizeChange = (e) => {
        const fontSize = parseInt(e.target.value, 10);
        onSettingsChange({ fontSize });
    };
    // Handle line height change
    const handleLineHeightChange = (e) => {
        const lineHeight = parseFloat(e.target.value);
        onSettingsChange({ lineHeight });
    };
    // Handle font family change
    const handleFontFamilyChange = (e) => {
        const fontFamily = e.target.value;
        onSettingsChange({ fontFamily });
    };
    // Handle theme change
    const handleThemeChange = (theme) => {
        onSettingsChange({ theme });
    };
    // Handle paragraph numbers toggle
    const handleParagraphNumbersToggle = (e) => {
        const showParagraphNumbers = e.target.checked;
        onSettingsChange({ showParagraphNumbers });
    };
    // Handle format type change
    const handleFormatTypeChange = (formatType) => {
        onSettingsChange({ formatType });
    };
    // Handle text alignment change
    const handleTextAlignmentChange = (textAlignment) => {
        onSettingsChange({ textAlignment });
    };
    // Handle note indicators toggle
    const handleNoteIndicatorsToggle = (e) => {
        const showNoteIndicators = e.target.checked;
        onSettingsChange({ showNoteIndicators });
    };
    // Determine container classes
    const containerClasses = ['settings-tab', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsx("h2", { className: "settings-tab-title", children: "Reader Settings" }), _jsxs("div", { className: "settings-section", children: [_jsx("h3", { className: "settings-section-title", children: "Text" }), _jsxs("div", { className: "settings-control", children: [_jsx("label", { htmlFor: "font-size", className: "settings-label", children: "Font Size" }), _jsxs("div", { className: "settings-input-group", children: [_jsx("input", { id: "font-size", type: "range", min: "12", max: "24", step: "1", value: settings.fontSize, onChange: handleFontSizeChange, className: "settings-range" }), _jsxs("span", { className: "settings-value", children: [settings.fontSize, "px"] })] })] }), _jsxs("div", { className: "settings-control", children: [_jsx("label", { htmlFor: "line-height", className: "settings-label", children: "Line Height" }), _jsxs("div", { className: "settings-input-group", children: [_jsx("input", { id: "line-height", type: "range", min: "1.2", max: "2.0", step: "0.1", value: settings.lineHeight, onChange: handleLineHeightChange, className: "settings-range" }), _jsx("span", { className: "settings-value", children: settings.lineHeight })] })] }), _jsxs("div", { className: "settings-control", children: [_jsx("label", { htmlFor: "font-family", className: "settings-label", children: "Font Family" }), _jsxs("select", { id: "font-family", value: settings.fontFamily, onChange: handleFontFamilyChange, className: "settings-select", children: [_jsx("option", { value: "Georgia, serif", children: "Georgia" }), _jsx("option", { value: "'Times New Roman', serif", children: "Times New Roman" }), _jsx("option", { value: "Arial, sans-serif", children: "Arial" }), _jsx("option", { value: "'Helvetica Neue', sans-serif", children: "Helvetica" }), _jsx("option", { value: "'Segoe UI', sans-serif", children: "Segoe UI" })] })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h3", { className: "settings-section-title", children: "Appearance" }), _jsxs("div", { className: "settings-control", children: [_jsx("span", { className: "settings-label", children: "Theme" }), _jsxs("div", { className: "settings-theme-options", children: [_jsxs("button", { className: `settings-theme-option ${settings.theme === 'light' ? 'settings-theme-option-active' : ''}`, onClick: () => handleThemeChange('light'), children: [_jsx("div", { className: "settings-theme-preview settings-theme-light" }), _jsx("span", { children: "Light" })] }), _jsxs("button", { className: `settings-theme-option ${settings.theme === 'dark' ? 'settings-theme-option-active' : ''}`, onClick: () => handleThemeChange('dark'), children: [_jsx("div", { className: "settings-theme-preview settings-theme-dark" }), _jsx("span", { children: "Dark" })] }), _jsxs("button", { className: `settings-theme-option ${settings.theme === 'sepia' ? 'settings-theme-option-active' : ''}`, onClick: () => handleThemeChange('sepia'), children: [_jsx("div", { className: "settings-theme-preview settings-theme-sepia" }), _jsx("span", { children: "Sepia" })] })] })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h3", { className: "settings-section-title", children: "Formatting" }), _jsxs("div", { className: "settings-control", children: [_jsx("label", { htmlFor: "paragraph-numbers", className: "settings-label", children: "Show Paragraph Numbers" }), _jsxs("div", { className: "settings-switch", children: [_jsx("input", { id: "paragraph-numbers", type: "checkbox", checked: settings.showParagraphNumbers, onChange: handleParagraphNumbersToggle, className: "settings-checkbox" }), _jsx("span", { className: "settings-switch-slider" })] })] }), _jsxs("div", { className: "settings-control", children: [_jsx("span", { className: "settings-label", children: "Format Type" }), _jsxs("div", { className: "settings-format-options", children: [_jsx("button", { className: `settings-format-option ${settings.formatType === 'traditional' ? 'settings-format-option-active' : ''}`, onClick: () => handleFormatTypeChange('traditional'), children: "Traditional" }), _jsx("button", { className: `settings-format-option ${settings.formatType === 'modern' ? 'settings-format-option-active' : ''}`, onClick: () => handleFormatTypeChange('modern'), children: "Modern" })] })] }), _jsxs("div", { className: "settings-control", children: [_jsx("span", { className: "settings-label", children: "Text Alignment" }), _jsxs("div", { className: "settings-format-options", children: [_jsx("button", { className: `settings-format-option ${settings.textAlignment === 'left' || !settings.textAlignment
                                            ? 'settings-format-option-active'
                                            : ''}`, onClick: () => handleTextAlignmentChange('left'), children: "Left" }), _jsx("button", { className: `settings-format-option ${settings.textAlignment === 'right' ? 'settings-format-option-active' : ''}`, onClick: () => handleTextAlignmentChange('right'), children: "Right" }), _jsx("button", { className: `settings-format-option ${settings.textAlignment === 'justified' ? 'settings-format-option-active' : ''}`, onClick: () => handleTextAlignmentChange('justified'), children: "Justified" })] })] }), _jsxs("div", { className: "settings-control", children: [_jsx("label", { htmlFor: "note-indicators", className: "settings-label", children: "Show Note Indicators" }), _jsxs("div", { className: "settings-switch", children: [_jsx("input", { id: "note-indicators", type: "checkbox", checked: settings.showNoteIndicators !== false, onChange: handleNoteIndicatorsToggle, className: "settings-checkbox" }), _jsx("span", { className: "settings-switch-slider" })] })] })] })] }));
};
export default SettingsTab;
//# sourceMappingURL=SettingsTab.js.map