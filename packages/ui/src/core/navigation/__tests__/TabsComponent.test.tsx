import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsComponent } from '../TabsComponent';

describe('TabsComponent', () => {
  const mockTabs = [
    {
      id: 'tab1',
      label: 'Tab 1',
      content: <div>Tab 1 Content</div>,
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      content: <div>Tab 2 Content</div>,
    },
    {
      id: 'tab3',
      label: 'Tab 3',
      content: <div>Tab 3 Content</div>,
      disabled: true,
    },
  ];

  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders correctly with default props', () => {
    render(
      <TabsComponent tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />
    );
    
    // Check that all tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Check that the active tab has the correct class
    const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(activeTab).toHaveClass('tab-active');
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    
    // Check that the disabled tab has the correct class and attributes
    const disabledTab = screen.getByRole('tab', { name: 'Tab 3' });
    expect(disabledTab).toHaveClass('tab-disabled');
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onTabChange when a tab is clicked', async () => {
    render(
      <TabsComponent tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />
    );
    
    // Click on the second tab
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    
    // Check that onTabChange was called with the correct tab ID
    expect(mockOnTabChange).toHaveBeenCalledWith('tab2');
  });

  it('does not call onTabChange when a disabled tab is clicked', async () => {
    render(
      <TabsComponent tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />
    );
    
    // Click on the disabled tab
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));
    
    // Check that onTabChange was not called
    expect(mockOnTabChange).not.toHaveBeenCalled();
  });

  it('renders with vertical orientation', () => {
    render(
      <TabsComponent 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
        orientation="vertical" 
      />
    );
    
    // Check that the container has the correct class
    const container = screen.getByRole('tablist');
    expect(container.closest('.tabs-component')).toHaveClass('tabs-vertical');
    expect(container).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <TabsComponent 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
        size="small" 
      />
    );
    
    // Check that the container has the correct class for small size
    expect(screen.getByRole('tablist').closest('.tabs-component')).toHaveClass('tabs-small');
    
    // Rerender with large size
    rerender(
      <TabsComponent 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
        size="large" 
      />
    );
    
    // Check that the container has the correct class for large size
    expect(screen.getByRole('tablist').closest('.tabs-component')).toHaveClass('tabs-large');
  });

  it('renders tabs with icons', () => {
    const tabsWithIcons = [
      {
        id: 'tab1',
        label: 'Tab 1',
        icon: '📝',
        content: <div>Tab 1 Content</div>,
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        icon: '💬',
        content: <div>Tab 2 Content</div>,
      },
    ];
    
    render(
      <TabsComponent tabs={tabsWithIcons} activeTab="tab1" onTabChange={mockOnTabChange} />
    );
    
    // Check that the icons are rendered
    expect(screen.getByText('📝')).toBeInTheDocument();
    expect(screen.getByText('💬')).toBeInTheDocument();
  });
});
