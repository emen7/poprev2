import { PreferencesStorage, UserPreferences } from './types';
/**
 * LocalStorage implementation of PreferencesStorage
 */
export declare class LocalStoragePreferences implements PreferencesStorage {
    private preferences;
    constructor();
    /**
     * Load preferences from localStorage
     */
    private loadPreferences;
    /**
     * Deep merge stored preferences with defaults
     */
    private mergeWithDefaults;
    /**
     * Save preferences to localStorage
     */
    private savePreferences;
    /**
     * Get current preferences
     */
    getPreferences(): UserPreferences;
    /**
     * Update preferences
     */
    updatePreferences(preferences: Partial<UserPreferences>): void;
    /**
     * Reset preferences to defaults
     */
    resetPreferences(): void;
}
