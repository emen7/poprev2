'use client';

import React from &apos;react';

import { usePullup } from '../../contexts/PullupContext';

import type { PullupTab } from './types';
import './PullupTabs.css';

export interface PullupTabsProps {
  /**
   * The currently active tab
   */
  activeTab: PullupTab;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * PullupTabs Component
 *
 * Navigation tabs for the pullup panel.
 * Uses PullupContext for state management.
 *
 * Note: We removed the onTabSelect prop to fix Next.js serialization errors.
 * The component now uses the context directly for tab selection.
 */
export function PullupTabs({ activeTab, className = '' }: PullupTabsProps) {
  // Get pullup context
  const { activeTab: contextActiveTab, setActiveTab } = usePullup();

  // Use context values if props are not provided
  const currentActiveTab = activeTab || contextActiveTab;
  const handleTabSelect = setActiveTab;
  // Define tabs
  const tabs: { id: PullupTab; label: string; icon: string }[] = [
    { id: &apos;notes', label: &apos;Notes', icon: '📝' },
    { id: &apos;quotes', label: &apos;Quotes', icon: '💬' },
    { id: &apos;settings', label: &apos;Settings', icon: '⚙️' },
  ];

  // Determine container classes
  // Add the bottom-tabs class to allow targeting in desktop-pullup.css
  const containerClasses = ['pullup-tabs', &apos;bottom-tabs', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`pullup-tab ${currentActiveTab === tab.id ? &apos;pullup-tab-active' : ''}`}
          onClick={() => handleTabSelect(tab.id)}
          aria-selected={currentActiveTab === tab.id}
          role="tab"
        >
          <span className="pullup-tab-icon">{tab.icon}</span>
          <span className="pullup-tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default PullupTabs;
