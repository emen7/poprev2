/**
 * Unit tests for the ThreeRowHeader component
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { ThreeRowHeader } from '../ThreeRowHeader';

// Mock the CSS modules
jest.mock('../ThreeRowHeader.module.css', () => ({
  threeRowHeader: 'three-row-header',
  mainTitle: 'main-title',
  paperTitle: 'paper-title',
  sectionTitle: 'section-title',
}));

// Mock the HeaderRow component
jest.mock('../HeaderRow', () => ({
  HeaderRow: ({ rowType, leftContent, centerContent, rightContent }) => (
    <div data-testid={`${rowType}-row`}>
      {leftContent && <div data-testid={`${rowType}-left`}>{leftContent}</div>}
      {centerContent && <div data-testid={`${rowType}-center`}>{centerContent}</div>}
      {rightContent && <div data-testid={`${rowType}-right`}>{rightContent}</div>}
    </div>
  ),
}));

// Mock the DynamicSectionTitle component
jest.mock('../DynamicSectionTitle', () => ({
  DynamicSectionTitle: ({ title, className }) => (
    <div data-testid="dynamic-section-title" className={className}>
      {title}
    </div>
  ),
}));

// Mock the DualHamburgerNavigation component
jest.mock('../../navigation/dual-hamburger', () => ({
  DualHamburgerNavigation: () => <div data-testid="dual-hamburger-navigation" />,
}));

// Mock the useNavigation hook
jest.mock('@ub-ecosystem/state-management', () => ({
  useNavigation: () => ({
    currentSectionTitle: 'Current Section',
  }),
}));

describe('ThreeRowHeader', () => {
  it('renders all three rows', () => {
    render(<ThreeRowHeader paperTitle="Test Paper" />);
    
    // Check that all three rows are rendered
    expect(screen.getByTestId('top-row')).toBeInTheDocument();
    expect(screen.getByTestId('paper-row')).toBeInTheDocument();
    expect(screen.getByTestId('section-row')).toBeInTheDocument();
  });

  it('renders the main title in the top row', () => {
    render(<ThreeRowHeader paperTitle="Test Paper" />);
    
    // Check that the main title is rendered in the top row
    const topCenter = screen.getByTestId('top-center');
    expect(topCenter).toHaveTextContent('Urantia Book');
  });

  it('renders the paper title in the paper row', () => {
    render(<ThreeRowHeader paperTitle="Test Paper" />);
    
    // Check that the paper title is rendered in the paper row
    const paperCenter = screen.getByTestId('paper-center');
    expect(paperCenter).toHaveTextContent('Test Paper');
  });

  it('renders the DynamicSectionTitle in the section row', () => {
    render(<ThreeRowHeader paperTitle="Test Paper" />);
    
    // Check that the DynamicSectionTitle is rendered in the section row
    const sectionCenter = screen.getByTestId('section-center');
    expect(sectionCenter).toContainElement(screen.getByTestId('dynamic-section-title'));
  });

  it('renders the DualHamburgerNavigation in the top row', () => {
    render(<ThreeRowHeader paperTitle="Test Paper" />);
    
    // Check that the DualHamburgerNavigation is rendered in the top row
    const topLeft = screen.getByTestId('top-left');
    expect(topLeft).toContainElement(screen.getByTestId('dual-hamburger-navigation'));
  });

  it('applies custom className correctly', () => {
    render(<ThreeRowHeader paperTitle="Test Paper" className="custom-class" />);
    
    // Get the header element (parent of the first row)
    const header = screen.getByTestId('top-row').parentElement;
    
    // Check that the custom class is applied
    expect(header).toHaveClass('custom-class');
  });
});
