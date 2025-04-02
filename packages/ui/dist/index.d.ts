/**
 * UI Components Package
 *
 * This package provides shared UI components for the UB ecosystem.
 */
import React from 'react';
/**
 * Props for the UBReferenceLink component
 */
export interface UBReferenceLinkProps {
    reference: any;
    baseUrl?: string;
    className?: string;
    children?: React.ReactNode;
}
/**
 * A component that renders a link to a UB reference
 */
export declare const UBReferenceLink: React.FC<UBReferenceLinkProps>;
/**
 * Props for the UBPaperViewer component
 */
export interface UBPaperViewerProps {
    paper: any;
    className?: string;
}
/**
 * A component that renders a UB paper
 */
export declare const UBPaperViewer: React.FC<UBPaperViewerProps>;
/**
 * Props for the UBSectionViewer component
 */
export interface UBSectionViewerProps {
    section: any;
    className?: string;
}
/**
 * A component that renders a UB section
 */
export declare const UBSectionViewer: React.FC<UBSectionViewerProps>;
/**
 * Props for the UBParagraphViewer component
 */
export interface UBParagraphViewerProps {
    paragraph: any;
    className?: string;
}
/**
 * A component that renders a UB paragraph
 */
export declare const UBParagraphViewer: React.FC<UBParagraphViewerProps>;
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
export declare const DocumentViewer: React.FC<DocumentViewerProps>;
//# sourceMappingURL=index.d.ts.map