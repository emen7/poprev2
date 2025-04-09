import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import './MultiPurposePanel.css';
/**
 * MultiPurposePanel Component
 *
 * A sliding panel that appears from the bottom of the screen.
 * Includes height adjustment, tab navigation, and overlay.
 */
export function MultiPurposePanel({ children, isOpen, onClose, initialHeight = 300, onHeightChange, initialTab, tabs = [], showOverlay = true, className = '', closeOnClickOutside = true, }) {
    const panelRef = useRef(null);
    const [panelHeight, setPanelHeight] = useState(initialHeight);
    const [activeTab, setActiveTab] = useState(initialTab || (tabs.length > 0 ? tabs[0].id : ''));
    const startResizeY = useRef(0);
    const startHeight = useRef(0);
    const isDragging = useRef(false);
    // Handle click outside to close the panel
    useEffect(() => {
        if (!isOpen || !closeOnClickOutside)
            return;
        const handleClickOutside = (event) => {
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
        if (!isOpen)
            return;
        const handleEscKey = (event) => {
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
    const handleResizeStart = (e) => {
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        startResizeY.current = clientY;
        startHeight.current = panelHeight;
        isDragging.current = true;
        // Add document-level event listeners for move and end events
        if ('touches' in e) {
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleResizeEnd);
        }
        else {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleResizeEnd);
        }
        // Prevent default to avoid text selection during drag
        e.preventDefault();
    };
    const handleMouseMove = (e) => {
        if (!isDragging.current)
            return;
        handleResizeMove(e.clientY);
    };
    const handleTouchMove = (e) => {
        if (!isDragging.current)
            return;
        handleResizeMove(e.touches[0].clientY);
    };
    const handleResizeMove = (clientY) => {
        const delta = startResizeY.current - clientY;
        const newHeight = Math.max(100, Math.min(window.innerHeight * 0.8, startHeight.current + delta));
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
    return (_jsxs(_Fragment, { children: [showOverlay && isOpen && (_jsx("div", { className: "multi-purpose-panel-overlay", onClick: closeOnClickOutside ? onClose : undefined, "aria-hidden": "true" })), _jsxs("div", { className: panelClasses, ref: panelRef, style: { height: `${panelHeight}px` }, role: "dialog", "aria-modal": "true", "aria-hidden": !isOpen, children: [_jsx("div", { className: "multi-purpose-panel-resize-handle", onMouseDown: handleResizeStart, onTouchStart: handleResizeStart, children: _jsx("div", { className: "resize-handle-bar" }) }), tabs.length > 0 ? (_jsxs("div", { className: "multi-purpose-panel-tabs", children: [_jsx("div", { className: "tab-navigation", children: tabs.map(tab => (_jsxs("button", { className: `tab-button ${activeTab === tab.id ? 'active' : ''}`, onClick: () => setActiveTab(tab.id), "aria-selected": activeTab === tab.id, children: [tab.icon && _jsx("span", { className: "tab-icon", children: tab.icon }), _jsx("span", { className: "tab-label", children: tab.label })] }, tab.id))) }), _jsx("div", { className: "tab-content", children: tabs.map(tab => (_jsx("div", { className: `tab-pane ${activeTab === tab.id ? 'active' : ''}`, role: "tabpanel", "aria-hidden": activeTab !== tab.id, children: tab.content }, tab.id))) })] })) : (_jsx("div", { className: "multi-purpose-panel-content", children: children }))] })] }));
}
export default MultiPurposePanel;
//# sourceMappingURL=MultiPurposePanel.js.map