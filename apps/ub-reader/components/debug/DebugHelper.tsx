'use client';

import React, { useEffect, useState } from &apos;react';
import './DebugHelper.css';

/**
 * DebugHelper Component
 *
 * This component provides debugging utilities for the UB Reader:
 * - Shows a visual indicator for the &quot;hot zone" where section titles are detected
 * - Displays current CSS variables and window dimensions
 * - Can be toggled with Ctrl+Shift+Alt+D
 */
export const DebugHelper: React.FC = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [cssVars, setCssVars] = useState<Record<string, string>>({});
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Toggle debug mode with keyboard shortcut (Ctrl+Shift+Alt+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key === &apos;D') {
        setShowDebug(prev => !prev);

        // Toggle body class for other components to react to
        if (!showDebug) {
          document.body.classList.add('show-debug');
        } else {
          document.body.classList.remove('show-debug');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Update dimensions on resize
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial dimensions

    // Collect CSS variables
    const computeVars = () => {
      const styles = getComputedStyle(document.documentElement);
      const varObj: Record<string, string> = {};

      // Get header-related variables
      ['--row1-height', '--row2-height', '--row3-height', '--header-total-height'].forEach(
        varName => {
          varObj[varName] = styles.getPropertyValue(varName).trim();
        }
      );

      setCssVars(varObj);
    };

    computeVars();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateDimensions);
      document.body.classList.remove('show-debug');
    };
  }, [showDebug]);

  if (!showDebug) return null;

  return (
    <>
      {/* Hot zone indicator line - shows where the section detection happens */}
      <div className="hot-zone-indicator" />

      {/* Debug panel with information */}
      <div className="debug-panel">
        <h3>UB Reader Debug</h3>
        <div className="debug-section">
          <h4>CSS Variables:</h4>
          <ul>
            {Object.entries(cssVars).map(([name, value]) => (
              <li key={name}>
                {name}: <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="debug-section">
          <h4>Window:</h4>
          <p>Width: {dimensions.width}px</p>
          <p>Height: {dimensions.height}px</p>
        </div>
        <div className="debug-section">
          <h4>Shortcuts:</h4>
          <p>Ctrl+Shift+Alt+S: Section Observer Debug</p>
          <p>Ctrl+Shift+Alt+D: Toggle this panel</p>
        </div>
      </div>
    </>
  );
};

export default DebugHelper;
