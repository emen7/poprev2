import React, { useState, useRef, useEffect } from 'react';

import { TooltipData } from '../types/TooltipData';
import './ScientificTooltip.css';

export interface ScientificTooltipProps {
  /**
   * The content to display (the term that will be wrapped with the tooltip)
   */
  content: string;

  /**
   * The tooltip data
   */
  data: TooltipData;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to show the tooltip on hover (desktop) or click (mobile)
   * @default true
   */
  interactive?: boolean;

  /**
   * Tooltip position
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

/**
 * ScientificTooltip Component
 *
 * A tooltip component for scientific content that displays
 * additional information about abbreviations, equations, and technical terms.
 */
export function ScientificTooltip({
  content,
  data,
  className = '',
  interactive = true,
  position = 'auto',
}: ScientificTooltipProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const termRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Determine if we're on a touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Calculate tooltip position
  useEffect(() => {
    if (isVisible && termRef.current && tooltipRef.current) {
      const termRect = termRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Default to the specified position
      let calculatedPosition = position;

      // If position is 'auto', calculate the best position
      if (position === 'auto') {
        // Check if there's enough space above
        if (termRect.top > tooltipRect.height + 10) {
          calculatedPosition = 'top';
        }
        // Check if there's enough space below
        else if (viewportHeight - termRect.bottom > tooltipRect.height + 10) {
          calculatedPosition = 'bottom';
        }
        // Check if there's enough space to the right
        else if (viewportWidth - termRect.right > tooltipRect.width + 10) {
          calculatedPosition = 'right';
        }
        // Default to left if none of the above
        else {
          calculatedPosition = 'left';
        }
      }

      setTooltipPosition(calculatedPosition);
    }
  }, [isVisible, position]);

  // Handle mouse events for desktop
  const handleMouseEnter = () => {
    if (!isTouchDevice && interactive) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && interactive) {
      setIsVisible(false);
    }
  };

  // Handle click events for mobile
  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice && interactive) {
      e.preventDefault();
      setIsVisible(!isVisible);

      // Add a click event listener to the document to close the tooltip when clicking outside
      if (!isVisible) {
        document.addEventListener('click', handleDocumentClick);
      }
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      tooltipRef.current &&
      termRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      !termRef.current.contains(e.target as Node)
    ) {
      setIsVisible(false);
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Determine CSS classes
  const termClasses = [
    'scientific-term',
    className,
    isVisible ? 'active' : '',
    `term-type-${data.type}`,
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipClasses = [
    'scientific-tooltip',
    `tooltip-position-${tooltipPosition}`,
    isVisible ? 'visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className="scientific-tooltip-wrapper">
      <span
        ref={termRef}
        className={termClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-describedby={`tooltip-${content.replace(/\s+/g, '-')}`}
      >
        {content}
      </span>

      <div
        ref={tooltipRef}
        id={`tooltip-${content.replace(/\s+/g, '-')}`}
        className={tooltipClasses}
        role="tooltip"
      >
        <div className="tooltip-content">
          {data.type === 'abbreviation' && (
            <>
              <div className="tooltip-title">{data.shortForm}</div>
              <div className="tooltip-full-form">{data.fullForm}</div>
            </>
          )}

          {data.type === 'equation' && (
            <>
              <div className="tooltip-title">{content}</div>
              <div className="tooltip-full-form">{data.fullForm}</div>
              {data.simplifiedForm && (
                <div className="tooltip-simplified">{data.simplifiedForm}</div>
              )}
            </>
          )}

          {data.type === 'term' && (
            <>
              <div className="tooltip-title">{content}</div>
              <div className="tooltip-full-form">{data.fullForm}</div>
            </>
          )}

          {data.context && <div className="tooltip-context">{data.context}</div>}

          {data.relatedTerms && data.relatedTerms.length > 0 && (
            <div className="tooltip-related">
              <span className="related-label">Related: </span>
              {data.relatedTerms.join(', ')}
            </div>
          )}

          {data.source && <div className="tooltip-source">{data.source}</div>}
        </div>
      </div>
    </span>
  );
}

export default ScientificTooltip;
