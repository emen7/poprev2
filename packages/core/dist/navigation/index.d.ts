/**
 * Navigation module for the UB Ecosystem
 */
import { NavigationState, NavigationHistoryEntry, NavigationPosition, NavigationService } from '../types/navigation';
export type { NavigationState, NavigationHistoryEntry, NavigationPosition, NavigationService };
/**
 * Create a new navigation state
 */
export declare function createNavigationState(documentId?: string | null, currentSectionIndex?: number, currentParagraphIndex?: number): NavigationState;
/**
 * Create a new navigation history entry
 */
export declare function createNavigationHistoryEntry(documentId: string, sectionIndex: number, paragraphIndex: number): NavigationHistoryEntry;
/**
 * Create a new navigation position
 */
export declare function createNavigationPosition(documentId: string, sectionIndex: number, paragraphIndex: number): NavigationPosition;
//# sourceMappingURL=index.d.ts.map