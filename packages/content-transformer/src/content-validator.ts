/**
 * Content Validator
 * 
 * This module handles the validation and sanitization of transformed content.
 * It ensures that the content meets our requirements and is safe for display.
 */

import { DocumentNode, RootNode, TransformedDocument } from './types';

/**
 * Validate and sanitize the transformed content
 * 
 * @param content The content to validate
 * @returns A promise that resolves to the validated content
 */
export async function validateContent(content: any): Promise<TransformedDocument> {
  // Validate the content structure
  validateContentStructure(content.content);
  
  // Sanitize the content to remove any potentially harmful elements
  const sanitizedContent = sanitizeContent(content.content);
  
  // Validate metadata
  const validatedMetadata = validateMetadata(content.metadata);
  
  // Return the validated content
  return {
    content: sanitizedContent,
    metadata: validatedMetadata,
    html: content.html,
    text: content.text
  };
}

/**
 * Validate the content structure
 * 
 * @param rootNode The root node of the document
 * @throws Error if the content structure is invalid
 */
function validateContentStructure(rootNode: RootNode): void {
  // Ensure the root node is present and has the correct type
  if (!rootNode || rootNode.type !== 'root') {
    throw new Error('Invalid content structure: Root node is missing or has incorrect type');
  }
  
  // Ensure the root node has children
  if (!rootNode.children || !Array.isArray(rootNode.children)) {
    throw new Error('Invalid content structure: Root node has no children');
  }
  
  // Validate each child node recursively
  for (const child of rootNode.children) {
    validateNode(child);
  }
}

/**
 * Validate a single node
 * 
 * @param node The node to validate
 * @throws Error if the node is invalid
 */
function validateNode(node: DocumentNode): void {
  // Ensure the node has a type
  if (!node.type) {
    throw new Error('Invalid node: Missing type');
  }
  
  // Validate specific node types
  switch (node.type) {
    case 'heading':
      if (!node.depth || node.depth < 1 || node.depth > 6) {
        throw new Error('Invalid heading node: Depth must be between 1 and 6');
      }
      break;
      
    case 'link':
      if (!node.url) {
        throw new Error('Invalid link node: Missing URL');
      }
      break;
      
    case 'image':
      if (!node.url) {
        throw new Error('Invalid image node: Missing URL');
      }
      break;
  }
  
  // Validate children recursively
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      validateNode(child);
    }
  }
}

/**
 * Sanitize the content to remove any potentially harmful elements
 * 
 * @param rootNode The root node of the document
 * @returns The sanitized root node
 */
function sanitizeContent(rootNode: RootNode): RootNode {
  // Create a copy of the root node
  const sanitizedRoot: RootNode = { ...rootNode, children: [] };
  
  // Sanitize each child node
  if (rootNode.children && Array.isArray(rootNode.children)) {
    sanitizedRoot.children = rootNode.children.map(sanitizeNode);
  }
  
  return sanitizedRoot;
}

/**
 * Sanitize a single node
 * 
 * @param node The node to sanitize
 * @returns The sanitized node
 */
function sanitizeNode(node: DocumentNode): DocumentNode {
  // Create a copy of the node
  const sanitizedNode: DocumentNode = { ...node };
  
  // Sanitize specific node types
  switch (node.type) {
    case 'text':
      // Sanitize text content
      if (sanitizedNode.value) {
        sanitizedNode.value = sanitizeText(sanitizedNode.value);
      }
      break;
      
    case 'link':
      // Sanitize link URLs
      if (sanitizedNode.url) {
        sanitizedNode.url = sanitizeUrl(sanitizedNode.url);
      }
      break;
      
    case 'image':
      // Sanitize image URLs
      if (sanitizedNode.url) {
        sanitizedNode.url = sanitizeUrl(sanitizedNode.url);
      }
      break;
  }
  
  // Sanitize children recursively
  if (sanitizedNode.children && Array.isArray(sanitizedNode.children)) {
    sanitizedNode.children = sanitizedNode.children.map(sanitizeNode);
  }
  
  return sanitizedNode;
}

/**
 * Sanitize text content
 * 
 * @param text The text to sanitize
 * @returns The sanitized text
 */
function sanitizeText(text: string): string {
  // Replace potentially harmful characters
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&(?!(lt|gt|amp|quot|apos);)/g, '&amp;');
}

/**
 * Sanitize a URL
 * 
 * @param url The URL to sanitize
 * @returns The sanitized URL
 */
function sanitizeUrl(url: string): string {
  // Ensure the URL doesn't contain javascript: or data: protocols
  if (url.match(/^(javascript|data):/i)) {
    return '#';
  }
  
  return url;
}

/**
 * Validate metadata
 * 
 * @param metadata The metadata to validate
 * @returns The validated metadata
 */
function validateMetadata(metadata: any): any {
  // Create a copy of the metadata
  const validatedMetadata = { ...metadata };
  
  // Ensure title is a string
  if (validatedMetadata.title && typeof validatedMetadata.title !== 'string') {
    validatedMetadata.title = String(validatedMetadata.title);
  }
  
  // Ensure author is a string or array of strings
  if (validatedMetadata.author) {
    if (Array.isArray(validatedMetadata.author)) {
      validatedMetadata.author = validatedMetadata.author.map((author: any) =>
        typeof author === 'string' ? author : String(author)
      );
    } else if (typeof validatedMetadata.author !== 'string') {
      validatedMetadata.author = String(validatedMetadata.author);
    }
  }
  
  // Ensure date is a valid date string
  if (validatedMetadata.date) {
    try {
      const date = new Date(validatedMetadata.date);
      if (!isNaN(date.getTime())) {
        validatedMetadata.date = date.toISOString().split('T')[0];
      } else {
        delete validatedMetadata.date;
      }
    } catch (e) {
      delete validatedMetadata.date;
    }
  }
  
  // Ensure categories is an array of strings
  if (validatedMetadata.categories) {
    if (!Array.isArray(validatedMetadata.categories)) {
      validatedMetadata.categories = [String(validatedMetadata.categories)];
    } else {
      validatedMetadata.categories = validatedMetadata.categories.map((category: any) =>
        typeof category === 'string' ? category : String(category)
      );
    }
  }
  
  // Ensure tags is an array of strings
  if (validatedMetadata.tags) {
    if (!Array.isArray(validatedMetadata.tags)) {
      validatedMetadata.tags = [String(validatedMetadata.tags)];
    } else {
      validatedMetadata.tags = validatedMetadata.tags.map((tag: any) =>
        typeof tag === 'string' ? tag : String(tag)
      );
    }
  }
  
  return validatedMetadata;
}