/**
 * Document Transformer
 *
 * This module serves as the main entry point for the document transformation system.
 * It orchestrates the process of transforming various document formats into a standardized
 * internal representation that can be used throughout the application.
 */

import { transformMarkdown } from './markdown-transformer';
import { transformDocx } from './docx-transformer';
import { transformPerplexity } from './perplexity-transformer';
import { normalizeContent } from './content-normalizer';
import { validateContent } from './content-validator';
import { enrichMetadata } from './metadata-enricher';
import { DocumentType, TransformedDocument } from './types';

/**
 * Transform a document from its original format to the standardized internal representation
 *
 * @param content The content of the document to transform
 * @param type The type of the document (markdown, docx, perplexity)
 * @param options Optional configuration for the transformation process
 * @returns A promise that resolves to the transformed document
 */
export async function transformDocument(
  content: string | Buffer,
  type: DocumentType,
  options: any = {}
): Promise<TransformedDocument> {
  // Step 1: Parse the document based on its type
  let parsedContent;

  switch (type) {
    case 'markdown':
      parsedContent = await transformMarkdown(content as string);
      break;
    case 'docx':
      parsedContent = await transformDocx(content as Buffer);
      break;
    case 'perplexity':
      parsedContent = await transformPerplexity(content as string);
      break;
    default:
      throw new Error(`Unsupported document type: ${type}`);
  }

  // Step 2: Normalize the content structure
  const normalizedContent = await normalizeContent(parsedContent);

  // Step 3: Enrich with metadata
  const enrichedContent = await enrichMetadata(normalizedContent, options);

  // Step 4: Validate the content
  const validatedContent = await validateContent(enrichedContent);

  return validatedContent;
}

export * from './types';
