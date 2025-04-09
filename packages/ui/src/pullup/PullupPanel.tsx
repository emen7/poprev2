import React, { useRef, useEffect, useState } from 'react';
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
}

/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 */
export const PullupPanel: React.FC<PullupPanelProps> = ({
  isOpen,
  height,
  isPersistent,
  onClose,
  onHeightChange,
  minHeight = 100,
  maxHeight = 600,
  className = '',
  children,
}) => {
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
    if (onHeightChange && currentHeight !== height) {
      onHeightChange(currentHeight);
    }
  };

  // Handle mouse move during drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && panelRef.current) {
        const panelRect = panelRef.current.getBoundingClientRect();
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
  }, [isDragging, minHeight, maxHeight, onHeightChange, height]);

  // Determine panel classes
  const panelClasses = [
    'pullup-panel',
    isOpen ? 'pullup-panel-open' : '',
    isPersistent ? 'pullup-panel-persistent' : '',
    isDragging ? 'pullup-panel-dragging' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Calculate panel style
  const panelStyle: React.CSSProperties = {
    height: `${currentHeight}px`,
    transform: isOpen ? 'translateY(0)' : `translateY(${currentHeight}px)`,
  };

  return (
    <div className={panelClasses} style={panelStyle} ref={panelRef}>
      {/* Drag handle */}
      <div className="pullup-panel-handle" ref={handleRef} onMouseDown={handleDragStart}>
        <div className="pullup-panel-handle-icon"></div>
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
};

export default PullupPanel;
