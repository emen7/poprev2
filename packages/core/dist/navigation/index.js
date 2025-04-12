/**
 * Navigation module for the UB Ecosystem
 */
// This is a placeholder for future implementation
// The actual implementation will be added in subsequent tasks
/**
 * Create a new navigation state
 */
export function createNavigationState(documentId = null, currentSectionIndex = 0, currentParagraphIndex = 0) {
    return {
        document: null,
        currentSectionIndex,
        currentParagraphIndex,
        history: [],
        historyIndex: -1,
    };
}
/**
 * Create a new navigation history entry
 */
export function createNavigationHistoryEntry(documentId, sectionIndex, paragraphIndex) {
    return {
        documentId,
        sectionIndex,
        paragraphIndex,
        timestamp: Date.now(),
    };
}
/**
 * Create a new navigation position
 */
export function createNavigationPosition(documentId, sectionIndex, paragraphIndex) {
    return {
        documentId,
        sectionIndex,
        paragraphIndex,
    };
}
//# sourceMappingURL=index.js.map