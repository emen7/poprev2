'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the context type
interface HighlightContextType {
  showHighlights: boolean;
  toggleHighlights: () => void;
  highlightText: (text: string, color: string) => void;
  removeHighlight: (id: string) => void;
  highlights: Highlight[];
}

// Define the highlight type
interface Highlight {
  id: string;
  text: string;
  color: string;
  createdAt: Date;
}

// Create the context with a default value
const HighlightContext = createContext<HighlightContextType>({
  showHighlights: true,
  toggleHighlights: () => {},
  highlightText: () => {},
  removeHighlight: () => {},
  highlights: [],
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

  // Highlight text
  const highlightText = (text: string, color: string) => {
    const newHighlight: Highlight = {
      id: `highlight-${Date.now()}`,
      text,
      color,
      createdAt: new Date(),
    };

    setHighlights([...highlights, newHighlight]);

    // In a real implementation, we would apply the highlight to the DOM
    // This is a simplified version
  };

  // Remove highlight
  const removeHighlight = (id: string) => {
    setHighlights(highlights.filter(highlight => highlight.id !== id));

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

  return (
    <HighlightContext.Provider
      value={{
        showHighlights,
        toggleHighlights,
        highlightText,
        removeHighlight,
        highlights,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

// Create a hook to use the highlight context
export const useHighlight = () => useContext(HighlightContext);

export default HighlightProvider;
