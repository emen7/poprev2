'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';

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
interface EnhancedHighlightContextType {
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
const EnhancedHighlightContext = createContext<EnhancedHighlightContextType>({
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
interface EnhancedHighlightProviderProps {
  children: ReactNode;
  containerSelector?: string;
}

// Create the provider component
export const EnhancedHighlightProvider: React.FC<EnhancedHighlightProviderProps> = ({
  children,
  containerSelector = '.ub-paper',
}) => {
  const { preferences, updatePreferences } = useExtendedUserPreferences();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectionMenuVisible, setSelectionMenuVisible] = useState<boolean>(false);
  const [selectionMenuPosition, setSelectionMenuPosition] = useState<Position>({ top: 0, left: 0 });
  const [onHighlightCallback, setOnHighlightCallback] = useState<((color: string) => void) | null>(
    null
  );

  // Get the showHighlights value from preferences
  const showHighlights = preferences.reader.showHighlights;

  // Toggle highlights visibility
  const toggleHighlights = () => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        showHighlights: !showHighlights,
      },
    });

    // Apply or remove the class to hide highlights
    const container = document.querySelector(containerSelector);
    if (container) {
      if (showHighlights) {
        container.classList.add('ub-highlights-hidden');
      } else {
        container.classList.remove('ub-highlights-hidden');
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

      console.log(
        `Created highlight: "${text}" with color ${color} in paper ${metadata.paperId}, paragraph ${metadata.paragraphId}`
      );
    },

    removeHighlight: removeHighlight,
  };

  return (
    <EnhancedHighlightContext.Provider
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

      <style jsx>{`
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
      `}</style>
    </EnhancedHighlightContext.Provider>
  );
};

// Create a hook to use the highlight context
export const useEnhancedHighlight = () => useContext(EnhancedHighlightContext);

export default EnhancedHighlightProvider;
