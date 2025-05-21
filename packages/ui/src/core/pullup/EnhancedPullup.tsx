import React, { useState, useRef, useEffect } from 'react';
import './EnhancedPullup.css';
import { SnapPointIndicator } from '../indicators/SnapPointIndicator';
import { TabsComponent } from '../navigation/TabsComponent';

export type PullupTab = 'notes' | 'quotes' | 'settings' | 'search';

export interface EnhancedPullupProps {
  /**
   * Whether the pullup panel is open
   */
  isOpen: boolean;

  /**
   * The currently active tab
   */
  activeTab: PullupTab;

  /**
   * The height of the pullup panel
   */
  height: number;

  /**
   * Whether the pullup panel is in persistent mode (for large screens)
   */
  isPersistent?: boolean;

  /**
   * Function called when the pullup panel is closed
   */
  onClose?: () => void;

  /**
   * Function called when a tab is selected
   */
  onTabSelect: (tab: PullupTab) => void;

  /**
   * Function called when the height of the pullup panel changes
   */
  onHeightChange?: (height: number) => void;

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
   * Whether to enable snap points
   * @default true
   */
  enableSnapPoints?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Content for the notes tab
   */
  notesContent?: React.ReactNode;

  /**
   * Content for the quotes tab
   */
  quotesContent?: React.ReactNode;

  /**
   * Content for the settings tab
   */
  settingsContent?: React.ReactNode;

  /**
   * Content for the search tab
   */
  searchContent?: React.ReactNode;
}

/**
 * EnhancedPullup Component
 *
 * A comprehensive pullup panel with tabs for notes, quotes, settings, and search.
 * Features include snap points, drag to resize, and persistent mode for larger screens.
 *
 * @example
 * ```tsx
 * <EnhancedPullup
 *   isOpen={isOpen}
 *   activeTab="notes"
 *   height={300}
 *   onClose={() => setIsOpen(false)}
 *   onTabSelect={setActiveTab}
 *   onHeightChange={setHeight}
 *   notesContent={<NotesTab notes={notes} />}
 *   quotesContent={<QuotesTab quotes={quotes} />}
 *   settingsContent={<SettingsTab settings={settings} />}
 *   searchContent={<SearchTab onSearch={handleSearch} />}
 * />
 * ```
 */
export function EnhancedPullup({
  isOpen,
  activeTab,
  height,
  isPersistent = false,
  onClose,
  onTabSelect,
  onHeightChange,
  minHeight = 100,
  maxHeight = 600,
  enableSnapPoints = true,
  className = '',
  notesContent,
  quotesContent,
  settingsContent,
  searchContent,
}: EnhancedPullupProps) {
  // Ref for the panel element
  const panelRef = useRef<HTMLDivElement>(null);

  // Ref for the handle element
  const handleRef = useRef<HTMLDivElement>(null);

  // State for tracking drag
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // State for tracking the current height during drag
  const [currentHeight, setCurrentHeight] = useState<number>(height);

  // Snap points
  const snapPoints = {
    collapsed: minHeight,
    half: (minHeight + maxHeight) / 2,
    full: maxHeight,
  };

  // Update current height when height prop changes
  useEffect(() => {
    setCurrentHeight(height);
  }, [height]);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Snap to closest point if enableSnapPoints is true
      if (enableSnapPoints) {
        const points = Object.values(snapPoints);
        const closestPoint = points.reduce((prev, curr) => {
          return Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev;
        });
        
        setCurrentHeight(closestPoint);
        onHeightChange?.(closestPoint);
      } else {
        onHeightChange?.(currentHeight);
      }
    }
  };

  // Handle drag move
  const handleDragMove = (clientY: number) => {
    if (isDragging && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const newHeight = Math.max(minHeight, Math.min(maxHeight, window.innerHeight - clientY));
      
      setCurrentHeight(newHeight);
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientY);
  };

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  // Add and remove event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleDragEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  // Determine container classes
  const containerClasses = [
    'enhanced-pullup',
    isOpen ? 'enhanced-pullup-open' : '',
    isPersistent ? 'enhanced-pullup-persistent' : '',
    isDragging ? 'enhanced-pullup-dragging' : '',
    className,
  ].filter(Boolean).join(' ');

  // Define tab items
  const tabItems = [
    {
      id: 'notes',
      label: 'Notes',
      content: notesContent,
      disabled: !notesContent,
    },
    {
      id: 'quotes',
      label: 'Quotes',
      content: quotesContent,
      disabled: !quotesContent,
    },
    {
      id: 'settings',
      label: 'Settings',
      content: settingsContent,
      disabled: !settingsContent,
    },
    {
      id: 'search',
      label: 'Search',
      content: searchContent,
      disabled: !searchContent,
    },
  ];

  return (
    <div
      ref={panelRef}
      className={containerClasses}
      style={{
        height: `${currentHeight}px`,
        transform: isOpen ? 'translateY(0)' : `translateY(${currentHeight}px)`,
      }}
    >
      {/* Handle for dragging */}
      <div
        ref={handleRef}
        className="enhanced-pullup-handle"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="enhanced-pullup-handle-bar" />
        
        {/* Snap point indicator */}
        {enableSnapPoints && (
          <SnapPointIndicator
            currentHeight={currentHeight}
            snapPoints={snapPoints}
            className="enhanced-pullup-snap-indicator"
          />
        )}
        
        {/* Close button */}
        {onClose && (
          <button
            className="enhanced-pullup-close"
            onClick={onClose}
            aria-label="Close pullup panel"
          >
            ×
          </button>
        )}
      </div>
      
      {/* Tabs */}
      <div className="enhanced-pullup-content">
        <TabsComponent
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={(tabId) => onTabSelect(tabId as PullupTab)}
        />
        
        {/* Tab content */}
        <div className="enhanced-pullup-tab-content">
          {tabItems.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}

export default EnhancedPullup;
