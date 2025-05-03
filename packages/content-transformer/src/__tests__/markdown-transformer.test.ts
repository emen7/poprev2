/**
 * Unit tests for the markdown transformer
 */

import { transformMarkdown } from '../markdown-transformer';
import { TransformedDocument } from '../types';

describe('Markdown Transformer', () => {
  it('should transform basic markdown content', async () => {
    // Arrange
    const markdown = '# Hello World\n\nThis is a test paragraph.';

    // Act
    const result = await transformMarkdown(markdown);

    // Assert
    expect(result).toBeDefined();
    expect(result.content).toBeDefined();
    expect(result.content.type).toBe('root');
    expect(result.content.children).toHaveLength(2);
    expect(result.content.children[0].type).toBe('heading');
    expect(result.content.children[0].depth).toBe(1);
    expect(result.content.children[1].type).toBe('paragraph');
    expect(result.html).toContain('<h1>Hello World</h1>');
    expect(result.html).toContain('<p>This is a test paragraph.</p>');
  });

  it('should extract frontmatter metadata', async () => {
    // Arrange
    const markdown = `---
title: Test Document
author: John Doe
date: 2023-04-17
---

# Hello World

This is a test paragraph.`;

    // Act
    const result = await transformMarkdown(markdown);

    // Assert
    expect(result.metadata).toBeDefined();
    expect(result.metadata.title).toBe('Test Document');
    expect(result.metadata.author).toBe('John Doe');
    expect(result.metadata.date).toBe('2023-04-17');
    expect(result.content.children).toHaveLength(2);
    expect(result.content.children[0].type).toBe('heading');
  });

  it('should handle complex markdown with various elements', async () => {
    // Arrange
    const markdown = `# Heading 1

## Heading 2

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2
  - Nested item 1
  - Nested item 2

1. Ordered item 1
2. Ordered item 2

> This is a blockquote

\`\`\`javascript
// This is a code block
function hello() {
  return 'world';
}
\`\`\`

[Link text](https://example.com)

![Image alt](https://example.com/image.jpg)

---

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;

    // Act
    const result = await transformMarkdown(markdown);

    // Assert
    expect(result.content.children.length).toBeGreaterThan(5);
    expect(result.html).toContain('<h1>Heading 1</h1>');
    expect(result.html).toContain('<h2>Heading 2</h2>');
    expect(result.html).toContain('<strong>bold</strong>');
    expect(result.html).toContain('<em>italic</em>');
    expect(result.html).toContain('<ul>');
    expect(result.html).toContain('<ol>');
    expect(result.html).toContain('<blockquote>');
    expect(result.html).toContain('<pre><code class="language-javascript">');
    expect(result.html).toContain('<a href="https://example.com">');
    expect(result.html).toContain('<img src="https://example.com/image.jpg"');
    expect(result.html).toContain('<hr>');
    expect(result.html).toContain('<table>');
  });

  it('should return an empty document for empty input', async () => {
    // Arrange
    const markdown = '';

    // Act
    const result = await transformMarkdown(markdown);

    // Assert
    expect(result.content).toBeDefined();
    expect(result.content.type).toBe('root');
    expect(result.content.children).toHaveLength(0);
    expect(result.metadata).toEqual({});
    expect(result.html).toBe('');
  });
});
