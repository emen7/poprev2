/**
 * Document Adapter
 *
 * This file provides utilities for adapting between the existing TransformedDocument
 * and our new Document model.
 */
import { Document } from '../models';
import { TransformedDocument } from '../../document-transformer/types';
/**
 * Adapter for converting between TransformedDocument and Document
 */
export declare class DocumentAdapter {
  /**
   * Convert a TransformedDocument to our Document model
   *
   * @param transformedDocument The transformed document to convert
   * @returns A Document object
   */
  static fromTransformedDocument(transformedDocument: TransformedDocument): Document;
  /**
   * Convert our Document model to a TransformedDocument
   *
   * @param document The document to convert
   * @returns A TransformedDocument object
   */
  static toTransformedDocument(document: Document): TransformedDocument;
  /**
   * Convert metadata from TransformedDocument to our DocumentMetadata
   *
   * @param metadata The metadata to convert
   * @returns DocumentMetadata
   */
  private static convertMetadata;
  /**
   * Extract sections from the content
   *
   * @param content The content to extract sections from
   * @returns Array of sections
   */
  private static extractSections;
  /**
   * Construct content from a Document
   *
   * @param document The document to construct content from
   * @returns A RootNode
   */
  private static constructContent;
  /**
   * Get the text content of a node
   *
   * @param node The node to extract text from
   * @returns The text content of the node
   */
  private static getNodeText;
}
//# sourceMappingURL=document-adapter.d.ts.map
