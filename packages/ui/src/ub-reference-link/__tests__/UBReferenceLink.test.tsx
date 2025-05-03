/**
 * Unit tests for the UBReferenceLink component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { UBReferenceLink, UBReference } from '../UBReferenceLink';

// Mock the CSS module
jest.mock('../UBReferenceLink.css', () => ({}));

describe('UBReferenceLink', () => {
  // Test data
  const paperSectionReference: UBReference = {
    type: 'paper-section',
    paper: 1,
    section: 2,
    originalText: '1:2',
  };

  const paperReference: UBReference = {
    type: 'paper',
    paper: 3,
    originalText: 'Paper 3',
  };

  const paperSectionParagraphReference: UBReference = {
    type: 'paper-section-paragraph',
    paper: 4,
    section: 5,
    paragraph: 6,
    originalText: '4:5.6',
  };

  it('renders the reference text correctly', () => {
    render(<UBReferenceLink reference={paperSectionReference} />);
    
    // Check that the reference text is rendered
    expect(screen.getByText('1:2')).toBeInTheDocument();
  });

  it('renders custom children when provided', () => {
    render(
      <UBReferenceLink reference={paperSectionReference}>
        Custom Text
      </UBReferenceLink>
    );
    
    // Check that the custom text is rendered instead of the reference text
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
    expect(screen.queryByText('1:2')).not.toBeInTheDocument();
  });

  it('generates the correct URL for paper-section references', () => {
    render(<UBReferenceLink reference={paperSectionReference} baseUrl="/custom" />);
    
    // Check that the link has the correct href
    const link = screen.getByText('1:2');
    expect(link).toHaveAttribute('href', '/custom/paper/1#section-2');
  });

  it('generates the correct URL for paper references', () => {
    render(<UBReferenceLink reference={paperReference} baseUrl="/custom" />);
    
    // Check that the link has the correct href
    const link = screen.getByText('Paper 3');
    expect(link).toHaveAttribute('href', '/custom/paper/3');
  });

  it('generates the correct URL for paper-section-paragraph references', () => {
    render(<UBReferenceLink reference={paperSectionParagraphReference} baseUrl="/custom" />);
    
    // Check that the link has the correct href
    const link = screen.getByText('4:5.6');
    expect(link).toHaveAttribute('href', '/custom/paper/4#p-5-6');
  });

  it('applies custom className correctly', () => {
    render(<UBReferenceLink reference={paperSectionReference} className="custom-link" />);
    
    // Check that the custom class is applied
    const link = screen.getByText('1:2');
    expect(link).toHaveClass('ub-reference');
    expect(link).toHaveClass('custom-link');
  });

  it('sets data attributes correctly', () => {
    render(<UBReferenceLink reference={paperSectionReference} />);
    
    // Check that the data attributes are set correctly
    const link = screen.getByText('1:2');
    expect(link).toHaveAttribute('data-reference-type', 'paper-section');
    expect(link).toHaveAttribute('data-reference-paper', '1');
    expect(link).toHaveAttribute('data-reference-section', '2');
  });

  it('calls onClick handler when clicked', () => {
    // Create a mock click handler
    const handleClick = jest.fn();
    
    render(<UBReferenceLink reference={paperSectionReference} onClick={handleClick} />);
    
    // Click the link
    fireEvent.click(screen.getByText('1:2'));
    
    // Check that the click handler was called with the reference
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick.mock.calls[0][0]).toEqual(paperSectionReference);
    
    // Check that preventDefault was called on the event
    expect(handleClick.mock.calls[0][1].preventDefault).toHaveBeenCalled();
  });

  it('uses default baseUrl when not provided', () => {
    render(<UBReferenceLink reference={paperSectionReference} />);
    
    // Check that the link has the correct href with the default baseUrl
    const link = screen.getByText('1:2');
    expect(link).toHaveAttribute('href', '/reader/paper/1#section-2');
  });
});
