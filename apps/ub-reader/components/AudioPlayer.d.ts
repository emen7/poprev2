/**
 * Audio Player Component
 *
 * This component provides audio playback capabilities for the reader application.
 * It can generate and play audio for the current content using the audio-services package.
 */
import React from 'react';
interface AudioPlayerProps {
    content: string;
    title?: string;
    apiKey?: string;
}
export declare const AudioPlayer: React.FC<AudioPlayerProps>;
export default AudioPlayer;
//# sourceMappingURL=AudioPlayer.d.ts.map