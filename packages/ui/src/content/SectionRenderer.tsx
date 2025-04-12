import React, { forwardRef } from 'react';

import { ParagraphRenderer, Paragraph } from './ParagraphRenderer';
import './SectionRenderer.css';

export interface Section {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Section number
   */
  number: number | string;

  /**
   * Section title
   */
  title: string;

  /**
   * Paragraphs in the section
   */
  paragraphs: Paragraph[];

  /**
   * Optional metadata for the section
   */
  metadata?: {
    /**
     * Whether this section has special formatting
     */
    hasSpecialFormatting?: boolean;

    /**
     * Type of special formatting
     */
    specialFormattingType?: string;

    /**
     * Any additional metadata
     */
    [key: string]: any;
  };
}

export interface SectionRendererProps {
  /**
   * The section to render
   */
  section: Section;

  /**
   * The formatting type to use
   */
  formatType: 'traditional' | 'modern';

  /**
   * Whether to show paragraph numbers
   * @default true
   */
  showParagraphNumbers?: boolean;

  /**
   * Whether this section is highlighted
   * @default false
   */
  isHighlighted?: boolean;

  /**
   * IDs of paragraphs to highlight
   */
  highlightedParagraphs?: string[];

  /**
   * Function called when the section becomes visible
   */
  onVisible?: (sectionId: string) => void;

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
 * SectionRenderer Component
 *
 * A component that renders a section with its title and paragraphs.
 * Supports different formatting types and highlighting.
 */
export const SectionRenderer = forwardRef<HTMLElement, SectionRendererProps>(
  function SectionRenderer(
    {
      section,
      formatType,
      showParagraphNumbers = true,
      isHighlighted = false,
      highlightedParagraphs = [],
      onVisible,
      onParagraphVisible,
      onParagraphClick,
      className = '',
    }: SectionRendererProps,
    ref
  ) {
    const { id, number, title, paragraphs, metadata = {} } = section;
    const { hasSpecialFormatting, specialFormattingType } = metadata;

    // Determine section classes
    const sectionClasses = [
      'section',
      `section-format-${formatType}`,
      isHighlighted ? 'section-highlighted' : '',
      hasSpecialFormatting ? `section-special section-special-${specialFormattingType}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <section className={sectionClasses} data-section-id={id} ref={ref}>
        <h2 className="section-title">
          {number && <span className="section-number">{number}.</span>}
          <span className="section-title-text">{title}</span>
        </h2>

        <div className="section-content">
          {paragraphs.map(paragraph => (
            <ParagraphRenderer
              key={paragraph.id}
              paragraph={paragraph}
              formatType={formatType}
              showNumber={showParagraphNumbers}
              isHighlighted={highlightedParagraphs.includes(paragraph.id)}
              onVisible={onParagraphVisible}
              onClick={onParagraphClick}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default SectionRenderer;
