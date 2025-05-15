'use client';

import React, { useRef, useEffect, useState } from 'react';
import { SnapPointIndicator } from './SnapPointIndicator';
import './PullupPanel.css';

export interface PullupPanelProps {
  /**
   * Whether the pullup panel is open
   */
  isOpen: boolean;

  /**
   * The height of the pullup panel
   */
  height: number;

  /**
   * Whether the pullup panel is in persistent mode (for large screens)
   */
  isPersistent: boolean;

  /**
   * Function called when the pullup panel is closed
   */
  onClose?: () => void;

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
   * Additional CSS class name
   */
  className?: string;

  /**
   * Children to render inside the pullup panel
   */
  children: React.ReactNode;

  /**
   * Whether to enable snap points
   * @default true
   */
  enableSnapPoints?: boolean;
}

/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 */
export function PullupPanel({
  isOpen,
  height,
  isPersistent,
  onClose,
  onHeightChange,
  minHeight = 100,
  maxHeight = 600,
  className = '',
  children,
  enableSnapPoints = true,
}: PullupPanelProps) {
  // Ref for the panel element
  const panelRef = useRef<HTMLDivElement>(null);

  // Ref for the handle element
  const handleRef = useRef<HTMLDivElement>(null);

  // State for tracking drag
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // State for tracking the current height during drag
  const [currentHeight, setCurrentHeight] = useState<number>(height);

  // Define snap points
  const snapPoints = {
    collapsed: minHeight,
    half: Math.floor((maxHeight - minHeight) / 2 + minHeight),
    full: maxHeight,
  };

  // Update current height when height prop changes
  useEffect(() => {
    setCurrentHeight(height);
  }, [height]);

  // State for tracking double tap
  const [lastTapTime, setLastTapTime] = useState<number>(0);

  // Handle drag start
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle double tap to cycle through snap points
  const handleTap = () => {
    if (!enableSnapPoints || isPersistent) return;

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms

    if (now - lastTapTime < DOUBLE_TAP_DELAY) {
      // This is a double tap
      cycleSnapPoints();
    }

    setLastTapTime(now);
  };

  // Cycle through snap points (collapsed -> half -> full -> collapsed)
  const cycleSnapPoints = () => {
    const snapPointValues = Object.values(snapPoints);
    const currentSnapPoint = getClosestSnapPoint(currentHeight);
    const currentIndex = snapPointValues.indexOf(currentSnapPoint);
    const nextIndex = (currentIndex + 1) % snapPointValues.length;
    const nextHeight = snapPointValues[nextIndex];

    setCurrentHeight(nextHeight);

    if (onHeightChange) {
      onHeightChange(nextHeight);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);

    // Snap to closest snap point if enabled
    if (enableSnapPoints && !isPersistent) {
      const snapHeight = getClosestSnapPoint(currentHeight);
      setCurrentHeight(snapHeight);

      // Notify parent of height change
      if (onHeightChange) {
        onHeightChange(snapHeight);
      }
    } else if (onHeightChange && currentHeight !== height) {
      // Notify parent of height change without snapping
      onHeightChange(currentHeight);
    }
  };

  // Get closest snap point
  const getClosestSnapPoint = (height: number): number => {
    const snapPointValues = Object.values(snapPoints);
    return snapPointValues.reduce((prev, curr) => {
      return Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev;
    });
  };

  // Handle mouse move during drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && panelRef.current) {
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

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && panelRef.current) {
        const newHeight = window.innerHeight - e.touches[0].clientY;

        // Constrain height within min and max
        const constrainedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

        setCurrentHeight(constrainedHeight);
      }
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, minHeight, maxHeight, currentHeight, height]);

  // Determine panel classes
  const panelClasses = [
    'pullup-panel',
    isOpen ? 'pullup-panel-open' : '',
    isPersistent ? 'pullup-panel-persistent' : '',
    isDragging ? 'pullup-panel-dragging' : '',
    // Add class for snap points
    enableSnapPoints ? 'pullup-panel-with-snap-points' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Calculate panel style
  const panelStyle: React.CSSProperties = {
    height: `${currentHeight}px`,
    transform: isOpen ? 'translateY(0)' : `translateY(${currentHeight}px)`,
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.15)', // Enhanced shadow for depth
  };

  return (
    <div className={panelClasses} style={panelStyle} ref={panelRef}>
      {/* Drag handle */}
      <div
        className="pullup-panel-handle"
        ref={handleRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={handleTap}
      >
        <div className="pullup-panel-handle-icon"></div>

        {/* Snap point indicators (only shown when snap points are enabled) */}
        {enableSnapPoints && !isPersistent && (
          <SnapPointIndicator currentHeight={currentHeight} snapPoints={snapPoints} />
        )}
      </div>

      {/* Close button (only shown when not in persistent mode) */}
      {!isPersistent && (
        <button className="pullup-panel-close" onClick={onClose} aria-label="Close panel">
          ×
        </button>
      )}

      {/* Panel content */}
      <div className="pullup-panel-content">{children}</div>
    </div>
  );
}

export default PullupPanel;
