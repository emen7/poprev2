import { PullupState, PullupAction, PullupActionType } from '../types/pullup.types';

export const initialPullupState: PullupState = {
  isOpen: false,
  activeTab: 'notes',
  height: 300, // Default height in pixels
  isPersistent: false,
};

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
