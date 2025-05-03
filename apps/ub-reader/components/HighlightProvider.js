'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useState, useContext, useEffect } from 'react';
// Local storage key for highlights
const HIGHLIGHTS_STORAGE_KEY = 'ub-reader-highlights';
// Create the context with a default value
const HighlightContext = createContext({
    showHighlights: true,
    toggleHighlights: () => { },
    highlightText: () => { },
    removeHighlight: () => { },
    highlights: [],
    highlightManager: {
        showSelectionMenu: () => { },
        createHighlight: () => { },
        removeHighlight: () => { },
    },
});
// Create the provider component
export const HighlightProvider = ({ children, containerSelector = '.ub-paper', isDarkMode = false, }) => {
    const [showHighlights, setShowHighlights] = useState(true);
    const [highlights, setHighlights] = useState([]);
    // Using isDarkMode prop directly instead of maintaining separate state
    const [selectionMenuVisible, setSelectionMenuVisible] = useState(false);
    const [selectionMenuPosition, setSelectionMenuPosition] = useState({ top: 0, left: 0 });
    // We don't need to track selectedText as it's only used in the showSelectionMenu method
    const [onHighlightCallback, setOnHighlightCallback] = useState(null);
    // We'll keep the dark mode detection logic but use the isDarkMode prop directly
    useEffect(() => {
        // No need to update state since we're using the prop directly
        const checkDarkMode = () => {
            // This could be used for other side effects if needed
        };
        checkDarkMode();
        // Set up a mutation observer to detect changes to the body class
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);
    // Toggle highlights visibility
    const toggleHighlights = () => {
        setShowHighlights(!showHighlights);
        // Apply or remove the class to hide highlights
        const container = document.querySelector(containerSelector);
        if (container) {
            if (!showHighlights) {
                container.classList.remove('ub-highlights-hidden');
            }
            else {
                container.classList.add('ub-highlights-hidden');
            }
        }
    };
    // Helper function to save highlights to localStorage
    const saveHighlightsToStorage = (highlightsToSave) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(HIGHLIGHTS_STORAGE_KEY, JSON.stringify(highlightsToSave));
            }
            catch (error) {
                console.error('Error saving highlights to localStorage:', error);
            }
        }
    };
    // Helper function to load highlights from localStorage
    const loadHighlightsFromStorage = () => {
        if (typeof window !== 'undefined') {
            try {
                const storedHighlights = localStorage.getItem(HIGHLIGHTS_STORAGE_KEY);
                if (storedHighlights) {
                    const parsedHighlights = JSON.parse(storedHighlights);
                    // Convert string dates back to Date objects
                    return parsedHighlights.map((h) => (Object.assign(Object.assign({}, h), { createdAt: new Date(h.createdAt) })));
                }
            }
            catch (error) {
                console.error('Error loading highlights from localStorage:', error);
            }
        }
        return [];
    };
    // Load highlights from localStorage on component mount
    useEffect(() => {
        const storedHighlights = loadHighlightsFromStorage();
        if (storedHighlights.length > 0) {
            setHighlights(storedHighlights);
        }
    }, []);
    // Highlight text
    const highlightText = (text, color, metadata = { paperId: '0', paragraphId: '0' }) => {
        const newHighlight = {
            id: `highlight-${Date.now()}`,
            text,
            color,
            createdAt: new Date(),
            metadata,
        };
        const updatedHighlights = [...highlights, newHighlight];
        setHighlights(updatedHighlights);
        saveHighlightsToStorage(updatedHighlights);
    };
    // Remove highlight
    const removeHighlight = (id) => {
        const updatedHighlights = highlights.filter(highlight => highlight.id !== id);
        setHighlights(updatedHighlights);
        saveHighlightsToStorage(updatedHighlights);
        // In a real implementation, we would remove the highlight from the DOM
        // This is a simplified version
    };
    // Initialize the container class based on showHighlights
    useEffect(() => {
        const container = document.querySelector(containerSelector);
        if (container) {
            if (!showHighlights) {
                container.classList.add('ub-highlights-hidden');
            }
            else {
                container.classList.remove('ub-highlights-hidden');
            }
        }
    }, [containerSelector, showHighlights]);
    // Create the highlight manager
    const highlightManager = {
        showSelectionMenu: (options) => {
            // No need to store the text in state
            setSelectionMenuPosition(options.position);
            setOnHighlightCallback(() => options.onHighlight);
            setSelectionMenuVisible(true);
            // Hide the menu after 5 seconds if no action is taken
            setTimeout(() => {
                setSelectionMenuVisible(false);
            }, 5000);
        },
        createHighlight: (text, color, metadata) => {
            // Create a new highlight
            const newHighlight = {
                id: `highlight-${Date.now()}`,
                text,
                color,
                createdAt: new Date(),
                metadata,
            };
            const updatedHighlights = [...highlights, newHighlight];
            setHighlights(updatedHighlights);
            saveHighlightsToStorage(updatedHighlights);
            // In a real implementation, we would apply the highlight to the DOM
            // This is a simplified version
            console.log(`Created highlight: "${text}" with color ${color} in paper ${metadata.paperId}, paragraph ${metadata.paragraphId}`);
        },
        removeHighlight: removeHighlight,
    };
    return (_jsxs(HighlightContext.Provider, { value: {
            showHighlights,
            toggleHighlights,
            highlightText,
            removeHighlight,
            highlights,
            highlightManager,
        }, children: [children, selectionMenuVisible && (_jsxs("div", { className: "ub-selection-menu", style: {
                    position: 'absolute',
                    top: `${selectionMenuPosition.top}px`,
                    left: `${selectionMenuPosition.left}px`,
                }, children: [_jsx("button", { className: "ub-action-button ub-color-yellow", onClick: () => {
                            if (onHighlightCallback)
                                onHighlightCallback('yellow');
                            setSelectionMenuVisible(false);
                        }, children: _jsx("span", { style: { backgroundColor: 'rgba(255, 245, 120, 0.6)', padding: '4px 8px' }, children: "A" }) }), _jsx("button", { className: "ub-action-button ub-color-green", onClick: () => {
                            if (onHighlightCallback)
                                onHighlightCallback('green');
                            setSelectionMenuVisible(false);
                        }, children: _jsx("span", { style: { backgroundColor: 'rgba(152, 251, 152, 0.6)', padding: '4px 8px' }, children: "A" }) }), _jsx("button", { className: "ub-action-button ub-color-blue", onClick: () => {
                            if (onHighlightCallback)
                                onHighlightCallback('blue');
                            setSelectionMenuVisible(false);
                        }, children: _jsx("span", { style: { backgroundColor: 'rgba(176, 196, 222, 0.6)', padding: '4px 8px' }, children: "A" }) })] }))] }));
};
// Create a hook to use the highlight context
export const useHighlight = () => useContext(HighlightContext);
export default HighlightProvider;
//# sourceMappingURL=HighlightProvider.js.map