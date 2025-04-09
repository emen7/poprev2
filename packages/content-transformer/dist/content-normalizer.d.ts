/**
 * Content Normalizer
 *
 * This module handles the normalization of content structure across different document types.
 * It ensures that all documents have a consistent structure regardless of their original format.
 */
import { RootNode } from './types';
/**
 * Normalize the content structure
 *
 * @param content The content to normalize
 * @returns A promise that resolves to the normalized content
 */
export declare function normalizeContent(content: any): Promise<any>;
/**
 * Standardize heading hierarchy
 *
 * This function ensures that heading levels are properly nested and sequential.
 * For example, it prevents h1 -> h3 without an h2 in between.
 *
 * @param rootNode The root node of the document
 * @returns The root node with standardized heading hierarchy
 */
export declare function standardizeHeadingHierarchy(rootNode: RootNode): RootNode;
/**
 * Normalize link formats
 *
 * This function ensures that all links have a consistent format.
 *
 * @param rootNode The root node of the document
 * @returns The root node with normalized links
 */
export declare function normalizeLinks(rootNode: RootNode): RootNode;
/**
 * Normalize image references
 *
 * This function ensures that all image references have a consistent format.
 *
 * @param rootNode The root node of the document
 * @returns The root node with normalized image references
 */
export declare function normalizeImages(rootNode: RootNode): RootNode;
