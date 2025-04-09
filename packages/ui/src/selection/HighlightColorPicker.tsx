import React from 'react';
import './HighlightColorPicker.css';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

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
export const HighlightColorPicker: React.FC<HighlightColorPickerProps> = ({
  selectedColor = 'yellow',
  onColorSelect,
  onConfirm,
  onCancel,
  darkMode = false,
  className = '',
}) => {
  // Define available colors
  const colors: HighlightColor[] = ['yellow', 'green', 'blue', 'pink', 'purple'];

  // Determine container classes
  const containerClasses = [
    'highlight-color-picker',
    darkMode ? 'highlight-color-picker-dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className="highlight-color-options">
        {colors.map(color => (
          <button
            key={color}
            className={`highlight-color-option highlight-color-${color} ${
              selectedColor === color ? 'highlight-color-selected' : ''
            }`}
            onClick={() => onColorSelect(color)}
            aria-label={`${color} highlight`}
            title={`${color} highlight`}
          />
        ))}
      </div>
      <div className="highlight-controls">
        <button
          className="highlight-confirm"
          onClick={onConfirm}
          aria-label="Apply highlight"
          title="Apply highlight"
        >
          ✓
        </button>
        <button
          className="highlight-cancel"
          onClick={onCancel}
          aria-label="Cancel highlight"
          title="Cancel highlight"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default HighlightColorPicker;
