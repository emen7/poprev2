/**
 * Content Transformer Package
 *
 * This package provides utilities for transforming content from various formats
 * (markdown, docx, perplexity) into a standardized internal format with enhanced metadata.
 */

// Import functions from modules
import {
  normalizeContent,
  standardizeHeadingHierarchy,
  normalizeLinks,
  normalizeImages,
} from './content-normalizer';
import { validateContent } from './content-validator';
import { transformDocx } from './docx-transformer';
import { transformMarkdown } from './markdown-transformer';
import { enrichMetadata } from './metadata-enricher';
import { transformPerplexity } from './perplexity-transformer';
import { DocumentType, TransformOptions, TransformedDocument, PublicationType } from './types';

// Export all types
export * from './types';

// Export transformer functions
export { transformMarkdown } from './markdown-transformer';
export { transformDocx } from './docx-transformer';
export { transformPerplexity } from './perplexity-transformer';
export {
  normalizeContent,
  standardizeHeadingHierarchy,
  normalizeLinks,
  normalizeImages,
} from './content-normalizer';
export { enrichMetadata } from './metadata-enricher';
export { validateContent } from './content-validator';

/**
 * Transform content from a source format into the standardized format
 *
 * @param content The content to transform
 * @param documentType The type of document (markdown, docx, perplexity)
 * @param options Transformation options
 * @returns A transformed document
 */
export async function transformContent(
  content: string | Buffer,
  documentType: DocumentType,
  options: TransformOptions = {}
): Promise<TransformedDocument> {
  let transformedContent;

  // Step 1: Transform the content based on document type
  switch (documentType) {
    case 'markdown':
      if (typeof content !== 'string') {
        throw new Error('Markdown content must be a string');
      }
      transformedContent = await transformMarkdown(content);
      break;

    case 'docx':
      if (!(content instanceof Buffer)) {
        throw new Error('DOCX content must be a Buffer');
      }
      transformedContent = await transformDocx(content);
      break;

    case 'perplexity':
      if (typeof content !== 'string') {
        throw new Error('Perplexity content must be a string');
      }
      transformedContent = await transformPerplexity(content);
      break;

    default:
      throw new Error(`Unsupported document type: ${documentType}`);
  }

  // Step 2: Normalize the content structure
  transformedContent = await normalizeContent(transformedContent);

  // Step 3: Enrich with metadata
  transformedContent = await enrichMetadata(transformedContent, options);

  // Step 4: Validate and sanitize the content
  transformedContent = await validateContent(transformedContent);

  // Add publicationType if provided in options
  if (options.publicationType) {
    transformedContent.publicationType = options.publicationType;
  }

  return transformedContent;
}
