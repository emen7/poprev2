import { UserPreferences } from './types';

/**
 * Default user preferences
 */
export const defaultPreferences: UserPreferences = {
  reader: {
    showParagraphNumbers: true,
    tts: {
      voiceId: null,
      rate: 0.9,
      pitch: 1.0,
    },
    theme: 'system',
    fontSize: 'medium',
  },
};