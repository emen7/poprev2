import React, { useState } from 'react';

import { useNotes } from '../hooks/useNotes';
import { usePullup } from '../hooks/usePullup';
import { useSelection } from '../hooks/useSelection';
import { TextSelection } from '../types/selection.types';

// CSS styles
const styles = {
  selectionExample: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  selectionControls: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  colorPicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  colorButton: (color: string, isActive: boolean) => ({
    width: '24px',
    height: '24px',
    backgroundColor: color,
    border: isActive ? '2px solid #000' : '1px solid #ccc',
    borderRadius: '50%',
    cursor: 'pointer',
  }),
  sampleParagraphs: {
    marginBottom: '20px',
  },
  paragraph: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  actionToggles: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  button: (isActive: boolean = false) => ({
    padding: '8px 12px',
    backgroundColor: isActive ? '#2196f3' : '#f0f0f0',
    color: isActive ? 'white' : 'inherit',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  }),
  selectionActions: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f8f8',
  },
  savedSelections: {
    marginTop: '20px',
  },
  savedSelection: {
    marginBottom: '10px',
  },
  selectionText: (color: string) => ({
    backgroundColor: color,
    padding: '5px',
    borderRadius: '3px',
    marginBottom: '5px',
  }),
  selectionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  deleteButton: {
    marginLeft: '10px',
    fontSize: '12px',
  },
};

/**
 * Example component demonstrating the use of the useSelection hook
 */
export function SelectionExample() {
  const {
    currentSelection,
    savedSelections,
    isSelectionModeActive,
    currentColor,
    setSelectionMode,
    saveSelection,
    clearCurrentSelection,
    setSelectionColor,
    deleteSelection,
    activateSelection,
    deactivateAllSelections,
  } = useSelection();

  const { addNote } = useNotes();
  const { openPullup } = usePullup();
  const [selectedAction, setSelectedAction] = useState<'note' | 'highlight' | 'none'>('none');

  const handleSaveAsNote = () => {
    if (currentSelection) {
      // First save the selection
      saveSelection();

      // Then add a note with the selection text
      addNote({
        content: currentSelection.text,
        paragraphId: currentSelection.paragraphId,
        reference: `Reference (${currentSelection.paragraphId})`,
        tags: ['selection'],
      });

      // Open the notes tab
      openPullup('notes');

      // Reset the selected action
      setSelectedAction('none');
    }
  };

  const handleSaveAsHighlight = () => {
    if (currentSelection) {
      // Save the selection as a highlight
      saveSelection();

      // Reset the selected action
      setSelectedAction('none');
    }
  };

  const handleCancel = () => {
    clearCurrentSelection();
    setSelectedAction('none');
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!isSelectionModeActive);
    if (isSelectionModeActive) {
      clearCurrentSelection();
    }
  };

  return (
    <div style={styles.selectionExample}>
      <h2>Selection Example</h2>

      <div style={styles.selectionControls}>
        <button onClick={toggleSelectionMode} style={styles.button(isSelectionModeActive)}>
          {isSelectionModeActive ? 'Exit Selection Mode' : 'Enter Selection Mode'}
        </button>

        <div style={styles.colorPicker}>
          <span>Highlight Color: </span>
          <button
            onClick={() => setSelectionColor('#ffeb3b')}
            style={styles.colorButton('#ffeb3b', currentColor === '#ffeb3b')}
          />
          <button
            onClick={() => setSelectionColor('#4caf50')}
            style={styles.colorButton('#4caf50', currentColor === '#4caf50')}
          />
          <button
            onClick={() => setSelectionColor('#2196f3')}
            style={styles.colorButton('#2196f3', currentColor === '#2196f3')}
          />
        </div>
      </div>

      <div className="selection-demo">
        <h3>Select text below:</h3>

        <div style={styles.sampleParagraphs}>
          <p style={styles.paragraph} data-paragraph-id="p1">
            This is the first paragraph. Try selecting some text here to see the selection controls.
            The selection system will detect your selection and show options for creating notes,
            quotes, or highlights.
          </p>

          <p style={styles.paragraph} data-paragraph-id="p2">
            This is the second paragraph. When you select text, the selection position is tracked so
            that controls can be displayed near the selection. This makes it easy for users to
            interact with the selected text.
          </p>

          <p style={styles.paragraph} data-paragraph-id="p3">
            This is the third paragraph. After selecting text and choosing options, you can confirm
            your selection to create notes, quotes, or highlights. The system will then process your
            selection based on the options you've chosen.
          </p>
        </div>
      </div>

      <div className="selection-state">
        <h3>Current Selection State</h3>
        <ul>
          <li>Selection Mode Active: {isSelectionModeActive ? 'Yes' : 'No'}</li>
          <li>
            Current Color:{' '}
            <span style={{ backgroundColor: currentColor, padding: '0 10px' }}>{currentColor}</span>
          </li>
          <li>Current Selection: {currentSelection ? currentSelection.text : 'None'}</li>
          <li>Saved Selections: {savedSelections.length}</li>
        </ul>
      </div>

      {currentSelection && (
        <div style={styles.selectionActions}>
          <h3>Selection Actions</h3>

          <div style={styles.actionToggles}>
            <button
              style={styles.button(selectedAction === 'note')}
              onClick={() => setSelectedAction('note')}
            >
              {selectedAction === 'note' ? '✓ Note' : 'Note'}
            </button>

            <button
              style={styles.button(selectedAction === 'highlight')}
              onClick={() => setSelectedAction('highlight')}
            >
              {selectedAction === 'highlight' ? '✓ Highlight' : 'Highlight'}
            </button>
          </div>

          <div style={styles.actionButtons}>
            {selectedAction === 'note' && (
              <button style={styles.button()} onClick={handleSaveAsNote}>
                Save as Note
              </button>
            )}

            {selectedAction === 'highlight' && (
              <button style={styles.button()} onClick={handleSaveAsHighlight}>
                Save as Highlight
              </button>
            )}

            <button style={styles.button()} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {savedSelections.length > 0 && (
        <div style={styles.savedSelections}>
          <h3>Saved Selections</h3>
          <ul>
            {savedSelections.map(selection => (
              <li key={selection.id} style={styles.savedSelection}>
                <div style={styles.selectionText(selection.color || currentColor)}>
                  {selection.text}
                </div>
                <div style={styles.selectionInfo}>
                  <small>Paragraph: {selection.paragraphId}</small>
                  <button onClick={() => deleteSelection(selection.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
