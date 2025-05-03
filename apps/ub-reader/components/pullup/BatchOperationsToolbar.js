'use client';
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import './BatchOperationsToolbar.css';
/**
 * BatchOperationsToolbar Component
 *
 * A toolbar for batch operations on selected notes.
 */
export function BatchOperationsToolbar({ selectedNotes, onCopyToClipboard, onDeleteSelected, onSelectAll, onDeselectAll, totalNotes, }) {
    const selectedCount = selectedNotes.length;
    const hasSelection = selectedCount > 0;
    const allSelected = selectedCount === totalNotes && totalNotes > 0;
    return (_jsxs("div", { className: "batch-operations-toolbar", children: [_jsxs("div", { className: "selection-controls", children: [_jsxs("span", { className: "selection-count", children: [selectedCount, " ", selectedCount === 1 ? 'note' : 'notes', " selected"] }), !allSelected && totalNotes > 0 && (_jsx("button", { className: "selection-button select-all-button", onClick: onSelectAll, title: "Select all notes", disabled: totalNotes === 0, children: "Select All" })), hasSelection && (_jsx("button", { className: "selection-button deselect-all-button", onClick: onDeselectAll, title: "Deselect all notes", children: "Deselect All" }))] }), _jsx("div", { className: "batch-actions", children: hasSelection && (_jsxs(_Fragment, { children: [_jsxs("button", { className: "batch-action-button copy-button", onClick: onCopyToClipboard, title: "Copy selected notes to clipboard", children: [_jsx("span", { className: "batch-action-icon", children: "\uD83D\uDCCB" }), _jsx("span", { className: "batch-action-label", children: "Copy" })] }), _jsxs("button", { className: "batch-action-button delete-button", onClick: onDeleteSelected, title: "Delete selected notes", children: [_jsx("span", { className: "batch-action-icon", children: "\uD83D\uDDD1\uFE0F" }), _jsx("span", { className: "batch-action-label", children: "Delete" })] })] })) })] }));
}
export default BatchOperationsToolbar;
//# sourceMappingURL=BatchOperationsToolbar.js.map