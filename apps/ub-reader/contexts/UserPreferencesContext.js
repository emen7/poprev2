'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { defaultPreferences, LocalStoragePreferences } from '@ub-ecosystem/config';
import { createContext, useContext, useState, useEffect } from 'react';
const UserPreferencesContext = createContext(undefined);
/**
 * Hook to access user preferences
 */
export function useUserPreferences() {
    const context = useContext(UserPreferencesContext);
    if (context === undefined) {
        throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
    }
    return context;
}
/**
 * Provider component for user preferences
 */
export function UserPreferencesProvider({ children }) {
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [storage] = useState(() => new LocalStoragePreferences());
    const [isInitialized, setIsInitialized] = useState(false);
    // Load preferences on mount
    useEffect(() => {
        const loadedPreferences = storage.getPreferences();
        setPreferences(loadedPreferences);
        setIsInitialized(true);
    }, [storage]);
    const updatePreferences = (newPreferences) => {
        storage.updatePreferences(newPreferences);
        setPreferences(storage.getPreferences());
    };
    const resetPreferences = () => {
        storage.resetPreferences();
        setPreferences(storage.getPreferences());
    };
    // Don't render children until preferences are loaded
    if (!isInitialized) {
        return null;
    }
    return (_jsx(UserPreferencesContext.Provider, { value: {
            preferences,
            updatePreferences,
            resetPreferences,
        }, children: children }));
}
//# sourceMappingURL=UserPreferencesContext.js.map