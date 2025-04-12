# 05-P1-ContentRepository: Design Specification

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: Content Repository

## 1. Overview

The Content Repository is responsible for organizing, storing, and providing access to all content used by the UB Ecosystem. It centralizes content management, ensuring consistency across different publications while allowing for publication-specific content. The repository includes both the physical organization of content files and the services that provide access to this content.

## 2. Directory Structure

```
content/
├── index/                  # Content indexes
│   ├── ub-index.json       # UB content index
│   ├── sci-index.json      # Scientific content index
│   └── other-indexes...    # Other publication indexes
├── ub/                     # Urantia Book content
│   ├── papers/             # Paper content
│   │   ├── 000.json        # Foreword
│   │   ├── 001.json        # Paper 1
│   │   └── ...             # Other papers
│   ├── metadata/           # Content metadata
│   │   ├── papers.json     # Paper metadata
│   │   └── sections.json   # Section metadata
│   └── assets/             # Content-related assets
│       ├── images/         # Images
│       └── audio/          # Audio files
├── scientific/             # Scientific content
│   ├── papers/             # Scientific papers
│   ├── metadata/           # Scientific metadata
│   └── assets/             # Scientific assets
└── other-publications/     # Other publication content

packages/
└── content-repository/
    ├── services/           # Content services
    │   ├── ContentService.ts # Main content service
    │   ├── IndexService.ts # Index management
    │   └── CacheService.ts # Content caching
    ├── models/             # Content models
    │   ├── ContentIndex.ts # Index model
    │   └── ContentMetadata.ts # Metadata model
    ├── loaders/            # Content loaders
    │   ├── JsonLoader.ts   # JSON file loader
    │   └── RemoteLoader.ts # Remote content loader
    ├── hooks/              # React hooks
    │   ├── useContent.ts   # Content access hook
    │   └── useContentIndex.ts # Index access hook
    └── index.ts            # Public API exports
```

## 3. Component Specifications

### 3.1 Content Structure

#### 3.1.1 Paper JSON Format

```json
{
  "id": "paper_001",
  "number": 1,
  "title": "The Universal Father",
  "sections": [
    {
      "id": "section_001_001",
      "number": 1,
      "title": "The Father's Name",
      "paragraphs": [
        {
          "id": "paragraph_001_001_001",
          "number": 1,
          "text": "Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered. The First Father is known by various names in different universes and in different sectors of the same universe. The names which the creature assigns to the Creator are much dependent on the creature's concept of the Creator. The First Source and Universe Center has never revealed himself by name, only by nature. If we believe that we are the children of this Creator, it is only natural that we should eventually call him Father. But this is the name of our own choosing, and it grows out of the recognition of our personal relationship with the First Source and Center.",
          "format": {
            "emphasis": [
              { "start": 47, "end": 59, "type": "italic" },
              { "start": 60, "end": 81, "type": "italic" },
              { "start": 147, "end": 159, "type": "italic" },
              { "start": 215, "end": 227, "type": "italic" },
              { "start": 228, "end": 249, "type": "italic" }
            ]
          }
        }
        // More paragraphs...
      ]
    }
    // More sections...
  ]
}
```

#### 3.1.2 Content Index Format

```json
{
  "id": "ub-index",
  "name": "The Urantia Book",
  "description": "The Urantia Book content index",
  "version": "1.0.0",
  "lastUpdated": "2025-04-01T12:00:00Z",
  "papers": [
    {
      "id": "paper_000",
      "number": 0,
      "title": "Foreword",
      "path": "ub/papers/000.json",
      "sections": 12,
      "paragraphs": 127
    },
    {
      "id": "paper_001",
      "number": 1,
      "title": "The Universal Father",
      "path": "ub/papers/001.json",
      "sections": 7,
      "paragraphs": 138
    }
    // More papers...
  ],
  "metadata": {
    "papersPath": "ub/metadata/papers.json",
    "sectionsPath": "ub/metadata/sections.json"
  },
  "assets": {
    "imagesPath": "ub/assets/images",
    "audioPath": "ub/assets/audio"
  }
}
```

