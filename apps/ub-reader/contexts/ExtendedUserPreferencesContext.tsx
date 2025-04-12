'use client';

import {
  ExtendedUserPreferences,
  extendedDefaultPreferences,
  LocalStoragePreferences,
} from '@ub-ecosystem/config';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ExtendedUserPreferencesContextType {
  preferences: ExtendedUserPreferences;
  updatePreferences: (preferences: Partial<ExtendedUserPreferences>) => void;
  resetPreferences: () => void;
}

const ExtendedUserPreferencesContext = createContext<
  ExtendedUserPreferencesContextType | undefined
>(undefined);

/**
 * Hook to access extended user preferences
 */
export function useExtendedUserPreferences() {
  const context = useContext(ExtendedUserPreferencesContext);
  if (context === undefined) {
    throw new Error(
      'useExtendedUserPreferences must be used within an ExtendedUserPreferencesProvider'
    );
  }
  return context;
}

interface ExtendedUserPreferencesProviderProps {
  children: ReactNode;
}

/**
 * Provider component for extended user preferences
 */
export function ExtendedUserPreferencesProvider({
  children,
}: ExtendedUserPreferencesProviderProps) {
  const [preferences, setPreferences] = useState<ExtendedUserPreferences>(
    extendedDefaultPreferences
  );
  const [storage] = useState(() => new LocalStoragePreferences());
  const [isInitialized, setIsInitialized] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    // Start with extended default preferences
    let loadedPreferences = { ...extendedDefaultPreferences };

    // Try to load existing preferences
    try {
      const storedPreferences = storage.getPreferences();

      // Merge stored preferences with extended defaults
      loadedPreferences = {
        ...loadedPreferences,
        reader: {
          ...loadedPreferences.reader,
          ...storedPreferences.reader,
        },
      };
    } catch (error) {
      console.warn('Failed to load preferences, using defaults', error);
    }

    setPreferences(loadedPreferences);
    setIsInitialized(true);
  }, [storage]);

  const updatePreferences = (newPreferences: Partial<ExtendedUserPreferences>) => {
    // Update local state
    setPreferences(prev => {
      const updated = {
        ...prev,
        reader: {
          ...prev.reader,
          ...(newPreferences.reader || {}),
        },
      };

      // Save to storage
      try {
        storage.updatePreferences(updated);
      } catch (error) {
        console.warn('Failed to save preferences', error);
      }

      return updated;
    });
  };

  const resetPreferences = () => {
    setPreferences(extendedDefaultPreferences);
    try {
      storage.resetPreferences();
    } catch (error) {
      console.warn('Failed to reset preferences', error);
    }
  };

  // Don't render children until preferences are loaded
  if (!isInitialized) {
    return null;
  }

  return (
    <ExtendedUserPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
      }}
    >
      {children}
    </ExtendedUserPreferencesContext.Provider>
  );
}
