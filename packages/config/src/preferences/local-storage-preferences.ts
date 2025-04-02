import { PreferencesStorage, UserPreferences } from './types';
import { defaultPreferences } from './default-preferences';

const STORAGE_KEY = 'ub-ecosystem-preferences';

/**
 * LocalStorage implementation of PreferencesStorage
 */
export class LocalStoragePreferences implements PreferencesStorage {
  private preferences: UserPreferences;

  constructor() {
    this.preferences = this.loadPreferences();
  }

  /**
   * Load preferences from localStorage
   */
  private loadPreferences(): UserPreferences {
    if (typeof window === 'undefined') {
      return defaultPreferences;
    }

    try {
      const storedPrefs = localStorage.getItem(STORAGE_KEY);
      if (!storedPrefs) {
        return defaultPreferences;
      }

      const parsedPrefs = JSON.parse(storedPrefs);
      // Deep merge with defaults to ensure all fields exist
      return this.mergeWithDefaults(parsedPrefs);
    } catch (error) {
      console.error('Failed to load preferences from localStorage:', error);
      return defaultPreferences;
    }
  }

  /**
   * Deep merge stored preferences with defaults
   */
  private mergeWithDefaults(stored: Partial<UserPreferences>): UserPreferences {
    return {
      ...defaultPreferences,
      ...stored,
      reader: {
        ...defaultPreferences.reader,
        ...(stored.reader || {}),
        tts: {
          ...defaultPreferences.reader.tts,
          ...(stored.reader?.tts || {}),
        },
      },
    };
  }

  /**
   * Save preferences to localStorage
   */
  private savePreferences(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences to localStorage:', error);
    }
  }

  /**
   * Get current preferences
   */
  getPreferences(): UserPreferences {
    return this.preferences;
  }

  /**
   * Update preferences
   */
  updatePreferences(preferences: Partial<UserPreferences>): void {
    this.preferences = this.mergeWithDefaults({
      ...this.preferences,
      ...preferences,
    });
    this.savePreferences();
  }

  /**
   * Reset preferences to defaults
   */
  resetPreferences(): void {
    this.preferences = defaultPreferences;
    this.savePreferences();
  }
}