/**
 * Types for the content transformation system
 *
 * This module defines all the types used in the content transformation process,
 * including document nodes, metadata, and transformation options.
 *
 * @module content-transformer/types
 */

/**
 * Document types supported by the transformation system
 *
 * @typedef {('markdown'|'docx'|'perplexity')} DocumentType
 * @description Defines the source format of the document being transformed
 */
export type DocumentType = 'markdown' | 'docx' | 'perplexity';

/**
 * Publication types supported by the system
 *
 * @typedef {('scientific'|'lectionary'|'ubgems'|'ubcatechism')} PublicationType
 * @description Defines the type of publication being transformed, which affects
 * how the content is processed and displayed
 */
export type PublicationType = 'scientific' | 'lectionary' | 'ubgems' | 'ubcatechism';

/**
 * Represents a node in the document structure
 *
 * @interface DocumentNode
 * @description Base interface for all document nodes in the AST (Abstract Syntax Tree)
 * @property {string} type - The type of node (e.g., 'paragraph', 'heading', etc.)
 * @property {DocumentNode[]} [children] - Child nodes contained within this node
 * @property {string} [value] - Text content of the node, if applicable
 * @property {Record<string, any>} [properties] - Additional properties specific to the node type
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
 *
 * @interface HeadingNode
 * @extends {DocumentNode}
 * @description A heading element (h1, h2, h3, etc.) in the document
 * @property {string} type - Always 'heading'
 * @property {1|2|3|4|5|6} depth - The heading level (1 for h1, 2 for h2, etc.)
 */
