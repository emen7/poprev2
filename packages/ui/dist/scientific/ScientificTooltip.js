import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import './ScientificTooltip.css';
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
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const termRef = useRef(null);
  const tooltipRef = useRef(null);
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
  const handleClick = e => {
    if (isTouchDevice && interactive) {
      e.preventDefault();
      setIsVisible(!isVisible);
      // Add a click event listener to the document to close the tooltip when clicking outside
      if (!isVisible) {
        document.addEventListener('click', handleDocumentClick);
      }
    }
  };
  const handleDocumentClick = e => {
    if (
      tooltipRef.current &&
      termRef.current &&
      !tooltipRef.current.contains(e.target) &&
      !termRef.current.contains(e.target)
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
  return _jsxs('span', {
    className: 'scientific-tooltip-wrapper',
    children: [
      _jsx('span', {
        ref: termRef,
        className: termClasses,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
        role: 'button',
        tabIndex: 0,
        'aria-describedby': `tooltip-${content.replace(/\s+/g, '-')}`,
        children: content,
      }),
      _jsx('div', {
        ref: tooltipRef,
        id: `tooltip-${content.replace(/\s+/g, '-')}`,
        className: tooltipClasses,
        role: 'tooltip',
        children: _jsxs('div', {
          className: 'tooltip-content',
          children: [
            data.type === 'abbreviation' &&
              _jsxs(_Fragment, {
                children: [
                  _jsx('div', { className: 'tooltip-title', children: data.shortForm }),
                  _jsx('div', { className: 'tooltip-full-form', children: data.fullForm }),
                ],
              }),
            data.type === 'equation' &&
              _jsxs(_Fragment, {
                children: [
                  _jsx('div', { className: 'tooltip-title', children: content }),
                  _jsx('div', { className: 'tooltip-full-form', children: data.fullForm }),
                  data.simplifiedForm &&
                    _jsx('div', { className: 'tooltip-simplified', children: data.simplifiedForm }),
                ],
              }),
            data.type === 'term' &&
              _jsxs(_Fragment, {
                children: [
                  _jsx('div', { className: 'tooltip-title', children: content }),
                  _jsx('div', { className: 'tooltip-full-form', children: data.fullForm }),
                ],
              }),
            data.context && _jsx('div', { className: 'tooltip-context', children: data.context }),
            data.relatedTerms &&
              data.relatedTerms.length > 0 &&
              _jsxs('div', {
                className: 'tooltip-related',
                children: [
                  _jsx('span', { className: 'related-label', children: 'Related: ' }),
                  data.relatedTerms.join(', '),
                ],
              }),
            data.source && _jsx('div', { className: 'tooltip-source', children: data.source }),
          ],
        }),
      }),
    ],
  });
}
export default ScientificTooltip;
//# sourceMappingURL=ScientificTooltip.js.map
