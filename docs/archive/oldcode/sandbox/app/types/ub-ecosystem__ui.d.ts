/**
 * Type declarations for @ub-ecosystem/ui
 */

declare module '@ub-ecosystem/ui' {
  import { TransformedDocument } from '@ub-ecosystem/content-transformer';
  import React from 'react';

  /**
   * Props for the DocumentReader component
   */
  export interface DocumentReaderProps {
    document: TransformedDocument;
  }

  /**
   * A component that displays a transformed document with proper formatting and navigation
   */
  export function DocumentReader(props: DocumentReaderProps): React.ReactElement;

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
  export function UBReferenceLink(props: UBReferenceLinkProps): React.ReactElement;

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
  export function UBPaperViewer(props: UBPaperViewerProps): React.ReactElement;

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
  export function UBSectionViewer(props: UBSectionViewerProps): React.ReactElement;

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
  export function UBParagraphViewer(props: UBParagraphViewerProps): React.ReactElement;

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
  export function DocumentViewer(props: DocumentViewerProps): React.ReactElement;
}