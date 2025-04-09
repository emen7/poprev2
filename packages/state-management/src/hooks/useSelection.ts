import { useContext, useCallback } from 'react';
import { SelectionContext } from '../contexts/SelectionContext';
import { SelectionActionType, SelectionOption } from '../types/selection.types';

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
  const startSelection = useCallback(
    (paragraphId: string) => {
      dispatch({
        type: SelectionActionType.START_SELECTION,
        payload: { paragraphId },
      });
    },
    [dispatch]
  );

  const updateSelection = useCallback(
    (text: string, position: { top: number; left: number } | null) => {
      dispatch({
        type: SelectionActionType.UPDATE_SELECTION,
        payload: { text, position },
      });
    },
    [dispatch]
  );

  const endSelection = useCallback(() => {
    dispatch({ type: SelectionActionType.END_SELECTION });
  }, [dispatch]);

  const clearSelection = useCallback(() => {
    dispatch({ type: SelectionActionType.CLEAR_SELECTION });
  }, [dispatch]);

  const toggleOption = useCallback(
    (option: SelectionOption) => {
      dispatch({
        type: SelectionActionType.TOGGLE_OPTION,
        payload: { option },
      });
    },
    [dispatch]
  );

  const confirmSelection = useCallback(() => {
    dispatch({ type: SelectionActionType.CONFIRM_SELECTION });
  }, [dispatch]);

  const hasSelectedOptions = useCallback(() => {
    return Object.values(state.selectedOptions).some(value => value);
  }, [state.selectedOptions]);

  return {
    // State properties
    isSelecting: state.isSelecting,
    selectedText: state.selectedText,
    selectedParagraphId: state.selectedParagraphId,
    selectionPosition: state.selectionPosition,
    selectedOptions: state.selectedOptions,

    // Computed properties
    hasSelectedOptions: hasSelectedOptions(),

    // Actions
    startSelection,
    updateSelection,
    endSelection,
    clearSelection,
    toggleOption,
    confirmSelection,

    // Raw dispatch for advanced usage
    dispatch,
  };
}
