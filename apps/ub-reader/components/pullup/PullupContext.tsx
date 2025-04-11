'use client';

import React, { createContext, useReducer, ReactNode, useMemo, useEffect, useContext } from 'react';
import { PullupState, PullupTab } from './types';

// Action types
export enum PullupActionType {
  OPEN_PULLUP = 'OPEN_PULLUP',
  CLOSE_PULLUP = 'CLOSE_PULLUP',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_HEIGHT = 'SET_HEIGHT',
  SET_PERSISTENT = 'SET_PERSISTENT',
}

// Action interfaces
export type PullupAction =
  | { type: PullupActionType.OPEN_PULLUP; payload?: { tab?: PullupTab } }
  | { type: PullupActionType.CLOSE_PULLUP }
  | { type: PullupActionType.SET_ACTIVE_TAB; payload: { tab: PullupTab } }
  | { type: PullupActionType.SET_HEIGHT; payload: { height: number } }
  | { type: PullupActionType.SET_PERSISTENT; payload: { isPersistent: boolean } };

// Context type
export interface PullupContextType {
  state: PullupState;
  dispatch: React.Dispatch<PullupAction>;
}

// Initial state
export const initialPullupState: PullupState = {
  isOpen: false,
  activeTab: 'notes',
  height: 300, // Default height in pixels
  isPersistent: false,
};

// Reducer function
export function pullupReducer(state: PullupState, action: PullupAction): PullupState {
  switch (action.type) {
    case PullupActionType.OPEN_PULLUP:
      return {
        ...state,
        isOpen: true,
        // Update active tab if provided
        ...(action.payload?.tab ? { activeTab: action.payload.tab } : {}),
      };

    case PullupActionType.CLOSE_PULLUP:
      // Don't close if in persistent mode
      if (state.isPersistent) {
        return state;
      }
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
        // Always open if persistent
        isOpen: action.payload.isPersistent ? true : state.isOpen,
      };

    default:
      return state;
  }
}

// Create context
export const PullupContext = createContext<PullupContextType | undefined>(undefined);

// Provider props
interface PullupProviderProps {
  children: ReactNode;
  initialState?: Partial<PullupState>;
  persistentBreakpoint?: number;
}

// Provider component
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

// Hook for using the pullup context
export function usePullup() {
  const context = useContext(PullupContext);

  if (context === undefined) {
    throw new Error('usePullup must be used within a PullupProvider');
  }

  const { state, dispatch } = context;

  // Provide action creators for common operations
  const openPullup = (tab?: PullupTab) => {
    dispatch({
      type: PullupActionType.OPEN_PULLUP,
      payload: tab ? { tab } : undefined,
    });
  };

  const closePullup = () => {
    dispatch({ type: PullupActionType.CLOSE_PULLUP });
  };

  const togglePullup = () => {
    if (state.isOpen) {
      dispatch({ type: PullupActionType.CLOSE_PULLUP });
    } else {
      dispatch({ type: PullupActionType.OPEN_PULLUP });
    }
  };

  const setActiveTab = (tab: PullupTab) => {
    dispatch({
      type: PullupActionType.SET_ACTIVE_TAB,
      payload: { tab },
    });
  };

  const setHeight = (height: number) => {
    dispatch({
      type: PullupActionType.SET_HEIGHT,
      payload: { height },
    });
  };

  const setPersistent = (isPersistent: boolean) => {
    dispatch({
      type: PullupActionType.SET_PERSISTENT,
      payload: { isPersistent },
    });
  };

  return {
    // State properties
    isOpen: state.isOpen,
    activeTab: state.activeTab,
    height: state.height,
    isPersistent: state.isPersistent,

    // Actions
    openPullup,
    closePullup,
    togglePullup,
    setActiveTab,
    setHeight,
    setPersistent,

    // Raw dispatch for advanced usage
    dispatch,
  };
}
