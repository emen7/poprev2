declare module '@ub-ecosystem/state-management' {
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

  // Providers
  export function AppStateProvider(props: {
    children: React.ReactNode;
    documentId?: string;
    persistentBreakpoint?: number;
    persistNotes?: boolean;
  }): JSX.Element;
}
