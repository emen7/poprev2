/**
 * Overlay Component
 *
 * This component renders an overlay that covers the screen when a panel is open.
 */

'use client';

import React from 'react';

import { OverlayProps } from './types';

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
