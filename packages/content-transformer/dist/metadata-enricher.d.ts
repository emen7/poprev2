/**
 * Metadata Enricher
 *
 * This module handles the extraction and enhancement of metadata from document content.
 * It identifies and extracts key information such as title, author, date, and categories.
 */
/**
 * Enrich the document with metadata
 *
 * @param content The content to enrich
 * @param options Optional configuration for the enrichment process
 * @returns A promise that resolves to the enriched content
 */
export declare function enrichMetadata(content: any, options?: any): Promise<any>;
