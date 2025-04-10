import React, { useRef, useState, useEffect } from 'react';
import { SelectionMenu, useSelectionMenu, HighlightColor } from '../selection';
import './HighlightExample.css';

/**
 * Example component demonstrating the text highlighting feature
 */
export const HighlightExample: React.FC = () => {
  // Ref for the content container
  const contentRef = useRef<HTMLDivElement>(null);

  // State for dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // State for copy message
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  // Use selection menu hook
  const {
    isMenuVisible,
    menuPosition,
    selectedText,
    hideMenu,
    copySelectedText,
    highlightSelectedText,
  } = useSelectionMenu({
    targetElement: contentRef.current,
    minSelectionLength: 3,
    darkMode,
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
    // In a real app, this would add a note
    alert(`Note added for: "${selectedText}"`);
    hideMenu();
  };

  // Handle quote action
  const handleQuote = () => {
    // In a real app, this would save a quote
    alert(`Quote saved: "${selectedText}"`);
    hideMenu();
  };

  // Handle highlight action
  const handleHighlight = (color: HighlightColor) => {
    highlightSelectedText(color);
    hideMenu();
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, [darkMode]);

  return (
    <div className={`highlight-example ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Highlight Example</h1>
      <p className="example-description">
        Select text in the content below to see the selection menu. You can highlight text in
        different colors, copy the text, add a note, or save a quote.
      </p>

      <div className="example-controls">
        <label className="dark-mode-toggle">
          <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
          Dark Mode
        </label>
      </div>

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

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              <li>Select text in the content area</li>
              <li>Click the highlight icon (🖌️) in the menu</li>
              <li>Choose a color from the color picker</li>
              <li>Click the checkmark to apply the highlight</li>
            </ol>
            <p>
              In dark mode, highlighting changes the text color to match the selected color. In
              light mode, it adds a background highlight.
            </p>
            <p>
              The default text selection color in dark mode is set to match Perplexity AI's
              selection color.
            </p>
          </div>
        </div>
      </div>

      {isMenuVisible && (
        <SelectionMenu
          position={menuPosition}
          selectedText={selectedText}
          onCopy={handleCopy}
          onNote={handleNote}
          onQuote={handleQuote}
          onHighlight={handleHighlight}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default HighlightExample;
