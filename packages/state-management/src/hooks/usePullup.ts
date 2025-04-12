import { useContext, useCallback } from 'react';

import { PullupContext } from '../contexts/PullupContext';
import { PullupActionType, PullupTab } from '../types/pullup.types';

/**
 * Hook for accessing and manipulating pullup state
 *
 * @returns Pullup state and actions
 */
export function usePullup() {
  const context = useContext(PullupContext);

  if (context === undefined) {
    throw new Error('usePullup must be used within a PullupProvider');
  }

  const { state, dispatch } = context;

  // Provide action creators for common operations
  const openPullup = useCallback(
    (tab?: PullupTab) => {
      dispatch({
        type: PullupActionType.OPEN_PULLUP,
        payload: tab ? { tab } : undefined,
      });
    },
    [dispatch]
  );

  const closePullup = useCallback(() => {
    dispatch({ type: PullupActionType.CLOSE_PULLUP });
  }, [dispatch]);

  const togglePullup = useCallback(() => {
    if (state.isOpen) {
      dispatch({ type: PullupActionType.CLOSE_PULLUP });
    } else {
      dispatch({ type: PullupActionType.OPEN_PULLUP });
    }
  }, [dispatch, state.isOpen]);

  const setActiveTab = useCallback(
    (tab: PullupTab) => {
      dispatch({
        type: PullupActionType.SET_ACTIVE_TAB,
        payload: { tab },
      });
    },
    [dispatch]
  );

  const setHeight = useCallback(
    (height: number) => {
      dispatch({
        type: PullupActionType.SET_HEIGHT,
        payload: { height },
      });
    },
    [dispatch]
  );

  const setPersistent = useCallback(
    (isPersistent: boolean) => {
      dispatch({
        type: PullupActionType.SET_PERSISTENT,
        payload: { isPersistent },
      });
    },
    [dispatch]
  );

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
