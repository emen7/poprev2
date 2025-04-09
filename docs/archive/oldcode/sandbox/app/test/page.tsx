import { transformContent } from '@ub-ecosystem/content-transformer';
import { DocumentReader } from '@ub-ecosystem/ui';

// Sample markdown content
const sampleMarkdown = `---
title: Sample Scientific Document
author: John Doe
date: 2025-03-26
categories: [Science, Cosmology]
tags: [universe, model, visualization]
---

# Introduction

This is a sample scientific document to demonstrate the document transformation system and reader component.

## The Master Universe Model (MUM)

The Master Universe Model attempts to align stellar observations with cosmological architecture.

### Key Visualizations and Findings

- Paradise Isle dimensions and structure
- Mother force circulations
- Space level configurations
- Comparisons between Galactic Coordinate Systems and Absolute Direction

### Astronomical Correlations

The model correlates with several astronomical observations including the placement of features like Cygnus and Andromeda (M31).

## Methodological Approach

The approach combines visualization techniques with astronomical data to create a comprehensive model.

### Computing Infrastructure and Visualization Techniques

Advanced 3D modeling and visualization techniques were employed to create the model.

### Key Methodological Assumptions

The model makes several key assumptions about the nature of space and time.

## Conclusion

This sample document demonstrates the capabilities of the PopRev2 document transformation system and reader component.
`;

export default async function TestPage() {
  try {
    // Transform the sample markdown document
    const transformedDocument = await transformContent(sampleMarkdown, 'markdown');
    
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Scientific Document Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DocumentReader document={transformedDocument} />
        </div>
      </div>
    );
  } catch (error: any) {
    // Handle any errors
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Error Loading Document</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>There was an error loading or transforming the document:</p>
          <pre className="mt-2 bg-gray-100 p-2 rounded">{error.message || String(error)}</pre>
        </div>
      </div>
    );
  }
}