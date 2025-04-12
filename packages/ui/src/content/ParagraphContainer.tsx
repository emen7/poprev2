import React, { useState } from 'react';

import { ParagraphNumberingContainer } from './ParagraphNumbering';
import { Paragraph, ParagraphRenderer } from './ParagraphRenderer';
import './ParagraphContainer.css';

export interface ParagraphContainerProps {
  /**
   * Array of paragraphs to render
   */
  paragraphs: Paragraph[];

  /**
   * The formatting type to use
   */
  formatType: 'traditional' | 'modern';

  /**
   * Whether to show paragraph numbers
   * @default true
   */
  showNumbers?: boolean;

  /**
   * Whether to use the vertical numbering column
   * @default true
   */
  useVerticalNumbering?: boolean;

  /**
   * ID of the currently highlighted paragraph
   */
  highlightedParagraphId?: string;

  /**
   * Function called when a paragraph becomes visible
   */
  onParagraphVisible?: (paragraphId: string) => void;

  /**
   * Function called when a paragraph is clicked
   */
  onParagraphClick?: (paragraphId: string, event: React.MouseEvent) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ParagraphContainer Component
 *
 * A component that renders multiple paragraphs with a vertical numbering column.
 */
export const ParagraphContainer: React.FC<ParagraphContainerProps> = ({
  paragraphs,
  formatType,
  showNumbers = true,
  useVerticalNumbering = true,
  highlightedParagraphId,
  onParagraphVisible,
  onParagraphClick,
  className = '',
}) => {
  // State for toggling the visibility of paragraph numbers
  const [numbersVisible, setNumbersVisible] = useState<boolean>(showNumbers);

  // Toggle paragraph numbers visibility
  const toggleNumbersVisibility = () => {
    setNumbersVisible(!numbersVisible);
  };

  // Determine container classes
  const containerClasses = [
    'paragraph-container',
    useVerticalNumbering ? 'paragraph-container-vertical-numbering' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <ParagraphNumberingContainer visible={numbersVisible && useVerticalNumbering}>
        {paragraphs.map(paragraph => (
          <ParagraphRenderer
            key={paragraph.id}
            paragraph={paragraph}
            formatType={formatType}
            showNumber={numbersVisible}
            useVerticalNumbering={useVerticalNumbering}
            isHighlighted={paragraph.id === highlightedParagraphId}
            onVisible={onParagraphVisible ? () => onParagraphVisible(paragraph.id) : undefined}
            onClick={onParagraphClick ? (id, event) => onParagraphClick(id, event) : undefined}
          />
        ))}
      </ParagraphNumberingContainer>

      {/* Toggle button for paragraph numbers */}
      <button
        className="paragraph-numbering-toggle"
        onClick={toggleNumbersVisibility}
        title={numbersVisible ? 'Hide paragraph numbers' : 'Show paragraph numbers'}
      >
        <span className="paragraph-numbering-toggle-icon"></span>
      </button>
    </div>
  );
};

export default ParagraphContainer;
