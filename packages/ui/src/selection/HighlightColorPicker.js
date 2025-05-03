import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './HighlightColorPicker.css';
/**
 * HighlightColorPicker Component
 *
 * A component for selecting a highlight color.
 */
export const HighlightColorPicker = ({ selectedColor = 'cyan', onColorSelect, onConfirm, onCancel, darkMode = false, className = '', }) => {
    // Define available colors - complementary colors with cyan (#00e5ff) as primary
    const colors = ['cyan', 'pink', 'orange', 'green', 'purple'];
    // Determine container classes
    const containerClasses = [
        'highlight-color-picker',
        darkMode ? 'highlight-color-picker-dark' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsx("div", { className: "highlight-color-options", children: colors.map(color => (_jsx("button", { className: `highlight-color-option highlight-color-${color} ${selectedColor === color ? 'highlight-color-selected' : ''}`, onClick: () => onColorSelect(color), "aria-label": `${color} highlight`, title: `${color} highlight` }, color))) }), _jsxs("div", { className: "highlight-controls", children: [_jsx("button", { className: "highlight-confirm", onClick: onConfirm, "aria-label": "Apply highlight", title: "Apply highlight", children: "\u2713" }), _jsx("button", { className: "highlight-cancel", onClick: onCancel, "aria-label": "Cancel highlight", title: "Cancel highlight", children: "\u2715" })] })] }));
};
export default HighlightColorPicker;
//# sourceMappingURL=HighlightColorPicker.js.map