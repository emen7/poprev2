import React, { ReactNode, useEffect, useRef } from 'react';
import './SidePanel.css';

export interface SidePanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Callback when the panel is closed
   */
  onClose: () => void;

  /**
   * Position of the panel
   * @default 'left'
   */
  position?: 'left' | 'right';

  /**
   * Width of the panel in pixels
   * @default 300
   */
  width?: number;

  /**
   * Children content
   */
  children: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SidePanel Component
 *
 * A panel that slides in from the left or right side of the screen.
 * Includes an overlay that closes the panel when clicked.
 * @param root0
 * @param root0.isOpen
 * @param root0.onClose
 * @param root0.position
 * @param root0.width
 * @param root0.children
 * @param root0.className
 */
export function SidePanel({
  isOpen,
  onClose,
  position = 'left',
  width = 300,
  children,
  className = '',
}: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Panel classes
  const panelClasses = [
    'side-panel',
    `side-panel-${position}`,
    isOpen ? 'panel-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* Overlay */}
      <div className={`panel-overlay ${isOpen ? 'overlay-visible' : ''}`} />

      {/* Panel */}
      <div
        ref={panelRef}
        className={panelClasses}
        style={{ width: `${width}px`, [position]: isOpen ? 0 : `-${width}px` }}
      >
        <button className="panel-close-button" onClick={onClose} aria-label="Close panel">
          ×
        </button>
        <div className="panel-content">{children}</div>
      </div>
    </>
  );
}

export default SidePanel;
