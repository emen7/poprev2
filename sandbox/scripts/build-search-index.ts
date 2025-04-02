/**
 * Build Search Index Script
 * 
 * This script generates a search index from all documents in the content directory.
 * It's meant to be run during the build process.
 */

import fs from 'fs';
import path from 'path';
import { transformDocument } from '../lib/document-transformer';
import { buildSearchIndex } from '../lib/search/indexer';
import type { SearchableDocument } from '../lib/search/indexer';

// Content directories to index
const CONTENT_DIRECTORIES = [
  { path: 'content/posts', type: 'post' },
  { path: 'src/content/scientific/markdown', type: 'scientific' },
  { path: 'src/content/scientific/docx', type: 'scientific' },
  { path: 'src/content/perplexity', type: 'perplexity' },
  { path: 'src/content/lectionary', type: 'lectionary' }
];

/**
 * Get all content files in a directory recursively
 *
 * @param dir Directory to search
 * @returns Array of file paths
 */
function getContentFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory does not exist: ${dir}`);
    return [];
  }

  const files: string[] = [];
  
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
 * Get document type from file path
 * 
 * @param filePath File path
 * @returns Document type
 */
function getDocumentType(filePath: string): 'post' | 'scientific' | 'perplexity' | 'lectionary' {
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
 * Generate a document ID from file path
 *
 * @param filePath File path
 * @returns Document ID
 */
function generateDocumentId(filePath: string): string {
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
 * @param filePath File path
 * @returns Relative path
 */
function getRelativePath(filePath: string): string {
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
 * Main function to generate search index
 */
async function generateSearchIndex(): Promise<void> {
  try {
    console.log('Generating search index...');
    
    // Get all content files
    let allFiles: string[] = [];
    
    for (const dir of CONTENT_DIRECTORIES) {
      const dirPath = path.join(process.cwd(), dir.path);
      const files = getContentFiles(dirPath);
      allFiles.push(...files);
    }
    
    console.log(`Found ${allFiles.length} markdown files`);
    
    // Transform documents
    const documents = await Promise.all(
      allFiles.map(async (filePath) => {
        try {
          // Determine document type based on file extension
          const fileExtension = path.extname(filePath).toLowerCase();
          const documentType = fileExtension === '.md' ? 'markdown' : 'docx';
          
          // Read file content
          let content: string | Buffer;
          if (documentType === 'markdown') {
            content = fs.readFileSync(filePath, 'utf-8');
          } else {
            content = fs.readFileSync(filePath);
          }
          
          // Transform document
          const transformed = await transformDocument(content, documentType as any, {
            extractMetadata: true
          });
          
          return {
            ...transformed,
            id: generateDocumentId(filePath),
            path: getRelativePath(filePath),
            type: getDocumentType(filePath)
          };
        } catch (error) {
          console.error(`Error transforming document: ${filePath}`, error);
          return null;
        }
      })
    );
    
    // Filter out failed transformations
    const validDocuments = documents.filter(Boolean);
    
    console.log(`Successfully transformed ${validDocuments.length} documents`);
    
    // Build search index
    const searchIndex = await buildSearchIndex(validDocuments);
    
    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write search index to file
    const outputPath = path.join(publicDir, 'search-index.json');
    fs.writeFileSync(outputPath, JSON.stringify(searchIndex));
    
    console.log(`Search index generated with ${searchIndex.length} documents`);
    console.log(`Search index written to: ${outputPath}`);
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

// Run the script
generateSearchIndex().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});