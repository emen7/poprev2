import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './HamburgerButton.css';
/**
 * HamburgerButton Component
 *
 * A button that displays a hamburger icon for toggling navigation menus.
 * Supports different sizes, variants, and open/closed states.
 */
export function HamburgerButton({ onClick, isOpen = false, ariaLabel = 'Toggle menu', variant = 'primary', size = 'medium', className = '', }) {
    const buttonClasses = [
        'hamburger-button',
        `hamburger-button-${variant}`,
        `hamburger-button-${size}`,
        isOpen ? 'hamburger-button-open' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("button", { className: buttonClasses, onClick: onClick, "aria-label": ariaLabel, "aria-expanded": isOpen, type: "button", children: [_jsx("span", { className: "hamburger-line hamburger-line-1" }), _jsx("span", { className: "hamburger-line hamburger-line-2" }), _jsx("span", { className: "hamburger-line hamburger-line-3" })] }));
}
export default HamburgerButton;
//# sourceMappingURL=HamburgerButton.js.map