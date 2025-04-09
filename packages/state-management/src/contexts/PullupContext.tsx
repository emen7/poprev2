import React, { createContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import {
  PullupContextType,
  PullupState,
  PullupAction,
  PullupActionType,
} from '../types/pullup.types';
import { pullupReducer, initialPullupState } from '../reducers/pullupReducer';

// Create context with undefined default value
export const PullupContext = createContext<PullupContextType | undefined>(undefined);

interface PullupProviderProps {
  children: ReactNode;
  initialState?: Partial<PullupState>;
  /**
   * Breakpoint width in pixels for persistent mode
   * @default 1024
   */
  persistentBreakpoint?: number;
}

export function PullupProvider({
  children,
  initialState = {},
  persistentBreakpoint = 1024,
}: PullupProviderProps) {
  // Merge default state with any provided initial state
  const mergedInitialState = { ...initialPullupState, ...initialState };

  // Create reducer state and dispatch
  const [state, dispatch] = useReducer(pullupReducer, mergedInitialState);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isPersistent = window.innerWidth >= persistentBreakpoint;

      // Only dispatch if the value is changing
      if (isPersistent !== state.isPersistent) {
        dispatch({
          type: PullupActionType.SET_PERSISTENT,
          payload: { isPersistent },
        });
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [persistentBreakpoint, state.isPersistent]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <PullupContext.Provider value={contextValue}>{children}</PullupContext.Provider>;
}
