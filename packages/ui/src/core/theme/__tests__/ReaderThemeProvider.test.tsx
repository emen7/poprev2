import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReaderThemeProvider, useReaderTheme } from '../ReaderThemeProvider';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Test component that uses the theme context
const TestComponent = () => {
  const { uiTheme, contentTheme, setUITheme, setContentTheme } = useReaderTheme();
  
  return (
    <div>
      <div data-testid="ui-theme">{uiTheme}</div>
      <div data-testid="content-theme">{contentTheme}</div>
      <button onClick={() => setUITheme('dark')}>Set Dark Theme</button>
      <button onClick={() => setContentTheme('traditional')}>Set Traditional Content</button>
    </div>
  );
};

describe('ReaderThemeProvider Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
    document.documentElement.classList.remove('content-modern', 'content-traditional');
  });

  it('renders children and provides default theme values', () => {
    render(
      <ReaderThemeProvider>
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    expect(screen.getByTestId('ui-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('content-theme')).toHaveTextContent('modern');
  });

  it('uses initial theme values from props', () => {
    render(
      <ReaderThemeProvider initialUITheme="dark" initialContentTheme="traditional">
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    expect(screen.getByTestId('ui-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('content-theme')).toHaveTextContent('traditional');
  });

  it('allows changing the UI theme', () => {
    render(
      <ReaderThemeProvider>
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    // Initial theme should be light
    expect(screen.getByTestId('ui-theme')).toHaveTextContent('light');
    
    // Click the button to change to dark theme
    fireEvent.click(screen.getByText('Set Dark Theme'));
    
    // Theme should now be dark
    expect(screen.getByTestId('ui-theme')).toHaveTextContent('dark');
  });

  it('allows changing the content theme', () => {
    render(
      <ReaderThemeProvider>
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    // Initial content theme should be modern
    expect(screen.getByTestId('content-theme')).toHaveTextContent('modern');
    
    // Click the button to change to traditional content
    fireEvent.click(screen.getByText('Set Traditional Content'));
    
    // Content theme should now be traditional
    expect(screen.getByTestId('content-theme')).toHaveTextContent('traditional');
  });

  it('persists theme preferences in localStorage when persistTheme is true', () => {
    render(
      <ReaderThemeProvider persistTheme={true} uiThemeStorageKey="test-ui-theme" contentThemeStorageKey="test-content-theme">
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    // Change themes
    fireEvent.click(screen.getByText('Set Dark Theme'));
    fireEvent.click(screen.getByText('Set Traditional Content'));
    
    // Check that localStorage was updated
    expect(localStorageMock.getItem('test-ui-theme')).toBe('dark');
    expect(localStorageMock.getItem('test-content-theme')).toBe('traditional');
  });

  it('does not persist theme preferences in localStorage when persistTheme is false', () => {
    render(
      <ReaderThemeProvider persistTheme={false} uiThemeStorageKey="test-ui-theme" contentThemeStorageKey="test-content-theme">
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    // Change themes
    fireEvent.click(screen.getByText('Set Dark Theme'));
    fireEvent.click(screen.getByText('Set Traditional Content'));
    
    // Check that localStorage was not updated
    expect(localStorageMock.getItem('test-ui-theme')).toBeNull();
    expect(localStorageMock.getItem('test-content-theme')).toBeNull();
  });

  it('applies theme classes to the document element', () => {
    render(
      <ReaderThemeProvider initialUITheme="dark" initialContentTheme="traditional">
        <TestComponent />
      </ReaderThemeProvider>
    );
    
    // Check that the document element has the correct classes
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
    expect(document.documentElement.classList.contains('content-traditional')).toBe(true);
    
    // Change themes
    fireEvent.click(screen.getByText('Set Dark Theme')); // Already dark, no change
    fireEvent.click(screen.getByText('Set Traditional Content')); // Already traditional, no change
    
    // Classes should still be correct
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
    expect(document.documentElement.classList.contains('content-traditional')).toBe(true);
  });

  it('throws an error when useReaderTheme is used outside of a ReaderThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useReaderTheme must be used within a ReaderThemeProvider');
    
    // Restore console.error
    console.error = originalError;
  });
});
