import React, { createContext, useReducer, ReactNode, useMemo } from 'react';
import {
  NavigationContextType,
  NavigationState,
  NavigationAction,
  NavigationActionType,
} from '../types/navigation.types';

// Initial state for navigation
export const initialNavigationState: NavigationState = {
  isBookNavOpen: false,
  isSectionNavOpen: false,
  currentPaperId: '',
  currentSectionId: '',
  currentSectionTitle: '',
};

// Navigation reducer function
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

// Create context with undefined default value
export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  initialState?: Partial<NavigationState>;
}

export function NavigationProvider({ children, initialState = {} }: NavigationProviderProps) {
  // Merge default state with any provided initial state
  const mergedInitialState = { ...initialNavigationState, ...initialState };

  // Create reducer state and dispatch
  const [state, dispatch] = useReducer(navigationReducer, mergedInitialState);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>;
}
