'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getContentsData } from '../../services/PaperDataService';
/**
 * Papers List Page
 *
 * This page displays a list of all papers in the Urantia Book organized by parts,
 * based on the format in the original FM_Titles.htm file.
 */
export default function PapersPage() {
    const [contentsData, setContentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getContentsData();
                setContentsData(data);
            }
            catch (error) {
                console.error('Error fetching contents data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "container mx-auto p-8", children: _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" }) }) }));
    }
    return (_jsxs("div", { className: "container mx-auto p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "The Urantia Book - Papers" }), _jsxs("div", { className: "mb-8 flex justify-between items-center", children: [_jsx(Link, { href: "/", className: "text-blue-600 hover:underline inline-block", children: "\u2190 Back to Home" }), _jsx(Link, { href: "/contents", className: "text-blue-600 hover:underline inline-block", children: "View Full Contents \u2192" })] }), _jsx("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-300 dark:border-gray-700", children: [_jsx("th", { className: "text-left py-2 w-16", children: "Paper" }), _jsx("th", { className: "text-left py-2", children: "Title" }), _jsx("th", { className: "text-left py-2", children: "Presenter" })] }) }), _jsx("tbody", { children: contentsData.map(part => (_jsxs(React.Fragment, { children: [_jsx("tr", { className: "bg-gray-100 dark:bg-gray-700", children: _jsxs("td", { colSpan: 3, className: "py-3 px-2 font-semibold", children: ["PART ", part.number, ": ", part.title] }) }), part.papers.map(paper => (_jsxs("tr", { className: "border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750", children: [_jsx("td", { className: "py-2 text-gray-600 dark:text-gray-400", children: paper.number === 0 ? '' : paper.number }), _jsx("td", { className: "py-2", children: _jsx(Link, { href: `/traditional-reader/${paper.number}`, className: "text-blue-600 hover:underline", children: paper.number === 0 ? 'Foreword' : paper.title }) }), _jsx("td", { className: "py-2 text-gray-600 dark:text-gray-400 italic", children: paper.author })] }, paper.number)))] }, part.number))) })] }) }) })] }));
}
//# sourceMappingURL=page.js.map