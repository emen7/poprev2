'use client';

import React from 'react';

import { PullupTab } from './types';
import './PullupTabs.css';

export interface PullupTabsProps {
  /**
   * The currently active tab
   */
  activeTab: PullupTab;

  /**
   * Function called when a tab is selected
   */
  onTabSelect: (tab: PullupTab) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * PullupTabs Component
 *
 * Navigation tabs for the pullup panel.
 */
export function PullupTabs({ activeTab, onTabSelect, className = '' }: PullupTabsProps) {
  // Define tabs
  const tabs: { id: PullupTab; label: string; icon: string }[] = [
    { id: 'notes', label: 'Notes', icon: '📝' },
    { id: 'quotes', label: 'Quotes', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Determine container classes
  const containerClasses = ['pullup-tabs', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`pullup-tab ${activeTab === tab.id ? 'pullup-tab-active' : ''}`}
          onClick={() => onTabSelect(tab.id)}
          aria-selected={activeTab === tab.id}
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
