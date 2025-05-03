'use client';

import React, { useEffect, useState } from &apos;react';

interface CSSVariable {
  name: string;
  value: string;
}

/**
 * Debug Helper Component
 *
 * This component helps to debug CSS variables by displaying them in a floating panel
 * when triggerred with the keyboard shortcut Ctrl+Shift+Alt+D
 */
export const DebugHelper: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cssVars, setCssVars] = useState<CSSVariable[]>([]);

  useEffect(() => {
    // Get all CSS variables from the document root
    const getCSSVariables = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const cssVariables: CSSVariable[] = [];

      // Header-related variables
      const importantVars = [
        '--row1-height',
        '--row2-height',
        '--row3-height',
        '--header-total-height',
        '--z-index-fixed',
        '--reader-container-bg',
        '--reading-area-bg',
      ];

      importantVars.forEach(varName => {
        cssVariables.push({
          name: varName,
          value: computedStyle.getPropertyValue(varName).trim(),
        });
      });

      return cssVariables;
    };

    // Toggle debug panel with Ctrl+Shift+Alt+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key === &apos;D') {
        if (!isVisible) {
          const vars = getCSSVariables();
          setCssVars(vars);
        }
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: &apos;fixed',
        bottom: &apos;20px',
        right: &apos;20px',
        zIndex: 9999,
        background: &apos;rgba(0, 0, 0, 0.8)',
        color: &apos;white',
        padding: &apos;10px',
        borderRadius: &apos;4px',
        maxWidth: &apos;400px',
        fontFamily: &apos;monospace',
        fontSize: &apos;12px',
      }}
    >
      <div style={{ marginBottom: &apos;10px', fontWeight: &apos;bold' }}>CSS Variable Debug Panel</div>
      <table style={{ borderCollapse: &apos;collapse', width: &apos;100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: &apos;left', padding: &apos;4px' }}>Variable</th>
            <th style={{ textAlign: &apos;left', padding: &apos;4px' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {cssVars.map((v, i) => (
            <tr key={i} style={{ borderTop: &apos;1px solid rgba(255, 255, 255, 0.2)' }}>
              <td style={{ padding: &apos;4px' }}>{v.name}</td>
              <td style={{ padding: &apos;4px' }}>{v.value || '(not set)'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Window dimensions */}
      <div
        style={{
          marginTop: &apos;10px',
          borderTop: &apos;1px solid rgba(255, 255, 255, 0.4)',
          paddingTop: &apos;10px',
        }}
      >
        <div>Window Width: {window.innerWidth}px</div>
        <div>Window Height: {window.innerHeight}px</div>
        <div>Device Pixel Ratio: {window.devicePixelRatio}</div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        style={{
          background: '#333',
          color: &apos;white',
          border: &apos;none',
          padding: &apos;5px 10px',
          marginTop: &apos;10px',
          cursor: &apos;pointer',
          borderRadius: &apos;3px',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default DebugHelper;
