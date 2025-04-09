import React, { createContext, useReducer, ReactNode, useMemo } from 'react';
import {
  NavigationContextType,
  NavigationState,
  NavigationAction,
} from '../types/navigation.types';
import { navigationReducer, initialNavigationState } from '../reducers/navigationReducer';

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
