import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useRef } from 'react';
import './SidePanel.css';
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
}) {
  const panelRef = useRef(null);
  // Handle click outside to close the panel
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
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
    const handleEscKey = event => {
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
  return _jsxs(_Fragment, {
    children: [
      showOverlay &&
        isOpen &&
        _jsx('div', {
          className: 'side-panel-overlay',
          onClick: closeOnClickOutside ? onClose : undefined,
          'aria-hidden': 'true',
        }),
      _jsx('div', {
        className: panelClasses,
        ref: panelRef,
        style: { width },
        role: 'dialog',
        'aria-modal': 'true',
        'aria-hidden': !isOpen,
        children: _jsx('div', { className: 'side-panel-content', children: children }),
      }),
    ],
  });
}
export default SidePanel;
//# sourceMappingURL=SidePanel.js.map
