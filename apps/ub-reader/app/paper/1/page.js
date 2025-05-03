'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { EnhancedHighlightProvider } from '../../../components/EnhancedHighlightProvider';
import { EnhancedPullupContainer } from '../../../components/EnhancedPullupContainer';
import { UBEnhancedParagraph } from '../../../components/UBEnhancedParagraph';
import { ReaderNavigation } from '../../../components/ReaderNavigation';
import { ExtendedUserPreferencesProvider } from '../../../contexts/ExtendedUserPreferencesContext';
import { paper1Data } from './data';
// Sample notes data
const initialNotes = [
    {
        id: 'note-1',
        paragraphId: '1',
        content: 'This paragraph introduces the Universal Father as the creator of all things.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reference: '1:1',
        selectedText: '',
        isSelected: false,
    },
];
export default function Paper1Page() {
    // State for notes
    const [notes, setNotes] = useState(initialNotes);
    // State for active note
    const [activeNoteId, setActiveNoteId] = useState(null);
    // State for settings panel
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    // Handle note indicator click
    const handleNoteIndicatorClick = (paragraphId) => {
        const note = notes.find(n => n.paragraphId === paragraphId);
        if (note) {
            setActiveNoteId(note.id);
            // TODO: Open pullup panel and navigate to the note
        }
    };
    // Check if a paragraph has a note
    const paragraphHasNote = (paragraphNumber) => {
        return notes.some(note => note.paragraphId === paragraphNumber.toString());
    };
    // Handle settings click
    const handleSettingsClick = () => {
        setIsSettingsPanelOpen(!isSettingsPanelOpen);
    };
    return (_jsx(ThemeProvider, { children: _jsx(ExtendedUserPreferencesProvider, { children: _jsxs(EnhancedHighlightProvider, { children: [_jsxs("div", { className: "ub-reader-demo", children: [_jsx(ReaderNavigation, { title: paper1Data.title, onSettingsClick: handleSettingsClick }), _jsx("main", { className: "ub-reader-content", children: paper1Data.sections.map((section, sectionIndex) => (_jsxs("div", { className: "ub-reader-section", id: sectionIndex === 0 ? 'introduction' : `section-${sectionIndex}`, children: [_jsx("h2", { className: "ub-reader-section-title", children: section.title }), _jsx("div", { className: "ub-reader-paragraphs", children: section.paragraphs.map(paragraph => {
                                                var _a;
                                                return (_jsx(UBEnhancedParagraph, { paragraph: paragraph, isTopicChange: paragraph.number === ((_a = section.paragraphs[0]) === null || _a === void 0 ? void 0 : _a.number) && sectionIndex > 0, currentPaper: 1, hasNote: paragraphHasNote(paragraph.number), onNoteIndicatorClick: handleNoteIndicatorClick }, paragraph.number));
                                            }) })] }, sectionIndex))) }), _jsx(EnhancedPullupContainer, {})] }), _jsx("style", { jsx: true, children: `
            .ub-reader-demo {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              background-color: var(--background-color, #fff);
              color: var(--text-color, #333);
            }

            .ub-reader-content {
              padding: 1rem;
              flex-grow: 1;
              max-width: 800px;
              margin: 0 auto;
              width: 100%;
            }

            .ub-reader-section {
              margin-bottom: 2rem;
              scroll-margin-top: 5rem;
            }

            .ub-reader-section-title {
              font-size: 1.5rem;
              margin-bottom: 1rem;
              color: var(--heading-color, #222);
            }

            .ub-reader-paragraphs {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            /* Dark mode styles */
            :global(.dark-theme) .ub-reader-demo {
              background-color: var(--background-color-dark, #121212);
              color: var(--text-color-dark, #eee);
            }

            :global(.dark-theme) .ub-reader-section-title {
              color: var(--heading-color-dark, #ddd);
            }
          ` })] }) }) }));
}
//# sourceMappingURL=page.js.map