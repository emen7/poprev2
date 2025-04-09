import {
  SelectionState,
  SelectionAction,
  SelectionActionType,
  TextSelection,
} from '../types/selection.types';

// Simple ID generation function
const generateId = () => `selection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const initialSelectionState: SelectionState = {
  currentSelection: null,
  savedSelections: [],
  isSelectionModeActive: false,
  currentColor: '#ffeb3b', // Default yellow highlight color
};

export function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case SelectionActionType.SET_CURRENT_SELECTION:
      return {
        ...state,
        currentSelection: action.payload.selection,
      };

    case SelectionActionType.CLEAR_CURRENT_SELECTION:
      return {
        ...state,
        currentSelection: null,
      };

    case SelectionActionType.SAVE_SELECTION:
      // Only save if there's a current selection
      if (!state.currentSelection) {
        return state;
      }

      const newSelection: TextSelection = {
        ...state.currentSelection,
        id: generateId(), // Generate a unique ID
        color: state.currentColor,
        createdAt: Date.now(),
      };

      return {
        ...state,
        currentSelection: null,
        savedSelections: [...state.savedSelections, newSelection],
      };

    case SelectionActionType.DELETE_SELECTION:
      return {
        ...state,
        savedSelections: state.savedSelections.filter(
          selection => selection.id !== action.payload.id
        ),
      };

    case SelectionActionType.SET_SELECTION_MODE:
      return {
        ...state,
        isSelectionModeActive: action.payload.isActive,
      };

    case SelectionActionType.SET_SELECTION_COLOR:
      return {
        ...state,
        currentColor: action.payload.color,
      };

    case SelectionActionType.ACTIVATE_SELECTION:
      return {
        ...state,
        savedSelections: state.savedSelections.map(selection => ({
          ...selection,
          isActive: selection.id === action.payload.id,
        })),
      };

    case SelectionActionType.DEACTIVATE_ALL_SELECTIONS:
      return {
        ...state,
        savedSelections: state.savedSelections.map(selection => ({
          ...selection,
          isActive: false,
        })),
      };

    default:
      return state;
  }
}
