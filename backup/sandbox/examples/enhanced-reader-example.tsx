/**
 * Enhanced Reader Example
 *
 * This file demonstrates the enhanced Reader component with the new
 * navigation and settings features.
 */

'use client';

import React from 'react';
import { Reader, Document, ReaderConfig } from '../lib/reader-core';
import './enhanced-reader-example.css';
import { createScientificExtension } from './scientific-extension';
import { globalExtensionRegistry } from '../lib/reader-core/utils';

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
            'This is an example document that demonstrates the enhanced Reader component with the new navigation and settings features. It shows how to structure content and how the Reader renders it.',
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
          content: 'The enhanced Reader component includes several new features:',
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
                'The Reader includes a hamburger menu that opens a navigation panel with a hierarchical structure of parts, papers, and sections.',
              references: [],
            },
          ],
        },
        {
          id: 'section-2-2',
          title: 'Settings',
          paragraphs: [
            {
              id: 'paragraph-6',
              content:
                'The Reader includes a settings panel that allows users to customize the theme, typography, and layout.',
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
            'This example demonstrates the enhanced Reader component with the new navigation and settings features. In a real application, you would use the document transformation system to convert content from various formats into the standardized document model.',
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
    title: 'Enhanced Reader Example',
    subtitle: 'A demonstration of the enhanced Reader component',
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
    appName: 'Enhanced Reader Example',
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
  theme: {
    mode: 'light',
    colors: {
      background: '#ffffff',
      text: '#333333',
      border: '#e2e8f0',
      panelBackground: '#f7fafc',
    },
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 'medium',
    fontStyle: 'sans-serif',
    lineSpacing: 'normal',
  },
  layout: {
    textWidth: 'medium',
    showParagraphNumbers: true,
    enableStickyHeaders: true,
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
 * Enhanced Reader Example Component
 */
export default function EnhancedReaderExample() {
  // Register the scientific extension
  React.useEffect(() => {
    // Create and register the scientific extension
    const scientificExtension = createScientificExtension();
    globalExtensionRegistry.register(scientificExtension);

    // Clean up on unmount
    return () => {
      globalExtensionRegistry.unregister(scientificExtension.id);
    };
  }, []);

  return (
    <div className="enhanced-reader-example">
      <Reader document={exampleDocument} config={exampleConfig} />
    </div>
  );
}
