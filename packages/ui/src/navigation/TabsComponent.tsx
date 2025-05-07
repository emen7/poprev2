import React from 'react';
import './TabsComponent.css';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Display label for the tab
   */
  label: string;

  /**
   * Optional icon for the tab
   */
  icon?: React.ReactNode;

  /**
   * Content to be displayed when this tab is active
   */
  content: React.ReactNode;

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

export interface TabsComponentProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[];

  /**
   * ID of the currently active tab
   */
  activeTab: string;

  /**
   * Callback when tab is changed
   */
  onTabChange: (tabId: string) => void;

  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Size of the tabs
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * TabsComponent
 *
 * A component for displaying tabs with content.
 * Supports horizontal and vertical orientations, and different sizes.
 * @param root0
 * @param root0.tabs
 * @param root0.activeTab
 * @param root0.onTabChange
 * @param root0.orientation
 * @param root0.size
 * @param root0.className
 */
export function TabsComponent({
  tabs,
  activeTab,
  onTabChange,
  orientation = 'horizontal',
  size = 'medium',
  className = '',
}: TabsComponentProps) {
  // Determine container classes
  const containerClasses = ['tabs-component', `tabs-${orientation}`, `tabs-${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className="tabs-list" role="tablist" aria-orientation={orientation}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'tab-active' : ''} ${
              tab.disabled ? 'tab-disabled' : ''
            }`}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-disabled={tab.disabled}
            tabIndex={activeTab === tab.id ? 0 : -1}
            id={`tab-${tab.id}`}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabsComponent;
