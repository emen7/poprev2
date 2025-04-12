/**
 * Types for the content transformation system
 */
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
 * Represents a paragraph in the document
 */
export interface ParagraphNode extends DocumentNode {
  type: 'paragraph';
}
/**
 * Represents a list in the document
 */
export interface ListNode extends DocumentNode {
  type: 'list';
  ordered: boolean;
  start?: number;
}
/**
 * Represents a list item in the document
 */
export interface ListItemNode extends DocumentNode {
  type: 'listItem';
}
/**
 * Represents a link in the document
 */
export interface LinkNode extends DocumentNode {
  type: 'link';
  url: string;
  title?: string;
}
/**
 * Represents an image in the document
 */
export interface ImageNode extends DocumentNode {
  type: 'image';
  url: string;
  alt?: string;
  title?: string;
}
/**
 * Represents a table in the document
 */
export interface TableNode extends DocumentNode {
  type: 'table';
  align?: Array<'left' | 'center' | 'right' | null>;
}
/**
 * Represents a table row in the document
 */
export interface TableRowNode extends DocumentNode {
  type: 'tableRow';
}
/**
 * Represents a table cell in the document
 */
export interface TableCellNode extends DocumentNode {
  type: 'tableCell';
}
/**
 * Represents a code block in the document
 */
export interface CodeNode extends DocumentNode {
  type: 'code';
  lang?: string;
  meta?: string;
}
/**
 * Represents inline code in the document
 */
export interface InlineCodeNode extends DocumentNode {
  type: 'inlineCode';
}
/**
 * Represents a blockquote in the document
 */
export interface BlockquoteNode extends DocumentNode {
  type: 'blockquote';
}
/**
 * Represents emphasis (italic) in the document
 */
export interface EmphasisNode extends DocumentNode {
  type: 'emphasis';
}
/**
 * Represents strong emphasis (bold) in the document
 */
export interface StrongNode extends DocumentNode {
  type: 'strong';
}
/**
 * Represents a horizontal rule in the document
 */
export interface ThematicBreakNode extends DocumentNode {
  type: 'thematicBreak';
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
 * Scientific document metadata
 */
export interface ScientificMetadata extends BaseMetadata {
  abstract?: string;
  keywords?: string[];
  references?: string[];
  doi?: string;
}
/**
 * Lectionary document metadata
 */
export interface LectionaryMetadata extends BaseMetadata {
  liturgicalSeason?: string;
  scriptureReferences?: string[];
}
/**
 * UB Gems document metadata
 */
export interface UBGemsMetadata extends BaseMetadata {
  paperNumber?: number;
  sectionNumber?: number;
  source?: string;
}
/**
 * UB Catechism document metadata
 */
export interface UBCatechismMetadata extends BaseMetadata {
  questionNumber?: number;
  topic?: string;
}
/**
 * Perplexity document metadata
 */
export interface PerplexityMetadata extends BaseMetadata {
  question?: string;
  responses?: Array<{
    responseText?: string;
    sources?: string[];
  }>;
}
/**
 * Union type for all metadata types
 */
export type DocumentMetadata =
  | BaseMetadata
  | ScientificMetadata
  | LectionaryMetadata
  | UBGemsMetadata
  | UBCatechismMetadata
  | PerplexityMetadata;
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
 * Reference to a UB paper and section
 */
export interface UBReference {
  type: 'paper-section';
  paper: number;
  section: number;
  originalText: string;
  position: {
    start: number;
    end: number;
  };
}
