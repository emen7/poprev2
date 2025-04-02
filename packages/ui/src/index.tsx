/**
 * UI Components Package
 * 
 * This package provides shared UI components for the UB ecosystem.
 */

import React from 'react';

// Temporarily comment out these imports until the referenced packages are properly set up
// import { UBReference } from '@ub-ecosystem/reference-parser';
// import { UBPaper, UBSection, UBParagraph } from '@ub-ecosystem/data-models';

// Export the DocumentReader component
export { DocumentReader } from './document-reader';

/**
 * Props for the UBReferenceLink component
 */
export interface UBReferenceLinkProps {
  reference: any; // Temporarily use 'any' instead of UBReference
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
  paper: any; // Temporarily use 'any' instead of UBPaper
  className?: string;
}

/**
 * A component that renders a UB paper
 */
export const UBPaperViewer: React.FC<UBPaperViewerProps> = ({
  paper,
  className = '',
}) => {
  return (
    <div className={`ub-paper ${className}`}>
      <h1 className="ub-paper-title">
        Paper {paper.number}: {paper.title}
      </h1>
      {paper.author && (
        <div className="ub-paper-author">Presented by: {paper.author}</div>
      )}
      <div className="ub-paper-sections">
        {paper.sections.map((section: any) => (
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
  section: any; // Temporarily use 'any' instead of UBSection
  className?: string;
}

/**
 * A component that renders a UB section
 */
export const UBSectionViewer: React.FC<UBSectionViewerProps> = ({
  section,
  className = '',
}) => {
  return (
    <div className={`ub-section ${className}`} id={`section-${section.number}`}>
      <h2 className="ub-section-title">
        {section.number}. {section.title}
      </h2>
      <div className="ub-section-paragraphs">
        {section.paragraphs.map((paragraph: any) => (
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
  paragraph: any; // Temporarily use 'any' instead of UBParagraph
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
export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={`document-viewer ${className}`}>
      <div className="document-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

// No need for duplicate exports, as we're already exporting the components above