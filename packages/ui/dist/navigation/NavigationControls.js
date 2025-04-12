import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import './NavigationControls.css';
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
}) {
  const containerClasses = [
    'navigation-controls',
    `navigation-controls-${size}`,
    responsiveCompact ? 'navigation-controls-responsive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return _jsxs('div', {
    className: containerClasses,
    children: [
      _jsxs('button', {
        className: 'navigation-button navigation-prev',
        onClick: onPrevious,
        disabled: !prevEnabled,
        'aria-label': prevLabel,
        title: prevLabel,
        children: [
          _jsx('span', {
            className: 'navigation-icon navigation-prev-icon',
            'aria-hidden': 'true',
          }),
          showLabels && _jsx('span', { className: 'navigation-label', children: prevLabel }),
        ],
      }),
      _jsxs('button', {
        className: 'navigation-button navigation-next',
        onClick: onNext,
        disabled: !nextEnabled,
        'aria-label': nextLabel,
        title: nextLabel,
        children: [
          showLabels && _jsx('span', { className: 'navigation-label', children: nextLabel }),
          _jsx('span', {
            className: 'navigation-icon navigation-next-icon',
            'aria-hidden': 'true',
          }),
        ],
      }),
    ],
  });
}
export default NavigationControls;
//# sourceMappingURL=NavigationControls.js.map
