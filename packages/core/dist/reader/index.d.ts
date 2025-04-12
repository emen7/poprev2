/**
 * Reader module for the UB Ecosystem
 */
import type { ReaderContext, ReaderSettings, ReaderProviderProps } from '../types/reader';
import { DEFAULT_READER_SETTINGS } from '../types/reader';
import type { Document } from '../types/document';
export type { ReaderContext, ReaderSettings, ReaderProviderProps };
export { DEFAULT_READER_SETTINGS };
/**
 * Create a reader context value
 */
export declare function createReaderContext(document?: Document | null, settings?: ReaderSettings): ReaderContext;
//# sourceMappingURL=index.d.ts.map