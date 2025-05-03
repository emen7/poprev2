'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useState, useContext, useEffect } from 'react';
import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';
// Local storage key for highlights
const HIGHLIGHTS_STORAGE_KEY = 'ub-reader-highlights';
// Create the context with a default value
const EnhancedHighlightContext = createContext({
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
export const EnhancedHighlightProvider = ({ children, containerSelector = '.ub-paper', }) => {
    const { preferences, updatePreferences } = useExtendedUserPreferences();
    const [highlights, setHighlights] = useState([]);
    const [selectionMenuVisible, setSelectionMenuVisible] = useState(false);
    const [selectionMenuPosition, setSelectionMenuPosition] = useState({ top: 0, left: 0 });
    const [onHighlightCallback, setOnHighlightCallback] = useState(null);
    // Get the showHighlights value from preferences
    const showHighlights = preferences.reader.showHighlights;
    // Toggle highlights visibility
    const toggleHighlights = () => {
        updatePreferences({
            reader: Object.assign(Object.assign({}, preferences.reader), { showHighlights: !showHighlights }),
        });
        // Apply or remove the class to hide highlights
        const container = document.querySelector(containerSelector);
        if (container) {
            if (showHighlights) {
                container.classList.add('ub-highlights-hidden');
            }
            else {
                container.classList.remove('ub-highlights-hidden');
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
            console.log(`Created highlight: "${text}" with color ${color} in paper ${metadata.paperId}, paragraph ${metadata.paragraphId}`);
        },
        removeHighlight: removeHighlight,
    };
    return (_jsxs(EnhancedHighlightContext.Provider, { value: {
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
                        }, children: _jsx("span", { style: { backgroundColor: 'rgba(176, 196, 222, 0.6)', padding: '4px 8px' }, children: "A" }) })] })), _jsx("style", { jsx: true, children: `
        .ub-selection-menu {
          display: flex;
          gap: 8px;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .ub-action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .ub-action-button:hover {
          opacity: 0.8;
        }

        /* Dark mode styles */
        :global(.dark-theme) .ub-selection-menu {
          background-color: #333;
          border-color: #555;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
      ` })] }));
};
// Create a hook to use the highlight context
export const useEnhancedHighlight = () => useContext(EnhancedHighlightContext);
export default EnhancedHighlightProvider;
//# sourceMappingURL=EnhancedHighlightProvider.js.map