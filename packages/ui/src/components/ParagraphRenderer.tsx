import React from 'react';
import './ParagraphRenderer.css';

export interface Highlight {
  /**
   * Unique identifier for the highlight
   */
  id: string;
  
  /**
   * Start index of the highlight within the paragraph text
   */
  startIndex: number;
  
  /**
   * End index of the highlight within the paragraph text
   */
  endIndex: number;
  
  /**
   * Color of the highlight (CSS color value)
   */
  color?: string;
  
  /**
   * Associated note text (if any)
   */
  note?: string;
}

export interface ParagraphRendererProps {
  /**
   * Paragraph number
   */
  number: number;
  
  /**
   * Paragraph text content
   */
  text: string;
  
  /**
   * Array of highlights for this paragraph
   */
  highlights?: Highlight[];
  
  /**
   * Whether this paragraph has an associated note
   */
  hasNote?: boolean;
  
  /**
   * CSS class name for the paragraph container
   */
  className?: string;
  
  /**
   * Handler for when text is selected within the paragraph
   */
  onTextSelect?: (selection: { text: string; startIndex: number; endIndex: number }) => void;
  
  /**
   * Handler for when a highlight is clicked
   */
  onHighlightClick?: (highlight: Highlight) => void;
}

/**
 * ParagraphRenderer Component
 * 
 * Renders a paragraph with proper styling, paragraph number, and support for highlights.
 */
export const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
  number,
  text,
  highlights = [],
  hasNote = false,
  className = '',
  onTextSelect,
  onHighlightClick,
}) => {
  // Reference to the paragraph text element
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);
  
  // Handle text selection
  const handleSelection = React.useCallback(() => {
    if (!onTextSelect || !paragraphRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') return;
    
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(paragraphRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const startIndex = preSelectionRange.toString().length;
    
    const selectedText = selection.toString();
    
    onTextSelect({
      text: selectedText,
      startIndex,
      endIndex: startIndex + selectedText.length,
    });
  }, [onTextSelect]);
  
  // Render paragraph with highlights
  const renderParagraphWithHighlights = () => {
    if (highlights.length === 0) {
      return text;
    }
    
    // Sort highlights by start index
    const sortedHighlights = [...highlights].sort((a, b) => a.startIndex - b.startIndex);
    
    // Check for overlapping highlights
    for (let i = 0; i < sortedHighlights.length - 1; i++) {
      if (sortedHighlights[i].endIndex > sortedHighlights[i + 1].startIndex) {
        console.warn('Overlapping highlights detected. This may cause rendering issues.');
      }
    }
    
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    
    sortedHighlights.forEach((highlight, index) => {
      // Add text before the highlight
      if (highlight.startIndex > lastIndex) {
        result.push(
          <span key={`text-${index}`}>
            {text.substring(lastIndex, highlight.startIndex)}
          </span>
        );
      }
      
      // Add the highlighted text
      const highlightStyle = {
        backgroundColor: highlight.color || 'var(--color-primary)',
        opacity: 0.3,
        borderRadius: '2px',
        padding: '0 2px',
      };
      
      result.push(
        <span
          key={`highlight-${highlight.id}`}
          style={highlightStyle}
          onClick={() => onHighlightClick && onHighlightClick(highlight)}
          className="paragraph-highlight"
          data-highlight-id={highlight.id}
        >
          {text.substring(highlight.startIndex, highlight.endIndex)}
        </span>
      );
      
      lastIndex = highlight.endIndex;
    });
    
    // Add any remaining text
    if (lastIndex < text.length) {
      result.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }
    
    return result;
  };
  
  // Combine class names
  const containerClasses = ['paragraph-container', className]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div className={containerClasses}>
      <div className="paragraph-number-container">
        <span className="paragraph-number">{number}</span>
        {hasNote && <span className="paragraph-note-indicator">•</span>}
      </div>
      <p
        ref={paragraphRef}
        className="paragraph-text"
        onMouseUp={handleSelection}
        onTouchEnd={handleSelection}
      >
        {renderParagraphWithHighlights()}
      </p>
    </div>
  );
};

export default ParagraphRenderer;
