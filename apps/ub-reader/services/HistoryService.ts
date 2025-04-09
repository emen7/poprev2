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

const HISTORY_KEY = 'ub-reader-history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Get the reading history from localStorage
 */
export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (!historyJson) {
      return [];
    }

    return JSON.parse(historyJson);
  } catch (error) {
    console.error('Error retrieving history:', error);
    return [];
  }
}

/**
 * Add a paper to the reading history
 */
export function addToHistory(paperId: number, title: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const history = getHistory();

    // Check if this paper is already the most recent in history
    if (history.length > 0 && history[0].paperId === paperId) {
      // Just update the timestamp
      history[0].timestamp = Date.now();
    } else {
      // Remove any existing entries for this paper
      const filteredHistory = history.filter(entry => entry.paperId !== paperId);

      // Add the new entry at the beginning
      filteredHistory.unshift({
        paperId,
        title,
        timestamp: Date.now(),
      });

      // Limit the history size
      if (filteredHistory.length > MAX_HISTORY_ITEMS) {
        filteredHistory.pop();
      }

      // Save the updated history
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
    }
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

/**
 * Clear the reading history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

/**
 * Get the most recently read papers (up to a specified limit)
 */
export function getRecentlyRead(limit: number = 5): HistoryEntry[] {
  const history = getHistory();
  return history.slice(0, limit);
}

/**
 * Check if a paper has been read before
 */
export function hasBeenRead(paperId: number): boolean {
  const history = getHistory();
  return history.some(entry => entry.paperId === paperId);
}

/**
 * Get the last read paper
 */
export function getLastRead(): HistoryEntry | null {
  const history = getHistory();
  return history.length > 0 ? history[0] : null;
}
