/**
 * Title Row Component (Row 1)
 *
 * This is the first row of the 3-row header design.
 * It contains the Book Hamburger menu, Section menu, navigation arrows,
 * main title, and branding space.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './TitleRow.css';
export const TitleRow = ({ title, onBookMenuToggle, onSectionMenuToggle, onPreviousPaper, onNextPaper, brandingElement, }) => {
    return (_jsxs("div", { className: "title-row", children: [_jsx("button", { className: "row-button book-menu-button", onClick: onBookMenuToggle, "aria-label": "Toggle Book Menu", children: _jsx("i", { className: "fas fa-bars" }) }), _jsx("button", { className: "row-button section-menu-button", onClick: onSectionMenuToggle, "aria-label": "Toggle Sections Menu", children: _jsx("i", { className: "fas fa-list" }) }), _jsx("button", { className: "row-button prev-paper-button", onClick: onPreviousPaper, "aria-label": "Previous Paper", children: _jsx("i", { className: "fas fa-chevron-left" }) }), _jsx("h1", { className: "book-title", children: title }), _jsx("button", { className: "row-button next-paper-button", onClick: onNextPaper, "aria-label": "Next Paper", children: _jsx("i", { className: "fas fa-chevron-right" }) }), brandingElement && _jsx("div", { className: "branding-area", children: brandingElement })] }));
};
//# sourceMappingURL=TitleRow.js.map