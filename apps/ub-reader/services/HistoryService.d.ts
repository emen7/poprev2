/**
 * History Service
 *
 * This service provides functions for tracking and managing reading history.
 * It uses localStorage to persist history between sessions.
 */
export interface HistoryEntry {
    paperId: number;
    title: string;
    timestamp: number;
}
/**
 * Get the reading history from localStorage
 */
export declare function getHistory(): HistoryEntry[];
/**
 * Add a paper to the reading history
 */
export declare function addToHistory(paperId: number, title: string): void;
/**
 * Clear the reading history
 */
export declare function clearHistory(): void;
/**
 * Get the most recently read papers (up to a specified limit)
 */
export declare function getRecentlyRead(limit?: number): HistoryEntry[];
/**
 * Check if a paper has been read before
 */
export declare function hasBeenRead(paperId: number): boolean;
/**
 * Get the last read paper
 */
export declare function getLastRead(): HistoryEntry | null;
//# sourceMappingURL=HistoryService.d.ts.map