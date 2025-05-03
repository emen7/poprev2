import { Note } from './types';
import './BatchOperationsToolbar.css';
export interface BatchOperationsToolbarProps {
    /**
     * Selected notes
     */
    selectedNotes: Note[];
    /**
     * Function called when the copy to clipboard button is clicked
     */
    onCopyToClipboard: () => void;
    /**
     * Function called when the delete selected button is clicked
     */
    onDeleteSelected: () => void;
    /**
     * Function called when the select all button is clicked
     */
    onSelectAll: () => void;
    /**
     * Function called when the deselect all button is clicked
     */
    onDeselectAll: () => void;
    /**
     * The total number of notes
     */
    totalNotes: number;
}
/**
 * BatchOperationsToolbar Component
 *
 * A toolbar for batch operations on selected notes.
 */
export declare function BatchOperationsToolbar({ selectedNotes, onCopyToClipboard, onDeleteSelected, onSelectAll, onDeselectAll, totalNotes, }: BatchOperationsToolbarProps): import("react/jsx-runtime").JSX.Element;
export default BatchOperationsToolbar;
//# sourceMappingURL=BatchOperationsToolbar.d.ts.map