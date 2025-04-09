import { NavigationState, NavigationAction, NavigationActionType } from '../types/navigation.types';

export const initialNavigationState: NavigationState = {
  isBookNavOpen: false,
  isSectionNavOpen: false,
  currentPaperId: '',
  currentSectionId: '',
  currentSectionTitle: '',
};

export function navigationReducer(
  state: NavigationState,
  action: NavigationAction
): NavigationState {
  switch (action.type) {
    case NavigationActionType.TOGGLE_BOOK_NAV:
      return {
        ...state,
        isBookNavOpen: !state.isBookNavOpen,
        // Close section nav if opening book nav
        isSectionNavOpen: state.isBookNavOpen ? state.isSectionNavOpen : false,
      };

    case NavigationActionType.TOGGLE_SECTION_NAV:
      return {
        ...state,
        isSectionNavOpen: !state.isSectionNavOpen,
        // Close book nav if opening section nav
        isBookNavOpen: state.isSectionNavOpen ? state.isBookNavOpen : false,
      };

    case NavigationActionType.SET_CURRENT_PAPER:
      return {
        ...state,
        currentPaperId: action.payload.paperId,
        // Reset section when changing paper
        currentSectionId: '',
        currentSectionTitle: '',
      };

    case NavigationActionType.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSectionId: action.payload.sectionId,
      };

    case NavigationActionType.UPDATE_SECTION_TITLE:
      return {
        ...state,
        currentSectionTitle: action.payload.title,
      };

    default:
      return state;
  }
}
