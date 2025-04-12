import React, { useState } from 'react';

import { useUBContent } from '../hooks/useUBContent';
import { UBContentItem, UBParagraph, UBPaper, UBSection, UBPart } from '../types/ub-content.types';

// CSS styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold' as const,
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  loadingMessage: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    textAlign: 'center' as const,
  },
  errorMessage: {
    padding: '20px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  metadataSection: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  metadataTitle: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    marginBottom: '10px',
  },
  metadataItem: {
    display: 'flex',
    marginBottom: '5px',
  },
  metadataLabel: {
    fontWeight: 'bold' as const,
    width: '150px',
  },
  metadataValue: {
    flex: 1,
  },
  searchSection: {
    marginBottom: '20px',
  },
  searchInput: {
    padding: '8px',
    width: '100%',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  searchResults: {
    marginTop: '20px',
  },
  searchResultItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #eee',
  },
  searchResultTitle: {
    fontWeight: 'bold' as const,
    marginBottom: '5px',
  },
  searchResultType: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '5px',
  },
  searchResultContent: {
    fontSize: '14px',
  },
  contentSection: {
    marginBottom: '20px',
  },
  contentSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    marginBottom: '10px',
  },
  partsList: {
    listStyle: 'none',
    padding: 0,
  },
  partItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f7ff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  paperItem: {
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#e3f2fd',
    borderRadius: '4px',
    marginLeft: '20px',
    cursor: 'pointer',
  },
  sectionItem: {
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#e8f5e9',
    borderRadius: '4px',
    marginLeft: '40px',
    cursor: 'pointer',
  },
  paragraphItem: {
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#fff8e1',
    borderRadius: '4px',
    marginLeft: '60px',
  },
  referenceInput: {
    padding: '8px',
    width: '200px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loadButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

/**
 * Type guard for UBPart
 */
function isUBPart(item: UBContentItem): item is UBPart {
  return item.type === 'part';
}

/**
 * Type guard for UBPaper
 */
function isUBPaper(item: UBContentItem): item is UBPaper {
  return item.type === 'paper';
}

/**
 * Type guard for UBSection
 */
function isUBSection(item: UBContentItem): item is UBSection {
  return item.type === 'section';
}

/**
 * Type guard for UBParagraph
 */
function isUBParagraph(item: UBContentItem): item is UBParagraph {
  return item.type === 'paragraph';
}

/**
 * Get the title of a content item based on its type
 */
function getContentItemTitle(item: UBContentItem): string {
  if (isUBPart(item)) {
    return item.partTitle;
  } else if (isUBPaper(item)) {
    return item.paperTitle;
  } else if (isUBSection(item)) {
    return `${item.paperTitle} - ${item.sectionTitle || 'Untitled Section'}`;
  } else if (isUBParagraph(item)) {
    return `${item.paperTitle} - ${item.sectionTitle || 'Untitled Section'}`;
  }
  return 'Unknown Item';
}

/**
 * Get the reference of a content item if available
 */
function getContentItemReference(item: UBContentItem): string | null {
  if (isUBPaper(item) || isUBSection(item) || isUBParagraph(item)) {
    return item.standardReferenceId;
  }
  return null;
}

/**
 * Example component demonstrating the use of the UBContentService and useUBContent hook
 */
export function UBContentExample() {
  const {
    content,
    metadata,
    isLoading,
    error,
    loadContent,
    getPart,
    getPaper,
    getSection,
    getParagraph,
    getParagraphByReference,
    search,
  } = useUBContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UBContentItem[]>([]);
  const [referenceInput, setReferenceInput] = useState('');
  const [referencedParagraph, setReferencedParagraph] = useState<UBParagraph | null>(null);

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = search(searchQuery);
      setSearchResults(results);
    }
  };

  // Handle reference lookup
  const handleReferenceLookup = () => {
    if (referenceInput.trim()) {
      const paragraph = getParagraphByReference(referenceInput);
      setReferencedParagraph(paragraph);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Loading UB content...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>
          <h3>Error loading UB content</h3>
          <p>{error.message}</p>
          <button style={styles.loadButton} onClick={loadContent}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Urantia Book Content Example</h1>
        <p style={styles.subtitle}>
          This example demonstrates the use of the UBContentService and useUBContent hook.
        </p>
      </div>

      {/* Metadata Section */}
      {metadata && (
        <div style={styles.metadataSection}>
          <h2 style={styles.metadataTitle}>Content Metadata</h2>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>Total Parts:</span>
            <span style={styles.metadataValue}>{metadata.totalParts}</span>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>Total Papers:</span>
            <span style={styles.metadataValue}>{metadata.totalPapers}</span>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>Total Sections:</span>
            <span style={styles.metadataValue}>{metadata.totalSections}</span>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>Total Paragraphs:</span>
            <span style={styles.metadataValue}>{metadata.totalParagraphs}</span>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>Last Updated:</span>
            <span style={styles.metadataValue}>
              {new Date(metadata.lastUpdated).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Reference Lookup Section */}
      <div style={styles.searchSection}>
        <h2 style={styles.contentSectionTitle}>Reference Lookup</h2>
        <div>
          <input
            type="text"
            placeholder="Enter reference (e.g., 1:1.2)"
            value={referenceInput}
            onChange={e => setReferenceInput(e.target.value)}
            style={styles.referenceInput}
          />
          <button style={styles.loadButton} onClick={handleReferenceLookup}>
            Lookup
          </button>
        </div>

        {referencedParagraph && (
          <div style={styles.searchResults}>
            <h3>Referenced Paragraph</h3>
            <div style={styles.paragraphItem}>
              <div style={styles.searchResultTitle}>
                {referencedParagraph.paperTitle} - {referencedParagraph.sectionTitle}
              </div>
              <div style={styles.searchResultType}>
                Reference: {referencedParagraph.standardReferenceId}
              </div>
              <div style={styles.searchResultContent}>{referencedParagraph.text}</div>
            </div>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div style={styles.searchSection}>
        <h2 style={styles.contentSectionTitle}>Search</h2>
        <div>
          <input
            type="text"
            placeholder="Enter search query"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div style={styles.searchResults}>
            <h3>Search Results ({searchResults.length})</h3>
            {searchResults.map((result, index) => (
              <div key={index} style={styles.searchResultItem}>
                <div style={styles.searchResultTitle}>{getContentItemTitle(result)}</div>
                <div style={styles.searchResultType}>
                  Type: {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  {getContentItemReference(result) &&
                    ` | Reference: ${getContentItemReference(result)}`}
                </div>
                <div style={styles.searchResultContent}>{result.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Browser Section */}
      {content && (
        <div style={styles.contentSection}>
          <h2 style={styles.contentSectionTitle}>Content Browser</h2>
          <ul style={styles.partsList}>
            {content.parts.map(part => (
              <li key={part.part.partId} style={styles.partItem}>
                <div>
                  <strong>Part {part.part.partId}:</strong> {part.part.partTitle}
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {part.papers.map(paper => (
                    <li key={paper.paper.paperId} style={styles.paperItem}>
                      <div>
                        <strong>Paper {paper.paper.paperId}:</strong> {paper.paper.paperTitle}
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {paper.sections.map(section => (
                          <li key={section.section.sectionId} style={styles.sectionItem}>
                            <div>
                              <strong>Section {section.section.sectionId}:</strong>{' '}
                              {section.section.sectionTitle}
                            </div>
                            {/* We don't render all paragraphs by default to avoid overwhelming the UI */}
                            <div>{section.paragraphs.length} paragraphs (click to expand)</div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Load Content Button (if not loaded) */}
      {!content && (
        <button style={styles.loadButton} onClick={loadContent}>
          Load UB Content
        </button>
      )}
    </div>
  );
}
