import { Dispatch } from 'react';

export type PullupTab = 'notes' | 'quotes' | 'settings';

export interface PullupState {
  /**
   * Whether the pullup panel is open
   */
  isOpen: boolean;

  /**
   * The currently active tab
   */
  activeTab: PullupTab;

  /**
   * The current height of the pullup panel
   */
  height: number;

  /**
   * Whether the pullup panel is in persistent mode (for large screens)
   */
  isPersistent: boolean;
}

export enum PullupActionType {
  OPEN_PULLUP = 'OPEN_PULLUP',
  CLOSE_PULLUP = 'CLOSE_PULLUP',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_HEIGHT = 'SET_HEIGHT',
  SET_PERSISTENT = 'SET_PERSISTENT',
}

export type PullupAction =
  | { type: PullupActionType.OPEN_PULLUP; payload?: { tab?: PullupTab } }
  | { type: PullupActionType.CLOSE_PULLUP }
  | { type: PullupActionType.SET_ACTIVE_TAB; payload: { tab: PullupTab } }
  | { type: PullupActionType.SET_HEIGHT; payload: { height: number } }
  | { type: PullupActionType.SET_PERSISTENT; payload: { isPersistent: boolean } };

export interface PullupContextType {
  state: PullupState;
  dispatch: Dispatch<PullupAction>;
}
