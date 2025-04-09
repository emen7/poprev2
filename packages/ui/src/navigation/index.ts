/**
 * Navigation Components
 *
 * This module exports all navigation components for the unified UI.
 */

export { default as TableOfContents } from './TableOfContents';
export type { TOCItem, TableOfContentsProps } from './TableOfContents';

export { default as Breadcrumbs } from './Breadcrumbs';
export type { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs';

export { default as NavigationControls } from './NavigationControls';
export type { NavigationControlsProps } from './NavigationControls';

export { default as SectionNavigator } from './SectionNavigator';
export type { Section, SectionNavigatorProps } from './SectionNavigator';

export { default as HamburgerButton } from './HamburgerButton';
export type { HamburgerButtonProps } from './HamburgerButton';

/**
 * Sticky Navigation Components
 */
export { StickyHeadersContainer } from './sticky';
export type {
  Section as StickySection,
  StickyHeadersContainerProps,
} from './sticky/StickyHeadersContainer';
