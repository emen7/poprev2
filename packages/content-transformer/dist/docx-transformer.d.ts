/**
 * DOCX Transformer
 *
 * This module handles the transformation of DOCX content into the standardized
 * internal representation using mammoth.js.
 */
/**
 * Transform DOCX content into the standardized internal representation
 *
 * @param content The DOCX content as a Buffer
 * @returns A promise that resolves to the transformed content
 */
export declare function transformDocx(content: Buffer): Promise<any>;
