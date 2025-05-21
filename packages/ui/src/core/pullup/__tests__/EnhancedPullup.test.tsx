import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnhancedPullup } from '../EnhancedPullup';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the SnapPointIndicator and TabsComponent
jest.mock('../../indicators/SnapPointIndicator', () => ({
  SnapPointIndicator: ({ currentHeight, snapPoints }) => (
    <div data-testid="snap-point-indicator" data-current-height={currentHeight} data-snap-points={JSON.stringify(snapPoints)}>
      Snap Point Indicator
    </div>
  ),
}));

jest.mock('../../navigation/TabsComponent', () => ({
  TabsComponent: ({ tabs, activeTab, onTabChange }) => (
    <div data-testid="tabs-component" data-active-tab={activeTab}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          data-tab-id={tab.id}
          data-disabled={tab.disabled}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  ),
}));

describe('EnhancedPullup Component', () => {
  const defaultProps = {
    isOpen: true,
    activeTab: 'notes' as const,
    height: 300,
    onTabSelect: jest.fn(),
    notesContent: <div>Notes Content</div>,
    quotesContent: <div>Quotes Content</div>,
    settingsContent: <div>Settings Content</div>,
    searchContent: <div>Search Content</div>,
  };

  const renderWithThemeProvider = (ui) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    renderWithThemeProvider(<EnhancedPullup {...defaultProps} />);
    
    // Check that the component is rendered
    const pullupElement = screen.getByText('Snap Point Indicator').closest('.enhanced-pullup');
    expect(pullupElement).toBeInTheDocument();
    expect(pullupElement).toHaveClass('enhanced-pullup-open');
    
    // Check that the tabs component is rendered
    expect(screen.getByTestId('tabs-component')).toBeInTheDocument();
    expect(screen.getByTestId('tabs-component')).toHaveAttribute('data-active-tab', 'notes');
    
    // Check that the snap point indicator is rendered
    expect(screen.getByTestId('snap-point-indicator')).toBeInTheDocument();
    
    // Check that the content is rendered
    expect(screen.getByText('Notes Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    renderWithThemeProvider(<EnhancedPullup {...defaultProps} onClose={onClose} />);
    
    // Click the close button
    await userEvent.click(screen.getByLabelText('Close pullup panel'));
    
    // Check that onClose was called
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onTabSelect when a tab is selected', () => {
    renderWithThemeProvider(<EnhancedPullup {...defaultProps} />);
    
    // Click the quotes tab
    fireEvent.click(screen.getByText('Quotes'));
    
    // Check that onTabSelect was called with the correct tab
    expect(defaultProps.onTabSelect).toHaveBeenCalledWith('quotes');
  });

  it('renders in persistent mode when isPersistent is true', () => {
    renderWithThemeProvider(<EnhancedPullup {...defaultProps} isPersistent={true} />);
    
    // Check that the component has the persistent class
    const pullupElement = screen.getByText('Snap Point Indicator').closest('.enhanced-pullup');
    expect(pullupElement).toHaveClass('enhanced-pullup-persistent');
  });

  it('does not render snap point indicator when enableSnapPoints is false', () => {
    renderWithThemeProvider(<EnhancedPullup {...defaultProps} enableSnapPoints={false} />);
    
    // Check that the snap point indicator is not rendered
    expect(screen.queryByTestId('snap-point-indicator')).not.toBeInTheDocument();
  });

  it('shows the correct content for the active tab', () => {
    const { rerender } = renderWithThemeProvider(<EnhancedPullup {...defaultProps} />);
    
    // Check that the notes content is rendered
    expect(screen.getByText('Notes Content')).toBeInTheDocument();
    
    // Change the active tab to quotes
    rerender(
      <ThemeProvider>
        <EnhancedPullup {...defaultProps} activeTab="quotes" />
      </ThemeProvider>
    );
    
    // Check that the quotes content is rendered
    expect(screen.getByText('Quotes Content')).toBeInTheDocument();
    
    // Change the active tab to settings
    rerender(
      <ThemeProvider>
        <EnhancedPullup {...defaultProps} activeTab="settings" />
      </ThemeProvider>
    );
    
    // Check that the settings content is rendered
    expect(screen.getByText('Settings Content')).toBeInTheDocument();
    
    // Change the active tab to search
    rerender(
      <ThemeProvider>
        <EnhancedPullup {...defaultProps} activeTab="search" />
      </ThemeProvider>
    );
    
    // Check that the search content is rendered
    expect(screen.getByText('Search Content')).toBeInTheDocument();
  });
});
