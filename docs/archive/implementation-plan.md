# UB Ecosystem Implementation Plan

This document outlines the architecture and implementation plan for the UB Ecosystem, a collection of applications and shared packages for managing and presenting Urantia Book content.

## Architecture Overview

The UB Ecosystem is structured as a monorepo with shared packages and multiple applications:

```
ub-ecosystem/
├── apps/
│   ├── reader/         # UB Reader application
│   ├── almanac/        # Master Universe Almanac
│   └── publications/   # UB Publications
├── packages/
│   ├── config/         # Shared configuration
│   ├── data-models/    # Shared data models
│   ├── table-transformer/ # Table transformation utilities
│   ├── audio-services/ # TTS and audio processing (planned)
│   └── ui/             # Shared UI components
└── content/            # Content files
```

## Shared Packages Implemented

### 1. Config Package (`@ub-ecosystem/config`)

Provides shared configuration for all applications in the ecosystem:

- Domain configuration (subdomains, ports, titles)
- URL generation utilities
- Environment-specific settings

Key implementations:

- `domains.ts`: Configuration for all application domains
- `getDomainUrl()`: Function to generate domain-specific URLs
- `getLocalizedUrl()`: Function to generate localized URLs

### 2. Data Models Package (`@ub-ecosystem/data-models`)

Defines shared data structures used across the ecosystem:

- Table and Grid data models
- Type definitions for structured data

Key implementations:

- `table.ts`: Definitions for Table, TableRow, TableCell
- `Grid` and `GridItem` interfaces for CSS Grid layouts

### 3. Table Transformer Package (`@ub-ecosystem/table-transformer`)

Provides utilities for transforming HTML tables:

- HTML table parsing using Cheerio
- Table-to-grid conversion for responsive layouts

Key implementations:

- `html-table-parser.ts`: Parses HTML tables into structured data
- `table-to-grid.ts`: Converts tables to CSS Grid layouts

### 4. UI Package (`@ub-ecosystem/ui`)

Shared UI components for all applications:

- Document viewers
- Navigation components
- Content display components

## Planned Packages

### 1. Audio Services Package (`@ub-ecosystem/audio-services`)

Will provide TTS capabilities with accurate pronunciation:

- Multiple TTS provider support
- Pronunciation dictionary for Urantia terms
- Content transformation for audio

## Implementation Plan

### Phase 1: Core Reader Enhancement (Weeks 1-3)

**Focus**: Strengthen the reader application and integrate shared packages

1. **Reader Application Integration**

   - Integrate the shared packages into the reader application
   - Implement the UI components for displaying content
   - Enhance the navigation and search functionality

2. **Table Transformation Refinement**

   - Complete the table-to-grid conversion functionality
   - Implement responsive table displays
   - Add accessibility features to tables

3. **Content Structure Standardization**
   - Define the standard content structure
   - Implement content validation
   - Create content normalization utilities

**Milestone**: Enhanced reader application with improved table display and content structure

### Phase 2: TTS Foundation (Weeks 4-6)

**Focus**: Implement the audio services package with pronunciation support

1. **Pronunciation Dictionary**

   - Extract data from the official Urantia pronunciation guide
   - Create structured pronunciation database
   - Implement lookup and search functionality

2. **Basic TTS Integration**

   - Implement the Narakeet provider
   - Create content transformation for TTS
   - Add basic audio playback to the reader

3. **Content Tagging System**
   - Implement automatic term identification
   - Create phonetic tagging functionality
   - Add pause optimization for natural speech

**Milestone**: Basic TTS functionality with accurate Urantia terminology pronunciation

### Phase 3: Content Management (Weeks 7-9)

**Focus**: Enhance content creation and management workflow

1. **TTS Content Workflow**

   - Integrate TTS generation into content workflow
   - Implement audio file management
   - Create preview and quality control tools

2. **Content Editor Enhancements**

   - Add pronunciation highlighting in the editor
   - Implement table editing tools
   - Create content validation feedback

3. **Multi-format Export**
   - Implement docx export for Narakeet
   - Add direct TTS generation with cloud providers
   - Create audio file optimization

**Milestone**: Complete content creation workflow with TTS generation

### Phase 4: Application Ecosystem (Weeks 10-12)

**Focus**: Expand to additional applications and advanced features

1. **Almanac Application**

   - Set up basic application structure
   - Implement cosmology visualization components
   - Integrate with shared packages and TTS

2. **Publications Application**

   - Set up basic application structure
   - Implement content management features
   - Integrate with shared packages and TTS

3. **Cross-application Features**
   - Implement cross-references between applications
   - Create shared navigation components
   - Add user preferences synchronization

**Milestone**: Functioning ecosystem with multiple integrated applications

### Phase 5: Advanced Features (Weeks 13-16)

**Focus**: Polish and extend the ecosystem with advanced capabilities

1. **Advanced TTS Features**

   - Implement alternative TTS providers
   - Add voice customization options
   - Create batch processing for existing content

2. **Performance Optimization**

   - Implement caching strategies
   - Optimize content delivery
   - Enhance mobile performance

3. **Analytics and Feedback**
   - Add usage analytics
   - Implement user feedback mechanisms
   - Create content improvement suggestions

**Milestone**: Polished ecosystem with advanced features and optimized performance

## Technical Implementation Details

### 1. Reader Enhancement Implementation

