import React from 'react';
import { useTheme, ThemeMode } from '../../contexts/ThemeContext';

export interface ThemeToggleProps {
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
}

/**
 * ThemeToggle Component
 *
 * A component that allows users to toggle between dark, light, and system themes.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabels = true,
  showSystemOption = true,
}) => {
  const { themeMode, setThemeMode } = useTheme();

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return (
    <div className={`theme-toggle ${className}`}>
      <div className="theme-toggle-buttons">
        <button
          type="button"
          className={`theme-toggle-button ${themeMode === 'dark' ? 'active' : ''}`}
          onClick={() => handleThemeChange('dark')}
          aria-label="Dark theme"
          title="Dark theme"
        >
          <span className="theme-toggle-icon">🌙</span>
          {showLabels && <span className="theme-toggle-label">Dark</span>}
        </button>

        <button
          type="button"
          className={`theme-toggle-button ${themeMode === 'light' ? 'active' : ''}`}
          onClick={() => handleThemeChange('light')}
          aria-label="Light theme"
          title="Light theme"
        >
          <span className="theme-toggle-icon">☀️</span>
          {showLabels && <span className="theme-toggle-label">Light</span>}
        </button>

        {showSystemOption && (
          <button
            type="button"
            className={`theme-toggle-button ${themeMode === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
            aria-label="System theme"
            title="System theme"
          >
            <span className="theme-toggle-icon">💻</span>
            {showLabels && <span className="theme-toggle-label">System</span>}
          </button>
        )}
      </div>

      <style jsx>{`
        .theme-toggle {
          display: inline-flex;
          align-items: center;
        }

        .theme-toggle-buttons {
          display: flex;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }

        .theme-toggle-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.75rem;
          background: var(--color-surface);
          color: var(--color-text-primary);
          border: none;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .theme-toggle-button:hover {
          background-color: var(--color-primary-hover);
          color: white;
        }

        .theme-toggle-button.active {
          background-color: var(--color-primary);
          color: white;
        }

        .theme-toggle-icon {
          font-size: 1rem;
          margin-right: ${showLabels ? '0.5rem' : '0'};
        }

        .theme-toggle-label {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default ThemeToggle;
