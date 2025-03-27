/**
 * Content Normalizer
 * 
 * This module handles the normalization of content structure across different document types.
 * It ensures that all documents have a consistent structure regardless of their original format.
 */

import { DocumentNode, RootNode } from './types';

/**
 * Normalize the content structure
 * 
 * @param content The content to normalize
 * @returns A promise that resolves to the normalized content
 */
export async function normalizeContent(content: any): Promise<any> {
  // Extract the root node
  const rootNode = content.content as RootNode;
  
  // Apply normalization rules
  const normalizedRoot = normalizeNode(rootNode);
  
  // Return the normalized content
  return {
    ...content,
    content: normalizedRoot
  };
}

/**
 * Normalize a document node and its children
 * 
 * @param node The node to normalize
 * @returns The normalized node
 */
function normalizeNode(node: DocumentNode): DocumentNode {
  // Create a copy of the node to avoid mutating the original
  const normalizedNode: DocumentNode = { ...node };
  
  // Apply normalization rules based on node type
  switch (node.type) {
    case 'heading':
      // Ensure heading depth is between 1 and 6
      if (normalizedNode.depth && (normalizedNode.depth < 1 || normalizedNode.depth > 6)) {
        normalizedNode.depth = Math.max(1, Math.min(6, normalizedNode.depth));
      }
      break;
      
    case 'list':
      // Ensure ordered lists have a start value
      if (normalizedNode.ordered && normalizedNode.start === undefined) {
        normalizedNode.start = 1;
      }
      break;
      
    case 'link':
      // Ensure links have a valid URL
      if (!normalizedNode.url) {
        normalizedNode.url = '#';
      }
      break;
      
    case 'image':
      // Ensure images have alt text
      if (!normalizedNode.alt) {
        normalizedNode.alt = normalizedNode.title || 'Image';
      }
      break;
      
    case 'table':
      // Ensure tables have alignment information
      if (!normalizedNode.align && normalizedNode.children && normalizedNode.children.length > 0) {
        const firstRow = normalizedNode.children[0];
        if (firstRow.type === 'tableRow' && firstRow.children) {
          normalizedNode.align = Array(firstRow.children.length).fill('left');
        }
      }
      break;
  }
  
  // Normalize children recursively
  if (normalizedNode.children && Array.isArray(normalizedNode.children)) {
    normalizedNode.children = normalizedNode.children.map(normalizeNode);
  }
  
  return normalizedNode;
}

/**
 * Standardize heading hierarchy
 * 
 * This function ensures that heading levels are properly nested and sequential.
 * For example, it prevents h1 -> h3 without an h2 in between.
 * 
 * @param rootNode The root node of the document
 * @returns The root node with standardized heading hierarchy
 */
export function standardizeHeadingHierarchy(rootNode: RootNode): RootNode {
  // Create a copy of the root node
  const normalizedRoot: RootNode = {
    ...rootNode,
    children: [...(rootNode.children || [])]
  };
  
  // Track the current heading level
  let currentLevel = 1;
  
  // Process each node
  const children = normalizedRoot.children || [];
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    
    if (node.type === 'heading') {
      const headingNode = node as any;
      
      // Ensure heading levels don't skip (e.g., h1 -> h3)
      if (headingNode.depth > currentLevel + 1) {
        headingNode.depth = currentLevel + 1;
      }
      
      // Update current level
      currentLevel = headingNode.depth;
    }
  }
  
  return normalizedRoot;
}

/**
 * Normalize link formats
 * 
 * This function ensures that all links have a consistent format.
 * 
 * @param rootNode The root node of the document
 * @returns The root node with normalized links
 */
export function normalizeLinks(rootNode: RootNode): RootNode {
  // Create a copy of the root node
  const normalizedRoot: RootNode = { ...rootNode };
  
  // Function to process nodes recursively
  function processNode(node: DocumentNode): DocumentNode {
    // Create a copy of the node
    const processedNode: DocumentNode = { ...node };
    
    // Normalize link if this is a link node
    if (processedNode.type === 'link') {
      const linkNode = processedNode as any;
      
      // Ensure URL has a protocol
      if (linkNode.url && !linkNode.url.match(/^[a-zA-Z]+:\/\//)) {
        // If it's a relative path or just a domain
        if (linkNode.url.startsWith('/') || !linkNode.url.includes('/')) {
          linkNode.url = `https://${linkNode.url.replace(/^\//, '')}`;
        } else {
          linkNode.url = `https://${linkNode.url}`;
        }
      }
    }
    
    // Process children recursively
    if (processedNode.children && Array.isArray(processedNode.children)) {
      processedNode.children = processedNode.children.map(processNode);
    }
    
    return processedNode;
  }
  
  // Process all children
  if (normalizedRoot.children && Array.isArray(normalizedRoot.children)) {
    normalizedRoot.children = normalizedRoot.children.map(processNode);
  }
  
  return normalizedRoot;
}

/**
 * Normalize image references
 * 
 * This function ensures that all image references have a consistent format.
 * 
 * @param rootNode The root node of the document
 * @returns The root node with normalized image references
 */
export function normalizeImages(rootNode: RootNode): RootNode {
  // Create a copy of the root node
  const normalizedRoot: RootNode = { ...rootNode };
  
  // Function to process nodes recursively
  function processNode(node: DocumentNode): DocumentNode {
    // Create a copy of the node
    const processedNode: DocumentNode = { ...node };
    
    // Normalize image if this is an image node
    if (processedNode.type === 'image') {
      const imageNode = processedNode as any;
      
      // Ensure URL has a protocol
      if (imageNode.url && !imageNode.url.match(/^[a-zA-Z]+:\/\//) && !imageNode.url.startsWith('data:')) {
        // If it's a relative path, leave it as is
        if (!imageNode.url.startsWith('/')) {
          imageNode.url = `/${imageNode.url}`;
        }
      }
      
      // Ensure alt text
      if (!imageNode.alt) {
        imageNode.alt = imageNode.title || 'Image';
      }
    }
    
    // Process children recursively
    if (processedNode.children && Array.isArray(processedNode.children)) {
      processedNode.children = processedNode.children.map(processNode);
    }
    
    return processedNode;
  }
  
  // Process all children
  if (normalizedRoot.children && Array.isArray(normalizedRoot.children)) {
    normalizedRoot.children = normalizedRoot.children.map(processNode);
  }
  
  return normalizedRoot;
}