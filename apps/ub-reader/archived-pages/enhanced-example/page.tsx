/**
 * Enhanced Reader Example Page
 *
 * This page demonstrates the Enhanced Reader component with navigation and settings.
 */

'use client';

import React from 'react';

import { EnhancedReader } from '../../components/archive/enhanced-reader';

/**
 * Enhanced Example Page Component
 */
export default function EnhancedExamplePage() {
  return (
    <EnhancedReader title="Enhanced Reader Example">
      <h2>Welcome to the Enhanced Reader</h2>

      <p>
        This is an example of the Enhanced Reader component with improved navigation and settings
        features. The component provides a modern, responsive interface for reading content.
      </p>

      <h3>Key Features</h3>

      <ul>
        <li>
          <strong>Navigation Panel</strong> - Click the hamburger menu (☰) in the top-left corner
          to open the navigation panel.
        </li>
        <li>
          <strong>Settings Panel</strong> - Click the gear icon (⚙️) in the top-right corner to open
          the settings panel.
        </li>
        <li>
          <strong>Theme Switching</strong> - Change between light and dark themes in the settings
          panel.
        </li>
        <li>
          <strong>Responsive Design</strong> - The interface adapts to different screen sizes.
        </li>
      </ul>

      <h3>Sample Content</h3>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
        tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl
        eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
      </p>

      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <h3>Future Enhancements</h3>

      <p>In future updates, the Enhanced Reader will include:</p>

      <ul>
        <li>Font size and style options</li>
        <li>Line spacing and text width controls</li>
        <li>Hierarchical navigation with parts, papers, and sections</li>
        <li>Extension support for specialized features</li>
      </ul>

      <h3>Try It Out</h3>

      <p>
        Click the hamburger menu (☰) and gear icon (⚙️) to explore the navigation and settings
        panels. Try switching between light and dark themes to see how the interface adapts.
      </p>
    </EnhancedReader>
  );
}
