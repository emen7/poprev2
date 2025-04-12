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
      const headings = result.content.children
        ? result.content.children.filter((node: any) => node.type === 'heading')
        : [];
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

  describe('Perplexity Transformation', () => {
    const samplePerplexityResponse = `What is the Urantia Book?

The Urantia Book is a spiritual and philosophical text that was first published in 1955 by the Urantia Foundation. It claims to have been authored by celestial beings as a revelation to Earth (referred to as "Urantia" in the book).

The book is divided into four parts:
- The Central and Superuniverses
- The Local Universe
- The History of Urantia
- The Life and Teachings of Jesus

The Urantia Book presents a complex cosmology, describing the origin and structure of the universe, the relationship between God and humans, and provides an extensive rewriting of human history and a detailed narrative of Jesus's life not found in the Bible.

The text combines elements of science, philosophy, and religion, attempting to reconcile religious faith with scientific facts and philosophical understandings. It presents itself as a revelation meant to expand cosmic consciousness and enhance spiritual perception.

While it has a dedicated following around the world, the Urantia Book is not generally recognized as scripture by mainstream religious organizations. The exact authorship remains controversial, with the Urantia Foundation maintaining it was authored by celestial beings, while critics suggest it was written by humans, possibly by a Chicago psychiatrist named William S. Sadler or others in his circle.

Sources:
https://www.urantia.org/urantia-book/read-urantia-book-online
https://en.wikipedia.org/wiki/The_Urantia_Book
`;

    it('should transform Perplexity responses to the internal format', async () => {
      const result = await transformDocument(
        samplePerplexityResponse,
        'perplexity' as DocumentType
      );

      // Check that the result has the expected structure
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('html');

      // Check metadata extraction
      expect(result.metadata).toHaveProperty('title');
      expect(result.metadata.title).toBe('What is the Urantia Book?');
      expect(result.metadata).toHaveProperty('author', 'Perplexity AI');
      expect(result.metadata).toHaveProperty('categories');
      expect(result.metadata).toHaveProperty('tags');

      // Check content structure
      expect(result.content).toHaveProperty('type', 'root');
      expect(result.content).toHaveProperty('children');
      expect(Array.isArray(result.content.children)).toBe(true);
      // Check that the question is included as a heading
      const headings = findNodesByType(result.content, 'heading');
      expect(headings.length).toBeGreaterThan(0);
      expect(headings[0].children && headings[0].children[0] && headings[0].children[0].value).toBe(
        'What is the Urantia Book?'
      );

      // Check that the list was properly parsed
      const lists = findNodesByType(result.content, 'list');
      expect(lists.length).toBeGreaterThan(0);

      // Check that sources were included
      const sourcesHeading = headings.find(
        (h: any) => h.children && h.children[0] && h.children[0].value === 'Sources'
      );
      expect(sourcesHeading).toBeDefined();

      // Check HTML output
      expect(typeof result.html).toBe('string');
      expect(result.html).toContain('<h1>');
      expect(result.html).toContain('<ul>');
      expect(result.html).toContain('<li>');
      expect(result.html).toContain(
        '<a href="https://www.urantia.org/urantia-book/read-urantia-book-online"'
      );
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
