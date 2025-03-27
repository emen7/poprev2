/**
 * Document Transformer Tests
 */

import { transformDocument } from '../index';
import { DocumentType } from '../types';

describe('Document Transformer', () => {
  describe('Markdown Transformation', () => {
    const sampleMarkdown = `---
title: Test Document
author: Test Author
date: 2025-03-26
---

# Heading 1

This is a paragraph with **bold** and *italic* text.

## Heading 2

- List item 1
- List item 2
- List item 3

### Heading 3

[Link text](https://example.com)

\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`;

    it('should transform markdown to the internal format', async () => {
      const result = await transformDocument(sampleMarkdown, 'markdown' as DocumentType);
      
      // Check that the result has the expected structure
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('html');
      
      // Check metadata extraction
      expect(result.metadata).toHaveProperty('title', 'Test Document');
      expect(result.metadata).toHaveProperty('author', 'Test Author');
      expect(result.metadata).toHaveProperty('date', '2025-03-26');
      
      // Check content structure
      expect(result.content).toHaveProperty('type', 'root');
      expect(result.content).toHaveProperty('children');
      expect(Array.isArray(result.content.children)).toBe(true);
      
      // Check that headings were properly parsed
      const headings = result.content.children.filter((node: any) => node.type === 'heading');
      expect(headings.length).toBeGreaterThan(0);
      
      // Check HTML output
      expect(typeof result.html).toBe('string');
      expect(result.html).toContain('<h1>');
      expect(result.html).toContain('<h2>');
      expect(result.html).toContain('<h3>');
      expect(result.html).toContain('<strong>');
      expect(result.html).toContain('<em>');
      expect(result.html).toContain('<a href="https://example.com">');
      expect(result.html).toContain('<pre><code class="language-javascript">');
    });
  });
  
  describe('Content Normalization', () => {
    const markdownWithIssues = `
# Heading 1

[Bad link](javascript:alert('XSS'))

<script>alert('XSS')</script>

![Image without alt](https://example.com/image.jpg)
`;

    it('should sanitize potentially harmful content', async () => {
      const result = await transformDocument(markdownWithIssues, 'markdown' as DocumentType);
      
      // Check that the javascript: URL was sanitized
      const links = findNodesByType(result.content, 'link');
      for (const link of links) {
        expect(link.url).not.toContain('javascript:');
      }
      
      // Check that script tags were removed or sanitized
      expect(result.html).not.toContain('<script>');
      
      // Check that images have alt text
      const images = findNodesByType(result.content, 'image');
      for (const image of images) {
        expect(image).toHaveProperty('alt');
        expect(typeof image.alt).toBe('string');
      }
    });
  });
});

/**
 * Find all nodes of a specific type in the content tree
 * 
 * @param node The root node to search
 * @param type The type of nodes to find
 * @returns Array of matching nodes
 */
function findNodesByType(node: any, type: string): any[] {
  const results: any[] = [];
  
  if (node.type === type) {
    results.push(node);
  }
  
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      results.push(...findNodesByType(child, type));
    }
  }
  
  return results;
}