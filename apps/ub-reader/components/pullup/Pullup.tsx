'use client';

import React from &apos;react';

import { usePullup } from '../../contexts/PullupContext';

import { PullupContent } from './PullupContent';
import { PullupPanel } from './PullupPanel';
import { PullupTabs } from './PullupTabs';
import './Pullup.css';

export interface PullupProps {
  /**
   * The minimum height of the pullup panel
   * @default 100
   */
  minHeight?: number;

  /**
   * The maximum height of the pullup panel
   * @default 600
   */
  maxHeight?: number;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Pullup Component
 *
 * A component that combines all pullup components into a single component.
 * Uses PullupContext for state management instead of props.
 */
export function Pullup({ minHeight = 100, maxHeight = 600, className = '' }: PullupProps) {
  const { isOpen, activeTab, height, isPersistent, closePullup, setActiveTab, setHeight } =
    usePullup();

  // Determine container classes
  const containerClasses = ['pullup', className].filter(Boolean).join(' ');

  // Log to identify serialization issues
  // Removed console.log
  // Removed console.log

  return (
    <div className={containerClasses}>
      <PullupPanel
        minHeight={minHeight}
        maxHeight={maxHeight}
        tabsContent={<PullupTabs activeTab={activeTab} />}
        mainContent={<PullupContent />}
        className={className}
      />
    </div>
  );
}

export default Pullup;