```typescript
// Enhanced content display with table support
interface ContentDisplayOptions {
  enableTables: boolean;
  tableDisplayMode: "native" | "grid" | "responsive";
  enableAudio: boolean;
  highlightTerms: boolean;
}

// Table rendering with grid support
function renderTable(
  table: Table,
  options: ContentDisplayOptions
): JSX.Element {
  if (options.tableDisplayMode === "grid") {
    const grid = tableToGrid(table);
    return <GridRenderer grid={grid} />;
  } else if (options.tableDisplayMode === "responsive") {
    return <ResponsiveTableRenderer table={table} />;
  } else {
    return <NativeTableRenderer table={table} />;
  }
}
```

### 2. TTS Implementation

```typescript
// Pronunciation processing pipeline
async function processTTS(
  content: string,
  options: TTSOptions
): Promise<AudioResult> {
  // 1. Identify and tag Urantia terms
  const taggedContent = tagContentWithPronunciation(content, options.format);

  // 2. Process mathematical expressions
  const mathProcessedContent = convertMathToVerbal(taggedContent);

  // 3. Optimize pauses
  const pauseOptimizedContent = optimizePauses(mathProcessedContent);

  // 4. Generate audio with selected provider
  const provider = getTTSProvider(options.provider);
  return await provider.generateAudio(pauseOptimizedContent, options);
}
```

### 3. Content Workflow Implementation

```typescript
// Content processing pipeline
async function processContent(content: RawContent): Promise<ProcessedContent> {
  // 1. Normalize content structure
  const normalizedContent = normalizeContent(content);

  // 2. Validate content
  const validationResult = validateContent(normalizedContent);
  if (!validationResult.valid) {
    throw new ContentValidationError(validationResult.errors);
  }

  // 3. Transform content (tables, etc.)
  const transformedContent = transformContent(normalizedContent);

  // 4. Generate TTS if requested
  if (content.generateAudio) {
    const audioResult = await processTTS(
      transformedContent.textContent,
      content.ttsOptions
    );
    transformedContent.audioUrl = audioResult.url;
  }

  return transformedContent;
}
```

### 4. Pronunciation Dictionary Implementation

```typescript
interface PronunciationEntry {
  term: string; // The Urantia term
  ipa: string; // IPA phonetic representation from official guide
  category?: string; // E.g., "Deity", "Cosmic", "Geographic"
  definition?: string; // Brief definition if available
  pageReference?: string; // Reference to UB page number
  notes?: string; // Any special considerations
}

// Example based on the official guide
const urantiaPronunciations: PronunciationEntry[] = [
  {
    term: "Andovontia",
    ipa: "an-do-VON-sha",
    category: "Personality",
    pageReference: "302",
  },
  {
    term: "Divinington",
    ipa: "di-VIN-ing-ton",
    category: "Sacred Sphere",
    pageReference: "144",
  },
  // Additional entries from the official PDF
];

// Automatic tagging function
function tagContentWithPronunciation(
  content: string,
  format: "ssml" | "narakeet"
): string {
  // For each term in our pronunciation dictionary
  return urantiaPronunciations.reduce((taggedContent, entry) => {
    // Create regex to find the term (with word boundaries)
    const termRegex = new RegExp(`\\b${entry.term}\\b`, "gi");

    // Format depends on the target system
    if (format === "ssml") {
      // For standard SSML (AWS, Google, etc.)
      return taggedContent.replace(
        termRegex,
        `<phoneme alphabet="ipa" ph="${entry.ipa}">${entry.term}</phoneme>`
      );
    } else {
      // For Narakeet with ellipses for pauses
      return taggedContent.replace(
        termRegex,
        `<phoneme alphabet="ipa" ph="${entry.ipa}">${entry.term}... ...</phoneme>`
      );
    }
  }, content);
}
```

## TTS Provider Architecture

The audio services package will support multiple TTS providers through a common interface:

```typescript
// Abstract provider interface
interface TTSProvider {
  generateAudio(text: string, options: TTSOptions): Promise<AudioResult>;
  getAvailableVoices(): Promise<Voice[]>;
  supportsSSML(): boolean;
  supportsCustomPronunciation(): boolean;
  getRequiredFormat(): "markdown" | "ssml" | "plain" | "docx";
}

// Implementation for each provider
class NarakeetProvider implements TTSProvider {
  // Implementation specific to Narakeet
}

class AWSPollyProvider implements TTSProvider {
  // Implementation specific to AWS Polly
}

// And so on for other providers
```

## Development Approach

To ensure efficient progress:

1. **Incremental Development**

   - Implement features in small, testable increments
   - Deploy frequently to get early feedback
   - Prioritize user-facing features

2. **Component-Based Architecture**

   - Build reusable components
   - Maintain clear separation of concerns
   - Document component interfaces

3. **Testing Strategy**

   - Unit tests for core functionality
   - Integration tests for package interactions
   - End-to-end tests for critical user flows

4. **Documentation**
   - Maintain up-to-date API documentation
   - Create usage examples
   - Document architectural decisions

## Next Immediate Steps

1. Complete the integration of shared packages into the reader application
2. Begin work on the pronunciation dictionary using the official Urantia guide
3. Implement the basic table-to-grid conversion in the reader
4. Create a prototype of the TTS content tagging system

## Resources

- Official Urantia Pronunciation Guide: https://www.urantia.org/sites/default/files/study-materials/terms-and-pronunciation/Term-and-Pronunciation-List-for-The-Urantia-Book-2023-en.pdf
- Narakeet Documentation: https://www.narakeet.com/docs/
