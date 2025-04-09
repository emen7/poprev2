import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigation } from '@ub-ecosystem/state-management';
import { HeaderRow } from './HeaderRow';
import { DynamicSectionTitle } from './DynamicSectionTitle';
import { DualHamburgerNavigation } from '../../navigation/dual-hamburger';
import styles from './ThreeRowHeader.module.css';
/**
 * ThreeRowHeader Component
 *
 * A header component with three rows:
 * 1. Top row: Main title and navigation buttons
 * 2. Paper row: Current paper title
 * 3. Section row: Dynamic section title that updates based on scroll position
 */
export function ThreeRowHeader({ paperTitle, className = '' }) {
    const { currentSectionTitle } = useNavigation();
    return (_jsxs("header", { className: `${styles.threeRowHeader} ${className}`, children: [_jsx(HeaderRow, { rowType: "top", leftContent: _jsx(DualHamburgerNavigation, {}), centerContent: _jsx("h1", { className: styles.mainTitle, children: "Urantia Book" }) }), _jsx(HeaderRow, { rowType: "paper", centerContent: _jsx("h2", { className: styles.paperTitle, children: paperTitle }) }), _jsx(HeaderRow, { rowType: "section", centerContent: _jsx(DynamicSectionTitle, { title: currentSectionTitle, className: styles.sectionTitle }) })] }));
}
export default ThreeRowHeader;
//# sourceMappingURL=ThreeRowHeader.js.map