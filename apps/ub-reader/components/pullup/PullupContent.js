'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { NotesTab } from './NotesTab';
import { QuotesTab } from './QuotesTab';
import { SettingsTab } from './SettingsTab';
import { usePullup } from '../../contexts/PullupContext';
import './PullupContent.css';
/**
 * PullupContent Component
 *
 * A component that renders the content of the active tab in the pullup panel.
 * Uses PullupContext for state management instead of props.
 */
export function PullupContent({ className = '' }) {
    const { activeTab, notes, handleNoteUpdate, handleNoteDelete, quotes, handleQuoteDelete, settings, updateSettings, sortOrder, setSortOrder, handleNoteAdd, justAddedNoteId, handleEditStarted, } = usePullup();
    // Determine container classes
    const containerClasses = ['pullup-content', className].filter(Boolean).join(' ');
    // Render the active tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'notes':
                return (_jsx(NotesTab, { notes: notes, onNoteUpdate: handleNoteUpdate, onNoteDelete: handleNoteDelete, sortOrder: sortOrder, onSortOrderChange: setSortOrder, onNoteAdd: handleNoteAdd, justAddedNoteId: justAddedNoteId, onEditStarted: handleEditStarted }));
            case 'quotes':
                return (_jsx(QuotesTab, { quotes: quotes, onQuoteDelete: handleQuoteDelete, sortOrder: sortOrder, onSortOrderChange: setSortOrder }));
            case 'settings':
                // Log to identify serialization issues
                console.log('PullupContent rendering SettingsTab');
                console.log('updateSettings is a function:', typeof updateSettings === 'function');
                return _jsx(SettingsTab, { settings: settings });
            default:
                return null;
        }
    };
    return _jsx("div", { className: containerClasses, children: renderTabContent() });
}
export default PullupContent;
//# sourceMappingURL=PullupContent.js.map