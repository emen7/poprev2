import React, { ReactNode, useState, useEffect, useRef } from 'react';
import './MultiPurposePanel.css';

export interface MultiPurposePanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Callback when the panel is closed
   */
  onClose: () => void;

  /**
   * Initial height of the panel in pixels
   * @default 300
   */
  initialHeight?: number;

  /**
   * Minimum height of the panel in pixels
   * @default 100
   */
  minHeight?: number;

  /**
   * Maximum height of the panel in pixels
   * @default 600
   */
  maxHeight?: number;

  /**
   * Tabs for the panel
   */
  tabs?: {
    id: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
  }[];

  /**
   * Children content (required for React)
   */
  children: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * MultiPurposePanel Component
 *
 * A resizable panel that slides up from the bottom of the screen.
 * Supports tabs for organizing different types of content.
 * @param root0
 * @param root0.isOpen
 * @param root0.onClose
 * @param root0.initialHeight
 * @param root0.minHeight
 * @param root0.maxHeight
 * @param root0.tabs
 * @param root0.children
 * @param root0.className
 */
export function MultiPurposePanel({
  isOpen,
  onClose,
  initialHeight = 300,
  minHeight = 100,
  maxHeight = 600,
  tabs = [],
  children,
  className = '',
}: MultiPurposePanelProps) {
  // State for panel height and active tab
  const [height, setHeight] = useState(initialHeight);
  const [activeTabId, setActiveTabId] = useState(tabs.length > 0 ? tabs[0].id : '');
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  // Reset height when panel is opened
  useEffect(() => {
    if (isOpen) {
      setHeight(initialHeight);
    }
  }, [isOpen, initialHeight]);

  // Set first tab as active when tabs change
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some(tab => tab.id === activeTabId)) {
      setActiveTabId(tabs[0].id);
    }
  }, [tabs, activeTabId]);

  // Handle mouse down for resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = height;

    // Add event listeners for dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move for resizing
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = dragStartY.current - e.clientY;
    const newHeight = Math.max(minHeight, Math.min(maxHeight, dragStartHeight.current + deltaY));
    setHeight(newHeight);
  };

  // Handle mouse up to stop resizing
  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Get active tab content
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const activeContent = activeTab?.content;

  // Panel classes
  const panelClasses = [
    'multi-purpose-panel',
    isOpen ? 'panel-open' : '',
    isDragging ? 'panel-dragging' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={panelRef} className={panelClasses} style={{ height: isOpen ? `${height}px` : '0' }}>
      {isOpen && (
        <>
          {/* Resize handle */}
          <div className="panel-resize-handle" onMouseDown={handleMouseDown}>
            <div className="handle-indicator" />
          </div>

          {/* Panel header with tabs */}
          {tabs.length > 0 && (
            <div className="panel-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`panel-tab ${activeTabId === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTabId(tab.id)}
                  aria-selected={activeTabId === tab.id}
                >
                  {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
              <button className="panel-close" onClick={onClose} aria-label="Close panel">
                ×
              </button>
            </div>
          )}

          {/* Panel content */}
          <div className="panel-content">{activeContent || children}</div>
        </>
      )}
    </div>
  );
}

export default MultiPurposePanel;
