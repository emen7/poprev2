import React from 'react';
import './HighlightColorPicker.css';
export type HighlightColor = 'cyan' | 'pink' | 'orange' | 'green' | 'purple';
export interface HighlightColorPickerProps {
    /**
     * The currently selected color
     */
    selectedColor?: HighlightColor;
    /**
     * Function called when a color is selected
     */
    onColorSelect: (color: HighlightColor) => void;
    /**
     * Function called when the highlight action is confirmed
     */
    onConfirm: () => void;
    /**
     * Function called when the highlight action is cancelled
     */
    onCancel: () => void;
    /**
     * Whether the component is in dark mode
     */
    darkMode?: boolean;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * HighlightColorPicker Component
 *
 * A component for selecting a highlight color.
 */
export declare const HighlightColorPicker: React.FC<HighlightColorPickerProps>;
export default HighlightColorPicker;
//# sourceMappingURL=HighlightColorPicker.d.ts.map