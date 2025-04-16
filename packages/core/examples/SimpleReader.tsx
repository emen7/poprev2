/**
 * Simple Reader Example
 *
 * This example demonstrates how to use the Core Package to create a simple reader application.
 */

import React, { useState, useEffect } from 'react';
import {
  ReaderProvider,
  useReader,
  useNavigation,
  useSelection,
  useTheme,
  useDocument,
  ThemeType,
  ContentType,
} from '../src';
import type { Document } from '../src/types/document';

// Sample document
const sampleDocument: Document = {
  id: 'sample-doc',
  title: 'Sample Document',
  contentType: ContentType.STANDARD,
  sections: [
    {
      id: 'section-1',
      title: 'Introduction',
      number: 1,
      paragraphs: [
        {
          id: 'p-1',
          number: 1,
          text: 'Welcome to the Simple Reader example. This demonstrates how to use the Core Package to create a reader application.',
        },
        {
          id: 'p-2',
          number: 2,
          text: 'The Core Package provides a flexible and extensible architecture for building reader applications with features like navigation, selection, and theming.',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Features',
      number: 2,
      paragraphs: [
        {
          id: 'p-3',
          number: 3,
          text: 'Navigation: The reader provides navigation between sections and paragraphs with history tracking.',
        },
        {
          id: 'p-4',
          number: 4,
          text: 'Selection: You can select and highlight text with different highlight types.',
        },
        {
          id: 'p-5',
          number: 5,
          text: 'Theming: The reader supports different themes like light, dark, and sepia.',
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Conclusion',
      number: 3,
      paragraphs: [
        {
          id: 'p-6',
          number: 6,
          text: 'This example demonstrates the basic functionality of the Core Package. You can use it as a starting point for building your own reader application.',
        },
      ],
    },
  ],
  metadata: {
    author: 'Core Package Team',
    publicationDate: '2025-04-16',
  },
};

/**
 * Reader Header Component
 */
const ReaderHeader: React.FC = () => {
  const { document } = useReader();
  const { theme, setThemeType } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeType(e.target.value as ThemeType);
  };

  return (
    <header
      style={{
        backgroundColor: theme.primaryColor,
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ margin: 0 }}>{document?.title}</h1>
      <div>
        <label htmlFor="theme-select" style={{ marginRight: '0.5rem' }}>
          Theme:
        </label>
        <select
          id="theme-select"
          value={theme.type}
          onChange={handleThemeChange}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: 'none',
          }}
        >
          <option value={ThemeType.LIGHT}>Light</option>
          <option value={ThemeType.DARK}>Dark</option>
          <option value={ThemeType.SEPIA}>Sepia</option>
          <option value={ThemeType.TRADITIONAL}>Traditional</option>
        </select>
      </div>
    </header>
  );
};

/**
 * Navigation Controls Component
 */
const NavigationControls: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const buttonStyle: React.CSSProperties = {
    backgroundColor: theme.primaryColor,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: theme.backgroundColor,
        borderBottom: `1px solid ${theme.secondaryColor}`,
      }}
    >
      <button onClick={() => navigation.navigateToPreviousSection()} style={buttonStyle}>
        Previous Section
      </button>
      <button onClick={() => navigation.navigateToPreviousParagraph()} style={buttonStyle}>
        Previous Paragraph
      </button>
      <button onClick={() => navigation.navigateToNextParagraph()} style={buttonStyle}>
        Next Paragraph
      </button>
      <button onClick={() => navigation.navigateToNextSection()} style={buttonStyle}>
        Next Section
      </button>
    </div>
  );
};

/**
 * Table of Contents Component
 */
const TableOfContents: React.FC = () => {
  const { document } = useReader();
  const navigation = useNavigation();
  const { theme } = useTheme();

  if (!document) return null;

  return (
    <div
      style={{
        width: '250px',
        padding: '1rem',
        backgroundColor: theme.backgroundColor,
        borderRight: `1px solid ${theme.secondaryColor}`,
        color: theme.textColor,
      }}
    >
      <h2>Table of Contents</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {document.sections.map((section, index) => (
          <li key={section.id} style={{ marginBottom: '0.5rem' }}>
            <button
              onClick={() => navigation.navigateToSection(index)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: theme.linkColor,
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.5rem',
                width: '100%',
                borderRadius: '4px',
              }}
            >
              {section.number}. {section.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Content Display Component
 */
const ContentDisplay: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const selection = useSelection();
  const [selectedText, setSelectedText] = useState('');

  const currentSection = navigation.getCurrentSection();
  const currentParagraph = navigation.getCurrentParagraph();

  const handleTextSelection = () => {
    const text = window.getSelection()?.toString() || '';
    setSelectedText(text);
  };

  const handleHighlight = () => {
    if (!selectedText || !currentParagraph) return;

    // In a real implementation, we would get the proper selection position
    // For this example, we'll create a dummy selection
    const dummySelection = {
      text: selectedText,
      startPosition: {
        documentId: 'sample-doc',
        sectionIndex: navigation.getState().currentSectionIndex,
        paragraphIndex: navigation.getState().currentParagraphIndex,
        textOffset: 0,
      },
      endPosition: {
        documentId: 'sample-doc',
        sectionIndex: navigation.getState().currentSectionIndex,
        paragraphIndex: navigation.getState().currentParagraphIndex,
        textOffset: selectedText.length,
      },
    };

    selection.createSelection(dummySelection);
    alert(`Selection created: ${selectedText}`);
    setSelectedText('');
  };

  return (
    <div
      style={{
        flex: 1,
        padding: '2rem',
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        overflowY: 'auto',
      }}
    >
      {currentSection && (
        <div>
          <h2 style={{ color: theme.primaryColor }}>{currentSection.title}</h2>

          {currentParagraph && (
            <div
              style={{
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                fontSize: '1.1rem',
              }}
              onMouseUp={handleTextSelection}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  marginRight: '0.5rem',
                  color: theme.secondaryColor,
                }}
              >
                {currentParagraph.number}.
              </span>
              <span>{currentParagraph.text}</span>
            </div>
          )}

          {selectedText && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: theme.type === ThemeType.DARK ? '#333' : '#f5f5f5',
                borderRadius: '4px',
              }}
            >
              <p>
                <strong>Selected Text:</strong> {selectedText}
              </p>
              <button
                onClick={handleHighlight}
                style={{
                  backgroundColor: theme.primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
              >
                Highlight Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Simple Reader Component
 */
export const SimpleReader: React.FC = () => {
  return (
    <ReaderProvider document={sampleDocument}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <ReaderHeader />
        <NavigationControls />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <TableOfContents />
          <ContentDisplay />
        </div>
      </div>
    </ReaderProvider>
  );
};

export default SimpleReader;
