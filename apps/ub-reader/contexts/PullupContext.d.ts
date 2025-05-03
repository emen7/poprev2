import React, { ReactNode } from 'react';
import { Note, Quote, PullupTab, ReaderSettings } from '../components/pullup/types';
interface PullupContextType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    activeTab: PullupTab;
    setActiveTab: (tab: PullupTab) => void;
    height: number;
    setHeight: (height: number) => void;
    isPersistent: boolean;
    setIsPersistent: (isPersistent: boolean) => void;
    isPeeking: boolean;
    setIsPeeking: (isPeeking: boolean) => void;
    notes: Note[];
    setNotes: (notes: Note[]) => void;
    quotes: Quote[];
    setQuotes: (quotes: Quote[]) => void;
    settings: ReaderSettings;
    updateSettings: (settings: Partial<ReaderSettings>) => void;
    sortOrder: 'entry' | 'paper';
    setSortOrder: (sortOrder: 'entry' | 'paper') => void;
    justAddedNoteId: string | null;
    setJustAddedNoteId: (id: string | null) => void;
    openPullup: (tab?: PullupTab) => void;
    closePullup: () => void;
    handleHeightChange: (newHeight: number) => void;
    handleNoteUpdate: (id: string, content: string) => void;
    handleNoteDelete: (id: string) => void;
    handleQuoteDelete: (id: string) => void;
    handleNoteCreate: (note: Note) => void;
    handleQuoteCreate: (quote: Quote) => void;
    handleNoteAdd: (newNoteId: string) => void;
    handleEditStarted: () => void;
}
export declare const PullupContext: React.Context<PullupContextType | undefined>;
interface PullupProviderProps {
    children: ReactNode;
    initialSettings: ReaderSettings;
}
export declare function PullupProvider({ children, initialSettings }: PullupProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function usePullup(): PullupContextType;
export {};
//# sourceMappingURL=PullupContext.d.ts.map