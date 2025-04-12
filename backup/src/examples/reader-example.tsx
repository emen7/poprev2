/**
 * Reader Example
 *
 * This file demonstrates how to use the Reader component.
 */

'use client';

import React, { useEffect } from 'react';
import { Reader, Document, ReaderConfig } from '../lib/reader-core';
import { createScientificExtension } from './scientific-extension';
import { globalExtensionRegistry } from '../lib/reader-core/utils';
import { ReaderWrapper } from './ReaderWrapper';
import './reader-example.css';

/**
 * Example document
 */
const exampleDocument: Document = {
  id: 'example-doc-1',
  title: 'Example Document',
  type: 'main',
  sections: [
    {
      id: 'section-1',
      title: 'Introduction',
      paragraphs: [
        {
          id: 'paragraph-1',
          content:
            'This is an example document that demonstrates the Reader component. It shows how to structure content and how the Reader renders it.',
          references: [],
        },
        {
          id: 'paragraph-2',
          content:
            'The Reader component is designed to be extensible and configurable, allowing for specialized features for different types of content.',
          references: [],
        },
      ],
      subsections: [
        {
          id: 'section-1-1',
          title: 'Purpose',
          paragraphs: [
            {
              id: 'paragraph-3',
              content:
                'The purpose of this example is to show how the Reader component can be used to display structured content with proper formatting and navigation.',
              references: [],
            },
          ],
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Features',
      paragraphs: [
        {
          id: 'paragraph-4',
          content: 'The Reader component includes several features:',
          references: [],
        },
      ],
      subsections: [
        {
          id: 'section-2-1',
          title: 'Navigation',
          paragraphs: [
            {
              id: 'paragraph-5',
              content:
                'The Reader includes a table of contents for easy navigation through the document.',
              references: [],
            },
          ],
        },
        {
          id: 'section-2-2',
          title: 'Theming',
          paragraphs: [
            {
              id: 'paragraph-6',
              content:
                'The Reader can be themed with custom colors and fonts through the configuration.',
              references: [
                {
                  id: 'ref-1',
                  type: 'supporting',
                  targetDocumentId: 'doc-2',
                  targetParagraphId: 'para-5',
                },
              ],
            },
          ],
        },
        {
          id: 'section-2-3',
          title: 'Extensions',
          paragraphs: [
            {
              id: 'paragraph-7',
              content:
                'The Reader can be extended with plugins that provide specialized features for different types of content.',
              references: [],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Conclusion',
      paragraphs: [
        {
          id: 'paragraph-8',
          content:
            'This example demonstrates the basic functionality of the Reader component. In a real application, you would use the document transformation system to convert content from various formats into the standardized document model.',
          references: [],
        },
      ],
    },
  ],
  relationships: [
    {
      type: 'supports',
      targetDocumentId: 'doc-2',
      description: 'This document supports the concepts described in Document 2.',
    },
  ],
  metadata: {
    title: 'Example Document',
    subtitle: 'A demonstration of the Reader component',
    author: 'Reader Team',
    date: '2025-04-01',
    categories: ['Documentation', 'Example'],
    tags: ['reader', 'component', 'example'],
  },
};

/**
 * Example configuration
 */
const exampleConfig: Partial<ReaderConfig> = {
  branding: {
    primaryColor: '#4a6da7',
    secondaryColor: '#6c757d',
    appName: 'Scientific Reader Example',
  },
  navigation: {
    showTableOfContents: true,
    showBreadcrumbs: true,
    showRelationshipMap: true,
    showNavigationControls: true,
    showSearch: true,
    showSettings: true,
    linkbackUrl: '/',
    linkbackText: 'Back to Examples',
  },
  extensions: ['scientific-extension'],
  extensionConfig: {
    'scientific-extension': {
      // Scientific extension specific configuration
      citationStyle: 'APA',
      enableMathJax: true,
      enableCharts: true,
    },
  },
};

/**
 * Reader Example Component
 */
export default function ReaderExample() {
  // Register the scientific extension
  useEffect(() => {
    // Create and register the scientific extension
    const scientificExtension = createScientificExtension();
    globalExtensionRegistry.register(scientificExtension);

    // Clean up on unmount
    return () => {
      globalExtensionRegistry.unregister(scientificExtension.id);
    };
  }, []);

  return (
    <div className="reader-example">
      <ReaderWrapper>
        <Reader document={exampleDocument} config={exampleConfig} />
      </ReaderWrapper>
    </div>
  );
}
