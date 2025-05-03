/**
 * Types for the UB Highlighting Package
 *
 * This module defines all the types used in the highlighting system,
 * including options, colors, data structures, and component props.
 *
 * @module highlighting/types
 */

/**
 * Options for the HighlightManager constructor
 *
 * @interface HighlightManagerOptions
 * @description Configuration options for initializing the HighlightManager
 * @property {HTMLElement} container - The container element where highlighting will be applied
 * @property {HighlightColor[]} [colors] - Array of color objects for highlighting
 * @property {() => boolean} [isDarkMode] - Function that returns true if dark mode is active
 * @property {(data: HighlightData) => void} [onHighlight] - Callback function when text is highlighted
 * @property {boolean} [showHighlights=true] - Whether to show highlights initially
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
 *
 * @interface HighlightColor
 * @description Defines a color that can be used for highlighting text
 * @property {string} name - Unique identifier for the color
 * @property {string} lightModeColor - CSS color value for light mode (background color)
 * @property {string} darkModeColor - CSS color value for dark mode (text color)
 * @property {string} [displayName] - Human-readable name for the color
 * @property {boolean} [lightModeOnly] - Whether the color is only available in light mode
 * @property {boolean} [darkModeOnly] - Whether the color is only available in dark mode
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
 *
 * @interface HighlightData
 * @description Contains information about a text highlight
 * @property {string} text - The highlighted text content
 * @property {string|null} color - The color name used for the highlight, or null if removed
 * @property {Range} range - The DOM Range object representing the highlighted text
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
 *
 * @interface HighlightProviderProps
 * @description Props for the React component that provides highlighting functionality
 * @property {React.ReactNode} children - The children to render within the provider
 * @property {string} containerSelector - CSS selector for the container element where highlighting will be applied
 * @property {() => boolean} isDarkMode - Function that returns true if dark mode is active
 * @property {HighlightColor[]} [colors] - Array of color objects for highlighting
 * @property {(data: HighlightData) => void} [onHighlight] - Callback function when text is highlighted
 * @property {boolean} [showHighlights=true] - Whether to show highlights initially
 * @property {number} [currentPaper] - Current paper number for context
 * @property {number} [currentSection] - Current section number for context
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
 *
 * @interface HighlightContextValue
 * @description The value provided by the HighlightContext
 * @property {import('./HighlightManager').HighlightManager|null} highlightManager - The underlying highlight manager instance
 * @property {boolean} showHighlights - Whether highlights are currently visible
 * @property {(show: boolean) => void} setShowHighlights - Function to set whether highlights are visible
 * @property {HighlightData[]} highlights - Array of highlight objects
 * @property {(highlight: HighlightData) => void} addHighlight - Function to add a highlight
 * @property {(highlight: HighlightData) => void} removeHighlight - Function to remove a highlight
 */
export interface HighlightContextValue {
  /** The underlying highlight manager instance */
  highlightManager: import('./HighlightManager').HighlightManager | null;
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
 *
 * @interface HighlightStorage
 * @description Format for storing highlights in localStorage or other storage mechanisms
 * @property {number} paperNumber - The paper number where the highlight is located
 * @property {number} sectionNumber - The section number where the highlight is located
 * @property {number} paragraphNumber - The paragraph number where the highlight is located
 * @property {string} text - The highlighted text content
 * @property {string} color - The color name used for the highlight
 * @property {string} timestamp - ISO timestamp when the highlight was created
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
