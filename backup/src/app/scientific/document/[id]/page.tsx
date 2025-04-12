/**
 * Scientific Document Viewer Page
 *
 * This page displays a scientific document retrieved by ID.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';

// Define the document interface
interface ScientificDocument {
  id: string;
  title: string;
  content: string;
  metadata: {
    author?: string;
    date?: string;
    categories?: string[];
    tags?: string[];
    [key: string]: any;
  };
  lastUpdated: string;
}

// Define the page props
interface ScientificDocumentPageProps {
  params: {
    id: string;
  };
}

/**
 * Scientific document page component
 *
 * @param props Component props
 * @returns React component
 */
export default async function ScientificDocumentPage({ params }: ScientificDocumentPageProps) {
  // Await params to fix the "params should be awaited" error
  const { id } = await params;

  // Fetch document
  const document = await fetchScientificDocument(id);

  // If document not found, show 404 page
  if (!document) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <Link href="/scientific" className="text-blue-600 hover:underline">
              Scientific
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-500">{document.title}</span>
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">{document.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
          {document.metadata.author && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{document.metadata.author}</span>
            </div>
          )}

          {document.metadata.date && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDate(document.metadata.date)}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Updated {formatRelativeTime(document.lastUpdated)}</span>
          </div>
        </div>

        {document.metadata.tags && document.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {document.metadata.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:flex-1">
          <ScientificDocumentRenderer content={document.content} />
        </main>

        <aside className="lg:w-64 shrink-0 order-first lg:order-last">
          <div className="sticky top-8">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Table of Contents</h3>
              <TableOfContents content={document.content} />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Related Documents</h3>
              <RelatedDocuments documentId={id} />
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-12 pt-4 border-t border-gray-200">
        <Link
          href="/search?type=scientific"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Search
        </Link>
      </footer>
    </div>
  );
}

/**
 * Fetch a scientific document by ID
 *
 * @param id Document ID
 * @returns Document or null if not found
 */
async function fetchScientificDocument(id: string): Promise<ScientificDocument | null> {
  try {
    // In a production environment, you would use a more robust approach
    // for handling API URLs, such as environment variables
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    // Encode the ID properly for use in a URL
    // We need to use encodeURIComponent to ensure special characters are properly handled
    const encodedId = encodeURIComponent(id);

    // Make the API request
    const response = await fetch(`${baseUrl}/api/scientific/document/${encodedId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }

      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    const data = await response.json();
    return data.document;
  } catch (error) {
    console.error('Error fetching document:', error);

    // For now, return a mock document for testing
    // This will be removed once the API is working properly
    return {
      id,
      title: 'Sample Scientific Document',
      content:
        'This is a sample scientific document content.\n\n## Introduction\n\nThis is the introduction section.\n\n## Methods\n\nThis is the methods section.\n\n## Results\n\nThis is the results section.\n\n## Discussion\n\nThis is the discussion section.',
      metadata: {
        author: 'Sample Author',
        date: new Date().toISOString(),
        tags: ['sample', 'test', 'science'],
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Format a date string
 *
 * @param dateString Date string
 * @returns Formatted date
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Format a relative time string
 *
 * @param dateString Date string
 * @returns Formatted relative time
 */
function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
  } catch (error) {
    return 'recently';
  }
}

/**
 * Scientific document renderer component
 *
 * @param props Component props
 * @returns React component
 */
function ScientificDocumentRenderer({ content }: { content: string }) {
  // For now, we'll just render the content as pre-formatted text
  // In a production environment, you would use a markdown renderer
  // such as react-markdown with plugins for math and syntax highlighting
  return (
    <div className="prose prose-lg max-w-none">
      <pre className="whitespace-pre-wrap">{content}</pre>
    </div>
  );
}

/**
 * Table of contents component
 *
 * @param props Component props
 * @returns React component
 */
function TableOfContents({ content }: { content: string }) {
  // Extract headings from content
  const headings = extractHeadings(content);

  if (headings.length === 0) {
    return <p className="text-sm text-gray-500">No table of contents available</p>;
  }

  return (
    <nav>
      <ul className="space-y-1 text-sm">
        {headings.map((heading, index) => (
          <li key={index} style={{ marginLeft: `${(heading.level - 1) * 0.5}rem` }}>
            <a
              href={`#${heading.id}`}
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Extract headings from content
 *
 * @param content Content
 * @returns Headings
 */
function extractHeadings(content: string): Array<{ level: number; text: string; id: string }> {
  // Extract headings from markdown content
  // This is a simple implementation that doesn't handle all markdown cases
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Related documents component
 *
 * @param props Component props
 * @returns React component
 */
function RelatedDocuments({ documentId }: { documentId: string }) {
  // For now, we'll just show a placeholder
  // In a production environment, you would fetch related documents
  return (
    <div className="text-sm text-gray-500">
      <p>Related documents will be shown here</p>
    </div>
  );
}
