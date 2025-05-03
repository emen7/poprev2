'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme } from '../contexts/ThemeContext';
import '../styles/themes/global.css';
import '../styles/theme-transitions.css';
/**
 * Enhanced Settings Panel Component with UI and Content Theme options
 */
export function ThemeSettingsPanel({ isOpen, onClose, className = '', inline = false, }) {
    const { uiTheme, setUITheme, contentTheme, setContentTheme, isThemeTransitioning } = useTheme();
    // If inline mode is enabled, render without the panel wrapper
    if (inline) {
        return _jsx("div", { className: `settings-content ${className}`, children: renderSettingsContent() });
    }
    return (_jsxs("aside", { className: `settings-panel ${isOpen ? 'panel-open' : ''} ${className} ${isThemeTransitioning ? 'theme-transitioning' : ''}`, "aria-hidden": !isOpen, role: "complementary", children: [_jsxs("div", { className: "panel-header", children: [_jsx("h2", { className: "panel-title", children: "Settings" }), _jsx("button", { className: "panel-close-button", onClick: onClose, "aria-label": "Close settings", children: _jsx("span", { "aria-hidden": "true", children: "\u2715" }) })] }), _jsx("div", { className: "panel-content", children: renderSettingsContent() }), _jsx("style", { jsx: true, children: `
        .settings-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 350px;
          background-color: var(--color-bg-primary);
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform var(--transition-normal);
          z-index: var(--z-index-modal);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .panel-open {
          transform: translateX(0);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--color-border-primary);
        }

        .panel-title {
          margin: 0;
          font-size: var(--font-size-lg);
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .panel-close-button {
          background: none;
          border: none;
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: var(--spacing-xs);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: background-color var(--transition-fast);
        }

        .panel-close-button:hover {
          background-color: var(--color-bg-secondary);
        }

        .panel-content {
          flex: 1;
          padding: var(--spacing-md);
          overflow-y: auto;
        }

        .settings-content {
          color: var(--color-text-primary);
        }

        @media (width <= 768px) {
          .settings-panel {
            width: 100%;
          }
        }
      ` })] }));
    // Helper function to render settings content
    function renderSettingsContent() {
        return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "settings-option", children: [_jsx("h3", { className: "settings-option-title", children: "Display Theme" }), _jsxs("div", { className: "settings-option-buttons", children: [_jsx("button", { className: `settings-option-button ${uiTheme === 'light' ? 'active' : ''}`, onClick: () => setUITheme('light'), "aria-pressed": uiTheme === 'light', children: "Light" }), _jsx("button", { className: `settings-option-button ${uiTheme === 'dark' ? 'active' : ''}`, onClick: () => setUITheme('dark'), "aria-pressed": uiTheme === 'dark', children: "Dark" }), _jsx("button", { className: `settings-option-button ${uiTheme === 'high-contrast' ? 'active' : ''}`, onClick: () => setUITheme('high-contrast'), "aria-pressed": uiTheme === 'high-contrast', children: "High Contrast" })] })] }), _jsxs("div", { className: "settings-option", children: [_jsx("h3", { className: "settings-option-title", children: "Content Formatting" }), _jsxs("div", { className: "settings-option-buttons", children: [_jsx("button", { className: `settings-option-button ${contentTheme === 'modern' ? 'active' : ''}`, onClick: () => setContentTheme('modern'), "aria-pressed": contentTheme === 'modern', children: "Modern" }), _jsx("button", { className: `settings-option-button ${contentTheme === 'traditional' ? 'active' : ''}`, onClick: () => setContentTheme('traditional'), "aria-pressed": contentTheme === 'traditional', children: "Traditional" })] }), _jsx("div", { className: "settings-option-description", children: _jsx("p", { className: "settings-option-help-text", children: contentTheme === 'modern' ? (_jsxs(_Fragment, { children: [_jsx("strong", { children: "Modern:" }), " Optimized for digital reading with improved list formatting, sans-serif fonts, and visual indicators for topic changes."] })) : (_jsxs(_Fragment, { children: [_jsx("strong", { children: "Traditional:" }), " Matches the original book's presentation with serif fonts and traditional paragraph formatting."] })) }) })] }), _jsxs("div", { className: "settings-option", children: [_jsx("h3", { className: "settings-option-title", children: "Font Size" }), _jsxs("div", { className: "settings-option-buttons", children: [_jsx("button", { className: "settings-option-button", children: "Small" }), _jsx("button", { className: "settings-option-button active", children: "Medium" }), _jsx("button", { className: "settings-option-button", children: "Large" }), _jsx("button", { className: "settings-option-button", children: "X-Large" })] })] }), _jsxs("div", { className: "settings-option", children: [_jsx("h3", { className: "settings-option-title", children: "Line Spacing" }), _jsxs("div", { className: "settings-option-buttons", children: [_jsx("button", { className: "settings-option-button", children: "Compact" }), _jsx("button", { className: "settings-option-button active", children: "Normal" }), _jsx("button", { className: "settings-option-button", children: "Relaxed" })] })] }), _jsxs("div", { className: "settings-option", children: [_jsx("h3", { className: "settings-option-title", children: "Paragraph Numbers" }), _jsxs("div", { className: "settings-option-buttons", children: [_jsx("button", { className: "settings-option-button", children: "Show" }), _jsx("button", { className: "settings-option-button active", children: "Hide" })] })] }), _jsx("style", { jsx: true, children: `
          .settings-option {
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            border-bottom: 1px solid var(--color-border-secondary);
          }

          .settings-option:last-child {
            border-bottom: none;
          }

          .settings-option-title {
            margin: 0 0 var(--spacing-sm);
            font-size: var(--font-size-md);
            font-weight: 500;
            color: var(--color-text-primary);
          }

          .settings-option-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-xs);
            margin-bottom: var(--spacing-sm);
          }

          .settings-option-button {
            padding: var(--spacing-xs) var(--spacing-sm);
            background-color: var(--color-bg-secondary);
            border: 1px solid var(--color-border-primary);
            border-radius: var(--radius-sm);
            color: var(--color-text-primary);
            font-size: var(--font-size-sm);
            cursor: pointer;
            transition:
              background-color var(--transition-fast),
              border-color var(--transition-fast);
          }

          .settings-option-button:hover {
            background-color: var(--color-bg-tertiary);
          }

          .settings-option-button.active {
            background-color: var(--color-accent-primary);
            color: white;
            border-color: var(--color-accent-primary);
          }

          .settings-option-description {
            margin-top: var(--spacing-sm);
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
          }

          .settings-option-help-text {
            margin: 0;
            line-height: var(--line-height-normal);
          }
        ` })] }));
    }
}
export default ThemeSettingsPanel;
//# sourceMappingURL=ThemeSettingsPanel.js.map