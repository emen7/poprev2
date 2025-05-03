/**
 * Markdown Transformer
 *
 * This module handles the transformation of markdown content into the standardized
 * internal representation using the unified.js ecosystem (remark/rehype).
 *
 * @module content-transformer/markdown-transformer
 */

import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { RootNode, DocumentNode, TransformedDocument, BaseMetadata } from './types';

/**
 * Extract metadata from markdown frontmatter if present
 *
 * @param {string} content - The markdown content to extract frontmatter from
 * @returns {Object} An object containing the extracted metadata and the content without frontmatter
 * @returns {BaseMetadata} returns.metadata - The extracted metadata as key-value pairs
 * @returns {string} returns.content - The content with frontmatter removed
 */
function extractFrontmatter(content: string): { metadata: BaseMetadata; content: string } {
  // Simple frontmatter extraction (YAML between --- delimiters)
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const frontmatter = match[1];
  const contentWithoutFrontmatter = content.slice(match[0].length);

  // Parse YAML frontmatter
  const metadata: BaseMetadata = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value;
    }
  });

  return { metadata, content: contentWithoutFrontmatter };
}

/**
 * Transform markdown content into the standardized internal representation
 *
 * @param {string} content - The markdown content to transform
 * @returns {Promise<TransformedDocument>} A promise that resolves to the transformed document
 */
export async function transformMarkdown(content: string): Promise<TransformedDocument> {
  // Extract frontmatter metadata if present
  const { metadata, content: contentWithoutFrontmatter } = extractFrontmatter(content);

  // Parse markdown to AST
  const markdownAST = unified().use(remarkParse).parse(contentWithoutFrontmatter);

  // Convert to HTML for preview/display purposes
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(contentWithoutFrontmatter)
  );

  // Convert the remark AST to our internal representation
  const transformedContent = convertRemarkAstToInternalFormat(markdownAST);

  // Create plain text version
  const text = contentWithoutFrontmatter;

  // Return the transformed document
  return {
    content: transformedContent,
    metadata,
    html,
    text,
  };
}

/**
 * Convert a remark AST to our internal document representation format
 *
 * @param {Object} ast - The remark AST to convert
 * @returns {RootNode} The converted AST in our internal format
 */
function convertRemarkAstToInternalFormat(ast: any): RootNode {
  // Start with the root node
  const root: RootNode = {
    type: 'root',
    children: [],
  };

  // Process each child node
  if (ast.children && Array.isArray(ast.children)) {
    root.children = ast.children.map(convertNode);
  }

  return root;
}

/**
 * Convert a single remark node to our internal format
 *
 * @param {Object} node - The remark node to convert
 * @returns {DocumentNode} The converted node in our internal format
 */
function convertNode(node: any): DocumentNode {
  // Base node structure
  const convertedNode: DocumentNode = {
    type: node.type,
  };

  // Copy relevant properties based on node type
  switch (node.type) {
    case 'heading':
      // Convert heading with depth property
      convertedNode.depth = node.depth;
      break;
    case 'list':
      // Convert list with ordered and start properties
      convertedNode.ordered = node.ordered;
      if (node.start !== null && node.start !== undefined) {
        convertedNode.start = node.start;
      }
      break;
    case 'link':
      // Convert link with url and optional title
      convertedNode.url = node.url;
      if (node.title) {
        convertedNode.title = node.title;
      }
      break;
    case 'image':
      // Convert image with url, alt, and optional title
      convertedNode.url = node.url;
      if (node.alt) {
        convertedNode.alt = node.alt;
      }
      if (node.title) {
        convertedNode.title = node.title;
      }
      break;
    case 'code':
      // Convert code block with optional lang and meta properties
      if (node.lang) {
        convertedNode.lang = node.lang;
      }
      if (node.meta) {
        convertedNode.meta = node.meta;
      }
      convertedNode.value = node.value;
      break;
    case 'inlineCode':
    case 'text':
      // Convert text nodes with value property
      convertedNode.value = node.value;
      break;
    case 'table':
      // Convert table with optional align property
      if (node.align) {
        convertedNode.align = node.align;
      }
      break;
  }

  // Process children recursively
  if (node.children && Array.isArray(node.children)) {
    convertedNode.children = node.children.map(convertNode);
  }

  return convertedNode;
}
