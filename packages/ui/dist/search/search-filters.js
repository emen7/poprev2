/**
 * Search Filters Component
 *
 * This component provides filters for search results.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
/**
 * Document type options
 */
const TYPE_OPTIONS = [
    { value: 'scientific', label: 'Scientific Documents' },
    { value: 'perplexity', label: 'Perplexity Responses' },
    { value: 'lectionary', label: 'Lectionary Content' },
    { value: 'post', label: 'Blog Posts' }
];
/**
 * Search filters component
 *
 * @param props Component props
 * @returns React component
 */
export function SearchFilters({ className = '' }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTypes, setSelectedTypes] = useState([]);
    // Initialize from URL params
    useEffect(() => {
        const types = (searchParams === null || searchParams === void 0 ? void 0 : searchParams.getAll('type')) || [];
        setSelectedTypes(types);
    }, [searchParams]);
    /**
     * Update filters in URL
     *
     * @param types Selected document types
     */
    const updateFilters = (types) => {
        const params = new URLSearchParams((searchParams === null || searchParams === void 0 ? void 0 : searchParams.toString()) || '');
        // Remove existing type params
        params.delete('type');
        // Add selected types
        types.forEach(type => {
            params.append('type', type);
        });
        // Preserve search query
        const query = params.get('q');
        if (!query) {
            params.delete('q');
        }
        // Navigate to search page with updated filters
        router.push(`/search?${params.toString()}`);
    };
    /**
     * Toggle document type filter
     *
     * @param type Document type
     */
    const toggleType = (type) => {
        const newTypes = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(newTypes);
        updateFilters(newTypes);
    };
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [_jsx("h3", { className: "text-sm font-medium", children: "Document Types" }), _jsx("div", { className: "space-y-2", children: TYPE_OPTIONS.map(option => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300", checked: selectedTypes.includes(option.value), onChange: () => toggleType(option.value) }), _jsx("span", { className: "ml-2 text-sm", children: option.label })] }, option.value))) })] }));
}
//# sourceMappingURL=search-filters.js.map