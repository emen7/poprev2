/**
 * Content Validator
 *
 * This module handles the validation and sanitization of transformed content.
 * It ensures that the content meets our requirements and is safe for display.
 */
import { TransformedDocument } from './types';
/**
 * Validate and sanitize the transformed content
 *
 * @param content The content to validate
 * @returns A promise that resolves to the validated content
 */
export declare function validateContent(content: any): Promise<TransformedDocument>;
