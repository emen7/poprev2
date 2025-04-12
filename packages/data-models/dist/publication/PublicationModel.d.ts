/**
 * Publication Model
 *
 * This module defines the publication model interfaces for the UB Ecosystem.
 */
import { DocumentModel } from '../document/DocumentModel';
/**
 * Publication model interface
 */
export interface PublicationModel {
  /**
   * Unique identifier for the publication
   */
  id: string;
  /**
   * Full title of the publication
   */
  title: string;
  /**
   * Short title for display in menus
   */
  shortTitle: string;
  /**
   * Publication description
   */
  description: string;
  /**
   * Publication language
   */
  language: string;
  /**
   * Publication version
   */
  version: string;
  /**
   * Date the publication was published
   */
  datePublished: string;
  /**
   * Date the publication was last updated
   */
  lastUpdated: string;
  /**
   * Documents in the publication
   */
  documents: DocumentModel[];
  /**
   * Publication structure information
   */
  structure: PublicationStructure;
  /**
   * Publication configuration
   */
  config: PublicationConfig;
}
/**
 * Publication structure interface
 */
export interface PublicationStructure {
  /**
   * Whether the publication has parts
   */
  hasParts: boolean;
  /**
   * Parts information (if applicable)
   */
  parts?: PublicationPart[];
  /**
   * Whether the publication has a foreword
   */
  hasForeword: boolean;
  /**
   * Whether the publication has appendices
   */
  hasAppendices: boolean;
}
/**
 * Publication part interface
 */
export interface PublicationPart {
  /**
   * Part number
   */
  number: number;
  /**
   * Part title
   */
  title: string;
  /**
   * IDs of documents in this part
   */
  documentIds: string[];
}
/**
 * Publication configuration interface
 */
export interface PublicationConfig {
  /**
   * Default formatting type
   */
  defaultFormatType: 'traditional' | 'modern';
  /**
   * Whether to show paragraph numbers by default
   */
  showParagraphNumbers: boolean;
  /**
   * Whether to enable reference detection
   */
  enableReferenceDetection: boolean;
  /**
   * Whether to enable cross-publication references
   */
  enableCrossPublicationReferences: boolean;
  /**
   * Whether to enable annotations
   */
  enableAnnotations: boolean;
  /**
   * Whether to enable search
   */
  enableSearch: boolean;
  /**
   * Whether to enable offline access
   */
  enableOfflineAccess: boolean;
  /**
   * Custom CSS variables for styling
   */
  customStyles?: {
    [key: string]: string;
  };
  /**
   * Additional configuration options
   */
  [key: string]: any;
}
//# sourceMappingURL=PublicationModel.d.ts.map
