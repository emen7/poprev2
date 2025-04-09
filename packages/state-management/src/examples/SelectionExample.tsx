import React from 'react';
import { useSelection } from '../hooks/useSelection';
import { useNotes } from '../hooks/useNotes';
import { usePullup } from '../hooks/usePullup';

/**
 * Example component demonstrating the use of the useSelection hook
 */
export function SelectionExample() {
  const {
    isSelecting,
    selectedText,
    selectedParagraphId,
    selectionPosition,
    selectedOptions,
    hasSelectedOptions,
    toggleOption,
    confirmSelection,
    clearSelection,
  } = useSelection();

  const { addNote, addQuote } = useNotes();
  const { openPullup } = usePullup();

  const handleConfirm = () => {
    // Process the selection based on selected options
    if (selectedOptions.note) {
      addNote({
        content: selectedText,
        paragraphId: selectedParagraphId,
        reference: `Example Reference (${selectedParagraphId})`,
        tags: ['selection'],
      });

      // Open the notes tab
      openPullup('notes');
    }

    if (selectedOptions.quote) {
      addQuote({
        content: selectedText,
        paragraphId: selectedParagraphId,
        reference: `Example Reference (${selectedParagraphId})`,
      });

      // Open the quotes tab if note option is not selected
      if (!selectedOptions.note) {
        openPullup('quotes');
      }
    }

    if (selectedOptions.highlight) {
      // In a real implementation, this would store the highlight
      console.log('Highlight created:', {
        text: selectedText,
        paragraphId: selectedParagraphId,
      });
    }

    // Confirm the selection to reset UI state
    confirmSelection();
  };

  const handleCancel = () => {
    clearSelection();
  };

  return (
    <div className="selection-example">
      <h2>Selection Example</h2>

      <div className="selection-demo">
        <h3>Select text below:</h3>

        <div className="sample-paragraphs">
          <p id="p1" onClick={() => console.log('Paragraph 1 clicked')}>
            This is the first paragraph. Try selecting some text here to see the selection controls.
            The selection system will detect your selection and show options for creating notes,
            quotes, or highlights.
          </p>

          <p id="p2" onClick={() => console.log('Paragraph 2 clicked')}>
            This is the second paragraph. When you select text, the selection position is tracked so
            that controls can be displayed near the selection. This makes it easy for users to
            interact with the selected text.
          </p>

          <p id="p3" onClick={() => console.log('Paragraph 3 clicked')}>
            This is the third paragraph. After selecting text and choosing options, you can confirm
            your selection to create notes, quotes, or highlights. The system will then process your
            selection based on the options you've chosen.
          </p>
        </div>
      </div>

      <div className="selection-state">
        <h3>Current Selection State</h3>
        <ul>
          <li>Is Selecting: {isSelecting ? 'Yes' : 'No'}</li>
          <li>Selected Text: {selectedText || 'None'}</li>
          <li>Selected Paragraph ID: {selectedParagraphId || 'None'}</li>
          <li>
            Selection Position:
            {selectionPosition
              ? `(${selectionPosition.top}px, ${selectionPosition.left}px)`
              : 'None'}
          </li>
          <li>Note Option: {selectedOptions.note ? 'Selected' : 'Not Selected'}</li>
          <li>Quote Option: {selectedOptions.quote ? 'Selected' : 'Not Selected'}</li>
          <li>Highlight Option: {selectedOptions.highlight ? 'Selected' : 'Not Selected'}</li>
        </ul>
      </div>

      {isSelecting && selectedText && (
        <div
          className="selection-controls"
          style={{
            position: 'relative',
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f8f8f8',
          }}
        >
          <h3>Selection Controls</h3>

          <div className="option-toggles">
            <button
              className={selectedOptions.note ? 'active' : ''}
              onClick={() => toggleOption('note')}
            >
              {selectedOptions.note ? '✓ Note' : 'Note'}
            </button>

            <button
              className={selectedOptions.quote ? 'active' : ''}
              onClick={() => toggleOption('quote')}
            >
              {selectedOptions.quote ? '✓ Quote' : 'Quote'}
            </button>

            <button
              className={selectedOptions.highlight ? 'active' : ''}
              onClick={() => toggleOption('highlight')}
            >
              {selectedOptions.highlight ? '✓ Highlight' : 'Highlight'}
            </button>
          </div>

          <div className="action-buttons">
            <button onClick={handleConfirm} disabled={!hasSelectedOptions}>
              Confirm
            </button>

            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
