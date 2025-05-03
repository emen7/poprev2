'use client';

import React, { useState } from &apos;react';

import { EnhancedHighlightProvider } from '../../../components/EnhancedHighlightProvider';
import { EnhancedPullupContainer } from '../../../components/EnhancedPullupContainer';
import type { Note } from '../../../components/pullup/types';
import { ReaderNavigation } from '../../../components/ReaderNavigation';
import { UBEnhancedParagraph } from '../../../components/UBEnhancedParagraph';
import { ExtendedUserPreferencesProvider } from '../../../contexts/ExtendedUserPreferencesContext';
import { ThemeProvider } from '../../../contexts/ThemeContext';

import { paper1Data } from './data';

// Sample notes data
const initialNotes: Note[] = [
  {
    id: &apos;note-1',
    paragraphId: &apos;1',
    content: &apos;This paragraph introduces the Universal Father as the creator of all things.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reference: &apos;1:1',
    selectedText: '',
    isSelected: false,
  },
];

export default function Paper1Page() {
  // State for notes
  const [notes, setNotes] = useState(initialNotes);
  // State for active note
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  // State for settings panel
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // Handle note indicator click
  const handleNoteIndicatorClick = (paragraphId: string) => {
    const note = notes.find(n => n.paragraphId === paragraphId);
    if (note) {
      setActiveNoteId(note.id);
      // TODO: Open pullup panel and navigate to the note
    }
  };

  // Check if a paragraph has a note
  const paragraphHasNote = (paragraphNumber: number) => {
    return notes.some(note => note.paragraphId === paragraphNumber.toString());
  };

  // Handle settings click
  const handleSettingsClick = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  return (
    <ThemeProvider>
      <ExtendedUserPreferencesProvider>
        <EnhancedHighlightProvider>
          <div className="ub-reader-demo">
            {/* Header with Navigation */}
            <ReaderNavigation title={paper1Data.title} onSettingsClick={handleSettingsClick} />

            {/* Main content */}
            <main className="ub-reader-content">
              {paper1Data.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="ub-reader-section"
                  id={sectionIndex === 0 ? &apos;introduction' : `section-${sectionIndex}`}
                >
                  <h2 className="ub-reader-section-title">{section.title}</h2>
                  <div className="ub-reader-paragraphs">
                    {section.paragraphs.map(paragraph => (
                      <UBEnhancedParagraph
                        key={paragraph.number}
                        paragraph={paragraph}
                        isTopicChange={
                          paragraph.number === section.paragraphs[0]?.number && sectionIndex > 0
                        }
                        currentPaper={1}
                        hasNote={paragraphHasNote(paragraph.number)}
                        onNoteIndicatorClick={handleNoteIndicatorClick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </main>

            {/* Enhanced Pullup container */}
            <EnhancedPullupContainer />
          </div>

          {/* Styles */}
          <style jsx>{`
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
          `}</style>
        </EnhancedHighlightProvider>
      </ExtendedUserPreferencesProvider>
    </ThemeProvider>
  );
}
