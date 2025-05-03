/**
 * Audio Player Component
 *
 * This component provides audio playback capabilities for the reader application.
 * It can generate and play audio for the current content using the audio-services package.
 */

&apos;use client';

// Import from audio-services package - currently not using any imports
// but keeping the import for future use
import {} from '@ub-ecosystem/audio-services';
import React, { useState, useRef, useEffect } from &apos;react';

interface AudioPlayerProps {
  content: string;
  title?: string;
  apiKey?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  content,
  title = &apos;Audio Player',
  apiKey = process.env.NEXT_PUBLIC_NARAKEET_API_KEY || '',
}) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate audio when the button is clicked
  const handleGenerateAudio = async () => {
    if (!apiKey) {
      setError(
        &apos;No API key provided. Please configure the NEXT_PUBLIC_NARAKEET_API_KEY environment variable.'
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the actual generateAudio function
      // For now, we'll simulate the API call

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate API response
      const result = {
        url: &apos;https://example.com/audio/sample.mp3',
        duration: content.length / 20, // Rough estimate: 20 chars per second
        format: &apos;mp3',
        size: content.length * 100, // Rough estimate: 100 bytes per character
      };

      setAudioUrl(result.url);
    } catch (err) {
      setError(`Error generating audio: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update isPlaying state when audio ends
  useEffect(() => {
    // Store the current audio element reference to avoid stale closures
    const audioElement = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (audioElement) {
      audioElement.addEventListener('ended', handleEnded);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
    // We capture audioElement in the closure above, so we don't need audioRef in dependencies
    // setIsPlaying is stable across renders (provided by React)
  }, []);

  return (
    <div className="audio-player my-4 rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>

      {!audioUrl && (
        <button
          onClick={handleGenerateAudio}
          disabled={isLoading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? &apos;Generating Audio...' : &apos;Generate Audio'}
        </button>
      )}

      {audioUrl && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlayPause}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {isPlaying ? &apos;Pause' : &apos;Play'}
            </button>

            <audio ref={audioRef} src={audioUrl} className="hidden" />

            <div className="text-sm text-gray-600">{isPlaying ? &apos;Playing...' : &apos;Paused'}</div>
          </div>

          <button
            onClick={() => setAudioUrl(null)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        </div>
      )}

      {error && <div className="mt-2 text-red-500">{error}</div>}

      <div className="mt-4 text-xs text-gray-500">
        Note: This is a simulated implementation. In a production environment, this would generate
        actual audio using the Narakeet API.
      </div>
    </div>
  );
};

export default AudioPlayer;
