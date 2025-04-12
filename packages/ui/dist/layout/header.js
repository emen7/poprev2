import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import './Header.css';
/**
 * Header Component
 *
 * A flexible header component with three content sections (left, center, right).
 * Supports fixed positioning, border, and transparency options.
 */
export function Header({
  leftContent,
  centerContent,
  rightContent,
  fixed = true,
  showBorder = true,
  className = '',
  transparentOnTop = false,
  showShadow = true,
}) {
  const headerClasses = [
    'reader-header',
    fixed ? 'reader-header-fixed' : '',
    showBorder ? 'reader-header-bordered' : '',
    transparentOnTop ? 'reader-header-transparent-on-top' : '',
    showShadow ? 'reader-header-shadow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return _jsx('header', {
    className: headerClasses,
    children: _jsxs('div', {
      className: 'reader-header-container',
      children: [
        leftContent && _jsx('div', { className: 'reader-header-left', children: leftContent }),
        centerContent &&
          _jsx('div', { className: 'reader-header-center', children: centerContent }),
        rightContent && _jsx('div', { className: 'reader-header-right', children: rightContent }),
      ],
    }),
  });
}
export default Header;
//# sourceMappingURL=header.js.map
