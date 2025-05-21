import React from 'react';
import './IconButton.css';
import { IconProps } from '../icons/types';

/**
 * Icon position relative to the text
 */
export type IconPosition = 'left' | 'right' | 'only';

/**
 * Button variants
 */
export type IconButtonVariant = 'default' | 'primary' | 'secondary' | 'danger';

/**
 * Button sizes
 */
export type IconButtonSize = 'small' | 'medium' | 'large';

/**
 * IconButton component props
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The icon to display
   * Can be a React element (recommended) or a string
   * Compatible with Phosphor icons
   */
  icon: React.ReactNode;

  /**
   * The position of the icon relative to the text
   * @default 'left'
   */
  iconPosition?: IconPosition;

  /**
   * The visual style variant of the button
   * @default 'default'
   */
  variant?: IconButtonVariant;

  /**
   * The size of the button
   * @default 'medium'
   */
  size?: IconButtonSize;

  /**
   * The content to display inside the button
   * Not required if iconPosition is 'only'
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Accessible label for the button
   * Required when iconPosition is 'only' and no children are provided
   */
  ariaLabel?: string;

  /**
   * Whether to use a circular shape
   * @default false
   */
  circular?: boolean;

  /**
   * Icon weight/style
   * Passed to the icon component if it accepts it
   * @default 'regular'
   */
  iconWeight?: IconProps['weight'];

  /**
   * Icon color
   * Passed to the icon component if it accepts it
   */
  iconColor?: string;
}

/**
 * IconButton component for user interactions with icons
 *
 * A button component that includes an icon alongside text or as a standalone icon button.
 * Compatible with Phosphor icons and our custom icon system.
 *
 * @example
 * ```tsx
 * // Button with icon on the left
 * <IconButton icon={<SearchIcon />} variant="primary">
 *   Search
 * </IconButton>
 *
 * // Icon-only button
 * <IconButton
 *   icon={<CloseIcon />}
 *   iconPosition="only"
 *   ariaLabel="Close dialog"
 *   circular
 * />
 *
 * // With Phosphor icons (future)
 * <IconButton
 *   icon={<MagnifyingGlass />}
 *   iconWeight="bold"
 *   variant="primary"
 * >
 *   Search
 * </IconButton>
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'medium',
  children,
  className = '',
  ariaLabel,
  circular = false,
  iconWeight = 'regular',
  iconColor,
  ...props
}) => {
  // Validate that ariaLabel is provided for icon-only buttons
  if (iconPosition === 'only' && !children && !ariaLabel) {
    console.warn('IconButton: ariaLabel is required for icon-only buttons without children');
  }

  const baseClass = 'icon-button';
  const variantClass = variant !== 'default' ? `${baseClass}--${variant}` : '';
  const sizeClass = `${baseClass}--${size}`;
  const positionClass = `${baseClass}--icon-${iconPosition}`;
  const shapeClass = circular ? `${baseClass}--circular` : '';

  const classes = [baseClass, variantClass, sizeClass, positionClass, shapeClass, className]
    .filter(Boolean)
    .join(' ');

  // Map button size to icon size
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 'sm';
      case 'large':
        return 'lg';
      default:
        return 'md';
    }
  };

  // Process the icon to add weight and size props if it's a component that accepts them
  const processedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        // Only add these props if the component accepts them
        ...(icon.props && 'weight' in icon.props ? { weight: iconWeight } : {}),
        ...(icon.props && 'size' in icon.props ? { size: getIconSize() } : {}),
        ...(icon.props && 'color' in icon.props && iconColor ? { color: iconColor } : {}),
      })
    : icon;

  return (
    <button
      className={classes}
      aria-label={iconPosition === 'only' && !children ? ariaLabel : undefined}
      {...props}
    >
      {(iconPosition === 'left' || iconPosition === 'only') && (
        <span className={`${baseClass}__icon`}>{processedIcon}</span>
      )}

      {iconPosition !== 'only' && children && (
        <span className={`${baseClass}__text`}>{children}</span>
      )}

      {iconPosition === 'right' && <span className={`${baseClass}__icon`}>{processedIcon}</span>}
    </button>
  );
};

export default IconButton;
