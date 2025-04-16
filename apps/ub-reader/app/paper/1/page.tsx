'use client';

import React, { useState } from 'react';
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
    paragraphNumber: 1,
    content: 'This paragraph introduces the Universal Father as the creator of all things.',
    createdAt: new Date().toISOString(),
  },
];

export default function Paper1Page() {
  // Add console log for debugging
  console.log('Rendering Paper1Page component');

  // Log when component mounts
  React.useEffect(() => {
    console.log('Paper1Page component mounted');
    console.log('Current URL:', window.location.href);
  }, []);

  // State for notes
  const [notes, setNotes] = useState(initialNotes);
  // State for active note
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  // State for settings panel
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // Handle note indicator click
  const handleNoteIndicatorClick = (paragraphNumber: number) => {
    const note = notes.find(n => n.paragraphNumber === paragraphNumber);
    if (note) {
      setActiveNoteId(note.id);
      // TODO: Open pullup panel and navigate to the note
    }
  };

  // Check if a paragraph has a note
  const paragraphHasNote = (paragraphNumber: number) => {
    return notes.some(note => note.paragraphNumber === paragraphNumber);
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
            {/* Debug information */}
            <div className="p-4 mb-6 bg-green-100 border border-green-400 rounded">
              <p className="font-bold">Debug Info:</p>
              <p>This is the static Paper 1 page (app/paper/1/page.tsx)</p>
              <p>
                Current URL:{' '}
                {typeof window !== 'undefined' ? window.location.href : 'Server-side rendering'}
              </p>
            </div>
            {/* Header with Navigation */}
            <ReaderNavigation title={paper1Data.title} onSettingsClick={handleSettingsClick} />

            {/* Main content */}
            <main className="ub-reader-content">
              {paper1Data.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="ub-reader-section"
                  id={sectionIndex === 0 ? 'introduction' : `section-${sectionIndex}`}
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
