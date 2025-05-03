'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { BatchOperationsToolbar } from './BatchOperationsToolbar';
import './NotesTab.css';
/**
 * NotesTab Component
 *
 * A tab for displaying and managing notes.
 */
export function NotesTab({ notes, onNoteUpdate, onNoteDelete, sortOrder = 'entry', onSortOrderChange, className = '', onNoteAdd, justAddedNoteId, // Destructure new props
onEditStarted, }) {
    // State for tracking which note is being edited
    const [editingNoteId, setEditingNoteId] = useState(null);
    // State for tracking the content of the note being edited
    const [editingContent, setEditingContent] = useState('');
    // State for tracking selected notes
    const [selectedNotes, setSelectedNotes] = useState([]);
    // Reset selection when notes change
    useEffect(() => {
        setSelectedNotes([]);
    }, [notes]);
    // Effect to automatically enter edit mode for a newly added note
    useEffect(() => {
        if (justAddedNoteId && notes.some(note => note.id === justAddedNoteId)) {
            const newNote = notes.find(note => note.id === justAddedNoteId);
            if (newNote) {
                setEditingNoteId(newNote.id);
                setEditingContent(newNote.content); // Start with empty content
                if (onEditStarted) {
                    onEditStarted(); // Notify parent to reset justAddedNoteId
                }
            }
        }
    }, [justAddedNoteId, notes, onEditStarted]);
    // Handle edit button click
    const handleEditClick = (note) => {
        setEditingNoteId(note.id);
        setEditingContent(note.content);
    };
    // Handle save button click
    const handleSaveClick = (id) => {
        if (onNoteUpdate) {
            onNoteUpdate(id, editingContent);
        }
        setEditingNoteId(null);
    };
    // Handle cancel button click
    const handleCancelClick = () => {
        setEditingNoteId(null);
    };
    // Handle delete button click
    const handleDeleteClick = (id) => {
        if (onNoteDelete) {
            onNoteDelete(id);
        }
    };
    // Handle note selection
    const handleNoteSelect = (note, isSelected) => {
        if (isSelected) {
            setSelectedNotes([...selectedNotes, note]);
        }
        else {
            setSelectedNotes(selectedNotes.filter(n => n.id !== note.id));
        }
    };
    // Handle select all
    const handleSelectAll = () => {
        setSelectedNotes([...notes]);
    };
    // Handle deselect all
    const handleDeselectAll = () => {
        setSelectedNotes([]);
    };
    // Handle copy to clipboard
    const handleCopyToClipboard = useCallback(async () => {
        if (selectedNotes.length === 0)
            return;
        try {
            // Format notes for clipboard
            const formattedNotes = selectedNotes
                .map(note => {
                const text = note.selectedText ? `"${note.selectedText}"` : '';
                return `${text}\n${note.content}\n${note.reference}\n`;
            })
                .join('\n---\n\n');
            await navigator.clipboard.writeText(formattedNotes);
            // Show success message
            alert('Notes copied to clipboard');
        }
        catch (error) {
            console.error('Failed to copy notes to clipboard:', error);
            alert('Failed to copy notes to clipboard');
        }
    }, [selectedNotes]);
    // Handle delete selected
    const handleDeleteSelected = useCallback(() => {
        if (selectedNotes.length === 0)
            return;
        // Confirm deletion
        if (window.confirm(`Are you sure you want to delete ${selectedNotes.length} note(s)?`)) {
            // Delete each selected note
            selectedNotes.forEach(note => {
                if (onNoteDelete) {
                    onNoteDelete(note.id);
                }
            });
            // Clear selection
            setSelectedNotes([]);
        }
    }, [selectedNotes, onNoteDelete]);
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
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        else {
            // Sort by paper reference
            return a.reference.localeCompare(b.reference);
        }
    });
    // Handle add new note button click
    const handleAddNewNote = () => {
        if (onNoteAdd) {
            // We expect the parent to call onNoteAdd and provide the new ID
            // For now, we just call it. The parent needs to handle this
            // A better approach might be needed here.
            onNoteAdd('temp-new-id'); // Placeholder call, parent needs to handle this
            // Ideally, the parent calls back with the real ID to set editingNoteId
        }
    };
    // Determine container classes
    const containerClasses = ['notes-tab', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: containerClasses, children: [_jsxs("div", { className: "notes-tab-header", children: [_jsx("h3", { className: "notes-tab-title", children: "Notes" }), _jsx("button", { className: "add-note-button", onClick: handleAddNewNote, children: "+ Add Note" }), _jsxs("div", { className: "notes-tab-sort", children: [_jsx("label", { htmlFor: "notes-sort", children: "Sort by:" }), _jsxs("select", { id: "notes-sort", value: sortOrder, onChange: handleSortOrderChange, className: "notes-tab-sort-select", children: [_jsx("option", { value: "entry", children: "Date Added" }), _jsx("option", { value: "paper", children: "Paper Reference" })] })] })] }), notes.length > 0 && (_jsx(BatchOperationsToolbar, { selectedNotes: selectedNotes, onCopyToClipboard: handleCopyToClipboard, onDeleteSelected: handleDeleteSelected, onSelectAll: handleSelectAll, onDeselectAll: handleDeselectAll, totalNotes: notes.length })), sortedNotes.length === 0 ? (_jsx("div", { className: "notes-tab-empty", children: _jsx("p", { children: "No notes yet. Select text in the document and choose \"Add Note\" to create one." }) })) : (_jsx("div", { className: "notes-list", children: sortedNotes.map(note => (_jsxs("div", { className: "note-item", children: [_jsxs("div", { className: "note-header", children: [_jsx("div", { className: "note-selection", children: _jsx("input", { type: "checkbox", checked: selectedNotes.some(n => n.id === note.id), onChange: e => handleNoteSelect(note, e.target.checked), className: "note-checkbox", "aria-label": `Select note ${note.reference}` }) }), _jsx("div", { className: "note-reference", children: note.reference }), _jsx("div", { className: "note-actions", children: editingNoteId === note.id ? (_jsxs(_Fragment, { children: [_jsx("button", { className: "note-action-button note-save-button", onClick: () => handleSaveClick(note.id), title: "Save", children: "Save" }), _jsx("button", { className: "note-action-button note-cancel-button", onClick: handleCancelClick, title: "Cancel", children: "Cancel" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { className: "note-action-button note-edit-button", onClick: () => handleEditClick(note), title: "Edit", children: "Edit" }), _jsx("button", { className: "note-action-button note-delete-button", onClick: () => handleDeleteClick(note.id), title: "Delete", children: "Delete" })] })) })] }), note.selectedText && _jsxs("div", { className: "note-selected-text", children: ["\"", note.selectedText, "\""] }), editingNoteId === note.id ? (_jsx("textarea", { className: "note-edit-textarea", value: editingContent, onChange: e => setEditingContent(e.target.value), autoFocus: true })) : (_jsx("div", { className: "note-content", children: note.content })), _jsxs("div", { className: "note-date", children: [new Date(note.updatedAt).toLocaleDateString(), ' ', new Date(note.updatedAt).toLocaleTimeString()] })] }, note.id))) }))] }));
}
export default NotesTab;
//# sourceMappingURL=NotesTab.js.map