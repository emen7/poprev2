/**
 * Extended user preferences types
 */
import { UserPreferences } from './types';

/**
 * Extended user preferences structure
 * Note: We're not extending the UserPreferences interface directly to avoid type conflicts
 */
export interface ExtendedUserPreferences {
  reader: {
    showParagraphNumbers: boolean;
    showNoteIndicators: boolean;
    showHighlights: boolean;
    tts: {
      voiceId: string | null;
      rate: number;
      pitch: number;
    };
    theme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large'; // Keep compatible with original UserPreferences
    lineHeight: 'compact' | 'normal' | 'relaxed';
    contentFormat: 'modern' | 'traditional';
  };
}

/**
 * Extended default user preferences
 */
export const extendedDefaultPreferences: ExtendedUserPreferences = {
  reader: {
    showParagraphNumbers: true,
    showNoteIndicators: true,
    showHighlights: true,
    tts: {
      voiceId: null,
      rate: 0.9,
      pitch: 1.0,
    },
    theme: 'system',
    fontSize: 'medium',
    lineHeight: 'normal',
    contentFormat: 'traditional',
  },
};
