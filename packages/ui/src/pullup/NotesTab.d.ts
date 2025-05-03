import React from 'react';
import './NotesTab.css';
export interface Note {
    /**
     * Unique identifier for the note
     */
    id: string;
    /**
     * The content of the note
     */
    content: string;
    /**
     * The timestamp when the note was created
     */
    createdAt: string;
    /**
     * The timestamp when the note was last updated
     */
    updatedAt: string;
    /**
     * The ID of the paragraph the note is associated with
     */
    paragraphId: string;
    /**
     * The reference information (Paper:Section.Paragraph)
     */
    reference: string;
    /**
     * The selected text that the note is associated with
     */
    selectedText: string;
    /**
     * Tags associated with the note
     */
    tags?: string[];
}
export interface NotesTabProps {
    /**
     * Array of notes to display
     */
    notes: Note[];
    /**
     * Function called when a note is updated
     */
    onNoteUpdate?: (id: string, content: string) => void;
    /**
     * Function called when a note is deleted
     */
    onNoteDelete?: (id: string) => void;
    /**
     * The sort order for notes
     */
    sortOrder?: 'entry' | 'paper';
    /**
     * Function called when the sort order is changed
     */
    onSortOrderChange?: (sortOrder: 'entry' | 'paper') => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * NotesTab Component
 *
 * A tab for displaying and managing notes in the pullup panel.
 */
export declare const NotesTab: React.FC<NotesTabProps>;
export default NotesTab;
//# sourceMappingURL=NotesTab.d.ts.map