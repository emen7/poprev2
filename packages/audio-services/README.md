# Audio Services

This package provides Text-to-Speech (TTS) capabilities for the UB Ecosystem, with a focus on accurate pronunciation of Urantia terminology.

## Features

- Multiple TTS provider support (Narakeet, AWS Polly, Google TTS, etc.)
- Pronunciation dictionary for Urantia terms
- Content transformation for audio generation
- SSML generation and optimization

## Installation

```bash
npm install @ub-ecosystem/audio-services
```

## Usage

### Basic TTS Generation

```typescript
import { generateAudio } from "@ub-ecosystem/audio-services";

// Generate audio with default provider (Narakeet)
const result = await generateAudio(
  "This is a test of the Urantia Book audio system."
);

console.log(`Audio URL: ${result.url}`);
```

### Using the Pronunciation Dictionary

```typescript
import { tagContentWithPronunciation } from "@ub-ecosystem/audio-services";

// Tag Urantia terms with phonetic markup
const taggedContent = tagContentWithPronunciation(
  "Andovontia is a tertiary Universe Circuit Supervisor stationed in our local universe.",
  "ssml"
);

console.log(taggedContent);
// Output: "<phoneme alphabet="ipa" ph="an-do-VON-sha">Andovontia</phoneme> is a tertiary Universe Circuit Supervisor stationed in our local universe."
```

### Using Different TTS Providers

```typescript
import { generateAudio, TTSProvider } from "@ub-ecosystem/audio-services";

// Generate audio with AWS Polly
const result = await generateAudio(
  "This is a test of the Urantia Book audio system.",
  { provider: TTSProvider.AWS_POLLY }
);

console.log(`Audio URL: ${result.url}`);
```

## Pronunciation Dictionary

This package includes a comprehensive pronunciation dictionary for Urantia terminology, based on the official Urantia Foundation pronunciation guide:

https://www.urantia.org/sites/default/files/study-materials/terms-and-pronunciation/Term-and-Pronunciation-List-for-The-Urantia-Book-2023-en.pdf

The dictionary includes:

- Proper names
- Cosmic entities
- Geographic locations
- Technical terms

## License

MIT
