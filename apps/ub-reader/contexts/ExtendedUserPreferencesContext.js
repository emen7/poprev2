'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { extendedDefaultPreferences, LocalStoragePreferences, } from '@ub-ecosystem/config';
import { createContext, useContext, useState, useEffect } from 'react';
const ExtendedUserPreferencesContext = createContext(undefined);
/**
 * Hook to access extended user preferences
 */
export function useExtendedUserPreferences() {
    const context = useContext(ExtendedUserPreferencesContext);
    if (context === undefined) {
        throw new Error('useExtendedUserPreferences must be used within an ExtendedUserPreferencesProvider');
    }
    return context;
}
/**
 * Provider component for extended user preferences
 */
export function ExtendedUserPreferencesProvider({ children, }) {
    const [preferences, setPreferences] = useState(extendedDefaultPreferences);
    const [storage] = useState(() => new LocalStoragePreferences());
    const [isInitialized, setIsInitialized] = useState(false);
    // Load preferences on mount
    useEffect(() => {
        // Start with extended default preferences
        let loadedPreferences = Object.assign({}, extendedDefaultPreferences);
        // Try to load existing preferences
        try {
            const storedPreferences = storage.getPreferences();
            // Merge stored preferences with extended defaults
            loadedPreferences = Object.assign(Object.assign({}, loadedPreferences), { reader: Object.assign(Object.assign({}, loadedPreferences.reader), storedPreferences.reader) });
        }
        catch (error) {
            console.warn('Failed to load preferences, using defaults', error);
        }
        setPreferences(loadedPreferences);
        setIsInitialized(true);
    }, [storage]);
    const updatePreferences = (newPreferences) => {
        // Update local state
        setPreferences(prev => {
            const updated = Object.assign(Object.assign({}, prev), { reader: Object.assign(Object.assign({}, prev.reader), (newPreferences.reader || {})) });
            // Save to storage
            try {
                storage.updatePreferences(updated);
            }
            catch (error) {
                console.warn('Failed to save preferences', error);
            }
            return updated;
        });
    };
    const resetPreferences = () => {
        setPreferences(extendedDefaultPreferences);
        try {
            storage.resetPreferences();
        }
        catch (error) {
            console.warn('Failed to reset preferences', error);
        }
    };
    // Don't render children until preferences are loaded
    if (!isInitialized) {
        return null;
    }
    return (_jsx(ExtendedUserPreferencesContext.Provider, { value: {
            preferences,
            updatePreferences,
            resetPreferences,
        }, children: children }));
}
//# sourceMappingURL=ExtendedUserPreferencesContext.js.map