/**
 * Types for the audio-services package
 */
/**
 * Supported TTS providers
 */
export declare enum TTSProvider {
  NARAKEET = 'narakeet',
  AWS_POLLY = 'aws-polly',
  GOOGLE_TTS = 'google-tts',
  AZURE_TTS = 'azure-tts',
  ELEVENLABS = 'elevenlabs',
  OPENAI_TTS = 'openai-tts',
}
/**
 * Options for TTS generation
 */
export interface TTSOptions {
  provider: TTSProvider;
  voice?: string;
  language?: string;
  speed?: number;
  pitch?: number;
  format?: 'mp3' | 'wav' | 'ogg' | 'mp4';
  ssmlEnabled?: boolean;
}
/**
 * Result of TTS generation
 */
export interface AudioResult {
  url: string;
  duration: number;
  format: string;
  size: number;
  metadata?: Record<string, any>;
}
/**
 * Format for phonetic markup
 */
export type PhoneticFormat = 'ssml' | 'narakeet';
/**
 * Entry in the pronunciation dictionary
 */
export interface PronunciationEntry {
  term: string;
  ipa: string;
  category?: string;
  definition?: string;
  pageReference?: string;
  notes?: string;
}
/**
 * Abstract provider interface
 */
export interface TTSProviderInterface {
  generateAudio(text: string, options: TTSOptions): Promise<AudioResult>;
  getAvailableVoices(): Promise<Voice[]>;
  supportsSSML(): boolean;
  supportsCustomPronunciation(): boolean;
  getRequiredFormat(): 'markdown' | 'ssml' | 'plain' | 'docx';
}
/**
 * Voice definition
 */
export interface Voice {
  id: string;
  name: string;
  language: string;
  gender?: 'male' | 'female' | 'neutral';
  description?: string;
}
//# sourceMappingURL=types.d.ts.map
