import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './FormatToggle.css';
/**
 * FormatToggle Component
 *
 * A component that allows switching between traditional and modern formatting.
 * Supports descriptions and visual previews of each format.
 */
export function FormatToggle({ currentFormat, onChange, showDescription = false, showPreview = false, traditionalLabel = 'Traditional', modernLabel = 'Modern', traditionalDescription = 'Formatting that matches the original book presentation.', modernDescription = 'Enhanced formatting optimized for digital reading.', className = '', }) {
    const handleFormatChange = (format) => {
        if (format !== currentFormat) {
            onChange(format);
        }
    };
    const containerClasses = [
        'format-toggle',
        showDescription ? 'format-toggle-with-description' : '',
        showPreview ? 'format-toggle-with-preview' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsx("div", { className: "format-toggle-header", children: _jsx("h3", { className: "format-toggle-title", children: "Content Formatting" }) }), _jsxs("div", { className: "format-toggle-options", children: [_jsxs("div", { className: `format-option ${currentFormat === 'traditional' ? 'format-option-active' : ''}`, onClick: () => handleFormatChange('traditional'), children: [_jsxs("div", { className: "format-option-header", children: [_jsx("input", { type: "radio", id: "format-traditional", name: "format", value: "traditional", checked: currentFormat === 'traditional', onChange: () => handleFormatChange('traditional'), className: "format-option-radio" }), _jsx("label", { htmlFor: "format-traditional", className: "format-option-label", children: traditionalLabel })] }), showDescription && _jsx("p", { className: "format-option-description", children: traditionalDescription }), showPreview && (_jsx("div", { className: "format-preview format-preview-traditional", children: _jsxs("div", { className: "format-preview-paragraph", children: [_jsx("span", { className: "format-preview-number", children: "1" }), _jsxs("span", { className: "format-preview-text", children: ["This is an example of ", _jsx("em", { children: "traditional" }), " formatting with standard emphasis."] })] }) }))] }), _jsxs("div", { className: `format-option ${currentFormat === 'modern' ? 'format-option-active' : ''}`, onClick: () => handleFormatChange('modern'), children: [_jsxs("div", { className: "format-option-header", children: [_jsx("input", { type: "radio", id: "format-modern", name: "format", value: "modern", checked: currentFormat === 'modern', onChange: () => handleFormatChange('modern'), className: "format-option-radio" }), _jsx("label", { htmlFor: "format-modern", className: "format-option-label", children: modernLabel })] }), showDescription && _jsx("p", { className: "format-option-description", children: modernDescription }), showPreview && (_jsx("div", { className: "format-preview format-preview-modern", children: _jsxs("div", { className: "format-preview-paragraph", children: [_jsx("span", { className: "format-preview-number", children: "1" }), _jsxs("span", { className: "format-preview-text", children: ["This is an example of ", _jsx("em", { children: "modern" }), " formatting with enhanced emphasis."] })] }) }))] })] })] }));
}
export default FormatToggle;
//# sourceMappingURL=FormatToggle.js.map