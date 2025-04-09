/**
 * Markdown Transformer
 *
 * This module handles the transformation of markdown content into the standardized
 * internal representation using the unified.js ecosystem (remark/rehype).
 */
/**
 * Transform markdown content into the standardized internal representation
 *
 * @param content The markdown content to transform
 * @returns A promise that resolves to the transformed content
 */
export declare function transformMarkdown(content: string): Promise<any>;
