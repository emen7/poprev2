# Addendum: Multi-Language and Audio Support

This addendum to the almanac integration plan addresses additional requirements for multi-language support and audio capabilities across the UB Ecosystem.

## 1. Multi-Language Support

### 1.1 Internationalization Architecture (i18n)

To support Spanish, French, and potentially other languages, we'll implement a comprehensive internationalization strategy:

```
packages/
  ├── i18n/                   # Internationalization package
  │   ├── src/
  │   │   ├── locales/        # Translation files
  │   │   │   ├── en/         # English translations
  │   │   │   ├── es/         # Spanish translations
  │   │   │   ├── fr/         # French translations
  │   │   │   └── [other]/    # Other language translations
  │   │   ├── hooks/          # React hooks for i18n
  │   │   ├── utils/          # Utility functions
  │   │   └── index.ts        # Package exports
  │   └── package.json
```

### 1.2 Translation Data Model

**packages/i18n/src/types.ts**

```typescript
export type SupportedLanguage = "en" | "es" | "fr" | "pt" | "ru";

export interface TranslationResource {
  [key: string]: string | TranslationResource;
}

export interface LanguageMetadata {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  available: boolean;
}

export const languages: Record<SupportedLanguage, LanguageMetadata> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    direction: "ltr",
    available: true,
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    available: true,
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    direction: "ltr",
    available: true,
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    direction: "ltr",
    available: false, // To be added later
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    direction: "ltr",
    available: false, // To be added later
  },
};
```

### 1.3 Language Selector Component

**packages/ui/src/language/LanguageSelector.tsx**

