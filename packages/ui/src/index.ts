/**
 * UB Ecosystem UI Components
 *
 * This is the main entry point for the UI components package.
 * It exports all components, hooks, and utilities for use in applications.
 */

// Layout Components
export {
  ReaderLayout,
  EnhancedReaderLayout,
  ContentContainer,
  SidePanel,
  Header,
  Footer,
  ResponsiveHeader,
  ResponsiveFooter,
  MultiPurposePanel,
  UBReaderLayout,
} from './layout';

// Navigation Components
export {
  TableOfContents,
  Breadcrumbs,
  NavigationControls,
  SectionNavigator,
  StickyHeadersContainer,
} from './navigation';

// Re-export navigation types with namespace to avoid conflicts
import * as NavigationTypes from './navigation';
export { NavigationTypes };

// Content Components
export { ContentRenderer, ParagraphRenderer, SectionRenderer } from './content';

// Re-export content types with namespace to avoid conflicts
import * as ContentTypes from './content';
export { ContentTypes };

// Settings Components
export { FormatToggle } from './settings';

// Hooks
export { useFormatting } from './hooks';

// Re-export types from hooks
export type { FormatType, UseFormattingOptions, UseFormattingResult } from './hooks';

// Scientific Content Components
export {
  ScientificTooltip,
  ScientificContentProcessor,
  ScientificContentProvider,
  useScientificContent,
} from './scientific';

// Re-export scientific types with namespace to avoid conflicts
import * as ScientificTypes from './scientific';
export { ScientificTypes };

// Panel Components
export { NotesPanel } from './panels';

// Re-export panel types with namespace to avoid conflicts
import * as PanelTypes from './panels';
export { PanelTypes };

// Examples
export * from './examples';
