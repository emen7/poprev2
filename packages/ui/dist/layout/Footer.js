import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import './Footer.css';
/**
 * Footer Component
 *
 * A flexible footer component with three content sections (left, center, right).
 * Supports fixed positioning, border, and copyright options.
 */
export function Footer({
  leftContent,
  centerContent,
  rightContent,
  fixed = false,
  showBorder = true,
  className = '',
  showShadow = false,
  showCopyright = true,
  copyrightText = `© ${new Date().getFullYear()}`,
}) {
  const footerClasses = [
    'reader-footer',
    fixed ? 'reader-footer-fixed' : '',
    showBorder ? 'reader-footer-bordered' : '',
    showShadow ? 'reader-footer-shadow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return _jsx('footer', {
    className: footerClasses,
    children: _jsxs('div', {
      className: 'reader-footer-container',
      children: [
        _jsx('div', { className: 'reader-footer-left', children: leftContent }),
        _jsxs('div', {
          className: 'reader-footer-center',
          children: [
            centerContent,
            showCopyright &&
              !centerContent &&
              _jsx('div', { className: 'reader-footer-copyright', children: copyrightText }),
          ],
        }),
        _jsxs('div', {
          className: 'reader-footer-right',
          children: [
            rightContent,
            showCopyright &&
              !centerContent &&
              !rightContent &&
              _jsx('div', { className: 'reader-footer-copyright', children: copyrightText }),
          ],
        }),
      ],
    }),
  });
}
export default Footer;
//# sourceMappingURL=Footer.js.map
