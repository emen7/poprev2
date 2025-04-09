import React, { ReactNode } from 'react';
import { NavigationProvider } from '../contexts/NavigationContext';
import { PullupProvider } from '../contexts/PullupContext';
import { SelectionProvider } from '../contexts/SelectionContext';

interface AppStateProviderProps {
  /**
   * Child components that will have access to all context providers
   */
  children: ReactNode;

  /**
   * The ID of the current document
   */
  documentId?: string;

  /**
   * Breakpoint width in pixels for persistent pullup mode
   * @default 1024
   */
  persistentBreakpoint?: number;

  /**
   * Whether to persist notes in localStorage
   * @default true
   */
  persistNotes?: boolean;
}

/**
 * Combined provider that wraps all state management contexts
 *
 * This provider should be used at the root of your application to provide
 * access to all state management contexts.
 */
export function AppStateProvider({
  children,
  documentId = '',
  persistentBreakpoint = 1024,
  persistNotes = true,
}: AppStateProviderProps) {
  return (
    <NavigationProvider>
      <PullupProvider persistentBreakpoint={persistentBreakpoint}>
        <SelectionProvider>{children}</SelectionProvider>
      </PullupProvider>
    </NavigationProvider>
  );
}
