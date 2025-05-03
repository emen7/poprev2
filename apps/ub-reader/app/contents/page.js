'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getContentsData, FOREWORD_SECTIONS } from '../../services/PaperDataService';
/**
 * Contents Page
 *
 * This page displays a comprehensive table of contents for the Urantia Book,
 * based on the format in the original FM_Contents-table.htm file.
 */
export default function ContentsPage() {
    const [contentsData, setContentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('standard');
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
    return (_jsxs("div", { className: "container mx-auto p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "The Urantia Book - Contents" }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx(Link, { href: "/", className: "text-blue-600 hover:underline inline-block", children: "\u2190 Back to Home" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { className: `px-4 py-2 rounded ${viewMode === 'standard'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`, onClick: () => setViewMode('standard'), children: "Standard View" }), _jsx("button", { className: `px-4 py-2 rounded ${viewMode === 'original'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`, onClick: () => setViewMode('original'), children: "Original Format" })] })] }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: viewMode === 'standard'
                            ? 'This table of contents provides links to all papers and sections in the Urantia Book.'
                            : 'This view presents the contents in a format similar to the original printed edition.' })] }), viewMode === 'standard' ? (_jsx(StandardContentsView, { contentsData: contentsData })) : (_jsx(OriginalContentsView, { contentsData: contentsData }))] }));
}
/**
 * Helper function to create vertical columns for sections
 * This ensures sections are listed in a vertical sequence (1,2,3,4 in first column, 5,6,7,8 in second, etc.)
 */
function createSectionColumns(sections) {
    // Determine number of columns based on section count
    let columnCount = 1;
    if (sections.length > 6)
        columnCount = 2;
    if (sections.length > 12)
        columnCount = 3;
    if (sections.length > 18)
        columnCount = 4;
    // Calculate items per column (rounded up to ensure all items are included)
    const itemsPerColumn = Math.ceil(sections.length / columnCount);
    // Create columns
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
        const startIndex = i * itemsPerColumn;
        const endIndex = Math.min(startIndex + itemsPerColumn, sections.length);
        columns.push(sections.slice(startIndex, endIndex));
    }
    return columns;
}
/**
 * Standard Contents View Component
 *
 * Displays the contents in a modern, hierarchical format.
 */
function StandardContentsView({ contentsData }) {
    return (_jsx("div", { className: "space-y-8", children: contentsData.map(part => (_jsxs("div", { id: `part${part.number}`, className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: [_jsxs("h2", { className: "text-2xl font-semibold mb-3", children: ["Part ", part.number, ": ", part.title] }), _jsx("div", { className: "space-y-6", children: part.papers.map(paper => (_jsxs("div", { className: "border-t pt-4 first:border-t-0 first:pt-0", children: [_jsx("h3", { className: "text-xl font-medium mb-2", children: _jsx(Link, { href: `/traditional-reader/${paper.number}`, className: "text-blue-600 hover:underline", children: paper.number === 0 ? 'Foreword' : `Paper ${paper.number}: ${paper.title}` }) }), _jsx("div", { className: "flex flex-wrap", children: createSectionColumns(paper.sections).map((column, colIndex) => (_jsx("div", { className: "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4", children: _jsx("ul", { className: "space-y-1 pr-2", children: column.map(section => {
                                            var _a;
                                            return (_jsx("li", { className: "text-gray-700 dark:text-gray-300", children: _jsx(Link, { href: `/traditional-reader/${paper.number}#section${section.number}`, className: "hover:text-blue-600 hover:underline block", children: paper.number === 0
                                                        ? `${(_a = FOREWORD_SECTIONS.find(s => s.number === section.number)) === null || _a === void 0 ? void 0 : _a.romanNumeral}. ${section.title}`
                                                        : `${section.number}. ${section.title}` }) }, section.number));
                                        }) }) }, colIndex))) })] }, paper.number))) })] }, part.number))) }));
}
/**
 * Original Contents View Component
 *
 * Displays the contents in a format similar to the original printed edition.
 */
function OriginalContentsView({ contentsData }) {
    return (_jsx("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-center text-2xl font-semibold mb-6", children: "CONTENTS OF THE BOOK" }), contentsData.map(part => (_jsxs("div", { id: `part${part.number}`, className: "mb-10", children: [_jsxs("h3", { className: "text-center text-xl font-medium mb-4", children: ["PART ", part.number, ".", _jsx("br", {}), part.title] }), part.papers.map(paper => (_jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "font-medium mb-2", children: paper.number === 0 ? (_jsx(Link, { href: `/traditional-reader/${paper.number}`, className: "text-blue-600 hover:underline", children: "Foreword" })) : (_jsxs("span", { children: [paper.number, ".", ' ', _jsx(Link, { href: `/traditional-reader/${paper.number}`, className: "text-blue-600 hover:underline", children: paper.title })] })) }), _jsx("div", { className: "pl-8", children: _jsx("table", { className: "w-full", children: _jsx("tbody", { children: paper.sections.map(section => {
                                                var _a;
                                                return (_jsxs("tr", { children: [_jsx("td", { className: "text-right pr-4 w-16 align-top", children: _jsxs(Link, { href: `/traditional-reader/${paper.number}#section${section.number}`, className: "text-blue-600 hover:underline", children: [paper.number === 0
                                                                        ? (_a = FOREWORD_SECTIONS.find(s => s.number === section.number)) === null || _a === void 0 ? void 0 : _a.romanNumeral
                                                                        : section.number, "."] }) }), _jsx("td", { children: _jsx(Link, { href: `/traditional-reader/${paper.number}#section${section.number}`, className: "text-blue-600 hover:underline", children: section.title }) })] }, section.number));
                                            }) }) }) })] }, paper.number)))] }, part.number)))] }) }));
}
//# sourceMappingURL=page.js.map