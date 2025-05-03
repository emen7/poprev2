import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { PullupContent } from './PullupContent';
import { PullupPanel } from './PullupPanel';
import { PullupTabs } from './PullupTabs';
import './Pullup.css';
/**
 * Pullup Component
 *
 * A component that combines all pullup components into a single component.
 */
export const Pullup = ({ isOpen, activeTab, height, isPersistent, onClose, onTabSelect, onHeightChange, notes, onNoteUpdate, onNoteDelete, quotes, onQuoteDelete, settings, onSettingsChange, sortOrder = 'entry', onSortOrderChange, minHeight, maxHeight, className = '', }) => {
    // Keep track of the original height and last active tab
    const [originalHeight, setOriginalHeight] = useState(height);
    const [previousTab, setPreviousTab] = useState(null);
    const defaultHeight = minHeight || 40; // Use 40px as the default minimum if not specified
    // Store the original height when component mounts
    useEffect(() => {
        if (!isOpen) {
            setOriginalHeight(height);
        }
    }, []);
    // When tab changes, track the previous tab and reset height if toggling
    useEffect(() => {
        // If we had a previous tab and it's the same as current (tab was toggled off)
        if (previousTab === activeTab && isOpen) {
            // Reset to original height when toggling the same tab
            if (onHeightChange) {
                onHeightChange(defaultHeight);
            }
        }
        setPreviousTab(isOpen ? activeTab : null);
    }, [activeTab, isOpen]);
    // Handle custom height changes
    const handleHeightChange = (newHeight) => {
        if (onHeightChange) {
            onHeightChange(newHeight);
            // Only update the original height if panel is closed
            if (!isOpen) {
                setOriginalHeight(newHeight);
            }
        }
    };
    // Determine container classes
    const containerClasses = ['pullup', className].filter(Boolean).join(' ');
    return (_jsx("div", { className: containerClasses, children: _jsx(PullupPanel, { isOpen: isOpen, height: height, isPersistent: isPersistent, onClose: onClose, onHeightChange: handleHeightChange, minHeight: minHeight, maxHeight: maxHeight, children: _jsxs("div", { className: "pullup-inner", children: [_jsx(PullupTabs, { activeTab: activeTab, onTabSelect: onTabSelect }), _jsx(PullupContent, { activeTab: activeTab, notes: notes, onNoteUpdate: onNoteUpdate, onNoteDelete: onNoteDelete, quotes: quotes, onQuoteDelete: onQuoteDelete, settings: settings, onSettingsChange: onSettingsChange, sortOrder: sortOrder, onSortOrderChange: onSortOrderChange })] }) }) }));
};
export default Pullup;
//# sourceMappingURL=Pullup.js.map