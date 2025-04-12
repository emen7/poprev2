'use client';

import React from 'react';

import { useTheme } from '../contexts/ThemeContext';

interface UBSectionDividerProps {
  className?: string;
}

/**
 * Component for displaying a section divider with support for Modern and Traditional themes
 * In Modern theme, this shows a faint line to indicate a change of direction
 * In Traditional theme, this is hidden (extra spacing is applied to paragraphs instead)
 */
export const UBSectionDivider: React.FC<UBSectionDividerProps> = ({ className = '' }) => {
  // Try to use the ThemeContext, but provide a fallback if it's not available
  // We get the theme but don't directly use the variable - it affects the styling through CSS variables
  try {
    useTheme(); // This ensures the theme context is available and CSS variables are set
  } catch (_) {
    // ThemeContext not available, use default theme (traditional)
    // Silent catch - no need for console logs in production code
  }

  // Apply appropriate classes based on the content theme
  const dividerClasses = ['ub-section-divider', className].filter(Boolean).join(' ');

  return <hr className={dividerClasses} />;
};

export default UBSectionDivider;
