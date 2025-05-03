/**
 * Unit tests for the HighlightManager
 */

import { HighlightManager } from '../HighlightManager';
import { HighlightColor, HighlightData } from '../types';

describe('HighlightManager', () => {
  let container: HTMLElement;
  let highlightManager: HighlightManager;
  let mockOnHighlight: jest.Mock;

  // Custom colors for testing
  const testColors: HighlightColor[] = [
    {
      name: 'test-yellow',
      lightModeColor: 'rgba(255, 255, 0, 0.5)',
      darkModeColor: '#ffff00',
      displayName: 'Test Yellow',
    },
    {
      name: 'test-blue',
      lightModeColor: 'rgba(0, 0, 255, 0.5)',
      darkModeColor: '#0000ff',
      displayName: 'Test Blue',
    },
  ];

  beforeEach(() => {
    // Set up document body
    document.body.innerHTML = '<div id="test-container"><p>This is a test paragraph with some text to highlight.</p></div>';
    
    // Get container element
    container = document.getElementById('test-container') as HTMLElement;
    
    // Create mock callback
    mockOnHighlight = jest.fn();
    
    // Create highlight manager
    highlightManager = new HighlightManager({
      container,
      colors: testColors,
      isDarkMode: () => false,
      onHighlight: mockOnHighlight,
      showHighlights: true,
    });
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should initialize with the provided options', () => {
    // Assert that the highlight manager was initialized with the correct options
    expect(highlightManager).toBeDefined();
    expect(highlightManager['container']).toBe(container);
    expect(highlightManager['colors']).toEqual(testColors);
    expect(highlightManager['isDarkMode']()).toBe(false);
    expect(highlightManager['showHighlights']).toBe(true);
  });

  it('should add styles to the document head', () => {
    // Assert that styles were added to the document head
    const styleElement = document.getElementById('ub-highlight-styles');
    expect(styleElement).toBeDefined();
    expect(styleElement?.tagName).toBe('STYLE');
    
    // Check that the styles include our test colors
    const styleContent = styleElement?.textContent || '';
    expect(styleContent).toContain('.ub-highlight-test-yellow');
    expect(styleContent).toContain('.ub-highlight-test-blue');
  });

  it('should update highlight visibility', () => {
    // Initially, highlights should be visible
    expect(document.body.classList.contains('ub-highlights-hidden')).toBe(false);
    
    // Set highlights to hidden
    highlightManager['showHighlights'] = false;
    highlightManager.updateHighlightVisibility();
    
    // Now, highlights should be hidden
    expect(document.body.classList.contains('ub-highlights-hidden')).toBe(true);
    
    // Set highlights back to visible
    highlightManager['showHighlights'] = true;
    highlightManager.updateHighlightVisibility();
    
    // Highlights should be visible again
    expect(document.body.classList.contains('ub-highlights-hidden')).toBe(false);
  });

  // More tests would be added for selection handling, highlight application, etc.
  // These would require more complex DOM manipulation and event simulation
});
