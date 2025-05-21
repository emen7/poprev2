import React from 'react';
import './SimpleButton.css';

export interface SimpleButtonProps {
  /**
   * Button contents
   */
  label: string;
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  
  /**
   * What background color to use
   */
  backgroundColor?: string;
  
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SimpleButton Component
 * 
 * A simple button component with customizable styles.
 * 
 * @example
 * ```tsx
 * <SimpleButton 
 *   primary 
 *   label="Click me" 
 *   onClick={() => console.log('Button clicked')} 
 * />
 * ```
 */
export function SimpleButton({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  disabled = false,
  className = '',
  ...props
}: SimpleButtonProps) {
  const mode = primary ? 'simple-button--primary' : 'simple-button--secondary';
  const sizeClass = `simple-button--${size}`;
  const disabledClass = disabled ? 'simple-button--disabled' : '';
  
  const classes = [
    'simple-button',
    mode,
    sizeClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');
  
  const style = backgroundColor ? { backgroundColor } : {};

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      style={style}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
}

export default SimpleButton;
