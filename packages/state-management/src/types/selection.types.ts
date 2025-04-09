import { Dispatch } from 'react';

export interface TextSelection {
  /**
   * Unique identifier for the selection
   */
  id: string;

  /**
   * The selected text content
   */
  text: string;

  /**
   * The paragraph ID where the selection starts
   */
  paragraphId: string;

  /**
   * The start offset within the paragraph
   */
  startOffset: number;

  /**
   * The end offset within the paragraph
   */
  endOffset: number;

  /**
   * The selection color
   */
  color?: string;

  /**
   * Timestamp when the selection was created
   */
  createdAt: number;

  /**
   * Whether the selection is currently active
   */
  isActive?: boolean;
}

export interface SelectionState {
  /**
   * Current active selection
   */
  currentSelection: TextSelection | null;

  /**
   * All saved selections
   */
  savedSelections: TextSelection[];

  /**
   * Whether the selection mode is active
   */
  isSelectionModeActive: boolean;

  /**
   * The current selection color
   */
  currentColor: string;
}

export enum SelectionActionType {
  SET_CURRENT_SELECTION = 'SET_CURRENT_SELECTION',
  CLEAR_CURRENT_SELECTION = 'CLEAR_CURRENT_SELECTION',
  SAVE_SELECTION = 'SAVE_SELECTION',
  DELETE_SELECTION = 'DELETE_SELECTION',
  SET_SELECTION_MODE = 'SET_SELECTION_MODE',
  SET_SELECTION_COLOR = 'SET_SELECTION_COLOR',
  ACTIVATE_SELECTION = 'ACTIVATE_SELECTION',
  DEACTIVATE_ALL_SELECTIONS = 'DEACTIVATE_ALL_SELECTIONS',
}

export type SelectionAction =
  | { type: SelectionActionType.SET_CURRENT_SELECTION; payload: { selection: TextSelection } }
  | { type: SelectionActionType.CLEAR_CURRENT_SELECTION }
  | { type: SelectionActionType.SAVE_SELECTION }
  | { type: SelectionActionType.DELETE_SELECTION; payload: { id: string } }
  | { type: SelectionActionType.SET_SELECTION_MODE; payload: { isActive: boolean } }
  | { type: SelectionActionType.SET_SELECTION_COLOR; payload: { color: string } }
  | { type: SelectionActionType.ACTIVATE_SELECTION; payload: { id: string } }
  | { type: SelectionActionType.DEACTIVATE_ALL_SELECTIONS };

export interface SelectionContextType {
  state: SelectionState;
  dispatch: Dispatch<SelectionAction>;
}
