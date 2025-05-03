import React from 'react';
import { HighlightColor } from './HighlightColorPicker';
import './SelectionMenu.css';
export interface SelectionMenuProps {
    /**
     * Position of the selection menu
     */
    position: {
        top: number;
        left: number;
    };
    /**
     * Selected text
     */
    selectedText: string;
    /**
     * Function called when the copy action is selected
     */
    onCopy?: () => void;
    /**
     * Function called when the note action is selected
     */
    onNote?: () => void;
    /**
     * Function called when the quote action is selected
     */
    onQuote?: () => void;
    /**
     * Function called when the highlight action is selected
     */
    onHighlight?: (color: HighlightColor) => void;
    /**
     * Whether the component is in dark mode
     */
    darkMode?: boolean;
    /**
     * Function called when the menu is closed
     */
    onClose?: () => void;
}
/**
 * SelectionMenu Component
 *
 * A component that displays a menu for text selection with options for highlighting, copying, adding notes, and saving quotes.
 */
export declare const SelectionMenu: React.FC<SelectionMenuProps>;
export default SelectionMenu;
//# sourceMappingURL=SelectionMenu.d.ts.map