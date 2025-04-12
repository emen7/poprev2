/**
 * DOCX Transformer
 *
 * This module handles the transformation of DOCX content into the standardized
 * internal representation using mammoth.js.
 */

import mammoth from 'mammoth';

import { RootNode, DocumentNode, DocumentMetadata } from './types';

/**
 * Transform DOCX content into the standardized internal representation
 *
 * @param content The DOCX content as a Buffer
 * @returns A promise that resolves to the transformed content
 */
export async function transformDocx(content: Buffer): Promise<any> {
  // Extract the raw text and HTML from the DOCX file
  const { value: html, messages } = await mammoth.convertToHtml({ buffer: content });
  const { value: text } = await mammoth.extractRawText({ buffer: content });

  // Extract metadata from the document
  const metadata = await extractDocxMetadata(content);

  // Convert the HTML to our internal representation
  const transformedContent = convertHtmlToInternalFormat(html);

  return {
    content: transformedContent,
    metadata,
    html,
    text,
  };
}

/**
 * Extract metadata from a DOCX document
 *
 * @param content The DOCX content as a Buffer
 * @returns A promise that resolves to the extracted metadata
 */
async function extractDocxMetadata(content: Buffer): Promise<DocumentMetadata> {
  try {
    // For now, we'll extract basic metadata from the document content
    // In a production environment, you might want to use a more robust solution
    // like docx-metadata or office-document-properties

    // Extract title from first heading if available
    const { value: text } = await mammoth.extractRawText({ buffer: content });
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    // Build metadata object
    const metadata: DocumentMetadata = {};

    // Use first line as title if it looks like a heading
    if (lines.length > 0) {
      metadata.title = lines[0].trim();

      // Try to extract author if there's a "By" or "Author:" pattern
      const authorLine = lines.find(
        line => line.includes('By:') || line.includes('Author:') || line.match(/^By\s+[A-Z]/)
      );

      if (authorLine) {
        const authorMatch =
          authorLine.match(/(?:By:|Author:)\s*(.+)/) || authorLine.match(/^By\s+(.+)/);
        if (authorMatch && authorMatch[1]) {
          metadata.author = authorMatch[1].trim();
        }
      }
    }

    return metadata;
  } catch (error) {
    console.error('Error extracting DOCX metadata:', error);
    return {};
  }
}

/**
 * Convert HTML content to our internal document representation format
 *
 * @param html The HTML content to convert
 * @returns The converted content in our internal format
 */
function convertHtmlToInternalFormat(html: string): RootNode {
  // Start with the root node
  const root: RootNode = {
    type: 'root',
    children: [],
  };

  // In a server environment, we'll use a simple regex-based approach
  // This is a simplified implementation that handles basic HTML elements

  // Extract paragraphs
  const paragraphs = html.match(/<p>(.*?)<\/p>/g) || [];

  // Extract headings
  const headings = [];
  for (let i = 1; i <= 6; i++) {
    const matches = html.match(new RegExp(`<h${i}>(.*?)<\/h${i}>`, 'g')) || [];
    headings.push(...matches.map(match => ({ level: i, content: match })));
  }

  // Extract lists (using a simpler approach without the 's' flag)
  const lists = html.match(/<ul>[\s\S]*?<\/ul>|<ol>[\s\S]*?<\/ol>/g) || [];

  // Process paragraphs
  root.children = [
    ...paragraphs.map(p => ({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: p.replace(/<p>(.*?)<\/p>/, '$1').replace(/<[^>]*>/g, ''), // Remove any HTML tags
        },
      ],
    })),

    // Process headings
    ...headings.map(h => ({
      type: 'heading',
      depth: h.level,
      children: [
        {
          type: 'text',
          value: h.content
            .replace(new RegExp(`<h${h.level}>(.*?)<\/h${h.level}>`), '$1')
            .replace(/<[^>]*>/g, ''), // Remove any HTML tags
        },
      ],
    })),
  ];

  return root;
}

// This function is no longer needed as we're using a simplified approach
// that doesn't rely on browser-specific DOM APIs
