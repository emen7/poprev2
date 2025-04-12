'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LocalStoragePreferences = void 0;
const default_preferences_1 = require('./default-preferences');
const STORAGE_KEY = 'ub-ecosystem-preferences';
/**
 * LocalStorage implementation of PreferencesStorage
 */
class LocalStoragePreferences {
  constructor() {
    this.preferences = this.loadPreferences();
  }
  /**
   * Load preferences from localStorage
   */
  loadPreferences() {
    if (typeof window === 'undefined') {
      return default_preferences_1.defaultPreferences;
    }
    try {
      const storedPrefs = localStorage.getItem(STORAGE_KEY);
      if (!storedPrefs) {
        return default_preferences_1.defaultPreferences;
      }
      const parsedPrefs = JSON.parse(storedPrefs);
      // Deep merge with defaults to ensure all fields exist
      return this.mergeWithDefaults(parsedPrefs);
    } catch (error) {
      console.error('Failed to load preferences from localStorage:', error);
      return default_preferences_1.defaultPreferences;
    }
  }
  /**
   * Deep merge stored preferences with defaults
   */
  mergeWithDefaults(stored) {
    var _a;
    return {
      ...default_preferences_1.defaultPreferences,
      ...stored,
      reader: {
        ...default_preferences_1.defaultPreferences.reader,
        ...(stored.reader || {}),
        tts: {
          ...default_preferences_1.defaultPreferences.reader.tts,
          ...(((_a = stored.reader) === null || _a === void 0 ? void 0 : _a.tts) || {}),
        },
      },
    };
  }
  /**
   * Save preferences to localStorage
   */
  savePreferences() {
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
  getPreferences() {
    return this.preferences;
  }
  /**
   * Update preferences
   */
  updatePreferences(preferences) {
    this.preferences = this.mergeWithDefaults({
      ...this.preferences,
      ...preferences,
    });
    this.savePreferences();
  }
  /**
   * Reset preferences to defaults
   */
  resetPreferences() {
    this.preferences = default_preferences_1.defaultPreferences;
    this.savePreferences();
  }
}
exports.LocalStoragePreferences = LocalStoragePreferences;
