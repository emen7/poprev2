/**
 * Reader Header Component
 *
 * This component renders the header of the Enhanced Reader with navigation and settings toggles.
 */

&apos;use client';

import React from &apos;react';

import type { ReaderHeaderProps } from './types';

/**
 * Reader Header Component
 */
export function ReaderHeader({
  title,
  onNavigationToggle,
  onSettingsToggle,
  className = '',
}: ReaderHeaderProps) {
  return (
    <header className={`er-reader-header ${className}`}>
      {/* Navigation Toggle Button */}
      <button
        className="er-reader-header-button"
        onClick={onNavigationToggle}
        aria-label="Toggle navigation"
      >
        <span aria-hidden="true">☰</span>
      </button>

      {/* Title */}
      <h1 className="er-reader-title">{title}</h1>

      {/* Settings Toggle Button */}
      <button
        className="er-reader-header-button"
        onClick={onSettingsToggle}
        aria-label="Toggle settings"
      >
        <span aria-hidden="true">⚙️</span>
      </button>
    </header>
  );
}
