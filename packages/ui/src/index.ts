/**
 * UB Ecosystem UI Components
 *
 * This is the main entry point for the UI components package.
 * It exports all components, hooks, and utilities for use in applications.
 *
 * Includes accessibility utilities, layout components, navigation, content rendering,
 * and specialized components for the UB Reader application.
 */

// Layout Components
export { ThreeRowHeader, HeaderRow, DynamicSectionTitle } from './layout';
// Navigation Components
export {
  DualHamburgerNavigation,
  HamburgerButton,
  BookNavigationPanel,
  SectionNavigationPanel,
  SectionTracker,
  useIntersectionObserver,
} from './navigation';

// Content Components
export { ContentRenderer, ParagraphRenderer, SectionRenderer, UBContentRenderer } from './content';

// Re-export content types with namespace to avoid conflicts
import * as ContentTypes from './content';
export { ContentTypes };

// Settings Components
export { FormatToggle } from './settings';

// Hooks
export { useFormatting } from './hooks';

// Re-export content types
export type {
  ContentRendererProps,
  ParagraphRendererProps,
  SectionRendererProps,
  UBContentRendererProps,
} from './content';

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
import * as PanelTypes from './panels';
import * as ScientificTypes from './scientific';
export { ScientificTypes };

// Panel Components
export { NotesPanel } from './panels';

// Re-export panel types with namespace to avoid conflicts
export { PanelTypes };

// Selection Components and Hooks
export { SelectionMenu, useSelectionMenu } from './selection';

// Re-export selection types with namespace to avoid conflicts
import * as SelectionTypes from './selection';
export { SelectionTypes };

// Pullup Components
export {
  Pullup,
  PullupPanel,
  PullupTabs,
  PullupContent,
  NotesTab,
  QuotesTab,
  SettingsTab,
} from './pullup';

// Re-export pullup types with namespace to avoid conflicts
import * as PullupTypes from './pullup';
export { PullupTypes };

// Examples are excluded to avoid build issues
// export * from './examples';

// Reader Components
export * from './components';

// Accessibility Utilities
export * from './accessibility';

// Re-export accessibility types with namespace to avoid conflicts
import * as AccessibilityUtils from './accessibility';
export { AccessibilityUtils };
