import React from 'react';
import { Note } from './NotesTab';
import { PullupTab } from './PullupTabs';
import { Quote } from './QuotesTab';
import { ReaderSettings } from './SettingsTab';
import './Pullup.css';
export interface PullupProps {
    /**
     * Whether the pullup panel is open
     */
    isOpen: boolean;
    /**
     * The currently active tab
     */
    activeTab: PullupTab;
    /**
     * The height of the pullup panel
     */
    height: number;
    /**
     * Whether the pullup panel is in persistent mode (for large screens)
     */
    isPersistent: boolean;
    /**
     * Function called when the pullup panel is closed
     */
    onClose?: () => void;
    /**
     * Function called when a tab is selected
     */
    onTabSelect: (tab: PullupTab) => void;
    /**
     * Function called when the height of the pullup panel changes
     */
    onHeightChange?: (height: number) => void;
    /**
     * Array of notes to display in the notes tab
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
     * Array of quotes to display in the quotes tab
     */
    quotes: Quote[];
    /**
     * Function called when a quote is deleted
     */
    onQuoteDelete?: (id: string) => void;
    /**
     * The current reader settings
     */
    settings: ReaderSettings;
    /**
     * Function called when settings are changed
     */
    onSettingsChange: (settings: Partial<ReaderSettings>) => void;
    /**
     * The sort order for notes and quotes
     */
    sortOrder?: 'entry' | 'paper';
    /**
     * Function called when the sort order is changed
     */
    onSortOrderChange?: (sortOrder: 'entry' | 'paper') => void;
    /**
     * The minimum height of the pullup panel
     * @default 100
     */
    minHeight?: number;
    /**
     * The maximum height of the pullup panel
     * @default 600
     */
    maxHeight?: number;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * Pullup Component
 *
 * A component that combines all pullup components into a single component.
 */
export declare const Pullup: React.FC<PullupProps>;
export default Pullup;
//# sourceMappingURL=Pullup.d.ts.map