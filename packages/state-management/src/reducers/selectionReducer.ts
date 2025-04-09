import { SelectionState, SelectionAction, SelectionActionType } from '../types/selection.types';

export const initialSelectionState: SelectionState = {
  isSelecting: false,
  selectedText: '',
  selectedParagraphId: '',
  selectionPosition: null,
  selectedOptions: {
    note: false,
    quote: false,
    highlight: false,
  },
};

export function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case SelectionActionType.START_SELECTION:
      return {
        ...state,
        isSelecting: true,
        selectedParagraphId: action.payload.paragraphId,
        // Reset other selection state
        selectedText: '',
        selectionPosition: null,
        selectedOptions: {
          note: false,
          quote: false,
          highlight: false,
        },
      };

    case SelectionActionType.UPDATE_SELECTION:
      return {
        ...state,
        selectedText: action.payload.text,
        selectionPosition: action.payload.position,
      };

    case SelectionActionType.END_SELECTION:
      // Only end selection if text was actually selected
      if (!state.selectedText) {
        return initialSelectionState;
      }
      return {
        ...state,
        isSelecting: false,
      };

    case SelectionActionType.CLEAR_SELECTION:
      return initialSelectionState;

    case SelectionActionType.TOGGLE_OPTION:
      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          [action.payload.option]: !state.selectedOptions[action.payload.option],
        },
      };

    case SelectionActionType.CONFIRM_SELECTION:
      // Keep the selection data but reset the UI state
      return {
        ...state,
        isSelecting: false,
        selectionPosition: null,
      };

    default:
      return state;
  }
}
