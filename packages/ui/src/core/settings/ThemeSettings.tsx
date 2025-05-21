import React from 'react';
import { ThemeToggle } from '../toggles/ThemeToggle';
import { TextAlignmentToggle } from '../toggles/TextAlignmentToggle';
import { TextAlignment } from '../../contexts/ThemeContext';

export interface ThemeSettingsProps {
  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to show labels next to icons
   */
  showLabels?: boolean;

  /**
   * Whether to show the system theme option
   */
  showSystemOption?: boolean;

  /**
   * Which text alignment options to show
   */
  alignmentOptions?: TextAlignment[];

  /**
   * Whether to show the theme toggle
   */
  showThemeToggle?: boolean;

  /**
   * Whether to show the text alignment toggle
   */
  showAlignmentToggle?: boolean;
}

/**
 * ThemeSettings Component
 *
 * A component that combines theme and text alignment controls.
 */
export const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  className = '',
  showLabels = true,
  showSystemOption = true,
  alignmentOptions = ['left', 'justify', 'right'],
  showThemeToggle = true,
  showAlignmentToggle = true,
}) => {
  return (
    <div className={`theme-settings ${className}`}>
      {showThemeToggle && (
        <div className="theme-settings-section">
          <h3 className="theme-settings-heading">Theme</h3>
          <ThemeToggle showLabels={showLabels} showSystemOption={showSystemOption} />
        </div>
      )}

      {showAlignmentToggle && (
        <div className="theme-settings-section">
          <h3 className="theme-settings-heading">Text Alignment</h3>
          <TextAlignmentToggle showLabels={showLabels} options={alignmentOptions} />
        </div>
      )}

      <style jsx>{`
        .theme-settings {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
          background-color: var(--color-surface);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border);
        }

        .theme-settings-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .theme-settings-heading {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
};

export default ThemeSettings;
