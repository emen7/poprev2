import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeSettings } from '../ThemeSettings';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the ThemeToggle and TextAlignmentToggle components
jest.mock('../../toggles/ThemeToggle', () => ({
  ThemeToggle: ({ showLabels, showSystemOption }) => (
    <div data-testid="theme-toggle" data-show-labels={showLabels} data-show-system={showSystemOption}>
      Theme Toggle Mock
    </div>
  ),
}));

jest.mock('../../toggles/TextAlignmentToggle', () => ({
  TextAlignmentToggle: ({ showLabels, options }) => (
    <div data-testid="text-alignment-toggle" data-show-labels={showLabels} data-options={options.join(',')}>
      Text Alignment Toggle Mock
    </div>
  ),
}));

describe('ThemeSettings Component', () => {
  const renderWithThemeProvider = (ui) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders correctly with default props', () => {
    renderWithThemeProvider(<ThemeSettings />);
    
    // Check that both sections are rendered
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Text Alignment')).toBeInTheDocument();
    
    // Check that both toggles are rendered
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('text-alignment-toggle')).toBeInTheDocument();
  });

  it('passes correct props to ThemeToggle', () => {
    renderWithThemeProvider(<ThemeSettings showLabels={false} showSystemOption={false} />);
    
    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toHaveAttribute('data-show-labels', 'false');
    expect(themeToggle).toHaveAttribute('data-show-system', 'false');
  });

  it('passes correct props to TextAlignmentToggle', () => {
    renderWithThemeProvider(
      <ThemeSettings showLabels={false} alignmentOptions={['left', 'center']} />
    );
    
    const textAlignmentToggle = screen.getByTestId('text-alignment-toggle');
    expect(textAlignmentToggle).toHaveAttribute('data-show-labels', 'false');
    expect(textAlignmentToggle).toHaveAttribute('data-options', 'left,center');
  });

  it('hides theme toggle when showThemeToggle is false', () => {
    renderWithThemeProvider(<ThemeSettings showThemeToggle={false} />);
    
    expect(screen.queryByText('Theme')).not.toBeInTheDocument();
    expect(screen.queryByTestId('theme-toggle')).not.toBeInTheDocument();
    
    // Text alignment toggle should still be visible
    expect(screen.getByText('Text Alignment')).toBeInTheDocument();
    expect(screen.getByTestId('text-alignment-toggle')).toBeInTheDocument();
  });

  it('hides text alignment toggle when showAlignmentToggle is false', () => {
    renderWithThemeProvider(<ThemeSettings showAlignmentToggle={false} />);
    
    expect(screen.queryByText('Text Alignment')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text-alignment-toggle')).not.toBeInTheDocument();
    
    // Theme toggle should still be visible
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithThemeProvider(<ThemeSettings className="custom-class" />);
    
    const container = screen.getByText('Theme').closest('.theme-settings');
    expect(container).toHaveClass('custom-class');
  });
});
