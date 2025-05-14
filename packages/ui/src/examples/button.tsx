import React from 'react';
import './button.css';

/**
 * Button variants
 */
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger';

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   * @default 'default'
   */
  variant?: ButtonVariant;
  
  /**
   * The content to display inside the button
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'button';
  const variantClass = variant !== 'default' ? `${baseClass}--${variant}` : '';
  const classes = [baseClass, variantClass, className].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
