'use client';

import type { UserPreferences } from '@ub-ecosystem/config';
import { defaultPreferences, LocalStoragePreferences } from '@ub-ecosystem/config';
import type { ReactNode } from &apos;react';
import React, { createContext, useContext, useState, useEffect } from &apos;react';

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

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

interface UserPreferencesProviderProps {
  children: ReactNode;
}

/**
 * Provider component for user preferences
 */
export function UserPreferencesProvider({ children }: UserPreferencesProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [storage] = useState(() => new LocalStoragePreferences());
  const [isInitialized, setIsInitialized] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const loadedPreferences = storage.getPreferences();
    setPreferences(loadedPreferences);
    setIsInitialized(true);
  }, [storage]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
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

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}
