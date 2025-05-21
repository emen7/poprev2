import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextAlignmentToggle } from '../TextAlignmentToggle';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the ThemeContext
const mockSetTextAlignment = jest.fn();
jest.mock('../../../contexts/ThemeContext', () => ({
  ...jest.requireActual('../../../contexts/ThemeContext'),
  useTheme: () => ({
    textAlignment: 'left',
    setTextAlignment: mockSetTextAlignment,
  }),
}));

describe('TextAlignmentToggle Component', () => {
  beforeEach(() => {
    mockSetTextAlignment.mockClear();
  });

  it('renders correctly with default props', () => {
    render(
      <ThemeProvider>
        <TextAlignmentToggle />
      </ThemeProvider>
    );
    
    // Check that all default buttons are rendered
    expect(screen.getByTitle('Left alignment')).toBeInTheDocument();
    expect(screen.getByTitle('Justify alignment')).toBeInTheDocument();
    expect(screen.getByTitle('Right alignment')).toBeInTheDocument();
    
    // Check that labels are shown
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Justify')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders with custom options', () => {
    render(
      <ThemeProvider>
        <TextAlignmentToggle options={['left', 'center']} />
      </ThemeProvider>
    );
    
    // Check that only specified options are rendered
    expect(screen.getByTitle('Left alignment')).toBeInTheDocument();
    expect(screen.getByTitle('Center alignment')).toBeInTheDocument();
    expect(screen.queryByTitle('Justify alignment')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Right alignment')).not.toBeInTheDocument();
  });

  it('renders without labels when showLabels is false', () => {
    render(
      <ThemeProvider>
        <TextAlignmentToggle showLabels={false} />
      </ThemeProvider>
    );
    
    // Check that labels are not shown
    expect(screen.queryByText('Left')).not.toBeInTheDocument();
    expect(screen.queryByText('Justify')).not.toBeInTheDocument();
    expect(screen.queryByText('Right')).not.toBeInTheDocument();
  });

  it('calls setTextAlignment when an alignment button is clicked', async () => {
    render(
      <ThemeProvider>
        <TextAlignmentToggle />
      </ThemeProvider>
    );
    
    // Click the justify alignment button
    await userEvent.click(screen.getByTitle('Justify alignment'));
    
    // Check that setTextAlignment was called with the correct value
    expect(mockSetTextAlignment).toHaveBeenCalledWith('justify');
  });

  it('applies custom className', () => {
    render(
      <ThemeProvider>
        <TextAlignmentToggle className="custom-class" />
      </ThemeProvider>
    );
    
    const toggleElement = screen.getByTitle('Left alignment').closest('.text-alignment-toggle');
    expect(toggleElement).toHaveClass('custom-class');
  });
});
