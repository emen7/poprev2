/**
 * Audio Services Package
 *
 * This package provides Text-to-Speech (TTS) capabilities for the UB Ecosystem,
 * with a focus on accurate pronunciation of Urantia terminology.
 */
// Export types
export * from './types';
// Export pronunciation utilities
export * from './pronunciation/urantia-terms';
export * from './pronunciation/pronunciation-tagger';
// Export providers
export * from './providers/narakeet-provider';
// Import types and providers
import { TTSProvider } from './types';
import { NarakeetProvider } from './providers/narakeet-provider';
import { tagContentWithPronunciation } from './pronunciation/pronunciation-tagger';
// Provider registry
const providers = {
    [TTSProvider.NARAKEET]: (apiKey) => new NarakeetProvider(apiKey),
    [TTSProvider.AWS_POLLY]: () => { throw new Error('AWS Polly provider not implemented yet'); },
    [TTSProvider.GOOGLE_TTS]: () => { throw new Error('Google TTS provider not implemented yet'); },
    [TTSProvider.AZURE_TTS]: () => { throw new Error('Azure TTS provider not implemented yet'); },
    [TTSProvider.ELEVENLABS]: () => { throw new Error('ElevenLabs provider not implemented yet'); },
    [TTSProvider.OPENAI_TTS]: () => { throw new Error('OpenAI TTS provider not implemented yet'); }
};
// Default provider and API key
let defaultProvider = TTSProvider.NARAKEET;
let defaultApiKey = '';
/**
 * Set the default TTS provider
 *
 * @param provider The provider to use as default
 * @param apiKey The API key for the provider
 */
export function setDefaultProvider(provider, apiKey) {
    defaultProvider = provider;
    defaultApiKey = apiKey;
}
/**
 * Get a TTS provider instance
 *
 * @param provider The provider to get
 * @param apiKey The API key for the provider
 * @returns A TTS provider instance
 */
export function getProvider(provider, apiKey) {
    if (!providers[provider]) {
        throw new Error(`Provider ${provider} not supported`);
    }
    return providers[provider](apiKey);
}
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
export async function generateAudio(text, options = {}) {
    // Use default provider if not specified
    const provider = options.provider || defaultProvider;
    const apiKey = defaultApiKey;
    if (!apiKey) {
        throw new Error('No API key provided. Use setDefaultProvider() or specify in options.');
    }
    // Get provider instance
    const providerInstance = getProvider(provider, apiKey);
    // Tag Urantia terms with phonetic markup if SSML is supported
    let processedText = text;
    if (providerInstance.supportsSSML() && (options.ssmlEnabled !== false)) {
        const format = providerInstance.getRequiredFormat() === 'markdown' ? 'narakeet' : 'ssml';
        processedText = tagContentWithPronunciation(text, format);
    }
    // Generate audio
    const fullOptions = {
        provider,
        voice: options.voice || 'default',
        language: options.language || 'en-US',
        speed: options.speed || 1.0,
        pitch: options.pitch || 1.0,
        format: options.format || 'mp3',
        ssmlEnabled: options.ssmlEnabled !== false
    };
    return providerInstance.generateAudio(processedText, fullOptions);
}
//# sourceMappingURL=index.js.map