import React, { useRef, useState } from 'react';
import { SelectionMenu, useSelectionMenu } from '../selection';
import './SelectionMenuExample.css';

/**
 * Example component demonstrating the selection menu
 */
export const SelectionMenuExample: React.FC = () => {
  // Ref for the content container
  const contentRef = useRef<HTMLDivElement>(null);

  // State for notes
  const [notes, setNotes] = useState<{ text: string; selection: string }[]>([]);

  // State for quotes
  const [quotes, setQuotes] = useState<string[]>([]);

  // State for copy message
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  // Use selection menu hook
  const { isMenuVisible, menuPosition, selectedText, hideMenu, copySelectedText } =
    useSelectionMenu({
      targetElement: contentRef.current,
      minSelectionLength: 3,
    });

  // Handle copy action
  const handleCopy = () => {
    copySelectedText();
    setCopyMessage(
      `Copied: "${selectedText.substring(0, 30)}${selectedText.length > 30 ? '...' : ''}"`
    );
    setTimeout(() => setCopyMessage(null), 3000);
    hideMenu();
  };

  // Handle note action
  const handleNote = () => {
    setNotes([
      ...notes,
      { text: `Note added at ${new Date().toLocaleTimeString()}`, selection: selectedText },
    ]);
    hideMenu();
  };

  // Handle quote action
  const handleQuote = () => {
    setQuotes([...quotes, selectedText]);
    hideMenu();
  };

  return (
    <div className="selection-menu-example">
      <h1>Selection Menu Example</h1>
      <p className="example-description">
        Select text in the content below to see the selection menu. You can copy the text, add a
        note, or save a quote.
      </p>

      <div className="example-container">
        <div className="content-container" ref={contentRef}>
          <h2>The Universal Father</h2>
          <p>
            Of all the names by which God the Father is known throughout the universes, those which
            designate him as the First Source and the Universe Center are most often encountered.
            The First Father is known by various names in different universes and in different
            sectors of the same universe. The names which the creature assigns to the Creator are
            much dependent on the creature's concept of the Creator.
          </p>
          <p>
            The Universal Father never imposes any form of arbitrary recognition, formal worship, or
            slavish service upon the intelligent will creatures of the universes. The evolutionary
            inhabitants of the worlds of time and space must of themselves — in their own hearts —
            recognize, love, and voluntarily worship him.
          </p>
          <p>
            When you have once become truly God-conscious, after you really discover the majestic
            Creator and begin to experience the realization of the indwelling presence of the divine
            controller, then, in accordance with your enlightenment and in accordance with the
            manner and method by which the divine Sons reveal God, you will find a name for the
            Universal Father which will be adequately expressive of your concept of the First Great
            Source and Center.
          </p>
          <p>
            Near the center of the universe of universes, the Universal Father is generally known by
            names which may be regarded as meaning the First Source. Farther out in the universes of
            space, the terms employed to designate the Universal Father more often mean the
            Universal Center.
          </p>
          <p>
            On those worlds where a Paradise Son has lived a bestowal life, God is generally known
            by some name indicative of personal relationship, tender affection, and fatherly
            devotion. On your constellation headquarters God is referred to as the Universal Father,
            and on different planets in your local system of inhabited worlds he is variously known
            as the Father of Fathers, the Paradise Father, the Havona Father, and the Spirit Father.
          </p>
        </div>

        <div className="sidebar">
          {copyMessage && <div className="copy-message">{copyMessage}</div>}

          {notes.length > 0 && (
            <div className="notes-container">
              <h3>Notes</h3>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    <div className="note-text">{note.text}</div>
                    <div className="note-selection">"{note.selection}"</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {quotes.length > 0 && (
            <div className="quotes-container">
              <h3>Quotes</h3>
              <ul>
                {quotes.map((quote, index) => (
                  <li key={index}>"{quote}"</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isMenuVisible && (
        <SelectionMenu
          position={menuPosition}
          selectedText={selectedText}
          onCopy={handleCopy}
          onNote={handleNote}
          onQuote={handleQuote}
          onClose={hideMenu}
        />
      )}
    </div>
  );
};

export default SelectionMenuExample;
