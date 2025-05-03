/**
 * Paper Row Component (Row 2)
 *
 * This is the second row of the 3-row header design.
 * It displays the paper name, left-aligned with medium font size.
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import './PaperRow.css';
export const PaperRow = ({ paperTitle }) => {
    return (_jsx("div", { className: "paper-row", children: _jsx("h2", { className: "paper-title", children: paperTitle }) }));
};
//# sourceMappingURL=PaperRow.js.map