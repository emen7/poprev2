import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from '../IconButton';

// Simple icon component for testing
const TestIcon = () => <span data-testid="test-icon">🔍</span>;

describe('IconButton Component', () => {
  it('renders correctly with default props', () => {
    render(
      <IconButton icon={<TestIcon />}>
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    const icon = screen.getByTestId('test-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button).toHaveClass('icon-button');
    expect(button).toHaveClass('icon-button--icon-left');
    expect(button).not.toHaveClass('icon-button--primary');
  });

  it('renders with icon on the right', () => {
    render(
      <IconButton icon={<TestIcon />} iconPosition="right">
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(button).toHaveClass('icon-button--icon-right');
  });

  it('renders icon-only button with aria-label', () => {
    render(
      <IconButton 
        icon={<TestIcon />} 
        iconPosition="only" 
        ariaLabel="Search button"
      />
    );
    
    const button = screen.getByRole('button', { name: /search button/i });
    
    expect(button).toHaveClass('icon-button--icon-only');
    expect(button).toHaveAttribute('aria-label', 'Search button');
  });

  it('applies primary variant class', () => {
    render(
      <IconButton icon={<TestIcon />} variant="primary">
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(button).toHaveClass('icon-button--primary');
  });

  it('applies size classes correctly', () => {
    render(
      <IconButton icon={<TestIcon />} size="large">
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(button).toHaveClass('icon-button--large');
  });

  it('applies circular class when circular prop is true', () => {
    render(
      <IconButton 
        icon={<TestIcon />} 
        iconPosition="only" 
        circular 
        ariaLabel="Search"
      />
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(button).toHaveClass('icon-button--circular');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    
    render(
      <IconButton icon={<TestIcon />} onClick={handleClick}>
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <IconButton icon={<TestIcon />} disabled>
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <IconButton icon={<TestIcon />} className="custom-class">
        Search
      </IconButton>
    );
    
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(button).toHaveClass('custom-class');
  });

  it('warns when icon-only button has no ariaLabel', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    render(
      <IconButton icon={<TestIcon />} iconPosition="only" />
    );
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'IconButton: ariaLabel is required for icon-only buttons without children'
    );
    
    consoleSpy.mockRestore();
  });
});
