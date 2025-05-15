import React from 'react';

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
}

/**
 * Primary UI component for user interaction
 */
export const SimpleButton: React.FC<SimpleButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  disabled = false,
  ...props
}) => {
  const mode = primary ? 'simple-button--primary' : 'simple-button--secondary';

  const buttonStyle = {
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 700,
    border: 0,
    borderRadius: '3em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-block',
    lineHeight: 1,
    opacity: disabled ? 0.5 : 1,
    color: primary ? 'white' : '#333',
    backgroundColor: backgroundColor || (primary ? '#1ea7fd' : 'transparent'),
    boxShadow: primary ? 'none' : 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
    padding: size === 'small' ? '10px 16px' : size === 'large' ? '12px 24px' : '11px 20px',
  };

  return (
    <button type="button" style={buttonStyle} disabled={disabled} onClick={props.onClick}>
      {label}
    </button>
  );
};
