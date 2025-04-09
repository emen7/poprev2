declare module '@ub-ecosystem/state-management' {
  import { ReactNode } from 'react';

  // Navigation types
  export interface NavigationState {
    isBookNavOpen: boolean;
    isSectionNavOpen: boolean;
    currentPaperId: string;
    currentSectionId: string;
    currentSectionTitle: string;
  }

  export interface NavigationContextType {
    state: NavigationState;
    dispatch: React.Dispatch<any>;
  }

  // Navigation hooks
  export function useNavigation(): {
    isBookNavOpen: boolean;
    isSectionNavOpen: boolean;
    currentPaperId: string;
    currentSectionId: string;
    currentSectionTitle: string;
    toggleBookNav: () => void;
    toggleSectionNav: () => void;
    setCurrentPaper: (paperId: string) => void;
    setCurrentSection: (sectionId: string) => void;
    updateSectionTitle: (title: string) => void;
    dispatch: React.Dispatch<any>;
  };

  // Pullup types
  export type PullupTab = 'notes' | 'quotes' | 'settings';

  export interface PullupState {
    isOpen: boolean;
    activeTab: PullupTab;
    height: number;
    isPersistent: boolean;
  }

  // Pullup hooks
  export function usePullup(): {
    isOpen: boolean;
    activeTab: PullupTab;
    height: number;
    isPersistent: boolean;
    openPullup: (tab?: PullupTab) => void;
    closePullup: () => void;
    togglePullup: () => void;
    setActiveTab: (tab: PullupTab) => void;
    setHeight: (height: number) => void;
    setPersistent: (isPersistent: boolean) => void;
    dispatch: React.Dispatch<any>;
  };

  // Selection types
  export interface SelectionState {
    isSelecting: boolean;
    selectedText: string;
    selectedParagraphId: string;
    selectionPosition: { top: number; left: number } | null;
    selectedOptions: {
      note: boolean;
      quote: boolean;
      highlight: boolean;
    };
  }

  // Selection hooks
  export function useSelection(): {
    isSelecting: boolean;
    selectedText: string;
    selectedParagraphId: string;
    selectionPosition: { top: number; left: number } | null;
    selectedOptions: {
      note: boolean;
      quote: boolean;
      highlight: boolean;
    };
    hasSelectedOptions: boolean;
    startSelection: (paragraphId: string) => void;
    updateSelection: (text: string, position: { top: number; left: number } | null) => void;
    endSelection: () => void;
    clearSelection: () => void;
    toggleOption: (option: 'note' | 'quote' | 'highlight') => void;
    confirmSelection: () => void;
    dispatch: React.Dispatch<any>;
  };

  // Providers
  export interface AppStateProviderProps {
    children: ReactNode;
    documentId?: string;
    persistentBreakpoint?: number;
    persistNotes?: boolean;
  }

  export function AppStateProvider(props: AppStateProviderProps): JSX.Element;
}
