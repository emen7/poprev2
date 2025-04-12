export type FormatType = 'traditional' | 'modern';
export interface UseFormattingOptions {
  /**
   * Default format type
   * @default 'traditional'
   */
  defaultFormat?: FormatType;
  /**
   * Storage key for persisting format preference
   * @default 'ub-reader-format'
   */
  storageKey?: string;
  /**
   * Whether to persist format preference in localStorage
   * @default true
   */
  persistPreference?: boolean;
}
export interface UseFormattingResult {
  /**
   * Current format type
   */
  formatType: FormatType;
  /**
   * Function to change the format type
   */
  setFormatType: (format: FormatType) => void;
  /**
   * Function to toggle between traditional and modern formats
   */
  toggleFormat: () => void;
  /**
   * Whether the current format is traditional
   */
  isTraditional: boolean;
  /**
   * Whether the current format is modern
   */
  isModern: boolean;
}
/**
 * useFormatting Hook
 *
 * A hook for managing content formatting preferences.
 * Supports persistence in localStorage and provides convenient helpers.
 */
export declare function useFormatting({
  defaultFormat,
  storageKey,
  persistPreference,
}?: UseFormattingOptions): UseFormattingResult;
export default useFormatting;
//# sourceMappingURL=useFormatting.d.ts.map
