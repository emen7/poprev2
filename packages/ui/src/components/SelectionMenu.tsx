import React, { useEffect, useRef, useState } from 'react';
import './SelectionMenu.css';

export type SelectionAction = 'highlight' | 'note' | 'quote' | 'cancel';

export interface SelectionMenuProps {
  /**
   * Whether the menu is visible
   */
  isVisible: boolean;
  
  /**
   * Position of the menu
   */
  position?: { x: number; y: number };
  
  /**
   * Handler for when an action is selected
   */
  onActionSelect?: (action: SelectionAction) => void;
  
  /**
   * Handler for when the menu is closed
   */
  onClose?: () => void;
  
  /**
   * Available actions to show in the menu
   * @default ['highlight', 'note', 'quote', 'cancel']
   */
  availableActions?: SelectionAction[];
  
  /**
   * CSS class name for the menu container
   */
  className?: string;
}

/**
 * SelectionMenu Component
 * 
 * A menu that appears when text is selected, offering options like highlight, note, quote, and cancel.
 */
export const SelectionMenu: React.FC<SelectionMenuProps> = ({
  isVisible,
  position,
  onActionSelect,
  onClose,
  availableActions = ['highlight', 'note', 'quote', 'cancel'],
  className = '',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  
  // Update menu position when position prop changes
  useEffect(() => {
    if (position) {
      setMenuPosition(position);
    }
  }, [position]);
  
  // Handle click outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isVisible) {
        onClose?.();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);
  
  // Handle action selection
  const handleActionClick = (action: SelectionAction) => {
    onActionSelect?.(action);
    if (action === 'cancel') {
      onClose?.();
    }
  };
  
  // If menu is not visible, don't render anything
  if (!isVisible) {
    return null;
  }
  
  // Combine class names
  const containerClasses = ['selection-menu', className]
    .filter(Boolean)
    .join(' ');
  
  // Define action icons and labels
  const actionConfig: Record<SelectionAction, { icon: string; label: string }> = {
    highlight: { icon: '🖌️', label: 'Highlight' },
    note: { icon: '📝', label: 'Note' },
    quote: { icon: '💬', label: 'Quote' },
    cancel: { icon: '✕', label: 'Cancel' },
  };
  
  return (
    <div
      ref={menuRef}
      className={containerClasses}
      style={{
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
      }}
    >
      <div className="selection-menu-actions">
        {availableActions.map((action) => (
          <button
            key={action}
            className="selection-menu-action"
            onClick={() => handleActionClick(action)}
            aria-label={actionConfig[action].label}
          >
            <span className="selection-menu-action-icon">{actionConfig[action].icon}</span>
            <span className="selection-menu-action-label">{actionConfig[action].label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectionMenu;
