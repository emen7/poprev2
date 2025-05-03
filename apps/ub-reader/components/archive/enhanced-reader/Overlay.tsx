/**
 * Overlay Component
 *
 * This component renders an overlay that covers the screen when a panel is open.
 */

&apos;use client';

import React from &apos;react';

import type { OverlayProps } from './types';

/**
 * Overlay Component
 */
export function Overlay({ onClick, className = '' }: OverlayProps) {
  return (
    <div
      className={`er-overlay er-active ${className}`}
      onClick={onClick}
      role="presentation"
      aria-hidden="true"
    />
  );
}
