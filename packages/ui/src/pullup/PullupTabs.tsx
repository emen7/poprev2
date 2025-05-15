import React, { useState } from 'react';
import './PullupTabs.css';

// Define PullupTab type locally
export type PullupTab = 'notes' | 'quotes' | 'settings' | 'search';

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
export const PullupTabs: React.FC<PullupTabsProps> = ({
  activeTab,
  onTabSelect,
  className = '',
}) => {
  // Define tabs
  const tabs: { id: PullupTab; label: string; icon: string }[] = [
    { id: 'notes', label: 'Notes', icon: '📝' },
    { id: 'quotes', label: 'Quotes', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'search', label: 'Search', icon: '🔍' },
  ];

  // State for tracking swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isSwipe = Math.abs(distance) > 50; // Minimum swipe distance

    if (isSwipe) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);

      if (distance > 0) {
        // Swipe left - go to next tab
        const nextIndex = (currentIndex + 1) % tabs.length;
        onTabSelect(tabs[nextIndex].id);
      } else {
        // Swipe right - go to previous tab
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        onTabSelect(tabs[prevIndex].id);
      }
    }

    // Reset touch coordinates
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Determine container classes
  const containerClasses = ['pullup-tabs', className].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
};

export default PullupTabs;
