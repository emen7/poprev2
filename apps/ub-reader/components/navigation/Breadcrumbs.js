'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { getPartForPaper } from '../../services/PaperDataService';
/**
 * Breadcrumbs Component
 *
 * This component displays breadcrumb navigation showing the current location
 * in the book hierarchy (part > paper > section).
 */
export default function Breadcrumbs({ paperId, paperTitle, sectionTitle }) {
    // Get part information
    const partNumber = getPartForPaper(paperId);
    const partTitle = getPartTitle(partNumber);
    return (_jsx("nav", { className: "breadcrumbs", "aria-label": "breadcrumbs", children: _jsxs("ol", { className: "breadcrumbs-list", children: [_jsxs("li", { className: "breadcrumbs-item", children: [_jsx(Link, { href: "/contents", className: "breadcrumbs-link", children: "Contents" }), _jsx("span", { className: "breadcrumbs-separator", children: "/" })] }), partNumber > 0 && (_jsxs("li", { className: "breadcrumbs-item", children: [_jsxs(Link, { href: `/contents#part${partNumber}`, className: "breadcrumbs-link", children: ["Part ", partNumber] }), _jsx("span", { className: "breadcrumbs-separator", children: "/" })] })), _jsxs("li", { className: "breadcrumbs-item", children: [_jsx(Link, { href: `/traditional-reader/${paperId}`, className: "breadcrumbs-link", children: paperId === 0 ? 'Foreword' : `Paper ${paperId}` }), sectionTitle && _jsx("span", { className: "breadcrumbs-separator", children: "/" })] }), sectionTitle && (_jsx("li", { className: "breadcrumbs-item breadcrumbs-current", children: _jsx("span", { className: "breadcrumbs-text", children: sectionTitle }) }))] }) }));
}
/**
 * Helper function to get part title based on part number
 */
function getPartTitle(partNumber) {
    switch (partNumber) {
        case 1:
            return 'THE CENTRAL AND SUPERUNIVERSES';
        case 2:
            return 'THE LOCAL UNIVERSE';
        case 3:
            return 'THE HISTORY OF URANTIA';
        case 4:
            return 'THE LIFE AND TEACHINGS OF JESUS';
        default:
            return '';
    }
}
//# sourceMappingURL=Breadcrumbs.js.map