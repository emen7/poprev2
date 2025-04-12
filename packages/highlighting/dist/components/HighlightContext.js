import { jsx as _jsx } from 'react/jsx-runtime';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { HighlightManager } from '../HighlightManager';
// Create the context with undefined as the default value
const HighlightContext = createContext(undefined);
/**
 * Provider component for the highlighting system
 */
export const HighlightProvider = ({
  children,
  containerSelector,
  isDarkMode,
  colors,
  onHighlight,
  showHighlights: initialShowHighlights = true,
  currentPaper,
  currentSection,
}) => {
  const [highlightManager, setHighlightManager] = useState(null);
  const [showHighlights, setShowHighlights] = useState(initialShowHighlights);
  const [highlights, setHighlights] = useState([]);
  const containerRef = useRef(null);
  // Initialize the highlight manager when the component mounts
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (container) {
      containerRef.current = container;
      const manager = new HighlightManager({
        container,
        isDarkMode,
        colors,
        showHighlights,
        onHighlight: data => {
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
          const parsedHighlights = JSON.parse(storedHighlights);
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
              ).find(node => {
                var _a;
                return (_a = node.textContent) === null || _a === void 0
                  ? void 0
                  : _a.includes(highlight.text);
              });
              if (textNode) {
                // Create a range for the text
                const range = document.createRange();
                const textContent = textNode.textContent || '';
                const startIndex = textContent.indexOf(highlight.text);
                if (startIndex !== -1) {
                  // Set the range to the text
                  range.setStart(textNode.firstChild, startIndex);
                  range.setEnd(textNode.firstChild, startIndex + highlight.text.length);
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
      const storageHighlights = highlights.map(highlight => {
        var _a;
        // Extract paragraph number from the closest paragraph element
        const paragraphElement =
          (_a = highlight.range.startContainer.parentElement) === null || _a === void 0
            ? void 0
            : _a.closest('.ub-paragraph');
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
      let allHighlights = [];
      if (storedHighlights) {
        try {
          allHighlights = JSON.parse(storedHighlights);
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
  const addHighlight = highlight => {
    setHighlights(prevHighlights => [...prevHighlights, highlight]);
  };
  const removeHighlight = highlight => {
    setHighlights(prevHighlights => prevHighlights.filter(h => h.text !== highlight.text));
  };
  return _jsx(HighlightContext.Provider, {
    value: {
      highlightManager,
      showHighlights,
      setShowHighlights,
      highlights,
      addHighlight,
      removeHighlight,
    },
    children: children,
  });
};
/**
 * Hook to access the highlighting functionality
 */
export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (context === undefined) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
};
