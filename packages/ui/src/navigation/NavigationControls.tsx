import React from 'react';
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
export function NavigationControls({
  prevEnabled = true,
  nextEnabled = true,
  onPrevious,
  onNext,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  showLabels = false,
  size = 'medium',
  className = '',
  responsiveCompact = true,
}: NavigationControlsProps) {
  const containerClasses = [
    'navigation-controls',
    `navigation-controls-${size}`,
    responsiveCompact ? 'navigation-controls-responsive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <button
        className="navigation-button navigation-prev"
        onClick={onPrevious}
        disabled={!prevEnabled}
        aria-label={prevLabel}
        title={prevLabel}
      >
        <span className="navigation-icon navigation-prev-icon" aria-hidden="true"></span>
        {showLabels && <span className="navigation-label">{prevLabel}</span>}
      </button>

      <button
        className="navigation-button navigation-next"
        onClick={onNext}
        disabled={!nextEnabled}
        aria-label={nextLabel}
        title={nextLabel}
      >
        {showLabels && <span className="navigation-label">{nextLabel}</span>}
        <span className="navigation-icon navigation-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default NavigationControls;
