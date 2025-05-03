import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './NotesPanel.css';
/**
 * NotesPanel Component
 *
 * A panel for displaying and managing user notes.
 */
export function NotesPanel({ documentId = 'default', initialNotes = [], persistNotes = true, onNotesChange, className = '', }) {
    // State for notes
    const [notes, setNotes] = useState(() => {
        // Try to load from localStorage if persistNotes is true
        if (persistNotes) {
            try {
                const storedNotes = localStorage.getItem(`notes-${documentId}`);
                if (storedNotes) {
                    return JSON.parse(storedNotes);
                }
            }
            catch (error) {
                console.error('Error loading notes from localStorage:', error);
            }
        }
        // Otherwise use initial notes
        return initialNotes;
    });
    // State for the current note being edited
    const [currentNote, setCurrentNote] = useState(null);
    // State for the new note content
    const [newNoteContent, setNewNoteContent] = useState('');
    // Persist notes to localStorage when they change
    useEffect(() => {
        if (persistNotes) {
            try {
                localStorage.setItem(`notes-${documentId}`, JSON.stringify(notes));
            }
            catch (error) {
                console.error('Error saving notes to localStorage:', error);
            }
        }
        // Call onNotesChange if provided
        if (onNotesChange) {
            onNotesChange(notes);
        }
    }, [notes, documentId, persistNotes, onNotesChange]);
    /**
     * Add a new note
     */
    const addNote = () => {
        if (!newNoteContent.trim())
            return;
        const now = new Date().toISOString();
        const newNote = {
            id: `note-${Date.now()}`,
            content: newNoteContent,
            createdAt: now,
            updatedAt: now,
            reference: documentId,
            tags: [],
        };
        setNotes([newNote, ...notes]);
        setNewNoteContent('');
    };
    /**
     * Update an existing note
     */
    const updateNote = (id, content) => {
        const now = new Date().toISOString();
        setNotes(notes.map(note => {
            if (note.id === id) {
                return Object.assign(Object.assign({}, note), { content, updatedAt: now });
            }
            return note;
        }));
        setCurrentNote(null);
    };
    /**
     * Delete a note
     */
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        if ((currentNote === null || currentNote === void 0 ? void 0 : currentNote.id) === id) {
            setCurrentNote(null);
        }
    };
    /**
     * Start editing a note
     */
    const editNote = (note) => {
        setCurrentNote(note);
    };
    /**
     * Cancel editing a note
     */
    const cancelEdit = () => {
        setCurrentNote(null);
    };
    /**
     * Format a date string
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    return (_jsxs("div", { className: `notes-panel ${className}`, children: [_jsxs("div", { className: "notes-input-container", children: [_jsx("textarea", { className: "notes-input", placeholder: "Add a new note...", value: newNoteContent, onChange: e => setNewNoteContent(e.target.value), rows: 3 }), _jsx("button", { className: "notes-add-button", onClick: addNote, children: "Add Note" })] }), _jsx("div", { className: "notes-list", children: notes.length === 0 ? (_jsx("div", { className: "notes-empty-state", children: "No notes yet. Add your first note above." })) : (notes.map(note => (_jsx("div", { className: "note-item", children: (currentNote === null || currentNote === void 0 ? void 0 : currentNote.id) === note.id ? (_jsxs("div", { className: "note-edit-container", children: [_jsx("textarea", { className: "note-edit-input", value: currentNote.content, onChange: e => setCurrentNote(Object.assign(Object.assign({}, currentNote), { content: e.target.value })), rows: 4, autoFocus: true }), _jsxs("div", { className: "note-edit-actions", children: [_jsx("button", { className: "note-save-button", onClick: () => updateNote(note.id, currentNote.content), children: "Save" }), _jsx("button", { className: "note-cancel-button", onClick: cancelEdit, children: "Cancel" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "note-content", children: note.content }), _jsxs("div", { className: "note-meta", children: [_jsx("span", { className: "note-date", children: formatDate(note.updatedAt) }), _jsxs("div", { className: "note-actions", children: [_jsx("button", { className: "note-edit-button", onClick: () => editNote(note), "aria-label": "Edit note", children: "Edit" }), _jsx("button", { className: "note-delete-button", onClick: () => deleteNote(note.id), "aria-label": "Delete note", children: "Delete" })] })] })] })) }, note.id)))) })] }));
}
export default NotesPanel;
//# sourceMappingURL=NotesPanel.js.map