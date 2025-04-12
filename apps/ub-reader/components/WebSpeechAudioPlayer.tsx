'use client';

import React, { useState, useRef, useEffect } from 'react';

// Pronunciation dictionary for Urantia terms
// This would ideally come from the audio-services package
const pronunciationDictionary: Record<string, string> = {
  Andovontia: 'andovonsha',
  Urantia: 'yuransha',
  Nebadon: 'nebbadon',
  Orvonton: 'orvonton',
  Salvington: 'salvington',
  Satania: 'satania',
  Jerusem: 'jerusem',
  Edentia: 'edentia',
  Havona: 'havona',
  Divinington: 'divinington',
  Splandon: 'splandon',
  Melchizedek: 'melkizedek',
  Lanonandek: 'lanonandek',
  Vorondadek: 'vorondadek',
  Caligastia: 'caligastia',
  Lucifer: 'lucifer',
  Tabamantia: 'tabamantia',
  Grandfanda: 'grandfanda',
  Solonia: 'solonia',
  Serapatatia: 'serapatatia',
};

interface WebSpeechAudioPlayerProps {
  content: string;
  title?: string;
}

export const WebSpeechAudioPlayer: React.FC<WebSpeechAudioPlayerProps> = ({
  content,
  title = 'Audio Player',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(0.9); // Slightly slower than normal
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isMounted = useRef(true);

  // Preprocess text for better pronunciation
  const preprocessTextForSpeech = (text: string): string => {
    let processedText = text;

    // Replace UB terms with their phonetic spellings
    Object.entries(pronunciationDictionary).forEach(([term, pronunciation]) => {
      const termRegex = new RegExp(`\\b${term}\\b`, 'gi');
      processedText = processedText.replace(termRegex, pronunciation);
    });

    return processedText;
  };

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (isMounted.current) {
        setVoices(availableVoices);

        // Select a default English voice
        const defaultVoice = availableVoices.find(
          voice => voice.lang.includes('en-US') || voice.lang.includes('en-GB')
        );

        if (defaultVoice) {
          setSelectedVoice(defaultVoice);
        }
      }
    };

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();

    // Clean up on unmount
    return () => {
      isMounted.current = false;
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Preprocess the text for better pronunciation
    const processedContent = preprocessTextForSpeech(content);

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(processedContent);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Set the selected voice if available
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Add event handlers
    utterance.onend = () => {
      if (isMounted.current) {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    utterance.onerror = () => {
      if (isMounted.current) {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    // Store the utterance for later control
    utteranceRef.current = utterance;

    // Start speaking
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleResume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceName = e.target.value;
    const voice = voices.find(v => v.name === voiceName) || null;
    setSelectedVoice(voice);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeechRate(parseFloat(e.target.value));
  };

  return (
    <div className="audio-player border rounded-lg p-4 my-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Voice:</label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={selectedVoice?.name || ''}
            onChange={handleVoiceChange}
            disabled={isPlaying || isPaused}
          >
            {voices.length === 0 && <option value="">Loading voices...</option>}
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Speed: {speechRate.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={speechRate}
            onChange={handleRateChange}
            className="block w-full"
            disabled={isPlaying || isPaused}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!isPlaying && !isPaused && (
          <button
            onClick={handlePlay}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Play
          </button>
        )}

        {isPlaying && (
          <button
            onClick={handlePause}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Pause
          </button>
        )}

        {isPaused && (
          <button
            onClick={handleResume}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Resume
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Stop
          </button>
        )}
      </div>

      <div className="text-xs text-gray-500 mt-4">
        Using browser's built-in text-to-speech. For best results, use a modern browser.
      </div>
    </div>
  );
};

export default WebSpeechAudioPlayer;
