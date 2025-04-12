/**
 * Reader Settings Component
 *
 * This component displays a settings panel for customizing the reader experience,
 * including theme, typography, and layout options.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import './ReaderSettings.css';
/**
 * The ReaderSettings component
 */
export function ReaderSettings({
  config,
  onConfigChange,
  className = '',
  onSettingsOpen,
  onSettingsClose,
  initiallyOpen = false,
}) {
  // State for settings panel
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  // Ref for settings panel
  const settingsPanelRef = useRef(null);
  // Toggle settings panel
  const toggleSettings = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      onSettingsOpen === null || onSettingsOpen === void 0 ? void 0 : onSettingsOpen();
    } else {
      onSettingsClose === null || onSettingsClose === void 0 ? void 0 : onSettingsClose();
    }
  };
  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
        onSettingsClose === null || onSettingsClose === void 0 ? void 0 : onSettingsClose();
      }
    };
    window.document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onSettingsClose]);
  // Update theme
  const updateTheme = mode => {
    onConfigChange({
      theme: Object.assign(Object.assign({}, config.theme), { mode }),
    });
  };
  // Update typography
  const updateTypography = (property, value) => {
    onConfigChange({
      typography: Object.assign(Object.assign({}, config.typography), { [property]: value }),
    });
  };
  // Update layout
  const updateLayout = (property, value) => {
    onConfigChange({
      layout: Object.assign(Object.assign({}, config.layout), { [property]: value }),
    });
  };
  // Get extension settings components
  const extensionSettingsComponents = config.extensions
    .map(extensionId => {
      // This would be implemented to get custom settings components from extensions
      // For now, we'll return null
      return null;
    })
    .filter(Boolean);
  return _jsxs(_Fragment, {
    children: [
      _jsx('button', {
        className: 'reader-header-button reader-settings-toggle',
        onClick: toggleSettings,
        'aria-label': 'Toggle settings',
        'aria-expanded': isOpen,
        children: _jsx('i', { className: `fas ${isOpen ? 'fa-times' : 'fa-cog'}` }),
      }),
      _jsxs('div', {
        ref: settingsPanelRef,
        className: `reader-settings-panel ${isOpen ? 'open' : ''} ${className}`,
        'aria-hidden': !isOpen,
        children: [
          _jsxs('div', {
            className: 'reader-settings-section',
            children: [
              _jsx('h3', { className: 'reader-settings-title', children: 'Display Settings' }),
              _jsxs('div', {
                className: 'reader-settings-option',
                children: [
                  _jsx('h4', { className: 'reader-settings-option-title', children: 'Theme' }),
                  _jsxs('div', {
                    className: 'reader-settings-option-list',
                    children: [
                      _jsx('button', {
                        className: `reader-settings-option-button ${config.theme.mode === 'light' ? 'active' : ''}`,
                        onClick: () => updateTheme('light'),
                        children: 'Light',
                      }),
                      _jsx('button', {
                        className: `reader-settings-option-button ${config.theme.mode === 'dark' ? 'active' : ''}`,
                        onClick: () => updateTheme('dark'),
                        children: 'Dark',
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'reader-settings-option',
                children: [
                  _jsx('h4', { className: 'reader-settings-option-title', children: 'Font Size' }),
                  _jsx('div', {
                    className: 'reader-settings-option-list',
                    children: ['small', 'medium', 'large', 'x-large'].map(size =>
                      _jsx(
                        'button',
                        {
                          className: `reader-settings-option-button ${config.typography.fontSize === size ? 'active' : ''}`,
                          onClick: () => updateTypography('fontSize', size),
                          children:
                            size === 'x-large'
                              ? 'X-Large'
                              : size.charAt(0).toUpperCase() + size.slice(1),
                        },
                        size
                      )
                    ),
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'reader-settings-option',
                children: [
                  _jsx('h4', { className: 'reader-settings-option-title', children: 'Font Style' }),
                  _jsxs('div', {
                    className: 'reader-settings-option-list',
                    children: [
                      _jsx('button', {
                        className: `reader-settings-option-button ${config.typography.fontStyle === 'sans-serif' ? 'active' : ''}`,
                        onClick: () => updateTypography('fontStyle', 'sans-serif'),
                        children: 'Sans-serif',
                      }),
                      _jsx('button', {
                        className: `reader-settings-option-button ${config.typography.fontStyle === 'serif' ? 'active' : ''}`,
                        onClick: () => updateTypography('fontStyle', 'serif'),
                        children: 'Serif',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsxs('div', {
            className: 'reader-settings-section',
            children: [
              _jsx('h3', { className: 'reader-settings-title', children: 'Reading Settings' }),
              _jsxs('div', {
                className: 'reader-settings-option',
                children: [
                  _jsx('h4', {
                    className: 'reader-settings-option-title',
                    children: 'Line Spacing',
                  }),
                  _jsx('div', {
                    className: 'reader-settings-option-list',
                    children: ['compact', 'normal', 'relaxed'].map(spacing =>
                      _jsx(
                        'button',
                        {
                          className: `reader-settings-option-button ${config.typography.lineSpacing === spacing ? 'active' : ''}`,
                          onClick: () => updateTypography('lineSpacing', spacing),
                          children: spacing.charAt(0).toUpperCase() + spacing.slice(1),
                        },
                        spacing
                      )
                    ),
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'reader-settings-option',
                children: [
                  _jsx('h4', { className: 'reader-settings-option-title', children: 'Text Width' }),
                  _jsx('div', {
                    className: 'reader-settings-option-list',
                    children: ['narrow', 'medium', 'wide'].map(width =>
                      _jsx(
                        'button',
                        {
                          className: `reader-settings-option-button ${config.layout.textWidth === width ? 'active' : ''}`,
                          onClick: () => updateLayout('textWidth', width),
                          children: width.charAt(0).toUpperCase() + width.slice(1),
                        },
                        width
                      )
                    ),
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'reader-settings-option',
                children: [
                  _jsx('h4', {
                    className: 'reader-settings-option-title',
                    children: 'Paragraph Numbers',
                  }),
                  _jsxs('div', {
                    className: 'reader-settings-option-list',
                    children: [
                      _jsx('button', {
                        className: `reader-settings-option-button ${config.layout.showParagraphNumbers ? 'active' : ''}`,
                        onClick: () => updateLayout('showParagraphNumbers', true),
                        children: 'Show',
                      }),
                      _jsx('button', {
                        className: `reader-settings-option-button ${!config.layout.showParagraphNumbers ? 'active' : ''}`,
                        onClick: () => updateLayout('showParagraphNumbers', false),
                        children: 'Hide',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          config.extensions.length > 0 &&
            _jsxs('div', {
              className: 'reader-settings-section',
              children: [
                _jsx('h3', { className: 'reader-settings-title', children: 'Extension Settings' }),
                config.extensions.map(extensionId => {
                  // This would render extension-specific settings
                  // For now, we'll just render a placeholder
                  return _jsxs(
                    'div',
                    {
                      className: 'reader-settings-option',
                      children: [
                        _jsx('h4', {
                          className: 'reader-settings-option-title',
                          children: extensionId,
                        }),
                        _jsx('p', {
                          className: 'reader-settings-description',
                          children: 'Extension-specific settings would appear here.',
                        }),
                      ],
                    },
                    extensionId
                  );
                }),
              ],
            }),
        ],
      }),
      _jsx('div', {
        className: `reader-overlay ${isOpen ? 'active' : ''}`,
        onClick: () => {
          setIsOpen(false);
          onSettingsClose === null || onSettingsClose === void 0 ? void 0 : onSettingsClose();
        },
      }),
    ],
  });
}
//# sourceMappingURL=ReaderSettings.js.map
