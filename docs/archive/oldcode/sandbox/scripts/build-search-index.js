/**
 * Build Search Index Script (JavaScript version)
 *
 * This script generates a search index from all documents in the content directory.
 * It's meant to be run during the build process.
 */

const fs = require('fs');
const path = require('path');

// Content directories to index
const CONTENT_DIRECTORIES = [
  { path: 'content/posts', type: 'post' },
  { path: '../src/content/scientific/markdown', type: 'scientific' },
  { path: '../src/content/scientific/docx', type: 'scientific' },
  { path: '../src/content/perplexity', type: 'perplexity' },
  { path: '../src/content/lectionary', type: 'lectionary' },
];

/**
 * Get all content files in a directory recursively
 *
 * @param {string} dir Directory to search
 * @returns {string[]} Array of file paths
 */
function getContentFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory does not exist: ${dir}`);
    return [];
  }

  const files = [];

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      files.push(...getContentFiles(itemPath));
    } else if (item.isFile() && (item.name.endsWith('.md') || item.name.endsWith('.docx'))) {
      files.push(itemPath);
    }
  }

  return files;
}

/**
 * Generate a document ID from file path
 *
 * @param {string} filePath File path
 * @returns {string} Document ID
 */
function generateDocumentId(filePath) {
  // Remove extension and convert to URL-friendly format
  return filePath
    .replace(/\\/g, '/')
    .replace(/^content\//, '')
    .replace(/^src\/content\//, '')
    .replace(/^src\/src\/content\//, '') // Handle old path structure for backward compatibility
    .replace(/\.md$/, '')
    .replace(/\.docx$/, '')
    .replace(/[^a-zA-Z0-9-_/]/g, '-');
}

/**
 * Get relative path for document
 *
 * @param {string} filePath File path
 * @returns {string} Relative path
 */
function getRelativePath(filePath) {
  // Get path relative to content directory
  let relativePath = filePath.replace(/\\/g, '/');

  // Handle different directory structures
  relativePath = relativePath
    .replace(/^content\//, '')
    .replace(/^src\/content\//, '')
    .replace(/^src\/src\/content\//, '') // Handle old path structure for backward compatibility
    .replace(/^raw\//, '');

  return relativePath;
}

/**
 * Get document type from file path
 *
 * @param {string} filePath File path
 * @returns {string} Document type
 */
function getDocumentType(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();

  if (normalizedPath.includes('scientific')) {
    return 'scientific';
  }

  if (normalizedPath.includes('perplexity')) {
    return 'perplexity';
  }

  if (normalizedPath.includes('lectionary')) {
    return 'lectionary';
  }

  return 'post';
}

/**
 * Extract text content from a markdown file
 *
 * @param {string} filePath File path
 * @returns {string} Extracted text
 */
function extractTextFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Remove frontmatter (handle both standard and non-standard formats)
    let contentWithoutFrontmatter = content;

    // Standard frontmatter format
    contentWithoutFrontmatter = contentWithoutFrontmatter.replace(/^---[\s\S]*?---/, '');

    // Remove Perplexity AI header if present
    contentWithoutFrontmatter = contentWithoutFrontmatter.replace(
      /<img src="https:\/\/r2cdn\.perplexity\.ai\/.*?<\/div>/,
      ''
    );

    // Remove markdown formatting (basic)
    return contentWithoutFrontmatter
      .replace(/#+\s+(.*)/g, '$1') // Headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Images
      .replace(/`{3}[\s\S]*?`{3}/g, '') // Code blocks
      .replace(/`(.*?)`/g, '$1') // Inline code
      .replace(/\n+/g, ' ') // Newlines
      .replace(/\s+/g, ' ') // Extra whitespace
      .trim();
  } catch (error) {
    console.error(`Error extracting text from markdown: ${filePath}`, error);
    return '';
  }
}

/**
 * Extract metadata from a markdown file
 *
 * @param {string} filePath File path
 * @returns {Object} Extracted metadata
 */
function extractMetadataFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Try to extract standard frontmatter
    let frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    // If no standard frontmatter, try to extract title from headings
    if (!frontmatterMatch) {
      // Try to find a meaningful heading (ignoring empty headings or just "---")
      const headingMatches = content.match(/^#\s+(.*?)$/gm);
      if (headingMatches) {
        for (const match of headingMatches) {
          const title = match.replace(/^#\s+/, '').trim();
          if (title && title !== '---' && title.length > 1) {
            return { title };
          }
        }
      }

      // Try to find a heading after the Perplexity header
      const perplexityContent = content.replace(
        /<img src="https:\/\/r2cdn\.perplexity\.ai\/.*?<\/div>/s,
        ''
      );
      const perplexityHeadingMatches = perplexityContent.match(/^#\s+(.*?)$/gm);
      if (perplexityHeadingMatches) {
        for (const match of perplexityHeadingMatches) {
          const title = match.replace(/^#\s+/, '').trim();
          if (title && title !== '---' && title.length > 1) {
            return { title };
          }
        }
      }

      // If all else fails, use the filename
      return {
        title: path
          .basename(filePath, path.extname(filePath))
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase()),
      };
    }

    if (!frontmatterMatch) {
      return {
        title: path.basename(filePath, path.extname(filePath)),
      };
    }

    const frontmatter = frontmatterMatch[1];
    const metadata = {};

    // Parse frontmatter
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/^(.*?):\s*(.*)/);
      if (match) {
        const [, key, value] = match;
        metadata[key.trim()] = value.trim();
      }
    });

    // If no title, use filename
    if (!metadata.title) {
      metadata.title = path.basename(filePath, path.extname(filePath));
    }

    return metadata;
  } catch (error) {
    console.error(`Error extracting metadata from markdown: ${filePath}`, error);
    return {
      title: path.basename(filePath, path.extname(filePath)),
    };
  }
}

/**
 * Generate a search index from content files
 */
async function generateSearchIndex() {
  try {
    console.log('Generating search index...');

    // Get all content files
    let allFiles = [];

    for (const dir of CONTENT_DIRECTORIES) {
      const dirPath = path.join(process.cwd(), dir.path);
      const files = getContentFiles(dirPath);
      allFiles.push(...files);
    }

    console.log(`Found ${allFiles.length} content files`);

    // Process files
    const searchableDocuments = allFiles
      .map(filePath => {
        try {
          const fileExtension = path.extname(filePath).toLowerCase();

          // For now, only process markdown files
          if (fileExtension === '.md') {
            const metadata = extractMetadataFromMarkdown(filePath);
            const content = extractTextFromMarkdown(filePath);
            const excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');

            return {
              id: generateDocumentId(filePath),
              title: metadata.title || '',
              content: content,
              excerpt: excerpt,
              type: getDocumentType(filePath),
              metadata: metadata,
              path: getRelativePath(filePath),
              lastUpdated: metadata.date || new Date().toISOString(),
            };
          }

          // Skip other file types for now
          console.log(`Skipping non-markdown file: ${filePath}`);
          return null;
        } catch (error) {
          console.error(`Error processing file: ${filePath}`, error);
          return null;
        }
      })
      .filter(doc => doc !== null);

    console.log(`Successfully processed ${searchableDocuments.length} documents`);

    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write search index to file
    const outputPath = path.join(publicDir, 'search-index.json');
    fs.writeFileSync(outputPath, JSON.stringify(searchableDocuments));

    console.log(`Search index generated with ${searchableDocuments.length} documents`);
    console.log(`Search index written to: ${outputPath}`);
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

// Run the script
generateSearchIndex().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
