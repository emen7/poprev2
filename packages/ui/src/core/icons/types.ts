/**
 * Icon System Types
 */

/**
 * Icon weight options
 * These match Phosphor icon weights
 */
export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

/**
 * Icon size options
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Icon props interface
 * Compatible with Phosphor icon props
 */
export interface IconProps {
  /**
   * The size of the icon
   * @default 'md'
   */
  size?: IconSize | number;
  
  /**
   * The weight/style of the icon
   * @default 'regular'
   */
  weight?: IconWeight;
  
  /**
   * The color of the icon
   * Uses currentColor by default
   */
  color?: string;
  
  /**
   * Whether the icon should mimic text
   * @default false
   */
  mirrored?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Accessible label for the icon
   */
  alt?: string;
  
  /**
   * Additional props to pass to the SVG element
   */
  [key: string]: any;
}
