/**
 * Audio Services Package
 *
 * This package provides Text-to-Speech (TTS) capabilities for the UB Ecosystem,
 * with a focus on accurate pronunciation of Urantia terminology.
 */
export * from './types';
export * from './pronunciation/urantia-terms';
export * from './pronunciation/pronunciation-tagger';
export * from './providers/narakeet-provider';
import { AudioResult, TTSOptions, TTSProvider, TTSProviderInterface } from './types';
/**
 * Set the default TTS provider
 *
 * @param provider The provider to use as default
 * @param apiKey The API key for the provider
 */
export declare function setDefaultProvider(provider: TTSProvider, apiKey: string): void;
/**
 * Get a TTS provider instance
 *
 * @param provider The provider to get
 * @param apiKey The API key for the provider
 * @returns A TTS provider instance
 */
export declare function getProvider(provider: TTSProvider, apiKey: string): TTSProviderInterface;
/**
 * Generate audio from text
 *
 * This is the main function for generating audio from text.
 * It handles tagging Urantia terms with phonetic markup and
 * generating audio using the specified provider.
 *
 * @param text The text to convert to audio
 * @param options TTS options
 * @returns Promise resolving to the audio result
 */
export declare function generateAudio(text: string, options?: Partial<TTSOptions>): Promise<AudioResult>;
//# sourceMappingURL=index.d.ts.map