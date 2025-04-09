import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Header Component
 *
 * This component provides the main navigation header for the application.
 */
import Link from 'next/link';
import { Suspense } from 'react';
import { SearchBar } from '../search';
/**
 * Header component
 *
 * @param props Component props
 * @returns React component
 */
export function Header({ className = '' }) {
    return (_jsx("header", { className: `border-b border-gray-200 bg-white ${className}`, children: _jsxs("div", { className: "container mx-auto flex items-center justify-between px-4 py-4", children: [_jsx(Link, { href: "/", className: "text-xl font-bold", children: "PopRev2" }), _jsx("div", { className: "hidden md:block", children: _jsx(Suspense, { fallback: _jsx("div", { className: "w-64 h-10 bg-gray-100 rounded animate-pulse" }), children: _jsx(SearchBar, {}) }) }), _jsxs("nav", { className: "flex items-center space-x-4", children: [_jsx(Link, { href: "/", className: "text-gray-600 hover:text-gray-900", children: "Home" }), _jsx(Link, { href: "/search", className: "text-gray-600 hover:text-gray-900", children: "Search" }), _jsx(Link, { href: "/admin", className: "text-gray-600 hover:text-gray-900", children: "Admin" }), _jsxs(Link, { href: "/search", className: "md:hidden", children: [_jsxs("svg", { className: "h-5 w-5 text-gray-600", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("path", { d: "m21 21-4.3-4.3" })] }), _jsx("span", { className: "sr-only", children: "Search" })] })] })] }) }));
}
//# sourceMappingURL=header.js.map