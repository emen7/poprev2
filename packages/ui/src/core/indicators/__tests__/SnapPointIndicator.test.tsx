import React from 'react';
import { render, screen } from '@testing-library/react';
import { SnapPointIndicator } from '../SnapPointIndicator';

describe('SnapPointIndicator Component', () => {
  const defaultProps = {
    currentHeight: 100,
    snapPoints: {
      collapsed: 100,
      half: 300,
      full: 600,
    },
  };

  it('renders correctly with default props', () => {
    render(<SnapPointIndicator {...defaultProps} />);
    
    // Check that all indicators are rendered
    const indicators = screen.getAllByTitle(/expanded|collapsed/i);
    expect(indicators).toHaveLength(3);
    
    // Check that the collapsed indicator is active
    const collapsedIndicator = screen.getByTitle('Collapsed');
    expect(collapsedIndicator).toHaveClass('active');
    
    // Check that the other indicators are not active
    const halfExpandedIndicator = screen.getByTitle('Half expanded');
    const fullyExpandedIndicator = screen.getByTitle('Fully expanded');
    expect(halfExpandedIndicator).not.toHaveClass('active');
    expect(fullyExpandedIndicator).not.toHaveClass('active');
  });

  it('shows the half-expanded indicator as active when currentHeight is closest to half', () => {
    render(
      <SnapPointIndicator
        currentHeight={300}
        snapPoints={defaultProps.snapPoints}
      />
    );
    
    // Check that the half-expanded indicator is active
    const halfExpandedIndicator = screen.getByTitle('Half expanded');
    expect(halfExpandedIndicator).toHaveClass('active');
    
    // Check that the other indicators are not active
    const collapsedIndicator = screen.getByTitle('Collapsed');
    const fullyExpandedIndicator = screen.getByTitle('Fully expanded');
    expect(collapsedIndicator).not.toHaveClass('active');
    expect(fullyExpandedIndicator).not.toHaveClass('active');
  });

  it('shows the fully-expanded indicator as active when currentHeight is closest to full', () => {
    render(
      <SnapPointIndicator
        currentHeight={600}
        snapPoints={defaultProps.snapPoints}
      />
    );
    
    // Check that the fully-expanded indicator is active
    const fullyExpandedIndicator = screen.getByTitle('Fully expanded');
    expect(fullyExpandedIndicator).toHaveClass('active');
    
    // Check that the other indicators are not active
    const collapsedIndicator = screen.getByTitle('Collapsed');
    const halfExpandedIndicator = screen.getByTitle('Half expanded');
    expect(collapsedIndicator).not.toHaveClass('active');
    expect(halfExpandedIndicator).not.toHaveClass('active');
  });

  it('determines the active indicator based on the closest snap point', () => {
    render(
      <SnapPointIndicator
        currentHeight={200}
        snapPoints={defaultProps.snapPoints}
      />
    );
    
    // Check that the half-expanded indicator is active (200 is closer to 300 than 100)
    const halfExpandedIndicator = screen.getByTitle('Half expanded');
    expect(halfExpandedIndicator).toHaveClass('active');
    
    // Check that the other indicators are not active
    const collapsedIndicator = screen.getByTitle('Collapsed');
    const fullyExpandedIndicator = screen.getByTitle('Fully expanded');
    expect(collapsedIndicator).not.toHaveClass('active');
    expect(fullyExpandedIndicator).not.toHaveClass('active');
  });

  it('applies custom className', () => {
    render(
      <SnapPointIndicator
        {...defaultProps}
        className="custom-class"
      />
    );
    
    const container = screen.getByTitle('Collapsed').closest('.snap-point-indicator');
    expect(container).toHaveClass('custom-class');
  });
});
