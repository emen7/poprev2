'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './QuotesTab.css';
/**
 * QuotesTab Component
 *
 * A tab for displaying and managing quotes.
 */
export function QuotesTab({ quotes, onQuoteDelete, sortOrder = 'entry', onSortOrderChange, className = '', }) {
    // Handle delete button click
    const handleDeleteClick = (id) => {
        if (onQuoteDelete) {
            onQuoteDelete(id);
        }
    };
    // Handle copy button click
    const handleCopyClick = (content) => {
        navigator.clipboard
            .writeText(content)
            .then(() => {
            // Show toast or notification
            const toast = document.querySelector('.toast');
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2000);
            }
        })
            .catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
    // Handle sort order change
    const handleSortOrderChange = (e) => {
        const newSortOrder = e.target.value;
        if (onSortOrderChange) {
            onSortOrderChange(newSortOrder);
        }
    };
    // Sort quotes based on sort order
    const sortedQuotes = [...quotes].sort((a, b) => {
        if (sortOrder === 'entry') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        else {
            // Sort by paper reference
            return a.reference.localeCompare(b.reference);
        }
    });
    // Determine container classes
    const containerClasses = ['quotes-tab', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsxs("div", { className: "quotes-tab-header", children: [_jsx("h3", { className: "quotes-tab-title", children: "Quotes" }), _jsxs("div", { className: "quotes-tab-sort", children: [_jsx("label", { htmlFor: "quotes-sort", children: "Sort by:" }), _jsxs("select", { id: "quotes-sort", value: sortOrder, onChange: handleSortOrderChange, className: "quotes-tab-sort-select", children: [_jsx("option", { value: "entry", children: "Date Added" }), _jsx("option", { value: "paper", children: "Paper Reference" })] })] })] }), sortedQuotes.length === 0 ? (_jsx("div", { className: "quotes-tab-empty", children: _jsx("p", { children: "No quotes yet. Select text in the document and choose \"Save Quote\" to create one." }) })) : (_jsx("div", { className: "quotes-list", children: sortedQuotes.map(quote => (_jsxs("div", { className: "quote-item", children: [_jsxs("div", { className: "quote-header", children: [_jsx("div", { className: "quote-reference", children: quote.reference }), _jsxs("div", { className: "quote-actions", children: [_jsx("button", { className: "quote-action-button quote-copy-button", onClick: () => handleCopyClick(quote.content), title: "Copy", children: "Copy" }), _jsx("button", { className: "quote-action-button quote-delete-button", onClick: () => handleDeleteClick(quote.id), title: "Delete", children: "Delete" })] })] }), _jsxs("div", { className: "quote-content", children: ["\"", quote.content, "\""] }), _jsxs("div", { className: "quote-date", children: [new Date(quote.createdAt).toLocaleDateString(), ' ', new Date(quote.createdAt).toLocaleTimeString()] })] }, quote.id))) })), _jsx("div", { className: "toast", children: "Quote copied to clipboard!" })] }));
}
export default QuotesTab;
//# sourceMappingURL=QuotesTab.js.map