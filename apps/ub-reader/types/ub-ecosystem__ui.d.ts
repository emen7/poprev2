declare module '@ub-ecosystem/ui' {
  import { ReactNode } from 'react';

  // ThreeRowHeader Component
  export interface ThreeRowHeaderProps {
    paperTitle: string;
    className?: string;
  }

  export function ThreeRowHeader(props: ThreeRowHeaderProps): JSX.Element;

  // HeaderRow Component
  export interface HeaderRowProps {
    rowType: 'top' | 'paper' | 'section';
    leftContent?: ReactNode;
    centerContent?: ReactNode;
    rightContent?: ReactNode;
    className?: string;
  }

  export function HeaderRow(props: HeaderRowProps): JSX.Element;

  // DynamicSectionTitle Component
  export interface DynamicSectionTitleProps {
    title: string;
    className?: string;
  }

  export function DynamicSectionTitle(props: DynamicSectionTitleProps): JSX.Element;

  // DualHamburgerNavigation Component
  export interface DualHamburgerNavigationProps {
    className?: string;
  }

  export function DualHamburgerNavigation(props: DualHamburgerNavigationProps): JSX.Element;

  // HamburgerButton Component
  export interface HamburgerButtonProps {
    variant: 'book' | 'section';
    isOpen: boolean;
    onClick: () => void;
    className?: string;
  }

  export function HamburgerButton(props: HamburgerButtonProps): JSX.Element;

  // BookNavigationPanel Component
  export interface BookNavigationPanelProps {
    isOpen: boolean;
    className?: string;
  }

  export function BookNavigationPanel(props: BookNavigationPanelProps): JSX.Element;

  // SectionNavigationPanel Component
  export interface SectionNavigationPanelProps {
    isOpen: boolean;
    className?: string;
  }

  export function SectionNavigationPanel(props: SectionNavigationPanelProps): JSX.Element;

  // SectionTracker Component
  export interface SectionTrackerProps {
    sectionId: string;
    sectionTitle: string;
    children: ReactNode;
    debug?: boolean;
    className?: string;
  }

  export function SectionTracker(props: SectionTrackerProps): JSX.Element;

  // useIntersectionObserver Hook
  export interface IntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
  }

  export function useIntersectionObserver<T extends Element>(
    options?: IntersectionObserverOptions,
    onIntersect?: (entry: IntersectionObserverEntry) => void
  ): [React.RefObject<T>, boolean];

  // Content Components
  export function ContentRenderer(props: any): JSX.Element;
  export function ParagraphRenderer(props: any): JSX.Element;
  export function SectionRenderer(props: any): JSX.Element;

  // Settings Components
  export function FormatToggle(props: any): JSX.Element;

  // Hooks
  export function useFormatting(props: any): any;

  // Scientific Content Components
  export function ScientificTooltip(props: any): JSX.Element;
  export function ScientificContentProcessor(props: any): JSX.Element;
  export function ScientificContentProvider(props: any): JSX.Element;
  export function useScientificContent(): any;

  // Panel Components
  export function NotesPanel(props: any): JSX.Element;
}
