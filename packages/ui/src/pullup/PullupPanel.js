import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import './PullupPanel.css';
/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 */
export const PullupPanel = ({ isOpen, height, isPersistent, onClose, onHeightChange, minHeight = 40, maxHeight = 600, className = '', children, }) => {
    // Ref for the panel element
    const panelRef = useRef(null);
    // Ref for the handle element
    const handleRef = useRef(null);
    // State for tracking drag
    const [isDragging, setIsDragging] = useState(false);
    // State for tracking the current height during drag
    const [currentHeight, setCurrentHeight] = useState(height);
    // Update current height when height prop changes
    useEffect(() => {
        setCurrentHeight(height);
    }, [height]);
    // Handle drag start
    const handleDragStart = (e) => {
        e.preventDefault();
        setIsDragging(true);
        // When starting to drag, make sure the panel is in open state
        if (!isOpen && onClose) {
            onClose(); // This will toggle the panel open
        }
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
        const handleMouseMove = (e) => {
            if (isDragging && panelRef.current) {
                // We don't need panelRect here, so we can remove it
                const newHeight = window.innerHeight - e.clientY;
                // Constrain height within min and max
                const constrainedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
                setCurrentHeight(constrainedHeight);
                // If the panel is dragged up significantly, ensure it's in the open state
                if (constrainedHeight > minHeight + 10 && !isOpen && onClose) {
                    onClose(); // This will toggle the panel open
                }
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
    // Calculate panel style - keep handle visible when collapsed
    const handleHeight = 24; // The height of the handle
    const panelStyle = {
        height: `${currentHeight}px`,
        transform: isOpen
            ? 'translateY(0)'
            : isDragging
                ? `translateY(${Math.max(currentHeight - handleHeight, 0)}px)`
                : `translateY(${currentHeight - handleHeight}px)`,
    };
    return (_jsxs("div", { className: panelClasses, style: panelStyle, ref: panelRef, children: [_jsx("div", { className: "pullup-panel-handle", ref: handleRef, onMouseDown: handleDragStart, children: _jsx("div", { className: "pullup-panel-handle-icon" }) }), !isPersistent && (_jsx("button", { className: "pullup-panel-close", onClick: onClose, "aria-label": "Close panel", children: "\u00D7" })), _jsx("div", { className: "pullup-panel-content", children: children })] }));
};
export default PullupPanel;
//# sourceMappingURL=PullupPanel.js.map