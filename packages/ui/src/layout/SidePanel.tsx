import React, { ReactNode, useEffect, useRef } from 'react';
import './SidePanel.css';

export interface SidePanelProps {
  /**
   * The content to be rendered in the side panel
   */
  children: ReactNode;

  /**
   * Whether the side panel is open
   */
  isOpen: boolean;

  /**
   * Function to call when the side panel should be closed
   */
  onClose: () => void;

  /**
   * The position of the side panel
   * @default 'left'
   */
  position?: 'left' | 'right';

  /**
   * The width of the side panel
   * @default '300px'
   */
  width?: string;

  /**
   * Whether to show an overlay behind the side panel
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
 * SidePanel Component
 *
 * A sliding panel that can be positioned on the left or right side of the screen.
 * Includes overlay and click-outside behavior.
 */
export function SidePanel({
  children,
  isOpen,
  onClose,
  position = 'left',
  width = '300px',
  showOverlay = true,
  className = '',
  closeOnClickOutside = true,
}: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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

  const panelClasses = [
    'side-panel',
    `side-panel-${position}`,
    isOpen ? 'side-panel-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {showOverlay && isOpen && (
        <div
          className="side-panel-overlay"
          onClick={closeOnClickOutside ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      <div
        className={panelClasses}
        ref={panelRef}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="side-panel-content">{children}</div>
      </div>
    </>
  );
}

export default SidePanel;