export interface HeadingNode extends DocumentNode {
  type: 'heading';
  depth: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Represents a paragraph in the document
 *
 * @interface ParagraphNode
 * @extends {DocumentNode}
 * @description A paragraph of text in the document
 * @property {string} type - Always 'paragraph'
 */
export interface ParagraphNode extends DocumentNode {
  type: 'paragraph';
}

/**
 * Represents a list in the document
 *
 * @interface ListNode
 * @extends {DocumentNode}
 * @description An ordered or unordered list in the document
 * @property {string} type - Always 'list'
 * @property {boolean} ordered - Whether the list is ordered (numbered) or unordered (bulleted)
 * @property {number} [start] - The starting number for ordered lists (defaults to 1 if not specified)
 */
export interface ListNode extends DocumentNode {
  type: 'list';
  ordered: boolean;
  start?: number;
}

/**
 * Represents a list item in the document
 *
 * @interface ListItemNode
 * @extends {DocumentNode}
 * @description An item within a list
 * @property {string} type - Always 'listItem'
 */
export interface ListItemNode extends DocumentNode {
  type: 'listItem';
}

/**
 * Represents a link in the document
 *
 * @interface LinkNode
 * @extends {DocumentNode}
 * @description A hyperlink in the document
 * @property {string} type - Always 'link'
 * @property {string} url - The URL that the link points to
 * @property {string} [title] - Optional title attribute for the link
 */
export interface LinkNode extends DocumentNode {
  type: 'link';
  url: string;
  title?: string;
}

/**
 * Represents an image in the document
 *
 * @interface ImageNode
 * @extends {DocumentNode}
 * @description An image in the document
 * @property {string} type - Always 'image'
 * @property {string} url - The URL of the image
 * @property {string} [alt] - Alternative text for the image
 * @property {string} [title] - Optional title for the image
 */
export interface ImageNode extends DocumentNode {
  type: 'image';
  url: string;
  alt?: string;
  title?: string;
}

/**
 * Represents a table in the document
 *
 * @interface TableNode
 * @extends {DocumentNode}
 * @description A table in the document
 * @property {string} type - Always 'table'
 * @property {Array<'left'|'center'|'right'|null>} [align] - Alignment for each column
 */
export interface TableNode extends DocumentNode {
  type: 'table';
  align?: Array<'left' | 'center' | 'right' | null>;
}

/**
 * Represents a table row in the document
 *
 * @interface TableRowNode
 * @extends {DocumentNode}
 * @description A row within a table
 * @property {string} type - Always 'tableRow'
 */
export interface TableRowNode extends DocumentNode {
  type: 'tableRow';
}

/**
 * Represents a table cell in the document
 *
 * @interface TableCellNode
 * @extends {DocumentNode}
 * @description A cell within a table row
 * @property {string} type - Always 'tableCell'
 */
export interface TableCellNode extends DocumentNode {
  type: 'tableCell';
}

/**
 * Represents a code block in the document
 *
 * @interface CodeNode
 * @extends {DocumentNode}
 * @description A block of code in the document
 * @property {string} type - Always 'code'
 * @property {string} [lang] - The programming language of the code
 * @property {string} [meta] - Additional metadata for the code block
 */
export interface CodeNode extends DocumentNode {
  type: 'code';
  lang?: string;
  meta?: string;
}

/**
 * Represents inline code in the document
 *
 * @interface InlineCodeNode
 * @extends {DocumentNode}
 * @description Inline code within a paragraph or other text
 * @property {string} type - Always 'inlineCode'
 */
export interface InlineCodeNode extends DocumentNode {
  type: 'inlineCode';
}

/**
 * Represents a blockquote in the document
 *
 * @interface BlockquoteNode
 * @extends {DocumentNode}
 * @description A blockquote or quoted text block
 * @property {string} type - Always 'blockquote'
 */
export interface BlockquoteNode extends DocumentNode {
  type: 'blockquote';
}

/**
 * Represents emphasis (italic) in the document
 *
 * @interface EmphasisNode
 * @extends {DocumentNode}
 * @description Emphasized text (typically rendered as italic)
 * @property {string} type - Always 'emphasis'
 */
export interface EmphasisNode extends DocumentNode {
  type: 'emphasis';
}

/**
 * Represents strong emphasis (bold) in the document
 *
 * @interface StrongNode
 * @extends {DocumentNode}
 * @description Strongly emphasized text (typically rendered as bold)
 * @property {string} type - Always 'strong'
 */
export interface StrongNode extends DocumentNode {
  type: 'strong';
}

/**
 * Represents a horizontal rule in the document
 *
 * @interface ThematicBreakNode
 * @extends {DocumentNode}
 * @description A horizontal rule or thematic break (e.g., ---)
 * @property {string} type - Always 'thematicBreak'
 */
export interface ThematicBreakNode extends DocumentNode {
  type: 'thematicBreak';
}

/**
 * Represents a root node that contains all other nodes
 *
 * @interface RootNode
 * @extends {DocumentNode}
 * @description The root node of the document tree that contains all other nodes
 * @property {string} type - Always 'root'
 */
export interface RootNode extends DocumentNode {
  type: 'root';
}

/**
 * Base metadata for all document types
 *
 * @interface BaseMetadata
 * @description Common metadata fields for all document types
 * @property {string} [title] - The document title
 * @property {string} [subtitle] - The document subtitle
 * @property {string|string[]} [author] - The document author(s)
 * @property {string} [date] - The document creation or publication date
 * @property {string[]} [categories] - Categories the document belongs to
 * @property {string[]} [tags] - Tags associated with the document
 * @property {string[]} [relatedContent] - URLs or references to related content
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
 *
 * @interface ScientificMetadata
 * @extends {BaseMetadata}
 * @description Metadata specific to scientific documents
 * @property {string} [abstract] - The document abstract
 * @property {string[]} [keywords] - Scientific keywords
 * @property {string[]} [references] - Academic references
 * @property {string} [doi] - Digital Object Identifier
 */
export interface ScientificMetadata extends BaseMetadata {
  abstract?: string;
  keywords?: string[];
  references?: string[];
  doi?: string;
}

/**
 * Lectionary document metadata
 *
 * @interface LectionaryMetadata
 * @extends {BaseMetadata}
 * @description Metadata specific to lectionary documents
 * @property {string} [liturgicalSeason] - The liturgical season
 * @property {string[]} [scriptureReferences] - References to scripture
 */
export interface LectionaryMetadata extends BaseMetadata {
  liturgicalSeason?: string;
  scriptureReferences?: string[];
}

/**
 * UB Gems document metadata
 *
 * @interface UBGemsMetadata
 * @extends {BaseMetadata}
 * @description Metadata specific to UB Gems documents
 * @property {number} [paperNumber] - The UB paper number
 * @property {number} [sectionNumber] - The section number within the paper
 * @property {string} [source] - The source of the gem
 */
export interface UBGemsMetadata extends BaseMetadata {
  paperNumber?: number;
  sectionNumber?: number;
  source?: string;
}

/**
 * UB Catechism document metadata
 *
 * @interface UBCatechismMetadata
 * @extends {BaseMetadata}
 * @description Metadata specific to UB Catechism documents
 * @property {number} [questionNumber] - The question number
 * @property {string} [topic] - The topic of the question
 */
export interface UBCatechismMetadata extends BaseMetadata {
  questionNumber?: number;
  topic?: string;
}

/**
 * Perplexity document metadata
 *
 * @interface PerplexityMetadata
 * @extends {BaseMetadata}
 * @description Metadata specific to Perplexity AI responses
 * @property {string} [question] - The question that was asked
 * @property {Array<{responseText?: string, sources?: string[]}>} [responses] - The responses from Perplexity
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
 *
 * @typedef {(BaseMetadata|ScientificMetadata|LectionaryMetadata|UBGemsMetadata|UBCatechismMetadata|PerplexityMetadata)} DocumentMetadata
 * @description A union of all possible metadata types
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
 *
 * @interface TransformedDocument
 * @description The result of transforming a document from its source format
 * @property {RootNode} content - The document content as a tree of nodes
 * @property {DocumentMetadata} metadata - The document metadata
 * @property {PublicationType} [publicationType] - The type of publication
 * @property {string} [html] - HTML representation of the document (if generated)
 * @property {string} [text] - Plain text representation of the document (if generated)
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
 *
 * @interface TransformOptions
 * @description Configuration options for the document transformation process
 * @property {boolean} [extractMetadata=true] - Whether to extract metadata from the document
 * @property {boolean} [sanitize=true] - Whether to sanitize the document content
 * @property {PublicationType} [publicationType] - The type of publication being transformed
 */
export interface TransformOptions {
  extractMetadata?: boolean;
  sanitize?: boolean;
  publicationType?: PublicationType;
  [key: string]: any;
}

/**
 * Reference to a UB paper and section
 *
 * @interface UBReference
 * @description A reference to a specific paper and section in the Urantia Book
 * @property {string} type - Always 'paper-section'
 * @property {number} paper - The paper number
 * @property {number} section - The section number
 * @property {string} originalText - The original text of the reference
 * @property {Object} position - The position of the reference in the source text
 * @property {number} position.start - The start index of the reference
 * @property {number} position.end - The end index of the reference
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
