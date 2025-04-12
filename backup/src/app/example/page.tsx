/**
 * Example Page
 *
 * This page demonstrates the document transformation system and reader component.
 */

import { transformDocument } from '../../lib/document-transformer';
import { DocumentReader } from '../../components/document-reader';

// Sample markdown content
const sampleMarkdown = `---
title: Sample Document
author: John Doe
date: 2025-03-26
categories: [Example, Documentation]
tags: [markdown, sample, demo]
---

# Introduction

This is a sample document to demonstrate the document transformation system and reader component.

## Features

The PopRev2 platform includes the following features:

- Document transformation from various formats
- Unified display across devices
- Rich metadata extraction
- Interactive navigation

### Document Transformation

The document transformation system converts content from different formats (markdown, DOCX) into a standardized internal representation.

#### Supported Formats

1. Markdown
2. DOCX
3. Perplexity responses (coming soon)

## Code Example

Here's an example of how to use the transformation system:

\`\`\`typescript
import { transformDocument } from '@/lib/document-transformer';

// Transform a markdown document
const result = await transformDocument(markdownContent, 'markdown');

// Access the transformed content
console.log(result.metadata.title);
console.log(result.html);
\`\`\`

## Conclusion

This sample document demonstrates the capabilities of the PopRev2 document transformation system and reader component.

> The system is designed to be extensible and adaptable to different use cases.

![Example Image](https://example.com/image.jpg)

For more information, visit [our website](https://example.com).
`;

export default async function ExamplePage() {
  // Transform the sample markdown document
  const transformedDocument = await transformDocument(sampleMarkdown, 'markdown');

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Document Transformation Example</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <DocumentReader document={transformedDocument} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Raw Transformed Data</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(transformedDocument, null, 2)}
        </pre>
      </div>
    </div>
  );
}
