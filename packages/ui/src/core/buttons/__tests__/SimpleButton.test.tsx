import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SimpleButton } from '../SimpleButton';

describe('SimpleButton Component', () => {
  it('renders correctly with default props', () => {
    render(<SimpleButton label="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('simple-button');
    expect(button).toHaveClass('simple-button--secondary');
    expect(button).toHaveClass('simple-button--medium');
    expect(button).not.toHaveClass('simple-button--disabled');
  });

  it('renders correctly as primary button', () => {
    render(<SimpleButton primary label="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('simple-button--primary');
    expect(button).not.toHaveClass('simple-button--secondary');
  });

  it('renders correctly with different sizes', () => {
    const { rerender } = render(<SimpleButton size="small" label="Small" />);
    
    let button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('simple-button--small');
    
    rerender(<SimpleButton size="medium" label="Medium" />);
    button = screen.getByRole('button', { name: /medium/i });
    expect(button).toHaveClass('simple-button--medium');
    
    rerender(<SimpleButton size="large" label="Large" />);
    button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('simple-button--large');
  });

  it('renders correctly when disabled', () => {
    render(<SimpleButton disabled label="Disabled" />);
    
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('simple-button--disabled');
  });

  it('applies custom background color', () => {
    render(<SimpleButton backgroundColor="#ff0000" label="Red Button" />);
    
    const button = screen.getByRole('button', { name: /red button/i });
    expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('applies custom className', () => {
    render(<SimpleButton className="custom-class" label="Custom Button" />);
    
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<SimpleButton onClick={handleClick} label="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', async () => {
    const handleClick = jest.fn();
    render(<SimpleButton disabled onClick={handleClick} label="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
