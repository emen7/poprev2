import './NotesPanel.css';
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
   * The document or section the note is associated with
   */
  reference?: string;
  /**
   * Tags associated with the note
   */
  tags?: string[];
}
export interface NotesPanelProps {
  /**
   * The document ID the notes are associated with
   */
  documentId?: string;
  /**
   * Initial notes to display
   */
  initialNotes?: Note[];
  /**
   * Whether to persist notes in localStorage
   * @default true
   */
  persistNotes?: boolean;
  /**
   * Function to call when notes are updated
   */
  onNotesChange?: (notes: Note[]) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}
/**
 * NotesPanel Component
 *
 * A panel for displaying and managing user notes.
 */
export declare function NotesPanel({
  documentId,
  initialNotes,
  persistNotes,
  onNotesChange,
  className,
}: NotesPanelProps): import('react/jsx-runtime').JSX.Element;
export default NotesPanel;
//# sourceMappingURL=NotesPanel.d.ts.map
