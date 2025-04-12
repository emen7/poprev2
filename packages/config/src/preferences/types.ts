/**
 * User preferences types
 */

/**
 * User preferences structure
 */
export interface UserPreferences {
  reader: {
    showParagraphNumbers: boolean;
    tts: {
      voiceId: string | null;
      rate: number;
      pitch: number;
    };
    theme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large';
  };
  // Future preference categories can be added here
}

/**
 * Interface for preference storage mechanisms
 */
export interface PreferencesStorage {
  getPreferences(): UserPreferences;
  updatePreferences(preferences: Partial<UserPreferences>): void;
  resetPreferences(): void;
}
