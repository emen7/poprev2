import React from 'react';
import { IconProps } from './types';

/**
 * Icon size mapping to pixel values
 */
const SIZE_MAP = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * IconWrapper component
 * 
 * A wrapper component for SVG icons that provides consistent sizing and styling.
 * This component will be used to wrap Phosphor icons when they are added.
 * 
 * @example
 * ```tsx
 * // With a custom SVG
 * <IconWrapper size="md" weight="regular">
 *   <svg>...</svg>
 * </IconWrapper>
 * 
 * // Will be used with Phosphor icons in the future
 * <IconWrapper>
 *   <MagnifyingGlass weight="bold" />
 * </IconWrapper>
 * ```
 */
export const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 'md',
  weight = 'regular',
  color,
  mirrored = false,
  className = '',
  alt,
  children,
  ...props
}) => {
  // Convert size to pixels if it's a string
  const sizeInPixels = typeof size === 'string' ? SIZE_MAP[size] || 20 : size;
  
  // Create class names
  const classes = [
    'ub-icon',
    `ub-icon--${weight}`,
    mirrored ? 'ub-icon--mirrored' : '',
    className,
  ].filter(Boolean).join(' ');
  
  // Style object
  const style = {
    color,
    transform: mirrored ? 'scaleX(-1)' : undefined,
    display: 'inline-block',
    lineHeight: 1,
  };
  
  return (
    <span 
      className={classes} 
      style={style} 
      role={alt ? 'img' : undefined}
      aria-label={alt}
      {...props}
    >
      {React.Children.map(children, child => {
        // If the child is a React element (like an SVG), clone it and add size props
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            width: sizeInPixels,
            height: sizeInPixels,
            ...child.props,
          });
        }
        return child;
      })}
    </span>
  );
};

/**
 * Temporary icon components for use until Phosphor is integrated
 * These will be replaced with Phosphor icons in the future
 */

/**
 * SearchIcon component
 */
export const SearchIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.weight === 'bold' ? 2.5 : props.weight === 'thin' ? 1 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </IconWrapper>
);

/**
 * HeartIcon component
 */
export const HeartIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.weight === 'fill' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={props.weight === 'bold' ? 2.5 : props.weight === 'thin' ? 1 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </IconWrapper>
);

/**
 * GearIcon component
 */
export const GearIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.weight === 'bold' ? 2.5 : props.weight === 'thin' ? 1 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  </IconWrapper>
);

/**
 * BookmarkIcon component
 */
export const BookmarkIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.weight === 'fill' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={props.weight === 'bold' ? 2.5 : props.weight === 'thin' ? 1 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  </IconWrapper>
);

/**
 * NoteIcon component
 */
export const NoteIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.weight === 'bold' ? 2.5 : props.weight === 'thin' ? 1 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  </IconWrapper>
);

export default IconWrapper;
