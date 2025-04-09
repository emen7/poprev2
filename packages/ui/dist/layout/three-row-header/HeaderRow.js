import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './HeaderRow.module.css';
/**
 * HeaderRow Component
 *
 * A flexible row component for the three-row header system.
 */
export function HeaderRow({ rowType, leftContent, centerContent, rightContent, className = '', }) {
    const rowClasses = [styles.headerRow, styles[rowType], className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: rowClasses, children: [_jsx("div", { className: styles.leftContent, children: leftContent }), _jsx("div", { className: styles.centerContent, children: centerContent }), _jsx("div", { className: styles.rightContent, children: rightContent })] }));
}
export default HeaderRow;
//# sourceMappingURL=HeaderRow.js.map