import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './HamburgerButton.module.css';
/**
 * HamburgerButton Component
 *
 * A button that toggles between hamburger and X icons for navigation menus.
 */
export function HamburgerButton({ variant, isOpen, onClick, className = '', }) {
    const buttonClasses = [
        styles.hamburgerButton,
        styles[variant],
        isOpen ? styles.open : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("button", { className: buttonClasses, onClick: onClick, "aria-label": `Toggle ${variant} navigation`, "aria-expanded": isOpen, children: [_jsx("span", { className: styles.bar }), _jsx("span", { className: styles.bar }), _jsx("span", { className: styles.bar })] }));
}
export default HamburgerButton;
//# sourceMappingURL=HamburgerButton.js.map