#### 3.1.3 Metadata Format

```json
// papers.json
{
  "papers": [
    {
      "id": "paper_000",
      "number": 0,
      "title": "Foreword",
      "author": "Divine Counselor",
      "date": "1934-10-12",
      "keywords": ["deity", "divinity", "reality", "universe", "infinity"]
    },
    // More paper metadata...
  ]
}

// sections.json
{
  "sections": [
    {
      "id": "section_001_001",
      "paperNumber": 1,
      "number": 1,
      "title": "The Father's Name",
      "keywords": ["name", "father", "first source", "universe center"]
    },
    // More section metadata...
  ]
}
```

### 3.2 Content Service

The Content Service provides access to content data.

#### 3.2.1 Interface

```typescript
interface ContentService {
  // Initialize the service
  initialize(publicationId: string): Promise<void>;

  // Get content index
  getContentIndex(): Promise<ContentIndex>;

  // Get paper by number
  getPaper(paperNumber: number): Promise<Paper>;

  // Get section by paper and section number
  getSection(paperNumber: number, sectionNumber: number): Promise<Section>;

  // Get paragraph by paper, section, and paragraph number
  getParagraph(
    paperNumber: number,
    sectionNumber: number,
    paragraphNumber: number
  ): Promise<Paragraph>;

  // Search content
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;

  // Get paper metadata
  getPaperMetadata(paperNumber: number): Promise<PaperMetadata>;

  // Get section metadata
  getSectionMetadata(paperNumber: number, sectionNumber: number): Promise<SectionMetadata>;
}
```

#### 3.2.2 Implementation

```typescript
class ContentServiceImpl implements ContentService {
  private contentIndex: ContentIndex | null = null;
  private cache: Map<string, any> = new Map();
  private publicationId: string = '';
  private contentLoader: ContentLoader;
  private indexService: IndexService;

  constructor(contentLoader: ContentLoader, indexService: IndexService) {
    this.contentLoader = contentLoader;
    this.indexService = indexService;
  }

  async initialize(publicationId: string): Promise<void> {
    this.publicationId = publicationId;
    this.contentIndex = await this.indexService.getIndex(publicationId);
  }

  async getContentIndex(): Promise<ContentIndex> {
    if (!this.contentIndex) {
      throw new Error('Content service not initialized');
    }
    return this.contentIndex;
  }

  async getPaper(paperNumber: number): Promise<Paper> {
    const cacheKey = `paper_${paperNumber}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Get paper path from index
    const index = await this.getContentIndex();
    const paperInfo = index.papers.find(p => p.number === paperNumber);

    if (!paperInfo) {
      throw new Error(`Paper ${paperNumber} not found`);
    }

    // Load paper content
    const paper = await this.contentLoader.loadJson<Paper>(paperInfo.path);

    // Cache the result
    this.cache.set(cacheKey, paper);

    return paper;
  }

  async getSection(paperNumber: number, sectionNumber: number): Promise<Section> {
    const paper = await this.getPaper(paperNumber);
    const section = paper.sections.find(s => s.number === sectionNumber);

    if (!section) {
      throw new Error(`Section ${sectionNumber} not found in paper ${paperNumber}`);
    }

    return section;
  }

  async getParagraph(
    paperNumber: number,
    sectionNumber: number,
    paragraphNumber: number
  ): Promise<Paragraph> {
    const section = await this.getSection(paperNumber, sectionNumber);
    const paragraph = section.paragraphs.find(p => p.number === paragraphNumber);

    if (!paragraph) {
      throw new Error(
        `Paragraph ${paragraphNumber} not found in section ${sectionNumber} of paper ${paperNumber}`
      );
    }

    return paragraph;
  }

  async search(query: string, options?: SearchOptions): Promise<SearchResult[]> {
    // Implementation depends on search strategy
    // This could use a full-text search library or a simple in-memory search

    // For simplicity, this is a basic implementation
    const results: SearchResult[] = [];
    const index = await this.getContentIndex();

    // Search through each paper
    for (const paperInfo of index.papers) {
      const paper = await this.getPaper(paperInfo.number);

      for (const section of paper.sections) {
        for (const paragraph of section.paragraphs) {
          if (paragraph.text.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              reference: {
                paper: paper.number,
                section: section.number,
                paragraph: paragraph.number,
              },
              text: paragraph.text,
              // Highlight the matching text
              highlights: this.getHighlights(paragraph.text, query),
            });
          }
        }
      }
    }

    return results;
  }

  private getHighlights(text: string, query: string): { start: number; end: number }[] {
    const highlights: { start: number; end: number }[] = [];
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    let index = 0;
    while ((index = lowerText.indexOf(lowerQuery, index)) !== -1) {
      highlights.push({
        start: index,
        end: index + query.length,
      });
      index += query.length;
    }

    return highlights;
  }

  async getPaperMetadata(paperNumber: number): Promise<PaperMetadata> {
    const index = await this.getContentIndex();
    const metadataPath = index.metadata.papersPath;

    // Load metadata
    const metadata = await this.contentLoader.loadJson<{ papers: PaperMetadata[] }>(metadataPath);
    const paperMetadata = metadata.papers.find(p => p.number === paperNumber);

    if (!paperMetadata) {
      throw new Error(`Metadata for paper ${paperNumber} not found`);
    }

    return paperMetadata;
  }

  async getSectionMetadata(paperNumber: number, sectionNumber: number): Promise<SectionMetadata> {
    const index = await this.getContentIndex();
    const metadataPath = index.metadata.sectionsPath;

    // Load metadata
    const metadata = await this.contentLoader.loadJson<{ sections: SectionMetadata[] }>(
      metadataPath
    );
    const sectionMetadata = metadata.sections.find(
      s => s.paperNumber === paperNumber && s.number === sectionNumber
    );

    if (!sectionMetadata) {
      throw new Error(`Metadata for section ${sectionNumber} of paper ${paperNumber} not found`);
    }

    return sectionMetadata;
  }
}
```

### 3.3 Index Service

The Index Service manages content indexes.

#### 3.3.1 Interface

```typescript
interface IndexService {
  // Get content index by publication ID
  getIndex(publicationId: string): Promise<ContentIndex>;

