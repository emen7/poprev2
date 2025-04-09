import { Dispatch } from 'react';

export interface SelectionState {
  /**
   * Whether text is currently being selected
   */
  isSelecting: boolean;

  /**
   * The currently selected text
   */
  selectedText: string;

  /**
   * The ID of the paragraph containing the selection
   */
  selectedParagraphId: string;

  /**
   * The position of the selection for displaying controls
   */
  selectionPosition: { top: number; left: number } | null;

  /**
   * The selected options for the current selection
   */
  selectedOptions: {
    note: boolean;
    quote: boolean;
    highlight: boolean;
  };
}

export enum SelectionActionType {
  START_SELECTION = 'START_SELECTION',
  UPDATE_SELECTION = 'UPDATE_SELECTION',
  END_SELECTION = 'END_SELECTION',
  CLEAR_SELECTION = 'CLEAR_SELECTION',
  TOGGLE_OPTION = 'TOGGLE_OPTION',
  CONFIRM_SELECTION = 'CONFIRM_SELECTION',
}

export type SelectionOption = 'note' | 'quote' | 'highlight';

export type SelectionAction =
  | { type: SelectionActionType.START_SELECTION; payload: { paragraphId: string } }
  | {
      type: SelectionActionType.UPDATE_SELECTION;
      payload: {
        text: string;
        position: { top: number; left: number } | null;
      };
    }
  | { type: SelectionActionType.END_SELECTION }
  | { type: SelectionActionType.CLEAR_SELECTION }
  | { type: SelectionActionType.TOGGLE_OPTION; payload: { option: SelectionOption } }
  | { type: SelectionActionType.CONFIRM_SELECTION };

export interface SelectionContextType {
  state: SelectionState;
  dispatch: Dispatch<SelectionAction>;
}
