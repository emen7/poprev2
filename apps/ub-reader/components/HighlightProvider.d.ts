import React, { ReactNode } from 'react';
interface Position {
    top: number;
    left: number;
}
interface SelectionMenuOptions {
    text: string;
    position: Position;
    onHighlight: (color: string) => void;
}
interface HighlightMetadata {
    paperId: string;
    paragraphId: string;
    [key: string]: string;
}
interface HighlightManager {
    showSelectionMenu: (options: SelectionMenuOptions) => void;
    createHighlight: (text: string, color: string, metadata: HighlightMetadata) => void;
    removeHighlight: (id: string) => void;
}
interface HighlightContextType {
    showHighlights: boolean;
    toggleHighlights: () => void;
    highlightText: (text: string, color: string) => void;
    removeHighlight: (id: string) => void;
    highlights: Highlight[];
    highlightManager: HighlightManager;
}
interface Highlight {
    id: string;
    text: string;
    color: string;
    createdAt: Date;
    metadata: HighlightMetadata;
}
interface HighlightProviderProps {
    children: ReactNode;
    containerSelector?: string;
    isDarkMode?: boolean;
}
export declare const HighlightProvider: React.FC<HighlightProviderProps>;
export declare const useHighlight: () => HighlightContextType;
export default HighlightProvider;
//# sourceMappingURL=HighlightProvider.d.ts.map