/**
 * Search Indexer
 *
 * This module processes transformed documents to extract searchable content
 * and build a search index.
 */

import { TransformedDocument, DocumentNode, RootNode } from '../document-transformer/types';

/**
 * Represents a document in the search index
 */
export interface SearchableDocument {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  type: 'scientific' | 'perplexity' | 'lectionary' | 'post';
  metadata: Record<string, any>;
  path: string;
  lastUpdated: string;
}

/**
 * Build a search index from transformed documents
 *
 * @param documents The transformed documents to index
 * @returns An array of searchable documents
 */
export async function buildSearchIndex(
  documents: Array<(TransformedDocument & { id: string; path: string; type?: string }) | null>
): Promise<SearchableDocument[]> {
  // Filter out null documents
  const validDocuments = documents.filter(
    (doc): doc is TransformedDocument & { id: string; path: string; type?: string } => doc !== null
  );

  return validDocuments.map(doc => ({
    id: doc.id,
    title: doc.metadata.title || '',
    content: doc.text || extractTextContent(doc.content),
    excerpt: generateExcerpt(doc),
    type: determineDocumentType(doc),
    metadata: extractMetadata(doc),
    path: doc.path,
    lastUpdated: doc.metadata.date || new Date().toISOString(),
  }));
}

/**
 * Extract plain text content from a document node
 *
 * @param node The document node to extract text from
 * @returns The extracted text content
 */
function extractTextContent(node: RootNode): string {
  let text = '';

  function traverse(node: DocumentNode): void {
    // Extract text from the current node
    if (node.value) {
      text += node.value + ' ';
    }

    // Recursively traverse child nodes
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }

  traverse(node);

  // Normalize whitespace
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Generate a short excerpt from a document
 *
 * @param doc The document to generate an excerpt for
 * @returns A short excerpt (150-200 chars)
 */
function generateExcerpt(doc: TransformedDocument & { id: string; path: string }): string {
  // Use existing text if available
  if (doc.text) {
    const text = doc.text.trim();
    if (text.length <= 200) {
      return text;
    }
    return text.substring(0, 197) + '...';
  }

  // Otherwise, extract from content
  let excerpt = '';
  let paragraphCount = 0;

  function traverse(node: DocumentNode): boolean {
    // Only process the first few paragraphs
    if (paragraphCount >= 2) {
      return false;
    }

    // Extract text from paragraphs
    if (node.type === 'paragraph') {
      paragraphCount++;

      if (node.children) {
        node.children.forEach(child => {
          if (child.value) {
            excerpt += child.value + ' ';
          }
        });
      }

      excerpt += ' ';

      // If we have enough text, stop traversing
      if (excerpt.length > 200) {
        return false;
      }
    }

    // Recursively traverse child nodes
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        if (!traverse(child)) {
          return false;
        }
      }
    }

    return true;
  }

  traverse(doc.content);

  // Trim and limit the excerpt
  excerpt = excerpt.trim();
  if (excerpt.length > 200) {
    excerpt = excerpt.substring(0, 197) + '...';
  }

  return excerpt;
}

/**
 * Determine the document type based on path, metadata, or content structure
 *
 * @param doc The document to determine the type for
 * @returns The document type
 */
function determineDocumentType(
  doc: TransformedDocument & { id: string; path: string }
): 'scientific' | 'perplexity' | 'lectionary' | 'post' {
  // Check path first
  const path = doc.path.toLowerCase();

  if (path.includes('scientific')) {
    return 'scientific';
  }

  if (path.includes('perplexity')) {
    return 'perplexity';
  }

  if (path.includes('lectionary')) {
    return 'lectionary';
  }

  // Check metadata
  const metadata = doc.metadata;

  if (metadata.type) {
    const type = metadata.type.toLowerCase();
    if (type === 'scientific' || type === 'perplexity' || type === 'lectionary') {
      return type as 'scientific' | 'perplexity' | 'lectionary';
    }
  }

  // Default to post
  return 'post';
}

/**
 * Extract relevant metadata for search
 *
 * @param doc The document to extract metadata from
 * @returns The extracted metadata
 */
function extractMetadata(
  doc: TransformedDocument & { id: string; path: string }
): Record<string, any> {
  const metadata = { ...doc.metadata };

  // Ensure consistent structure for common fields
  return {
    title: metadata.title || '',
    author: metadata.author || '',
    date: metadata.date || '',
    categories: Array.isArray(metadata.categories) ? metadata.categories : [],
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    ...metadata,
  };
}
