'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePullup } from '../../contexts/PullupContext';
import './PullupPanel.css';
/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 * Supports dragging, peeking, and theme-aware styling.
 * Uses PullupContext for state management instead of props.
 */
export function PullupPanel({ minHeight = 100, maxHeight = 600, className = '', tabsContent, mainContent, }) {
    // Get theme context
    const { uiTheme } = useTheme();
    // Get pullup context
    const { isOpen, height, isPersistent, closePullup, setHeight } = usePullup();
    // Local state for peeking behavior since it's not in the context
    const [isPeeking, setIsPeeking] = useState(false);
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
        const handleMouseMove = (e) => {
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
        'pullup-panel',
        isOpen ? 'pullup-panel-open' : '',
        !isOpen && isPeeking ? 'pullup-panel-peeking' : '',
        isPersistent ? 'pullup-panel-persistent' : '',
        isDragging ? 'pullup-panel-dragging' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Calculate panel style
    const panelStyle = {
        height: `${currentHeight}px`,
        transform: isOpen
            ? 'translateY(0)'
            : isPeeking
                ? 'translateY(calc(100% - 48px))' /* Adjust 48px based on actual tab height */
                : `translateY(${currentHeight}px)`,
    };
    return (_jsxs("div", { className: panelClasses, style: panelStyle, ref: panelRef, children: [_jsx("div", { className: "pullup-panel-handle", ref: handleRef, onMouseDown: handleDragStart, onClick: handlePeekClick, children: _jsx("div", { className: "pullup-panel-handle-icon" }) }), !isPersistent && isOpen && (_jsx("button", { className: "pullup-panel-close", onClick: closePullup, "aria-label": "Close panel", children: "\u00D7" })), _jsx("div", { className: "pullup-panel-tabs", children: tabsContent }), _jsx("div", { className: "pullup-panel-content", children: mainContent })] }));
}
export default PullupPanel;
//# sourceMappingURL=PullupPanel.js.map