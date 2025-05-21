import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ThemeSettings } from '../../core/settings/ThemeSettings';
import { samplePaper, sampleNotes, sampleQuotes } from './sampleData';

// Import the UBParagraph component
import { UBParagraph } from '../../applications/ub-reader/content/UBParagraph.stories';

/**
 * UB Reader Theme Demo Component
 *
 * This component demonstrates a complete UB Reader page with the new theme system.
 */
const UBReaderThemeDemo = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('content');

  // Get paragraphs from the sample data
  const paragraphs = samplePaper.sections[0].paragraphs.slice(0, 10);

  return (
    <ThemeProvider initialThemeMode="dark" initialTextAlignment="left">
      <div className="ub-reader-container">
        {/* Header */}
        <header className="ub-reader-header">
          <div className="ub-reader-header-left">
            <button className="ub-reader-nav-button">
              <span>☰</span>
            </button>
            <h1 className="ub-reader-title">UB Reader</h1>
          </div>
          <div className="ub-reader-header-right">
            <div className="ub-reader-tabs">
              <button
                className={`ub-reader-tab ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button
                className={`ub-reader-tab ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
              <button
                className={`ub-reader-tab ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
              <button
                className={`ub-reader-tab ${activeTab === 'quotes' ? 'active' : ''}`}
                onClick={() => setActiveTab('quotes')}
              >
                Quotes
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="ub-reader-main">
          {activeTab === 'content' && (
            <div className="ub-reader-content">
              <div className="ub-reader-paper">
                <h2 className="ub-reader-paper-title">{samplePaper.title}</h2>
                <div className="ub-reader-paper-meta">
                  <p className="ub-reader-paper-author">{samplePaper.author}</p>
                  <p className="ub-reader-paper-date">{samplePaper.date}</p>
                </div>

                <h3 className="ub-reader-section-title">
                  {samplePaper.sections[0].number}. {samplePaper.sections[0].title}
                </h3>

                <div className="ub-reader-paragraphs">
                  {paragraphs.map((paragraph, index) => {
                    // Add highlighting to the second paragraph as an example
                    let paragraphText = paragraph.text;
                    if (index === 1) {
                      paragraphText = paragraphText.replace(
                        'This dual nature of reality',
                        '<span class="ub-highlight ub-highlight-keyword">This dual nature of reality</span>'
                      );
                      paragraphText = paragraphText.replace(
                        'material and spiritual aspects',
                        '<span class="ub-highlight ub-highlight-string">material and spiritual aspects</span>'
                      );
                    }

                    // Add highlighting to the fourth paragraph as an example
                    if (index === 3) {
                      paragraphText = paragraphText.replace(
                        'truth is both relative and progressive',
                        '<span class="ub-highlight ub-highlight-function">truth is both relative and progressive</span>'
                      );
                    }

                    return (
                      <UBParagraph
                        key={paragraph.number}
                        paragraph={{
                          ...paragraph,
                          text: paragraphText,
                        }}
                        isTopicChange={paragraph.isTopicChange}
                        showParagraphNumbers={true}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="ub-reader-settings">
              <h2 className="ub-reader-settings-title">Reader Settings</h2>
              <ThemeSettings
                showLabels={true}
                showSystemOption={true}
                alignmentOptions={['left', 'justify', 'right']}
              />

              <div className="ub-reader-settings-section">
                <h3>Font Size</h3>
                <div className="ub-reader-font-size-controls">
                  <button className="ub-reader-font-size-button">A-</button>
                  <span className="ub-reader-font-size-value">Medium</span>
                  <button className="ub-reader-font-size-button">A+</button>
                </div>
              </div>

              <div className="ub-reader-settings-section">
                <h3>Display Options</h3>
                <label className="ub-reader-checkbox">
                  <input type="checkbox" checked />
                  <span>Show paragraph numbers</span>
                </label>
                <label className="ub-reader-checkbox">
                  <input type="checkbox" />
                  <span>Show line numbers</span>
                </label>
                <label className="ub-reader-checkbox">
                  <input type="checkbox" checked />
                  <span>Highlight topic changes</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="ub-reader-notes">
              <h2 className="ub-reader-notes-title">My Notes</h2>
              <div className="ub-reader-notes-list">
                {sampleNotes.map(note => (
                  <div key={note.id} className="ub-reader-note">
                    <div className="ub-reader-note-header">
                      <span className="ub-reader-note-paragraph">
                        Paragraph {note.paragraphNumber}
                      </span>
                      <span className="ub-reader-note-date">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="ub-reader-note-text">{note.text}</p>
                    <div className="ub-reader-note-actions">
                      <button className="ub-reader-note-button">Edit</button>
                      <button className="ub-reader-note-button">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ub-reader-add-note">
                <textarea
                  className="ub-reader-note-textarea"
                  placeholder="Add a new note..."
                  rows={3}
                ></textarea>
                <button className="ub-reader-note-add-button">Add Note</button>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="ub-reader-quotes">
              <h2 className="ub-reader-quotes-title">Saved Quotes</h2>
              <div className="ub-reader-quotes-list">
                {sampleQuotes.map(quote => (
                  <div key={quote.id} className="ub-reader-quote">
                    <div className="ub-reader-quote-header">
                      <span className="ub-reader-quote-paragraph">
                        Paragraph {quote.paragraphNumber}
                      </span>
                      <span className="ub-reader-quote-date">
                        {new Date(quote.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <blockquote className="ub-reader-quote-text">"{quote.text}"</blockquote>
                    <div className="ub-reader-quote-actions">
                      <button className="ub-reader-quote-button">Copy</button>
                      <button className="ub-reader-quote-button">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .ub-reader-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--color-background);
          color: var(--color-text-primary);
          font-family: var(--font-family-base);
        }

        .ub-reader-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          height: var(--header-height);
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
        }

        .ub-reader-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ub-reader-nav-button {
          background: none;
          border: none;
          color: var(--color-text-primary);
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
        }

        .ub-reader-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .ub-reader-tabs {
          display: flex;
          gap: 0.5rem;
        }

        .ub-reader-tab {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: var(--border-radius-md);
          transition: all var(--transition-fast);
        }

        .ub-reader-tab:hover {
          background-color: var(--color-primary-hover);
          color: white;
        }

        .ub-reader-tab.active {
          background-color: var(--color-primary);
          color: white;
        }

        .ub-reader-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .ub-reader-content,
        .ub-reader-settings,
        .ub-reader-notes,
        .ub-reader-quotes {
          max-width: 800px;
          margin: 0 auto;
        }

        .ub-reader-paper-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .ub-reader-paper-meta {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: var(--color-text-secondary);
        }

        .ub-reader-section-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
        }

        .ub-reader-paragraphs {
          position: relative;
          text-align: var(--text-align);
        }

        .ub-reader-settings-title,
        .ub-reader-notes-title,
        .ub-reader-quotes-title {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
        }

        .ub-reader-settings-section {
          margin-top: 2rem;
          padding: 1rem;
          background-color: var(--color-surface);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border);
        }

        .ub-reader-settings-section h3 {
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .ub-reader-font-size-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ub-reader-font-size-button {
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--border-radius-sm);
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .ub-reader-font-size-value {
          flex: 1;
          text-align: center;
        }

        .ub-reader-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }

        .ub-reader-note,
        .ub-reader-quote {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: var(--color-surface);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border);
        }

        .ub-reader-note-header,
        .ub-reader-quote-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .ub-reader-note-text,
        .ub-reader-quote-text {
          margin-bottom: 1rem;
        }

        .ub-reader-note-actions,
        .ub-reader-quote-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .ub-reader-note-button,
        .ub-reader-quote-button {
          background-color: var(--color-surface);
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-sm);
          padding: 0.25rem 0.5rem;
          cursor: pointer;
        }

        .ub-reader-add-note {
          margin-top: 1.5rem;
        }

        .ub-reader-note-textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-sm);
          background-color: var(--color-surface);
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          resize: vertical;
        }

        .ub-reader-note-add-button {
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--border-radius-sm);
          padding: 0.5rem 1rem;
          cursor: pointer;
        }

        /* VS Code-inspired syntax highlighting */
        .ub-highlight {
          border-radius: 2px;
          padding: 0 2px;
        }

        .ub-highlight-keyword {
          color: var(--color-syntax-keyword-dark);
          background-color: rgba(86, 156, 214, 0.1);
        }

        .ub-highlight-string {
          color: var(--color-syntax-string-dark);
          background-color: rgba(206, 145, 120, 0.1);
        }

        .ub-highlight-comment {
          color: var(--color-syntax-comment-dark);
          background-color: rgba(106, 153, 85, 0.1);
        }

        .ub-highlight-function {
          color: var(--color-syntax-function-dark);
          background-color: rgba(220, 220, 170, 0.1);
        }

        .ub-highlight-variable {
          color: var(--color-syntax-variable-dark);
          background-color: rgba(156, 220, 254, 0.1);
        }

        .ub-highlight-type {
          color: var(--color-syntax-type-dark);
          background-color: rgba(78, 201, 176, 0.1);
        }

        /* Light theme overrides for highlighting */
        .light-theme .ub-highlight-keyword {
          color: #0000ff;
          background-color: rgba(0, 0, 255, 0.05);
        }

        .light-theme .ub-highlight-string {
          color: #a31515;
          background-color: rgba(163, 21, 21, 0.05);
        }

        .light-theme .ub-highlight-function {
          color: #795e26;
          background-color: rgba(121, 94, 38, 0.05);
        }

        @media (max-width: 768px) {
          .ub-reader-main {
            padding: 1rem;
          }

          .ub-reader-paper-title {
            font-size: 1.5rem;
          }

          .ub-reader-tabs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.25rem;
          }

          .ub-reader-tab {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </ThemeProvider>
  );
};

const meta: Meta<typeof UBReaderThemeDemo> = {
  title: 'Examples/UBReader/ThemeDemo',
  component: UBReaderThemeDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete UB Reader demo page showcasing the new theme system with dark mode default and responsive typography.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UBReaderThemeDemo>;

export const Default: Story = {};
