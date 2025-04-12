/**
 * Content Transformer Package
 *
 * This package provides utilities for transforming content from various formats
 * (markdown, docx, perplexity) into a standardized internal format with enhanced metadata.
 */
import { DocumentType, TransformOptions, TransformedDocument } from './types';
export * from './types';
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
export declare function transformContent(
  content: string | Buffer,
  documentType: DocumentType,
  options?: TransformOptions
): Promise<TransformedDocument>;
