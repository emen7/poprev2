import React from 'react';
import './ParagraphComponent.css';

export interface ParagraphComponentProps {
  /**
   * The paragraph number (e.g., "1:0.1")
   */
  number: string;

  /**
   * The paragraph text content
   */
  text: string;

  /**
   * Whether to show the paragraph number
   * @default true
   */
  showNumber?: boolean;

  /**
   * Whether the paragraph is highlighted
   * @default false
   */
  isHighlighted?: boolean;

  /**
   * The color of the highlight
   * @default '#ffeb3b'
   */
  highlightColor?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Click handler for the paragraph
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * ID for the paragraph element
   */
  id?: string;
}

/**
 * ParagraphComponent
 *
 * A component for displaying paragraphs with optional paragraph numbers and highlighting.
 * Used for rendering content in the UB Reader.
 * @param root0
 * @param root0.number
 * @param root0.text
 * @param root0.showNumber
 * @param root0.isHighlighted
 * @param root0.highlightColor
 * @param root0.className
 * @param root0.onClick
 * @param root0.id
 */
export function ParagraphComponent({
  number,
  text,
  showNumber = true,
  isHighlighted = false,
  highlightColor = '#ffeb3b',
  className = '',
  onClick,
  id,
}: ParagraphComponentProps) {
  // Determine container classes
  const containerClasses = [
    'paragraph-component',
    isHighlighted ? 'paragraph-highlighted' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Inline style for highlighting
  const highlightStyle = isHighlighted
    ? {
        backgroundColor: highlightColor,
      }
    : {};

  return (
    <div className={containerClasses} onClick={onClick} id={id}>
      {showNumber && <span className="paragraph-number">{number}</span>}
      <div className="paragraph-text" style={highlightStyle}>
        {text}
      </div>
    </div>
  );
}

export default ParagraphComponent;
