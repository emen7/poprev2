/**
 * Types for the UB Highlighting Package
 */

/**
 * Options for the HighlightManager constructor
 */
export interface HighlightManagerOptions {
  /** The container element where highlighting will be applied */
  container: HTMLElement;
  /** Array of color objects */
  colors?: HighlightColor[];
  /** Function that returns true if dark mode is active */
  isDarkMode?: () => boolean;
  /** Callback function when text is highlighted */
  onHighlight?: (data: HighlightData) => void;
  /** Whether to show highlights */
  showHighlights?: boolean;
}

/**
 * Color object for highlighting
 */
export interface HighlightColor {
  /** Unique name for the color */
  name: string;
  /** CSS color value for light mode (background color) */
  lightModeColor: string;
  /** CSS color value for dark mode (text color) */
  darkModeColor: string;
  /** Display name for the color (optional) */
  displayName?: string;
  /** Whether the color is only available in light mode */
  lightModeOnly?: boolean;
  /** Whether the color is only available in dark mode */
  darkModeOnly?: boolean;
}

/**
 * Data for a highlight
 */
export interface HighlightData {
  /** The highlighted text */
  text: string;
  /** The color name, or null if the highlight was removed */
  color: string | null;
  /** The DOM Range object for the highlight */
  range: Range;
}

/**
 * Props for the HighlightProvider component
 */
export interface HighlightProviderProps {
  /** The children to render */
  children: React.ReactNode;
  /** CSS selector for the container element */
  containerSelector: string;
  /** Function that returns true if dark mode is active */
  isDarkMode: () => boolean;
  /** Array of color objects (optional) */
  colors?: HighlightColor[];
  /** Callback function when text is highlighted (optional) */
  onHighlight?: (data: HighlightData) => void;
  /** Whether to show highlights (optional) */
  showHighlights?: boolean;
  /** Current paper number (optional) */
  currentPaper?: number;
  /** Current section number (optional) */
  currentSection?: number;
}

/**
 * Context for the highlighting system
 */
export interface HighlightContextValue {
  /** The underlying highlight manager instance */
  highlightManager: any | null;
  /** Whether highlights are currently visible */
  showHighlights: boolean;
  /** Function to set whether highlights are visible */
  setShowHighlights: (show: boolean) => void;
  /** Array of highlight objects */
  highlights: HighlightData[];
  /** Function to add a highlight */
  addHighlight: (highlight: HighlightData) => void;
  /** Function to remove a highlight */
  removeHighlight: (highlight: HighlightData) => void;
}

/**
 * Storage format for highlights
 */
export interface HighlightStorage {
  /** Paper number */
  paperNumber: number;
  /** Section number */
  sectionNumber: number;
  /** Paragraph number */
  paragraphNumber: number;
  /** The highlighted text */
  text: string;
  /** The color name */
  color: string;
  /** Timestamp when the highlight was created */
  timestamp: string;
}
