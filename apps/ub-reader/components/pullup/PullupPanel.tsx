'use client';

import React, { useRef, useEffect, useState } from &apos;react';

import { usePullup } from '../../contexts/PullupContext';
import { useTheme } from '../../contexts/ThemeContext';
import './PullupPanel.css';

export interface PullupPanelProps {
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

  /**
   * Content for the tabs area
   */
  tabsContent: React.ReactNode;

  /**
   * Main content for the panel
   */
  mainContent: React.ReactNode;
}

/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 * Supports dragging, peeking, and theme-aware styling.
 * Uses PullupContext for state management instead of props.
 */
export function PullupPanel({
  minHeight = 100,
  maxHeight = 600,
  className = '',
  tabsContent,
  mainContent,
}: PullupPanelProps) {
  // Get theme context
  const { _uiTheme } = useTheme();

  // Get pullup context
  const { isOpen, height, isPersistent, closePullup, setHeight } = usePullup();

  // Local state for peeking behavior since it's not in the context
  const [isPeeking, setIsPeeking] = useState(false);

  // Ref for the panel element
  const panelRef = useRef<HTMLDivElement>(null);

  // Ref for the handle element
  const handleRef = useRef<HTMLDivElement>(null);

  // State for tracking drag
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // State for tracking the current height during drag
  const [currentHeight, setCurrentHeight] = useState<number>(height);

  // Update current height when height prop changes
  useEffect(() => {
    setCurrentHeight(height);
  }, [height]);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);

    // Notify parent of height change
    if (currentHeight !== height) {
      setHeight(currentHeight);
    }
  };

  // Handle click on the handle when in peeking state
  const handlePeekClick = () => {
    if (!isOpen && isPeeking) {
      setHeight(height);
    }
  };

  // Handle mouse move during drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && panelRef.current) {
        // We only need the panel's existence, not its dimensions
        const newHeight = window.innerHeight - e.clientY;

        // Constrain height within min and max
        const constrainedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

        setCurrentHeight(constrainedHeight);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minHeight, maxHeight, currentHeight, height]);

  // Determine panel classes
  const panelClasses = [
    &apos;pullup-panel',
    isOpen ? &apos;pullup-panel-open' : '',
    !isOpen && isPeeking ? &apos;pullup-panel-peeking' : '',
    isPersistent ? &apos;pullup-panel-persistent' : '',
    isDragging ? &apos;pullup-panel-dragging' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Calculate panel style
  const panelStyle: React.CSSProperties = {
    height: `${currentHeight}px`,
    transform: isOpen
      ? &apos;translateY(0)'
      : isPeeking
        ? &apos;translateY(calc(100% - 48px))' /* Adjust 48px based on actual tab height */
        : `translateY(${currentHeight}px)`,
  };

  return (
    <div className={panelClasses} style={panelStyle} ref={panelRef}>
      {/* Drag handle */}
      <div
        className="pullup-panel-handle"
        ref={handleRef}
        onMouseDown={handleDragStart}
        onClick={handlePeekClick}
      >
        <div className="pullup-panel-handle-icon" />
      </div>

      {/* Close button (only shown when not in persistent mode) */}
      {!isPersistent && isOpen && (
        <button className="pullup-panel-close" onClick={closePullup} aria-label="Close panel">
          ×
        </button>
      )}

      {/* Tabs content */}
      <div className="pullup-panel-tabs">{tabsContent}</div>

      {/* Main panel content */}
      <div className="pullup-panel-content">{mainContent}</div>
    </div>
  );
}

export default PullupPanel;
