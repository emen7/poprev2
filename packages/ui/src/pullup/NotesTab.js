import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './NotesTab.css';
/**
 * NotesTab Component
 *
 * A tab for displaying and managing notes in the pullup panel.
 */
export const NotesTab = ({ notes, onNoteUpdate, onNoteDelete, sortOrder = 'entry', onSortOrderChange, className = '', }) => {
    // State for the note being edited
    const [editingNoteId, setEditingNoteId] = useState(null);
    // Handle note edit
    const handleNoteEdit = (id) => {
        setEditingNoteId(id);
    };
    // Handle note save
    const handleNoteSave = (id, content) => {
        if (onNoteUpdate) {
            onNoteUpdate(id, content);
        }
        setEditingNoteId(null);
    };
    // Handle note delete
    const handleNoteDelete = (id) => {
        if (onNoteDelete) {
            onNoteDelete(id);
        }
    };
    // Handle sort order change
    const handleSortOrderChange = (e) => {
        const newSortOrder = e.target.value;
        if (onSortOrderChange) {
            onSortOrderChange(newSortOrder);
        }
    };
    // Sort notes based on sort order
    const sortedNotes = [...notes].sort((a, b) => {
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
    const containerClasses = ['notes-tab', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsxs("div", { className: "notes-tab-header", children: [_jsx("h2", { className: "notes-tab-title", children: "Notes" }), _jsxs("div", { className: "notes-tab-controls", children: [_jsx("label", { htmlFor: "sort-order", children: "Sort by:" }), _jsxs("select", { id: "sort-order", value: sortOrder, onChange: handleSortOrderChange, className: "notes-tab-sort", children: [_jsx("option", { value: "entry", children: "Entry Date" }), _jsx("option", { value: "paper", children: "Paper Reference" })] })] })] }), sortedNotes.length > 0 ? (_jsx("ul", { className: "notes-list", children: sortedNotes.map(note => (_jsxs("li", { className: "note-item", children: [_jsxs("div", { className: "note-header", children: [_jsx("span", { className: "note-reference", children: note.reference }), _jsxs("div", { className: "note-actions", children: [_jsx("button", { className: "note-edit-button", onClick: () => handleNoteEdit(note.id), "aria-label": "Edit note", children: "\u270F\uFE0F" }), _jsx("button", { className: "note-delete-button", onClick: () => handleNoteDelete(note.id), "aria-label": "Delete note", children: "\uD83D\uDDD1\uFE0F" })] })] }), _jsxs("div", { className: "note-selected-text", children: ["\"", note.selectedText, "\""] }), editingNoteId === note.id ? (_jsxs("div", { className: "note-editor", children: [_jsx("textarea", { defaultValue: note.content, className: "note-textarea", autoFocus: true, onBlur: e => handleNoteSave(note.id, e.target.value) }), _jsxs("div", { className: "note-editor-actions", children: [_jsx("button", { className: "note-save-button", onClick: e => {
                                                var _a;
                                                const textarea = (_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
                                                if (textarea) {
                                                    handleNoteSave(note.id, textarea.value);
                                                }
                                            }, children: "Save" }), _jsx("button", { className: "note-cancel-button", onClick: () => setEditingNoteId(null), children: "Cancel" })] })] })) : (_jsx("div", { className: "note-content", children: note.content || _jsx("em", { children: "No note content. Click edit to add a note." }) })), _jsx("div", { className: "note-metadata", children: _jsx("span", { className: "note-date", children: new Date(note.updatedAt).toLocaleDateString() }) })] }, note.id))) })) : (_jsx("div", { className: "notes-empty", children: _jsx("p", { children: "No notes yet. Select text and choose \"note\" to add notes." }) }))] }));
};
export default NotesTab;
//# sourceMappingURL=NotesTab.js.map