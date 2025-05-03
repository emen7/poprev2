'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useReducer, useMemo, useEffect, useContext } from 'react';
// Action types
export var PullupActionType;
(function (PullupActionType) {
    PullupActionType["OPEN_PULLUP"] = "OPEN_PULLUP";
    PullupActionType["CLOSE_PULLUP"] = "CLOSE_PULLUP";
    PullupActionType["SET_ACTIVE_TAB"] = "SET_ACTIVE_TAB";
    PullupActionType["SET_HEIGHT"] = "SET_HEIGHT";
    PullupActionType["SET_PERSISTENT"] = "SET_PERSISTENT";
})(PullupActionType || (PullupActionType = {}));
// Initial state
export const initialPullupState = {
    isOpen: false,
    activeTab: 'notes',
    height: 300, // Default height in pixels
    isPersistent: false,
};
// Reducer function
export function pullupReducer(state, action) {
    var _a;
    switch (action.type) {
        case PullupActionType.OPEN_PULLUP:
            return Object.assign(Object.assign(Object.assign({}, state), { isOpen: true }), (((_a = action.payload) === null || _a === void 0 ? void 0 : _a.tab) ? { activeTab: action.payload.tab } : {}));
        case PullupActionType.CLOSE_PULLUP:
            // Don't close if in persistent mode
            if (state.isPersistent) {
                return state;
            }
            return Object.assign(Object.assign({}, state), { isOpen: false });
        case PullupActionType.SET_ACTIVE_TAB:
            return Object.assign(Object.assign({}, state), { activeTab: action.payload.tab, 
                // Open pullup if it's closed and a tab is selected
                isOpen: true });
        case PullupActionType.SET_HEIGHT:
            return Object.assign(Object.assign({}, state), { height: action.payload.height });
        case PullupActionType.SET_PERSISTENT:
            return Object.assign(Object.assign({}, state), { isPersistent: action.payload.isPersistent, 
                // Always open if persistent
                isOpen: action.payload.isPersistent ? true : state.isOpen });
        default:
            return state;
    }
}
// Create context
export const PullupContext = createContext(undefined);
// Provider component
export function PullupProvider({ children, initialState = {}, persistentBreakpoint = 1024, }) {
    // Merge default state with any provided initial state
    const mergedInitialState = Object.assign(Object.assign({}, initialPullupState), initialState);
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
    return _jsx(PullupContext.Provider, { value: contextValue, children: children });
}
// Hook for using the pullup context
export function usePullup() {
    const context = useContext(PullupContext);
    if (context === undefined) {
        throw new Error('usePullup must be used within a PullupProvider');
    }
    const { state, dispatch } = context;
    // Provide action creators for common operations
    const openPullup = (tab) => {
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
        }
        else {
            dispatch({ type: PullupActionType.OPEN_PULLUP });
        }
    };
    const setActiveTab = (tab) => {
        dispatch({
            type: PullupActionType.SET_ACTIVE_TAB,
            payload: { tab },
        });
    };
    const setHeight = (height) => {
        dispatch({
            type: PullupActionType.SET_HEIGHT,
            payload: { height },
        });
    };
    const setPersistent = (isPersistent) => {
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
//# sourceMappingURL=PullupContext.js.map