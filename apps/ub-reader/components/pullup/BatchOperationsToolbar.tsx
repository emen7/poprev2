'use client';

import React from &apos;react';

import type { Note } from './types';
import './BatchOperationsToolbar.css';

export interface BatchOperationsToolbarProps {
  /**
   * Selected notes
   */
  selectedNotes: Note[];

  /**
   * Function called when the copy to clipboard button is clicked
   */
  onCopyToClipboard: () => void;

  /**
   * Function called when the delete selected button is clicked
   */
  onDeleteSelected: () => void;

  /**
   * Function called when the select all button is clicked
   */
  onSelectAll: () => void;

  /**
   * Function called when the deselect all button is clicked
   */
  onDeselectAll: () => void;

  /**
   * The total number of notes
   */
  totalNotes: number;
}

/**
 * BatchOperationsToolbar Component
 *
 * A toolbar for batch operations on selected notes.
 */
export function BatchOperationsToolbar({
  selectedNotes,
  onCopyToClipboard,
  onDeleteSelected,
  onSelectAll,
  onDeselectAll,
  totalNotes,
}: BatchOperationsToolbarProps) {
  const selectedCount = selectedNotes.length;
  const hasSelection = selectedCount > 0;
  const allSelected = selectedCount === totalNotes && totalNotes > 0;

  return (
    <div className="batch-operations-toolbar">
      <div className="selection-controls">
        <span className="selection-count">
          {selectedCount} {selectedCount === 1 ? &apos;note' : &apos;notes'} selected
        </span>
        {!allSelected && totalNotes > 0 && (
          <button
            className="selection-button select-all-button"
            onClick={onSelectAll}
            title="Select all notes"
            disabled={totalNotes === 0}
          >
            Select All
          </button>
        )}
        {hasSelection && (
          <button
            className="selection-button deselect-all-button"
            onClick={onDeselectAll}
            title="Deselect all notes"
          >
            Deselect All
          </button>
        )}
      </div>

      <div className="batch-actions">
        {hasSelection && (
          <>
            <button
              className="batch-action-button copy-button"
              onClick={onCopyToClipboard}
              title="Copy selected notes to clipboard"
            >
              <span className="batch-action-icon">📋</span>
              <span className="batch-action-label">Copy</span>
            </button>
            <button
              className="batch-action-button delete-button"
              onClick={onDeleteSelected}
              title="Delete selected notes"
            >
              <span className="batch-action-icon">🗑️</span>
              <span className="batch-action-label">Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BatchOperationsToolbar;
