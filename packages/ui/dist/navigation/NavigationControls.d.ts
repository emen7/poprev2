import './NavigationControls.css';
export interface NavigationControlsProps {
  /**
   * Whether the previous button is enabled
   * @default true
   */
  prevEnabled?: boolean;
  /**
   * Whether the next button is enabled
   * @default true
   */
  nextEnabled?: boolean;
  /**
   * Function called when the previous button is clicked
   */
  onPrevious?: () => void;
  /**
   * Function called when the next button is clicked
   */
  onNext?: () => void;
  /**
   * Label for the previous button
   * @default 'Previous'
   */
  prevLabel?: string;
  /**
   * Label for the next button
   * @default 'Next'
   */
  nextLabel?: string;
  /**
   * Whether to show text labels alongside icons
   * @default false
   */
  showLabels?: boolean;
  /**
   * Size of the navigation controls
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether to show a compact version on small screens
   * @default true
   */
  responsiveCompact?: boolean;
}
/**
 * NavigationControls Component
 *
 * A component that provides previous/next navigation buttons.
 * Supports different sizes, labels, and responsive behavior.
 */
export declare function NavigationControls({
  prevEnabled,
  nextEnabled,
  onPrevious,
  onNext,
  prevLabel,
  nextLabel,
  showLabels,
  size,
  className,
  responsiveCompact,
}: NavigationControlsProps): import('react/jsx-runtime').JSX.Element;
export default NavigationControls;
//# sourceMappingURL=NavigationControls.d.ts.map
