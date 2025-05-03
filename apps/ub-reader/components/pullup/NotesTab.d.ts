import { Note } from './types';
import './NotesTab.css';
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
    /**
     * Function called when a new note should be added, passing the new note's ID
     */
    onNoteAdd?: (newNoteId: string) => void;
    /**
     * ID of a note that was just added and should be edited immediately
     */
    justAddedNoteId?: string | null;
    /**
     * Callback to notify parent that editing has started for the just added note
     */
    onEditStarted?: () => void;
}
/**
 * NotesTab Component
 *
 * A tab for displaying and managing notes.
 */
export declare function NotesTab({ notes, onNoteUpdate, onNoteDelete, sortOrder, onSortOrderChange, className, onNoteAdd, justAddedNoteId, // Destructure new props
onEditStarted, }: NotesTabProps): import("react/jsx-runtime").JSX.Element;
export default NotesTab;
//# sourceMappingURL=NotesTab.d.ts.map