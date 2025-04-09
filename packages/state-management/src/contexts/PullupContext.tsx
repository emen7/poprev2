import React, { createContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import {
  PullupContextType,
  PullupState,
  PullupAction,
  PullupActionType,
  PullupTab,
} from '../types/pullup.types';

// Initial state for pullup
export const initialPullupState: PullupState = {
  isOpen: false,
  activeTab: 'notes',
  height: 300,
  isPersistent: false,
};

// Pullup reducer function
export function pullupReducer(state: PullupState, action: PullupAction): PullupState {
  switch (action.type) {
    case PullupActionType.OPEN_PULLUP:
      return {
        ...state,
        isOpen: true,
        activeTab: action.payload?.tab || state.activeTab,
      };

    case PullupActionType.CLOSE_PULLUP:
      return {
        ...state,
        isOpen: false,
      };

    case PullupActionType.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload.tab,
        // Open pullup if it's closed and a tab is selected
        isOpen: true,
      };

    case PullupActionType.SET_HEIGHT:
      return {
        ...state,
        height: action.payload.height,
      };

    case PullupActionType.SET_PERSISTENT:
      return {
        ...state,
        isPersistent: action.payload.isPersistent,
      };

    default:
      return state;
  }
}

// Create context with undefined default value
export const PullupContext = createContext<PullupContextType | undefined>(undefined);

interface PullupProviderProps {
  children: ReactNode;
  initialState?: Partial<PullupState>;
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

  // Handle responsive behavior for persistent mode
  useEffect(() => {
    const handleResize = () => {
      const isPersistent = window.innerWidth >= persistentBreakpoint;

      if (isPersistent !== state.isPersistent) {
        dispatch({
          type: PullupActionType.SET_PERSISTENT,
          payload: { isPersistent },
        });
      }
    };

    // Set initial state
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
