import React, { ReactNode } from 'react';
import { PullupState, PullupTab } from './types';
export declare enum PullupActionType {
    OPEN_PULLUP = "OPEN_PULLUP",
    CLOSE_PULLUP = "CLOSE_PULLUP",
    SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
    SET_HEIGHT = "SET_HEIGHT",
    SET_PERSISTENT = "SET_PERSISTENT"
}
export type PullupAction = {
    type: PullupActionType.OPEN_PULLUP;
    payload?: {
        tab?: PullupTab;
    };
} | {
    type: PullupActionType.CLOSE_PULLUP;
} | {
    type: PullupActionType.SET_ACTIVE_TAB;
    payload: {
        tab: PullupTab;
    };
} | {
    type: PullupActionType.SET_HEIGHT;
    payload: {
        height: number;
    };
} | {
    type: PullupActionType.SET_PERSISTENT;
    payload: {
        isPersistent: boolean;
    };
};
export interface PullupContextType {
    state: PullupState;
    dispatch: React.Dispatch<PullupAction>;
}
export declare const initialPullupState: PullupState;
export declare function pullupReducer(state: PullupState, action: PullupAction): PullupState;
export declare const PullupContext: React.Context<PullupContextType | undefined>;
interface PullupProviderProps {
    children: ReactNode;
    initialState?: Partial<PullupState>;
    persistentBreakpoint?: number;
}
export declare function PullupProvider({ children, initialState, persistentBreakpoint, }: PullupProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function usePullup(): {
    isOpen: boolean;
    activeTab: PullupTab;
    height: number;
    isPersistent: boolean;
    openPullup: (tab?: PullupTab) => void;
    closePullup: () => void;
    togglePullup: () => void;
    setActiveTab: (tab: PullupTab) => void;
    setHeight: (height: number) => void;
    setPersistent: (isPersistent: boolean) => void;
    dispatch: React.Dispatch<PullupAction>;
};
export {};
//# sourceMappingURL=PullupContext.d.ts.map