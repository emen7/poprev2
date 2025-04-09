import React, { forwardRef } from 'react';
import './ParagraphRenderer.css';
import { ParagraphNumbering } from './ParagraphNumbering';

export interface Paragraph {
  /**
   * Unique identifier for the paragraph
   */
  id: string;

  /**
   * Paragraph number
   */
  number: number | string;

  /**
   * Paragraph text content (can include HTML)
   */
  text: string;

  /**
   * Whether this paragraph has notes
   */
  hasNotes?: boolean;

  /**
   * Optional metadata for the paragraph
   */
  metadata?: {
    /**
     * Whether this paragraph is indented
     */
    isIndented?: boolean;

    /**
     * Whether this paragraph is part of a list
     */
    isList?: boolean;

    /**
     * Type of list if this paragraph is part of a list
     */
    listType?: 'numbered' | 'bulleted';

    /**
     * Whether this paragraph is part of a table
     */
    isTable?: boolean;

    /**
     * Whether this paragraph marks a topic change
     */
    isTopicChange?: boolean;

    /**
     * Any additional metadata
     */
    [key: string]: any;
  };
}

export interface ParagraphRendererProps {
  /**
   * The paragraph to render
   */
  paragraph: Paragraph;

  /**
   * The formatting type to use
   */
  formatType: 'traditional' | 'modern';

  /**
   * Whether to show paragraph numbers
   * @default true
   */
  showNumber?: boolean;

  /**
   * Whether to use the new vertical numbering column
   * @default false
   */
  useVerticalNumbering?: boolean;

  /**
   * Whether this paragraph is highlighted
   * @default false
   */
  isHighlighted?: boolean;

  /**
   * Function called when the paragraph becomes visible
   */
  onVisible?: (paragraphId: string) => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Function called when the paragraph is clicked
   */
  onClick?: (paragraphId: string, event: React.MouseEvent) => void;
}

/**
 * ParagraphRenderer Component
 *
 * A component that renders a single paragraph with support for:
 * - Traditional and Modern formatting
 * - Paragraph numbering
 * - Highlighting
 * - Special formatting (indentation, lists, tables, topic changes)
 */
export const ParagraphRenderer = forwardRef<HTMLDivElement, ParagraphRendererProps>(
  function ParagraphRenderer(
    {
      paragraph,
      formatType,
      showNumber = true,
      useVerticalNumbering = false,
      isHighlighted = false,
      onVisible,
      className = '',
      onClick,
    }: ParagraphRendererProps,
    ref
  ) {
    const { id, number, text, hasNotes = false, metadata = {} } = paragraph;
    const { isIndented, isList, listType, isTable, isTopicChange } = metadata;

    // Determine paragraph classes
    const paragraphClasses = [
      'paragraph',
      `paragraph-format-${formatType}`,
      isHighlighted ? 'paragraph-highlighted' : '',
      isIndented ? 'paragraph-indented' : '',
      isList ? `paragraph-list paragraph-list-${listType}` : '',
      isTable ? 'paragraph-table' : '',
      isTopicChange ? 'paragraph-topic-change' : '',
      useVerticalNumbering ? 'paragraph-vertical-numbering' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle paragraph click
    const handleClick = (event: React.MouseEvent) => {
      if (onClick) {
        onClick(id, event);
      }
    };

    // Extract just the paragraph number without section prefix (e.g., "1" from "1.2")
    const paragraphNumberOnly =
      typeof number === 'string' && number.includes('.') ? number.split('.').pop() : number;

    // Convert paragraph number to a numeric value for the vertical numbering
    const numericParagraphNumber =
      typeof paragraphNumberOnly === 'string'
        ? parseInt(paragraphNumberOnly, 10) || 0 // Default to 0 if parsing fails
        : typeof paragraphNumberOnly === 'number'
        ? paragraphNumberOnly
        : 0; // Default to 0 if undefined

    // For list items, we need special handling to ensure numbers are visible
    // and avoid using <li> elements for better copy/paste experience
    if (isList && listType === 'numbered') {
      return (
        <div className={paragraphClasses} data-paragraph-id={id} ref={ref} onClick={handleClick}>
          {showNumber && !useVerticalNumbering && (
            <span className="paragraph-number">{paragraphNumberOnly}</span>
          )}
          {showNumber && useVerticalNumbering && (
            <ParagraphNumbering
              number={numericParagraphNumber}
              hasNotes={hasNotes}
              visible={showNumber}
            />
          )}
          <div className="paragraph-text">
            <span className="list-number">{number}.</span> {/* Explicit number for lists */}
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      );
    } else if (isList && listType === 'bulleted') {
      return (
        <div className={paragraphClasses} data-paragraph-id={id} ref={ref} onClick={handleClick}>
          {showNumber && !useVerticalNumbering && (
            <span className="paragraph-number">{paragraphNumberOnly}</span>
          )}
          {showNumber && useVerticalNumbering && (
            <ParagraphNumbering
              number={numericParagraphNumber}
              hasNotes={hasNotes}
              visible={showNumber}
            />
          )}
          <div className="paragraph-text">
            <span className="list-bullet">•</span> {/* Bullet for bulleted lists */}
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      );
    } else {
      // Standard paragraph rendering
      return (
        <div className={paragraphClasses} data-paragraph-id={id} ref={ref} onClick={handleClick}>
          {showNumber && !useVerticalNumbering && (
            <span className="paragraph-number">{paragraphNumberOnly}</span>
          )}
          {showNumber && useVerticalNumbering && (
            <ParagraphNumbering
              number={numericParagraphNumber}
              hasNotes={hasNotes}
              visible={showNumber}
            />
          )}
          <div className="paragraph-text" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      );
    }
  }
);

export default ParagraphRenderer;
