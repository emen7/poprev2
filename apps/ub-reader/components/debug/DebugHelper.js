'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './DebugHelper.css';
/**
 * DebugHelper Component
 *
 * This component provides debugging utilities for the UB Reader:
 * - Shows a visual indicator for the "hot zone" where section titles are detected
 * - Displays current CSS variables and window dimensions
 * - Can be toggled with Ctrl+Shift+Alt+D
 */
export const DebugHelper = () => {
    const [showDebug, setShowDebug] = useState(false);
    const [cssVars, setCssVars] = useState({});
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    // Toggle debug mode with keyboard shortcut (Ctrl+Shift+Alt+D)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.altKey && e.key === 'D') {
                setShowDebug(prev => !prev);
                // Toggle body class for other components to react to
                if (!showDebug) {
                    document.body.classList.add('show-debug');
                }
                else {
                    document.body.classList.remove('show-debug');
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Update dimensions on resize
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', updateDimensions);
        updateDimensions(); // Initial dimensions
        // Collect CSS variables
        const computeVars = () => {
            const styles = getComputedStyle(document.documentElement);
            const varObj = {};
            // Get header-related variables
            ['--row1-height', '--row2-height', '--row3-height', '--header-total-height'].forEach(varName => {
                varObj[varName] = styles.getPropertyValue(varName).trim();
            });
            setCssVars(varObj);
        };
        computeVars();
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', updateDimensions);
            document.body.classList.remove('show-debug');
        };
    }, [showDebug]);
    if (!showDebug)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "hot-zone-indicator" }), _jsxs("div", { className: "debug-panel", children: [_jsx("h3", { children: "UB Reader Debug" }), _jsxs("div", { className: "debug-section", children: [_jsx("h4", { children: "CSS Variables:" }), _jsx("ul", { children: Object.entries(cssVars).map(([name, value]) => (_jsxs("li", { children: [name, ": ", _jsx("span", { children: value })] }, name))) })] }), _jsxs("div", { className: "debug-section", children: [_jsx("h4", { children: "Window:" }), _jsxs("p", { children: ["Width: ", dimensions.width, "px"] }), _jsxs("p", { children: ["Height: ", dimensions.height, "px"] })] }), _jsxs("div", { className: "debug-section", children: [_jsx("h4", { children: "Shortcuts:" }), _jsx("p", { children: "Ctrl+Shift+Alt+S: Section Observer Debug" }), _jsx("p", { children: "Ctrl+Shift+Alt+D: Toggle this panel" })] })] })] }));
};
export default DebugHelper;
//# sourceMappingURL=DebugHelper.js.map