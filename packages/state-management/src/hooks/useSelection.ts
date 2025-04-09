import { useContext, useCallback } from 'react';
import { SelectionContext } from '../contexts/SelectionContext';
import { SelectionActionType, TextSelection } from '../types/selection.types';

/**
 * Hook for accessing and manipulating text selection state
 *
 * @returns Selection state and actions
 */
export function useSelection() {
  const context = useContext(SelectionContext);

  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }

  const { state, dispatch } = context;

  // Provide action creators for common operations
  const setCurrentSelection = useCallback(
    (selection: TextSelection) => {
      dispatch({
        type: SelectionActionType.SET_CURRENT_SELECTION,
        payload: { selection },
      });
    },
    [dispatch]
  );

  const clearCurrentSelection = useCallback(() => {
    dispatch({ type: SelectionActionType.CLEAR_CURRENT_SELECTION });
  }, [dispatch]);

  const saveSelection = useCallback(() => {
    dispatch({ type: SelectionActionType.SAVE_SELECTION });
  }, [dispatch]);

  const deleteSelection = useCallback(
    (id: string) => {
      dispatch({
        type: SelectionActionType.DELETE_SELECTION,
        payload: { id },
      });
    },
    [dispatch]
  );

  const setSelectionMode = useCallback(
    (isActive: boolean) => {
      dispatch({
        type: SelectionActionType.SET_SELECTION_MODE,
        payload: { isActive },
      });
    },
    [dispatch]
  );

  const setSelectionColor = useCallback(
    (color: string) => {
      dispatch({
        type: SelectionActionType.SET_SELECTION_COLOR,
        payload: { color },
      });
    },
    [dispatch]
  );

  const activateSelection = useCallback(
    (id: string) => {
      dispatch({
        type: SelectionActionType.ACTIVATE_SELECTION,
        payload: { id },
      });
    },
    [dispatch]
  );

  const deactivateAllSelections = useCallback(() => {
    dispatch({ type: SelectionActionType.DEACTIVATE_ALL_SELECTIONS });
  }, [dispatch]);

  return {
    // State properties
    currentSelection: state.currentSelection,
    savedSelections: state.savedSelections,
    isSelectionModeActive: state.isSelectionModeActive,
    currentColor: state.currentColor,

    // Computed properties
    hasSelections: state.savedSelections.length > 0,
    hasActiveSelection: state.savedSelections.some(s => s.isActive),

    // Actions
    setCurrentSelection,
    clearCurrentSelection,
    saveSelection,
    deleteSelection,
    setSelectionMode,
    setSelectionColor,
    activateSelection,
    deactivateAllSelections,

    // Raw dispatch for advanced usage
    dispatch,
  };
}
