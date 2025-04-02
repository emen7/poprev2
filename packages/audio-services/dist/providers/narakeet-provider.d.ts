import { AudioResult, TTSOptions, TTSProviderInterface, Voice } from '../types';
/**
 * Narakeet TTS Provider
 *
 * This provider uses the Narakeet API to generate audio from text.
 * Narakeet supports SSML and custom pronunciations.
 *
 * @see https://www.narakeet.com/docs/
 */
export declare class NarakeetProvider implements TTSProviderInterface {
    private apiKey;
    private apiEndpoint;
    /**
     * Create a new Narakeet provider
     *
     * @param apiKey Narakeet API key
     * @param apiEndpoint Narakeet API endpoint (optional)
     */
    constructor(apiKey: string, apiEndpoint?: string);
    /**
     * Generate audio from text
     *
     * @param text The text to convert to audio
     * @param options TTS options
     * @returns Promise resolving to the audio result
     */
    generateAudio(text: string, options: TTSOptions): Promise<AudioResult>;
    /**
     * Get available voices
     *
     * @returns Promise resolving to an array of available voices
     */
    getAvailableVoices(): Promise<Voice[]>;
    /**
     * Check if the provider supports SSML
     *
     * @returns True if the provider supports SSML
     */
    supportsSSML(): boolean;
    /**
     * Check if the provider supports custom pronunciation
     *
     * @returns True if the provider supports custom pronunciation
     */
    supportsCustomPronunciation(): boolean;
    /**
     * Get the required format for the provider
     *
     * @returns The required format for the provider
     */
    getRequiredFormat(): 'markdown' | 'ssml' | 'plain' | 'docx';
}
/**
 * Create a new Narakeet provider with the given API key
 *
 * @param apiKey Narakeet API key
 * @returns A new Narakeet provider
 */
export declare function createNarakeetProvider(apiKey: string): NarakeetProvider;
//# sourceMappingURL=narakeet-provider.d.ts.map