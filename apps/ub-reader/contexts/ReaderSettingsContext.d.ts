import { ReactNode } from 'react';
interface ReaderSettings {
    showParagraphNumbers: boolean;
}
interface ReaderSettingsContextType {
    settings: ReaderSettings;
    toggleParagraphNumbers: () => void;
}
export declare function useReaderSettings(): ReaderSettingsContextType;
interface ReaderSettingsProviderProps {
    children: ReactNode;
}
export declare function ReaderSettingsProvider({ children }: ReaderSettingsProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ReaderSettingsContext.d.ts.map