import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './MultiPurposePanel.css';

export interface MultiPurposePanelProps {
  /**
   * The content to be rendered in the panel
   */
  children: ReactNode;

  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Function to call when the panel should be closed
   */
  onClose: () => void;

  /**
   * The initial height of the panel
   * @default 300
   */
  initialHeight?: number;

  /**
   * Function to call when the panel height changes
   */
  onHeightChange?: (height: number) => void;

  /**
   * The initial tab to be active
   */
  initialTab?: string;

  /**
   * The tabs to be displayed in the panel
   */
  tabs?: {
    id: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
  }[];

  /**
   * Whether to show an overlay behind the panel
   * @default true
   */
  showOverlay?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to close the panel when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;
}

/**
 * MultiPurposePanel Component
 *
 * A sliding panel that appears from the bottom of the screen.
 * Includes height adjustment, tab navigation, and overlay.
 */
export function MultiPurposePanel({
  children,
  isOpen,
  onClose,
  initialHeight = 300,
  onHeightChange,
  initialTab,
  tabs = [],
  showOverlay = true,
  className = '',
  closeOnClickOutside = true,
}: MultiPurposePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(initialHeight);
  const [activeTab, setActiveTab] = useState(initialTab || (tabs.length > 0 ? tabs[0].id : ''));
  const startResizeY = useRef(0);
  const startHeight = useRef(0);
  const isDragging = useRef(false);

  // Handle click outside to close the panel
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, closeOnClickOutside]);

  // Handle escape key to close the panel
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Basic resize handlers (to be enhanced in Phase 2)
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startResizeY.current = clientY;
    startHeight.current = panelHeight;
    isDragging.current = true;

    // Add document-level event listeners for move and end events
    if ('touches' in e) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleResizeEnd);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleResizeEnd);
    }

    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleResizeMove(e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleResizeMove(e.touches[0].clientY);
  };

  const handleResizeMove = (clientY: number) => {
    const delta = startResizeY.current - clientY;
    const newHeight = Math.max(
      100,
      Math.min(window.innerHeight * 0.8, startHeight.current + delta)
    );
    setPanelHeight(newHeight);

    if (onHeightChange) {
      onHeightChange(newHeight);
    }
  };

  const handleResizeEnd = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleResizeEnd);
  };

  const panelClasses = ['multi-purpose-panel', isOpen ? 'multi-purpose-panel-open' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {showOverlay && isOpen && (
        <div
          className="multi-purpose-panel-overlay"
          onClick={closeOnClickOutside ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      <div
        className={panelClasses}
        ref={panelRef}
        style={{ height: `${panelHeight}px` }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div
          className="multi-purpose-panel-resize-handle"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        >
          <div className="resize-handle-bar"></div>
        </div>

        {tabs.length > 0 ? (
          <div className="multi-purpose-panel-tabs">
            <div className="tab-navigation">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="tab-content">
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  className={`tab-pane ${activeTab === tab.id ? 'active' : ''}`}
                  role="tabpanel"
                  aria-hidden={activeTab !== tab.id}
                >
                  {tab.content}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="multi-purpose-panel-content">{children}</div>
        )}
      </div>
    </>
  );
}

export default MultiPurposePanel;