  // Get all available indexes
  getAllIndexes(): Promise<ContentIndex[]>;

  // Refresh indexes (reload from source)
  refreshIndexes(): Promise<void>;
}
```

#### 3.3.2 Implementation

```typescript
class IndexServiceImpl implements IndexService {
  private indexes: Map<string, ContentIndex> = new Map();
  private contentLoader: ContentLoader;

  constructor(contentLoader: ContentLoader) {
    this.contentLoader = contentLoader;
  }

  async getIndex(publicationId: string): Promise<ContentIndex> {
    // Check if index is already loaded
    if (this.indexes.has(publicationId)) {
      return this.indexes.get(publicationId)!;
    }

    // Load index
    const indexPath = `content/index/${publicationId}-index.json`;
    const index = await this.contentLoader.loadJson<ContentIndex>(indexPath);

    // Cache index
    this.indexes.set(publicationId, index);

    return index;
  }

  async getAllIndexes(): Promise<ContentIndex[]> {
    // This could be implemented by scanning the index directory
    // For simplicity, we'll just return a list of known publication IDs
    const publicationIds = ['ub', 'sci'];

    const indexes: ContentIndex[] = [];
    for (const id of publicationIds) {
      indexes.push(await this.getIndex(id));
    }

    return indexes;
  }

  async refreshIndexes(): Promise<void> {
    // Clear cache
    this.indexes.clear();

    // Reload all indexes
    await this.getAllIndexes();
  }
}
```

### 3.4 Content Loader

The Content Loader is responsible for loading content from various sources.

#### 3.4.1 Interface

```typescript
interface ContentLoader {
  // Load JSON content
  loadJson<T>(path: string): Promise<T>;

  // Load text content
  loadText(path: string): Promise<string>;

  // Load binary content
  loadBinary(path: string): Promise<ArrayBuffer>;
}
```

#### 3.4.2 Implementation

```typescript
class JsonContentLoader implements ContentLoader {
  private basePath: string;

