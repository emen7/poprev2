/**
 * Search Model
 *
 * This module defines the search model interfaces for the UB Ecosystem.
 */
/**
 * Search result model interface
 */
export interface SearchResultModel {
  /**
   * Unique identifier for the search result
   */
  id: string;
  /**
   * Publication ID the result belongs to
   */
  publicationId: string;
  /**
   * Publication title
   */
  publicationTitle: string;
  /**
   * Document ID the result belongs to
   */
  documentId: string;
  /**
   * Document title
   */
  documentTitle: string;
  /**
   * Document number
   */
  documentNumber?: number;
  /**
   * Section ID the result belongs to (if applicable)
   */
  sectionId?: string;
  /**
   * Section title (if applicable)
   */
  sectionTitle?: string;
  /**
   * Section number (if applicable)
   */
  sectionNumber?: number | string;
  /**
   * Paragraph ID the result belongs to (if applicable)
   */
  paragraphId?: string;
  /**
   * Paragraph number (if applicable)
   */
  paragraphNumber?: number | string;
  /**
   * Text snippet containing the search match
   */
  snippet: string;
  /**
   * Highlighted version of the snippet with match markers
   */
  highlightedSnippet: string;
  /**
   * Start position of the match in the original text
   */
  matchStartPosition: number;
  /**
   * End position of the match in the original text
   */
  matchEndPosition: number;
  /**
   * Relevance score (higher is more relevant)
   */
  relevance: number;
}
/**
 * Search index model interface
 */
export interface SearchIndexModel {
  /**
   * Unique identifier for the search index
   */
  id: string;
  /**
   * Publication ID this index belongs to
   */
  publicationId: string;
  /**
   * Version of the index
   */
  version: string;
  /**
   * Date the index was created
   */
  createdAt: string;
  /**
   * Date the index was last updated
   */
  updatedAt: string;
  /**
   * Number of documents in the index
   */
  documentCount: number;
  /**
   * Size of the index in bytes
   */
  sizeInBytes: number;
  /**
   * Whether the index includes metadata
   */
  includesMetadata: boolean;
  /**
   * Whether the index supports fuzzy matching
   */
  supportsFuzzyMatching: boolean;
}
/**
 * Search query options interface
 */
export interface SearchOptions {
  /**
   * Publication IDs to search in (if not specified, search all)
   */
  publicationIds?: string[];
  /**
   * Document IDs to search in (if not specified, search all)
   */
  documentIds?: string[];
  /**
   * Section IDs to search in (if not specified, search all)
   */
  sectionIds?: string[];
  /**
   * Whether to include metadata in the search
   */
  includeMetadata?: boolean;
  /**
   * Whether to use fuzzy matching
   */
  fuzzyMatching?: boolean;
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * Result offset for pagination
   */
  startFrom?: number;
  /**
   * Minimum relevance score to include in results
   */
  minRelevance?: number;
  /**
   * Whether to highlight matches in results
   */
  highlightMatches?: boolean;
  /**
   * Marker to use for highlighting match start
   */
  highlightStartMarker?: string;
  /**
   * Marker to use for highlighting match end
   */
  highlightEndMarker?: string;
}
/**
 * Search history entry interface
 */
export interface SearchHistoryEntry {
  /**
   * Unique identifier for the history entry
   */
  id: string;
  /**
   * User ID this history entry belongs to
   */
  userId: string;
  /**
   * Search query text
   */
  query: string;
  /**
   * Search options used
   */
  options?: SearchOptions;
  /**
   * Number of results found
   */
  resultCount: number;
  /**
   * Timestamp of when this search was performed
   */
  timestamp: string;
}
//# sourceMappingURL=SearchModel.d.ts.map
