'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the selection menu position type
interface Position {
  top: number;
  left: number;
}

// Define the selection menu options type
interface SelectionMenuOptions {
  text: string;
  position: Position;
  onHighlight: (color: string) => void;
}

// Define the highlight metadata type
interface HighlightMetadata {
  paperId: string;
  paragraphId: string;
  [key: string]: string;
}

// Local storage key for highlights
const HIGHLIGHTS_STORAGE_KEY = 'ub-reader-highlights';

// Define the highlight manager type
interface HighlightManager {
  showSelectionMenu: (options: SelectionMenuOptions) => void;
  createHighlight: (text: string, color: string, metadata: HighlightMetadata) => void;
  removeHighlight: (id: string) => void;
}

// Define the context type
interface HighlightContextType {
  showHighlights: boolean;
  toggleHighlights: () => void;
  highlightText: (text: string, color: string) => void;
  removeHighlight: (id: string) => void;
  highlights: Highlight[];
  highlightManager: HighlightManager;
}

// Define the highlight type
interface Highlight {
  id: string;
  text: string;
  color: string;
  createdAt: Date;
  metadata: HighlightMetadata;
}

// Create the context with a default value
const HighlightContext = createContext<HighlightContextType>({
  showHighlights: true,
  toggleHighlights: () => {},
  highlightText: () => {},
  removeHighlight: () => {},
  highlights: [],
  highlightManager: {
    showSelectionMenu: () => {},
    createHighlight: () => {},
    removeHighlight: () => {},
  },
});

// Define the provider props
interface HighlightProviderProps {
  children: ReactNode;
  containerSelector?: string;
  isDarkMode?: boolean;
}

// Create the provider component
export const HighlightProvider: React.FC<HighlightProviderProps> = ({
  children,
  containerSelector = '.ub-paper',
  isDarkMode = false,
}) => {
  const [showHighlights, setShowHighlights] = useState<boolean>(true);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode);
  const [selectionMenuVisible, setSelectionMenuVisible] = useState<boolean>(false);
  const [selectionMenuPosition, setSelectionMenuPosition] = useState<Position>({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState<string>('');
  const [onHighlightCallback, setOnHighlightCallback] = useState<((color: string) => void) | null>(
    null
  );

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.body.classList.contains('dark-mode');
      setDarkMode(isDark);
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
      } else {
        container.classList.add('ub-highlights-hidden');
      }
    }
  };

  // Helper function to save highlights to localStorage
  const saveHighlightsToStorage = (highlightsToSave: Highlight[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(HIGHLIGHTS_STORAGE_KEY, JSON.stringify(highlightsToSave));
      } catch (error) {
        console.error('Error saving highlights to localStorage:', error);
      }
    }
  };

  // Helper function to load highlights from localStorage
  const loadHighlightsFromStorage = (): Highlight[] => {
    if (typeof window !== 'undefined') {
      try {
        const storedHighlights = localStorage.getItem(HIGHLIGHTS_STORAGE_KEY);
        if (storedHighlights) {
          const parsedHighlights = JSON.parse(storedHighlights);
          // Convert string dates back to Date objects
          return parsedHighlights.map((h: any) => ({
            ...h,
            createdAt: new Date(h.createdAt),
          }));
        }
      } catch (error) {
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
  const highlightText = (
    text: string,
    color: string,
    metadata: HighlightMetadata = { paperId: '0', paragraphId: '0' }
  ) => {
    const newHighlight: Highlight = {
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
  const removeHighlight = (id: string) => {
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
      } else {
        container.classList.remove('ub-highlights-hidden');
      }
    }
  }, [containerSelector, showHighlights]);

  // Create the highlight manager
  const highlightManager: HighlightManager = {
    showSelectionMenu: (options: SelectionMenuOptions) => {
      setSelectedText(options.text);
      setSelectionMenuPosition(options.position);
      setOnHighlightCallback(() => options.onHighlight);
      setSelectionMenuVisible(true);

      // Hide the menu after 5 seconds if no action is taken
      setTimeout(() => {
        setSelectionMenuVisible(false);
      }, 5000);
    },

    createHighlight: (text: string, color: string, metadata: HighlightMetadata) => {
      // Create a new highlight
      const newHighlight: Highlight = {
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
      console.log(
        `Created highlight: "${text}" with color ${color} in paper ${metadata.paperId}, paragraph ${metadata.paragraphId}`
      );
    },

    removeHighlight: removeHighlight,
  };

  return (
    <HighlightContext.Provider
      value={{
        showHighlights,
        toggleHighlights,
        highlightText,
        removeHighlight,
        highlights,
        highlightManager,
      }}
    >
      {children}

      {/* Selection menu */}
      {selectionMenuVisible && (
        <div
          className="ub-selection-menu"
          style={{
            position: 'absolute',
            top: `${selectionMenuPosition.top}px`,
            left: `${selectionMenuPosition.left}px`,
          }}
        >
          <button
            className="ub-action-button ub-color-yellow"
            onClick={() => {
              if (onHighlightCallback) onHighlightCallback('yellow');
              setSelectionMenuVisible(false);
            }}
          >
            <span style={{ backgroundColor: 'rgba(255, 245, 120, 0.6)', padding: '4px 8px' }}>
              A
            </span>
          </button>

          <button
            className="ub-action-button ub-color-green"
            onClick={() => {
              if (onHighlightCallback) onHighlightCallback('green');
              setSelectionMenuVisible(false);
            }}
          >
            <span style={{ backgroundColor: 'rgba(152, 251, 152, 0.6)', padding: '4px 8px' }}>
              A
            </span>
          </button>

          <button
            className="ub-action-button ub-color-blue"
            onClick={() => {
              if (onHighlightCallback) onHighlightCallback('blue');
              setSelectionMenuVisible(false);
            }}
          >
            <span style={{ backgroundColor: 'rgba(176, 196, 222, 0.6)', padding: '4px 8px' }}>
              A
            </span>
          </button>
        </div>
      )}
    </HighlightContext.Provider>
  );
};

// Create a hook to use the highlight context
export const useHighlight = () => useContext(HighlightContext);

export default HighlightProvider;