  constructor(basePath: string = '') {
    this.basePath = basePath;
  }

  async loadJson<T>(path: string): Promise<T> {
    const fullPath = this.resolvePath(path);
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`Failed to load JSON from ${fullPath}: ${response.statusText}`);
    }

    return response.json();
  }

  async loadText(path: string): Promise<string> {
    const fullPath = this.resolvePath(path);
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`Failed to load text from ${fullPath}: ${response.statusText}`);
    }

    return response.text();
  }

  async loadBinary(path: string): Promise<ArrayBuffer> {
    const fullPath = this.resolvePath(path);
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`Failed to load binary from ${fullPath}: ${response.statusText}`);
    }

    return response.arrayBuffer();
  }

  private resolvePath(path: string): string {
    // If path is already a URL, return it as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // Otherwise, resolve relative to base path
    return `${this.basePath}/${path}`;
  }
}
```

### 3.5 React Hooks

#### 3.5.1 useContent Hook

```typescript
function useContent(publicationId: string = 'ub') {
  const [contentService, setContentService] = useState<ContentService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeService = async () => {
      try {
        setIsLoading(true);

        // Create content loader
        const contentLoader = new JsonContentLoader();

        // Create index service
        const indexService = new IndexServiceImpl(contentLoader);

        // Create content service
        const service = new ContentServiceImpl(contentLoader, indexService);

        // Initialize service
        await service.initialize(publicationId);

        setContentService(service);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    initializeService();
  }, [publicationId]);

  return {
    contentService,
    isLoading,
    error,
  };
}
```

#### 3.5.2 usePaper Hook

```typescript
function usePaper(paperNumber: number, publicationId: string = 'ub') {
  const {
    contentService,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useContent(publicationId);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!contentService || isServiceLoading) {
      return;
    }

    const loadPaper = async () => {
      try {
        setIsLoading(true);
        const loadedPaper = await contentService.getPaper(paperNumber);
        setPaper(loadedPaper);
        setError(null);
      } catch (err) {
        setPaper(null);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    loadPaper();
  }, [contentService, paperNumber, isServiceLoading]);

  return {
    paper,
    isLoading: isServiceLoading || isLoading,
    error: serviceError || error,
  };
}
```

## 4. Implementation Guidelines

### 4.1 Content Organization

1. **Hierarchical Structure**: Organize content in a hierarchical structure (publication > paper > section > paragraph)
2. **Consistent Naming**: Use consistent naming conventions for files and directories
3. **Separation of Content and Metadata**: Keep content and metadata separate
4. **Versioning**: Include version information in content files and indexes

### 4.2 Content Loading

1. **Lazy Loading**: Load content only when needed
2. **Caching**: Cache loaded content to improve performance
3. **Error Handling**: Implement robust error handling for missing or invalid content
4. **Progress Tracking**: Provide progress information for long-loading operations

### 4.3 Content Indexing

1. **Comprehensive Indexes**: Create indexes that provide quick access to content
2. **Search Optimization**: Optimize indexes for search operations
3. **Metadata Integration**: Include metadata in indexes for quick access
4. **Index Versioning**: Version indexes to track changes

### 4.4 Performance Considerations

1. **Minimize File Size**: Keep content files as small as possible
2. **Batch Loading**: Load related content in batches
3. **Background Loading**: Load content in the background when possible
4. **Compression**: Use compression for large content files

## 5. Dependencies

- Fetch API or Axios for content loading
- JSON parser
- Optional: Full-text search library (e.g., Lunr.js, Fuse.js)

## 6. Testing Strategy

1. **Unit Tests**: Test individual services and loaders
2. **Integration Tests**: Test content loading and indexing
3. **Performance Tests**: Test loading times and memory usage
4. **Content Validation**: Validate content structure and format

## 7. Next Steps

1. Create the content directory structure
2. Define the content file formats
3. Create sample content files
4. Implement the content services
5. Create content indexes
6. Develop React hooks for content access
7. Create documentation and examples
