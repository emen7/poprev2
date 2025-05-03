'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
/**
 * Debug Helper Component
 *
 * This component helps to debug CSS variables by displaying them in a floating panel
 * when triggerred with the keyboard shortcut Ctrl+Shift+Alt+D
 */
export const DebugHelper = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cssVars, setCssVars] = useState([]);
    useEffect(() => {
        // Get all CSS variables from the document root
        const getCSSVariables = () => {
            const computedStyle = getComputedStyle(document.documentElement);
            const cssVariables = [];
            // Header-related variables
            const importantVars = [
                '--row1-height',
                '--row2-height',
                '--row3-height',
                '--header-total-height',
                '--z-index-fixed',
                '--reader-container-bg',
                '--reading-area-bg',
            ];
            importantVars.forEach(varName => {
                cssVariables.push({
                    name: varName,
                    value: computedStyle.getPropertyValue(varName).trim(),
                });
            });
            return cssVariables;
        };
        // Toggle debug panel with Ctrl+Shift+Alt+D
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.altKey && e.key === 'D') {
                if (!isVisible) {
                    const vars = getCSSVariables();
                    setCssVars(vars);
                }
                setIsVisible(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible]);
    if (!isVisible)
        return null;
    return (_jsxs("div", { style: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
            maxWidth: '400px',
            fontFamily: 'monospace',
            fontSize: '12px',
        }, children: [_jsx("div", { style: { marginBottom: '10px', fontWeight: 'bold' }, children: "CSS Variable Debug Panel" }), _jsxs("table", { style: { borderCollapse: 'collapse', width: '100%' }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: { textAlign: 'left', padding: '4px' }, children: "Variable" }), _jsx("th", { style: { textAlign: 'left', padding: '4px' }, children: "Value" })] }) }), _jsx("tbody", { children: cssVars.map((v, i) => (_jsxs("tr", { style: { borderTop: '1px solid rgba(255, 255, 255, 0.2)' }, children: [_jsx("td", { style: { padding: '4px' }, children: v.name }), _jsx("td", { style: { padding: '4px' }, children: v.value || '(not set)' })] }, i))) })] }), _jsxs("div", { style: {
                    marginTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.4)',
                    paddingTop: '10px',
                }, children: [_jsxs("div", { children: ["Window Width: ", window.innerWidth, "px"] }), _jsxs("div", { children: ["Window Height: ", window.innerHeight, "px"] }), _jsxs("div", { children: ["Device Pixel Ratio: ", window.devicePixelRatio] })] }), _jsx("button", { onClick: () => setIsVisible(false), style: {
                    background: '#333',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    borderRadius: '3px',
                }, children: "Close" })] }));
};
export default DebugHelper;
//# sourceMappingURL=DebugHelper.js.map