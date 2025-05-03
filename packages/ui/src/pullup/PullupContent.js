import { jsx as _jsx } from "react/jsx-runtime";
import { NotesTab } from './NotesTab';
import { QuotesTab } from './QuotesTab';
import { SettingsTab } from './SettingsTab';
import './PullupContent.css';
/**
 * PullupContent Component
 *
 * A component that renders the content of the active tab in the pullup panel.
 */
export const PullupContent = ({ activeTab, notes, onNoteUpdate, onNoteDelete, quotes, onQuoteDelete, settings, onSettingsChange, sortOrder = 'entry', onSortOrderChange, className = '', }) => {
    // Determine container classes
    const containerClasses = ['pullup-content', className].filter(Boolean).join(' ');
    // Render the active tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'notes':
                return (_jsx(NotesTab, { notes: notes, onNoteUpdate: onNoteUpdate, onNoteDelete: onNoteDelete, sortOrder: sortOrder, onSortOrderChange: onSortOrderChange }));
            case 'quotes':
                return (_jsx(QuotesTab, { quotes: quotes, onQuoteDelete: onQuoteDelete, sortOrder: sortOrder, onSortOrderChange: onSortOrderChange }));
            case 'settings':
                return _jsx(SettingsTab, { settings: settings, onSettingsChange: onSettingsChange });
            default:
                return null;
        }
    };
    return _jsx("div", { className: containerClasses, children: renderTabContent() });
};
export default PullupContent;
//# sourceMappingURL=PullupContent.js.map