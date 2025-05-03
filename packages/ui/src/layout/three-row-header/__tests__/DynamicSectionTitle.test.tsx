/**
 * Unit tests for the DynamicSectionTitle component
 */

import { render, screen, act } from '@testing-library/react';
import React from 'react';

import { DynamicSectionTitle } from '../DynamicSectionTitle';

// Mock the CSS modules
jest.mock('../DynamicSectionTitle.module.css', () => ({
  dynamicSectionTitle: 'dynamic-section-title',
  fadeIn: 'fade-in',
}));

describe('DynamicSectionTitle', () => {
  beforeEach(() => {
    // Reset timers before each test
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore timers after each test
    jest.useRealTimers();
  });

  it('renders the provided title', () => {
    render(<DynamicSectionTitle title="Test Section" />);
    
    // Check that the title is rendered
    expect(screen.getByText('Test Section')).toBeInTheDocument();
  });

  it('renders default text when title is empty', () => {
    render(<DynamicSectionTitle title="" />);
    
    // Check that the default text is rendered
    expect(screen.getByText('Select a section')).toBeInTheDocument();
  });

  it('applies animation class when title changes', () => {
    // Render with initial title
    const { rerender } = render(<DynamicSectionTitle title="Initial Title" />);
    
    // Get the title element
    const titleElement = screen.getByText('Initial Title');
    
    // Initially, no animation class should be applied
    expect(titleElement.classList.contains('fade-in')).toBe(false);
    
    // Change the title
    rerender(<DynamicSectionTitle title="New Title" />);
    
    // Now the animation class should be applied
    expect(screen.getByText('New Title').classList.contains('fade-in')).toBe(true);
    
    // Advance timers to complete the animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // After the animation completes, the class should be removed
    expect(screen.getByText('New Title').classList.contains('fade-in')).toBe(false);
  });

  it('does not animate when changing from a title to empty', () => {
    // Render with initial title
    const { rerender } = render(<DynamicSectionTitle title="Initial Title" />);
    
    // Change to empty title
    rerender(<DynamicSectionTitle title="" />);
    
    // The animation class should not be applied
    expect(screen.getByText('Select a section').classList.contains('fade-in')).toBe(false);
  });

  it('applies custom className correctly', () => {
    render(<DynamicSectionTitle title="Test Section" className="custom-class" />);
    
    // Get the title element
    const titleElement = screen.getByText('Test Section');
    
    // Check that the custom class is applied
    expect(titleElement.classList.contains('custom-class')).toBe(true);
  });
});
