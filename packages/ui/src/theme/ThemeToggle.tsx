import React from 'react';
import './ThemeToggle.css';

export interface ThemeOption {
  /**
   * Unique identifier for the theme
   */
  id: string;

  /**
   * Display name for the theme
   */
  label: string;

  /**
   * Representative color for the theme
   */
  color: string;

  /**
   * Optional icon for the theme
   */
  icon?: React.ReactNode;
}

export interface ThemeToggleProps {
  /**
   * Array of available themes
   */
  themes: ThemeOption[];

  /**
   * ID of the currently active theme
   */
  currentTheme: string;

  /**
   * Callback when theme is changed
   */
  onChange: (themeId: string) => void;

  /**
   * Whether to show theme labels
   * @default true
   */
  showLabels?: boolean;

  /**
   * Size of the toggle
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ThemeToggle Component
 *
 * A component for switching between different themes.
 * Displays theme options as color swatches with optional labels.
 * @param root0
 * @param root0.themes
 * @param root0.currentTheme
 * @param root0.onChange
 * @param root0.showLabels
 * @param root0.size
 * @param root0.className
 */
export function ThemeToggle({
  themes,
  currentTheme,
  onChange,
  showLabels = true,
  size = 'medium',
  className = '',
}: ThemeToggleProps) {
  // Determine container classes
  const containerClasses = ['theme-toggle', `theme-toggle-${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {themes.map(theme => (
        <div
          key={theme.id}
          className={`theme-option ${currentTheme === theme.id ? 'theme-option-selected' : ''}`}
          onClick={() => onChange(theme.id)}
          role="button"
          tabIndex={0}
          aria-pressed={currentTheme === theme.id}
          aria-label={`${theme.label} theme`}
        >
          <div
            className="theme-preview"
            style={{ backgroundColor: theme.color }}
            aria-hidden="true"
          >
            {theme.icon}
          </div>
          {showLabels && <span className="theme-label">{theme.label}</span>}
        </div>
      ))}
    </div>
  );
}

export default ThemeToggle;