```tsx
import React from "react";
import { useRouter } from "next/router";
import { languages, SupportedLanguage } from "@ub-ecosystem/i18n";

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  className?: string;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  className = "",
}: LanguageSelectorProps) {
  const availableLanguages = Object.values(languages).filter(
    (lang) => lang.available
  );

  return (
    <div className={`ub-language-selector ${className}`}>
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
        aria-label="Select language"
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 1.4 URL Structure for Multi-Language Support

To support multiple languages in our URL structure, we'll implement a language prefix pattern:

```
https://reader.masteruniverse.org/en/paper/1
https://reader.masteruniverse.org/es/paper/1
https://reader.masteruniverse.org/fr/paper/1
```

**packages/config/src/domains.ts** (updated)

```typescript
export function getLocalizedUrl(
  domain: AppDomain,
  language: SupportedLanguage = "en",
  path: string = "/",
  isProduction = process.env.NODE_ENV === "production"
): string {
  const baseUrl = getDomainUrl(domain, isProduction);
  const langPath = language === "en" ? "" : `/${language}`;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${langPath}${normalizedPath}`;
}
```

## 2. Audio Support

### 2.1 Audio Data Model

**packages/data-models/src/audio.ts**

```typescript
export interface AudioResource {
  id: string;
  url: string;
  duration: number; // in seconds
  mimeType: string;
  language: string;
  title?: string;
  description?: string;
  paperNumber?: string;
  sectionNumber?: string;
  paragraphNumber?: string;
  metadata?: Record<string, any>;
}

export interface AudioMapping {
  paperNumber: string;
  sectionNumber?: string;
  paragraphNumber?: string;
  audioResources: Record<string, AudioResource>; // keyed by language code
}
```

### 2.2 Audio Player Component

**packages/ui/src/audio/AudioPlayer.tsx**

```tsx
import React, { useState, useRef, useEffect } from "react";
import { AudioResource } from "@ub-ecosystem/data-models";

interface AudioPlayerProps {
  audio: AudioResource;
  autoPlay?: boolean;
  onEnded?: () => void;
  className?: string;
}

export function AudioPlayer({
  audio,
  autoPlay = false,
  onEnded,
  className = "",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audio.duration);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay) {
      play();
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audio.url;
      setCurrentTime(0);
      setDuration(audio.duration);

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audio.url]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onEnded) {
      onEnded();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Format time as mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={`ub-audio-player ${className}`}>
      <audio
        ref={audioRef}
        src={audio.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onDurationChange={() =>
          audioRef.current && setDuration(audioRef.current.duration)
        }
      />

      <div className="ub-audio-controls">
        <button
          className="ub-audio-play-button"
          onClick={isPlaying ? pause : play}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>

        <div className="ub-audio-progress">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="ub-audio-progress-bar"
            aria-label="Audio progress"
          />
          <div className="ub-audio-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {audio.title && <div className="ub-audio-title">{audio.title}</div>}
    </div>
  );
}
```

### 2.3 Text-to-Speech Integration

**packages/ui/src/audio/TextToSpeech.tsx**

```tsx
import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
  text: string;
  language?: string;
  rate?: number;
  pitch?: number;
  className?: string;
}

export function TextToSpeech({
  text,
  language = "en-US",
  rate = 1,
  pitch = 1,
  className = "",
}: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  // Check if speech synthesis is supported
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSpeechSupported(true);

      // Get available voices
      const getVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Select default voice for the language
        const defaultVoice = availableVoices.find((voice) =>
          voice.lang.startsWith(language.split("-")[0])
        );
        if (defaultVoice) {
          setSelectedVoice(defaultVoice);
        } else if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = getVoices;
      }

      getVoices();
    }
  }, [language]);

  const speak = () => {
    if (!isSpeechSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = language;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!isSpeechSupported) return;

    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceURI = e.target.value;
    const voice = voices.find((v) => v.voiceURI === voiceURI) || null;
    setSelectedVoice(voice);
  };

  if (!isSpeechSupported) {
    return (
      <div className={`ub-tts-unsupported ${className}`}>
        Text-to-speech is not supported in your browser.
      </div>
    );
  }

  return (
    <div className={`ub-text-to-speech ${className}`}>
      <div className="ub-tts-controls">
        <button
          className="ub-tts-button"
          onClick={isPlaying ? stop : speak}
          aria-label={isPlaying ? "Stop speaking" : "Start speaking"}
        >
          {isPlaying ? "🔇 Stop" : "🔊 Listen"}
        </button>

        {voices.length > 0 && (
          <select
            value={selectedVoice?.voiceURI || ""}
            onChange={handleVoiceChange}
            className="ub-tts-voice-select"
            aria-label="Select voice"
          >
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
```

### 2.4 Audio File Storage and Delivery

To efficiently store and deliver audio files, we'll implement the following structure:

```
content/
  ├── audio/
  │   ├── en/                 # English audio files
  │   │   ├── paper-000/      # Foreword
  │   │   │   ├── section-0.mp3
  │   │   │   ├── section-1.mp3
  │   │   │   └── ...
  │   │   ├── paper-001/      # Paper 1
  │   │   │   ├── section-0.mp3
  │   │   │   ├── section-1.mp3
  │   │   │   └── ...
  │   │   └── ...
  │   ├── es/                 # Spanish audio files
  │   │   └── ...
  │   ├── fr/                 # French audio files
  │   │   └── ...
  │   └── index.json          # Audio metadata and mapping
```

**content/audio/index.json** (example structure)

```json
{
  "languages": ["en", "es", "fr"],
  "papers": {
    "000": {
      "sections": {
        "0": {
          "en": {
            "id": "000-0-en",
            "url": "/audio/en/paper-000/section-0.mp3",
            "duration": 180,
            "mimeType": "audio/mpeg",
            "language": "en"
          },
          "es": {
            "id": "000-0-es",
            "url": "/audio/es/paper-000/section-0.mp3",
            "duration": 195,
            "mimeType": "audio/mpeg",
            "language": "es"
          },
          "fr": {
            "id": "000-0-fr",
            "url": "/audio/fr/paper-000/section-0.mp3",
            "duration": 190,
            "mimeType": "audio/mpeg",
            "language": "fr"
          }
        },
        "1": {
          "en": {
            "id": "000-1-en",
            "url": "/audio/en/paper-000/section-1.mp3",
            "duration": 210,
            "mimeType": "audio/mpeg",
            "language": "en"
          },
          "es": {
            "id": "000-1-es",
            "url": "/audio/es/paper-000/section-1.mp3",
            "duration": 225,
            "mimeType": "audio/mpeg",
            "language": "es"
          },
          "fr": {
            "id": "000-1-fr",
            "url": "/audio/fr/paper-000/section-1.mp3",
            "duration": 220,
            "mimeType": "audio/mpeg",
            "language": "fr"
          }
        }
      }
    }
  }
}
```

### 2.5 Audio Integration in Reader Component

**packages/ui/src/reader/PaperSection.tsx** (example integration)

```tsx
import React, { useState } from "react";
import { Section, AudioResource } from "@ub-ecosystem/data-models";
import { AudioPlayer } from "../audio/AudioPlayer";
import { TextToSpeech } from "../audio/TextToSpeech";

interface PaperSectionProps {
  section: Section;
  audioResource?: AudioResource;
  language: string;
  className?: string;
}

export function PaperSection({
  section,
  audioResource,
  language,
  className = "",
}: PaperSectionProps) {
  const [audioMode, setAudioMode] = useState<"none" | "mp3" | "tts">("none");

  return (
    <div className={`ub-paper-section ${className}`}>
      <h2 className="ub-section-title">
        {section.number}. {section.title}
      </h2>

      <div className="ub-section-audio-controls">
        {audioResource && (
          <button
            className={`ub-audio-mode-button ${
              audioMode === "mp3" ? "active" : ""
            }`}
            onClick={() => setAudioMode(audioMode === "mp3" ? "none" : "mp3")}
          >
            🎧 MP3 Audio
          </button>
        )}

        <button
          className={`ub-audio-mode-button ${
            audioMode === "tts" ? "active" : ""
          }`}
          onClick={() => setAudioMode(audioMode === "tts" ? "none" : "tts")}
        >
          🔊 Text-to-Speech
        </button>
      </div>

      {audioMode === "mp3" && audioResource && (
        <AudioPlayer
          audio={audioResource}
          className="ub-section-audio-player"
        />
      )}

      {audioMode === "tts" && (
        <TextToSpeech
          text={section.paragraphs.map((p) => p.text).join(" ")}
          language={language}
          className="ub-section-tts"
        />
      )}

      <div className="ub-section-paragraphs">
        {section.paragraphs.map((paragraph) => (
          <div
            key={paragraph.id}
            className="ub-paragraph"
            id={`p-${paragraph.number}`}
          >
            <span className="ub-paragraph-number">{paragraph.number}</span>
            <span className="ub-paragraph-text">{paragraph.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 3. Implementation Timeline Update

To incorporate these additional features, we'll need to adjust our implementation timeline:

### Phase 1: Foundation (Weeks 1-3)

- Set up monorepo structure
- Create package configurations
- Implement data models
- Develop table transformation utilities
- **Add: Set up i18n infrastructure**

### Phase 2: UI Components (Weeks 4-5)

- Create accessible table components
- Develop grid layout components
- Build card components
- Implement responsive design system
- **Add: Develop audio components**
- **Add: Create language selector component**

### Phase 3: Content and Audio (Weeks 6-8)

- Set up Next.js app structure
- Create main pages and navigation
- Implement content migration
- Connect to data sources
- **Add: Import and organize audio files**
- **Add: Create audio metadata index**

### Phase 4: Multi-Language Support (Weeks 9-10)

- **Add: Implement language-specific routing**
- **Add: Set up translation files**
- **Add: Create language switching functionality**
- **Add: Test multi-language content display**

### Phase 5: Integration (Weeks 11-12)

- Link almanac with reader app
- Implement cross-references
- Set up multi-domain configuration
- Deploy to staging environment

### Phase 6: Testing and Refinement (Weeks 13-14)

- Conduct accessibility testing
- Perform cross-browser testing
- Optimize performance
- Refine user experience
- **Add: Test audio playback across browsers**
- **Add: Verify language switching functionality**

## 4. Conclusion

This addendum enhances the almanac integration plan with comprehensive multi-language support and audio capabilities. These features will significantly improve accessibility and reach of the UB Ecosystem, allowing users to engage with the content in their preferred language and format.

The implementation of both MP3 audio files and browser-based text-to-speech provides flexibility and ensures accessibility even when pre-recorded audio is not available. The multi-language architecture is designed to be scalable, allowing for the addition of more languages in the future as needed.

These enhancements align with modern web standards for accessibility and internationalization, making the UB Ecosystem more inclusive and user-friendly for a global audience.
