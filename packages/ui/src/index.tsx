/**
 * UI Components Package
 *
 * This package provides shared UI components for the UB ecosystem.
 */

import React from 'react';

// Define interfaces for UB types to avoid using 'any'
// These should eventually be imported from their respective packages

/**
 * Represents a reference to the Urantia Book
 */
export interface UBReference {
  /**
   * Type of reference
   */
  type: 'paper-section' | 'paper-section-paragraph' | 'paper' | 'section';

  /**
   * Paper number
   */
  paper: number;

  /**
   * Section number (optional for paper-only references)
   */
  section?: number;

  /**
   * Paragraph number (optional for paper-section references)
   */
  paragraph?: number;

  /**
   * Original text that was matched
   */
  originalText: string;

  /**
   * Position in the original text
   */
  position: {
    start: number;
    end: number;
  };
}

/**
 * Represents a UB paragraph
 */
export interface UBParagraph {
  /**
   * Unique identifier for the paragraph
   */
  id?: string;

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
}

/**
 * Represents a UB section
 */
export interface UBSection {
  /**
   * Unique identifier for the section
   */
  id?: string;

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
  paragraphs: UBParagraph[];
}

/**
 * Represents a UB paper
 */
export interface UBPaper {
  /**
   * Unique identifier for the paper
   */
  id?: string;

  /**
   * Paper number
   */
  number: number | string;

  /**
   * Paper title
   */
  title: string;

  /**
   * Paper author
   */
  author?: string;

  /**
   * Sections in the paper
   */
  sections: UBSection[];
}

// Export the DocumentReader component
export { DocumentReader } from './document-reader';

/**
 * Props for the UBReferenceLink component
 */
export interface UBReferenceLinkProps {
  reference: UBReference;
  baseUrl?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A component that renders a link to a UB reference
 */
export const UBReferenceLink: React.FC<UBReferenceLinkProps> = ({
  reference,
  baseUrl = '/reader',
  className = '',
  children,
}) => {
  const url = `${baseUrl}/paper/${reference.paper}/section/${reference.section}`;

  return (
    <a href={url} className={`ub-reference ${className}`}>
      {children || reference.originalText}
    </a>
  );
};

/**
 * Props for the UBPaperViewer component
 */
export interface UBPaperViewerProps {
  paper: UBPaper;
  className?: string;
}

/**
 * A component that renders a UB paper
 */
export const UBPaperViewer: React.FC<UBPaperViewerProps> = ({ paper, className = '' }) => {
  return (
    <div className={`ub-paper ${className}`}>
      <h1 className="ub-paper-title">
        Paper {paper.number}: {paper.title}
      </h1>
      {paper.author && <div className="ub-paper-author">Presented by: {paper.author}</div>}
      <div className="ub-paper-sections">
        {paper.sections.map((section: UBSection) => (
          <UBSectionViewer key={section.number} section={section} />
        ))}
      </div>
    </div>
  );
};

/**
 * Props for the UBSectionViewer component
 */
export interface UBSectionViewerProps {
  section: UBSection;
  className?: string;
}

/**
 * A component that renders a UB section
 */
export const UBSectionViewer: React.FC<UBSectionViewerProps> = ({ section, className = '' }) => {
  return (
    <div className={`ub-section ${className}`} id={`section-${section.number}`}>
      <h2 className="ub-section-title">
        {section.number}. {section.title}
      </h2>
      <div className="ub-section-paragraphs">
        {section.paragraphs.map((paragraph: UBParagraph) => (
          <UBParagraphViewer key={paragraph.number} paragraph={paragraph} />
        ))}
      </div>
    </div>
  );
};

/**
 * Props for the UBParagraphViewer component
 */
export interface UBParagraphViewerProps {
  paragraph: UBParagraph;
  className?: string;
}

/**
 * A component that renders a UB paragraph
 */
export const UBParagraphViewer: React.FC<UBParagraphViewerProps> = ({
  paragraph,
  className = '',
}) => {
  return (
    <div className={`ub-paragraph ${className}`} id={`p-${paragraph.number}`}>
      <span className="ub-paragraph-number">{paragraph.number}</span>
      <span className="ub-paragraph-text" dangerouslySetInnerHTML={{ __html: paragraph.text }} />
    </div>
  );
};

/**
 * Props for the DocumentViewer component
 */
export interface DocumentViewerProps {
  content: string;
  className?: string;
}

/**
 * A component that renders a document
 */
export const DocumentViewer: React.FC<DocumentViewerProps> = ({ content, className = '' }) => {
  return (
    <div className={`document-viewer ${className}`}>
      <div className="document-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

// No need for duplicate exports, as we're already exporting the components above
