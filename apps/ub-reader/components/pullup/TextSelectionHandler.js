'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { usePullup } from '../../contexts/PullupContext';
import './TextSelectionHandler.css';
/**
 * TextSelectionHandler Component
 *
 * A component that handles text selection and shows a menu with options to create notes or quotes.
 * Uses PullupContext for state management instead of props.
 */
export function TextSelectionHandler({}) {
    // State for menu position and visibility
    const [menuPosition, setMenuPosition] = useState(null);
    const [selectedText, setSelectedText] = useState('');
    const [paragraphId, setParagraphId] = useState('');
    const [paragraphReference, setParagraphReference] = useState('');
    // Ref for the menu element
    const menuRef = useRef(null);
    // Get pullup state and actions
    const { openPullup, setActiveTab, handleNoteCreate, handleQuoteCreate } = usePullup();
    // Handle text selection
    useEffect(() => {
        const handleSelection = () => {
            var _a, _b, _c;
            const selection = window.getSelection();
            if (selection && !selection.isCollapsed) {
                // Get selected text
                const text = selection.toString().trim();
                if (text) {
                    // Find the paragraph element that contains the selection
                    const range = selection.getRangeAt(0);
                    const paragraphElement = (_a = range.commonAncestorContainer.parentElement) === null || _a === void 0 ? void 0 : _a.closest('.paragraph');
                    if (paragraphElement) {
                        // Get paragraph ID and reference
                        const id = paragraphElement.getAttribute('data-paragraph-id') || '';
                        // Get paragraph number
                        const numberElement = paragraphElement.querySelector('.paragraph-number');
                        const number = numberElement ? numberElement.textContent || '' : '';
                        // Get section title
                        const sectionElement = paragraphElement.closest('.section-content');
                        const sectionTitleElement = sectionElement === null || sectionElement === void 0 ? void 0 : sectionElement.querySelector('.section-title');
                        const sectionTitle = sectionTitleElement ? sectionTitleElement.textContent || '' : '';
                        // Get paper title
                        const paperTitleElement = document.querySelector('.paper-title');
                        const paperTitle = paperTitleElement ? paperTitleElement.textContent || '' : '';
                        // Create reference in format "Paper:Section.Paragraph"
                        const paperNumber = ((_b = paperTitle.match(/PAPER (\d+)/)) === null || _b === void 0 ? void 0 : _b[1]) || '';
                        const sectionNumber = ((_c = sectionTitle.match(/(\d+)\./)) === null || _c === void 0 ? void 0 : _c[1]) || '';
                        const reference = `(${paperNumber}:${sectionNumber}.${number})`;
                        // Set state
                        setSelectedText(text);
                        setParagraphId(id);
                        setParagraphReference(reference);
                        // Calculate menu position
                        const rect = range.getBoundingClientRect();
                        setMenuPosition({
                            x: rect.left + rect.width / 2,
                            y: rect.bottom + window.scrollY + 10,
                        });
                    }
                }
            }
        };
        // Handle click outside to close menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuPosition(null);
            }
        };
        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // Handle create note
    const handleCreateNote = () => {
        if (selectedText && paragraphId) {
            const note = {
                id: Date.now().toString(),
                content: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                paragraphId,
                reference: paragraphReference,
                selectedText,
            };
            handleNoteCreate(note);
            // Open pullup with notes tab
            setActiveTab('notes');
            openPullup('notes');
            // Close menu
            setMenuPosition(null);
        }
    };
    // Handle create quote
    const handleCreateQuote = () => {
        if (selectedText && paragraphId) {
            const quote = {
                id: Date.now().toString(),
                content: selectedText,
                createdAt: new Date().toISOString(),
                paragraphId,
                reference: paragraphReference,
            };
            handleQuoteCreate(quote);
            // Open pullup with quotes tab
            setActiveTab('quotes');
            openPullup('quotes');
            // Close menu
            setMenuPosition(null);
        }
    };
    // Handle copy text
    const handleCopyText = () => {
        if (selectedText) {
            navigator.clipboard
                .writeText(selectedText)
                .then(() => {
                // Show toast
                const toast = document.querySelector('.toast');
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2000);
                }
            })
                .catch(err => {
                console.error('Failed to copy text: ', err);
            });
            // Close menu
            setMenuPosition(null);
        }
    };
    // If no menu position, don't render anything
    if (!menuPosition) {
        return null;
    }
    // Calculate menu style
    const menuStyle = {
        position: 'absolute',
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
        transform: 'translateX(-50%)',
    };
    return (_jsxs("div", { className: "text-selection-menu", style: menuStyle, ref: menuRef, children: [_jsxs("button", { className: "menu-button note-button", onClick: handleCreateNote, children: [_jsx("span", { className: "menu-icon", children: "\uD83D\uDCDD" }), _jsx("span", { className: "menu-label", children: "Add Note" })] }), _jsxs("button", { className: "menu-button quote-button", onClick: handleCreateQuote, children: [_jsx("span", { className: "menu-icon", children: "\uD83D\uDCAC" }), _jsx("span", { className: "menu-label", children: "Save Quote" })] }), _jsxs("button", { className: "menu-button copy-button", onClick: handleCopyText, children: [_jsx("span", { className: "menu-icon", children: "\uD83D\uDCCB" }), _jsx("span", { className: "menu-label", children: "Copy" })] })] }));
}
export default TextSelectionHandler;
//# sourceMappingURL=TextSelectionHandler.js.map