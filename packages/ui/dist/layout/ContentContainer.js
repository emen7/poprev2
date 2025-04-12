import { jsx as _jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import './ContentContainer.css';
/**
 * ContentContainer Component
 *
 * A container for reader content that provides:
 * - Configurable width settings
 * - Horizontal centering
 * - Padding options
 * - Optional virtualized scrolling for large content
 */
export const ContentContainer = forwardRef(function ContentContainer(
  {
    children,
    width = 'medium',
    centered = true,
    padding = 'normal',
    className = '',
    virtualized = false,
  },
  ref
) {
  const containerClasses = [
    'content-container',
    `content-width-${width}`,
    centered ? 'content-centered' : '',
    `content-padding-${padding}`,
    virtualized ? 'content-virtualized' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return _jsx('div', { className: containerClasses, ref: ref, children: children });
});
export default ContentContainer;
//# sourceMappingURL=ContentContainer.js.map
