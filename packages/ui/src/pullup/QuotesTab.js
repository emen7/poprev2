import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './QuotesTab.css';
/**
 * QuotesTab Component
 *
 * A tab for displaying and managing quotes in the pullup panel.
 */
export const QuotesTab = ({ quotes, onQuoteDelete, sortOrder = 'entry', onSortOrderChange, className = '', }) => {
    // Handle quote delete
    const handleQuoteDelete = (id) => {
        if (onQuoteDelete) {
            onQuoteDelete(id);
        }
    };
    // Handle sort order change
    const handleSortOrderChange = (e) => {
        const newSortOrder = e.target.value;
        if (onSortOrderChange) {
            onSortOrderChange(newSortOrder);
        }
    };
    // Handle copy to clipboard
    const handleCopyToClipboard = (quote) => {
        // Format the quote with reference
        const formattedQuote = `${quote.reference} "${quote.content}"`;
        // Copy to clipboard
        navigator.clipboard.writeText(formattedQuote).catch(error => {
            console.error('Failed to copy text:', error);
        });
    };
    // Sort quotes based on sort order
    const sortedQuotes = [...quotes].sort((a, b) => {
        if (sortOrder === 'entry') {
            // Sort by creation date (newest first)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        else {
            // Sort by paper reference
            return a.reference.localeCompare(b.reference);
        }
    });
    // Determine container classes
    const containerClasses = ['quotes-tab', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsxs("div", { className: "quotes-tab-header", children: [_jsx("h2", { className: "quotes-tab-title", children: "Quotes" }), _jsxs("div", { className: "quotes-tab-controls", children: [_jsx("label", { htmlFor: "quotes-sort-order", children: "Sort by:" }), _jsxs("select", { id: "quotes-sort-order", value: sortOrder, onChange: handleSortOrderChange, className: "quotes-tab-sort", children: [_jsx("option", { value: "entry", children: "Entry Date" }), _jsx("option", { value: "paper", children: "Paper Reference" })] })] })] }), sortedQuotes.length > 0 ? (_jsx("ul", { className: "quotes-list", children: sortedQuotes.map(quote => (_jsxs("li", { className: "quote-item", children: [_jsxs("div", { className: "quote-header", children: [_jsx("span", { className: "quote-reference", children: quote.reference }), _jsxs("div", { className: "quote-actions", children: [_jsx("button", { className: "quote-copy-button", onClick: () => handleCopyToClipboard(quote), "aria-label": "Copy quote", children: "\uD83D\uDCCB" }), _jsx("button", { className: "quote-delete-button", onClick: () => handleQuoteDelete(quote.id), "aria-label": "Delete quote", children: "\uD83D\uDDD1\uFE0F" })] })] }), _jsxs("div", { className: "quote-content", children: ["\"", quote.content, "\""] }), _jsx("div", { className: "quote-metadata", children: _jsx("span", { className: "quote-date", children: new Date(quote.createdAt).toLocaleDateString() }) })] }, quote.id))) })) : (_jsx("div", { className: "quotes-empty", children: _jsx("p", { children: "No quotes yet. Select text and choose \"quote\" to add quotes." }) }))] }));
};
export default QuotesTab;
//# sourceMappingURL=QuotesTab.js.map