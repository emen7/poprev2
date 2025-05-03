/**
 * Unit tests for the HighlightContext
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HighlightProvider, useHighlight } from '../components/HighlightContext';
import { HighlightData } from '../types';

// Mock component that uses the highlight context
const TestComponent = () => {
  const { showHighlights, setShowHighlights, highlights, addHighlight, removeHighlight } = useHighlight();
  
  const handleAddHighlight = () => {
    const mockRange = document.createRange();
    const mockHighlight: HighlightData = {
      text: 'Test highlight',
      color: 'yellow',
      range: mockRange,
    };
    addHighlight(mockHighlight);
  };
  
  const handleRemoveHighlight = () => {
    if (highlights.length > 0) {
      removeHighlight(highlights[0]);
    }
  };
  
  return (
    <div>
      <div data-testid="highlight-count">{highlights.length}</div>
      <button data-testid="toggle-highlights" onClick={() => setShowHighlights(!showHighlights)}>
        {showHighlights ? 'Hide Highlights' : 'Show Highlights'}
      </button>
      <button data-testid="add-highlight" onClick={handleAddHighlight}>
        Add Highlight
      </button>
      <button data-testid="remove-highlight" onClick={handleRemoveHighlight}>
        Remove Highlight
      </button>
    </div>
  );
};

describe('HighlightContext', () => {
  beforeEach(() => {
    // Set up document body with a container for highlighting
    document.body.innerHTML = '<div id="test-container"><p>This is a test paragraph with some text to highlight.</p></div>';
  });
  
  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });
  
  it('should provide highlight context to children', () => {
    render(
      <HighlightProvider
        containerSelector="#test-container"
        isDarkMode={() => false}
        showHighlights={true}
      >
        <TestComponent />
      </HighlightProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('highlight-count')).toHaveTextContent('0');
    expect(screen.getByTestId('toggle-highlights')).toHaveTextContent('Hide Highlights');
  });
  
  it('should toggle highlight visibility', () => {
    render(
      <HighlightProvider
        containerSelector="#test-container"
        isDarkMode={() => false}
        showHighlights={true}
      >
        <TestComponent />
      </HighlightProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('toggle-highlights')).toHaveTextContent('Hide Highlights');
    
    // Toggle highlights off
    fireEvent.click(screen.getByTestId('toggle-highlights'));
    
    // Updated state
    expect(screen.getByTestId('toggle-highlights')).toHaveTextContent('Show Highlights');
  });
  
  it('should add and remove highlights', () => {
    render(
      <HighlightProvider
        containerSelector="#test-container"
        isDarkMode={() => false}
        showHighlights={true}
      >
        <TestComponent />
      </HighlightProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('highlight-count')).toHaveTextContent('0');
    
    // Add a highlight
    fireEvent.click(screen.getByTestId('add-highlight'));
    
    // Updated state
    expect(screen.getByTestId('highlight-count')).toHaveTextContent('1');
    
    // Remove the highlight
    fireEvent.click(screen.getByTestId('remove-highlight'));
    
    // Final state
    expect(screen.getByTestId('highlight-count')).toHaveTextContent('0');
  });
});
