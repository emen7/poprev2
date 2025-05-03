import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { HighlightColorPicker } from './HighlightColorPicker';
import './SelectionMenu.css';
/**
 * SelectionMenu Component
 *
 * A component that displays a menu for text selection with options for highlighting, copying, adding notes, and saving quotes.
 */
export const SelectionMenu = ({ position, selectedText, onCopy, onNote, onQuote, onHighlight, darkMode = false, onClose, }) => {
    // State for the selected action
    const [selectedAction, setSelectedAction] = useState(null);
    // State for the selected highlight color
    const [selectedColor, setSelectedColor] = useState('yellow');
    // Ref for the menu element
    const menuRef = useRef(null);
    // Handle action selection
    const handleActionSelect = (action) => {
        setSelectedAction(action);
    };
    // Handle confirm button click
    const handleConfirm = () => {
        if (selectedAction === 'copy' && onCopy) {
            onCopy();
        }
        else if (selectedAction === 'note' && onNote) {
            onNote();
        }
        else if (selectedAction === 'quote' && onQuote) {
            onQuote();
        }
        else if (selectedAction === 'highlight' && onHighlight) {
            onHighlight(selectedColor);
        }
        // Close the menu
        if (onClose) {
            onClose();
        }
    };
    // Handle cancel button click
    const handleCancel = () => {
        if (onClose) {
            onClose();
        }
    };
    // Handle highlight color selection
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };
    // Handle highlight confirm
    const handleHighlightConfirm = () => {
        if (onHighlight) {
            onHighlight(selectedColor);
        }
        // Close the menu
        if (onClose) {
            onClose();
        }
    };
    // Handle click outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (onClose) {
                    onClose();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    // Adjust position to ensure the menu is within the viewport
    const adjustedPosition = Object.assign({}, position);
    if (menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        // Adjust horizontal position
        if (position.left + menuRect.width > viewportWidth) {
            adjustedPosition.left = viewportWidth - menuRect.width - 10;
        }
        // Adjust vertical position
        if (position.top + menuRect.height > viewportHeight) {
            adjustedPosition.top = position.top - menuRect.height - 10;
        }
    }
    return (_jsx("div", { className: `selection-menu ${darkMode ? 'selection-menu-dark' : ''}`, style: { top: adjustedPosition.top, left: adjustedPosition.left }, ref: menuRef, children: selectedAction === 'highlight' ? (_jsx(HighlightColorPicker, { selectedColor: selectedColor, onColorSelect: handleColorSelect, onConfirm: handleHighlightConfirm, onCancel: handleCancel, darkMode: darkMode })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "selection-actions", children: [_jsx("button", { className: `action-button ${selectedAction === 'highlight' ? 'selected' : ''}`, onClick: () => handleActionSelect('highlight'), title: "Highlight text", children: _jsx("span", { role: "img", "aria-label": "highlight", children: "\uD83D\uDD8C\uFE0F" }) }), _jsx("button", { className: `action-button ${selectedAction === 'copy' ? 'selected' : ''}`, onClick: () => handleActionSelect('copy'), title: "Copy text", children: _jsx("span", { role: "img", "aria-label": "copy", children: "\uD83D\uDCCB" }) }), _jsx("button", { className: `action-button ${selectedAction === 'note' ? 'selected' : ''}`, onClick: () => handleActionSelect('note'), title: "Add note", children: _jsx("span", { role: "img", "aria-label": "note", children: "\uD83D\uDCDD" }) }), _jsx("button", { className: `action-button ${selectedAction === 'quote' ? 'selected' : ''}`, onClick: () => handleActionSelect('quote'), title: "Save quote", children: _jsx("span", { role: "img", "aria-label": "quote", children: "\uD83D\uDCAC" }) })] }), _jsxs("div", { className: "selection-controls", children: [_jsx("button", { className: "confirm-button", onClick: handleConfirm, title: "Apply", children: "\u2713" }), _jsx("button", { className: "cancel-button", onClick: handleCancel, title: "Cancel", children: "\u2715" })] })] })) }));
};
export default SelectionMenu;
//# sourceMappingURL=SelectionMenu.js.map