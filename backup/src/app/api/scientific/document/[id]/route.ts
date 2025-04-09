/**
 * Scientific Document API Route
 * 
 * This API route handles requests for scientific documents by ID.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the document interface
interface ScientificDocument {
  id: string;
  title: string;
  content: string;
  contentType: 'markdown' | 'docx' | 'html';
  path: string;
  excerpt?: string;
  metadata: {
    author?: string;
    date?: string;
    categories?: string[];
    tags?: string[];
    [key: string]: any;
  };
  lastUpdated: string;
}

/**
 * GET handler for document API
 * 
 * @param request Next.js request
 * @param params Route parameters
 * @returns Next.js response
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const format = request.nextUrl.searchParams.get('format') || 'html';
    
    // Retrieve document
    const document = await getScientificDocumentById(id);
    
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }
    
    // Transform content based on requested format
    const content = transformScientificContent(document.content, document.contentType, format);
    
    return NextResponse.json({
      document: {
        id: document.id,
        title: document.title,
        content,
        metadata: document.metadata,
        lastUpdated: document.lastUpdated
      }
    });
  } catch (error) {
    console.error('Error retrieving document:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve document' },
      { status: 500 }
    );
  }
}

/**
 * Get a scientific document by ID
 * 
 * @param id Document ID
 * @returns Document or null if not found
 */
async function getScientificDocumentById(id: string): Promise<ScientificDocument | null> {
  try {
    // Decode the ID to get the file path
    const filePath = decodeDocumentId(id);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    // Determine content type from file extension
    const contentType = getContentTypeFromPath(filePath);
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract metadata and content based on content type
    const { metadata, processedContent } = extractMetadataAndContent(content, contentType);
    
    // Create excerpt
    const excerpt = createExcerpt(processedContent);
    
    // Get last updated timestamp
    const stats = fs.statSync(filePath);
    
    return {
      id,
      title: metadata.title || getFilenameFromPath(filePath),
      content: processedContent,
      contentType,
      path: filePath,
      excerpt,
      metadata,
      lastUpdated: stats.mtime.toISOString()
    };
  } catch (error) {
    console.error('Error getting document by ID:', error);
    return null;
  }
}

/**
 * Decode a document ID to get the file path
 * 
 * @param id Document ID
 * @returns File path
 */
function decodeDocumentId(id: string): string {
  // For now, we'll assume the ID is a base64-encoded file path
  // In a production environment, you might want to use a more secure method
  try {
    return Buffer.from(id, 'base64').toString('utf-8');
  } catch (error) {
    console.error('Error decoding document ID:', error);
    return id; // Return the original ID if decoding fails
  }
}

/**
 * Get content type from file path
 * 
 * @param filePath File path
 * @returns Content type
 */
function getContentTypeFromPath(filePath: string): 'markdown' | 'docx' | 'html' {
  const extension = path.extname(filePath).toLowerCase();
  
  switch (extension) {
    case '.md':
    case '.markdown':
      return 'markdown';
    case '.docx':
      return 'docx';
    case '.html':
    case '.htm':
      return 'html';
    default:
      // Default to markdown for unknown extensions
      return 'markdown';
  }
}

/**
 * Extract metadata and content from a file
 * 
 * @param content File content
 * @param contentType Content type
 * @returns Metadata and processed content
 */
function extractMetadataAndContent(
  content: string,
  contentType: 'markdown' | 'docx' | 'html'
): { metadata: any; processedContent: string } {
  switch (contentType) {
    case 'markdown':
      return extractMetadataFromMarkdown(content);
    case 'docx':
      // For now, return empty metadata and the original content
      // In a production environment, you would parse the DOCX file
      return { metadata: {}, processedContent: content };
    case 'html':
      // For now, return empty metadata and the original content
      // In a production environment, you would parse the HTML file
      return { metadata: {}, processedContent: content };
    default:
      return { metadata: {}, processedContent: content };
  }
}

/**
 * Extract metadata from markdown content
 * 
 * @param content Markdown content
 * @returns Metadata and processed content
 */
function extractMetadataFromMarkdown(content: string): { metadata: any; processedContent: string } {
  // Check for frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const processedContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    // Parse frontmatter
    const metadata: any = {};
    
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*(.*)/);
      
      if (match) {
        const [, key, value] = match;
        metadata[key] = value;
      }
    });
    
    return { metadata, processedContent };
  }
  
  // If no frontmatter, try to extract title from first heading
  const headingMatch = content.match(/^#+\s+(.*?)$/m);
  
  if (headingMatch) {
    const title = headingMatch[1].trim();
    return { metadata: { title }, processedContent: content };
  }
  
  // If no heading, return empty metadata and the original content
  return { metadata: {}, processedContent: content };
}

/**
 * Get filename from path
 * 
 * @param filePath File path
 * @returns Filename without extension
 */
function getFilenameFromPath(filePath: string): string {
  const basename = path.basename(filePath);
  const filename = basename.replace(/\.[^/.]+$/, ''); // Remove extension
  
  // Convert kebab-case to title case
  return filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Create an excerpt from content
 * 
 * @param content Content
 * @param maxLength Maximum length of excerpt
 * @returns Excerpt
 */
function createExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#+\s+(.*?)$/gm, '$1') // Remove headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Remove images
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  // Truncate to maxLength
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last space before maxLength
  const lastSpace = plainText.lastIndexOf(' ', maxLength);
  
  if (lastSpace === -1) {
    return plainText.substring(0, maxLength) + '...';
  }
  
  return plainText.substring(0, lastSpace) + '...';
}

/**
 * Transform scientific content to the requested format
 * 
 * @param content Content
 * @param contentType Content type
 * @param format Requested format
 * @returns Transformed content
 */
function transformScientificContent(
  content: string,
  contentType: 'markdown' | 'docx' | 'html',
  format: string
): string {
  // For now, we'll just return the original content
  // In a production environment, you would transform the content to the requested format
  return content;
}