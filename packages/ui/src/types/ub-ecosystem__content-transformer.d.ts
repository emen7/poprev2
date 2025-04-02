/**
 * Type declarations for @ub-ecosystem/content-transformer
 */

declare module '@ub-ecosystem/content-transformer' {
  /**
   * Document types supported by the transformation system
   */
  export type DocumentType = 'markdown' | 'docx' | 'perplexity';

  /**
   * Publication types supported by the system
   */
  export type PublicationType = 'scientific' | 'lectionary' | 'ubgems' | 'ubcatechism';

  /**
   * Represents a node in the document structure
   */
  export interface DocumentNode {
    type: string;
    children?: DocumentNode[];
    value?: string;
    properties?: Record<string, any>;
    [key: string]: any;
  }

  /**
   * Represents a heading in the document
   */
  export interface HeadingNode extends DocumentNode {
    type: 'heading';
    depth: 1 | 2 | 3 | 4 | 5 | 6;
  }

  /**
   * Represents a root node that contains all other nodes
   */
  export interface RootNode extends DocumentNode {
    type: 'root';
  }

  /**
   * Base metadata for all document types
   */
  export interface BaseMetadata {
    title?: string;
    subtitle?: string;
    author?: string | string[];
    date?: string;
    categories?: string[];
    tags?: string[];
    relatedContent?: string[];
    [key: string]: any;
  }

  /**
   * Union type for all metadata types
   */
  export type DocumentMetadata = BaseMetadata;

  /**
   * Represents a transformed document with content and metadata
   */
  export interface TransformedDocument {
    content: RootNode;
    metadata: DocumentMetadata;
    publicationType?: PublicationType;
    html?: string;
    text?: string;
  }

  /**
   * Options for the transformation process
   */
  export interface TransformOptions {
    extractMetadata?: boolean;
    sanitize?: boolean;
    publicationType?: PublicationType;
    [key: string]: any;
  }

  /**
   * Transform content from a source format into the standardized format
   */
  export function transformContent(
    content: string | Buffer,
    documentType: DocumentType,
    options?: TransformOptions
  ): Promise<TransformedDocument>;

  /**
   * Transform markdown content into the standardized internal representation
   */
  export function transformMarkdown(content: string): Promise<TransformedDocument>;

  /**
   * Transform DOCX content into the standardized internal representation
   */
  export function transformDocx(content: Buffer): Promise<TransformedDocument>;

  /**
   * Normalize the content structure
   */
  export function normalizeContent(content: any): Promise<any>;

  /**
   * Standardize heading hierarchy
   */
  export function standardizeHeadingHierarchy(rootNode: RootNode): RootNode;

  /**
   * Normalize link formats
   */
  export function normalizeLinks(rootNode: RootNode): RootNode;

  /**
   * Normalize image references
   */
  export function normalizeImages(rootNode: RootNode): RootNode;

  /**
   * Enrich the document with metadata
   */
  export function enrichMetadata(content: any, options?: any): Promise<any>;

  /**
   * Validate and sanitize the transformed content
   */
  export function validateContent(content: any): Promise<TransformedDocument>;
}