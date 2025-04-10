import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  HighlightContextValue,
  HighlightData,
  HighlightProviderProps,
  HighlightStorage,
} from '../types';
import { HighlightManager } from '../HighlightManager';

// Create the context with undefined as the default value
const HighlightContext = createContext<HighlightContextValue | undefined>(undefined);

/**
 * Provider component for the highlighting system
 */
export const HighlightProvider: React.FC<HighlightProviderProps> = ({
  children,
  containerSelector,
  isDarkMode,
  colors,
  onHighlight,
  showHighlights: initialShowHighlights = true,
  currentPaper,
  currentSection,
}) => {
  const [highlightManager, setHighlightManager] = useState<any | null>(null);
  const [showHighlights, setShowHighlights] = useState<boolean>(initialShowHighlights);
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  // Initialize the highlight manager when the component mounts
  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (container) {
      containerRef.current = container;
      const manager = new HighlightManager({
        container,
        isDarkMode,
        colors,
        showHighlights,
        onHighlight: (data: HighlightData) => {
          if (data.color) {
            addHighlight(data);
          } else {
            removeHighlight(data);
          }

          // Call the user-provided onHighlight callback if it exists
          if (onHighlight) {
            onHighlight(data);
          }
        },
      });
      setHighlightManager(manager);
    }

    // Clean up the highlight manager when the component unmounts
    return () => {
      if (highlightManager) {
        highlightManager.destroy();
      }
    };
  }, [containerSelector, isDarkMode, colors]);

  // Update highlight visibility when showHighlights changes
  useEffect(() => {
    if (highlightManager) {
      highlightManager.setShowHighlights(showHighlights);
    }
  }, [highlightManager, showHighlights]);

  // Load highlights from localStorage when the component mounts
  useEffect(() => {
    if (currentPaper && highlightManager) {
      const storedHighlights = localStorage.getItem('ub-highlights');
      if (storedHighlights) {
        try {
          const parsedHighlights = JSON.parse(storedHighlights) as HighlightStorage[];
          const paperHighlights = parsedHighlights.filter(
            h =>
              h.paperNumber === currentPaper &&
              (!currentSection || h.sectionNumber === currentSection)
          );

          // Apply the highlights to the DOM
          // This is a simplified example and would need to be expanded
          paperHighlights.forEach(highlight => {
            // Find the paragraph element
            const paragraphElement = document.querySelector(`#p-${highlight.paragraphNumber}`);
            if (paragraphElement) {
              // Find the text in the paragraph
              const textNode = Array.from(
                paragraphElement.querySelectorAll('.ub-paragraph-text')
              ).find(node => node.textContent?.includes(highlight.text));

              if (textNode) {
                // Create a range for the text
                const range = document.createRange();
                const textContent = textNode.textContent || '';
                const startIndex = textContent.indexOf(highlight.text);

                if (startIndex !== -1) {
                  // Set the range to the text
                  range.setStart(textNode.firstChild!, startIndex);
                  range.setEnd(textNode.firstChild!, startIndex + highlight.text.length);

                  // Apply the highlight using the highlight manager
                  highlightManager.applyHighlight(highlight.color);
                }
              }
            }
          });
        } catch (error) {
          console.error('Error parsing stored highlights:', error);
        }
      }
    }
  }, [currentPaper, currentSection, highlightManager]);

  // Save highlights to localStorage when they change
  useEffect(() => {
    if (highlights.length > 0 && currentPaper) {
      // Convert highlights to a format suitable for storage
      const storageHighlights: HighlightStorage[] = highlights.map(highlight => {
        // Extract paragraph number from the closest paragraph element
        const paragraphElement =
          highlight.range.startContainer.parentElement?.closest('.ub-paragraph');
        const paragraphNumber = paragraphElement
          ? parseInt(paragraphElement.id.replace('p-', ''), 10)
          : 0;

        return {
          paperNumber: currentPaper || 0,
          sectionNumber: currentSection || 0,
          paragraphNumber,
          text: highlight.text,
          color: highlight.color || '',
          timestamp: new Date().toISOString(),
        };
      });

      // Get existing highlights from localStorage
      const storedHighlights = localStorage.getItem('ub-highlights');
      let allHighlights: HighlightStorage[] = [];

      if (storedHighlights) {
        try {
          allHighlights = JSON.parse(storedHighlights) as HighlightStorage[];

          // Remove highlights for the current paper/section
          allHighlights = allHighlights.filter(
            h =>
              h.paperNumber !== currentPaper ||
              (currentSection && h.sectionNumber !== currentSection)
          );
        } catch (error) {
          console.error('Error parsing stored highlights:', error);
        }
      }

      // Add the new highlights
      allHighlights = [...allHighlights, ...storageHighlights];

      // Save to localStorage
      localStorage.setItem('ub-highlights', JSON.stringify(allHighlights));
    }
  }, [highlights, currentPaper, currentSection]);

  const addHighlight = (highlight: HighlightData) => {
    setHighlights(prevHighlights => [...prevHighlights, highlight]);
  };

  const removeHighlight = (highlight: HighlightData) => {
    setHighlights(prevHighlights => prevHighlights.filter(h => h.text !== highlight.text));
  };

  return (
    <HighlightContext.Provider
      value={{
        highlightManager,
        showHighlights,
        setShowHighlights,
        highlights,
        addHighlight,
        removeHighlight,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

/**
 * Hook to access the highlighting functionality
 */
export const useHighlight = (): HighlightContextValue => {
  const context = useContext(HighlightContext);
  if (context === undefined) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
};
