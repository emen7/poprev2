/**
 * Unit tests for the reader context
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReaderProvider, useReader, useNavigation, useTheme } from '../context';
import { Document, ContentType } from '../../types/document';
import { ThemeType } from '../../types/reader';

// Test document
const testDocument: Document = {
  id: 'test-doc',
  title: 'Test Document',
  contentType: ContentType.STANDARD,
  sections: [
    {
      id: 'section-1',
      title: 'Section 1',
      number: 1,
      paragraphs: [
        {
          id: 'p-1',
          number: 1,
          text: 'Paragraph 1',
        },
        {
          id: 'p-2',
          number: 2,
          text: 'Paragraph 2',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Section 2',
      number: 2,
      paragraphs: [
        {
          id: 'p-3',
          number: 3,
          text: 'Paragraph 3',
        },
        {
          id: 'p-4',
          number: 4,
          text: 'Paragraph 4',
        },
      ],
    },
  ],
  metadata: {
    author: 'Test Author',
  },
};

// Test component that uses the reader context
const TestComponent: React.FC = () => {
  const { document, settings } = useReader();
  const navigation = useNavigation();
  const { theme, setThemeType } = useTheme();

  return (
    <div>
      <h1 data-testid="document-title">{document?.title}</h1>
      <p data-testid="theme-type">Theme: {theme.type}</p>
      <p data-testid="current-section">Current Section: {navigation.getCurrentSection()?.title}</p>
      <p data-testid="current-paragraph">
        Current Paragraph: {navigation.getCurrentParagraph()?.text}
      </p>
      <button data-testid="next-section-btn" onClick={() => navigation.navigateToNextSection()}>
        Next Section
      </button>
      <button data-testid="prev-section-btn" onClick={() => navigation.navigateToPreviousSection()}>
        Previous Section
      </button>
      <button data-testid="next-paragraph-btn" onClick={() => navigation.navigateToNextParagraph()}>
        Next Paragraph
      </button>
      <button
        data-testid="prev-paragraph-btn"
        onClick={() => navigation.navigateToPreviousParagraph()}
      >
        Previous Paragraph
      </button>
      <button data-testid="change-theme-btn" onClick={() => setThemeType(ThemeType.DARK)}>
        Change Theme
      </button>
    </div>
  );
};

describe('Reader Context', () => {
  test('renders document title', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    expect(screen.getByTestId('document-title')).toHaveTextContent('Test Document');
  });

  test('navigates to next section', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    // Initial section should be Section 1
    expect(screen.getByTestId('current-section')).toHaveTextContent('Current Section: Section 1');

    // Navigate to next section
    fireEvent.click(screen.getByTestId('next-section-btn'));

    // Current section should now be Section 2
    expect(screen.getByTestId('current-section')).toHaveTextContent('Current Section: Section 2');
  });

  test('navigates to previous section', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    // Navigate to next section first
    fireEvent.click(screen.getByTestId('next-section-btn'));

    // Current section should be Section 2
    expect(screen.getByTestId('current-section')).toHaveTextContent('Current Section: Section 2');

    // Navigate to previous section
    fireEvent.click(screen.getByTestId('prev-section-btn'));

    // Current section should now be Section 1 again
    expect(screen.getByTestId('current-section')).toHaveTextContent('Current Section: Section 1');
  });

  test('navigates to next paragraph', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    // Initial paragraph should be Paragraph 1
    expect(screen.getByTestId('current-paragraph')).toHaveTextContent(
      'Current Paragraph: Paragraph 1'
    );

    // Navigate to next paragraph
    fireEvent.click(screen.getByTestId('next-paragraph-btn'));

    // Current paragraph should now be Paragraph 2
    expect(screen.getByTestId('current-paragraph')).toHaveTextContent(
      'Current Paragraph: Paragraph 2'
    );
  });

  test('navigates to previous paragraph', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    // Navigate to next paragraph first
    fireEvent.click(screen.getByTestId('next-paragraph-btn'));

    // Current paragraph should be Paragraph 2
    expect(screen.getByTestId('current-paragraph')).toHaveTextContent(
      'Current Paragraph: Paragraph 2'
    );

    // Navigate to previous paragraph
    fireEvent.click(screen.getByTestId('prev-paragraph-btn'));

    // Current paragraph should now be Paragraph 1 again
    expect(screen.getByTestId('current-paragraph')).toHaveTextContent(
      'Current Paragraph: Paragraph 1'
    );
  });

  test('navigates to next section and first paragraph', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    // Navigate to next paragraph to reach the end of section 1
    fireEvent.click(screen.getByTestId('next-paragraph-btn'));

    // Current paragraph should be Paragraph 2
    expect(screen.getByTestId('current-paragraph')).toHaveTextContent(
      'Current Paragraph: Paragraph 2'
    );

    // Navigate to next paragraph again, which should move to the first paragraph of section 2
    fireEvent.click(screen.getByTestId('next-paragraph-btn'));

    // Current section should now be Section 2
    expect(screen.getByTestId('current-section')).toHaveTextContent('Current Section: Section 2');

    // Current paragraph should now be Paragraph 3
    expect(screen.getByTestId('current-paragraph')).toHaveTextContent(
      'Current Paragraph: Paragraph 3'
    );
  });

  test('changes theme', () => {
    render(
      <ReaderProvider document={testDocument}>
        <TestComponent />
      </ReaderProvider>
    );

    // Initial theme should be light
    expect(screen.getByTestId('theme-type')).toHaveTextContent('Theme: light');

    // Change theme to dark
    fireEvent.click(screen.getByTestId('change-theme-btn'));

    // Theme should now be dark
    expect(screen.getByTestId('theme-type')).toHaveTextContent('Theme: dark');
  });
});
