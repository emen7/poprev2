/**
 * Enhanced Reader Example
 *
 * This file demonstrates the enhanced Reader component with the new
 * navigation and settings features.
 */

&apos;use client';

import React from &apos;react';

import type { Document, ReaderConfig } from '../lib/archive/reader-core';
import { Reader } from '../lib/archive/reader-core';

import './enhanced-reader-example.css';
import { globalExtensionRegistry } from '../lib/archive/reader-core/utils';

import { createScientificExtension } from './scientific-extension';

/**
 * Example document
 */
const exampleDocument: Document = {
  id: &apos;example-doc-1',
  title: &apos;Example Document',
  type: &apos;main',
  sections: [
    {
      id: &apos;section-1',
      title: &apos;Introduction',
      paragraphs: [
        {
          id: &apos;paragraph-1',
          content:
            &apos;This is an example document that demonstrates the enhanced Reader component with the new navigation and settings features. It shows how to structure content and how the Reader renders it.',
          references: [],
        },
        {
          id: &apos;paragraph-2',
          content:
            &apos;The Reader component is designed to be extensible and configurable, allowing for specialized features for different types of content.',
          references: [],
        },
      ],
      subsections: [
        {
          id: &apos;section-1-1',
          title: &apos;Purpose',
          paragraphs: [
            {
              id: &apos;paragraph-3',
              content:
                &apos;The purpose of this example is to show how the Reader component can be used to display structured content with proper formatting and navigation.',
              references: [],
            },
          ],
        },
      ],
    },
    {
      id: &apos;section-2',
      title: &apos;Features',
      paragraphs: [
        {
          id: &apos;paragraph-4',
          content: &apos;The enhanced Reader component includes several new features:',
          references: [],
        },
      ],
      subsections: [
        {
          id: &apos;section-2-1',
          title: &apos;Navigation',
          paragraphs: [
            {
              id: &apos;paragraph-5',
              content:
                &apos;The Reader includes a hamburger menu that opens a navigation panel with a hierarchical structure of parts, papers, and sections.',
              references: [],
            },
          ],
        },
        {
          id: &apos;section-2-2',
          title: &apos;Settings',
          paragraphs: [
            {
              id: &apos;paragraph-6',
              content:
                &apos;The Reader includes a settings panel that allows users to customize the theme, typography, and layout.',
              references: [
                {
                  id: &apos;ref-1',
                  type: &apos;supporting',
                  targetDocumentId: &apos;doc-2',
                  targetParagraphId: &apos;para-5',
                },
              ],
            },
          ],
        },
        {
          id: &apos;section-2-3',
          title: &apos;Extensions',
          paragraphs: [
            {
              id: &apos;paragraph-7',
              content:
                &apos;The Reader can be extended with plugins that provide specialized features for different types of content.',
              references: [],
            },
          ],
        },
      ],
    },
    {
      id: &apos;section-3',
      title: &apos;Conclusion',
      paragraphs: [
        {
          id: &apos;paragraph-8',
          content:
            &apos;This example demonstrates the enhanced Reader component with the new navigation and settings features. In a real application, you would use the document transformation system to convert content from various formats into the standardized document model.',
          references: [],
        },
      ],
    },
  ],
  relationships: [
    {
      type: &apos;supports',
      targetDocumentId: &apos;doc-2',
      description: &apos;This document supports the concepts described in Document 2.',
    },
  ],
  metadata: {
    title: &apos;Enhanced Reader Example',
    subtitle: &apos;A demonstration of the enhanced Reader component',
    author: &apos;Reader Team',
    date: &apos;2025-04-01',
    categories: ['Documentation', &apos;Example'],
    tags: ['reader', &apos;component', &apos;example'],
  },
};

/**
 * Example configuration
 */
const exampleConfig: Partial<ReaderConfig> = {
  branding: {
    primaryColor: '#4a6da7',
    secondaryColor: '#6c757d',
    appName: &apos;Enhanced Reader Example',
  },
  navigation: {
    showTableOfContents: true,
    showBreadcrumbs: true,
    showRelationshipMap: true,
    showNavigationControls: true,
    showSearch: true,
    showSettings: true,
    linkbackUrl: '/',
    linkbackText: &apos;Back to Examples',
  },
  theme: {
    mode: &apos;light',
    colors: {
      background: '#ffffff',
      text: '#333333',
      border: '#e2e8f0',
      panelBackground: '#f7fafc',
    },
  },
  typography: {
    fontFamily:
      &apos;system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI", Roboto, &quot;Helvetica Neue", Arial, sans-serif',
    fontSize: &apos;medium',
    fontStyle: &apos;sans-serif',
    lineSpacing: &apos;normal',
  },
  layout: {
    textWidth: &apos;medium',
    showParagraphNumbers: true,
    enableStickyHeaders: true,
  },
  extensions: ['scientific-extension'],
  extensionConfig: {
    &apos;scientific-extension': {
      // Scientific extension specific configuration
      citationStyle: &apos;APA',
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
