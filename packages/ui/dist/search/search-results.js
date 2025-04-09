/**
 * Search Results Component
 *
 * This component displays search results.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Link from 'next/link';
/**
 * Search results component
 *
 * @param props Component props
 * @returns React component
 */
export function SearchResults({ initialResults, query, filters, className = '', }) {
    const [results, setResults] = useState(initialResults || []);
    const [loading, setLoading] = useState(!initialResults);
    const [error, setError] = useState(null);
    useEffect(() => {
        var _a, _b;
        // If we have initial results and no query/filters, don't fetch
        if (initialResults &&
            initialResults.length > 0 &&
            !query &&
            (!filters || !((_a = filters.types) === null || _a === void 0 ? void 0 : _a.length))) {
            setResults(initialResults);
            setLoading(false);
            return;
        }
        // Don't fetch if we have no query and no filters
        if (!query && (!filters || !((_b = filters.types) === null || _b === void 0 ? void 0 : _b.length))) {
            setResults([]);
            setLoading(false);
            return;
        }
        const fetchResults = async () => {
            var _a;
            setLoading(true);
            setError(null);
            try {
                // Build query string
                const params = new URLSearchParams();
                if (query) {
                    params.set('q', query);
                }
                if ((_a = filters === null || filters === void 0 ? void 0 : filters.types) === null || _a === void 0 ? void 0 : _a.length) {
                    filters.types.forEach(type => params.append('type', type));
                }
                // Fetch results
                const response = await fetch(`/api/search?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setResults(data.results);
            }
            catch (err) {
                console.error('Search error:', err);
                setError('An error occurred while searching. Please try again.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query, filters, initialResults]);
    if (loading) {
        return (_jsxs("div", { className: `py-8 text-center ${className}`, children: [_jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent" }), _jsx("p", { className: "mt-2 text-gray-500", children: "Loading results..." })] }));
    }
    if (error) {
        return _jsx("div", { className: `py-8 text-center text-red-500 ${className}`, children: error });
    }
    if (results.length === 0) {
        return (_jsxs("div", { className: `py-8 text-center ${className}`, children: [_jsx("p", { className: "text-gray-500", children: "No results found for your search." }), (query || ((filters === null || filters === void 0 ? void 0 : filters.types) && filters.types.length > 0)) && (_jsx("p", { className: "mt-2 text-sm text-gray-400", children: "Try using different keywords or removing filters." }))] }));
    }
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("p", { className: "text-sm text-gray-500", children: ["Found ", results.length, " result", results.length !== 1 ? 's' : ''] }), _jsx("ul", { className: "divide-y divide-gray-100", children: results.map(result => (_jsx("li", { className: "py-4", children: _jsxs("article", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "rounded bg-blue-100 px-2 py-1 text-xs capitalize text-blue-800", children: result.document.type }), _jsx("h3", { className: "text-lg font-medium", children: _jsx(Link, { href: `/scientific/document/sample-${result.document.id.replace(/[^a-zA-Z0-9-]/g, '-')}`, className: "text-blue-600 cursor-pointer underline text-left font-normal", children: result.document.title || 'Untitled Document' }) })] }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: result.document.excerpt }), result.document.metadata.author && (_jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["By ", result.document.metadata.author] })), result.document.metadata.date && (_jsx("p", { className: "mt-1 text-xs text-gray-500", children: new Date(result.document.metadata.date).toLocaleDateString() }))] }) }, result.document.id))) })] }));
}
//# sourceMappingURL=search-results.js.map