# Content Directory

This directory contains all the content for the PopRev2 platform, organized by purpose and format.

## Directory Structure

```
content/
├── raw/                         # Raw, untransformed content
│   ├── scientific/              # Scientific articles
│   │   ├── markdown/            # Markdown format
│   │   └── docx/                # DOCX format
│   ├── perplexity/              # Perplexity responses
│   └── lectionary/              # Lectionary articles
└── transformed/                 # (Future) Pre-transformed content
```

## Usage Guidelines

### Adding Content

1. Place raw content files in the appropriate directory based on:

   - **Purpose**: scientific, perplexity, or lectionary
   - **Format**: markdown or docx

2. File naming convention:
   - Use lowercase with hyphens for spaces
   - Include a date prefix for time-sensitive content (YYYY-MM-DD)
   - Example: `2025-03-26-quantum-computing-advances.md`

### Content Requirements

#### Scientific Articles

- Should include proper frontmatter with metadata
- References should be properly formatted
- Images should be placed in a related assets directory

#### Perplexity Responses

- Should include the original question
- May include multiple responses in a thread

#### Lectionary Articles

- Should include scripture references
- May include seasonal information

## Transformation Process

The document transformation system will:

1. Read files from the `raw` directory
2. Transform them into a standardized internal format
3. Extract and enhance metadata
4. Make them available for display through the reader component

## Future Enhancements

In future phases, this directory will also include:

- Pre-transformed content for faster loading
- Additional content categories
- Media assets related to the content
