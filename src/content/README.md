# Content Directory

This directory contains all the content for the PopRev2 platform, organized by purpose and format.

## Directory Structure

```
content/
├── raw/                         # Raw, untransformed content
│   ├── scientific/              # Scientific articles
│   │   ├── markdown/            # Markdown format
│   │   └── docx/                # DOCX format
│   ├── lectionary/              # Lectionary articles
│   │   ├── markdown/            # Markdown format
│   │   └── docx/                # DOCX format
│   ├── ubgems/                  # UB Gems articles
│   │   ├── markdown/            # Markdown format
│   │   └── docx/                # DOCX format
│   └── ubcatechism/             # UB Catechism articles
│       ├── markdown/            # Markdown format
│       └── docx/                # DOCX format
└── processed/                   # Processed content for web/download
    ├── scientific/              # Processed scientific content
    ├── lectionary/              # Processed lectionary content
    ├── ubgems/                  # Processed UB Gems content
    └── ubcatechism/             # Processed UB Catechism content
```

## Usage Guidelines

### Adding Content

1. Place raw content files in the appropriate directory based on:

   - **Purpose**: scientific, lectionary, ubgems, or ubcatechism
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

#### Lectionary Articles

- Should include scripture references
- May include seasonal information

#### UB Gems Articles

- Should include source information (paper number, section)
- Should include proper frontmatter with metadata
- References should be properly formatted

#### UB Catechism Articles

- Should include question number and topic
- Should include proper frontmatter with metadata

## Transformation Process

The document transformation system will:

1. Read files from the `raw` directory
2. Transform them into a standardized internal format
3. Extract and enhance metadata
4. Store processed versions in the `processed` directory
5. Make them available for display through the reader component

## Processed Content

The `processed` directory contains web-optimized and download-ready versions of the content:

- Web-optimized content for faster loading
- Download-ready formats (PDF, DOCX, etc.)
- Content with enhanced metadata and formatting

## Future Enhancements

In future phases, this directory structure will be further enhanced with:

- Automated processing pipelines
- Version control for content revisions
- Advanced search indexing
- Media assets management
