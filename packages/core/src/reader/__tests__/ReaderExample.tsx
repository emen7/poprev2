/**
 * Example usage of the Reader context provider and hooks
 */

import React, { useState } from 'react';
import {
  ReaderProvider,
  UBReaderProvider,
  useReader,
  useNavigation,
  useSelection,
  useTheme,
  useDocument,
} from '../context';
import { Document, ContentType } from '../../types/document';
import { ThemeType } from '../../types/reader';

/**
 * Example document
 */
const exampleDocument: Document = {
  id: 'example-doc',
  title: 'Example Document',
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
          text: 'This is the first paragraph of the introduction.',
        },
        {
          id: 'p-2',
          number: 2,
          text: 'This is the second paragraph of the introduction.',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Main Content',
      number: 2,
      paragraphs: [
        {
          id: 'p-3',
          number: 3,
          text: 'This is the first paragraph of the main content.',
        },
        {
          id: 'p-4',
          number: 4,
          text: 'This is the second paragraph of the main content.',
        },
      ],
    },
  ],
  metadata: {
    author: 'Test Author',
    publicationDate: '2025-04-16',
    language: 'en',
    tags: ['example', 'test'],
    category: 'documentation',
  },
};

/**
 * Reader controls component
 */
const ReaderControls: React.FC = () => {
  const { navigation, selection } = useReader();
  const { theme, setThemeType } = useTheme();
  const { document } = useDocument();

  // Handle theme change
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeType(event.target.value as ThemeType);
  };

  // Handle navigation
  const handleNextSection = () => {
    navigation.navigateToNextSection();
  };

  const handlePrevSection = () => {
    navigation.navigateToPreviousSection();
  };

  const handleNextParagraph = () => {
    navigation.navigateToNextParagraph();
  };

  const handlePrevParagraph = () => {
    navigation.navigateToPreviousParagraph();
  };

  // Get current position
  const currentSection = navigation.getCurrentSection();
  const currentParagraph = navigation.getCurrentParagraph();

  return (
    <div className="reader-controls">
      <div className="theme-controls">
        <label htmlFor="theme-select">Theme: </label>
        <select id="theme-select" value={theme.type} onChange={handleThemeChange}>
          <option value={ThemeType.LIGHT}>Light</option>
          <option value={ThemeType.DARK}>Dark</option>
          <option value={ThemeType.SEPIA}>Sepia</option>
          <option value={ThemeType.TRADITIONAL}>Traditional</option>
        </select>
      </div>

      <div className="navigation-controls">
        <button onClick={handlePrevSection}>Previous Section</button>
        <button onClick={handleNextSection}>Next Section</button>
        <button onClick={handlePrevParagraph}>Previous Paragraph</button>
        <button onClick={handleNextParagraph}>Next Paragraph</button>
      </div>

      <div className="current-position">
        <p>
          <strong>Document:</strong> {document?.title}
        </p>
        <p>
          <strong>Current Section:</strong> {currentSection?.title} ({currentSection?.number})
        </p>
        <p>
          <strong>Current Paragraph:</strong> {currentParagraph?.number}
        </p>
      </div>
    </div>
  );
};

/**
 * Content display component
 */
const ContentDisplay: React.FC = () => {
  const { navigation } = useReader();
  const { theme } = useTheme();

  // Get current content
  const currentSection = navigation.getCurrentSection();
  const currentParagraph = navigation.getCurrentParagraph();

  // Apply theme styles
  const themeStyles: React.CSSProperties = {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '1rem',
    borderRadius: '0.5rem',
  };

  return (
    <div className="content-display" style={themeStyles}>
      {currentSection && (
        <div className="section">
          <h2>{currentSection.title}</h2>

          {currentParagraph && (
            <div className="paragraph">
              <span className="paragraph-number">{currentParagraph.number}.</span>
              <span className="paragraph-text">{currentParagraph.text}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Selection tools component
 */
const SelectionTools: React.FC = () => {
  const { selection } = useReader();
  const [selectedText, setSelectedText] = useState('');

  // Handle text selection
  const handleTextSelection = () => {
    const text = window.getSelection()?.toString() || '';
    setSelectedText(text);
  };

  // Handle highlight creation
  const handleHighlight = () => {
    if (!selectedText) return;

    // In a real implementation, we would get the proper selection position
    // For this example, we'll create a dummy selection
    const dummySelection = {
      text: selectedText,
      startPosition: {
        documentId: 'example-doc',
        sectionIndex: 0,
        paragraphIndex: 0,
        textOffset: 0,
      },
      endPosition: {
        documentId: 'example-doc',
        sectionIndex: 0,
        paragraphIndex: 0,
        textOffset: selectedText.length,
      },
    };

    selection.createSelection(dummySelection);
    alert(`Selection created: ${selectedText}`);
    setSelectedText('');
  };

  return (
    <div className="selection-tools">
      <div className="selection-input">
        <textarea
          value={selectedText}
          onChange={e => setSelectedText(e.target.value)}
          onMouseUp={handleTextSelection}
          placeholder="Select text here or type to simulate selection"
          rows={3}
          style={{ width: '100%' }}
        />
      </div>

      <div className="selection-actions">
        <button onClick={handleHighlight} disabled={!selectedText}>
          Create Selection
        </button>
      </div>

      <div className="selections-list">
        <h3>Selections</h3>
        <ul>
          {selection.getSelections().map(sel => (
            <li key={sel.id}>{sel.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Main reader example component
 */
export const ReaderExample: React.FC = () => {
  return (
    <ReaderProvider document={exampleDocument}>
      <div className="reader-example">
        <h1>Reader Example</h1>

        <div className="reader-layout">
          <div className="reader-sidebar">
            <ReaderControls />
            <SelectionTools />
          </div>

          <div className="reader-content">
            <ContentDisplay />
          </div>
        </div>
      </div>
    </ReaderProvider>
  );
};

/**
 * UB-specific reader example component
 */
export const UBReaderExample: React.FC = () => {
  return (
    <UBReaderProvider document={exampleDocument}>
      <div className="reader-example">
        <h1>UB Reader Example</h1>

        <div className="reader-layout">
          <div className="reader-sidebar">
            <ReaderControls />
            <SelectionTools />
          </div>

          <div className="reader-content">
            <ContentDisplay />
          </div>
        </div>
      </div>
    </UBReaderProvider>
  );
};

export default ReaderExample;
