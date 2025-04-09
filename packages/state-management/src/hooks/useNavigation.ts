import { useContext, useCallback } from 'react';
import { NavigationContext } from '../contexts/NavigationContext';
import { NavigationActionType } from '../types/navigation.types';

/**
 * Hook for accessing and manipulating navigation state
 *
 * @returns Navigation state and actions
 */
export function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  const { state, dispatch } = context;

  // Provide action creators for common operations
  const toggleBookNav = useCallback(() => {
    dispatch({ type: NavigationActionType.TOGGLE_BOOK_NAV });
  }, [dispatch]);

  const toggleSectionNav = useCallback(() => {
    dispatch({ type: NavigationActionType.TOGGLE_SECTION_NAV });
  }, [dispatch]);

  const setCurrentPaper = useCallback(
    (paperId: string) => {
      dispatch({
        type: NavigationActionType.SET_CURRENT_PAPER,
        payload: { paperId },
      });
    },
    [dispatch]
  );

  const setCurrentSection = useCallback(
    (sectionId: string) => {
      dispatch({
        type: NavigationActionType.SET_CURRENT_SECTION,
        payload: { sectionId },
      });
    },
    [dispatch]
  );

  const updateSectionTitle = useCallback(
    (title: string) => {
      dispatch({
        type: NavigationActionType.UPDATE_SECTION_TITLE,
        payload: { title },
      });
    },
    [dispatch]
  );

  return {
    // State properties
    isBookNavOpen: state.isBookNavOpen,
    isSectionNavOpen: state.isSectionNavOpen,
    currentPaperId: state.currentPaperId,
    currentSectionId: state.currentSectionId,
    currentSectionTitle: state.currentSectionTitle,

    // Actions
    toggleBookNav,
    toggleSectionNav,
    setCurrentPaper,
    setCurrentSection,
    updateSectionTitle,

    // Raw dispatch for advanced usage
    dispatch,
  };
}
