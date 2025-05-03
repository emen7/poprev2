'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../../services/HistoryService';
/**
 * History Page
 *
 * This page displays the user's reading history.
 */
export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Load history from localStorage
        const historyData = getHistory();
        setHistory(historyData);
        setLoading(false);
    }, []);
    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear your reading history?')) {
            clearHistory();
            setHistory([]);
        }
    };
    // Format date for display
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    if (loading) {
        return (_jsx("div", { className: "container mx-auto p-8", children: _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" }) }) }));
    }
    return (_jsxs("div", { className: "container mx-auto p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Reading History" }), _jsxs("div", { className: "mb-8 flex justify-between items-center", children: [_jsx(Link, { href: "/", className: "text-blue-600 hover:underline inline-block", children: "\u2190 Back to Home" }), history.length > 0 && (_jsx("button", { onClick: handleClearHistory, className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Clear History" }))] }), history.length === 0 ? (_jsx("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "You haven't read any papers yet. Your reading history will appear here." }) })) : (_jsx("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-300 dark:border-gray-700", children: [_jsx("th", { className: "text-left py-2 w-16", children: "Paper" }), _jsx("th", { className: "text-left py-2", children: "Title" }), _jsx("th", { className: "text-left py-2", children: "Last Read" })] }) }), _jsx("tbody", { children: history.map((entry, index) => (_jsxs("tr", { className: "border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750", children: [_jsx("td", { className: "py-2 text-gray-600 dark:text-gray-400", children: entry.paperId === 0 ? 'FW' : entry.paperId }), _jsx("td", { className: "py-2", children: _jsx(Link, { href: `/traditional-reader/${entry.paperId}`, className: "text-blue-600 hover:underline", children: entry.title }) }), _jsx("td", { className: "py-2 text-gray-600 dark:text-gray-400", children: formatDate(entry.timestamp) })] }, index))) })] }) }))] }));
}
//# sourceMappingURL=page.js.map