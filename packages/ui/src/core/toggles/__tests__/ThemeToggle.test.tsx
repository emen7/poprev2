import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the ThemeContext
const mockSetThemeMode = jest.fn();
jest.mock('../../../contexts/ThemeContext', () => ({
  ...jest.requireActual('../../../contexts/ThemeContext'),
  useTheme: () => ({
    themeMode: 'light',
    setThemeMode: mockSetThemeMode,
  }),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockSetThemeMode.mockClear();
  });

  it('renders correctly with default props', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Check that all default buttons are rendered
    expect(screen.getByTitle('Dark theme')).toBeInTheDocument();
    expect(screen.getByTitle('Light theme')).toBeInTheDocument();
    expect(screen.getByTitle('System theme')).toBeInTheDocument();
    
    // Check that labels are shown
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('renders without system option when showSystemOption is false', () => {
    render(
      <ThemeProvider>
        <ThemeToggle showSystemOption={false} />
      </ThemeProvider>
    );
    
    // Check that system option is not rendered
    expect(screen.getByTitle('Dark theme')).toBeInTheDocument();
    expect(screen.getByTitle('Light theme')).toBeInTheDocument();
    expect(screen.queryByTitle('System theme')).not.toBeInTheDocument();
  });

  it('renders without labels when showLabels is false', () => {
    render(
      <ThemeProvider>
        <ThemeToggle showLabels={false} />
      </ThemeProvider>
    );
    
    // Check that labels are not shown
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    expect(screen.queryByText('Light')).not.toBeInTheDocument();
    expect(screen.queryByText('System')).not.toBeInTheDocument();
  });

  it('calls setThemeMode when a theme button is clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Click the dark theme button
    await userEvent.click(screen.getByTitle('Dark theme'));
    
    // Check that setThemeMode was called with the correct value
    expect(mockSetThemeMode).toHaveBeenCalledWith('dark');
  });

  it('applies custom className', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>
    );
    
    const toggleElement = screen.getByTitle('Dark theme').closest('.theme-toggle');
    expect(toggleElement).toHaveClass('custom-class');
  });
});
